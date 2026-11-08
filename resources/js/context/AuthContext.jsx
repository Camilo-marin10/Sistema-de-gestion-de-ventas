import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api, { TOKEN_KEY } from '../api/axios';

/**
 * Sesión real contra la API (Laravel Sanctum, token Bearer).
 * Roles: 'admin' | 'vendedor' | 'cliente'.
 */
export const HOME_BY_ROLE = { admin: '/admin', vendedor: '/vendedor', cliente: '/' };

/** Adapta el usuario de la API a la forma que usa la interfaz. */
function toSessionUser(apiUser) {
    if (!apiUser) return null;
    const parts = apiUser.name.trim().split(/\s+/);
    const shortName = parts.length > 1 ? `${parts[0]} ${parts[1][0]}.` : parts[0];
    return {
        id: apiUser.id,
        name: apiUser.name,
        shortName,
        email: apiUser.email,
        phone: apiUser.phone,
        role: apiUser.role,
        roleLabel: apiUser.role_label,
    };
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    // Mientras se valida un token guardado, las rutas protegidas esperan.
    const [loading, setLoading] = useState(() => Boolean(localStorage.getItem(TOKEN_KEY)));

    const startSession = useCallback(({ token, user: apiUser }) => {
        localStorage.setItem(TOKEN_KEY, token);
        const sessionUser = toSessionUser(apiUser);
        setUser(sessionUser);
        return sessionUser;
    }, []);

    // Restaura la sesión al cargar la app.
    useEffect(() => {
        localStorage.removeItem('ascend.session'); // sesión simulada anterior
        if (!localStorage.getItem(TOKEN_KEY)) return;
        api.get('/auth/me')
            .then(({ data }) => setUser(toSessionUser(data.data ?? data)))
            .catch(() => {
                localStorage.removeItem(TOKEN_KEY);
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, []);

    // Token expirado/revocado en cualquier petición → cerrar sesión local.
    useEffect(() => {
        const onUnauthorized = () => setUser(null);
        window.addEventListener('ascend:unauthorized', onUnauthorized);
        return () => window.removeEventListener('ascend:unauthorized', onUnauthorized);
    }, []);

    const login = useCallback(async ({ email, password }) => {
        const { data } = await api.post('/auth/login', { email, password });
        return startSession(data);
    }, [startSession]);

    const register = useCallback(async (payload) => {
        const { data } = await api.post('/auth/register', payload);
        return startSession(data);
    }, [startSession]);

    const logout = useCallback(async () => {
        try {
            await api.post('/auth/logout');
        } catch {
            // Si el token ya no es válido, igual se limpia la sesión local.
        } finally {
            localStorage.removeItem(TOKEN_KEY);
            setUser(null);
        }
    }, []);

    const value = useMemo(
        () => ({ user, role: user?.role ?? 'guest', loading, login, register, logout }),
        [user, loading, login, register, logout],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
    return ctx;
}
