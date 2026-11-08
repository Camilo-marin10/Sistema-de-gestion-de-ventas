import { useEffect, useRef, useState } from 'react';
import Toast, { useToast } from '../../components/ui/Toast';

const viewBtn = (active) =>
    `flex-1 py-1 px-2.5 rounded-sm font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all ${
        active ? 'bg-surface-container-lowest text-on-surface shadow-xs' : 'text-secondary hover:text-on-surface'
    }`;

export default function SellerCatalog() {
    const [view, setView] = useState('table');
    const [query, setQuery] = useState('');
    const tableRef = useRef(null);
    const [toast, notify, dismiss] = useToast();

    // Filtro instantáneo sobre las filas de la tabla (primer hijo = encabezado).
    useEffect(() => {
        const rows = tableRef.current ? Array.from(tableRef.current.children).slice(1) : [];
        const q = query.trim().toLowerCase();
        rows.forEach((row) => {
            row.style.display = !q || row.innerText.toLowerCase().includes(q) ? '' : 'none';
        });
    }, [query]);

    /** Copia una ficha comercial lista para enviar por WhatsApp. */
    const copyProductPitch = (sku, title, price) => {
        const text =
            `✨ *ASCEND ATELIER* | Ficha Comercial\n` +
            `🧥 *${title}*\n` +
            `🏷️ SKU: ${sku}\n` +
            `💎 Precio Oficial: ${price}\n` +
            `📍 Disponibilidad confirmada en Tienda Central.\n` +
            `¿Deseas reservarla o prefieres que gestionemos tu entrega a domicilio hoy mismo?`;
        navigator.clipboard?.writeText(text);
        notify('Ficha de Asesoría Copiada', `${sku} - ${title}`);
    };

    return (
        <>
            <div className="flex flex-col w-full">
                <div className="flex flex-col gap-6">
                    {/* Top Status Banner & Notice */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 rounded-xl bg-surface-container-low shadow-xs">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                                <span className="material-symbols-outlined text-[20px]">verified_user</span>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="font-label-caps text-label-caps uppercase text-secondary tracking-wider">Perfil Asesor Omnicanal</span>
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-semibold bg-surface-container-highest text-on-surface">
                                        Solo Lectura
                                    </span>
                                </div>
                                <span className="font-body-sm text-body-sm text-secondary">
                                    Modo Consulta: Los precios de lista, alta y bajas de referencias son controlados por Administración.
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-lowest shadow-xs text-secondary">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="font-label-md text-label-md text-on-surface font-medium">Sincronización Inventario Central: Real-Time</span>
                            </div>
                        </div>
                    </div>
                    {/* Editorial Header Section */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
                        <div className="flex flex-col gap-2 max-w-3xl">
                            <div className="flex items-center gap-2">
                                <span className="font-label-caps text-label-caps uppercase text-secondary">Inicio</span>
                                <span className="material-symbols-outlined text-secondary text-[12px]">chevron_right</span>
                                <span className="font-label-caps text-label-caps uppercase text-secondary">Productos</span>
                                <span className="material-symbols-outlined text-secondary text-[12px]">chevron_right</span>
                                <span className="font-label-caps text-label-caps uppercase text-primary font-bold">Catálogo para Ventas</span>
                            </div>
                            <h1 className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight">Consulta de Catálogo y Prendas</h1>
                            <p className="font-body-lg text-body-lg text-secondary">
                                Visualización de referencias activas, variantes por talla/color y disponibilidad de existencias para asesoría comercial y venta asistida.
                            </p>
                        </div>
                        {/* Quick Metrics Pill Strip */}
                        <div className="flex items-center gap-3 overflow-x-auto py-1">
                            <div className="px-4 py-3 rounded-xl bg-surface-container-lowest shadow-xs flex flex-col min-w-[130px]">
                                <span className="font-label-caps text-label-caps text-secondary uppercase">Referencias Activas</span>
                                <span className="font-headline-lg text-headline-lg font-bold text-on-surface mt-0.5">84</span>
                            </div>
                            <div className="px-4 py-3 rounded-xl bg-surface-container-lowest shadow-xs flex flex-col min-w-[130px]">
                                <span className="font-label-caps text-label-caps text-secondary uppercase">Stock Inmediato</span>
                                <span className="font-headline-lg text-headline-lg font-bold text-emerald-700 mt-0.5">72%</span>
                            </div>
                            <div className="px-4 py-3 rounded-xl bg-surface-container-lowest shadow-xs flex flex-col min-w-[130px]">
                                <span className="font-label-caps text-label-caps text-secondary uppercase">Alertas Críticas</span>
                                <span className="font-headline-lg text-headline-lg font-bold text-primary mt-0.5">6 SKU</span>
                            </div>
                        </div>
                    </div>
                    {/* Search & Multi-Filter Control Console */}
                    <div className="p-4 rounded-xl bg-surface-container-lowest shadow-xs flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                            {/* Main Search Input */}
                            <div className="md:col-span-4 relative flex items-center">
                                <span className="material-symbols-outlined absolute left-3.5 text-secondary text-[18px]">search</span>
                                <input className="w-full h-10 pl-10 pr-4 rounded-lg bg-surface-container-low text-on-surface placeholder:text-secondary font-body-sm text-body-sm outline-hidden focus:bg-surface-container focus:text-on-surface transition-all" id="catalogSearch" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nombre de prenda, SKU o tag de estilo..." type="text" />
                            </div>
                            {/* Filter: Línea */}
                            <div className="md:col-span-2 relative">
                                <select className="w-full h-10 px-3 pr-8 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-hidden cursor-pointer appearance-none">
                                    <option value="">Línea: Todas</option>
                                    <option value="hombre">Línea Hombre</option>
                                    <option value="mujer">Línea Mujer</option>
                                    <option value="unisex">Unisex / Agénero</option>
                                </select>
                                {' '}
                                <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-2.5 text-secondary text-[18px]">expand_more</span>
                            </div>
                            {/* Filter: Categoría */}
                            <div className="md:col-span-2 relative">
                                <select className="w-full h-10 px-3 pr-8 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-hidden cursor-pointer appearance-none">
                                    <option value="">Categoría: Todas</option>
                                    <option value="camisetas">Camisetas Oversize</option>
                                    <option value="bodys">Bodys Esculpidos</option>
                                    <option value="corsets">Corsets de Estructura</option>
                                    <option value="sacos">Sacos &amp; Hoodies</option>
                                    <option value="tenis">Tenis / Footwear</option>
                                </select>
                                {' '}
                                <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-2.5 text-secondary text-[18px]">expand_more</span>
                            </div>
                            {/* Filter: Disponibilidad */}
                            <div className="md:col-span-2 relative">
                                <select className="w-full h-10 px-3 pr-8 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-hidden cursor-pointer appearance-none">
                                    <option value="">Stock: Todos los estados</option>
                                    <option value="inmediato">Con Stock Inmediato</option>
                                    <option value="bajo">Stock Bajo (&lt; 3 uds)</option>
                                    <option value="agotado">Agotados / Espera</option>
                                </select>
                                {' '}
                                <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-2.5 text-secondary text-[18px]">expand_more</span>
                            </div>
                            {/* View Switcher */}
                            <div className="md:col-span-2 flex items-center justify-end gap-1.5 p-1 rounded-lg bg-surface-container-low">
                                <button className={viewBtn(view === 'grid')} id="viewGridBtn" type="button" onClick={() => setView('grid')}>
                                    <span className="material-symbols-outlined text-[16px]">grid_view</span>
                                    <span>Mosaico</span>
                                </button>
                                <button className={viewBtn(view === 'table')} id="viewTableBtn" type="button" onClick={() => setView('table')}>
                                    <span className="material-symbols-outlined text-[16px]">table_rows</span>
                                    <span>Tabla</span>
                                </button>
                            </div>
                        </div>
                        {/* Quick Filter Tags Bar */}
                        <div className="flex items-center gap-2 pt-1 overflow-x-auto text-nowrap">
                            <span className="font-label-caps text-label-caps uppercase text-secondary pr-1">Filtros Rápidos:</span>
                            <button className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors">
                                Best Sellers Lookbook
                            </button>
                            <button className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors">
                                Heavyweight Cotton (&gt;400 GSM)
                            </button>
                            <button className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors">
                                Edición Runway 2025
                            </button>
                            <button className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors">
                                Punto de Entrega Exprés
                            </button>
                            <button className="ml-auto text-primary font-label-md text-label-md hover:underline flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">refresh</span>
                                {' '}
                                Restablecer
                            </button>
                        </div>
                    </div>
                    {/* Product Catalog: TABLE VIEW (Default Active) */}
                    <div ref={tableRef} className={`flex-col rounded-xl bg-surface-container-lowest shadow-xs overflow-hidden ${view === 'table' ? 'flex' : 'hidden'}`} id="catalogTableView">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-3.5 bg-surface-container-low text-secondary font-label-caps text-label-caps uppercase tracking-wider">
                            <div className="col-span-5 lg:col-span-4">Prenda / Referencia</div>
                            <div className="col-span-2 hidden lg:block">Colección &amp; Línea</div>
                            <div className="col-span-4 lg:col-span-3">Matriz Tallas &amp; Disponibilidad</div>
                            <div className="col-span-3 lg:col-span-2 text-right">Precio Vigente</div>
                            <div className="col-span-1 text-right">Asesoría</div>
                        </div>
                        {/* Item 1: Boxy Heavyweight */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-surface-container-low/40 transition-colors items-center">
                            {/* Thumbnail & Product Info */}
                            <div className="col-span-5 lg:col-span-4 flex items-center gap-4 min-w-0">
                                <div className="w-16 h-20 rounded-lg overflow-hidden shrink-0 bg-surface-container relative">
                                    <img className="w-full h-full object-cover" data-alt="Editorial lookbook studio shot of a modern black streetwear boxy t-shirt heavyweight silhouette on a minimal stone gray pedestal, high fashion lighting, sharp architectural shadow, luxury aesthetic" src="/images/ascend/editorial-lookbook-studio-shot-of-a.jpg" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <span className="inline-flex items-center h-5 px-2 rounded-sm text-[11px] font-semibold bg-emerald-50 text-emerald-800">
                                            En Stock Inmediato
                                        </span>
                                        <span className="font-label-caps text-label-caps text-secondary">SKU: ASC-TS-092</span>
                                    </div>
                                    <h3 className="font-title-md text-title-md text-on-surface font-semibold truncate leading-tight">Camiseta Boxy Heavyweight 'Archive 92'</h3>
                                    <span className="font-body-sm text-body-sm text-secondary lg:hidden mt-0.5">Hombre · Camisetas oversize</span>
                                </div>
                            </div>
                            {/* Linea & Categoria */}
                            <div className="col-span-2 hidden lg:flex flex-col">
                                <span className="font-body-md text-body-md text-on-surface font-medium">Línea Hombre</span>
                                {' '}
                                <span className="font-body-sm text-body-sm text-secondary">Camisetas oversize (280 GSM)</span>
                            </div>
                            {/* Variantes & Stock Matriz */}
                            <div className="col-span-4 lg:col-span-3 flex flex-col gap-1.5">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-label-caps text-label-caps text-secondary w-14">Negro:</span>
                                    <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-medium bg-surface-container text-on-surface">S (4)</span>
                                    <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-bold bg-emerald-50 text-emerald-800">M (12)</span>
                                    <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-medium bg-surface-container text-on-surface">L (8)</span>
                                    <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-semibold bg-amber-50 text-amber-800">XL (2)</span>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-label-caps text-label-caps text-secondary w-14">Blanco:</span>
                                    <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-medium bg-surface-container text-on-surface">S (6)</span>
                                    <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-medium bg-surface-container text-on-surface">M (10)</span>
                                    <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-bold bg-primary-fixed text-primary">L (1)</span>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-label-caps text-label-caps text-secondary w-14">Carmín:</span>
                                    <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-medium bg-surface-container text-on-surface">M (3)</span>
                                    <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-semibold bg-surface-container-high text-secondary line-through">L (0)</span>
                                </div>
                            </div>
                            {/* Precio */}
                            <div className="col-span-3 lg:col-span-2 text-right flex flex-col justify-center">
                                <span className="font-headline-md text-headline-md font-bold text-on-surface">$125.000</span>
                                <span className="font-label-caps text-label-caps text-secondary">COP · IVA Incluido</span>
                            </div>
                            {/* Accion Venta Directa */}
                            <div className="col-span-1 flex items-center justify-end">
                                <button className="p-2.5 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-secondary transition-all" onClick={() => copyProductPitch('ASC-TS-092', 'Camiseta Boxy Heavyweight Archive 92', '$125.000 COP')} title="Copiar Ficha para Asesoría WhatsApp" type="button">
                                    <span className="material-symbols-outlined text-[20px]">content_copy</span>
                                </button>
                            </div>
                        </div>
                        {/* Item 2: Body Asimetrico Nexus */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-surface-container-low/40 transition-colors items-center bg-surface-container-low/10">
                            {/* Thumbnail & Product Info */}
                            <div className="col-span-5 lg:col-span-4 flex items-center gap-4 min-w-0">
                                <div className="w-16 h-20 rounded-lg overflow-hidden shrink-0 bg-surface-container relative">
                                    <img className="w-full h-full object-cover" data-alt="Avant-garde black sculptural asymmetrical bodysuit worn by a model in dynamic high fashion pose, architectural tailoring, monochrome studio setting with sharp directional spotlighting" src="/images/ascend/avant-garde-black-sculptural-asymmetrical-bodysuit.jpg" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <span className="inline-flex items-center h-5 px-2 rounded-sm text-[11px] font-semibold bg-primary-fixed text-primary">Top Seller</span>
                                        <span className="font-label-caps text-label-caps text-secondary">SKU: ASC-BD-104</span>
                                    </div>
                                    <h3 className="font-title-md text-title-md text-on-surface font-semibold truncate leading-tight">Body Asimétrico Esculpido 'Nexus'</h3>
                                    <span className="font-body-sm text-body-sm text-secondary lg:hidden mt-0.5">Mujer · Bodys</span>
                                </div>
                            </div>
                            {/* Linea & Categoria */}
                            <div className="col-span-2 hidden lg:flex flex-col">
                                <span className="font-body-md text-body-md text-on-surface font-medium">Línea Mujer</span>
                                {' '}
                                <span className="font-body-sm text-body-sm text-secondary">Bodys Esculturales</span>
                            </div>
                            {/* Variantes & Stock Matriz */}
                            <div className="col-span-4 lg:col-span-3 flex flex-col gap-1.5">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-label-caps text-label-caps text-secondary w-14">Negro:</span>
                                    <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-semibold bg-amber-50 text-amber-800">XS (2)</span>
                                    <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-medium bg-surface-container text-on-surface">S (5)</span>
                                    <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-medium bg-surface-container text-on-surface">M (4)</span>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-label-caps text-label-caps text-secondary w-14">Blanco:</span>
                                    <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-semibold bg-surface-container-high text-secondary line-through">XS (0)</span>
                                    <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-semibold bg-amber-50 text-amber-800">S (2)</span>
                                    <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-bold bg-primary-fixed text-primary">M (1)</span>
                                </div>
                            </div>
                            {/* Precio */}
                            <div className="col-span-3 lg:col-span-2 text-right flex flex-col justify-center">
                                <span className="font-headline-md text-headline-md font-bold text-on-surface">$160.000</span>
                                <span className="font-label-caps text-label-caps text-secondary">COP · Precio Oficial</span>
                            </div>
                            {/* Accion Venta Directa */}
                            <div className="col-span-1 flex items-center justify-end">
                                <button className="p-2.5 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-secondary transition-all" onClick={() => copyProductPitch('ASC-BD-104', 'Body Asimétrico Esculpido Nexus', '$160.000 COP')} title="Copiar Ficha para Asesoría WhatsApp" type="button">
                                    <span className="material-symbols-outlined text-[20px]">content_copy</span>
                                </button>
                            </div>
                        </div>
                        {/* Item 3: Corset Estructurado Sovereign */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-surface-container-low/40 transition-colors items-center">
                            {/* Thumbnail & Product Info */}
                            <div className="col-span-5 lg:col-span-4 flex items-center gap-4 min-w-0">
                                <div className="w-16 h-20 rounded-lg overflow-hidden shrink-0 bg-surface-container relative">
                                    <img className="w-full h-full object-cover" data-alt="Exquisite structured luxury corset in deep charcoal tone, couture boning details, studio fashion photography, high contrast lighting emphasizing garment silhouette and fabric texture" src="/images/ascend/exquisite-structured-luxury-corset-in-deep.jpg" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <span className="inline-flex items-center h-5 px-2 rounded-sm text-[11px] font-semibold bg-red-100 text-primary">Alerta Stock Crítico</span>
                                        <span className="font-label-caps text-label-caps text-secondary">SKU: ASC-CR-045</span>
                                    </div>
                                    <h3 className="font-title-md text-title-md text-on-surface font-semibold truncate leading-tight">Corset Estructurado 'Sovereign'</h3>
                                    <span className="font-body-sm text-body-sm text-secondary lg:hidden mt-0.5">Mujer · Corsets</span>
                                </div>
                            </div>
                            {/* Linea & Categoria */}
                            <div className="col-span-2 hidden lg:flex flex-col">
                                <span className="font-body-md text-body-md text-on-surface font-medium">Línea Mujer</span>
                                {' '}
                                <span className="font-body-sm text-body-sm text-secondary">Corsets &amp; Sastrería</span>
                            </div>
                            {/* Variantes & Stock Matriz */}
                            <div className="col-span-4 lg:col-span-3 flex flex-col gap-1.5">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-label-caps text-label-caps text-secondary w-14">Carbón:</span>
                                    <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-semibold bg-amber-50 text-amber-800">Talla S (2)</span>
                                    <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-semibold bg-surface-container-high text-secondary line-through">Talla M (0)</span>
                                </div>
                                <span className="font-label-caps text-label-caps text-primary">Reabastecimiento previsto: 4 días</span>
                            </div>
                            {/* Precio */}
                            <div className="col-span-3 lg:col-span-2 text-right flex flex-col justify-center">
                                <div className="flex items-baseline justify-end gap-1.5">
                                    <span className="font-headline-md text-headline-md font-bold text-primary">$189.000</span>
                                    <span className="font-body-sm text-body-sm text-secondary line-through">$210.000</span>
                                </div>
                                <span className="font-label-caps text-label-caps text-primary">Precio Promo Autorizado</span>
                            </div>
                            {/* Accion Venta Directa */}
                            <div className="col-span-1 flex items-center justify-end">
                                <button className="p-2.5 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-secondary transition-all" onClick={() => copyProductPitch('ASC-CR-045', 'Corset Estructurado Sovereign', '$189.000 COP')} title="Copiar Ficha para Asesoría WhatsApp" type="button">
                                    <span className="material-symbols-outlined text-[20px]">content_copy</span>
                                </button>
                            </div>
                        </div>
                        {/* Item 4: Hoodie Oversize Raw Edge */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-surface-container-low/40 transition-colors items-center bg-surface-container-low/10">
                            {/* Thumbnail & Product Info */}
                            <div className="col-span-5 lg:col-span-4 flex items-center gap-4 min-w-0">
                                <div className="w-16 h-20 rounded-lg overflow-hidden shrink-0 bg-surface-container relative">
                                    <img className="w-full h-full object-cover" data-alt="Heavyweight gray oversized streetwear hoodie 480 GSM fabric texture, dropped shoulders, raw cut edges, editorial street style lookbook photography on brutalist concrete backdrop" src="/images/ascend/heavyweight-gray-oversized-streetwear-hoodie-480.jpg" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <span className="inline-flex items-center h-5 px-2 rounded-sm text-[11px] font-semibold bg-emerald-50 text-emerald-800">Disponible</span>
                                        <span className="font-label-caps text-label-caps text-secondary">SKU: ASC-HD-012</span>
                                    </div>
                                    <h3 className="font-title-md text-title-md text-on-surface font-semibold truncate leading-tight">Hoodie Oversize 'Raw Edge' 480 GSM</h3>
                                    <span className="font-body-sm text-body-sm text-secondary lg:hidden mt-0.5">Hombre / Unisex · Sacos</span>
                                </div>
                            </div>
                            {/* Linea & Categoria */}
                            <div className="col-span-2 hidden lg:flex flex-col">
                                <span className="font-body-md text-body-md text-on-surface font-medium">Hombre / Unisex</span>
                                {' '}
                                <span className="font-body-sm text-body-sm text-secondary">Sacos Pesados &amp; Fleece</span>
                            </div>
                            {/* Variantes & Stock Matriz */}
                            <div className="col-span-4 lg:col-span-3 flex flex-col gap-1.5">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-label-caps text-label-caps text-secondary w-14">Gris Plomo:</span>
                                    <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-medium bg-surface-container text-on-surface">M (8)</span>
                                    <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-bold bg-emerald-50 text-emerald-800">L (14)</span>
                                    <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-medium bg-surface-container text-on-surface">XL (5)</span>
                                </div>
                                <span className="font-label-caps text-label-caps text-secondary">Algodón Francés 100% Peinado</span>
                            </div>
                            {/* Precio */}
                            <div className="col-span-3 lg:col-span-2 text-right flex flex-col justify-center">
                                <span className="font-headline-md text-headline-md font-bold text-on-surface">$240.000</span>
                                <span className="font-label-caps text-label-caps text-secondary">COP · Tarifa Lista</span>
                            </div>
                            {/* Accion Venta Directa */}
                            <div className="col-span-1 flex items-center justify-end">
                                <button className="p-2.5 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-secondary transition-all" onClick={() => copyProductPitch('ASC-HD-012', 'Hoodie Oversize Raw Edge 480 GSM', '$240.000 COP')} title="Copiar Ficha para Asesoría WhatsApp" type="button">
                                    <span className="material-symbols-outlined text-[20px]">content_copy</span>
                                </button>
                            </div>
                        </div>
                        {/* Item 5: Sneaker High-Vanguard Phantom */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-surface-container-low/40 transition-colors items-center">
                            {/* Thumbnail & Product Info */}
                            <div className="col-span-5 lg:col-span-4 flex items-center gap-4 min-w-0">
                                <div className="w-16 h-20 rounded-lg overflow-hidden shrink-0 bg-surface-container relative">
                                    <img className="w-full h-full object-cover" data-alt="Monochrome luxury designer sneaker floating in sleek studio lighting, architectural sole geometry, leather and mesh textures, minimalist editorial commercial product shot" src="/images/ascend/monochrome-luxury-designer-sneaker-floating-in.jpg" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <span className="inline-flex items-center h-5 px-2 rounded-sm text-[11px] font-semibold bg-surface-container text-on-surface">
                                            Calzado Activo
                                        </span>
                                        <span className="font-label-caps text-label-caps text-secondary">SKU: ASC-TN-880</span>
                                    </div>
                                    <h3 className="font-title-md text-title-md text-on-surface font-semibold truncate leading-tight">Sneaker High-Vanguard 'Phantom'</h3>
                                    <span className="font-body-sm text-body-sm text-secondary lg:hidden mt-0.5">Unisex · Tenis de Autor</span>
                                </div>
                            </div>
                            {/* Linea & Categoria */}
                            <div className="col-span-2 hidden lg:flex flex-col">
                                <span className="font-body-md text-body-md text-on-surface font-medium">Línea Unisex</span>
                                {' '}
                                <span className="font-body-sm text-body-sm text-secondary">Tenis &amp; Calzado Vanguardia</span>
                            </div>
                            {/* Variantes & Stock Matriz */}
                            <div className="col-span-4 lg:col-span-3 flex flex-col gap-1.5">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-medium bg-surface-container text-on-surface">T38 (3)</span>
                                    <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-medium bg-surface-container text-on-surface">T39 (5)</span>
                                    <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-semibold bg-amber-50 text-amber-800">T40 (2)</span>
                                    <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-bold bg-primary-fixed text-primary">T41 (1)</span>
                                    <span className="px-1.5 py-0.5 rounded-sm text-[11px] font-medium bg-surface-container text-on-surface">T42 (4)</span>
                                </div>
                                <span className="font-label-caps text-label-caps text-secondary">Horma exacta europea</span>
                            </div>
                            {/* Precio */}
                            <div className="col-span-3 lg:col-span-2 text-right flex flex-col justify-center">
                                <span className="font-headline-md text-headline-md font-bold text-on-surface">$380.000</span>
                                <span className="font-label-caps text-label-caps text-secondary">COP · Entrega Inmediata</span>
                            </div>
                            {/* Accion Venta Directa */}
                            <div className="col-span-1 flex items-center justify-end">
                                <button className="p-2.5 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-secondary transition-all" onClick={() => copyProductPitch('ASC-TN-880', 'Sneaker High-Vanguard Phantom', '$380.000 COP')} title="Copiar Ficha para Asesoría WhatsApp" type="button">
                                    <span className="material-symbols-outlined text-[20px]">content_copy</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Alternative Product Catalog: GRID VIEW (Hidden toggled) */}
                    <div className={`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${view === 'grid' ? 'grid' : 'hidden'}`} id="catalogGridView">
                        {/* Grid Card 1 */}
                        <div className="rounded-xl bg-surface-container-lowest shadow-xs overflow-hidden flex flex-col">
                            <div className="relative h-64 bg-surface-container overflow-hidden group">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Editorial lookbook studio shot of modern black streetwear boxy t-shirt heavyweight silhouette on minimal stone gray pedestal" src="/images/ascend/editorial-lookbook-studio-shot-of-modern.jpg" />
                                <div className="absolute top-3 left-3 flex flex-col gap-1">
                                    <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold bg-emerald-700 text-on-primary">En Stock</span>
                                    <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold bg-inverse-surface/80 text-surface-container-lowest backdrop-blur-sm">
                                        Hombre
                                    </span>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="font-label-caps text-label-caps text-secondary">ASC-TS-092 · Camisetas</span>
                                    <h4 className="font-title-md text-title-md text-on-surface font-semibold line-clamp-1">Camiseta Boxy Heavyweight</h4>
                                    <span className="font-headline-md text-headline-md font-bold text-on-surface mt-1">$125.000 COP</span>
                                </div>
                                <div className="flex flex-col gap-2 pt-2 bg-surface-container-low p-3 rounded-lg">
                                    <div className="flex justify-between items-center text-secondary font-label-caps text-label-caps">
                                        <span>Negro: S(4) M(12) L(8)</span>
                                        <span className="text-emerald-700 font-bold">Óptimo</span>
                                    </div>
                                    <div className="flex justify-between items-center text-secondary font-label-caps text-label-caps">
                                        <span>Blanco: S(6) M(10) L(1)</span>
                                        <span className="text-primary font-bold">Crítico</span>
                                    </div>
                                </div>
                                <button className="w-full h-10 rounded-lg bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 transition-colors" onClick={() => copyProductPitch('ASC-TS-092', 'Camiseta Boxy Heavyweight', '$125.000 COP')} type="button">
                                    <span className="material-symbols-outlined text-[18px]">share</span>
                                    <span>Copiar Ficha Asesoría</span>
                                </button>
                            </div>
                        </div>
                        {/* Grid Card 2 */}
                        <div className="rounded-xl bg-surface-container-lowest shadow-xs overflow-hidden flex flex-col">
                            <div className="relative h-64 bg-surface-container overflow-hidden group">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Avant-garde black sculptural asymmetrical bodysuit worn by a model in dynamic high fashion pose on monochrome backdrop" src="/images/ascend/avant-garde-black-sculptural-asymmetrical-bodysuit-2.jpg" />
                                <div className="absolute top-3 left-3 flex flex-col gap-1">
                                    <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold bg-primary text-on-primary">Top Seller</span>
                                    <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold bg-inverse-surface/80 text-surface-container-lowest backdrop-blur-sm">Mujer</span>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="font-label-caps text-label-caps text-secondary">ASC-BD-104 · Bodys</span>
                                    <h4 className="font-title-md text-title-md text-on-surface font-semibold line-clamp-1">Body Asimétrico 'Nexus'</h4>
                                    <span className="font-headline-md text-headline-md font-bold text-on-surface mt-1">$160.000 COP</span>
                                </div>
                                <div className="flex flex-col gap-2 pt-2 bg-surface-container-low p-3 rounded-lg">
                                    <div className="flex justify-between items-center text-secondary font-label-caps text-label-caps">
                                        <span>Negro: XS(2) S(5) M(4)</span>
                                        <span className="text-amber-800 font-bold">Bajo</span>
                                    </div>
                                    <div className="flex justify-between items-center text-secondary font-label-caps text-label-caps">
                                        <span>Blanco: XS(0) S(2) M(1)</span>
                                        <span className="text-primary font-bold">Limitado</span>
                                    </div>
                                </div>
                                <button className="w-full h-10 rounded-lg bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 transition-colors" onClick={() => copyProductPitch('ASC-BD-104', 'Body Asimétrico Nexus', '$160.000 COP')} type="button">
                                    <span className="material-symbols-outlined text-[18px]">share</span>
                                    <span>Copiar Ficha Asesoría</span>
                                </button>
                            </div>
                        </div>
                        {/* Grid Card 3 */}
                        <div className="rounded-xl bg-surface-container-lowest shadow-xs overflow-hidden flex flex-col">
                            <div className="relative h-64 bg-surface-container overflow-hidden group">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Luxury structured corset in deep charcoal tone, couture boning details, studio fashion photography" src="/images/ascend/luxury-structured-corset-in-deep-charcoal.jpg" />
                                <div className="absolute top-3 left-3 flex flex-col gap-1">
                                    <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold bg-primary text-on-primary">Stock Crítico</span>
                                    <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold bg-inverse-surface/80 text-surface-container-lowest backdrop-blur-sm">Mujer</span>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="font-label-caps text-label-caps text-secondary">ASC-CR-045 · Corsets</span>
                                    <h4 className="font-title-md text-title-md text-on-surface font-semibold line-clamp-1">Corset 'Sovereign'</h4>
                                    <div className="flex items-baseline gap-2 mt-1">
                                        <span className="font-headline-md text-headline-md font-bold text-primary">$189.000</span>
                                        <span className="font-body-sm text-body-sm text-secondary line-through">$210.000</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 pt-2 bg-surface-container-low p-3 rounded-lg">
                                    <div className="flex justify-between items-center text-secondary font-label-caps text-label-caps">
                                        <span>Carbón: S(2) M(0)</span>
                                        <span className="text-primary font-bold">2 Uds Restantes</span>
                                    </div>
                                </div>
                                <button className="w-full h-10 rounded-lg bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 transition-colors" onClick={() => copyProductPitch('ASC-CR-045', 'Corset Estructurado Sovereign', '$189.000 COP')} type="button">
                                    <span className="material-symbols-outlined text-[18px]">share</span>
                                    <span>Copiar Ficha Asesoría</span>
                                </button>
                            </div>
                        </div>
                        {/* Grid Card 4 */}
                        <div className="rounded-xl bg-surface-container-lowest shadow-xs overflow-hidden flex flex-col">
                            <div className="relative h-64 bg-surface-container overflow-hidden group">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Heavyweight gray oversized streetwear hoodie 480 GSM fabric texture, raw cut edges, editorial street style lookbook" src="/images/ascend/heavyweight-gray-oversized-streetwear-hoodie-480-2.jpg" />
                                <div className="absolute top-3 left-3 flex flex-col gap-1">
                                    <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold bg-emerald-700 text-on-primary">En Stock</span>
                                    <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold bg-inverse-surface/80 text-surface-container-lowest backdrop-blur-sm">
                                        Unisex
                                    </span>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="font-label-caps text-label-caps text-secondary">ASC-HD-012 · Sacos</span>
                                    <h4 className="font-title-md text-title-md text-on-surface font-semibold line-clamp-1">Hoodie Oversize 'Raw Edge'</h4>
                                    <span className="font-headline-md text-headline-md font-bold text-on-surface mt-1">$240.000 COP</span>
                                </div>
                                <div className="flex flex-col gap-2 pt-2 bg-surface-container-low p-3 rounded-lg">
                                    <div className="flex justify-between items-center text-secondary font-label-caps text-label-caps">
                                        <span>Gris: M(8) L(14) XL(5)</span>
                                        <span className="text-emerald-700 font-bold">27 Uds Totales</span>
                                    </div>
                                </div>
                                <button className="w-full h-10 rounded-lg bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 transition-colors" onClick={() => copyProductPitch('ASC-HD-012', 'Hoodie Oversize Raw Edge 480 GSM', '$240.000 COP')} type="button">
                                    <span className="material-symbols-outlined text-[18px]">share</span>
                                    <span>Copiar Ficha Asesoría</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Concierge Assistant Drawer / Operational Quick Card */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                        <div className="p-6 rounded-xl bg-surface-container-lowest shadow-xs flex flex-col justify-between">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-primary font-label-caps text-label-caps uppercase font-bold">
                                    <span className="material-symbols-outlined text-[18px]">chat</span>
                                    <span>Plantillas WhatsApp Concierge</span>
                                </div>
                                <h4 className="font-title-md text-title-md font-bold text-on-surface">Asistencia Digital con 1-Click</h4>
                                <p className="font-body-sm text-body-sm text-secondary">
                                    Al presionar "Copiar Ficha", el sistema formatea automáticamente el texto con descripción técnica, precio vigente y tallas disponibles para enviar al cliente por chat o canal privado.
                                </p>
                            </div>
                            <div className="mt-4 pt-3 flex items-center justify-between text-secondary font-label-md text-label-md">
                                <span>Formato homologado ASCEND 2025</span>
                                <span className="font-semibold text-primary">Listo para usar</span>
                            </div>
                        </div>
                        <div className="p-6 rounded-xl bg-surface-container-lowest shadow-xs flex flex-col justify-between">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-secondary font-label-caps text-label-caps uppercase font-bold">
                                    <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                                    <span>Política de Despacho &amp; Tiempos</span>
                                </div>
                                <h4 className="font-title-md text-title-md font-bold text-on-surface">Bodega Central Bogotá</h4>
                                <p className="font-body-sm text-body-sm text-secondary">
                                    Mismo día para pedidos radicados antes de las 14:00 hrs. Envíos nacionales: 24 a 48 horas hábiles vía coordinadora de lujo o mensajería propia.
                                </p>
                            </div>
                            <div className="mt-4 pt-3 flex items-center justify-between text-secondary font-label-md text-label-md">
                                <span>Corte de bodega hoy: 14:00</span>
                                <span className="text-emerald-700 font-bold">Operación Activa</span>
                            </div>
                        </div>
                        <div className="p-6 rounded-xl bg-surface-container-lowest shadow-xs flex flex-col justify-between">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-secondary font-label-caps text-label-caps uppercase font-bold">
                                    <span className="material-symbols-outlined text-[18px]">help_center</span>
                                    <span>Soporte a Ventas &amp; Tallas Especiales</span>
                                </div>
                                <h4 className="font-title-md text-title-md font-bold text-on-surface">¿Dudas de Horma o Custom?</h4>
                                <p className="font-body-sm text-body-sm text-secondary">
                                    Si un cliente solicita ajuste de largo o reserva de pieza bajo stock cero, solicita autorización inmediata al Supervisor de Piso vía intercomunicador interno.
                                </p>
                            </div>
                            <div className="mt-4 pt-3 flex items-center justify-between text-secondary font-label-md text-label-md">
                                <span>Supervisor Activo: M. Valderrama</span>
                                <span className="font-semibold text-on-surface">Canal #04</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toast toast={toast} onClose={dismiss} />
        </>
    );
}
