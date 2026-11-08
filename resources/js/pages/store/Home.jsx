import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TRENDING_FILTERS = [
    { id: 'all', label: 'Todo' },
    { id: 'tops', label: 'Camisetas & Tops' },
    { id: 'corsets', label: 'Corsets & Bodys' },
    { id: 'hoodies', label: 'Sacos & Outerwear' },
];

export default function Home() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('all');
    const visible = (cat) => (filter === 'all' || filter === cat ? 'flex' : 'hidden');
    const openProduct = () => navigate('/producto/corset-siren-rojo');

    return (
        <>
            <div className="flex flex-col w-full">
                {/* 1. Hero de Campaña // IMMERSIVE EDITORIAL */}
                <section className="relative w-full min-h-[942px] flex items-end pb-space-2xl overflow-hidden bg-inverse-surface">
                    <div className="absolute inset-0 w-full h-full bg-cover bg-center mix-blend-luminosity opacity-70 scale-105 transition-transform duration-1000 ease-out" data-alt="Avant-garde cinematic fashion shoot in an architectural minimalist concrete brutalist setting with sleek shadows and subtle ambient crimson lighting. Two models, a man and a woman, wearing structured urban tailoring, heavyweight boxy silhouettes, and high-fashion streetwear with precise tailoring." style={{ backgroundImage: "url('/images/ascend/avant-garde-cinematic-fashion-shoot-in.jpg')" }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface via-inverse-surface/40 to-transparent" />
                    <div className="absolute top-1/4 right-8 lg:right-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
                    <div className="relative z-10 w-full px-margin max-w-7xl mx-auto">
                        <div className="flex flex-col items-start gap-space-md">
                            <div className="inline-flex items-center gap-space-xs bg-primary-container/20 backdrop-blur-md px-space-md py-space-xxs rounded-full text-on-primary-container">
                                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                                <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-primary">FW 2025 // ARCHITECTURAL EXPERIMENTS</span>
                            </div>
                            <h1 className="font-display-lg text-display-lg md:text-5xl lg:text-6xl text-white font-bold tracking-tight max-w-4xl uppercase leading-none">
                                Urban Architecture
                            </h1>
                            <p className="font-body-lg text-body-lg text-neutral-300 max-w-xl font-normal leading-relaxed">
                                Diseño contemporáneo de alta fidelidad, cortes matemáticos y volumen calculado. La sastrería del mañana para la urbe moderna.
                            </p>
                            <div className="flex flex-wrap items-center gap-space-md pt-space-sm w-full sm:w-auto">
                                <Link to="/mujer" className="h-12 px-space-xl bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg rounded-lg flex items-center justify-center gap-space-xs tracking-wider uppercase transition-all shadow-md group">
                                    <span>Explorar Mujer</span>
                                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </Link>
                                <Link to="/hombre" className="h-12 px-space-xl bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 backdrop-blur-md text-white font-label-lg text-label-lg rounded-lg flex items-center justify-center gap-space-xs tracking-wider uppercase transition-all">
                                    <span>Explorar Hombre</span>
                                </Link>
                            </div>
                        </div>
                        {/* Quick Spec Badges */}
                        <div className="mt-space-2xl pt-space-lg flex flex-wrap gap-space-xl text-neutral-400 font-label-caps text-label-caps tracking-widest uppercase">
                            <div className="flex items-center gap-space-xs">
                                <span className="text-white font-bold">01/</span>
                                {' '}
                                HEAVYWEIGHT 320GSM COTTON
                            </div>
                            <div className="flex items-center gap-space-xs">
                                <span className="text-white font-bold">02/</span>
                                {' '}
                                CORTE ANATÓMICO ESCULPIDO
                            </div>
                            <div className="flex items-center gap-space-xs">
                                <span className="text-white font-bold">03/</span>
                                {' '}
                                CONFECCIÓN LOCAL EN MEDELLÍN
                            </div>
                        </div>
                    </div>
                </section>
                {/* 2. Accesos directos a Colecciones Principales // DUAL EDITORIAL TILES */}
                <section className="w-full py-space-2xl px-margin max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-sm">
                        <div>
                            <span className="font-label-caps text-label-caps uppercase text-primary-container tracking-widest block mb-space-xxs">CATEGORÍAS EMBLEMÁTICAS</span>
                            <h2 className="font-headline-lg text-headline-lg font-bold uppercase tracking-tight text-on-surface">Dirección y Estructura</h2>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
                            Siluetas balanceadas entre funcionalidad utilitaria y drapeados geométricos adaptados al clima urbano.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
                        {/* Tarjeta Línea Hombre */}
                        <div className="relative bg-surface-container group rounded-xl overflow-hidden flex flex-col justify-end min-h-[520px] p-space-xl shadow-xs hover:shadow-xl transition-all">
                            <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="Editorial look of male model in an urban brutalist corridor wearing a minimal oversized black hoodie, structured cargo pants and technical white trainers, minimalist modern lighting, monochrome tone with sharp shadows." style={{ backgroundImage: "url('/images/ascend/editorial-look-of-male-model-in.jpg')" }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/40 to-transparent" />
                            <div className="relative z-10 flex flex-col gap-space-md">
                                <span className="font-label-caps text-label-caps tracking-widest text-on-primary-container uppercase">LÍNEA MASCULINA // 24 ARTÍCULOS</span>
                                <h3 className="font-display-lg text-display-lg text-white font-bold tracking-tight uppercase">Sastrería &amp; Relaxed</h3>
                                <div className="flex flex-wrap gap-space-xs">
                                    <span className="px-space-sm py-space-xxs rounded-lg bg-surface-container-lowest/20 backdrop-blur-md text-white font-label-md text-label-md">
                                        Camisetas Oversize
                                    </span>
                                    <span className="px-space-sm py-space-xxs rounded-lg bg-surface-container-lowest/20 backdrop-blur-md text-white font-label-md text-label-md">
                                        Sacos de Hilo
                                    </span>
                                    <span className="px-space-sm py-space-xxs rounded-lg bg-surface-container-lowest/20 backdrop-blur-md text-white font-label-md text-label-md">
                                        Tenis Monocromáticos
                                    </span>
                                </div>
                                <div className="pt-space-xs">
                                    <Link to="/hombre" className="inline-flex items-center gap-space-xs text-white font-label-lg text-label-lg uppercase tracking-wider group-hover:text-primary-fixed-dim transition-colors">
                                        <span>Descubrir Línea Hombre</span>
                                        <span className="material-symbols-outlined text-[20px]">north_east</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* Tarjeta Línea Mujer */}
                        <div className="relative bg-surface-container group rounded-xl overflow-hidden flex flex-col justify-end min-h-[520px] p-space-xl shadow-xs hover:shadow-xl transition-all">
                            <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="High-fashion model posing in an open sculptural gallery wearing an architectural structured boned corset in deep ruby crimson and tailored fluid charcoal trousers, sleek minimalist chic styling, soft dramatic directional lighting." style={{ backgroundImage: "url('/images/ascend/high-fashion-model-posing-in-an.jpg')" }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/40 to-transparent" />
                            <div className="relative z-10 flex flex-col gap-space-md">
                                <span className="font-label-caps text-label-caps tracking-widest text-on-primary-container uppercase">LÍNEA FEMENINA // 31 ARTÍCULOS</span>
                                <h3 className="font-display-lg text-display-lg text-white font-bold tracking-tight uppercase">Siluetas Esculpidas</h3>
                                <div className="flex flex-wrap gap-space-xs">
                                    <span className="px-space-sm py-space-xxs rounded-lg bg-surface-container-lowest/20 backdrop-blur-md text-white font-label-md text-label-md">
                                        Corsets Arquitectónicos
                                    </span>
                                    <span className="px-space-sm py-space-xxs rounded-lg bg-surface-container-lowest/20 backdrop-blur-md text-white font-label-md text-label-md">
                                        Bodys Asimétricos
                                    </span>
                                    <span className="px-space-sm py-space-xxs rounded-lg bg-surface-container-lowest/20 backdrop-blur-md text-white font-label-md text-label-md">
                                        Camisetas Cropped
                                    </span>
                                </div>
                                <div className="pt-space-xs">
                                    <Link to="/mujer" className="inline-flex items-center gap-space-xs text-white font-label-lg text-label-lg uppercase tracking-wider group-hover:text-primary-fixed-dim transition-colors">
                                        <span>Descubrir Línea Mujer</span>
                                        <span className="material-symbols-outlined text-[20px]">north_east</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* 3. Novedades de Temporada // CURATED DROP GRID */}
                <section className="w-full py-space-2xl bg-surface-container-low">
                    <div className="w-full px-margin max-w-7xl mx-auto">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-space-xl gap-space-sm">
                            <div>
                                <div className="flex items-center gap-space-xs mb-space-xxs">
                                    <span className="w-2 h-2 rounded-full bg-primary-container" />
                                    <span className="font-label-caps text-label-caps uppercase text-primary-container tracking-widest">NUEVO LANZAMIENTO</span>
                                </div>
                                <h2 className="font-headline-lg text-headline-lg font-bold uppercase tracking-tight text-on-surface">Novedades de Temporada</h2>
                            </div>
                            <Link to="/novedades" className="inline-flex items-center gap-space-xs font-label-md text-label-md uppercase tracking-wider text-primary-container font-semibold hover:text-primary transition-colors">
                                <span>Ver Todo el Drop (18)</span>
                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
                            {/* Producto 1 */}
                            <article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition-all group flex flex-col">
                                <div className="relative w-full aspect-[3/4] bg-surface-container overflow-hidden">
                                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Editorial studio photo of a boxy heavyweight luxury cotton T-shirt in washed charcoal slate gray, flat lay clean architectural lighting, sharp high resolution texture details, minimalist backdrop." src="/images/ascend/editorial-studio-photo-of-a-boxy.jpg" />
                                    <div className="absolute top-space-sm left-space-sm">
                                        <span className="px-space-sm py-space-xxs rounded-lg bg-inverse-surface text-inverse-on-surface font-label-caps text-[10px] tracking-wider uppercase font-semibold">
                                            NUEVA COLECCIÓN
                                        </span>
                                    </div>
                                    <button aria-label="Agregar a favoritos" className="absolute top-space-sm right-space-sm w-9 h-9 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-on-surface hover:text-primary-container flex items-center justify-center transition-colors shadow-xs">
                                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                                    </button>
                                    <div className="absolute bottom-space-sm left-space-sm right-space-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button type="button" onClick={openProduct} className="w-full h-10 bg-inverse-surface/90 backdrop-blur-md text-white font-label-md text-label-md uppercase tracking-wider rounded-lg flex items-center justify-center gap-space-xs hover:bg-inverse-surface transition-colors shadow-md">
                                            <span className="material-symbols-outlined text-[16px]">add</span>
                                            {' '}
                                            Vista Rápida
                                        </button>
                                    </div>
                                </div>
                                <div className="p-space-md flex-1 flex flex-col justify-between">
                                    <div>
                                        <span className="font-label-caps text-label-caps text-secondary block uppercase">HOMBRE // TOPS</span>
                                        <h3 className="font-title-md text-title-md font-semibold text-on-surface tracking-tight mt-space-xxs">
                                            Camiseta Boxy Heavyweight 'Archive 92'
                                        </h3>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xxs">Algodón peinado 320g, caída estructurada.</p>
                                    </div>
                                    <div className="mt-space-md pt-space-sm flex items-center justify-between">
                                        <div>
                                            <span className="font-title-md text-title-md font-bold text-on-surface">$125.000 COP</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-3.5 h-3.5 rounded-full bg-neutral-900 ring-2 ring-primary-container" title="Negro Ónix" />
                                            <span className="w-3.5 h-3.5 rounded-full bg-neutral-400" title="Gris Ceniza" />
                                            <span className="w-3.5 h-3.5 rounded-full bg-stone-100" title="Blanco Hueso" />
                                        </div>
                                    </div>
                                </div>
                            </article>
                            {/* Producto 2 */}
                            <article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition-all group flex flex-col">
                                <div className="relative w-full aspect-[3/4] bg-surface-container overflow-hidden">
                                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Editorial look of an architectural boned corset named Siren in deep wine crimson, clean seams, sculptural waistline, high-end fashion styling on a mannequin against a warm light beige backdrop." src="/images/ascend/editorial-look-of-an-architectural-boned.jpg" />
                                    <div className="absolute top-space-sm left-space-sm">
                                        <span className="px-space-sm py-space-xxs rounded-lg bg-primary-container text-on-primary font-label-caps text-[10px] tracking-wider uppercase font-semibold">
                                            NUEVA COLECCIÓN
                                        </span>
                                    </div>
                                    <button aria-label="Agregar a favoritos" className="absolute top-space-sm right-space-sm w-9 h-9 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-on-surface hover:text-primary-container flex items-center justify-center transition-colors shadow-xs">
                                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                                    </button>
                                    <div className="absolute bottom-space-sm left-space-sm right-space-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button type="button" onClick={openProduct} className="w-full h-10 bg-inverse-surface/90 backdrop-blur-md text-white font-label-md text-label-md uppercase tracking-wider rounded-lg flex items-center justify-center gap-space-xs hover:bg-inverse-surface transition-colors shadow-md">
                                            <span className="material-symbols-outlined text-[16px]">add</span>
                                            {' '}
                                            Vista Rápida
                                        </button>
                                    </div>
                                </div>
                                <div className="p-space-md flex-1 flex flex-col justify-between">
                                    <div>
                                        <span className="font-label-caps text-label-caps text-secondary block uppercase">MUJER // CORSETERÍA</span>
                                        <h3 className="font-title-md text-title-md font-semibold text-on-surface tracking-tight mt-space-xxs">Corset Estructurado 'Siren'</h3>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xxs">Varillas anatómicas flexibles y satén mate.</p>
                                    </div>
                                    <div className="mt-space-md pt-space-sm flex items-center justify-between">
                                        <div>
                                            <span className="font-title-md text-title-md font-bold text-on-surface">$189.000 COP</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-3.5 h-3.5 rounded-full bg-primary-container ring-2 ring-primary-container" title="Carmesí Oscuro" />
                                            <span className="w-3.5 h-3.5 rounded-full bg-neutral-900" title="Negro" />
                                        </div>
                                    </div>
                                </div>
                            </article>
                            {/* Producto 3 */}
                            <article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition-all group flex flex-col">
                                <div className="relative w-full aspect-[3/4] bg-surface-container overflow-hidden">
                                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Editorial front photograph of an asymmetric sculpted bodysuit in obsidian black with architectural cutouts, high tension sculpting jersey fabric, premium finish, isolated on modern studio gray." src="/images/ascend/editorial-front-photograph-of-an-asymmetric.jpg" />
                                    <div className="absolute top-space-sm left-space-sm">
                                        <span className="px-space-sm py-space-xxs rounded-lg bg-inverse-surface text-inverse-on-surface font-label-caps text-[10px] tracking-wider uppercase font-semibold">
                                            NUEVA COLECCIÓN
                                        </span>
                                    </div>
                                    <button aria-label="Agregar a favoritos" className="absolute top-space-sm right-space-sm w-9 h-9 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-on-surface hover:text-primary-container flex items-center justify-center transition-colors shadow-xs">
                                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                                    </button>
                                    <div className="absolute bottom-space-sm left-space-sm right-space-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button type="button" onClick={openProduct} className="w-full h-10 bg-inverse-surface/90 backdrop-blur-md text-white font-label-md text-label-md uppercase tracking-wider rounded-lg flex items-center justify-center gap-space-xs hover:bg-inverse-surface transition-colors shadow-md">
                                            <span className="material-symbols-outlined text-[16px]">add</span>
                                            {' '}
                                            Vista Rápida
                                        </button>
                                    </div>
                                </div>
                                <div className="p-space-md flex-1 flex flex-col justify-between">
                                    <div>
                                        <span className="font-label-caps text-label-caps text-secondary block uppercase">MUJER // BODYS</span>
                                        <h3 className="font-title-md text-title-md font-semibold text-on-surface tracking-tight mt-space-xxs">Body Asimétrico Esculpido 'Nexus'</h3>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xxs">Tejido compresión microfibra segunda piel.</p>
                                    </div>
                                    <div className="mt-space-md pt-space-sm flex items-center justify-between">
                                        <div>
                                            <span className="font-title-md text-title-md font-bold text-on-surface">$160.000 COP</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-3.5 h-3.5 rounded-full bg-neutral-900 ring-2 ring-primary-container" title="Negro Noche" />
                                            <span className="w-3.5 h-3.5 rounded-full bg-[#3d3a36]" title="Gris Carbón" />
                                        </div>
                                    </div>
                                </div>
                            </article>
                            {/* Producto 4 */}
                            <article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition-all group flex flex-col">
                                <div className="relative w-full aspect-[3/4] bg-surface-container overflow-hidden">
                                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Editorial product shot of luxury chunky avant-garde sneakers Ascend Track with angular architectural white sole, matte black leather overlays, and subtle deep crimson accents, studio lighting on pedestals." src="/images/ascend/editorial-product-shot-of-luxury-chunky.jpg" />
                                    <div className="absolute top-space-sm left-space-sm">
                                        <span className="px-space-sm py-space-xxs rounded-lg bg-inverse-surface text-inverse-on-surface font-label-caps text-[10px] tracking-wider uppercase font-semibold">
                                            NUEVA COLECCIÓN
                                        </span>
                                    </div>
                                    <button aria-label="Agregar a favoritos" className="absolute top-space-sm right-space-sm w-9 h-9 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-on-surface hover:text-primary-container flex items-center justify-center transition-colors shadow-xs">
                                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                                    </button>
                                    <div className="absolute bottom-space-sm left-space-sm right-space-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button type="button" onClick={openProduct} className="w-full h-10 bg-inverse-surface/90 backdrop-blur-md text-white font-label-md text-label-md uppercase tracking-wider rounded-lg flex items-center justify-center gap-space-xs hover:bg-inverse-surface transition-colors shadow-md">
                                            <span className="material-symbols-outlined text-[16px]">add</span>
                                            {' '}
                                            Vista Rápida
                                        </button>
                                    </div>
                                </div>
                                <div className="p-space-md flex-1 flex flex-col justify-between">
                                    <div>
                                        <span className="font-label-caps text-label-caps text-secondary block uppercase">UNISEX // FOOTWEAR</span>
                                        <h3 className="font-title-md text-title-md font-semibold text-on-surface tracking-tight mt-space-xxs">Tenis 'Ascend Track' Architecture</h3>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xxs">Suela vibram geométrica y cuero italiano.</p>
                                    </div>
                                    <div className="mt-space-md pt-space-sm flex items-center justify-between">
                                        <div>
                                            <span className="font-title-md text-title-md font-bold text-on-surface">$380.000 COP</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-3.5 h-3.5 rounded-full bg-stone-200 ring-2 ring-primary-container" title="Pure Chalk" />
                                            <span className="w-3.5 h-3.5 rounded-full bg-neutral-900" title="Dark Core" />
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>
                {/* 4. Banner promocional interactivo // INVITACIÓN VISITANTES */}
                <section className="w-full py-space-2xl px-margin max-w-7xl mx-auto">
                    <div className="relative bg-inverse-surface text-inverse-on-surface rounded-xl p-space-xl md:p-space-2xl overflow-hidden shadow-xl flex flex-col lg:flex-row items-center justify-between gap-space-xl">
                        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-primary-container/20 blur-3xl pointer-events-none" />
                        <div className="max-w-2xl relative z-10">
                            <div className="inline-flex items-center gap-space-xs bg-white/10 px-space-sm py-space-xxs rounded-lg mb-space-md">
                                <span className="material-symbols-outlined text-primary-fixed text-[18px]">loyalty</span>
                                <span className="font-label-caps text-label-caps tracking-widest uppercase text-white font-semibold">VENTAJA EXCLUSIVA DE MEMBRESÍA</span>
                            </div>
                            <h2 className="font-headline-lg text-headline-lg md:text-3xl text-white font-bold uppercase tracking-tight leading-tight">Únete al círculo ASCEND</h2>
                            <p className="font-body-md text-body-md text-neutral-300 mt-space-sm leading-relaxed">
                                Regístrate hoy como nuevo miembro y recibe inmediatamente un cupón de bienvenida aplicable a tu primera compra de alta costura urbana (sujeto a condiciones de la promoción y monto mínimo de orden).
                            </p>
                            <div className="mt-space-md flex flex-wrap items-center gap-space-lg text-neutral-400 font-label-md text-label-md">
                                <span className="flex items-center gap-space-xxs">
                                    <span className="material-symbols-outlined text-[16px] text-white">check_circle</span>
                                    {' '}
                                    Acceso prioritario a Drops
                                </span>
                                <span className="flex items-center gap-space-xxs">
                                    <span className="material-symbols-outlined text-[16px] text-white">check_circle</span>
                                    {' '}
                                    Devoluciones gratuitas en Colombia
                                </span>
                                <span className="flex items-center gap-space-xxs">
                                    <span className="material-symbols-outlined text-[16px] text-white">check_circle</span>
                                    {' '}
                                    Invitación a pasarelas privadas
                                </span>
                            </div>
                        </div>
                        <div className="relative z-10 w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-space-sm shrink-0">
                            <Link to="/login" className="h-12 px-space-xl bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg rounded-lg flex items-center justify-center gap-space-xs uppercase tracking-wider transition-colors shadow-md text-center">
                                <span>Crear Cuenta</span>
                                <span className="material-symbols-outlined text-[18px]">person_add</span>
                            </Link>
                            <Link to="/login" className="h-12 px-space-lg bg-white/10 hover:bg-white/20 text-white font-label-md text-label-md rounded-lg flex items-center justify-center uppercase tracking-wider transition-colors text-center">
                                Ya tengo cuenta
                            </Link>
                        </div>
                    </div>
                </section>
                {/* 5. Prendas Populares y Trending con Filtros Rápidos */}
                <section className="w-full py-space-xl px-margin max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-md">
                        <div>
                            <span className="font-label-caps text-label-caps uppercase text-primary-container tracking-widest block mb-space-xxs">RADAR DE TENDENCIA</span>
                            <h2 className="font-headline-lg text-headline-lg font-bold uppercase tracking-tight text-on-surface">Prendas Populares</h2>
                        </div>
                        {/* Filtros Rápidos */}
                        <div className="flex flex-wrap items-center gap-space-xs bg-surface-container-low p-1.5 rounded-lg">
                            {TRENDING_FILTERS.map((f) => (
                                <button
                                    key={f.id}
                                    type="button"
                                    onClick={() => setFilter(f.id)}
                                    className={`px-space-md py-space-xs rounded-lg font-label-md text-label-md transition-all ${
                                        filter === f.id ? 'bg-inverse-surface text-white font-semibold' : 'text-on-surface-variant hover:text-on-surface'
                                    }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-space-md" id="trending-grid">
                        {/* Item Trending 1 */}
                        <div className={`bg-surface-container-lowest rounded-xl overflow-hidden group shadow-xs flex-col ${visible('corsets')}`} data-cat="corsets">
                            <div className="aspect-square bg-surface-container relative overflow-hidden">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Editorial look of a cropped wrap top for women in structured heavyweight bone white ribbed textile, minimal fashion design." src="/images/ascend/editorial-look-of-a-cropped-wrap.jpg" />
                                {' '}
                                <span className="absolute top-2 left-2 bg-primary-container text-white font-label-caps text-[9px] px-1.5 py-0.5 rounded-sm uppercase font-bold">
                                    TOP 1
                                </span>
                            </div>
                            <div className="p-space-sm flex-1 flex flex-col justify-between">
                                <div>
                                    <h4 className="font-label-md text-label-md font-semibold text-on-surface line-clamp-1">Crop Top 'Vortex'</h4>
                                    <span className="font-body-sm text-body-sm text-on-surface-variant block">$95.000 COP</span>
                                </div>
                                <span className="font-label-caps text-[10px] text-primary-container mt-space-xs block font-semibold">+ 420 compras</span>
                            </div>
                        </div>
                        {/* Item Trending 2 */}
                        <div className={`bg-surface-container-lowest rounded-xl overflow-hidden group shadow-xs flex-col ${visible('tops')}`} data-cat="tops">
                            <div className="aspect-square bg-surface-container relative overflow-hidden">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Studio photograph of modern streetwear oversized dropped-shoulder black graphic t-shirt with minimal back print in silver." src="/images/ascend/studio-photograph-of-modern-streetwear-oversized.jpg" />
                                {' '}
                                <span className="absolute top-2 left-2 bg-neutral-900 text-white font-label-caps text-[9px] px-1.5 py-0.5 rounded-sm uppercase font-bold">
                                    TOP 2
                                </span>
                            </div>
                            <div className="p-space-sm flex-1 flex flex-col justify-between">
                                <div>
                                    <h4 className="font-label-md text-label-md font-semibold text-on-surface line-clamp-1">Tee 'Monolith' 280g</h4>
                                    <span className="font-body-sm text-body-sm text-on-surface-variant block">$110.000 COP</span>
                                </div>
                                <span className="font-label-caps text-[10px] text-primary-container mt-space-xs block font-semibold">+ 390 compras</span>
                            </div>
                        </div>
                        {/* Item Trending 3 */}
                        <div className={`bg-surface-container-lowest rounded-xl overflow-hidden group shadow-xs flex-col ${visible('corsets')}`} data-cat="corsets">
                            <div className="aspect-square bg-surface-container relative overflow-hidden">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Close up photography of tailored corset bustier with raw edge seams in washed denim stone gray." src="/images/ascend/close-up-photography-of-tailored-corset.jpg" />
                                {' '}
                                <span className="absolute top-2 left-2 bg-neutral-900 text-white font-label-caps text-[9px] px-1.5 py-0.5 rounded-sm uppercase font-bold">
                                    TOP 3
                                </span>
                            </div>
                            <div className="p-space-sm flex-1 flex flex-col justify-between">
                                <div>
                                    <h4 className="font-label-md text-label-md font-semibold text-on-surface line-clamp-1">Corset 'Demolition' Denim</h4>
                                    <span className="font-body-sm text-body-sm text-on-surface-variant block">$175.000 COP</span>
                                </div>
                                <span className="font-label-caps text-[10px] text-primary-container mt-space-xs block font-semibold">+ 310 compras</span>
                            </div>
                        </div>
                        {/* Item Trending 4 */}
                        <div className={`bg-surface-container-lowest rounded-xl overflow-hidden group shadow-xs flex-col ${visible('hoodies')}`} data-cat="hoodies">
                            <div className="aspect-square bg-surface-container relative overflow-hidden">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Editorial photograph of an oversized heavyweight dark forest green hoodie with architectural high collar without drawstrings." src="/images/ascend/editorial-photograph-of-an-oversized-heavyweight.jpg" />
                            </div>
                            <div className="p-space-sm flex-1 flex flex-col justify-between">
                                <div>
                                    <h4 className="font-label-md text-label-md font-semibold text-on-surface line-clamp-1">Hoodie Boxy 'Vertex'</h4>
                                    <span className="font-body-sm text-body-sm text-on-surface-variant block">$210.000 COP</span>
                                </div>
                                <span className="font-label-caps text-[10px] text-secondary mt-space-xs block font-semibold">+ 280 compras</span>
                            </div>
                        </div>
                        {/* Item Trending 5 */}
                        <div className={`bg-surface-container-lowest rounded-xl overflow-hidden group shadow-xs flex-col ${visible('tops')}`} data-cat="tops">
                            <div className="aspect-square bg-surface-container relative overflow-hidden">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Editorial look of a tailored cropped t-shirt for women in deep terracotta burgundy tone with subtle architectural darting." src="/images/ascend/editorial-look-of-a-tailored-cropped.jpg" />
                            </div>
                            <div className="p-space-sm flex-1 flex flex-col justify-between">
                                <div>
                                    <h4 className="font-label-md text-label-md font-semibold text-on-surface line-clamp-1">Cropped Tee 'Prism'</h4>
                                    <span className="font-body-sm text-body-sm text-on-surface-variant block">$85.000 COP</span>
                                </div>
                                <span className="font-label-caps text-[10px] text-secondary mt-space-xs block font-semibold">+ 240 compras</span>
                            </div>
                        </div>
                        {/* Item Trending 6 */}
                        <div className={`bg-surface-container-lowest rounded-xl overflow-hidden group shadow-xs flex-col ${visible('hoodies')}`} data-cat="hoodies">
                            <div className="aspect-square bg-surface-container relative overflow-hidden">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Editorial product shot of an oversized knitted cardigan in chunky ribbed slate wool with matte metallic snap buttons." src="/images/ascend/editorial-product-shot-of-an-oversized.jpg" />
                            </div>
                            <div className="p-space-sm flex-1 flex flex-col justify-between">
                                <div>
                                    <h4 className="font-label-md text-label-md font-semibold text-on-surface line-clamp-1">Saco Cardigan 'Ribbed'</h4>
                                    <span className="font-body-sm text-body-sm text-on-surface-variant block">$245.000 COP</span>
                                </div>
                                <span className="font-label-caps text-[10px] text-secondary mt-space-xs block font-semibold">+ 190 compras</span>
                            </div>
                        </div>
                    </div>
                </section>
                {/* 6. Bloque de Asesoría y Omnicanalidad // CONCIERGE & ATELIER */}
                <section className="w-full py-space-2xl bg-surface-container">
                    <div className="w-full px-margin max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
                            <div className="lg:col-span-7 flex flex-col gap-space-md">
                                <div className="inline-flex items-center gap-space-xs bg-surface-container-highest px-space-sm py-space-xxs rounded-lg w-max text-on-surface">
                                    <span className="material-symbols-outlined text-primary-container text-[18px]">verified</span>
                                    <span className="font-label-caps text-label-caps uppercase tracking-wider font-semibold">ASESORÍA PERSONALIZADA EN VIVO</span>
                                </div>
                                <h2 className="font-headline-lg text-headline-lg md:text-3xl font-bold uppercase tracking-tight text-on-surface">
                                    ¿Dudas con tu silueta o talla exacta?
                                </h2>
                                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                    Nuestro equipo de estilistas de planta te atiende en tiempo real por WhatsApp. Te enviamos medidas exactas de la prenda en plano, fotos reales bajo luz natural y te guiamos para elegir entre corte holgado, boxy fit o entallado.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-xs">
                                    <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs">
                                        <div className="flex items-center gap-space-xs text-on-surface font-title-md text-title-md font-semibold">
                                            <span className="material-symbols-outlined text-primary-container">support_agent</span>
                                            <span>Atención WhatsApp</span>
                                        </div>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xxs">
                                            Lunes a Sábado: 9:00 AM – 7:00 PM
                                            <br />
                                            {' '}
                                            Respuesta promedio: &lt; 5 minutos
                                        </p>
                                    </div>
                                    <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs">
                                        <div className="flex items-center gap-space-xs text-on-surface font-title-md text-title-md font-semibold">
                                            <span className="material-symbols-outlined text-primary-container">store</span>
                                            <span>Flagship Atelier Físico</span>
                                        </div>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xxs">
                                            El Poblado, Cra 37 # 8A-42, Medellín.
                                            <br />
                                            {' '}
                                            Prueba en fitting room privado.
                                        </p>
                                    </div>
                                </div>
                                <div className="pt-space-sm flex flex-wrap gap-space-md">
                                    <a href="https://wa.me/573000000000" className="h-12 px-space-xl bg-[#065F46] hover:bg-[#044e39] text-white font-label-lg text-label-lg rounded-lg flex items-center gap-space-xs uppercase tracking-wider transition-colors shadow-xs" rel="noopener noreferrer" target="_blank">
                                        <span className="material-symbols-outlined text-[20px]">chat</span>
                                        <span>Hablar con un Concierge</span>
                                    </a>
                                    <a href="#" className="h-12 px-space-lg bg-surface-container-lowest hover:bg-surface-container-highest text-on-surface font-label-md text-label-md rounded-lg flex items-center gap-space-xs uppercase tracking-wider transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">straighten</span>
                                        <span>Consultar Tabla de Medidas</span>
                                    </a>
                                </div>
                            </div>
                            <div className="lg:col-span-5">
                                <div className="relative bg-surface-container-lowest p-space-lg rounded-2xl shadow-lg">
                                    <div className="flex items-center justify-between pb-space-sm">
                                        <div className="flex items-center gap-space-xs">
                                            <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                            <span className="font-label-caps text-label-caps tracking-wider uppercase text-on-surface font-bold">CONCIERGE EN LÍNEA</span>
                                        </div>
                                        <span className="font-label-caps text-[10px] text-secondary">MEDELLÍN HQ</span>
                                    </div>
                                    <div className="space-y-space-sm py-space-sm">
                                        <div className="bg-surface-container-low p-space-sm rounded-lg max-w-[85%]">
                                            <p className="font-body-sm text-body-sm text-on-surface">
                                                Hola, mido 1.78m y peso 74kg. ¿En la camiseta Archive 92 debo pedir M o L para que me quede boxy?
                                            </p>
                                            <span className="font-label-caps text-[9px] text-secondary block mt-1">11:42 AM</span>
                                        </div>
                                        <div className="bg-primary-container/10 p-space-sm rounded-lg max-w-[85%] ml-auto">
                                            <p className="font-body-sm text-body-sm text-on-surface">
                                                ¡Hola! Para esa contextura te recomendamos talla M si deseas un corte estructurado limpio, o L si prefieres caída streetwear pronunciada. ¿Te comparto fotos en percha?
                                            </p>
                                            <span className="font-label-caps text-[9px] text-primary-container block mt-1 text-right">11:43 AM // Juan (Atelier)</span>
                                        </div>
                                    </div>
                                    <div className="pt-space-sm flex items-center justify-between text-on-surface-variant font-label-caps text-[11px]">
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px] text-emerald-600">done_all</span>
                                            {' '}
                                            Asesoría humana certificada
                                        </span>
                                        <span className="font-semibold text-primary-container">GRATUITA</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* 7. Value Propositions Strip (Compra Segura & Experiencia) */}
                <section className="w-full py-space-xl px-margin max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-space-lg">
                        <div className="flex items-start gap-space-md">
                            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center shrink-0 text-primary-container">
                                <span className="material-symbols-outlined text-[24px]">local_shipping</span>
                            </div>
                            <div>
                                <h4 className="font-title-md text-title-md font-semibold text-on-surface">Envíos Rápidos</h4>
                                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Entregas 24-48h en principales ciudades de Colombia.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-space-md">
                            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center shrink-0 text-primary-container">
                                <span className="material-symbols-outlined text-[24px]">published_with_changes</span>
                            </div>
                            <div>
                                <h4 className="font-title-md text-title-md font-semibold text-on-surface">Cambios Sin Fricción</h4>
                                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">30 días continuos para cambio de talla o referencia sin costo.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-space-md">
                            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center shrink-0 text-primary-container">
                                <span className="material-symbols-outlined text-[24px]">lock</span>
                            </div>
                            <div>
                                <h4 className="font-title-md text-title-md font-semibold text-on-surface">Transacción Blindada</h4>
                                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">PSE, Tarjetas de Crédito, Nequi y Addi con cifrado bancario SSL.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-space-md">
                            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center shrink-0 text-primary-container">
                                <span className="material-symbols-outlined text-[24px]">architecture</span>
                            </div>
                            <div>
                                <h4 className="font-title-md text-title-md font-semibold text-on-surface">Corte Arquitectónico</h4>
                                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Confección milimétrica de bajo volumen y alta durabilidad.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
