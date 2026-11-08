import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CHANNEL_LABEL = { whatsapp: 'WhatsApp', instagram: 'Instagram DM', tiktok: 'TikTok' };

export default function Checkout() {
    const navigate = useNavigate();
    const [channel, setChannel] = useState('whatsapp');
    const [status, setStatus] = useState('idle'); // idle | sending | done

    const cardClass = (value) =>
        `channel-card flex items-start gap-space-md p-space-md rounded-xl cursor-pointer transition-all bg-surface-container-low ${
            channel === value ? 'shadow-[0_0_0_2px_#c62835]' : 'hover:bg-surface-container'
        }`;

    const handleSubmit = () => {
        if (status !== 'idle') return;
        setStatus('sending');
        setTimeout(() => {
            setStatus('done');
            setTimeout(() => navigate('/cuenta/pedidos'), 1600);
        }, 1400);
    };

    return (
        <>
            <div className="flex flex-col w-full">
                <div className="w-full px-margin py-space-xl max-w-7xl mx-auto">
                    {/* Breadcrumb Hierarchy */}
                    <nav className="flex items-center gap-space-xs text-secondary mb-space-lg font-label-md text-label-md">
                        <Link to="/" className="hover:text-primary transition-colors flex items-center gap-space-xxs">
                            <span>Inicio</span>
                        </Link>
                        <span className="material-symbols-outlined text-[14px] text-secondary">chevron_right</span>
                        <Link to="/carrito" className="hover:text-primary transition-colors">Carrito</Link>
                        <span className="material-symbols-outlined text-[14px] text-secondary">chevron_right</span>
                        <span className="text-on-surface font-semibold">Finalizar Pedido</span>
                    </nav>
                    {/* Header Section with Pre-Assigned ID & Editorial Tone */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md pb-space-lg">
                        <div className="space-y-space-xs">
                            <div className="flex items-center gap-space-sm">
                                <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest bg-primary-fixed/40 px-2 py-0.5 rounded-sm">
                                    Checkout Protocol Atelier
                                </span>
                                <span className="font-label-caps text-label-caps text-secondary tracking-widest uppercase">Paso 02 de 02</span>
                            </div>
                            <h1 className="font-display-lg text-display-lg font-bold text-on-surface tracking-tight uppercase">Confirmación y Registro de Pedido</h1>
                        </div>
                        <div className="flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-sm rounded-lg self-start lg:self-auto">
                            <span className="material-symbols-outlined text-primary text-[20px]">fingerprint</span>
                            <div className="flex flex-col">
                                <span className="font-label-caps text-label-caps text-secondary uppercase">Folio Temporal Reservado</span>
                                <span className="font-title-md text-title-md font-bold text-on-surface tracking-wide">#ASC-8945</span>
                            </div>
                        </div>
                    </div>
                    {/* Commercial Rule Banner (Policy callout) */}
                    <div className="bg-surface-container-low rounded-xl p-space-md lg:p-space-lg mb-space-xl relative overflow-hidden shadow-xs">
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
                        <div className="flex items-start sm:items-center gap-space-md pl-space-xs">
                            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-primary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-space-xs mb-space-xxs">
                                    <span className="font-label-caps text-label-caps uppercase text-primary font-bold tracking-wider">Aviso de Exclusividad y Stock Real</span>
                                    <span className="w-1 h-1 rounded-full bg-secondary" />
                                    <span className="font-label-md text-label-md text-secondary">Control Físico en Bodega</span>
                                </div>
                                <p className="font-body-md text-body-md text-on-surface font-medium leading-relaxed">
                                    Tu pedido se registrará como
                                    {' '}
                                    <span className="text-primary font-bold tracking-tight bg-primary-fixed/50 px-1.5 py-0.5 rounded-sm">PENDIENTE DE REVISIÓN</span>
                                    . Un asesor concierge verificará el stock en bodega física antes de procesar el pago y confirmación definitiva.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Main Two-Column Structure */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
                        {/* LEFT COLUMN: Client Contact, Dispatch & Channel Selection (7 Cols) */}
                        <div className="lg:col-span-7 space-y-space-xl">
                            {/* SECTION 1: Contact and Delivery Data (Pre-loaded) */}
                            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs space-y-space-lg">
                                <div className="flex items-center justify-between pb-space-sm">
                                    <div className="flex items-center gap-space-sm">
                                        <span className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center font-label-caps text-label-caps text-on-surface font-bold">
                                            01
                                        </span>
                                        <div>
                                            <h2 className="font-title-md text-title-md font-bold text-on-surface tracking-tight uppercase">Datos de Contacto y Entrega</h2>
                                            <span className="font-label-caps text-label-caps text-secondary">Perfil sincronizado de clienta VIP</span>
                                        </div>
                                    </div>
                                    <button className="font-label-md text-label-md text-primary font-semibold hover:underline flex items-center gap-space-xxs" type="button">
                                        <span className="material-symbols-outlined text-[16px]">edit</span>
                                        {' '}
                                        Editar
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                                    <div className="bg-surface-container-low p-space-md rounded-lg">
                                        <span className="font-label-caps text-label-caps text-secondary uppercase block mb-1">Titular de la Cuenta</span>
                                        {' '}
                                        <span className="font-label-lg text-label-lg font-semibold text-on-surface block">Valentina Morales</span>
                                        {' '}
                                        <span className="font-body-sm text-body-sm text-secondary">Membresía Atelier Black Elite</span>
                                    </div>
                                    <div className="bg-surface-container-low p-space-md rounded-lg">
                                        <span className="font-label-caps text-label-caps text-secondary uppercase block mb-1">Correo Electrónico</span>
                                        {' '}
                                        <span className="font-label-lg text-label-lg font-semibold text-on-surface block truncate">valentina@ascend.com</span>
                                        {' '}
                                        <span className="font-body-sm text-body-sm text-secondary">Comprobantes y trazabilidad digital</span>
                                    </div>
                                    <div className="bg-surface-container-low p-space-md rounded-lg">
                                        <span className="font-label-caps text-label-caps text-secondary uppercase block mb-1">Línea de Enlace / Teléfono</span>
                                        {' '}
                                        <span className="font-label-lg text-label-lg font-semibold text-on-surface block">+57 300 492 8812</span>
                                        {' '}
                                        <span className="font-body-sm text-body-sm text-secondary">Habilitado para mensajería directa</span>
                                    </div>
                                    <div className="bg-surface-container-low p-space-md rounded-lg">
                                        <span className="font-label-caps text-label-caps text-secondary uppercase block mb-1">Destino Residencial</span>
                                        {' '}
                                        <span className="font-label-lg text-label-lg font-semibold text-on-surface block truncate">Calle 10 #43E-20</span>
                                        {' '}
                                        <span className="font-body-sm text-body-sm text-secondary">El Poblado, Medellín, Antioquia</span>
                                    </div>
                                </div>
                                {/* Note on address safety */}
                                <div className="flex items-center gap-space-xs text-secondary font-body-sm text-body-sm pt-space-xs">
                                    <span className="material-symbols-outlined text-[16px] text-tertiary">lock</span>
                                    <span>Datos encriptados bajo protocolo TLS 1.3 con custodia privada.</span>
                                </div>
                            </div>
                            {/* SECTION 2: Selection of Personalized Contact Channel */}
                            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs space-y-space-lg">
                                <div className="flex items-center gap-space-sm pb-space-xs">
                                    <span className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center font-label-caps text-label-caps text-on-surface font-bold">
                                        02
                                    </span>
                                    <div>
                                        <div className="flex items-center gap-space-xs">
                                            <h2 className="font-title-md text-title-md font-bold text-on-surface tracking-tight uppercase">Canal de Concierge &amp; Atención</h2>
                                            <span className="text-primary font-bold text-label-caps text-label-caps uppercase bg-primary-fixed/40 px-1.5 py-0.5 rounded-sm">
                                                Obligatorio
                                            </span>
                                        </div>
                                        <span className="font-label-caps text-label-caps text-secondary">Selecciona por dónde validará tu asesor el inventario en tiempo real</span>
                                    </div>
                                </div>
                                {/* Channel Selection Options */}
                                <div className="space-y-space-md" id="channel-selector-group">
                                    {/* OPTION A: WhatsApp Concierge (Pre-selected) */}
                                    <label className={cardClass('whatsapp')}>
                                        <input checked={channel === 'whatsapp'} onChange={() => setChannel('whatsapp')} className="mt-1 accent-primary w-4 h-4 cursor-pointer" name="concierge_channel" type="radio" value="whatsapp" />
                                        <div className="w-11 h-11 rounded-lg bg-[#25D366]/15 flex items-center justify-center shrink-0 text-[#128C7E]">
                                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.32C9.36 7.32 9.09 7.38 8.86 7.63C8.63 7.88 7.97 8.5 7.97 9.77C7.97 11.04 8.9 12.27 9.03 12.44C9.16 12.61 10.82 15.3 13.44 16.33C15.62 17.18 16.06 17.02 16.54 16.97C17.02 16.92 18.08 16.34 18.3 15.72C18.52 15.1 18.52 14.57 18.45 14.46C18.38 14.35 18.2 14.28 17.93 14.15C17.67 14.02 16.36 13.37 16.12 13.28C15.88 13.19 15.71 13.15 15.53 13.41C15.36 13.67 14.86 14.28 14.71 14.46C14.56 14.63 14.41 14.65 14.15 14.52C13.89 14.39 12.78 14.03 11.47 12.86C10.45 11.95 9.76 10.83 9.63 10.61C9.5 10.39 9.62 10.27 9.75 10.14C9.87 10.02 10.01 9.83 10.15 9.68C10.28 9.53 10.33 9.42 10.41 9.25C10.5 9.08 10.45 8.93 10.39 8.82C10.33 8.71 9.77 7.41 9.53 7.32Z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <span className="font-label-lg text-label-lg font-bold text-on-surface">WhatsApp Concierge Oficial</span>
                                                <span className="font-label-caps text-label-caps text-[#065F46] bg-[#ECFDF5] px-2 py-0.5 rounded-sm font-bold uppercase">
                                                    Recomendado
                                                </span>
                                            </div>
                                            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                                                Recibirás el resumen estructurado en tu chat para validación rápida con un asesor.
                                            </p>
                                            <div className="flex items-center gap-space-xs mt-2 text-secondary font-label-md text-label-md">
                                                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                                                <span>Tiempo promedio de respuesta: &lt; 4 minutos</span>
                                            </div>
                                        </div>
                                    </label>
                                    {/* OPTION B: Instagram Direct */}
                                    <label className={cardClass('instagram')}>
                                        <input checked={channel === 'instagram'} onChange={() => setChannel('instagram')} className="mt-1 accent-primary w-4 h-4 cursor-pointer" name="concierge_channel" type="radio" value="instagram" />
                                        <div className="w-11 h-11 rounded-lg bg-[#E1306C]/10 flex items-center justify-center shrink-0 text-[#E1306C]">
                                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <span className="font-label-lg text-label-lg font-bold text-on-surface">Instagram Direct</span>
                                                <span className="font-label-caps text-label-caps text-secondary uppercase">Canal Editorial</span>
                                            </div>
                                            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                                                @ascend.atelier - Asistencia vía DM oficial y revisión personalizada por stylist de guardia.
                                            </p>
                                        </div>
                                    </label>
                                    {/* OPTION C: TikTok Fashion Shop */}
                                    <label className={cardClass('tiktok')}>
                                        <input checked={channel === 'tiktok'} onChange={() => setChannel('tiktok')} className="mt-1 accent-primary w-4 h-4 cursor-pointer" name="concierge_channel" type="radio" value="tiktok" />
                                        <div className="w-11 h-11 rounded-lg bg-black/10 flex items-center justify-center shrink-0 text-on-surface">
                                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.4a6.33 6.33 0 0 0-6.62 6.29A6.34 6.34 0 0 0 10.06 22a6.34 6.34 0 0 0 6.32-6.33V9.17a8.28 8.28 0 0 0 5.21 1.83V7.55a4.84 4.84 0 0 1-2-.86z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <span className="font-label-lg text-label-lg font-bold text-on-surface">TikTok Fashion Shop</span>
                                                <span className="font-label-caps text-label-caps text-secondary uppercase">Canal Verificado</span>
                                            </div>
                                            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                                                Contacto por canal verificado de la boutique en red social y sincronización de ticket.
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            {/* SECTION 3: Action Trigger & Guarantee Micro-copy */}
                            <div className="space-y-space-md">
                                <button
                                    className={`w-full ${status === 'done' ? 'bg-tertiary' : 'bg-primary hover:bg-primary-container'} text-on-primary py-4 px-space-xl rounded-lg font-label-lg text-label-lg tracking-wide uppercase font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-space-sm group ${status === 'sending' ? 'opacity-90 cursor-wait' : ''}`}
                                    id="submit-checkout-btn"
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={status !== 'idle'}
                                >
                                    {status === 'idle' && (
                                        <>
                                            <span className="material-symbols-outlined text-[22px] group-hover:translate-x-0.5 transition-transform">send</span>
                                            <span>Registrar Pedido como Pendiente de Revisión y Conectar con {CHANNEL_LABEL[channel]}</span>
                                        </>
                                    )}
                                    {status === 'sending' && (
                                        <>
                                            <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                                            <span>Generando Registro #ASC-8945 y Enlazando Concierge...</span>
                                        </>
                                    )}
                                    {status === 'done' && (
                                        <>
                                            <span className="material-symbols-outlined text-[20px]">check_circle</span>
                                            <span>¡Pedido #ASC-8945 registrado como Pendiente de Revisión!</span>
                                        </>
                                    )}
                                </button>
                                <div className="flex items-start gap-space-sm bg-surface-container-low/70 p-space-md rounded-lg">
                                    <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">info</span>
                                    <div className="space-y-1">
                                        <p className="font-label-md text-label-md text-on-surface font-semibold">Garantía de Cero Cargo Anticipado</p>
                                        <p className="font-body-sm text-body-sm text-secondary leading-relaxed">
                                            No se realizará ningún cobro automático en este paso. Se comprobará inventario en tiempo real en nuestras bodegas de Medellín y Bogotá. Recibirás tu link seguro de liquidación final únicamente tras validar existencias.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* RIGHT COLUMN: Order Summary & Luxury Breakdown (5 Cols) */}
                        <div className="lg:col-span-5">
                            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs sticky top-28 space-y-space-lg">
                                {/* Summary Header */}
                                <div className="flex items-center justify-between border-b-0 pb-space-xs">
                                    <div>
                                        <h2 className="font-title-md text-title-md font-bold text-on-surface tracking-tight uppercase">Resumen del Pedido</h2>
                                        <span className="font-label-caps text-label-caps text-secondary">2 prendas seleccionadas en bolsa</span>
                                    </div>
                                    <span className="font-label-caps text-label-caps bg-surface-container px-2.5 py-1 rounded-sm text-on-surface font-bold tracking-wider">
                                        ATELIER ARCHIVE
                                    </span>
                                </div>
                                {/* Product Items List */}
                                <div className="space-y-space-md">
                                    {/* Item 1: Corset Estructurado Siren */}
                                    <div className="flex gap-space-md items-center group">
                                        <div className="w-20 h-24 rounded-lg bg-surface-container-high overflow-hidden shrink-0 relative">
                                            <img className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" data-alt="High-fashion structured carmine red corset with sharp geometric lines and satin matte finish photographed in an architectural studio setting with soft directional shadows" src="/images/ascend/high-fashion-structured-carmine-red-corset.jpg" />
                                            {' '}
                                            <span className="absolute top-1 left-1 bg-on-surface text-surface-bright font-label-caps text-[9px] px-1.5 py-0.5 rounded-sm font-bold">
                                                1x
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="font-label-lg text-label-lg font-bold text-on-surface leading-snug">Corset Estructurado Siren</h3>
                                            </div>
                                            <div className="flex items-center gap-space-xs mt-1 text-secondary font-body-sm text-body-sm">
                                                <span>Talla S</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
                                                    {' '}
                                                    Rojo Carmín
                                                </span>
                                            </div>
                                            <div className="mt-2 text-right">
                                                <span className="font-label-lg text-label-lg font-bold text-on-surface">$189.000 COP</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-px bg-surface-container-highest" />
                                    {/* Item 2: Camiseta Boxy Archive 92 */}
                                    <div className="flex gap-space-md items-center group">
                                        <div className="w-20 h-24 rounded-lg bg-surface-container-high overflow-hidden shrink-0 relative">
                                            <img className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" data-alt="Minimalist boxy fit heavy cotton t-shirt in pure washed matte black on a minimalist mannequin, editorial fashion lookbook lighting with crisp contours" src="/images/ascend/minimalist-boxy-fit-heavy-cotton-t.jpg" />
                                            {' '}
                                            <span className="absolute top-1 left-1 bg-on-surface text-surface-bright font-label-caps text-[9px] px-1.5 py-0.5 rounded-sm font-bold">
                                                1x
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="font-label-lg text-label-lg font-bold text-on-surface leading-snug">Camiseta Boxy 'Archive 92'</h3>
                                            </div>
                                            <div className="flex items-center gap-space-xs mt-1 text-secondary font-body-sm text-body-sm">
                                                <span>Talla M</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <span className="w-2.5 h-2.5 rounded-full bg-on-surface inline-block" />
                                                    {' '}
                                                    Negro
                                                </span>
                                            </div>
                                            <div className="mt-2 text-right">
                                                <span className="font-label-lg text-label-lg font-bold text-on-surface">$125.000 COP</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Financial Calculation Breakdown */}
                                <div className="bg-surface-container-low p-space-md rounded-xl space-y-space-sm pt-space-md">
                                    <div className="flex justify-between items-center font-body-md text-body-md text-secondary">
                                        <span>Subtotal Catálogo</span>
                                        <span className="font-semibold text-on-surface">$314.000 COP</span>
                                    </div>
                                    <div className="flex justify-between items-center font-body-md text-body-md">
                                        <div className="flex items-center gap-1.5 text-primary">
                                            <span className="material-symbols-outlined text-[18px]">sell</span>
                                            <span className="font-semibold">Cupón 'ASCENDVIP'</span>
                                            <span className="text-[10px] bg-primary-fixed/60 text-primary uppercase font-bold px-1.5 py-0.5 rounded-sm">10% OFF</span>
                                        </div>
                                        <span className="font-bold text-primary">-$31.400 COP</span>
                                    </div>
                                    <div className="flex justify-between items-center font-body-md text-body-md text-secondary">
                                        <div className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[18px] text-tertiary">local_shipping</span>
                                            <span>Envío Asegurado Nacional</span>
                                            <span className="font-label-caps text-label-caps text-tertiary bg-tertiary-fixed/30 px-1.5 py-0.2 rounded-sm font-bold">CORTESÍA</span>
                                        </div>
                                        <span className="font-semibold text-on-surface">$0 COP</span>
                                    </div>
                                    <div className="h-px bg-surface-container my-space-xs" />
                                    <div className="flex justify-between items-baseline pt-space-xs">
                                        <div>
                                            <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary block">Total Estimado Registrado</span>
                                            {' '}
                                            <span className="font-body-sm text-body-sm text-secondary">Impuestos incluidos según régimen</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-display-lg text-display-lg font-bold text-on-surface tracking-tight">$282.600</span>
                                            {' '}
                                            <span className="font-label-md text-label-md font-bold text-secondary ml-1">COP</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Concierge Pipeline Timeline Indicator */}
                                <div className="p-space-md bg-surface-container rounded-lg space-y-space-sm">
                                    <span className="font-label-caps text-label-caps text-secondary uppercase font-bold block">Flujo de Liquidación Asistida</span>
                                    <div className="grid grid-cols-3 gap-2 text-center">
                                        <div className="bg-surface-container-lowest p-2 rounded-sm flex flex-col items-center">
                                            <span className="material-symbols-outlined text-primary text-[18px]">history_edu</span>
                                            <span className="font-label-caps text-[10px] font-bold text-on-surface mt-1 leading-tight">1. Registro</span>
                                            <span className="font-body-sm text-[10px] text-primary font-semibold">En este paso</span>
                                        </div>
                                        <div className="bg-surface-container-lowest p-2 rounded-sm flex flex-col items-center">
                                            <span className="material-symbols-outlined text-secondary text-[18px]">fact_check</span>
                                            <span className="font-label-caps text-[10px] font-bold text-on-surface mt-1 leading-tight">2. Validación</span>
                                            <span className="font-body-sm text-[10px] text-secondary">Bodega física</span>
                                        </div>
                                        <div className="bg-surface-container-lowest p-2 rounded-sm flex flex-col items-center">
                                            <span className="material-symbols-outlined text-secondary text-[18px]">credit_card</span>
                                            <span className="font-label-caps text-[10px] font-bold text-on-surface mt-1 leading-tight">3. Pago Seguro</span>
                                            <span className="font-body-sm text-[10px] text-secondary">Link directo</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Bottom micro-assurances */}
                                <div className="flex items-center justify-center gap-space-md text-secondary font-label-caps text-label-caps pt-space-xs">
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[16px] text-[#065F46]">shield</span>
                                        <span>Protección Antifraude</span>
                                    </div>
                                    <span>•</span>
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[16px]">cycle</span>
                                        <span>Garantía de Devolución</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
