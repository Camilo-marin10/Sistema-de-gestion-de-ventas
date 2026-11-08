import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../brand/Logo';
import { HOME_BY_ROLE, useAuth } from '../../context/AuthContext';

export const STORE_NAV = [
    { to: '/hombre', label: 'Hombre' },
    { to: '/mujer', label: 'Mujer' },
    { to: '/novedades', label: 'Novedades' },
    { to: '/ofertas', label: 'Ofertas' },
];

export const ACCOUNT_NAV = [
    { to: '/cuenta/pedidos', label: 'Mis Pedidos', icon: 'local_shipping' },
    { to: '/cuenta/cupones', label: 'Mis Cupones', icon: 'sell' },
    { to: '/cuenta/favoritos', label: 'Favoritos', icon: 'favorite' },
    { to: '/cuenta/datos', label: 'Datos Personales', icon: 'manage_accounts' },
];

const navClass = ({ isActive }) =>
    `font-label-lg text-label-lg uppercase tracking-wider py-space-xs border-b-2 transition-colors ${
        isActive ? 'text-primary-container font-semibold border-primary-container' : 'text-on-surface-variant border-transparent hover:text-on-surface'
    }`;

function UserMenu({ user, onLogout }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const location = useLocation();

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);
    useEffect(() => {
        const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
        document.addEventListener('mousedown', close);
        return () => document.removeEventListener('mousedown', close);
    }, []);

    const isStaff = user.role !== 'cliente';

    return (
        <div className="relative" ref={ref}>
            <button
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-space-sm p-space-xs rounded-lg hover:bg-surface-container-low transition-colors"
                type="button"
            >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
                </div>
                <div className="hidden sm:flex flex-col text-left">
                    <span className="font-label-md text-label-md text-on-surface leading-tight font-medium">{user.shortName}</span>
                    <span className="font-label-caps text-label-caps text-on-surface-variant leading-none">{user.roleLabel}</span>
                </div>
                <span className={`material-symbols-outlined text-on-surface-variant text-[18px] transition-transform ${open ? 'rotate-180' : ''}`}>
                    expand_more
                </span>
            </button>
            {open && (
                <div className="absolute right-0 top-full pt-space-xs z-50">
                    <div className="w-56 py-space-sm bg-surface-container-lowest rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
                        <div className="px-space-md py-space-sm sm:hidden">
                            <span className="font-label-md text-label-md text-on-surface block font-medium">{user.shortName}</span>
                            <span className="font-label-caps text-label-caps text-on-surface-variant block">{user.roleLabel}</span>
                        </div>
                        {isStaff ? (
                            <Link
                                to={HOME_BY_ROLE[user.role]}
                                className="flex items-center gap-space-sm px-space-md py-space-sm font-label-md text-label-md text-on-surface hover:bg-surface-container-low transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">dashboard</span>
                                Ir a mi panel
                            </Link>
                        ) : (
                            ACCOUNT_NAV.map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className="flex items-center gap-space-sm px-space-md py-space-sm font-label-md text-label-md text-on-surface hover:bg-surface-container-low transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">{item.icon}</span>
                                    {item.label}
                                </Link>
                            ))
                        )}
                        <div className="h-px bg-surface-container my-space-xs" />
                        <button
                            type="button"
                            onClick={onLogout}
                            className="w-full flex items-center gap-space-sm px-space-md py-space-sm font-label-md text-label-md text-primary-container hover:bg-surface-container-low transition-colors"
                        >
                            <span className="material-symbols-outlined text-[18px] text-primary-container">logout</span>
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

/** Header único de la tienda. Visitante: barra de anuncio + acceso. Cliente: menú de cuenta. */
export default function StoreHeader({ ref }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const cartCount = user?.role === 'cliente' ? 2 : 0;

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <header ref={ref} className="sticky top-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
            {!user && (
                <div className="w-full bg-inverse-surface text-inverse-on-surface py-space-xs px-margin-mobile md:px-margin text-center font-label-caps text-label-caps tracking-widest">
                    Envíos express a toda Colombia | Cupón de bienvenida disponible al registrarte (sujeto a condiciones)
                </div>
            )}
            <div className="h-20 w-full px-margin-mobile md:px-margin flex items-center justify-between gap-space-lg">
                <div className="flex items-center gap-space-xl">
                    <Logo />
                    <nav className="hidden lg:flex items-center gap-space-lg">
                        {STORE_NAV.map((item) => (
                            <NavLink key={item.to} to={item.to} className={navClass}>
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
                <div className="flex-1 max-w-md hidden md:block">
                    <div className="relative flex items-center w-full">
                        <span className="material-symbols-outlined absolute left-space-md text-on-surface-variant text-[20px] pointer-events-none">search</span>
                        <input
                            className="w-full h-10 pl-11 pr-space-md bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm rounded-lg border border-outline-variant/40 focus:outline-hidden focus:border-primary-container transition-all"
                            placeholder="Buscar prendas, colecciones, siluetas..."
                            type="text"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-space-md">
                    {user ? (
                        <UserMenu user={user} onLogout={handleLogout} />
                    ) : (
                        <Link to="/login" className="flex items-center gap-space-xs text-on-surface-variant hover:text-on-surface transition-colors">
                            <span className="material-symbols-outlined text-[24px]">person</span>
                            <span className="hidden xl:inline-block font-label-md text-label-md">Iniciar Sesión / Registro</span>
                        </Link>
                    )}
                    <Link
                        to="/carrito"
                        aria-label="Bolsa de compra"
                        className="relative p-space-sm rounded-lg hover:bg-surface-container-low text-on-surface transition-colors"
                    >
                        <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary-container text-on-primary font-label-caps text-[10px] flex items-center justify-center font-bold">
                            {cartCount}
                        </span>
                    </Link>
                </div>
            </div>
            {/* Navegación compacta (< 1024px) */}
            <nav className="lg:hidden flex items-center gap-space-lg px-margin-mobile md:px-margin h-11 overflow-x-auto no-scrollbar border-t border-surface-container">
                {STORE_NAV.map((item) => (
                    <NavLink key={item.to} to={item.to} className={navClass}>
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </header>
    );
}
