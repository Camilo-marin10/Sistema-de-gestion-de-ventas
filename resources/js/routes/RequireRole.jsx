import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { HOME_BY_ROLE, useAuth } from '../context/AuthContext';
import PageLoader from '../components/ui/PageLoader';

/** Protege un grupo de rutas según el rol de la sesión. */
export default function RequireRole({ roles }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <PageLoader />;

    if (!user) {
        const redirect = encodeURIComponent(location.pathname + location.search);
        return <Navigate to={`/login?redirect=${redirect}`} replace />;
    }

    if (!roles.includes(user.role)) {
        return <Navigate to={HOME_BY_ROLE[user.role] ?? '/'} replace />;
    }

    return <Outlet />;
}
