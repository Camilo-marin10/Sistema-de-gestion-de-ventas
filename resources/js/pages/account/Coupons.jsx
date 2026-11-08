import { useState } from 'react';
import { Link } from 'react-router-dom';

const TABS = [
    { id: 'available', label: 'Disponibles', count: 2 },
    { id: 'used', label: 'Utilizados', count: 1 },
    { id: 'expired', label: 'Vencidos', count: 0 },
];
const VALID_CODES = ['ATELIER-PARIS-2025', 'ASCENDVIP'];

function CopyCodeButton({ code }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard?.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button
            type="button"
            onClick={handleCopy}
            className={`w-full sm:w-auto h-9 px-space-md rounded-lg ${copied ? 'bg-[#ECFDF5]' : 'bg-surface-container-lowest hover:bg-surface-container'} text-on-surface font-label-md text-label-md font-semibold transition-all flex items-center justify-center gap-space-xs shadow-xs`}
        >
            {copied ? (
                <>
                    <span className="material-symbols-outlined text-[18px] text-[#059669]">done</span>
                    <span className="text-[#059669]">¡Copiado!</span>
                </>
            ) : (
                <>
                    <span className="material-symbols-outlined text-[18px]">content_copy</span>
                    <span>Copiar Código</span>
                </>
            )}
        </button>
    );
}

