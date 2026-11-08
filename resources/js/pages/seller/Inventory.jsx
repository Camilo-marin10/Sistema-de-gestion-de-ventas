import { useEffect, useRef, useState } from 'react';

const INITIAL_FILTERS = { query: '', line: 'ALL', category: 'ALL', stock: 'ALL', size: 'ALL' };
const SIZES = [
    ['ALL', 'Todo'],
    ['XS', 'XS'],
    ['S', 'S'],
    ['M', 'M'],
    ['L', 'L'],
    ['40', '40'],
];

export default function SellerInventory() {
    const [filters, setFilters] = useState(INITIAL_FILTERS);
    const [visibleCount, setVisibleCount] = useState(6);
    const tbodyRef = useRef(null);

    const setFilter = (key) => (e) => setFilters((f) => ({ ...f, [key]: e.target ? e.target.value : e }));
    const resetFilters = () => setFilters(INITIAL_FILTERS);

    // Filtra las filas de inventario según búsqueda, línea, categoría, estado de stock y talla.
    useEffect(() => {
        const rows = tbodyRef.current ? Array.from(tbodyRef.current.querySelectorAll('.inventory-row')) : [];
        const q = filters.query.trim().toLowerCase();
        let count = 0;
        rows.forEach((row) => {
            const d = row.dataset;
            const match =
                (!q || (d.sku || '').toLowerCase().includes(q) || (d.name || '').toLowerCase().includes(q)) &&
                (filters.line === 'ALL' || d.line === filters.line) &&
                (filters.category === 'ALL' || d.category === filters.category) &&
                (filters.stock === 'ALL' || d.status === filters.stock) &&
                (filters.size === 'ALL' || d.size === filters.size);
            row.classList.toggle('hidden', !match);
            if (match) count += 1;
        });
        setVisibleCount(count);
    }, [filters]);

    return (
        <>
            <div className="flex flex-col w-full">
                {/* Editorial Top Content Zone */}
                <div className="flex flex-col gap-8">
                    {/* Header Block & Seller Notice */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="font-label-caps text-label-caps tracking-widest text-secondary uppercase">Inicio</span>
                                <span className="text-secondary text-xs">•</span>
                                <span className="font-label-caps text-label-caps tracking-widest text-secondary uppercase">Inventario</span>
                                <span className="text-secondary text-xs">•</span>
                                <span className="font-label-caps text-label-caps tracking-widest text-primary font-bold uppercase">Consulta de Existencias</span>
                            </div>
                            <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight">Consulta de Inventario y Stock en Bodega</h1>
                            <p className="font-body-md text-body-md text-secondary max-w-2xl">
                                Comprobación de unidades físicas disponibles por producto, talla y color antes de comprometer ventas en piso o canales remotos.
                            </p>
                        </div>
                        {/* Seller Access Scope Pill */}
                        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-surface-container-low shadow-xs">
                            <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-secondary text-[18px]">verified_user</span>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1.5">
                                    <span className="font-label-caps text-label-caps text-on-surface uppercase font-bold">Perfil Vendedor: Solo Lectura</span>
                                    <span className="px-1.5 py-0.5 rounded-sm text-[10px] font-semibold bg-surface-container-high text-secondary">Estricto</span>
                                </div>
                                <span className="font-body-sm text-body-sm text-secondary">Ajustes y traslados requieren autorización del Administrador.</span>
                            </div>
                        </div>
                    </div>
                    {/* Bento Metric Cards (4 Columns) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Metric 1: Stock Óptimo */}
                        <div className="p-5 rounded-lg bg-surface-container-lowest shadow-xs flex flex-col justify-between transition-all hover:shadow-md relative overflow-hidden">
                            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-surface-container-low pointer-events-none" />
                            <div className="flex items-center justify-between z-10">
                                <span className="font-label-caps text-label-caps uppercase text-secondary">Stock Óptimo</span>
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold text-emerald-800 bg-emerald-50">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                    {' '}
                                    Disipación 86%
                                </span>
                            </div>
                            <div className="flex items-baseline gap-2 pt-4 pb-1 z-10">
                                <span className="font-display-lg text-display-lg text-on-surface">128</span>
                                <span className="font-title-md text-title-md text-secondary">SKUs</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-emerald-700 font-label-md text-label-md z-10">
                                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                <span>Disponibilidad inmediata para facturación</span>
                            </div>
                        </div>
                        {/* Metric 2: Stock Bajo */}
                        <div className="p-5 rounded-lg bg-surface-container-lowest shadow-xs flex flex-col justify-between transition-all hover:shadow-md relative overflow-hidden">
                            <div className="flex items-center justify-between z-10">
                                <span className="font-label-caps text-label-caps uppercase text-secondary">Stock Crítico / Bajo</span>
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold text-amber-800 bg-amber-50">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                    {' '}
                                    &lt; 3 Uds
                                </span>
                            </div>
                            <div className="flex items-baseline gap-2 pt-4 pb-1 z-10">
                                <span className="font-display-lg text-display-lg text-on-surface">14</span>
                                <span className="font-title-md text-title-md text-secondary">SKUs</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-amber-700 font-label-md text-label-md z-10">
                                <span className="material-symbols-outlined text-[16px]">warning</span>
                                <span>Confirmar percha física al cliente</span>
                            </div>
                        </div>
                        {/* Metric 3: Agotadas */}
                        <div className="p-5 rounded-lg bg-surface-container-lowest shadow-xs flex flex-col justify-between transition-all hover:shadow-md relative overflow-hidden">
                            <div className="flex items-center justify-between z-10">
                                <span className="font-label-caps text-label-caps uppercase text-secondary">Agotadas (Stock 0)</span>
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold text-primary bg-primary-fixed">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    {' '}
                                    Bloqueado
                                </span>
                            </div>
                            <div className="flex items-baseline gap-2 pt-4 pb-1 z-10">
                                <span className="font-display-lg text-display-lg text-primary">06</span>
                                <span className="font-title-md text-title-md text-secondary">SKUs</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-primary font-label-md text-label-md z-10">
                                <span className="material-symbols-outlined text-[16px]">block</span>
                                <span>Venta pausada • No comprometer</span>
                            </div>
                        </div>
                        {/* Metric 4: Ubicación Central */}
                        <div className="p-5 rounded-lg bg-inverse-surface text-on-primary shadow-xs flex flex-col justify-between transition-all hover:shadow-md relative overflow-hidden">
                            <div className="flex items-center justify-between">
                                <span className="font-label-caps text-label-caps uppercase text-secondary-fixed-dim">Sede Predeterminada</span>
                                <span className="material-symbols-outlined text-primary-fixed-dim text-[18px]">location_on</span>
                            </div>
                            <div className="pt-3 pb-1">
                                <span className="font-title-md text-title-md text-surface-container-lowest block leading-tight font-bold">Almacén Central</span>
                                {' '}
                                <span className="font-body-sm text-body-sm text-secondary-fixed-dim block mt-0.5">Medellín • El Poblado</span>
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <span className="font-label-md text-label-md text-primary-fixed">148 SKUs vinculados</span>
                                <span className="font-label-caps text-[10px] uppercase text-surface-container-highest tracking-wide">Sync Live</span>
                            </div>
                        </div>
                    </div>
                    {/* Search & Filters Console */}
                    <div className="p-4 rounded-lg bg-surface-container-lowest shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
                        {/* Search Input */}
                        <div className="relative flex-1">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px]">barcode_scanner</span>
                            {' '}
                            <input className="w-full h-10 pl-10 pr-4 rounded-lg bg-surface-container-low text-on-surface placeholder:text-secondary font-body-sm text-body-sm outline-hidden focus:bg-surface-container transition-colors" id="inventorySearchInput" value={filters.query} onChange={setFilter('query')} placeholder="Buscar por código de barras, SKU o nombre de prenda..." type="text" />
                        </div>
                        {/* Filter Dropdowns & Quick Selects */}
                        <div className="flex flex-wrap items-center gap-2.5">
                            {/* Filter Línea */}
                            <div className="relative">
                                <select className="h-10 pl-3 pr-8 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface font-medium outline-hidden cursor-pointer appearance-none hover:bg-surface-container transition-colors" id="lineFilter" value={filters.line} onChange={setFilter('line')}>
                                    <option value="ALL">Línea: Todas</option>
                                    <option value="Hombre">Hombre</option>
                                    <option value="Mujer">Mujer</option>
                                    <option value="Unisex">Unisex</option>
                                </select>
                                {' '}
                                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary pointer-events-none text-[16px]">
                                    expand_more
                                </span>
                            </div>
                            {/* Filter Categoría */}
                            <div className="relative">
                                <select className="h-10 pl-3 pr-8 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface font-medium outline-hidden cursor-pointer appearance-none hover:bg-surface-container transition-colors" id="categoryFilter" value={filters.category} onChange={setFilter('category')}>
                                    <option value="ALL">Categoría: Todas</option>
                                    <option value="Camisetas">Camisetas</option>
                                    <option value="Corsets">Corsets</option>
                                    <option value="Bodys">Bodys</option>
                                    <option value="Tenis">Tenis</option>
                                    <option value="Sacos">Sacos / Hoodies</option>
                                </select>
                                {' '}
                                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary pointer-events-none text-[16px]">
                                    expand_more
                                </span>
                            </div>
                            {/* Filter Stock Level */}
                            <div className="relative">
                                <select className="h-10 pl-3 pr-8 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface font-medium outline-hidden cursor-pointer appearance-none hover:bg-surface-container transition-colors" id="stockFilter" value={filters.stock} onChange={setFilter('stock')}>
                                    <option value="ALL">Estado: Todos</option>
                                    <option value="OPTIMO">Óptimo (&gt; 5 uds)</option>
                                    <option value="BAJO">Bajo (1-4 uds)</option>
                                    <option value="AGOTADO">Agotado (0 uds)</option>
                                </select>
                                {' '}
                                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary pointer-events-none text-[16px]">
                                    expand_more
                                </span>
                            </div>
                            {/* Size Filter Chips */}
                            <div className="flex items-center gap-1 pl-2">
                                {SIZES.map(([value, label]) => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => setFilters((f) => ({ ...f, size: value }))}
                                        className={`h-9 px-2.5 rounded-sm text-xs font-semibold transition-colors ${
                                            filters.size === value ? 'bg-inverse-surface text-on-primary' : 'bg-surface-container-low text-secondary hover:text-on-surface'
                                        }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Inventory Granular Table Container */}
                    <div className="rounded-lg bg-surface-container-lowest shadow-xs overflow-hidden flex flex-col">
                        {/* Table Header & Counter bar */}
                        <div className="px-6 py-4 bg-surface-container-low flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="font-title-md text-title-md text-on-surface font-semibold">SKUs Disponibles</span>
                                <span className="px-2 py-0.5 rounded-sm text-[11px] font-bold bg-secondary-container text-on-secondary-container" id="resultsCounter">
                                    {visibleCount} variante{visibleCount === 1 ? '' : 's'} mostrada{visibleCount === 1 ? '' : 's'}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-body-sm text-body-sm text-secondary">
                                    Última sincronización con depósito:
                                    {' '}
                                    <strong className="text-on-surface font-medium">Hace 2 mins</strong>
                                </span>
                                <button className="p-1.5 rounded-sm hover:bg-surface-container transition-colors text-secondary hover:text-on-surface" onClick={resetFilters} title="Refrescar catálogo" type="button">
                                    <span className="material-symbols-outlined text-[18px]">refresh</span>
                                </button>
                            </div>
                        </div>
                        {/* Real Data Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left" id="inventoryTable">
                                <thead>
                                    <tr className="bg-surface-container-low/50">
                                        <th className="py-3 px-6 font-label-caps text-label-caps text-secondary uppercase font-bold" scope="col">Producto</th>
                                        <th className="py-3 px-4 font-label-caps text-label-caps text-secondary uppercase font-bold" scope="col">SKU Variante</th>
                                        <th className="py-3 px-4 font-label-caps text-label-caps text-secondary uppercase font-bold" scope="col">Línea / Cat.</th>
                                        <th className="py-3 px-4 font-label-caps text-label-caps text-secondary uppercase font-bold" scope="col">Atributos</th>
                                        <th className="py-3 px-4 font-label-caps text-label-caps text-secondary uppercase font-bold" scope="col">Ubicación Bodega</th>
                                        <th className="py-3 px-4 font-label-caps text-label-caps text-secondary uppercase font-bold text-right" scope="col">Físico Disponible</th>
                                        <th className="py-3 px-4 font-label-caps text-label-caps text-secondary uppercase font-bold" scope="col">Estado</th>
                                        <th className="py-3 px-6 font-label-caps text-label-caps text-secondary uppercase font-bold" scope="col">Guía para Asesor</th>
                                    </tr>
                                </thead>
                                <tbody ref={tbodyRef} className="divide-y-0" id="tableBody">
                                    {/* Row 1: Camiseta M (Stock Bajo) */}
                                    <tr className="inventory-row hover:bg-surface-container-low/70 transition-colors" data-category="Camisetas" data-line="Hombre" data-name="Camiseta Oversize Urban Rise" data-size="M" data-sku="CAM-OV-BLK-M" data-status="BAJO">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-14 rounded-sm overflow-hidden bg-surface-container shrink-0">
                                                    <img className="w-full h-full object-cover" data-alt="Editorial lookbook photograph of a black streetwear oversize heavy cotton t-shirt worn in a modern brutalist concrete architectural setting with sharp directional natural lighting." src="/images/ascend/editorial-lookbook-photograph-of-a-black.jpg" />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-title-md text-title-md text-on-surface font-semibold truncate">Camiseta Oversize 'Urban Rise'</span>
                                                    <span className="font-body-sm text-body-sm text-secondary">Ref: UR-2024-BLK</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 font-mono font-label-md text-label-md text-on-surface font-semibold">CAM-OV-BLK-M</td>
                                        <td className="py-4 px-4">
                                            <div className="flex flex-col">
                                                <span className="font-body-md text-body-md text-on-surface font-medium">Hombre</span>
                                                <span className="font-body-sm text-body-sm text-secondary">Camisetas</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                <span className="w-3 h-3 rounded-full bg-black shadow-inner" />
                                                <span className="font-body-md text-body-md text-on-surface">
                                                    Negro /
                                                    {' '}
                                                    <strong>Talla M</strong>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-1.5 text-secondary">
                                                <span className="material-symbols-outlined text-[16px] text-secondary">warehouse</span>
                                                <span className="font-body-md text-body-md text-on-surface">
                                                    Almacén Central
                                                    {' '}
                                                    <span className="text-secondary text-xs font-mono ml-1 px-1.5 py-0.5 rounded-sm bg-surface-container">A4</span>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <span className="font-title-md text-title-md font-bold text-amber-700">3 uds</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs font-semibold text-amber-800 bg-amber-50">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                                {' '}
                                                Stock Bajo
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-900 bg-amber-100/60 px-2.5 py-1 rounded-sm">
                                                <span className="material-symbols-outlined text-[14px]">notification_important</span>
                                                {' '}
                                                Informar pocas unidades
                                            </span>
                                        </td>
                                    </tr>
                                    {/* Row 2: Camiseta L (Óptimo) */}
                                    <tr className="inventory-row bg-surface-container-lowest hover:bg-surface-container-low/70 transition-colors" data-category="Camisetas" data-line="Hombre" data-name="Camiseta Oversize Urban Rise" data-size="L" data-sku="CAM-OV-BLK-L" data-status="OPTIMO">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-14 rounded-sm overflow-hidden bg-surface-container shrink-0">
                                                    <img className="w-full h-full object-cover" data-alt="Minimalist product fashion photo showing the back silhouette of a premium heavy cotton oversized t-shirt in coal black, displayed in a high-end luxury boutique showroom." src="/images/ascend/minimalist-product-fashion-photo-showing-the.jpg" />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-title-md text-title-md text-on-surface font-semibold truncate">Camiseta Oversize 'Urban Rise'</span>
                                                    <span className="font-body-sm text-body-sm text-secondary">Ref: UR-2024-BLK</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 font-mono font-label-md text-label-md text-on-surface font-semibold">CAM-OV-BLK-L</td>
                                        <td className="py-4 px-4">
                                            <div className="flex flex-col">
                                                <span className="font-body-md text-body-md text-on-surface font-medium">Hombre</span>
                                                <span className="font-body-sm text-body-sm text-secondary">Camisetas</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                <span className="w-3 h-3 rounded-full bg-black shadow-inner" />
                                                <span className="font-body-md text-body-md text-on-surface">
                                                    Negro /
                                                    {' '}
                                                    <strong>Talla L</strong>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-1.5 text-secondary">
                                                <span className="material-symbols-outlined text-[16px] text-secondary">warehouse</span>
                                                <span className="font-body-md text-body-md text-on-surface">
                                                    Almacén Central
                                                    {' '}
                                                    <span className="text-secondary text-xs font-mono ml-1 px-1.5 py-0.5 rounded-sm bg-surface-container">A4</span>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <span className="font-title-md text-title-md font-bold text-emerald-700">18 uds</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs font-semibold text-emerald-800 bg-emerald-50">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                                {' '}
                                                Óptimo
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-900 bg-emerald-100/60 px-2.5 py-1 rounded-sm">
                                                <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                                                {' '}
                                                Listo para despacho
                                            </span>
                                        </td>
                                    </tr>
                                    {/* Row 3: Corset Siren (Stock Bajo) */}
                                    <tr className="inventory-row bg-surface-container-lowest hover:bg-surface-container-low/70 transition-colors" data-category="Corsets" data-line="Mujer" data-name="Corset Estructurado Siren" data-size="S" data-sku="COR-RED-S" data-status="BAJO">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-14 rounded-sm overflow-hidden bg-surface-container shrink-0">
                                                    <img className="w-full h-full object-cover" data-alt="Editorial studio photo of a luxurious structured crimson red corset with boning and satin finish, high fashion editorial lighting with sharp crimson red reflections on matte gray backdrop." src="/images/ascend/editorial-studio-photo-of-a-luxurious.jpg" />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-title-md text-title-md text-on-surface font-semibold truncate">Corset Estructurado 'Siren'</span>
                                                    <span className="font-body-sm text-body-sm text-secondary">Ref: SR-2024-RED</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 font-mono font-label-md text-label-md text-on-surface font-semibold">COR-RED-S</td>
                                        <td className="py-4 px-4">
                                            <div className="flex flex-col">
                                                <span className="font-body-md text-body-md text-on-surface font-medium">Mujer</span>
                                                <span className="font-body-sm text-body-sm text-secondary">Corsets</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                <span className="w-3 h-3 rounded-full bg-primary-container shadow-inner" />
                                                <span className="font-body-md text-body-md text-on-surface">
                                                    Rojo Carmín /
                                                    {' '}
                                                    <strong>Talla S</strong>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-1.5 text-secondary">
                                                <span className="material-symbols-outlined text-[16px] text-secondary">checkroom</span>
                                                <span className="font-body-md text-body-md text-on-surface">
                                                    Almacén Central
                                                    {' '}
                                                    <span className="text-secondary text-xs font-mono ml-1 px-1.5 py-0.5 rounded-sm bg-surface-container">Colgadores B2</span>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <span className="font-title-md text-title-md font-bold text-amber-700">2 uds</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs font-semibold text-amber-800 bg-amber-50">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                                {' '}
                                                Stock Bajo
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-900 bg-amber-100/60 px-2.5 py-1 rounded-sm">
                                                <span className="material-symbols-outlined text-[14px]">priority_high</span>
                                                {' '}
                                                Últimas 2 unidades
                                            </span>
                                        </td>
                                    </tr>
                                    {/* Row 4: Body Contour Mesh (Agotado) */}
                                    <tr className="inventory-row bg-surface-container-lowest hover:bg-surface-container-low/70 transition-colors opacity-85" data-category="Bodys" data-line="Mujer" data-name="Body Contour Mesh" data-size="XS" data-sku="BOD-WHT-XS" data-status="AGOTADO">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-14 rounded-sm overflow-hidden bg-surface-container shrink-0 relative">
                                                    <img className="w-full h-full object-cover grayscale" data-alt="Catalog high fashion photograph of a pure optical white sheer contour mesh bodysuit draped elegantly on a sculptural minimalist mannequin against clean warm gray studio wall." src="/images/ascend/catalog-high-fashion-photograph-of-a.jpg" />
                                                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-on-primary text-[14px]">lock</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-title-md text-title-md text-on-surface font-semibold truncate">Body 'Contour Mesh'</span>
                                                    <span className="font-body-sm text-body-sm text-secondary">Ref: CM-2024-WHT</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 font-mono font-label-md text-label-md text-secondary font-semibold">BOD-WHT-XS</td>
                                        <td className="py-4 px-4">
                                            <div className="flex flex-col">
                                                <span className="font-body-md text-body-md text-on-surface font-medium">Mujer</span>
                                                <span className="font-body-sm text-body-sm text-secondary">Bodys</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                <span className="w-3 h-3 rounded-full bg-white shadow-inner" />
                                                <span className="font-body-md text-body-md text-secondary">
                                                    Blanco Puro /
                                                    {' '}
                                                    <strong>Talla XS</strong>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-1.5 text-secondary">
                                                <span className="material-symbols-outlined text-[16px] text-secondary">warehouse</span>
                                                <span className="font-body-md text-body-md text-secondary">
                                                    Almacén Central
                                                    {' '}
                                                    <span className="text-secondary text-xs font-mono ml-1 px-1.5 py-0.5 rounded-sm bg-surface-container">C1</span>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <span className="font-title-md text-title-md font-bold text-primary">0 uds</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs font-semibold text-primary bg-primary-fixed">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                {' '}
                                                Agotado
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary-container/10 px-2.5 py-1 rounded-sm">
                                                <span className="material-symbols-outlined text-[14px]">do_not_disturb</span>
                                                {' '}
                                                No disponible para venta
                                            </span>
                                        </td>
                                    </tr>
                                    {/* Row 5: Tenis Track (Óptimo) */}
                                    <tr className="inventory-row bg-surface-container-lowest hover:bg-surface-container-low/70 transition-colors" data-category="Tenis" data-line="Unisex" data-name="Tenis Ascend Track" data-size="40" data-sku="TEN-WHT-40" data-status="OPTIMO">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-14 rounded-sm overflow-hidden bg-surface-container shrink-0">
                                                    <img className="w-full h-full object-cover" data-alt="Editorial look of luxury designer chunky optical white leather sneakers with subtle crimson piping, resting on an architectural plinth in natural sunlight." src="/images/ascend/editorial-look-of-luxury-designer-chunky.jpg" />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-title-md text-title-md text-on-surface font-semibold truncate">Tenis 'Ascend Track'</span>
                                                    <span className="font-body-sm text-body-sm text-secondary">Ref: AT-2024-WHT</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 font-mono font-label-md text-label-md text-on-surface font-semibold">TEN-WHT-40</td>
                                        <td className="py-4 px-4">
                                            <div className="flex flex-col">
                                                <span className="font-body-md text-body-md text-on-surface font-medium">Unisex</span>
                                                <span className="font-body-sm text-body-sm text-secondary">Tenis / Calzado</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                <span className="w-3 h-3 rounded-full bg-white shadow-inner" />
                                                <span className="font-body-md text-body-md text-on-surface">
                                                    Blanco Óptico /
                                                    {' '}
                                                    <strong>Talla 40</strong>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-1.5 text-secondary">
                                                <span className="material-symbols-outlined text-[16px] text-secondary">inventory</span>
                                                <span className="font-body-md text-body-md text-on-surface">
                                                    Almacén Calzado
                                                    {' '}
                                                    <span className="text-secondary text-xs font-mono ml-1 px-1.5 py-0.5 rounded-sm bg-surface-container">Z1</span>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <span className="font-title-md text-title-md font-bold text-emerald-700">12 uds</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs font-semibold text-emerald-800 bg-emerald-50">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                                {' '}
                                                Óptimo
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-900 bg-emerald-100/60 px-2.5 py-1 rounded-sm">
                                                <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                                                {' '}
                                                Listo para despacho
                                            </span>
                                        </td>
                                    </tr>
                                    {/* Row 6: Hoodie Raw Edge (Óptimo) */}
                                    <tr className="inventory-row bg-surface-container-lowest hover:bg-surface-container-low/70 transition-colors" data-category="Sacos" data-line="Hombre" data-name="Hoodie Oversize Raw Edge" data-size="M" data-sku="HOD-GRY-M" data-status="OPTIMO">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-14 rounded-sm overflow-hidden bg-surface-container shrink-0">
                                                    <img className="w-full h-full object-cover" data-alt="Editorial lookbook studio shot of an oversized charcoal dark grey textured raw-edge hoodie, heavy weight luxury cotton knit worn by model in minimalist monochrome studio." src="/images/ascend/editorial-lookbook-studio-shot-of-an.jpg" />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-title-md text-title-md text-on-surface font-semibold truncate">Hoodie Oversize 'Raw Edge'</span>
                                                    <span className="font-body-sm text-body-sm text-secondary">Ref: RE-2024-GRY</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 font-mono font-label-md text-label-md text-on-surface font-semibold">HOD-GRY-M</td>
                                        <td className="py-4 px-4">
                                            <div className="flex flex-col">
                                                <span className="font-body-md text-body-md text-on-surface font-medium">Hombre</span>
                                                <span className="font-body-sm text-body-sm text-secondary">Sacos</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                <span className="w-3 h-3 rounded-full bg-stone-600 shadow-inner" />
                                                <span className="font-body-md text-body-md text-on-surface">
                                                    Gris Plomo /
                                                    {' '}
                                                    <strong>Talla M</strong>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-1.5 text-secondary">
                                                <span className="material-symbols-outlined text-[16px] text-secondary">warehouse</span>
                                                <span className="font-body-md text-body-md text-on-surface">
                                                    Almacén Central
                                                    {' '}
                                                    <span className="text-secondary text-xs font-mono ml-1 px-1.5 py-0.5 rounded-sm bg-surface-container">D3</span>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <span className="font-title-md text-title-md font-bold text-emerald-700">8 uds</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs font-semibold text-emerald-800 bg-emerald-50">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                                {' '}
                                                Óptimo
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-900 bg-emerald-100/60 px-2.5 py-1 rounded-sm">
                                                <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                                                {' '}
                                                Listo para despacho
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* Zero Results State */}
                        <div className={`py-12 flex-col items-center justify-center text-center px-4 ${visibleCount === 0 ? 'flex' : 'hidden'}`} id="noResultsBlock">
                            <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mb-3">
                                <span className="material-symbols-outlined text-secondary text-[24px]">inventory</span>
                            </div>
                            <span className="font-title-md text-title-md text-on-surface font-semibold">No se encontraron existencias</span>
                            <span className="font-body-sm text-body-sm text-secondary max-w-sm mt-1">
                                Ningún SKU coincide con los filtros aplicados. Intenta restablecer los parámetros de búsqueda.
                            </span>
                            <button className="mt-4 px-4 py-2 rounded-lg bg-inverse-surface text-on-primary font-label-md text-label-md" id="resetFiltersBtn" type="button" onClick={resetFilters}>
                                Restablecer Filtros
                            </button>
                        </div>
                        {/* Quick Action Table Footer Bar */}
                        <div className="p-4 bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-secondary font-body-sm text-body-sm">
                                <span className="material-symbols-outlined text-[16px]">info</span>
                                <span>Valores sincronizados en tiempo real con lector RF de bodega central.</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="px-4 py-2 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container transition-colors shadow-xs flex items-center gap-1.5" type="button">
                                    <span className="material-symbols-outlined text-[16px]">print</span>
                                    <span>Imprimir Hoja de Piso</span>
                                </button>
                                <button className="px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-colors shadow-xs flex items-center gap-1.5" type="button">
                                    <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                                    <span>Crear Pedido con Selección</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Editorial Sales Concierge Advisory Guidance */}
                    <div className="p-6 rounded-lg bg-surface-container-low shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[20px]">psychology_alt</span>
                            </div>
                            <div className="flex flex-col gap-1 max-w-3xl">
                                <div className="flex items-center gap-2">
                                    <span className="font-title-md text-title-md text-on-surface font-bold">Protocolo de Asesoría Comercial ASCEND</span>
                                    <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase bg-surface-container-high text-secondary">Norma Operativa</span>
                                </div>
                                <p className="font-body-md text-body-md text-on-surface-variant">
                                    Nunca comprometas una entrega presencial ni pactes un despacho digital sin verificar el stock físico en este módulo. Si un cliente solicita una referencia con estado
                                    {' '}
                                    <strong>Agotado</strong>
                                    , ofrece inmediatamente una variante de color disponible o redirígelo a la línea complementaria sin abandonar el canal de atención.
                                </p>
                            </div>
                        </div>
                        <div className="flex md:flex-col gap-2 shrink-0 w-full md:w-auto">
                            <div className="px-3 py-2 rounded-sm bg-surface-container-lowest shadow-xs flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                                <span className="font-body-sm text-body-sm text-on-surface font-semibold">&gt; 5 uds: Comprometer venta</span>
                            </div>
                            <div className="px-3 py-2 rounded-sm bg-surface-container-lowest shadow-xs flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-amber-500" />
                                <span className="font-body-sm text-body-sm text-on-surface font-semibold">1-4 uds: Verificar en percha</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
