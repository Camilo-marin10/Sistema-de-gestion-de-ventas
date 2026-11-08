import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/** Textos editoriales por línea. El listado de prendas se conectará luego a la API de productos. */
const LINES = {
    mujer: { crumb: 'Mujer', label: 'Colección Femenina', title: 'Colección Mujer — Siluetas Esculpidas y Vanguardia' },
    hombre: { crumb: 'Hombre', label: 'Colección Masculina', title: 'Colección Hombre — Sastrería & Relaxed' },
    novedades: { crumb: 'Novedades', label: 'Drop Reciente', title: 'Novedades — Drop de Temporada FW 2025' },
    ofertas: { crumb: 'Ofertas', label: 'Archivo & Descuentos', title: 'Ofertas — Archivo ASCEND' },
};

const SUBCATEGORIES = [
    { label: 'Ver Todo', count: 24 },
    { label: 'Camisetas oversize ombligueras', count: 6 },
    { label: 'Bodys', count: 8 },
    { label: 'Corsets', count: 5 },
    { label: 'Tenis', count: 5 },
];

export default function Catalog({ line = 'mujer' }) {
    const navigate = useNavigate();
    const copy = LINES[line] ?? LINES.mujer;
    const [activeSub, setActiveSub] = useState(0);
    const openProduct = () => navigate('/producto/corset-siren-rojo');

    return (
        <>
            <div className="flex flex-col w-full">
                {/* Editorial Collection Announcement & Breadcrumbs */}
                <section className="w-full bg-surface-container-low px-margin py-space-md">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
                        <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs text-on-surface-variant font-label-caps text-label-caps tracking-widest uppercase">
                            <Link to="/" className="hover:text-primary-container transition-colors">Inicio</Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <Link to={`/${line}`} className="text-on-surface font-semibold hover:text-primary-container transition-colors">{copy.crumb}</Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-primary-container">{copy.label}</span>
                        </nav>
                        <div className="flex items-center gap-space-sm text-on-surface-variant font-body-sm text-body-sm">
                            <span className="inline-block w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                            <span>Despacho prioritario 24-48h a Bogotá, Medellín y Cali</span>
                        </div>
                    </div>
                </section>
                {/* Collection Hero Statement */}
                <section className="w-full px-margin pt-space-xl pb-space-lg bg-surface">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
                        <div className="space-y-space-xs max-w-3xl">
                            <div className="flex items-center gap-space-sm">
                                <span className="px-space-sm py-space-xxs rounded-full bg-primary-container text-on-primary font-label-caps text-label-caps uppercase tracking-wider font-semibold">
                                    Drop Activo
                                </span>
                                <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">Temporada 2025 // Siluetas Utilitarias</span>
                            </div>
                            <h1 className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight">{copy.title}</h1>
                            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                                Diseño experimental con compresión anatómica, sastrería desconstruida y streetwear de alto gramaje confeccionado en talleres colombianos.
                            </p>
                        </div>
                        <div className="flex items-baseline gap-space-xs bg-surface-container-highest px-space-md py-space-sm rounded-lg self-start lg:self-auto">
                            <span className="font-headline-lg text-headline-lg font-bold text-on-surface">24</span>
                            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-medium">referencias activas</span>
                        </div>
                    </div>
                </section>
                {/* Interactive Filters & Subcategories Pill System */}
                <section className="w-full px-margin pb-space-xl bg-surface sticky top-(--store-header-h) z-40 shadow-xs bg-surface/95 backdrop-blur-md">
                    <div className="max-w-7xl mx-auto space-y-space-md pt-space-sm">
                        {/* Subcategory Pills */}
                        <div className="flex items-center gap-space-xs overflow-x-auto pb-space-xxs no-scrollbar">
                            {SUBCATEGORIES.map((sub, i) => (
                                <button
                                    key={sub.label}
                                    type="button"
                                    onClick={() => setActiveSub(i)}
                                    className={`px-space-md py-space-xs rounded-full font-label-md text-label-md uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-space-xs ${
                                        activeSub === i
                                            ? 'bg-inverse-surface text-inverse-on-surface font-semibold shadow-xs'
                                            : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-medium'
                                    }`}
                                >
                                    <span>{sub.label}</span>
                                    <span
                                        className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                                            activeSub === i ? 'bg-surface/20 text-inverse-on-surface' : 'bg-surface text-on-surface-variant'
                                        }`}
                                    >
                                        {sub.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                        {/* Action Toolbar */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm items-center">
                            {/* Collection Search */}
                            <div className="md:col-span-4 relative">
                                <span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none">
                                    search
                                </span>
                                {' '}
                                <input className="w-full h-10 pl-11 pr-space-md bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm rounded-lg shadow-xs focus:outline-hidden focus:ring-2 focus:ring-primary-container transition-all" id="filter-search" placeholder="Buscar en Mujer..." type="text" />
                            </div>
                            {/* Filter Dropdowns Row */}
                            <div className="md:col-span-8 flex flex-wrap items-center gap-space-xs justify-start md:justify-end">
                                {/* Size Selector */}
                                <div className="relative">
                                    <select aria-label="Talla" className="h-10 px-space-md pr-8 bg-surface-container-lowest text-on-surface font-label-md text-label-md rounded-lg shadow-xs focus:outline-hidden focus:ring-2 focus:ring-primary-container appearance-none cursor-pointer">
                                        <option value="">Talla (Todas)</option>
                                        <option value="XS">Talla: XS</option>
                                        <option value="S">Talla: S</option>
                                        <option value="M">Talla: M</option>
                                        <option value="L">Talla: L</option>
                                    </select>
                                    {' '}
                                    <span className="material-symbols-outlined absolute right-space-xs top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant pointer-events-none">
                                        expand_more
                                    </span>
                                </div>
                                {/* Color Selector */}
                                <div className="relative">
                                    <select aria-label="Color" className="h-10 px-space-md pr-8 bg-surface-container-lowest text-on-surface font-label-md text-label-md rounded-lg shadow-xs focus:outline-hidden focus:ring-2 focus:ring-primary-container appearance-none cursor-pointer">
                                        <option value="">Color (Todos)</option>
                                        <option value="Negro">Negro Noir</option>
                                        <option value="Blanco">Blanco Óptico</option>
                                        <option value="Carmin">Carmín Profundo</option>
                                        <option value="Hueso">Hueso Crudo</option>
                                    </select>
                                    {' '}
                                    <span className="material-symbols-outlined absolute right-space-xs top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant pointer-events-none">
                                        expand_more
                                    </span>
                                </div>
                                {/* Price Range Filter */}
                                <div className="relative">
                                    <select aria-label="Rango de Precios" className="h-10 px-space-md pr-8 bg-surface-container-lowest text-on-surface font-label-md text-label-md rounded-lg shadow-xs focus:outline-hidden focus:ring-2 focus:ring-primary-container appearance-none cursor-pointer">
                                        <option value="">Rango de Precio</option>
                                        <option value="80-150">$80.000 - $150.000 COP</option>
                                        <option value="150-250">$150.000 - $250.000 COP</option>
                                        <option value="250-400">$250.000 - $400.000 COP</option>
                                    </select>
                                    {' '}
                                    <span className="material-symbols-outlined absolute right-space-xs top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant pointer-events-none">
                                        expand_more
                                    </span>
                                </div>
                                {/* Sorting Filter */}
                                <div className="relative">
                                    <select aria-label="Ordenar por" className="h-10 px-space-md pr-8 bg-surface-container-lowest text-on-surface font-label-md text-label-md rounded-lg shadow-xs focus:outline-hidden focus:ring-2 focus:ring-primary-container appearance-none cursor-pointer font-semibold">
                                        <option value="populares">Más Populares</option>
                                        <option value="novedades">Novedades</option>
                                        <option value="menor-precio">Menor Precio</option>
                                        <option value="mayor-precio">Mayor Precio</option>
                                    </select>
                                    {' '}
                                    <span className="material-symbols-outlined absolute right-space-xs top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant pointer-events-none">
                                        sort
                                    </span>
                                </div>
                                {/* Reset Filter Button */}
                                <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors" title="Restablecer filtros">
                                    <span className="material-symbols-outlined text-[18px]">tune</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Main Product Grid Section */}
                <section className="w-full px-margin py-space-2xl bg-surface-container-low">
                    <div className="max-w-7xl mx-auto">
                        {/* Catalog Grid: 3 columns on desktop, 2 on tablet, 1 on mobile */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
                            {/* Product 1: Corset Siren */}
                            <article className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                                <div className="relative w-full aspect-[3/4] bg-surface-container overflow-hidden">
                                    <img className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" data-alt="High fashion studio editorial portrait of a woman wearing the structured Siren corset in deep black architectural fabric with geometric seams, luxury streetwear aesthetics, cinematic studio light, soft shadows, pristine white and neutral backdrop" src="/images/ascend/high-fashion-studio-editorial-portrait-of.jpg" />
                                    {/* Badges */}
                                    <div className="absolute top-space-sm left-space-sm flex flex-col gap-space-xxs">
                                        <span className="px-space-sm py-space-xxs bg-primary-container text-on-primary font-label-caps text-label-caps uppercase tracking-wider rounded-sm font-bold shadow-xs">
                                            Oferta -10%
                                        </span>
                                        <span className="px-space-sm py-space-xxs bg-inverse-surface/80 backdrop-blur-sm text-inverse-on-surface font-label-caps text-label-caps uppercase tracking-wider rounded-sm">
                                            En Stock
                                        </span>
                                    </div>
                                    {/* Quick Wishlist Button */}
                                    <button className="absolute top-space-sm right-space-sm w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-on-surface hover:text-primary-container transition-colors shadow-xs">
                                        <span className="material-symbols-outlined text-[20px]">favorite_border</span>
                                    </button>
                                    {/* Hover Action Flyout */}
                                    <div className="absolute inset-x-0 bottom-0 p-space-md bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-space-xs">
                                        <div className="flex items-center justify-between text-on-primary font-label-caps text-label-caps">
                                            <span>TALLAS RÁPIDAS</span>
                                            <span className="underline cursor-pointer">Guía</span>
                                        </div>
                                        <div className="flex gap-space-xs">
                                            <button className="flex-1 py-1 bg-surface-container-lowest/20 hover:bg-surface-container-lowest text-inverse-on-surface hover:text-on-surface rounded-sm text-center font-label-caps text-[11px] font-semibold transition-colors">
                                                XS
                                            </button>
                                            <button className="flex-1 py-1 bg-surface-container-lowest/20 hover:bg-surface-container-lowest text-inverse-on-surface hover:text-on-surface rounded-sm text-center font-label-caps text-[11px] font-semibold transition-colors">
                                                S
                                            </button>
                                            <button className="flex-1 py-1 bg-surface-container-lowest/20 hover:bg-surface-container-lowest text-inverse-on-surface hover:text-on-surface rounded-sm text-center font-label-caps text-[11px] font-semibold transition-colors">
                                                M
                                            </button>
                                            <button className="flex-1 py-1 bg-surface-container-lowest/20 hover:bg-surface-container-lowest text-inverse-on-surface hover:text-on-surface rounded-sm text-center font-label-caps text-[11px] font-semibold transition-colors">
                                                L
                                            </button>
                                        </div>
                                        <button type="button" onClick={openProduct} className="w-full mt-space-xs py-space-xs bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold rounded-sm hover:bg-primary transition-colors flex items-center justify-center gap-space-xs">
                                            <span>Ver Detalle</span>
                                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                                {/* Card Info */}
                                <div className="p-space-lg flex flex-col gap-space-xs">
                                    <div className="flex items-center justify-between">
                                        <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">REF: ASC-CR-01</span>
                                        {/* Color Variants */}
                                        <div className="flex items-center gap-1.5" title="Variantes de color">
                                            <span className="w-3.5 h-3.5 rounded-full bg-black ring-1 ring-offset-1 ring-black" />
                                            <span className="w-3.5 h-3.5 rounded-full bg-[#f4ece1]" />
                                            <span className="w-3.5 h-3.5 rounded-full bg-primary-container" />
                                        </div>
                                    </div>
                                    <h2 className="font-headline-md text-headline-md font-bold text-on-surface leading-tight hover:text-primary-container transition-colors cursor-pointer">
                                        Corset Estructurado 'Siren'
                                    </h2>
                                    <div className="flex items-baseline gap-space-sm pt-space-xxs">
                                        <span className="font-headline-md text-headline-md font-bold text-primary-container">$189.000 COP</span>
                                        <span className="font-body-sm text-body-sm text-on-surface-variant line-through">$210.000 COP</span>
                                    </div>
                                    <div className="pt-space-xs flex items-center justify-between text-on-surface-variant font-label-caps text-label-caps">
                                        <span>Varillas ergonómicas de soporte</span>
                                        <span className="text-tertiary font-semibold flex items-center gap-0.5">
                                            <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                            Envío Gratis
                                        </span>
                                    </div>
                                </div>
                            </article>
                            {/* Product 2: Body Nexus */}
                            <article className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                                <div className="relative w-full aspect-[3/4] bg-surface-container overflow-hidden">
                                    <img className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" data-alt="High-end editorial fashion photography of a model standing in an architectural concrete space wearing the sculpted asymmetrical Body Nexus in bone white high-performance stretch jersey with dynamic diagonal cutout lines" src="/images/ascend/high-end-editorial-fashion-photography-of.jpg" />
                                    <div className="absolute top-space-sm left-space-sm flex flex-col gap-space-xxs">
                                        <span className="px-space-sm py-space-xxs bg-inverse-surface text-inverse-on-surface font-label-caps text-label-caps uppercase tracking-wider rounded-sm font-semibold">
                                            Drop Exclusivo
                                        </span>
                                        <span className="px-space-sm py-space-xxs bg-inverse-surface/80 backdrop-blur-sm text-inverse-on-surface font-label-caps text-label-caps uppercase tracking-wider rounded-sm">
                                            En Stock
                                        </span>
                                    </div>
                                    <button className="absolute top-space-sm right-space-sm w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-on-surface hover:text-primary-container transition-colors shadow-xs">
                                        <span className="material-symbols-outlined text-[20px]">favorite_border</span>
                                    </button>
                                    {/* Hover Action Flyout */}
                                    <div className="absolute inset-x-0 bottom-0 p-space-md bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-space-xs">
                                        <div className="flex items-center justify-between text-on-primary font-label-caps text-label-caps">
                                            <span>TALLAS RÁPIDAS</span>
                                            <span className="underline cursor-pointer">Guía</span>
                                        </div>
                                        <div className="flex gap-space-xs">
                                            <button className="flex-1 py-1 bg-surface-container-lowest/20 hover:bg-surface-container-lowest text-inverse-on-surface hover:text-on-surface rounded-sm text-center font-label-caps text-[11px] font-semibold transition-colors">
                                                XS
                                            </button>
                                            <button className="flex-1 py-1 bg-surface-container-lowest/20 hover:bg-surface-container-lowest text-inverse-on-surface hover:text-on-surface rounded-sm text-center font-label-caps text-[11px] font-semibold transition-colors">
                                                S
                                            </button>
                                            <button className="flex-1 py-1 bg-surface-container-lowest/20 hover:bg-surface-container-lowest text-inverse-on-surface hover:text-on-surface rounded-sm text-center font-label-caps text-[11px] font-semibold transition-colors">
                                                M
                                            </button>
                                            <button className="flex-1 py-1 bg-surface-container-lowest/20 hover:bg-surface-container-lowest text-inverse-on-surface hover:text-on-surface rounded-sm text-center font-label-caps text-[11px] font-semibold transition-colors">
                                                L
                                            </button>
                                        </div>
                                        <button type="button" onClick={openProduct} className="w-full mt-space-xs py-space-xs bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold rounded-sm hover:bg-primary transition-colors flex items-center justify-center gap-space-xs">
                                            <span>Ver Detalle</span>
                                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="p-space-lg flex flex-col gap-space-xs">
                                    <div className="flex items-center justify-between">
                                        <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">REF: ASC-BD-09</span>
                                        <div className="flex items-center gap-1.5" title="Variantes de color">
                                            <span className="w-3.5 h-3.5 rounded-full bg-[#f4ece1] ring-1 ring-offset-1 ring-neutral-400" />
                                            <span className="w-3.5 h-3.5 rounded-full bg-black" />
                                        </div>
                                    </div>
                                    <h2 className="font-headline-md text-headline-md font-bold text-on-surface leading-tight hover:text-primary-container transition-colors cursor-pointer">
                                        Body Asimétrico Esculpido 'Nexus'
                                    </h2>
                                    <div className="flex items-baseline gap-space-sm pt-space-xxs">
                                        <span className="font-headline-md text-headline-md font-bold text-on-surface">$160.000 COP</span>
                                    </div>
                                    <div className="pt-space-xs flex items-center justify-between text-on-surface-variant font-label-caps text-label-caps">
                                        <span>Doble forro seamless moldeador</span>
                                        <span className="font-semibold text-on-surface">Disponible</span>
                                    </div>
                                </div>
                            </article>
                            {/* Product 3: Camiseta Acid Wash */}
                            <article className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                                <div className="relative w-full aspect-[3/4] bg-surface-container overflow-hidden">
                                    <img className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" data-alt="Close-up fashion editorial photo of a female model wearing an oversized cropped acid wash charcoal black t-shirt with heavy raw cotton hem and discreet crimson typography ASCEND detail, contemporary urban mood" src="/images/ascend/close-up-fashion-editorial-photo-of.jpg" />
                                    <div className="absolute top-space-sm left-space-sm flex flex-col gap-space-xxs">
                                        <span className="px-space-sm py-space-xxs bg-surface-container-highest text-on-surface font-label-caps text-label-caps uppercase tracking-wider rounded-sm font-semibold">
                                            Streetwear Heavy
                                        </span>
                                        <span className="px-space-sm py-space-xxs bg-inverse-surface/80 backdrop-blur-sm text-inverse-on-surface font-label-caps text-label-caps uppercase tracking-wider rounded-sm">
                                            En Stock
                                        </span>
                                    </div>
                                    <button className="absolute top-space-sm right-space-sm w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-on-surface hover:text-primary-container transition-colors shadow-xs">
                                        <span className="material-symbols-outlined text-[20px]">favorite_border</span>
                                    </button>
                                    {/* Hover Action Flyout */}
                                    <div className="absolute inset-x-0 bottom-0 p-space-md bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-space-xs">
                                        <div className="flex items-center justify-between text-on-primary font-label-caps text-label-caps">
                                            <span>TALLAS RÁPIDAS</span>
                                            <span className="underline cursor-pointer">Guía</span>
                                        </div>
                                        <div className="flex gap-space-xs">
                                            <button className="flex-1 py-1 bg-surface-container-lowest/20 hover:bg-surface-container-lowest text-inverse-on-surface hover:text-on-surface rounded-sm text-center font-label-caps text-[11px] font-semibold transition-colors">
                                                XS
                                            </button>
                                            <button className="flex-1 py-1 bg-surface-container-lowest/20 hover:bg-surface-container-lowest text-inverse-on-surface hover:text-on-surface rounded-sm text-center font-label-caps text-[11px] font-semibold transition-colors">
                                                S
                                            </button>
                                            <button className="flex-1 py-1 bg-surface-container-lowest/20 hover:bg-surface-container-lowest text-inverse-on-surface hover:text-on-surface rounded-sm text-center font-label-caps text-[11px] font-semibold transition-colors">
                                                M
                                            </button>
                                            <button className="flex-1 py-1 bg-surface-container-lowest/20 hover:bg-surface-container-lowest text-inverse-on-surface hover:text-on-surface rounded-sm text-center font-label-caps text-[11px] font-semibold transition-colors">
                                                L
                                            </button>
                                        </div>
                                        <button type="button" onClick={openProduct} className="w-full mt-space-xs py-space-xs bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold rounded-sm hover:bg-primary transition-colors flex items-center justify-center gap-space-xs">
                                            <span>Ver Detalle</span>
                                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="p-space-lg flex flex-col gap-space-xs">
                                    <div className="flex items-center justify-between">
                                        <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">REF: ASC-TS-14</span>
                                        <div className="flex items-center gap-1.5" title="Variantes de color">
                                            <span className="w-3.5 h-3.5 rounded-full bg-[#3d3d3d] ring-1 ring-offset-1 ring-neutral-600" />
                                            <span className="w-3.5 h-3.5 rounded-full bg-[#f4ece1]" />
                                        </div>
                                    </div>
                                    <h2 className="font-headline-md text-headline-md font-bold text-on-surface leading-tight hover:text-primary-container transition-colors cursor-pointer">
                                        Camiseta Crop Oversize 'Acid Wash'
                                    </h2>
                                    <div className="flex items-baseline gap-space-sm pt-space-xxs">
                                        <span className="font-headline-md text-headline-md font-bold text-on-surface">$115.000 COP</span>
                                    </div>
                                    <div className="pt-space-xs flex items-center justify-between text-on-surface-variant font-label-caps text-label-caps">
                                        <span>Algodón 280 GSM peinado</span>
                                        <span className="font-semibold text-on-surface">Corte Relaxed</span>
                                    </div>
                                </div>
                            </article>
                            {/* Product 4: Body Contour Mesh (Ultimas Unidades) */}
                            <article className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                                <div className="relative w-full aspect-[3/4] bg-surface-container overflow-hidden">
                                    <img className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" data-alt="High fashion editorial shoot of a woman wearing the sleek semi-sheer Contour Mesh body suit in deep crimson red with black contour panelling, dark studio mood lighting, editorial luxury vibe" src="/images/ascend/high-fashion-editorial-shoot-of-a.jpg" />
                                    <div className="absolute top-space-sm left-space-sm flex flex-col gap-space-xxs">
                                        <span className="px-space-sm py-space-xxs bg-error text-on-error font-label-caps text-label-caps uppercase tracking-wider rounded-sm font-bold shadow-xs animate-pulse">
                                            Últimas unidades
                                        </span>
                                        <span className="px-space-sm py-space-xxs bg-inverse-surface/80 backdrop-blur-sm text-inverse-on-surface font-label-caps text-label-caps uppercase tracking-wider rounded-sm">
                                            Solo 3 disponibles
                                        </span>
                                    </div>
                                    <button className="absolute top-space-sm right-space-sm w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-on-surface hover:text-primary-container transition-colors shadow-xs">
                                        <span className="material-symbols-outlined text-[20px]">favorite_border</span>
                                    </button>
                                    {/* Hover Action Flyout */}
                                    <div className="absolute inset-x-0 bottom-0 p-space-md bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-space-xs">
                                        <div className="flex items-center justify-between text-on-primary font-label-caps text-label-caps">
                                            <span>TALLAS RÁPIDAS</span>
                                            <span className="underline cursor-pointer">Guía</span>
                                        </div>
                                        <div className="flex gap-space-xs">
                                            <button className="flex-1 py-1 bg-surface-container-lowest/20 hover:bg-surface-container-lowest text-inverse-on-surface hover:text-on-surface rounded-sm text-center font-label-caps text-[11px] font-semibold transition-colors">
                                                XS
                                            </button>
                                            <button className="flex-1 py-1 bg-surface-container-lowest/20 hover:bg-surface-container-lowest text-inverse-on-surface hover:text-on-surface rounded-sm text-center font-label-caps text-[11px] font-semibold transition-colors">
                                                S
                                            </button>
                                            <button className="flex-1 py-1 bg-surface-container-lowest/10 text-inverse-on-surface/40 cursor-not-allowed rounded-sm text-center font-label-caps text-[11px] line-through">
                                                M
                                            </button>
                                            <button className="flex-1 py-1 bg-surface-container-lowest/10 text-inverse-on-surface/40 cursor-not-allowed rounded-sm text-center font-label-caps text-[11px] line-through">
                                                L
                                            </button>
                                        </div>
                                        <button type="button" onClick={openProduct} className="w-full mt-space-xs py-space-xs bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold rounded-sm hover:bg-primary transition-colors flex items-center justify-center gap-space-xs">
                                            <span>Ver Detalle</span>
                                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="p-space-lg flex flex-col gap-space-xs">
                                    <div className="flex items-center justify-between">
                                        <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">REF: ASC-BD-03</span>
                                        <div className="flex items-center gap-1.5" title="Variantes de color">
                                            <span className="w-3.5 h-3.5 rounded-full bg-primary ring-1 ring-offset-1 ring-primary" />
                                            <span className="w-3.5 h-3.5 rounded-full bg-black" />
                                        </div>
                                    </div>
                                    <h2 className="font-headline-md text-headline-md font-bold text-on-surface leading-tight hover:text-primary-container transition-colors cursor-pointer">
                                        Body 'Contour Mesh'
                                    </h2>
                                    <div className="flex items-baseline gap-space-sm pt-space-xxs">
                                        <span className="font-headline-md text-headline-md font-bold text-primary-container">$90.000 COP</span>
                                    </div>
                                    <div className="pt-space-xs flex items-center justify-between text-on-surface-variant font-label-caps text-label-caps">
                                        <span>Malla elástica de alta densidad</span>
                                        <span className="text-error font-semibold">Casi Agotado</span>
                                    </div>
                                </div>
                            </article>
                            {/* Product 5: Tenis Ascend Vanguard Femme */}
                            <article className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                                <div className="relative w-full aspect-[3/4] bg-surface-container overflow-hidden">
                                    <img className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" data-alt="Chic studio product photography of futuristic luxury high-fashion women sneakers Ascend Vanguard Femme in ivory bone, raw metallic accents, architectural chunky sole, pristine white minimal podium" src="/images/ascend/chic-studio-product-photography-of-futuristic.jpg" />
                                    <div className="absolute top-space-sm left-space-sm flex flex-col gap-space-xxs">
                                        <span className="px-space-sm py-space-xxs bg-inverse-surface text-inverse-on-surface font-label-caps text-label-caps uppercase tracking-wider rounded-sm font-semibold">
                                            Calzado Vanguard
                                        </span>
                                        <span className="px-space-sm py-space-xxs bg-inverse-surface/80 backdrop-blur-sm text-inverse-on-surface font-label-caps text-label-caps uppercase tracking-wider rounded-sm">
                                            En Stock
                                        </span>
                                    </div>
                                    <button className="absolute top-space-sm right-space-sm w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-on-surface hover:text-primary-container transition-colors shadow-xs">
                                        <span className="material-symbols-outlined text-[20px]">favorite_border</span>
                                    </button>
                                    {/* Hover Action Flyout */}
                                    <div className="absolute inset-x-0 bottom-0 p-space-md bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-space-xs">
                                        <div className="flex items-center justify-between text-on-primary font-label-caps text-label-caps">
                                            <span>TALLAS CALZADO (EUR)</span>
                                            <span className="underline cursor-pointer">Guía</span>
                                        </div>
                                        <div className="flex gap-space-xs">
                                            <button className="flex-1 py-1 bg-surface-container-lowest/20 hover:bg-surface-container-lowest text-inverse-on-surface hover:text-on-surface rounded-sm text-center font-label-caps text-[11px] font-semibold transition-colors">
                                                36
                                            </button>
                                            <button className="flex-1 py-1 bg-surface-container-lowest/20 hover:bg-surface-container-lowest text-inverse-on-surface hover:text-on-surface rounded-sm text-center font-label-caps text-[11px] font-semibold transition-colors">
                                                37
                                            </button>
                                            <button className="flex-1 py-1 bg-surface-container-lowest/20 hover:bg-surface-container-lowest text-inverse-on-surface hover:text-on-surface rounded-sm text-center font-label-caps text-[11px] font-semibold transition-colors">
                                                38
                                            </button>
                                            <button className="flex-1 py-1 bg-surface-container-lowest/20 hover:bg-surface-container-lowest text-inverse-on-surface hover:text-on-surface rounded-sm text-center font-label-caps text-[11px] font-semibold transition-colors">
                                                39
                                            </button>
                                        </div>
                                        <button type="button" onClick={openProduct} className="w-full mt-space-xs py-space-xs bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold rounded-sm hover:bg-primary transition-colors flex items-center justify-center gap-space-xs">
                                            <span>Ver Detalle</span>
                                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="p-space-lg flex flex-col gap-space-xs">
                                    <div className="flex items-center justify-between">
                                        <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">REF: ASC-SH-88</span>
                                        <div className="flex items-center gap-1.5" title="Variantes de color">
                                            <span className="w-3.5 h-3.5 rounded-full bg-[#f0eee9] ring-1 ring-offset-1 ring-neutral-400" />
                                            <span className="w-3.5 h-3.5 rounded-full bg-black" />
                                            <span className="w-3.5 h-3.5 rounded-full bg-[#d8b4b4]" />
                                        </div>
                                    </div>
                                    <h2 className="font-headline-md text-headline-md font-bold text-on-surface leading-tight hover:text-primary-container transition-colors cursor-pointer">
                                        Tenis Ascend Vanguard Femme
                                    </h2>
                                    <div className="flex items-baseline gap-space-sm pt-space-xxs">
                                        <span className="font-headline-md text-headline-md font-bold text-on-surface">$380.000 COP</span>
                                    </div>
                                    <div className="pt-space-xs flex items-center justify-between text-on-surface-variant font-label-caps text-label-caps">
                                        <span>Suela termoplástica ultraligera</span>
                                        <span className="text-tertiary font-semibold flex items-center gap-0.5">
                                            <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                                            Envío Express
                                        </span>
                                    </div>
                                </div>
                            </article>
                            {/* Product 6: Corset Minimal Dark */}
                            <article className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                                <div className="relative w-full aspect-[3/4] bg-surface-container overflow-hidden">
                                    <img className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" data-alt="Dark luxury tailored corset top styled with structured suiting lapels on female model in dramatic shadows, minimalist editorial lighting, sharp silhouettes, premium high fashion photography" src="/images/ascend/dark-luxury-tailored-corset-top-styled.jpg" />
                                    <div className="absolute top-space-sm left-space-sm flex flex-col gap-space-xxs">
                                        <span className="px-space-sm py-space-xxs bg-inverse-surface text-inverse-on-surface font-label-caps text-label-caps uppercase tracking-wider rounded-sm font-semibold">
                                            Sastrería Urbana
                                        </span>
                                        <span className="px-space-sm py-space-xxs bg-inverse-surface/80 backdrop-blur-sm text-inverse-on-surface font-label-caps text-label-caps uppercase tracking-wider rounded-sm">
                                            En Stock
                                        </span>
                                    </div>
                                    <button className="absolute top-space-sm right-space-sm w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-on-surface hover:text-primary-container transition-colors shadow-xs">
                                        <span className="material-symbols-outlined text-[20px]">favorite_border</span>
                                    </button>
                                    {/* Hover Action Flyout */}
                                    <div className="absolute inset-x-0 bottom-0 p-space-md bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-space-xs">
                                        <div className="flex items-center justify-between text-on-primary font-label-caps text-label-caps">
                                            <span>TALLAS RÁPIDAS</span>
                                            <span className="underline cursor-pointer">Guía</span>
                                        </div>
                                        <div className="flex gap-space-xs">
                                            <button className="flex-1 py-1 bg-surface-container-lowest/20 hover:bg-surface-container-lowest text-inverse-on-surface hover:text-on-surface rounded-sm text-center font-label-caps text-[11px] font-semibold transition-colors">
                                                XS
                                            </button>
                                            <button className="flex-1 py-1 bg-surface-container-lowest/20 hover:bg-surface-container-lowest text-inverse-on-surface hover:text-on-surface rounded-sm text-center font-label-caps text-[11px] font-semibold transition-colors">
                                                S
                                            </button>
                                            <button className="flex-1 py-1 bg-surface-container-lowest/20 hover:bg-surface-container-lowest text-inverse-on-surface hover:text-on-surface rounded-sm text-center font-label-caps text-[11px] font-semibold transition-colors">
                                                M
                                            </button>
                                            <button className="flex-1 py-1 bg-surface-container-lowest/20 hover:bg-surface-container-lowest text-inverse-on-surface hover:text-on-surface rounded-sm text-center font-label-caps text-[11px] font-semibold transition-colors">
                                                L
                                            </button>
                                        </div>
                                        <button type="button" onClick={openProduct} className="w-full mt-space-xs py-space-xs bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold rounded-sm hover:bg-primary transition-colors flex items-center justify-center gap-space-xs">
                                            <span>Ver Detalle</span>
                                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="p-space-lg flex flex-col gap-space-xs">
                                    <div className="flex items-center justify-between">
                                        <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">REF: ASC-CR-07</span>
                                        <div className="flex items-center gap-1.5" title="Variantes de color">
                                            <span className="w-3.5 h-3.5 rounded-full bg-black ring-1 ring-offset-1 ring-black" />
                                            <span className="w-3.5 h-3.5 rounded-full bg-primary-container" />
                                        </div>
                                    </div>
                                    <h2 className="font-headline-md text-headline-md font-bold text-on-surface leading-tight hover:text-primary-container transition-colors cursor-pointer">
                                        Corset Sastrería 'Minimal Dark'
                                    </h2>
                                    <div className="flex items-baseline gap-space-sm pt-space-xxs">
                                        <span className="font-headline-md text-headline-md font-bold text-on-surface">$215.000 COP</span>
                                    </div>
                                    <div className="pt-space-xs flex items-center justify-between text-on-surface-variant font-label-caps text-label-caps">
                                        <span>Lana fría y forro respirable</span>
                                        <span className="font-semibold text-on-surface">Cierre Oculto</span>
                                    </div>
                                </div>
                            </article>
                        </div>
                        {/* Pagination & Collection Status Bar */}
                        <div className="mt-space-2xl pt-space-xl flex flex-col md:flex-row items-center justify-between gap-space-lg">
                            <div className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
                                <span>Mostrando</span>
                                <span className="font-bold text-on-surface">6</span>
                                <span>de</span>
                                <span className="font-bold text-on-surface">24</span>
                                <span>prendas exclusivas</span>
                            </div>
                            <div className="flex items-center gap-space-xs">
                                <button className="w-10 h-10 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors" disabled>
                                    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                                </button>
                                <button className="w-10 h-10 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold">1</button>
                                <button className="w-10 h-10 rounded-lg bg-surface-container-lowest hover:bg-surface-container-highest text-on-surface font-label-md text-label-md font-medium transition-colors">
                                    2
                                </button>
                                <button className="w-10 h-10 rounded-lg bg-surface-container-lowest hover:bg-surface-container-highest text-on-surface font-label-md text-label-md font-medium transition-colors">
                                    3
                                </button>
                                <button className="w-10 h-10 rounded-lg bg-surface-container-lowest hover:bg-surface-container-highest text-on-surface font-label-md text-label-md font-medium transition-colors">
                                    4
                                </button>
                                <button className="w-10 h-10 rounded-lg bg-surface-container-lowest hover:bg-surface-container-highest text-on-surface flex items-center justify-center transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-space-sm">
                                <a href="#" className="font-label-caps text-label-caps text-primary-container font-semibold hover:underline uppercase tracking-wider flex items-center gap-space-xxs">
                                    <span>Explorar Lookbook Femenino</span>
                                    <span className="material-symbols-outlined text-[16px]">north_east</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Value Propositions Banner */}
                <section className="w-full px-margin py-space-xl bg-surface">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                        <div className="flex items-start gap-space-md p-space-md bg-surface-container-lowest rounded-xl shadow-xs">
                            <span className="material-symbols-outlined text-primary-container text-[32px]">sync_alt</span>
                            <div>
                                <h3 className="font-title-md text-title-md font-bold text-on-surface mb-space-xxs">Cambios Gratuitos</h3>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                    Prueba tus prendas sin riesgo. Tienes 30 días para solicitar cambio de talla en Colombia.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-space-md p-space-md bg-surface-container-lowest rounded-xl shadow-xs">
                            <span className="material-symbols-outlined text-primary-container text-[32px]">verified</span>
                            <div>
                                <h3 className="font-title-md text-title-md font-bold text-on-surface mb-space-xxs">Alta Confección Local</h3>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                    Cada silueta se diseña y confecciona con acabados de sastre y costuras de refuerzo técnico.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-space-md p-space-md bg-surface-container-lowest rounded-xl shadow-xs">
                            <span className="material-symbols-outlined text-primary-container text-[32px]">support_agent</span>
                            <div>
                                <h3 className="font-title-md text-title-md font-bold text-on-surface mb-space-xxs">Asesoría Concierge</h3>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                    ¿Dudas con tu silueta o medidas anatómicas? Te asesoramos por WhatsApp antes de tu compra.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
