import axios from 'axios';

export const TOKEN_KEY = 'ascend.token';

const api = axios.create({
    baseURL: '/api',
    headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

// Adjunta el token de Sanctum a cada petición.
api.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Si el token expiró o fue revocado, se notifica a la app para cerrar la sesión local.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && localStorage.getItem(TOKEN_KEY)) {
            localStorage.removeItem(TOKEN_KEY);
            window.dispatchEvent(new Event('ascend:unauthorized'));
        }
        return Promise.reject(error);
    },
);

/** Extrae errores de validación de Laravel: { campo: 'mensaje' } + mensaje general. */
export function parseApiError(error) {
    const data = error.response?.data;
    const fields = {};
    if (data?.errors) {
        for (const [key, messages] of Object.entries(data.errors)) fields[key] = messages[0];
    }
    const message =
        Object.values(fields)[0] ??
        data?.message ??
        (error.response ? 'Ocurrió un error inesperado. Intenta de nuevo.' : 'No hay conexión con el servidor.');
    return { fields, message };
}

export default api;
