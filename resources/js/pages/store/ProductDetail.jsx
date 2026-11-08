import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProductDetail() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [qty, setQty] = useState(1);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const closeModal = () => setShowAuthModal(false);

    // Comprar exige sesión de cliente: el visitante ve el modal de registro.
    const handleAddToCart = () => {
        if (!user) {
            setShowAuthModal(true);
            return;
        }
        navigate('/carrito');
    };

    return (
        <>
            <div className="flex flex-col w-full relative">
                {/* BACKGROUND MAIN VIEW: Product Detail Page (/producto/corset-siren) */}
                <section className="w-full px-margin py-space-lg max-w-7xl mx-auto">
                    {/* Breadcrumbs */}
                    <nav aria-label="Breadcrumb" className="mb-space-lg flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant overflow-x-auto whitespace-nowrap">
                        <Link to="/" className="hover:text-primary-container transition-colors">Inicio</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <Link to="/mujer" className="text-primary-container font-semibold hover:underline">Mujer</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="hover:text-on-surface transition-colors">Corsets</span>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="text-on-surface font-semibold truncate">Corset Estructurado 'Siren'</span>
                    </nav>
                    {/* Product Layout Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
                        {/* Media Gallery (Col 1-7) */}
                        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-space-md">
                            {/* Thumbnails */}
                            <div className="flex md:flex-col gap-space-sm shrink-0 overflow-x-auto md:overflow-y-auto">
                                <button className="w-16 h-20 md:w-20 md:h-24 rounded-lg overflow-hidden bg-surface-container relative shadow-xs ring-2 ring-primary-container shrink-0">
                                    <img className="w-full h-full object-cover" data-alt="Close-up fashion photograph of high-end structured corset in deep crimson red fabric, precision boning construction, couture craftsmanship against architectural warm grey backdrop" src="/images/ascend/close-up-fashion-photograph-of-high.jpg" />
                                </button>
                                <button className="w-16 h-20 md:w-20 md:h-24 rounded-lg overflow-hidden bg-surface-container relative opacity-70 hover:opacity-100 transition-opacity shrink-0">
                                    <img className="w-full h-full object-cover" data-alt="Side profile view of high fashion model wearing sculpted red structured corset with architectural lines, minimal studio lighting, clean luxury aesthetic" src="/images/ascend/side-profile-view-of-high-fashion.jpg" />
                                </button>
                                <button className="w-16 h-20 md:w-20 md:h-24 rounded-lg overflow-hidden bg-surface-container relative opacity-70 hover:opacity-100 transition-opacity shrink-0">
                                    <img className="w-full h-full object-cover" data-alt="Macro detail of hand-stitched seams and metallic satin cord lacing on bespoke carmine red corset garment, luxury Colombian atelier setting" src="/images/ascend/macro-detail-of-hand-stitched-seams.jpg" />
                                </button>
                                <button className="w-16 h-20 md:w-20 md:h-24 rounded-lg overflow-hidden bg-surface-container relative opacity-70 hover:opacity-100 transition-opacity shrink-0">
                                    <img className="w-full h-full object-cover" data-alt="Editorial lookbook full shot of woman wearing Siren carmine corset with relaxed tailored high-waisted black trousers, minimalist brutalist interior" src="/images/ascend/editorial-lookbook-full-shot-of-woman.jpg" />
                                </button>
                            </div>
                            {/* Main Hero Image Display */}
                            <div className="flex-1 rounded-xl overflow-hidden bg-surface-container-lowest shadow-xs relative group">
                                <div className="absolute top-space-md left-space-md z-10 flex flex-col gap-space-xs items-start">
                                    <span className="bg-primary-container text-on-primary font-label-caps text-label-caps uppercase px-space-sm py-1 rounded-md tracking-wider shadow-xs font-semibold">
                                        Diseño Exclusivo
                                    </span>
                                    <span className="bg-surface/90 backdrop-blur-md text-on-surface font-label-caps text-[10px] uppercase px-space-xs py-0.5 rounded-sm tracking-widest font-semibold">
                                        Drop 03 · Edición Limitada
                                    </span>
                                </div>
                                <div className="w-full aspect-[3/4] relative">
                                    <img className="w-full h-full object-cover" data-alt="Studio fashion shot of the Structured Siren Corset in vivid deep carmine red with architectural internal boning, shot on luxury fashion model, editorial dramatic soft lighting, sharp focus on textiles" src="/images/ascend/studio-fashion-shot-of-the-structured.jpg" />
                                    {/* Simulated High-res Zoom Hint */}
                                    <div className="absolute bottom-space-md right-space-md bg-inverse-surface/80 backdrop-blur-xs text-inverse-on-surface px-space-sm py-1 rounded-lg flex items-center gap-space-xs font-label-caps text-[10px]">
                                        <span className="material-symbols-outlined text-[14px]">zoom_in</span>
                                        <span>ZOOM ULTRA HD</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Commercial Details & Purchase Configurator (Col 8-12) */}
                        <div className="lg:col-span-5 flex flex-col justify-between">
                            <div className="space-y-space-md">
                                {/* Reference & Category Marker */}
                                <div className="flex items-center justify-between">
                                    <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">LÍNEA FEMENINA · REF: ASC-CR-045</span>
                                    <div className="flex items-center gap-space-xs text-primary-container">
                                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="font-label-md text-label-md font-bold text-on-surface">4.9</span>
                                        <span className="font-body-sm text-body-sm text-on-surface-variant">(38 valoraciones)</span>
                                    </div>
                                </div>
                                {/* Product Title */}
                                <h1 className="font-display-lg text-display-lg font-bold text-on-surface uppercase tracking-tight">Corset Estructurado 'Siren'</h1>
                                {/* Pricing Section */}
                                <div className="flex items-baseline gap-space-sm py-space-xs">
                                    <span className="font-display-lg text-display-lg font-bold text-primary-container tracking-tight">
                                        $189.000
                                        {' '}
                                        <span className="font-title-md text-title-md font-semibold">COP</span>
                                    </span>
                                    <span className="font-headline-md text-headline-md text-secondary line-through decoration-primary-container/40">$210.000 COP</span>
                                    <span className="bg-error-container text-on-error-container font-label-caps text-label-caps px-space-sm py-0.5 rounded-md font-bold">
                                        -10% OFF
                                    </span>
                                </div>
                                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                                    Pieza de alta ingeniería sartorial con 12 varillas flexibles con memoria, corte ergonómico hip-flattering y forro interno en algodón hipoalergénico. Desarrollado en Medellín, Colombia.
                                </p>
                                {/* Divider Surface */}
                                <div className="h-px w-full bg-surface-container-high my-space-sm" />
                                {/* Color Selector */}
                                <div className="space-y-space-xs">
                                    <div className="flex items-center justify-between">
                                        <span className="font-label-caps text-label-caps uppercase text-on-surface font-semibold tracking-wider">Color Seleccionado</span>
                                        <span className="font-label-md text-label-md text-primary-container font-semibold">Rojo Carmín</span>
                                    </div>
                                    <div className="flex items-center gap-space-sm">
                                        <button className="group flex items-center gap-space-xs px-space-sm py-1.5 rounded-lg bg-surface-container-lowest shadow-xs ring-2 ring-primary-container transition-all">
                                            <span className="w-5 h-5 rounded-full bg-primary-container inline-block shadow-inner" />
                                            <span className="font-label-md text-label-md font-semibold text-on-surface">Rojo Carmín</span>
                                        </button>
                                        <button className="group flex items-center gap-space-xs px-space-sm py-1.5 rounded-lg bg-surface-container-lowest shadow-xs opacity-60 hover:opacity-100 transition-all">
                                            <span className="w-5 h-5 rounded-full bg-neutral-900 inline-block shadow-inner" />
                                            <span className="font-label-md text-label-md text-secondary group-hover:text-on-surface">Negro Ónix</span>
                                        </button>
                                    </div>
                                </div>
                                {/* Size Selector */}
                                <div className="space-y-space-xs pt-space-xs">
                                    <div className="flex items-center justify-between">
                                        <span className="font-label-caps text-label-caps uppercase text-on-surface font-semibold tracking-wider">
                                            Talla:
                                            {' '}
                                            <span className="text-primary-container">S (Seleccionada)</span>
                                        </span>
                                        <a href="#" className="font-label-md text-label-md text-primary-container hover:underline inline-flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">straighten</span>
                                            {' '}
                                            Guía de Medidas
                                        </a>
                                    </div>
                                    <div className="grid grid-cols-4 gap-space-xs">
                                        <button className="h-11 rounded-lg bg-surface-container-lowest text-on-surface font-label-lg text-label-lg font-medium shadow-xs hover:bg-surface-container transition-colors flex items-center justify-center">
                                            XS
                                        </button>
                                        <button className="h-11 rounded-lg bg-inverse-surface text-inverse-on-surface font-label-lg text-label-lg font-bold shadow-md ring-2 ring-primary-container flex items-center justify-center">
                                            S
                                        </button>
                                        <div className="relative">
                                            <button className="w-full h-11 rounded-lg bg-surface-container-lowest text-on-surface font-label-lg text-label-lg font-medium shadow-xs hover:bg-surface-container transition-colors flex items-center justify-center">
                                                M
                                            </button>
                                            {' '}
                                            <span className="absolute -top-1.5 right-1 bg-amber-100 text-amber-800 text-[9px] font-bold px-1 rounded-xs shadow-2xs">¡Últimas!</span>
                                        </div>
                                        <button className="h-11 rounded-lg bg-surface-container-high text-secondary/50 font-label-lg text-label-lg cursor-not-allowed line-through flex items-center justify-center" disabled>
                                            L
                                        </button>
                                    </div>
                                </div>
                                {/* Live Stock Alert */}
                                <div className="bg-error-container/40 p-space-sm rounded-lg flex items-center gap-space-sm text-error">
                                    <span className="material-symbols-outlined text-[20px] animate-pulse">inventory_2</span>
                                    <div className="flex-1 font-body-sm text-body-sm font-medium">
                                        <span className="font-bold">2 unidades disponibles</span>
                                        {' '}
                                        en talla S / Rojo Carmín en Almacén Central (Bogotá D.C.).
                                    </div>
                                </div>
                                {/* Quantity & Purchase CTAs */}
                                <div className="pt-space-xs space-y-space-sm">
                                    <div className="flex items-center gap-space-sm">
                                        {/* Quantity Stepper */}
                                        <div className="h-10 px-space-sm bg-surface-container-lowest rounded-lg shadow-xs flex items-center justify-between w-32 shrink-0">
                                            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Disminuir cantidad" className="text-secondary hover:text-on-surface font-bold text-title-md transition-colors w-6 flex items-center justify-center">
                                                -
                                            </button>
                                            <span className="font-label-lg text-label-lg font-bold text-on-surface">{qty}</span>
                                            <button type="button" onClick={() => setQty((q) => Math.min(5, q + 1))} aria-label="Aumentar cantidad" className="text-secondary hover:text-on-surface font-bold text-title-md transition-colors w-6 flex items-center justify-center">
                                                +
                                            </button>
                                        </div>
                                        {/* Main Add to Cart Button */}
                                        <button type="button" onClick={handleAddToCart} className="flex-1 h-10 px-space-lg bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg rounded-lg shadow-md flex items-center justify-center gap-space-xs uppercase tracking-wider font-semibold active:scale-[0.99] transition-all">
                                            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                                            <span>Añadir al Carrito</span>
                                        </button>
                                        <button aria-label="Guardar en favoritos" className="h-10 w-10 bg-surface-container-lowest text-on-surface-variant hover:text-primary-container rounded-lg shadow-xs flex items-center justify-center transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">favorite</span>
                                        </button>
                                    </div>
                                </div>
                                {/* Highlights & Concierge */}
                                <div className="pt-space-md grid grid-cols-2 gap-space-sm font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider">
                                    <div className="flex items-center gap-space-xs p-space-xs bg-surface-container-lowest rounded-lg">
                                        <span className="material-symbols-outlined text-primary-container text-[16px]">local_shipping</span>
                                        <span>Envío 24-48h Nacional</span>
                                    </div>
                                    <div className="flex items-center gap-space-xs p-space-xs bg-surface-container-lowest rounded-lg">
                                        <span className="material-symbols-outlined text-primary-container text-[16px]">sync_alt</span>
                                        <span>Primer Cambio Gratis</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* OVERLAY / MODAL: Mandatory Authentication Intercept Triggered by Purchase Attempt */}
                {showAuthModal && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-margin-mobile md:p-space-xl transition-all duration-300" id="auth-intercept-modal" role="dialog" aria-modal="true">
                    {/* Darkened Blurred Scrim */}
                    <div className="absolute inset-0 bg-neutral-950/75 backdrop-blur-md" onClick={closeModal} />
                    {/* Modal Elevation Box (Level 4, Level 1 surfaces with clean hairline separation) */}
                    <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-xl shadow-[0_20px_35px_-5px_rgba(0,0,0,0.3)] z-10 overflow-hidden transition-all duration-300">
                        {/* Top Accent Bar: High Fashion Crimson Accent */}
                        <div className="w-full h-1.5 bg-primary-container" />
                        {/* Close Button with Tooltip */}
                        <button type="button" className="absolute top-4 right-4 text-secondary hover:text-on-surface w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center transition-all group" onClick={closeModal} title="Regresar a la prenda">
                            <span className="material-symbols-outlined text-[20px]">close</span>
                            <span className="sr-only">Cerrar</span>
                        </button>
                        <div className="p-space-lg md:p-space-xl flex flex-col items-center text-center">
                            {/* Brand Badge */}
                            <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container text-on-surface-variant font-label-caps text-label-caps uppercase tracking-widest mb-space-md">
                                <span className="material-symbols-outlined text-[14px] text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                                <span>Membresía ASCEND</span>
                            </div>
                            {/* Catchy Main Heading */}
                            <h2 className="font-display-lg text-display-lg font-bold text-on-surface uppercase tracking-tight mb-space-sm">¡Únete a ASCEND!</h2>
                            {/* Exact Specified Descriptive Copy */}
                            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-space-lg leading-relaxed">
                                Crea tu cuenta para empezar a comprar en ASCEND. Al registrarte, podrás obtener un cupón de descuento de bienvenida sujeto a las condiciones de la promoción.
                            </p>
                            {/* Incentive & Promotion Value Banner */}
                            <div className="w-full bg-primary-fixed/30 rounded-lg p-space-md mb-space-lg flex items-center gap-space-md text-left">
                                <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-xs">
                                    <span className="material-symbols-outlined text-[22px]">confirmation_number</span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-label-lg text-label-lg font-bold text-primary tracking-tight">CUPÓN DE BIENVENIDA DISPONIBLE</p>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                                        Cupón de bienvenida sujeto a condiciones · Válido en tu primera orden tras verificación.
                                    </p>
                                </div>
                            </div>
                            {/* Preserved Selection Note */}
                            <div className="w-full bg-surface-container-low rounded-lg p-space-xs px-space-sm mb-space-lg flex items-center justify-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                                <span className="material-symbols-outlined text-[16px] text-primary-container">bookmark_added</span>
                                <span>
                                    Tu selección de
                                    {' '}
                                    <strong className="text-on-surface font-semibold">talla S</strong>
                                    {' '}
                                    y
                                    {' '}
                                    <strong className="text-on-surface font-semibold">color Rojo Carmín</strong>
                                    {' '}
                                    se mantendrá guardada para cuando inicies sesión.
                                </span>
                            </div>
                            {/* Action CTAs */}
                            <div className="w-full flex flex-col gap-space-sm">
                                {/* Primary: Create Account (Conserving Selected Product Intent) */}
                                <Link to="/login?modo=registro" className="w-full h-11 bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-wider font-semibold rounded-lg shadow-xs flex items-center justify-center gap-space-xs transition-colors">
                                    <span className="material-symbols-outlined text-[18px]">person_add</span>
                                    <span>Crear mi cuenta</span>
                                </Link>
                                {/* Secondary: Login */}
                                <Link to="/login?redirect=/producto/corset-siren-rojo" className="w-full h-11 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface font-label-lg text-label-lg uppercase tracking-wider font-semibold rounded-lg shadow-xs flex items-center justify-center gap-space-xs transition-colors">
                                    <span>Ya tengo una cuenta</span>
                                </Link>
                                {/* Teritary: Dismiss / Guest exploration */}
                                <button className="w-full py-space-xs text-on-surface-variant hover:text-on-surface font-label-md text-label-md uppercase tracking-wider transition-colors pt-space-xs inline-flex items-center justify-center gap-1" onClick={closeModal}>
                                    <span>Continuar explorando como visitante</span>
                                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                        {/* Trust Footer Inside Modal */}
                        <div className="w-full bg-surface-container py-space-xs px-space-lg flex items-center justify-between text-on-surface-variant font-label-caps text-[10px] tracking-wider uppercase">
                            <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-[13px] text-tertiary">lock</span>
                                {' '}
                                Compra 100% Segura
                            </span>
                            <span>Atención Concierge WhatsApp</span>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </>
    );
}
