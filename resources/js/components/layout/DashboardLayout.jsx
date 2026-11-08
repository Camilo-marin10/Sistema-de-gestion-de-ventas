import { Suspense, useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../brand/Logo';
import PageLoader from '../ui/PageLoader';
import { useAuth } from '../../context/AuthContext';

/**
 * Shell único para los paneles internos (Administrador y Vendedor).
 * Mismo sidebar oscuro (260px), mismo header y mismo lienzo de trabajo;
 * sólo cambia la configuración de navegación por rol.
 */
export const PANELS = {
    admin: {
        subtitle: 'Admin Suite',
        context: 'Administración',
        searchPlaceholder: 'Buscar pedidos, SKUs o clientes...',
        stores: ['Store Central (ES)', 'Store LatAm (Global)', 'Showroom Exclusivo'],
        nav: [
            { to: '/admin', label: 'Dashboard', icon: 'dashboard', end: true },
            { to: '/admin/pedidos', label: 'Pedidos', icon: 'shopping_bag' },
            { to: '/admin/productos', label: 'Productos', icon: 'styler' },
            { to: '/admin/inventario', label: 'Inventario', icon: 'inventory_2' },
            { to: '/admin/tipos-de-producto', label: 'Tipos de producto', icon: 'style' },
            { to: '/admin/empleados', label: 'Empleados', icon: 'badge' },
            { to: '/admin/clientes', label: 'Clientes', icon: 'group' },
            { to: '/admin/cupones', label: 'Cupones', icon: 'loyalty' },
            { to: '/admin/parametros', label: 'Parámetros', icon: 'settings' },
        ],
        profile: '/admin/mi-perfil',
    },
    vendedor: {
        subtitle: 'Portal Vendedor',
        context: 'Portal Operativo',
        searchPlaceholder: 'Buscar pedidos, SKUs o prendas...',
        stores: ['Store Central (ES)', 'Canal Digital / WhatsApp Concierge', 'Showroom Flagship'],
        nav: [
            { to: '/vendedor', label: 'Dashboard', icon: 'dashboard', end: true },
            { to: '/vendedor/pedidos', label: 'Pedidos', icon: 'shopping_bag', badge: 3 },
            { to: '/vendedor/productos', label: 'Productos', icon: 'styler' },
            { to: '/vendedor/inventario', label: 'Inventario', icon: 'inventory_2' },
        ],
        profile: '/vendedor/mi-perfil',
        permissions: 'Restringido / Ventas',
    },
};

const linkBase = 'flex items-center gap-space-sm px-space-md py-space-sm rounded-lg transition-colors font-label-lg text-label-lg';
const linkIdle = 'text-secondary-fixed-dim hover:bg-surface-container-high/10 hover:text-inverse-on-surface';
const linkActive = 'bg-primary-container text-on-primary shadow-xs';

function SidebarLink({ item, onNavigate }) {
    return (
        <NavLink
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
        >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            {item.badge ? (
                <span className="min-w-5 h-5 px-1.5 rounded-full text-[10px] font-bold bg-primary-container text-on-primary flex items-center justify-center ring-1 ring-inverse-surface">
                    {item.badge}
                </span>
            ) : null}
        </NavLink>
    );
}

function Sidebar({ panel, onNavigate, onLogout }) {
    return (
        <div className="h-full w-[260px] bg-inverse-surface flex flex-col justify-between py-space-lg">
            <div className="flex flex-col gap-space-xl min-h-0">
                <div className="px-space-lg">
                    <Logo tone="dark" size="md" subtitle={panel.subtitle} to={panel.nav[0].to} />
                </div>
                <nav className="flex flex-col gap-space-xxs px-space-md overflow-y-auto no-scrollbar">
                    {panel.nav.map((item) => (
                        <SidebarLink key={item.to} item={item} onNavigate={onNavigate} />
                    ))}
                </nav>
            </div>
            <div className="px-space-md pt-space-md border-t border-outline/20 flex flex-col gap-space-xxs">
                <SidebarLink item={{ to: panel.profile, label: 'Mi perfil', icon: 'account_circle' }} onNavigate={onNavigate} />
                <button type="button" onClick={onLogout} className={`${linkBase} ${linkIdle} w-full text-left`}>
                    <span className="material-symbols-outlined text-[20px]">logout</span>
                    <span>Cerrar sesión</span>
                </button>
                {panel.permissions && (
                    <div className="mt-space-sm px-space-md py-space-sm rounded-lg bg-surface-container-high/5 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="font-label-caps text-label-caps text-secondary-fixed-dim uppercase">Permisos</span>
                            <span className="font-label-md text-label-md text-inverse-on-surface font-medium">{panel.permissions}</span>
                        </div>
                        <span className="material-symbols-outlined text-secondary-fixed-dim text-[16px]">lock</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function DashboardLayout({ role }) {
    const panel = PANELS[role];
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        setMobileOpen(false);
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-surface-container-low">
            {/* Sidebar fijo (desktop) */}
            <aside className="hidden lg:block fixed left-0 top-0 h-full z-50">
                <Sidebar panel={panel} onLogout={handleLogout} />
            </aside>

            {/* Sidebar off-canvas (< 1024px) */}
            {mobileOpen && (
                <div className="lg:hidden fixed inset-0 z-[60]">
                    <div className="absolute inset-0 bg-inverse-surface/40" onClick={() => setMobileOpen(false)} />
                    <aside className="absolute left-0 top-0 h-full shadow-xl">
                        <Sidebar panel={panel} onNavigate={() => setMobileOpen(false)} onLogout={handleLogout} />
                    </aside>
                </div>
            )}

            <div className="lg:pl-[260px]">
                <header className="fixed top-0 left-0 lg:left-[260px] right-0 h-16 bg-surface-container-lowest z-40 border-b border-secondary-container px-margin-mobile md:px-space-xl flex items-center justify-between gap-space-md">
                    <div className="flex items-center gap-space-lg min-w-0">
                        <button
                            type="button"
                            className="lg:hidden p-2 -ml-2 rounded-lg text-on-surface hover:bg-surface-container-low"
                            aria-label="Abrir menú"
                            onClick={() => setMobileOpen(true)}
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <div className="hidden sm:flex items-center gap-space-xs">
                            <span className="font-label-caps text-label-caps uppercase text-secondary">ASCEND</span>
                            <span className="material-symbols-outlined text-[16px] text-secondary">chevron_right</span>
                            <span className="font-label-caps text-label-caps uppercase text-on-surface font-semibold">{panel.context}</span>
                        </div>
                        <div className="relative w-56 xl:w-80 hidden md:block">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px]">search</span>
                            <input
                                className="w-full h-10 pl-9 pr-3 rounded-lg border border-secondary-container bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-secondary focus:outline-hidden focus:border-primary-container transition-all"
                                placeholder={panel.searchPlaceholder}
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-space-md xl:gap-space-lg shrink-0">
                        <div className="hidden xl:flex items-center gap-space-xs border border-secondary-container rounded-lg px-space-sm py-1 bg-surface-container-lowest">
                            <span className="material-symbols-outlined text-[18px] text-secondary">store</span>
                            <select className="bg-transparent font-label-md text-label-md text-on-surface focus:outline-hidden cursor-pointer pr-space-xs">
                                {panel.stores.map((s) => (
                                    <option key={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            className="relative p-2 rounded-lg text-secondary hover:text-on-surface hover:bg-surface-container-low transition-colors"
                            type="button"
                            aria-label="Notificaciones"
                        >
                            <span className="material-symbols-outlined text-[22px]">notifications</span>
                            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-primary-container rounded-full ring-2 ring-surface-container-lowest" />
                        </button>
                        <div className="h-8 w-px bg-secondary-container hidden sm:block" />
                        <div className="flex items-center gap-space-sm">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
                            </div>
                            <div className="hidden sm:flex flex-col text-left">
                                <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight">{user?.name}</span>
                                <span className="font-label-caps text-label-caps text-primary uppercase leading-tight">{user?.roleLabel}</span>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="pt-16 min-h-screen">
                    <div className="px-margin-mobile md:px-space-xl py-space-xl">
                        <Suspense fallback={<PageLoader />}>
                    <Outlet />
                </Suspense>
                    </div>
                </main>
            </div>
        </div>
    );
}
