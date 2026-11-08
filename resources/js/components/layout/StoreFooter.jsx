import { Link } from 'react-router-dom';
import Logo from '../brand/Logo';

const COLUMNS = [
    {
        title: 'Colecciones',
        links: [
            { label: 'Línea Femenina', to: '/mujer' },
            { label: 'Línea Masculina', to: '/hombre' },
            { label: 'Drop Reciente', to: '/novedades' },
            { label: 'Archivo & Descuentos', to: '/ofertas' },
        ],
    },
    {
        title: 'Servicio & Políticas',
        links: [
            { label: 'Cambios y Garantías' },
            { label: 'Guía de Siluetas y Tallas' },
            { label: 'Tiempos de Despacho' },
            { label: 'Seguimiento de Orden', to: '/cuenta/pedidos' },
        ],
    },
];

const linkClass = 'font-body-sm text-body-sm text-secondary-fixed-dim hover:text-surface-bright transition-colors';

/**
 * Footer único de la tienda (incluye login y área de cliente).
 * `compact` oculta el bloque de suscripción para pantallas transaccionales.
 */
export default function StoreFooter({ compact = false }) {
    return (
        <footer className="w-full bg-inverse-surface text-inverse-on-surface">
            {!compact && (
                <div className="w-full px-margin-mobile md:px-margin py-space-2xl border-b border-outline/20">
                    <div className="max-w-xl mx-auto text-center">
                        <span className="font-label-caps text-label-caps uppercase text-primary-fixed-dim tracking-widest block mb-space-xs">
                            ASCEND Club de Moda
                        </span>
                        <h3 className="font-headline-md text-headline-md font-bold text-surface-bright mb-space-sm">Únete a la vanguardia</h3>
                        <p className="font-body-md text-body-md text-secondary-fixed-dim mb-space-lg">
                            Recibe invitaciones a lanzamientos privados, acceso prioritario y el cupón de bienvenida para tu primer pedido.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-space-xs justify-center" onSubmit={(e) => e.preventDefault()}>
                            <input
                                className="h-10 px-space-md bg-surface-container-high/10 text-surface-bright placeholder:text-secondary-fixed-dim font-body-sm text-body-sm rounded-lg border border-outline/40 focus:outline-hidden focus:border-primary-container flex-1 sm:max-w-sm"
                                placeholder="Ingresa tu correo electrónico"
                                type="email"
                            />
                            <button
                                className="h-10 px-space-lg bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg hover:bg-primary transition-colors uppercase tracking-wider font-semibold"
                                type="submit"
                            >
                                Suscribirme
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <div className="w-full px-margin-mobile md:px-margin py-space-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl">
                    <div>
                        <div className="mb-space-md">
                            <Logo tone="dark" />
                        </div>
                        <p className="font-body-sm text-body-sm text-secondary-fixed-dim mb-space-lg leading-relaxed">
                            Diseño de alta costura contemporánea y streetwear utilitario. Hecho con precisión arquitectónica en Colombia.
                        </p>
                        <div className="flex items-center gap-space-sm text-secondary-fixed-dim">
                            {['share', 'camera', 'public'].map((icon) => (
                                <a
                                    key={icon}
                                    className="w-9 h-9 rounded-lg bg-surface-container-high/10 flex items-center justify-center hover:text-surface-bright hover:bg-surface-container-high/20 transition-all"
                                    href="#"
                                    aria-label={icon}
                                >
                                    <span className="material-symbols-outlined text-[18px]">{icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                    {COLUMNS.map((col) => (
                        <div key={col.title}>
                            <h4 className="font-label-caps text-label-caps uppercase tracking-wider text-surface-bright font-semibold mb-space-md">{col.title}</h4>
                            <ul className="space-y-space-sm">
                                {col.links.map((l) => (
                                    <li key={l.label}>
                                        {l.to ? (
                                            <Link to={l.to} className={linkClass}>
                                                {l.label}
                                            </Link>
                                        ) : (
                                            <a href="#" className={linkClass}>
                                                {l.label}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div>
                        <h4 className="font-label-caps text-label-caps uppercase tracking-wider text-surface-bright font-semibold mb-space-md">Concierge</h4>
                        <p className="font-body-sm text-body-sm text-secondary-fixed-dim mb-space-sm">
                            Asesoría de estilismo personalizada y atención a pedidos vía WhatsApp Concierge:
                        </p>
                        <a
                            className="inline-flex items-center gap-space-xs font-label-md text-label-md font-semibold text-primary-fixed-dim hover:text-surface-bright transition-colors py-space-xs"
                            href="#"
                        >
                            <span className="material-symbols-outlined text-[18px]">chat</span>
                            WhatsApp Concierge
                        </a>
                        <p className="font-body-sm text-body-sm text-secondary-fixed-dim mt-space-sm">Lunes a Sábado: 9:00 AM – 7:00 PM</p>
                    </div>
                    <div>
                        <h4 className="font-label-caps text-label-caps uppercase tracking-wider text-surface-bright font-semibold mb-space-md">Compra Segura</h4>
                        <p className="font-body-sm text-body-sm text-secondary-fixed-dim mb-space-md leading-relaxed">
                            Transacciones cifradas con certificación SSL y pasarelas de pago seguras para Colombia.
                        </p>
                        <div className="flex flex-wrap gap-space-xs text-secondary-fixed-dim">
                            {[
                                ['verified_user', 'SSL Secure', 'text-tertiary-fixed-dim'],
                                ['credit_card', 'PSE & Cards', 'text-primary-fixed-dim'],
                                ['local_shipping', 'Envíos Express', 'text-surface-bright'],
                            ].map(([icon, label, color]) => (
                                <div key={label} className="flex items-center gap-space-xxs bg-surface-container-high/10 px-space-sm py-space-xs rounded-lg">
                                    <span className={`material-symbols-outlined text-[16px] ${color}`}>{icon}</span>
                                    <span className="font-label-caps text-[10px] uppercase">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-space-2xl pt-space-lg border-t border-outline/20 flex flex-col md:flex-row items-center justify-between gap-space-md text-secondary-fixed-dim font-body-sm text-body-sm">
                    <p>© 2025 ASCEND S.A.S. Todos los derechos reservados. Moda de Lujo Contemporáneo.</p>
                    <div className="flex gap-space-lg">
                        <a className="hover:text-surface-bright transition-colors font-label-caps text-label-caps uppercase" href="#">
                            Política de Privacidad
                        </a>
                        <a className="hover:text-surface-bright transition-colors font-label-caps text-label-caps uppercase" href="#">
                            Términos de Servicio
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
