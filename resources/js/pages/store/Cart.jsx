import { useState } from 'react';
import { Link } from 'react-router-dom';
import useCountdown from '../../hooks/useCountdown';
import { formatCOP } from '../../lib/format';

const ITEMS = {
    'item-1': { price: 189000, max: 2 },
    'item-2': { price: 125000, max: 5 },
};
const MEMBER_DISCOUNT = 0.1; // Cupón ASCENDVIP aplicado

export default function Cart() {
    const timer = useCountdown(14 * 60 + 59);
    const [qty, setQty] = useState({ 'item-1': 1, 'item-2': 1 });

    const updateQty = (id, delta) =>
        setQty((q) => ({ ...q, [id]: Math.min(ITEMS[id].max, Math.max(1, q[id] + delta)) }));

    const lineTotal = (id) => ITEMS[id].price * qty[id];
    const subtotal = lineTotal('item-1') + lineTotal('item-2');
    const discount = Math.round(subtotal * MEMBER_DISCOUNT);
    const total = subtotal - discount;

    return (
        <>
            <div className="flex flex-col w-full">
                {/* Subtle Gradient Depth Backdrop */}
                <div className="w-full relative px-margin py-space-xl max-w-7xl mx-auto">
                    {/* Top Floating Ambient Glow */}
                    <div className="absolute top-10 right-20 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl pointer-events-none -z-10" />
                    <div className="absolute bottom-40 left-10 w-80 h-80 bg-surface-variant/40 rounded-full blur-2xl pointer-events-none -z-10" />
                    {/* Breadcrumb Navigation */}
                    <nav aria-label="Ruta de navegación" className="mb-space-md flex items-center gap-space-xs font-label-caps text-label-caps uppercase text-secondary">
                        <Link to="/" className="hover:text-on-surface transition-colors">Inicio</Link>
                        <span className="text-surface-variant">/</span>
                        <span className="text-primary-container font-semibold">Carrito de Compras</span>
                    </nav>
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
                        <div>
                            <div className="inline-flex items-center gap-space-xs mb-space-xs">
                                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                                <span className="font-label-caps text-label-caps uppercase tracking-wider text-primary-container">Atelier Checkout Express</span>
                            </div>
                            <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight uppercase flex items-baseline gap-space-sm">
                                Tu Carrito de Compras
                                {' '}
                                <span className="font-headline-md text-headline-md text-secondary font-normal">(2 prendas seleccionadas)</span>
                            </h1>
                        </div>
                        <div className="hidden lg:flex items-center gap-space-sm text-secondary font-label-md text-label-md">
                            <span className="material-symbols-outlined text-primary-container text-[20px]">verified_user</span>
                            {' '}
                            <span>
                                Reserva activa por
                                {' '}
                                <strong className="text-on-surface font-semibold" id="timer-badge">{timer}</strong>
                                {' '}
                                min
                            </span>
                        </div>
                    </div>
                    {/* VIP Session Notification Banner */}
                    <div className="w-full bg-surface-container-lowest rounded-lg shadow-xs p-space-md mb-space-xl flex items-center justify-between gap-space-md">
                        <div className="flex items-center gap-space-md">
                            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                            </div>
                            <div>
                                <div className="flex items-center gap-space-xs">
                                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">Sesión activa como Valentina Morales</span>
                                    <span className="px-space-xs py-0.5 rounded-sm text-[10px] font-label-caps font-bold bg-primary-fixed text-on-primary-fixed uppercase tracking-wider">
                                        VIP Black
                                    </span>
                                </div>
                                <p className="font-body-md text-body-md text-secondary">
                                    Tus prendas seleccionadas y los beneficios de tarifa VIP están sincronizados con tu atelier digital.
                                </p>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-space-xs text-primary-container font-label-md text-label-md font-semibold cursor-pointer hover:opacity-80 transition-opacity">
                            <span>Beneficios activos</span>
                            {' '}
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </div>
                    </div>
                    {/* Main Content Workspace (Split Layout) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
                        {/* Left Column: Cart Items List (8 Columns) */}
                        <section className="lg:col-span-8 flex flex-col gap-space-md">
                            {/* Shipping Incentive Progress Bar */}
                            <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-xs flex flex-col gap-space-xs">
                                <div className="flex items-center justify-between text-body-md">
                                    <span className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface">
                                        <span className="material-symbols-outlined text-primary-container text-[18px]">local_shipping</span>
                                        {' '}
                                        ¡Felicidades! Tienes
                                        {' '}
                                        <strong className="text-primary-container uppercase font-semibold">Envío Nacional Gratuito</strong>
                                    </span>
                                    <span className="font-label-caps text-label-caps text-primary-container font-bold">100% ALCANZADO</span>
                                </div>
                                <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                                    <div className="h-full bg-primary-container rounded-full transition-all duration-700" style={{ width: "100%" }} />
                                </div>
                            </div>
                            {/* Item 1: Corset Estructurado 'Siren' */}
                            <article className="bg-surface-container-lowest rounded-lg p-space-lg shadow-xs hover:shadow-md transition-shadow relative group">
                                <div className="flex flex-col sm:flex-row gap-space-lg items-start">
                                    {/* Product Thumbnail */}
                                    <div className="relative w-full sm:w-32 h-44 rounded-lg overflow-hidden bg-surface-container shrink-0">
                                        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Editorial close-up of a high-fashion structured crimson corset named Siren, crafted in satin twill with architectural boning. Studio dramatic lighting on soft neutral beige background, minimalist luxury fashion aesthetic, rich scarlet and deep red palette." src="/images/ascend/editorial-close-up-of-a-high.jpg" />
                                        {' '}
                                        <span className="absolute top-2 left-2 bg-inverse-surface/80 backdrop-blur-xs text-surface-bright font-label-caps text-[9px] px-1.5 py-0.5 rounded-sm uppercase font-semibold">
                                            Edición Limitada
                                        </span>
                                    </div>
                                    {/* Product Details */}
                                    <div className="flex-1 flex flex-col justify-between w-full h-full">
                                        <div>
                                            <div className="flex items-start justify-between gap-space-sm mb-space-xs">
                                                <div>
                                                    <span className="font-label-caps text-label-caps uppercase text-secondary tracking-widest block">Atelier Runway 2025</span>
                                                    <h2 className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight">Corset Estructurado 'Siren'</h2>
                                                </div>
                                                {/* Unit Price */}
                                                <div className="text-right">
                                                    <span className="font-title-md text-title-md text-on-surface font-semibold block">$189.000 COP</span>
                                                    {' '}
                                                    <span className="font-label-caps text-label-caps text-secondary">Unitario</span>
                                                </div>
                                            </div>
                                            {/* Attributes tags */}
                                            <div className="flex flex-wrap items-center gap-space-sm mt-space-xs mb-space-md font-body-sm text-body-sm text-secondary">
                                                <span className="flex items-center gap-1.5 bg-surface-container-low px-2 py-1 rounded-sm">
                                                    <span className="w-3 h-3 rounded-full bg-[#A30520] inline-block" />
                                                    {' '}
                                                    Rojo Carmín
                                                </span>
                                                <span className="bg-surface-container-low px-2 py-1 rounded-sm">
                                                    Talla:
                                                    {' '}
                                                    <strong className="text-on-surface font-semibold">S</strong>
                                                </span>
                                                <span className="bg-surface-container-low px-2 py-1 rounded-sm font-label-caps text-[10px] text-tertiary font-medium">
                                                    SKU: ASC-SRN-04
                                                </span>
                                            </div>
                                        </div>
                                        {/* Interactive Controls and Total Row */}
                                        <div className="flex items-center justify-between pt-space-sm mt-space-sm border-t-0 bg-surface-container-low/40 p-space-sm rounded-lg">
                                            <div className="flex items-center gap-space-md">
                                                {/* Quantity Stepper */}
                                                <div className="flex items-center bg-surface-container-lowest rounded-lg shadow-xs px-1 py-1">
                                                    <button aria-label="Disminuir cantidad" className="w-7 h-7 rounded-sm flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors disabled:opacity-30 disabled:pointer-events-none" disabled={qty['item-1'] <= 1} onClick={() => updateQty('item-1', -1)} type="button">
                                                        <span className="material-symbols-outlined text-[16px]">remove</span>
                                                    </button>
                                                    <span className="w-8 text-center font-label-md text-label-md font-bold text-on-surface" id="qty-item-1">{qty['item-1']}</span>
                                                    <button aria-label="Aumentar cantidad" className="w-7 h-7 rounded-sm flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors" disabled={qty['item-1'] >= ITEMS['item-1'].max} onClick={() => updateQty('item-1', 1)} type="button">
                                                        <span className="material-symbols-outlined text-[16px]">add</span>
                                                    </button>
                                                </div>
                                                {/* Stock Warning Indicator */}
                                                <div className="flex items-center gap-1 text-primary-container font-label-caps text-[11px] font-semibold">
                                                    <span className="material-symbols-outlined text-[14px]">bolt</span>
                                                    <span>Máx 2 uds en stock</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-space-lg">
                                                <div className="text-right">
                                                    <span className="font-label-caps text-label-caps text-secondary block">Subtotal</span>
                                                    {' '}
                                                    <span className="font-headline-md text-headline-md text-on-surface font-semibold" id="subtotal-item-1">{formatCOP(lineTotal('item-1'))}</span>
                                                </div>
                                                {/* Delete Action */}
                                                <button className="text-secondary hover:text-primary-container p-2 rounded-lg hover:bg-surface-container transition-colors" title="Eliminar prenda" type="button">
                                                    <span className="material-symbols-outlined text-[20px]">delete_outline</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                            {/* Item 2: Camiseta Boxy Heavyweight 'Archive 92' */}
                            <article className="bg-surface-container-lowest rounded-lg p-space-lg shadow-xs hover:shadow-md transition-shadow relative group">
                                <div className="flex flex-col sm:flex-row gap-space-lg items-start">
                                    {/* Product Thumbnail */}
                                    <div className="relative w-full sm:w-32 h-44 rounded-lg overflow-hidden bg-surface-container shrink-0">
                                        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Editorial look of an oversized heavyweight luxury black cotton t-shirt with minimal graphic archive stitching. High fashion studio portrait on pristine white surface, bold clean tailoring, monochrome depth and luxury drape." src="/images/ascend/editorial-look-of-an-oversized-heavyweight.jpg" />
                                        {' '}
                                        <span className="absolute top-2 left-2 bg-surface-container-lowest/90 backdrop-blur-xs text-on-surface font-label-caps text-[9px] px-1.5 py-0.5 rounded-sm uppercase font-semibold">
                                            Esencial
                                        </span>
                                    </div>
                                    {/* Product Details */}
                                    <div className="flex-1 flex flex-col justify-between w-full h-full">
                                        <div>
                                            <div className="flex items-start justify-between gap-space-sm mb-space-xs">
                                                <div>
                                                    <span className="font-label-caps text-label-caps uppercase text-secondary tracking-widest block">Collection Capsule 02</span>
                                                    <h2 className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight">
                                                        Camiseta Boxy Heavyweight 'Archive 92'
                                                    </h2>
                                                </div>
                                                {/* Unit Price */}
                                                <div className="text-right">
                                                    <span className="font-title-md text-title-md text-on-surface font-semibold block">$125.000 COP</span>
                                                    {' '}
                                                    <span className="font-label-caps text-label-caps text-secondary">Unitario</span>
                                                </div>
                                            </div>
                                            {/* Attributes tags */}
                                            <div className="flex flex-wrap items-center gap-space-sm mt-space-xs mb-space-md font-body-sm text-body-sm text-secondary">
                                                <span className="flex items-center gap-1.5 bg-surface-container-low px-2 py-1 rounded-sm">
                                                    <span className="w-3 h-3 rounded-full bg-on-background inline-block" />
                                                    {' '}
                                                    Negro Profundo
                                                </span>
                                                <span className="bg-surface-container-low px-2 py-1 rounded-sm">
                                                    Talla:
                                                    {' '}
                                                    <strong className="text-on-surface font-semibold">M</strong>
                                                </span>
                                                <span className="bg-surface-container-low px-2 py-1 rounded-sm font-label-caps text-[10px] text-tertiary font-medium">
                                                    SKU: ASC-BX-092
                                                </span>
                                            </div>
                                        </div>
                                        {/* Interactive Controls and Total Row */}
                                        <div className="flex items-center justify-between pt-space-sm mt-space-sm bg-surface-container-low/40 p-space-sm rounded-lg">
                                            <div className="flex items-center gap-space-md">
                                                {/* Quantity Stepper */}
                                                <div className="flex items-center bg-surface-container-lowest rounded-lg shadow-xs px-1 py-1">
                                                    <button aria-label="Disminuir cantidad" className="w-7 h-7 rounded-sm flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors disabled:opacity-30 disabled:pointer-events-none" disabled={qty['item-2'] <= 1} onClick={() => updateQty('item-2', -1)} type="button">
                                                        <span className="material-symbols-outlined text-[16px]">remove</span>
                                                    </button>
                                                    <span className="w-8 text-center font-label-md text-label-md font-bold text-on-surface" id="qty-item-2">{qty['item-2']}</span>
                                                    <button aria-label="Aumentar cantidad" className="w-7 h-7 rounded-sm flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors" disabled={qty['item-2'] >= ITEMS['item-2'].max} onClick={() => updateQty('item-2', 1)} type="button">
                                                        <span className="material-symbols-outlined text-[16px]">add</span>
                                                    </button>
                                                </div>
                                                {/* Stock Comfort Indicator */}
                                                <div className="flex items-center gap-1 text-secondary font-label-caps text-[11px]">
                                                    <span className="material-symbols-outlined text-[14px] text-tertiary">check_circle</span>
                                                    <span>Disponible en bodega</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-space-lg">
                                                <div className="text-right">
                                                    <span className="font-label-caps text-label-caps text-secondary block">Subtotal</span>
                                                    {' '}
                                                    <span className="font-headline-md text-headline-md text-on-surface font-semibold" id="subtotal-item-2">{formatCOP(lineTotal('item-2'))}</span>
                                                </div>
                                                {/* Delete Action */}
                                                <button className="text-secondary hover:text-primary-container p-2 rounded-lg hover:bg-surface-container transition-colors" title="Eliminar prenda" type="button">
                                                    <span className="material-symbols-outlined text-[20px]">delete_outline</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                            {/* Value Proposition Mini-Bento */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md mt-space-sm">
                                <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-xs flex items-start gap-space-sm">
                                    <span className="material-symbols-outlined text-primary-container text-[24px]">local_shipping</span>
                                    <div>
                                        <h3 className="font-label-md text-label-md font-semibold text-on-surface">Despacho Prioritario</h3>
                                        <p className="font-body-sm text-body-sm text-secondary">24 a 48 horas hábiles a principales capitales.</p>
                                    </div>
                                </div>
                                <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-xs flex items-start gap-space-sm">
                                    <span className="material-symbols-outlined text-primary-container text-[24px]">sync_alt</span>
                                    <div>
                                        <h3 className="font-label-md text-label-md font-semibold text-on-surface">Cambio de Talla Libre</h3>
                                        <p className="font-body-sm text-body-sm text-secondary">30 días de cobertura sin costo logístico.</p>
                                    </div>
                                </div>
                                <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-xs flex items-start gap-space-sm">
                                    <span className="material-symbols-outlined text-primary-container text-[24px]">workspace_premium</span>
                                    <div>
                                        <h3 className="font-label-md text-label-md font-semibold text-on-surface">Garantía Atelier</h3>
                                        <p className="font-body-sm text-body-sm text-secondary">Costuras reforzadas y materias primas certificadas.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* Right Column: Order Summary (4 Columns Sticky) */}
                        <aside className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-space-md">
                            <div className="bg-surface-container-lowest rounded-lg p-space-lg shadow-md flex flex-col gap-space-md">
                                <div className="flex items-center justify-between pb-space-xs">
                                    <h2 className="font-title-md text-title-md uppercase tracking-wider text-on-surface font-bold">Resumen de Pedido</h2>
                                    <span className="font-label-caps text-label-caps text-secondary uppercase">2 Artículos</span>
                                </div>
                                {/* Price Calculations Table */}
                                <div className="space-y-space-sm font-body-md text-body-md">
                                    <div className="flex justify-between items-center text-secondary">
                                        <span>Subtotal productos</span>
                                        <span className="font-title-md text-title-md text-on-surface font-semibold" id="summary-subtotal">{formatCOP(subtotal)}</span>
                                    </div>
                                    {/* Discount Line Item */}
                                    <div className="flex justify-between items-center text-primary-container">
                                        <span className="flex items-center gap-1 font-label-md text-label-md">
                                            <span className="material-symbols-outlined text-[16px]">sell</span>
                                            {' '}
                                            Descuento Código VIP (10%)
                                        </span>
                                        <span className="font-title-md text-title-md font-semibold" id="summary-discount">-{formatCOP(discount)}</span>
                                    </div>
                                    {/* Shipping Line Item */}
                                    <div className="flex justify-between items-center text-secondary">
                                        <span className="flex items-center gap-1">
                                            <span>Envío Nacional Asegurado</span>
                                            <span className="material-symbols-outlined text-[16px] text-tertiary" title="Gratis por compras superiores a $250.000 COP">info</span>
                                        </span>
                                        <span className="font-label-caps text-label-caps bg-surface-container-low px-2 py-0.5 rounded-sm text-primary font-bold">GRATIS</span>
                                    </div>
                                    {/* Dynamic Separation */}
                                    <div className="h-px bg-surface-container-highest my-space-sm" />
                                    {/* Total Line */}
                                    <div className="flex justify-between items-baseline pt-space-xs">
                                        <div>
                                            <span className="font-headline-md text-headline-md font-bold text-on-surface uppercase block">Total Estimado</span>
                                            {' '}
                                            <span className="font-body-sm text-body-sm text-secondary block text-[11px] leading-tight">IVA (19%) incluido</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-display-lg text-display-lg font-bold text-primary-container" id="summary-total">{formatCOP(total)}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Stock verification warning notice */}
                                <div className="bg-surface-container-low p-space-sm rounded-lg flex items-start gap-space-xs">
                                    <span className="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">info</span>
                                    <p className="font-body-sm text-body-sm text-secondary text-[12px] leading-snug">
                                        El total final se confirmará al procesar la revisión de stock en tiempo real en la pasarela de pago.
                                    </p>
                                </div>
                                {/* Coupon Input & Tag Section */}
                                <div className="pt-space-xs">
                                    <label className="font-label-caps text-label-caps uppercase text-secondary block mb-space-xs" htmlFor="coupon-input">
                                        Cupón o Tarjeta de Regalo
                                    </label>
                                    <div className="flex gap-space-xs">
                                        <div className="relative flex-1">
                                            <input className="w-full h-10 px-3 bg-surface-container-low rounded-lg font-label-md text-label-md text-on-surface uppercase tracking-wider focus:outline-hidden focus:ring-1 focus:ring-primary-container" id="coupon-input" placeholder="Ingresa código..." type="text" defaultValue="ASCENDVIP" />
                                        </div>
                                        <button className="h-10 px-4 bg-surface-container-highest text-on-surface font-label-md text-label-md font-semibold rounded-lg hover:bg-secondary-container transition-colors" type="button">
                                            Aplicar
                                        </button>
                                    </div>
                                    {/* Active Coupon Pill */}
                                    <div className="mt-space-sm bg-surface-container-low p-space-xs px-space-sm rounded-lg flex items-center justify-between text-body-sm">
                                        <div className="flex items-center gap-space-xs text-primary-container">
                                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                            <span className="font-label-caps text-[11px] font-bold">ASCENDVIP APLICADO</span>
                                        </div>
                                        <span className="font-body-sm text-[11px] text-secondary">-10% en total</span>
                                    </div>
                                    <p className="font-body-sm text-[11px] text-secondary-container-variant text-secondary mt-1 italic">
                                        Cupón de bienvenida sujeto a condiciones para miembros del Club Atelier.
                                    </p>
                                </div>
                                {/* Actions CTA Block */}
                                <div className="space-y-space-sm pt-space-xs">
                                    <Link to="/checkout" className="w-full h-12 bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg font-semibold rounded-lg flex items-center justify-center gap-space-sm shadow-md transition-all group">
                                        <span>Finalizar Pedido</span>
                                        <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </Link>
                                    {' '}
                                    <Link to="/hombre" className="w-full h-10 text-center font-label-md text-label-md text-secondary hover:text-on-surface flex items-center justify-center gap-space-xs transition-colors">
                                        <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                                        <span>Continuar Comprando</span>
                                    </Link>
                                </div>
                                {/* Trust Badges */}
                                <div className="pt-space-sm border-t-0 bg-surface-container-low/50 p-space-sm rounded-lg flex flex-col gap-space-xs">
                                    <div className="flex items-center justify-between text-secondary">
                                        <span className="font-label-caps text-label-caps uppercase text-[10px] tracking-wider">Transacciones Protegidas</span>
                                        <div className="flex items-center gap-1 font-label-caps text-[10px]">
                                            <span className="material-symbols-outlined text-[14px] text-tertiary">lock</span>
                                            <span>SSL 256-Bit</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center gap-space-md text-secondary opacity-70 py-1">
                                        <span className="font-label-caps text-[11px] tracking-widest font-bold">VISA</span>
                                        <span className="font-label-caps text-[11px] tracking-widest font-bold">MASTERCARD</span>
                                        <span className="font-label-caps text-[11px] tracking-widest font-bold">PSE</span>
                                        <span className="font-label-caps text-[11px] tracking-widest font-bold">ADDI</span>
                                        <span className="font-label-caps text-[11px] tracking-widest font-bold">BANCOLOMBIA</span>
                                    </div>
                                </div>
                            </div>
                            {/* Curated Upsell Strip */}
                            <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-xs">
                                <span className="font-label-caps text-label-caps text-secondary uppercase block mb-space-xs">Complemento Recomendado</span>
                                <div className="flex items-center gap-space-md">
                                    <div className="w-14 h-16 rounded-sm bg-surface-container overflow-hidden shrink-0">
                                        <img className="w-full h-full object-cover" data-alt="Minimalist luxury leather care balm in sleek matte black bottle with embossed silver lettering. High-end product photography." src="/images/ascend/minimalist-luxury-leather-care-balm-in.jpg" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-label-md text-label-md text-on-surface font-semibold truncate">Bálsamo Cuero Textil Pro</h4>
                                        <span className="font-body-sm text-body-sm text-secondary block">$42.000 COP</span>
                                    </div>
                                    <button className="px-2.5 py-1.5 bg-surface-container-low hover:bg-primary-container hover:text-on-primary rounded-sm text-on-surface font-label-caps text-[10px] font-bold uppercase transition-colors" type="button">
                                        + Añadir
                                    </button>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}
