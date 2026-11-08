import { Suspense } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ACCOUNT_NAV } from './StoreHeader';
import { useAuth } from '../../context/AuthContext';
import PageLoader from '../ui/PageLoader';

/** Área privada del cliente: se renderiza dentro de StoreLayout (mismo header/footer). */
export default function AccountLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div className="flex w-full bg-surface">
            <aside className="hidden md:flex sticky top-(--store-header-h) self-start h-[calc(100vh-var(--store-header-h))] w-64 shrink-0 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex-col p-space-lg">
                <div className="flex items-center gap-space-md pb-space-lg border-b border-surface-container">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-on-primary text-[24px]">person</span>
                    </div>
                    <div className="overflow-hidden">
                        <span className="font-title-md text-title-md text-on-surface block font-semibold truncate">{user?.shortName}</span>
                        <span className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider">Cliente VIP • Nivel Oro</span>
                    </div>
                </div>
                <div className="mt-space-lg mb-space-sm">
                    <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant">Mi Espacio</span>
                </div>
                <nav className="space-y-space-xs flex-1">
                    {ACCOUNT_NAV.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center gap-space-md px-space-md py-space-sm rounded-lg transition-all font-label-lg text-label-lg ${
                                    isActive
                                        ? 'bg-primary-container text-on-primary font-semibold'
                                        : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                                }`
                            }
                        >
                            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
                <div className="pt-space-md border-t border-surface-container">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-primary hover:bg-surface-container transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                        <span className="font-label-lg text-label-lg font-medium">Cerrar Sesión</span>
                    </button>
                </div>
            </aside>
            <div className="flex-1 min-w-0 flex flex-col">
                <div className="md:hidden bg-surface-container-lowest px-space-md py-space-sm border-b border-surface-container overflow-x-auto no-scrollbar">
                    <nav className="flex items-center gap-space-md min-w-max">
                        {ACCOUNT_NAV.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `pb-space-xs font-label-md text-label-md border-b-2 ${
                                        isActive
                                            ? 'text-primary-container border-primary-container font-semibold'
                                            : 'text-on-surface-variant border-transparent hover:text-on-surface'
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
                <div className="w-full flex-1 p-space-lg md:p-space-xl">
                    <Suspense fallback={<PageLoader />}>
                    <Outlet />
                </Suspense>
                </div>
            </div>
        </div>
    );
}
