import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useCountdown from '../../hooks/useCountdown';

function AddToBagButton() {
    const [added, setAdded] = useState(false);
    const handleClick = () => {
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };
    return (
        <button
            type="button"
            onClick={handleClick}
            className={`h-9 px-3 rounded-sm ${added ? 'bg-tertiary' : 'bg-on-surface hover:bg-primary-container'} text-surface font-label-md text-label-md uppercase tracking-wider font-medium transition-colors flex items-center justify-center`}
        >
            {added ? 'Añadido ✓' : '+ Bolsa'}
        </button>
    );
}

export default function MemberHome() {
    const { user } = useAuth();
    const timer = useCountdown(7 * 60 + 19);
    const [copied, setCopied] = useState(false);
    const firstName = (user?.name ?? 'Valentina').split(' ')[0].toUpperCase();

    const copyCoupon = () => {
        navigator.clipboard?.writeText('ASCENDVIP');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <div className="flex flex-col w-full">
                {/* Top Priority Ribbon: Personalized VIP Micro-Bar */}
                <section className="w-full bg-inverse-surface text-inverse-on-surface py-2.5 px-margin">
                    <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 text-label-caps font-label-caps">
                        <div className="flex items-center gap-space-sm tracking-widest text-primary-fixed">
                            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                            <span>SESIÓN PRIVADA: {(user?.name ?? 'Valentina Morales').toUpperCase()}</span>
                            <span className="text-secondary-fixed-dim">|</span>
                            <span className="text-surface-bright font-semibold">CÍRCULO ASCEND GOLD TIER</span>
                        </div>
                        <div className="flex items-center gap-space-lg text-secondary-fixed-dim">
                            <span className="flex items-center gap-1.5 hover:text-surface-bright transition-colors cursor-pointer">
                                <span className="material-symbols-outlined text-[15px] text-primary-container">timer</span>
                                {' '}
                                Bolsa protegida:
                                {' '}
                                <span className="text-surface-bright font-medium" id="cart-timer">{timer}</span>
                            </span>
                            <span className="hidden md:inline-flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[15px] text-tertiary-fixed">verified</span>
                                {' '}
                                Envío Express Atelier Colombia incluido
                            </span>
                            <a href="#" className="text-primary-fixed hover:text-surface-bright underline transition-colors">Mi Concierge</a>
                        </div>
                    </div>
                </section>
                {/* Hero: Haute Couture Editorial Stage for Authenticated VIP */}
                <section className="relative w-full overflow-hidden bg-inverse-surface">
                    <div className="absolute inset-0 z-0">
                        <div className="w-full h-full bg-cover bg-center opacity-45 scale-105 motion-safe:transition-transform motion-safe:duration-1000" data-alt="Editorial high-fashion runway model wearing an architectural black tailored coat and sleek crimson silk accents in a brutalist concrete pavilion with dramatic sculptural volumetric shadows and soft diffused studio lights, luxury contemporary aesthetic" style={{ backgroundImage: "url('/images/ascend/editorial-high-fashion-runway-model-wearing.jpg')" }} />
                        <div className="absolute inset-0 bg-gradient-to-r from-inverse-surface via-inverse-surface/85 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface via-transparent to-transparent" />
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-margin py-space-2xl md:py-32 flex flex-col justify-center min-h-[580px]">
                        <div className="max-w-2xl flex flex-col items-start space-y-space-md">
                            {/* VIP Access Badge */}
                            <div className="inline-flex items-center gap-space-xs px-3 py-1.5 rounded-full bg-primary-container/20 backdrop-blur-md">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                                <span className="font-label-caps text-label-caps text-primary-fixed tracking-widest uppercase">
                                    Membresía VIP Activa // Acceso Prioritario FW25
                                </span>
                            </div>
                            {/* Headline */}
                            <h1 className="font-display-lg text-display-lg text-surface-bright tracking-tight uppercase leading-none font-bold">
                                BIENVENIDA DE NUEVO,
                                {' '}
                                <br />
                                {' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-surface-bright via-primary-fixed to-primary-container">{firstName}.</span>
                            </h1>
                            {/* Editorial Copy */}
                            <p className="font-body-lg text-body-lg text-secondary-fixed-dim leading-relaxed max-w-xl">
                                Colección exclusiva
                                {' '}
                                <span className="text-surface-bright font-medium">Drop 03 Runway</span>
                                {' '}
                                desbloqueada para miembros de archivo. Tu cupón de cortesía
                                {' '}
                                <span className="px-2 py-0.5 rounded-sm bg-primary-container/30 text-surface-bright font-semibold font-label-caps tracking-wider">ASCENDVIP</span>
                                {' '}
                                (-10%) está listo para ser aplicado de inmediato en tu bolsa activa.
                            </p>
                            {/* CTA Cluster */}
                            <div className="pt-space-md flex flex-wrap items-center gap-space-md w-full sm:w-auto">
                                <Link to="/mujer" className="h-10 px-6 rounded-sm bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-wider inline-flex items-center justify-center gap-space-xs shadow-md transition-all hover:-translate-y-0.5">
                                    <span>Explorar Acceso Anticipado Mujer</span>
                                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </Link>
                                <Link to="/carrito" className="h-10 px-6 rounded-sm bg-surface-container-lowest/10 backdrop-blur-md hover:bg-surface-container-lowest/20 text-surface-bright font-label-lg text-label-lg uppercase tracking-wider inline-flex items-center justify-center gap-space-xs transition-colors">
                                    <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                                    <span>Bolsa Activa (2 prendas)</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                {/* VIP Fast-Track Status Dashboard Strip */}
                <section className="w-full bg-surface-container-low py-space-lg px-margin">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
                            {/* Metric 1: Protected Bag */}
                            <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-xs flex items-start gap-space-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-primary-container text-[20px]">local_mall</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="font-label-caps text-label-caps uppercase text-secondary block">Bolsa en Espera</span>
                                    {' '}
                                    <span className="font-title-md text-title-md text-on-surface font-bold block truncate">2 prendas • $282.600 COP</span>
                                    {' '}
                                    <span className="font-body-sm text-body-sm text-primary-container font-medium flex items-center gap-1 mt-0.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                                        {' '}
                                        Reserva activa (14 min restantes)
                                    </span>
                                </div>
                            </div>
                            {/* Metric 2: Courtesy Coupon */}
                            <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-xs flex items-start gap-space-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-on-surface text-[20px]">sell</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="font-label-caps text-label-caps uppercase text-secondary block">Cupón Desbloqueado</span>
                                    {' '}
                                    <span className="font-title-md text-title-md text-on-surface font-bold block">10% OFF Atelier</span>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <code className="font-label-caps text-label-caps px-2 py-0.5 rounded-sm bg-surface-container text-on-surface font-semibold">ASCENDVIP</code>
                                        <button type="button" onClick={copyCoupon} className="text-primary-container hover:text-primary text-[12px] font-medium underline">
                                            {copied ? '¡Copiado!' : 'Copiar'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Metric 3: Latest Live Order */}
                            <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-xs flex items-start gap-space-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-on-surface text-[20px]">inventory_2</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="font-label-caps text-label-caps uppercase text-secondary block">Último Despacho</span>
                                    {' '}
                                    <span className="font-title-md text-title-md text-on-surface font-bold block">#ASC-8945</span>
                                    {' '}
                                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#b45309] bg-[#fffbeb] border border-[#fde68a] px-2 py-0.5 rounded-sm mt-0.5">
                                        Pendiente de Revisión
                                    </span>
                                </div>
                            </div>
                            {/* Metric 4: VIP Tier Status */}
                            <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-xs flex items-start gap-space-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="font-label-caps text-label-caps uppercase text-secondary block">Nivel de Lealtad</span>
                                    {' '}
                                    <span className="font-title-md text-title-md text-on-surface font-bold block">Gold Concierge</span>
                                    {' '}
                                    <span className="font-body-sm text-body-sm text-secondary block mt-0.5">Atención prioritaria 24/7</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Personalized Curation: "Recomendado para tu Silueta y Estilo" */}
                <section className="w-full py-space-2xl px-margin bg-surface">
                    <div className="max-w-7xl mx-auto flex flex-col space-y-space-xl">
                        {/* Section Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
                            <div className="space-y-space-xs">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary-container" />
                                    <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary-container">Curaduría Personalizada</span>
                                </div>
                                <h2 className="font-headline-lg text-headline-lg font-bold uppercase tracking-tight text-on-surface">Recomendado para tu Silueta y Estilo</h2>
                                <p className="font-body-md text-body-md text-secondary">
                                    Selección predictiva calibrada a tus preferencias de corte sartorial, tonos oscuros y siluetas fluidas.
                                </p>
                            </div>
                            <Link to="/novedades" className="inline-flex items-center gap-1 font-label-lg text-label-lg text-primary-container hover:text-primary transition-colors uppercase tracking-wider font-semibold">
                                <span>Ver toda la selección privada</span>
                                <span className="material-symbols-outlined text-[18px]">east</span>
                            </Link>
                        </div>
                        {/* Product Showcase Cards (4 Items) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
                            {/* Item 1: Corset Sastrería */}
                            <div className="group flex flex-col bg-surface-container-lowest rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-all duration-300">
                                <div className="relative w-full aspect-[3/4] bg-surface-container overflow-hidden">
                                    <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" data-alt="Editorial look of a high fashion black structural corset top with subtle geometric boning worn against a concrete minimalist studio backdrop, high fashion clean photography" style={{ backgroundImage: "url('/images/ascend/editorial-look-of-a-high-fashion.jpg')" }} />
                                    <span className="absolute top-3 left-3 px-2 py-1 bg-inverse-surface/85 backdrop-blur-md rounded-sm text-surface-bright font-label-caps text-label-caps uppercase tracking-wider">
                                        Favorito VIP
                                    </span>
                                    {' '}
                                    <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary-container transition-colors shadow-sm">
                                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                                    </button>
                                </div>
                                <div className="p-space-md flex flex-col flex-1 justify-between space-y-space-sm">
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <span className="font-label-caps text-label-caps uppercase text-secondary">Atelier Cápsula</span>
                                            <div className="flex items-center gap-1">
                                                <span className="w-2.5 h-2.5 rounded-full bg-on-background" />
                                                <span className="w-2.5 h-2.5 rounded-full bg-surface-dim" />
                                            </div>
                                        </div>
                                        <h3 className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-primary-container transition-colors truncate">
                                            Corset Sastrería 'Minimal Dark'
                                        </h3>
                                        <p className="font-body-sm text-body-sm text-secondary mt-1">Lana fría estructurada y forro de satén</p>
                                    </div>
                                    <div className="pt-2 flex items-center justify-between">
                                        <span className="font-title-md text-title-md font-bold text-on-surface">$215.000 COP</span>
                                        <AddToBagButton />
                                    </div>
                                </div>
                            </div>
                            {/* Item 2: Body Asimétrico Nexus */}
                            <div className="group flex flex-col bg-surface-container-lowest rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-all duration-300">
                                <div className="relative w-full aspect-[3/4] bg-surface-container overflow-hidden">
                                    <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" data-alt="Editorial photograph of an avant-garde asymmetrical sculpted bodysuit in deep slate charcoal, single shoulder drape detail, luxury fashion catalog" style={{ backgroundImage: "url('/images/ascend/editorial-photograph-of-an-avant-garde.jpg')" }} />
                                    <span className="absolute top-3 left-3 px-2 py-1 bg-primary-container text-on-primary rounded-sm font-label-caps text-label-caps uppercase tracking-wider">
                                        Match 98%
                                    </span>
                                    {' '}
                                    <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary-container transition-colors shadow-sm">
                                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                                    </button>
                                </div>
                                <div className="p-space-md flex flex-col flex-1 justify-between space-y-space-sm">
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <span className="font-label-caps text-label-caps uppercase text-secondary">Edición Limitada</span>
                                            <div className="flex items-center gap-1">
                                                <span className="w-2.5 h-2.5 rounded-full bg-on-background" />
                                                <span className="w-2.5 h-2.5 rounded-full bg-primary-container" />
                                            </div>
                                        </div>
                                        <h3 className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-primary-container transition-colors truncate">
                                            Body Asimétrico Esculpido 'Nexus'
                                        </h3>
                                        <p className="font-body-sm text-body-sm text-secondary mt-1">Punto técnico stretch de alta compresión</p>
                                    </div>
                                    <div className="pt-2 flex items-center justify-between">
                                        <span className="font-title-md text-title-md font-bold text-on-surface">$160.000 COP</span>
                                        <AddToBagButton />
                                    </div>
                                </div>
                            </div>
                            {/* Item 3: Tenis Track Femme */}
                            <div className="group flex flex-col bg-surface-container-lowest rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-all duration-300">
                                <div className="relative w-full aspect-[3/4] bg-surface-container overflow-hidden">
                                    <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" data-alt="Editorial luxury sneaker photograph, architectural chunky sole running shoe with clean white and silver geometric panels on a monochromatic pedestal, studio lighting" style={{ backgroundImage: "url('/images/ascend/editorial-luxury-sneaker-photograph-architectural-chunky.jpg')" }} />
                                    <span className="absolute top-3 left-3 px-2 py-1 bg-inverse-surface/85 backdrop-blur-md rounded-sm text-surface-bright font-label-caps text-label-caps uppercase tracking-wider">
                                        Calzado Runway
                                    </span>
                                    {' '}
                                    <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary-container transition-colors shadow-sm">
                                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                                    </button>
                                </div>
                                <div className="p-space-md flex flex-col flex-1 justify-between space-y-space-sm">
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <span className="font-label-caps text-label-caps uppercase text-secondary">Calzado</span>
                                            <div className="flex items-center gap-1">
                                                <span className="w-2.5 h-2.5 rounded-full bg-surface-bright" />
                                                <span className="w-2.5 h-2.5 rounded-full bg-on-background" />
                                            </div>
                                        </div>
                                        <h3 className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-primary-container transition-colors truncate">
                                            Tenis Ascend Track Femme
                                        </h3>
                                        <p className="font-body-sm text-body-sm text-secondary mt-1">Suela ultra-amortiguada y piel grabada</p>
                                    </div>
                                    <div className="pt-2 flex items-center justify-between">
                                        <span className="font-title-md text-title-md font-bold text-on-surface">$380.000 COP</span>
                                        <AddToBagButton />
                                    </div>
                                </div>
                            </div>
                            {/* Item 4: Camiseta Crop Oversize Acid Wash */}
                            <div className="group flex flex-col bg-surface-container-lowest rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-all duration-300">
                                <div className="relative w-full aspect-[3/4] bg-surface-container overflow-hidden">
                                    <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" data-alt="Editorial photo of a woman in an oversized washed graphite heavy-cotton crop t-shirt with subtle distress and minimal typographic embroidery, streetwear luxury aesthetic" style={{ backgroundImage: "url('/images/ascend/editorial-photo-of-a-woman-in.jpg')" }} />
                                    <span className="absolute top-3 left-3 px-2 py-1 bg-inverse-surface/85 backdrop-blur-md rounded-sm text-surface-bright font-label-caps text-label-caps uppercase tracking-wider">
                                        Esencial
                                    </span>
                                    {' '}
                                    <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary-container transition-colors shadow-sm">
                                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                                    </button>
                                </div>
                                <div className="p-space-md flex flex-col flex-1 justify-between space-y-space-sm">
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <span className="font-label-caps text-label-caps uppercase text-secondary">Streetwear</span>
                                            <div className="flex items-center gap-1">
                                                <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                                                <span className="w-2.5 h-2.5 rounded-full bg-on-background" />
                                            </div>
                                        </div>
                                        <h3 className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-primary-container transition-colors truncate">
                                            Camiseta Crop Oversize 'Acid Wash'
                                        </h3>
                                        <p className="font-body-sm text-body-sm text-secondary mt-1">Algodón peinado pesado de 280 GSM</p>
                                    </div>
                                    <div className="pt-2 flex items-center justify-between">
                                        <span className="font-title-md text-title-md font-bold text-on-surface">$115.000 COP</span>
                                        <AddToBagButton />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Editorial Split Feature: Exclusive Drop 03 + Private Fitting Invitation */}
                <section className="w-full py-space-xl px-margin bg-surface-container-low">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
                        {/* Left Visual Card */}
                        <div className="lg:col-span-7 bg-inverse-surface rounded-xl overflow-hidden relative min-h-[420px] flex flex-col justify-end p-space-xl shadow-md">
                            <div className="absolute inset-0 bg-cover bg-center opacity-40 scale-100 group-hover:scale-105 transition-transform duration-700" data-alt="Editorial look of a high-end luxury fashion atelier fitting session, dark minimalist studio interior in Medellin El Poblado with modern architectural mirrors and dark marble pedestals, models in architectural wool coats" style={{ backgroundImage: "url('/images/ascend/editorial-look-of-a-high-end.jpg')" }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface via-inverse-surface/60 to-transparent" />
                            <div className="relative z-10 max-w-lg space-y-space-sm text-surface-bright">
                                <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary-fixed">Flagship Atelier // El Poblado</span>
                                <h3 className="font-headline-lg text-headline-lg font-bold uppercase tracking-tight">Prueba Privada &amp; Sesión de Styling</h3>
                                <p className="font-body-md text-body-md text-secondary-fixed-dim">
                                    Como miembro Gold Tier, agenda una cita exclusiva en nuestra suite privada en Medellín. Selección pre-ensamblada para ti con servicio de barista y champagne.
                                </p>
                                <div className="pt-space-xs flex items-center gap-space-md">
                                    <button className="h-10 px-5 rounded-sm bg-surface-bright text-inverse-surface font-label-lg text-label-lg uppercase tracking-wider font-semibold hover:bg-surface-container-low transition-colors inline-flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                                        <span>Reservar Cita Atelier</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Right VIP Concierge Action Card */}
                        <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-xl flex flex-col justify-between shadow-xs">
                            <div className="space-y-space-md">
                                <div className="flex items-center justify-between">
                                    <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary">Atención Dedicada</span>
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-container/10 text-primary-container font-label-caps text-label-caps font-semibold">
                                        <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                                        {' '}
                                        En Línea Ahora
                                    </span>
                                </div>
                                <div className="space-y-space-xs">
                                    <h4 className="font-headline-md text-headline-md text-on-surface font-bold uppercase tracking-tight">Tu Concierge Personal</h4>
                                    <p className="font-body-md text-body-md text-secondary">
                                        Camila R. está disponible para gestionar reservas de prendas de pasarela, ajustar tallas a medida o tramitar devoluciones a domicilio sin costo.
                                    </p>
                                </div>
                                {/* Quick contact perk list */}
                                <div className="space-y-space-sm pt-space-xs">
                                    <div className="flex items-center gap-space-sm text-body-sm text-on-surface">
                                        <span className="material-symbols-outlined text-primary-container text-[18px]">check_circle</span>
                                        <span>Respuesta garantizada en menos de 5 minutos</span>
                                    </div>
                                    <div className="flex items-center gap-space-sm text-body-sm text-on-surface">
                                        <span className="material-symbols-outlined text-primary-container text-[18px]">check_circle</span>
                                        <span>Retenciones de tallas agotadas bajo demanda</span>
                                    </div>
                                    <div className="flex items-center gap-space-sm text-body-sm text-on-surface">
                                        <span className="material-symbols-outlined text-primary-container text-[18px]">check_circle</span>
                                        <span>Acceso directo a diseñadores en lanzamiento</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-space-lg flex flex-col gap-space-xs">
                                <a href="https://wa.me/" className="w-full h-10 rounded-sm bg-[#25D366] text-white font-label-lg text-label-lg uppercase tracking-wider font-semibold inline-flex items-center justify-center gap-2 hover:opacity-95 shadow-sm transition-all" target="_blank">
                                    <span className="material-symbols-outlined text-[20px]">chat</span>
                                    <span>Chatear por WhatsApp VIP</span>
                                </a>
                                <span className="font-label-caps text-label-caps text-center text-secondary block mt-1">Línea directa exclusiva para miembros del Círculo</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