export default function AccountCoupons() {
    const [tab, setTab] = useState('available');
    const [code, setCode] = useState('');
    const [feedback, setFeedback] = useState(null); // { ok: boolean, text: string }

    const handleRedeem = (e) => {
        e.preventDefault();
        const value = code.trim().toUpperCase();
        if (!value) return;
        setFeedback(
            VALID_CODES.includes(value)
                ? { ok: true, text: '¡Código reconocido! Ha sido vinculado exitosamente a tu cuenta.' }
                : { ok: false, text: 'Código no encontrado o no disponible para tu nivel de membresía.' },
        );
    };

    return (
        <>
            <div className="flex flex-col w-full gap-space-xl">
                {/* Profile Context Header */}
                <div className="relative overflow-hidden bg-surface-container-lowest rounded-xl shadow-xs p-space-lg md:p-space-xl">
                    <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-primary-fixed-dim/20 blur-3xl pointer-events-none" />
                    <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
                        <div className="space-y-space-xs max-w-2xl">
                            <div className="flex items-center gap-space-sm">
                                <span className="inline-flex items-center gap-space-xxs px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-caps text-label-caps uppercase tracking-wider">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
                                    {' '}
                                    Membresía Activa
                                </span>
                                <span className="text-on-surface-variant font-label-caps text-label-caps">ID: ASC-88291</span>
                            </div>
                            <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight">Mis Cupones y Beneficios Exclusivos</h1>
                            <p className="font-body-md text-body-md text-on-surface-variant">
                                Cupones asignados a tu cuenta, descuentos de bienvenida y códigos promocionales disponibles para Valentina Morales.
                            </p>
                        </div>
                        {/* Quick Summary Metric Card */}
                        <div className="flex items-center gap-space-lg bg-surface-container-low px-space-lg py-space-md rounded-xl shrink-0">
                            <div>
                                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase block">Beneficios Listos</span>
                                <div className="flex items-baseline gap-space-xs">
                                    <span className="font-display-lg text-display-lg font-bold text-primary-container">2</span>
                                    <span className="font-label-md text-label-md text-on-surface-variant">cupones</span>
                                </div>
                            </div>
                            <div className="w-px h-10 bg-surface-container-highest" />
                            <div>
                                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase block">Ahorro Estimado</span>
                                {' '}
                                <span className="font-title-md text-title-md font-bold text-on-surface">10% + Envíos</span>
                            </div>
                        </div>
                    </div>
                    {/* Contextual Profile Navigation Bar */}
                    <div className="mt-space-xl pt-space-md border-t border-surface-container">
                        <div className="flex items-center gap-space-md overflow-x-auto no-scrollbar">
                            <Link to="/cuenta/pedidos" className="px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors whitespace-nowrap">
                                Resumen
                            </Link>
                            <Link to="/cuenta/pedidos" className="px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors whitespace-nowrap">
                                Mis Pedidos
                            </Link>
                            <Link to="/cuenta/cupones" className="px-space-md py-space-sm rounded-lg font-label-lg text-label-lg bg-primary-container text-on-primary shadow-xs font-semibold flex items-center gap-space-xs whitespace-nowrap">
                                <span className="material-symbols-outlined text-[18px]">sell</span>
                                {' '}
                                Mis Cupones
                            </Link>
                            <Link to="/cuenta/favoritos" className="px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors whitespace-nowrap">
                                Favoritos
                            </Link>
                            <Link to="/cuenta/datos" className="px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors whitespace-nowrap">
                                Datos Personales
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Coupons Filter Tabs */}
                <div className="flex flex-wrap items-center justify-between gap-space-md">
                    <div className="inline-flex p-1 bg-surface-container rounded-lg">
                        {TABS.map((t) => (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => setTab(t.id)}
                                className={`flex items-center gap-space-xs px-space-md py-space-xs rounded-md font-label-md text-label-md transition-all ${
                                    tab === t.id ? 'font-semibold bg-surface-container-lowest text-on-surface shadow-xs' : 'font-medium text-on-surface-variant hover:text-on-surface'
                                }`}
                            >
                                <span>{t.label}</span>
                                <span
                                    className={`px-1.5 py-0.2 rounded-full font-label-caps text-label-caps ${
                                        t.id === 'available' ? 'bg-primary-container text-on-primary' : 'bg-surface-container-highest text-on-surface-variant'
                                    }`}
                                >
                                    {t.count}
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-space-sm text-on-surface-variant font-label-md text-label-md">
                        <span className="material-symbols-outlined text-[18px] text-primary-container">info</span>
                        <span>Los códigos son personales e intransferibles</span>
                    </div>
                </div>
                {/* Coupon Content Sections */}
                {/* 1. Available Coupons Grid */}
                {tab === 'expired' && (
                    <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-xs flex flex-col items-center text-center gap-space-sm">
                        <span className="material-symbols-outlined text-[32px] text-on-surface-variant">event_busy</span>
                        <p className="font-title-md text-title-md text-on-surface font-semibold">No tienes cupones vencidos</p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Tus beneficios activos siguen disponibles en la pestaña Disponibles.</p>
                    </div>
                )}
                <div className={`grid-cols-1 lg:grid-cols-2 gap-space-lg ${tab === 'available' ? 'grid' : 'hidden'}`} id="section-available">
                    {/* Card 1: Bienvenida ASCEND */}
                    <div className="relative bg-surface-container-lowest rounded-xl shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between">
                        <div className="h-1.5 w-full bg-gradient-to-r from-primary-container via-primary to-primary-fixed" />
                        <div className="p-space-lg flex-1 flex flex-col justify-between gap-space-md">
                            <div>
                                <div className="flex items-start justify-between gap-space-md mb-space-sm">
                                    <div>
                                        <span className="font-label-caps text-label-caps uppercase tracking-wider text-primary-container font-semibold block mb-0.5">
                                            Atelier Welcome Pass
                                        </span>
                                        <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Cupón de Bienvenida ASCEND</h2>
                                    </div>
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-[#ECFDF5] text-[#065F46] font-label-caps text-label-caps font-semibold">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                                        {' '}
                                        Vigente y Disponible
                                    </span>
                                </div>
                                {/* Highlight Benefit */}
                                <div className="my-space-md p-space-md bg-surface-container-low rounded-lg flex items-center justify-between">
                                    <div className="flex items-center gap-space-md">
                                        <div className="w-10 h-10 rounded-lg bg-primary-container/10 text-primary-container flex items-center justify-center">
                                            <span className="material-symbols-outlined text-[22px]">percent</span>
                                        </div>
                                        <div>
                                            <span className="font-title-md text-title-md font-bold text-on-surface block">10% de descuento</span>
                                            {' '}
                                            <span className="font-body-sm text-body-sm text-on-surface-variant">En tu primera orden en tienda</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-label-caps text-label-caps text-on-surface-variant block uppercase">Expiración</span>
                                        {' '}
                                        <span className="font-label-md text-label-md font-semibold text-on-surface">31 DIC 2025</span>
                                    </div>
                                </div>
                                {/* Conditions */}
                                <div className="space-y-space-xs text-on-surface-variant font-body-sm text-body-sm">
                                    <div className="flex items-start gap-space-xs">
                                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant/70 shrink-0 mt-0.5">check_circle</span>
                                        <p>Sujeto a compra mínima de $200.000 COP en colecciones Hombre y Mujer.</p>
                                    </div>
                                    <div className="flex items-start gap-space-xs">
                                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant/70 shrink-0 mt-0.5">check_circle</span>
                                        <p>No acumulable con otras promociones de liquidación de temporada.</p>
                                    </div>
                                </div>
                            </div>
                            {/* Ticket Separation Style & Actions */}
                            <div className="pt-space-md border-t border-dashed border-surface-container space-y-space-md">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm bg-surface-container-low p-space-xs pl-space-md rounded-lg">
                                    <div className="flex items-center gap-space-sm">
                                        <span className="material-symbols-outlined text-on-surface-variant text-[20px]">confirmation_number</span>
                                        <span className="font-headline-md text-headline-md font-bold text-primary-container tracking-wider select-all" id="code-1">ASCENDVIP</span>
                                    </div>
                                    <CopyCodeButton code="ASCENDVIP" />
                                </div>
                                <div className="flex gap-space-sm">
                                    <Link to="/carrito" className="flex-1 h-10 px-space-md rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg font-semibold hover:bg-primary transition-all flex items-center justify-center gap-space-xs shadow-xs">
                                        <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                                        <span>Usar en el Carrito</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Card 2: Drop FW25 */}
                    <div className="relative bg-surface-container-lowest rounded-xl shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between">
                        <div className="h-1.5 w-full bg-gradient-to-r from-tertiary-container via-tertiary to-secondary" />
                        <div className="p-space-lg flex-1 flex flex-col justify-between gap-space-md">
                            <div>
                                <div className="flex items-start justify-between gap-space-md mb-space-sm">
                                    <div>
                                        <span className="font-label-caps text-label-caps uppercase tracking-wider text-tertiary font-semibold block mb-0.5">
                                            Seasonal Privilège
                                        </span>
                                        <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Cupón de Temporada Drop FW25</h2>
                                    </div>
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-[#ECFDF5] text-[#065F46] font-label-caps text-label-caps font-semibold">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                                        {' '}
                                        Vigente y Disponible
                                    </span>
                                </div>
                                {/* Highlight Benefit */}
                                <div className="my-space-md p-space-md bg-surface-container-low rounded-lg flex items-center justify-between">
                                    <div className="flex items-center gap-space-md">
                                        <div className="w-10 h-10 rounded-lg bg-tertiary-container/10 text-tertiary-container flex items-center justify-center">
                                            <span className="material-symbols-outlined text-[22px]">rocket_launch</span>
                                        </div>
                                        <div>
                                            <span className="font-title-md text-title-md font-bold text-on-surface block">Envío Express Gratis</span>
                                            {' '}
                                            <span className="font-body-sm text-body-sm text-on-surface-variant">Entrega prioritaria a nivel nacional</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-label-caps text-label-caps text-on-surface-variant block uppercase">Vigencia</span>
                                        {' '}
                                        <span className="font-label-md text-label-md font-semibold text-on-surface">Mes en curso</span>
                                    </div>
                                </div>
                                {/* Conditions */}
                                <div className="space-y-space-xs text-on-surface-variant font-body-sm text-body-sm">
                                    <div className="flex items-start gap-space-xs">
                                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant/70 shrink-0 mt-0.5">check_circle</span>
                                        <p>Aplica exclusivamente en pedidos de la nueva colección de sastrería y corsetería FW25.</p>
                                    </div>
                                    <div className="flex items-start gap-space-xs">
                                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant/70 shrink-0 mt-0.5">check_circle</span>
                                        <p>Válido para una redención por usuario registrado.</p>
                                    </div>
                                </div>
                            </div>
                            {/* Ticket Separation Style & Actions */}
                            <div className="pt-space-md border-t border-dashed border-surface-container space-y-space-md">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm bg-surface-container-low p-space-xs pl-space-md rounded-lg">
                                    <div className="flex items-center gap-space-sm">
                                        <span className="material-symbols-outlined text-on-surface-variant text-[20px]">confirmation_number</span>
                                        <span className="font-headline-md text-headline-md font-bold text-tertiary tracking-wider select-all" id="code-2">FW25RUNWAY</span>
                                    </div>
                                    <CopyCodeButton code="FW25RUNWAY" />
                                </div>
                                <div className="flex gap-space-sm">
                                    <Link to="/novedades" className="flex-1 h-10 px-space-md rounded-lg bg-surface-container-highest text-on-surface font-label-lg text-label-lg font-semibold hover:bg-surface-variant transition-all flex items-center justify-center gap-space-xs">
                                        <span className="material-symbols-outlined text-[20px]">explore</span>
                                        <span>Explorar Colección FW25</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 2. Utilized Coupons Section */}
                <div className={`space-y-space-md ${tab === 'expired' ? 'hidden' : ''}`} id="section-used">
                    <div className="flex items-center justify-between">
                        <h3 className="font-title-md text-title-md font-bold text-on-surface flex items-center gap-space-xs">
                            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">history</span>
                            {' '}
                            Historial de Cupones Utilizados
                        </h3>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">1 cupón canjeado</span>
                    </div>
                    {/* Used Coupon Card */}
                    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md opacity-90">
                        <div className="flex items-center gap-space-md">
                            <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant shrink-0">
                                <span className="material-symbols-outlined text-[24px]">verified</span>
                            </div>
                            <div className="space-y-0.5">
                                <div className="flex items-center gap-space-sm flex-wrap">
                                    <span className="font-label-lg text-label-lg font-bold line-through text-on-surface-variant">BIENVENIDA-OFF</span>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-surface-container-highest text-on-surface-variant font-label-caps text-label-caps font-semibold">
                                        Canjeado con Éxito
                                    </span>
                                </div>
                                <p className="font-body-md text-body-md text-on-surface-variant">
                                    Descuento de $50.000 COP aplicado en la compra de la chaqueta estructurada de lana.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-space-lg shrink-0 pt-space-xs md:pt-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-surface-container">
                            <div>
                                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase block">Aplicado a Pedido</span>
                                {' '}
                                <Link to="/cuenta/pedidos" className="font-label-md text-label-md font-semibold text-primary-container hover:underline flex items-center gap-0.5">
                                    #ASC-7910
                                    {' '}
                                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                </Link>
                            </div>
                            <div className="text-right">
                                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase block">Fecha de Canje</span>
                                {' '}
                                <span className="font-body-sm text-body-sm font-medium text-on-surface">14 Oct 2024</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Editorial Lookbook Carousel Intermission */}
                <div className="relative rounded-xl overflow-hidden bg-on-background text-on-primary p-space-lg md:p-space-xl flex flex-col md:flex-row items-center justify-between gap-space-xl">
                    <div className="space-y-space-sm max-w-xl z-10">
                        <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary-fixed">Privilegios de Nivel Oro</span>
                        <h2 className="font-headline-lg text-headline-lg font-bold tracking-tight text-on-primary">¿Tienes un código especial de evento o desfile?</h2>
                        <p className="font-body-md text-body-md text-surface-container">
                            Ingresa directamente tu clave alfabética provista por tu Concierge de ASCEND para habilitar prendas antes del lanzamiento oficial.
                        </p>
                        {/* Code redemption input inline */}
                        <form className="pt-space-xs flex flex-col sm:flex-row items-stretch gap-space-xs max-w-md" onSubmit={handleRedeem}>
                            <input className="h-10 px-space-md rounded-lg bg-surface-container-lowest/10 border border-white/20 text-on-primary font-body-md text-body-md placeholder:text-surface-container/50 focus:outline-hidden focus:border-primary-container uppercase tracking-wider" id="custom-code-input" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Ej: ATELIER-PARIS-2025" type="text" />
                            <button className="h-10 px-space-lg rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg font-semibold transition-all shrink-0" type="submit">
                                Activar
                            </button>
                        </form>
                        {feedback && (
                            <div className={`text-xs font-medium pt-1 block ${feedback.ok ? 'text-emerald-300' : 'text-primary-fixed'}`} id="redemption-feedback">
                                {feedback.text}
                            </div>
                        )}
                    </div>
                    {/* Editorial Accent Image */}
                    <div className="relative w-full md:w-72 h-44 rounded-lg overflow-hidden shrink-0 shadow-lg">
                        <img className="w-full h-full object-cover object-center" data-alt="Editorial close up photograph of an haute couture wool tailored blazer in rich crimson red and architectural silhouette against a minimalist dark studio background, high fashion photography ASCEND Atelier aesthetic" src="/images/ascend/editorial-close-up-photograph-of-an.jpg" />
                        <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/80">
                            <span className="font-label-caps text-label-caps uppercase tracking-wider">Atelier FW25</span>
                            <span className="font-label-caps text-label-caps font-semibold">Drop 03</span>
                        </div>
                    </div>
                </div>
                {/* Information & FAQ Guidance Box */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-xs border-l-4 border-primary-container">
                    <div className="flex items-start gap-space-md">
                        <div className="w-10 h-10 rounded-full bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0 mt-0.5">
                            <span className="material-symbols-outlined text-[22px]">help_outline</span>
                        </div>
                        <div className="space-y-space-xs">
                            <h4 className="font-title-md text-title-md font-bold text-on-surface">¿Cómo funcionan los cupones en ASCEND?</h4>
                            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                Los cupones deben aplicarse en la pantalla de carrito o checkout y serán verificados con las condiciones comerciales activas antes del cierre del pedido. Cada cupón cuenta con vigencia determinada y restricciones específicas de monto mínimo o colecciones participantes. Si experimentas algún inconveniente con una clave promocional de cortesía, ponte en contacto directo con tu Concierge de cliente asignado.
                            </p>
                            <div className="pt-space-xs flex flex-wrap gap-space-lg text-primary-container font-label-md text-label-md font-semibold">
                                <a href="#" className="inline-flex items-center gap-1 hover:underline">
                                    <span>Ver términos y condiciones de promociones</span>
                                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                                </a>
                                <a href="#" className="inline-flex items-center gap-1 hover:underline">
                                    <span>Contactar a Concierge VIP</span>
                                    <span className="material-symbols-outlined text-[16px]">support_agent</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
