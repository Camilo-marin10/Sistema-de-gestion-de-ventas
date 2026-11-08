import { Link } from 'react-router-dom';

export default function SellerDashboard() {
    return (
        <>
            <div className="flex flex-col w-full">
                <div className="flex flex-col gap-8 max-w-[1600px] mx-auto w-full">
                    {/* Top Breadcrumb & Page Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="font-label-caps text-label-caps uppercase text-secondary">Inicio</span>
                                <span className="material-symbols-outlined text-secondary text-[12px]">chevron_right</span>
                                <span className="font-label-caps text-label-caps uppercase text-secondary">Vendedor</span>
                                <span className="material-symbols-outlined text-secondary text-[12px]">chevron_right</span>
                                <span className="font-label-caps text-label-caps uppercase text-primary font-bold">Panel Operativo</span>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Panel de Control del Vendedor</h1>
                                <p className="font-body-md text-body-md text-secondary mt-0.5">
                                    Gestión operativa de pedidos asignados, validación de stock y seguimiento en tiempo real.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="h-10 px-4 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-colors shadow-xs flex items-center gap-2 font-label-lg text-label-lg" type="button">
                                <span className="material-symbols-outlined text-[18px] text-secondary">history</span>
                                <span>Historial de Turno</span>
                            </button>
                            <Link to="/vendedor/pedidos" className="h-10 px-4 rounded-lg bg-primary-container text-on-primary hover:bg-primary transition-colors shadow-xs flex items-center gap-2 font-label-lg text-label-lg">
                                <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                                <span>Atender Nuevo Pedido</span>
                            </Link>
                        </div>
                    </div>
                    {/* Critical Operational Alert Banner */}
                    <div className="bg-error-container/60 rounded-lg p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
                        <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[20px]">warning</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-label-caps text-label-caps uppercase text-on-error-container tracking-wider">Atención de Inventario</span>
                                <p className="font-body-md text-body-md text-on-surface font-medium">
                                    Alerta de Stock Crítico en tus pedidos: 2 órdenes asignadas contienen referencias con menos de 2 unidades disponibles en bodega física.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            <Link to="/vendedor/pedidos" className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors text-label-md font-label-md">
                                Revisar Órdenes
                            </Link>
                        </div>
                    </div>
                    {/* Operational KPI Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {/* KPI 1 */}
                        <div className="bg-surface-container-lowest rounded-lg p-5 shadow-xs flex flex-col justify-between gap-3 relative overflow-hidden">
                            <div className="flex items-start justify-between">
                                <span className="font-label-caps text-label-caps uppercase text-secondary">Pendientes Revisión</span>
                                <span className="px-2 py-0.5 rounded-sm text-[11px] font-semibold bg-amber-100 text-amber-800">Atención Inmediata</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-display-lg text-display-lg text-on-surface">8</span>
                                <span className="font-body-sm text-body-sm text-secondary mt-1">3 con comprobante pendiente</span>
                            </div>
                            <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden mt-1">
                                <div className="bg-amber-600 h-full w-[45%]" />
                            </div>
                        </div>
                        {/* KPI 2 */}
                        <div className="bg-surface-container-lowest rounded-lg p-5 shadow-xs flex flex-col justify-between gap-3">
                            <div className="flex items-start justify-between">
                                <span className="font-label-caps text-label-caps uppercase text-secondary">Asignados a Mí</span>
                                <span className="w-2 h-2 rounded-full bg-primary-container" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-display-lg text-display-lg text-on-surface">24</span>
                                <span className="font-body-sm text-body-sm text-secondary mt-1">Activos en tu bandeja</span>
                            </div>
                            <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden mt-1">
                                <div className="bg-primary-container h-full w-[65%]" />
                            </div>
                        </div>
                        {/* KPI 3 */}
                        <div className="bg-surface-container-lowest rounded-lg p-5 shadow-xs flex flex-col justify-between gap-3">
                            <div className="flex items-start justify-between">
                                <span className="font-label-caps text-label-caps uppercase text-secondary">Confirmados Hoy</span>
                                <span className="px-2 py-0.5 rounded-sm text-[11px] font-semibold bg-emerald-100 text-emerald-800">+4 vs ayer</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-display-lg text-display-lg text-on-surface">16</span>
                                <span className="font-body-sm text-body-sm text-secondary mt-1">Stock en cola de empaque</span>
                            </div>
                            <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden mt-1">
                                <div className="bg-emerald-600 h-full w-[80%]" />
                            </div>
                        </div>
                        {/* KPI 4 */}
                        <div className="bg-surface-container-lowest rounded-lg p-5 shadow-xs flex flex-col justify-between gap-3">
                            <div className="flex items-start justify-between">
                                <span className="font-label-caps text-label-caps uppercase text-secondary">En Preparación</span>
                                <span className="material-symbols-outlined text-[16px] text-secondary">local_shipping</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-display-lg text-display-lg text-on-surface">12</span>
                                <span className="font-body-sm text-body-sm text-secondary mt-1">Con guía asignada</span>
                            </div>
                            <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden mt-1">
                                <div className="bg-secondary h-full w-[50%]" />
                            </div>
                        </div>
                        {/* KPI 5 */}
                        <div className="bg-surface-container-lowest rounded-lg p-5 shadow-xs flex flex-col justify-between gap-3">
                            <div className="flex items-start justify-between">
                                <span className="font-label-caps text-label-caps uppercase text-secondary">Completados</span>
                                <span className="material-symbols-outlined text-[16px] text-tertiary">task_alt</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-display-lg text-display-lg text-on-surface">42</span>
                                <span className="font-body-sm text-body-sm text-secondary mt-1">Entregas efectivas validadas</span>
                            </div>
                            <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden mt-1">
                                <div className="bg-tertiary h-full w-[90%]" />
                            </div>
                        </div>
                    </div>
                    {/* Main Workspace Split Layout: 65% / 35% */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Left Column: Priority Orders Table (65% -> col-span-8 approx) */}
                        <div className="lg:col-span-8 flex flex-col gap-4">
                            <div className="bg-surface-container-lowest rounded-lg shadow-xs p-6 flex flex-col gap-5">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <span className="w-1.5 h-5 rounded-full bg-primary-container" />
                                        <h2 className="font-headline-md text-headline-md text-on-surface">Lista de Tareas y Pedidos Prioritarios</h2>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-body-sm text-body-sm text-secondary">Filtrar por:</span>
                                        <div className="px-3 py-1.5 rounded-lg bg-surface-container-low flex items-center gap-2">
                                            <span className="font-label-md text-label-md text-on-surface font-medium">Todos los canales</span>
                                            <span className="material-symbols-outlined text-[16px] text-secondary">expand_more</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Orders Table Container */}
                                <div className="overflow-x-auto -mx-6">
                                    <table className="w-full text-left min-w-[760px]">
                                        <thead>
                                            <tr className="bg-surface-container-low/60 text-secondary font-label-caps text-label-caps uppercase">
                                                <th className="py-3 px-6">ID Pedido</th>
                                                <th className="py-3 px-4">Cliente &amp; Canal</th>
                                                <th className="py-3 px-4">Prendas Solicitadas</th>
                                                <th className="py-3 px-4 text-right">Total (COP)</th>
                                                <th className="py-3 px-4">Estado Stock</th>
                                                <th className="py-3 px-4">Estado Pedido</th>
                                                <th className="py-3 px-6 text-right">Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-surface-container-low font-body-sm text-body-sm text-on-surface">
                                            {/* Row 1 */}
                                            <tr className="hover:bg-surface-container-low/40 transition-colors">
                                                <td className="py-4 px-6 font-label-lg text-label-lg font-bold text-on-surface">#ASC-8945</td>
                                                <td className="py-4 px-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-label-md text-label-md font-semibold text-on-surface">Laura Méndez</span>
                                                        <span className="text-secondary flex items-center gap-1 mt-0.5">
                                                            <span className="material-symbols-outlined text-[13px] text-emerald-600">chat</span>
                                                            {' '}
                                                            +57 312 458 9021
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <img className="w-10 h-10 rounded-lg object-cover bg-surface-container shrink-0" data-alt="High fashion female black bodysuit and structured crimson corset flatlay product photograph on light minimalist background studio lighting" src="/images/ascend/high-fashion-female-black-bodysuit-and.jpg" />
                                                        <div className="flex flex-col">
                                                            <span className="font-label-md text-label-md font-medium text-on-surface truncate max-w-[170px]">
                                                                Bodys x1 (M/Negro)
                                                            </span>
                                                            <span className="text-secondary text-[11px] truncate max-w-[170px]">+ Corset x1 (S/Rojo)</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-right font-label-md text-label-md font-semibold text-on-surface">$210.000</td>
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                                        <span className="font-label-caps text-label-caps uppercase text-emerald-800">Disponible (5 uds)</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className="px-2.5 py-1 rounded-sm text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                                                        Pendiente Revisión
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <button className="h-8 px-3 rounded-lg bg-primary-container text-on-primary hover:bg-primary transition-colors font-label-md text-label-md" type="button">
                                                        Validar y Confirmar
                                                    </button>
                                                </td>
                                            </tr>
                                            {/* Row 2 */}
                                            <tr className="hover:bg-surface-container-low/40 transition-colors">
                                                <td className="py-4 px-6 font-label-lg text-label-lg font-bold text-on-surface">#ASC-8942</td>
                                                <td className="py-4 px-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-label-md text-label-md font-semibold text-on-surface">Valentina Morales</span>
                                                        <span className="text-secondary flex items-center gap-1 mt-0.5">
                                                            <span className="material-symbols-outlined text-[13px] text-purple-600">photo_camera</span>
                                                            {' '}
                                                            +57 310 492 8812
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <img className="w-10 h-10 rounded-lg object-cover bg-surface-container shrink-0" data-alt="Urban luxury oversized black t-shirt model shot street fashion editorial with clean typography detail minimal catalog aesthetic" src="/images/ascend/urban-luxury-oversized-black-t-shirt.jpg" />
                                                        <div className="flex flex-col">
                                                            <span className="font-label-md text-label-md font-medium text-on-surface truncate max-w-[170px]">
                                                                Camiseta Oversize 'Urban'
                                                            </span>
                                                            <span className="text-secondary text-[11px]">Talla L / Negro</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-right font-label-md text-label-md font-semibold text-on-surface">$145.000</td>
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                                        <span className="font-label-caps text-label-caps uppercase text-amber-700">Stock Bajo (1 ud)</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className="px-2.5 py-1 rounded-sm text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                                                        Pendiente Revisión
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <button className="h-8 px-3 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md" type="button">
                                                        Validar Stock
                                                    </button>
                                                </td>
                                            </tr>
                                            {/* Row 3 */}
                                            <tr className="hover:bg-surface-container-low/40 transition-colors bg-error-container/10">
                                                <td className="py-4 px-6 font-label-lg text-label-lg font-bold text-on-surface">#ASC-8938</td>
                                                <td className="py-4 px-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-label-md text-label-md font-semibold text-on-surface">Carlos Henao</span>
                                                        <span className="text-secondary flex items-center gap-1 mt-0.5">
                                                            <span className="material-symbols-outlined text-[13px] text-tertiary">language</span>
                                                            {' '}
                                                            +57 300 781 2290
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <img className="w-10 h-10 rounded-lg object-cover bg-surface-container shrink-0" data-alt="High-end designer white running track sneakers luxury product photography side view on neutral background studio light" src="/images/ascend/high-end-designer-white-running-track.jpg" />
                                                        <div className="flex flex-col">
                                                            <span className="font-label-md text-label-md font-medium text-on-surface truncate max-w-[170px]">
                                                                Tenis 'Ascend Track'
                                                            </span>
                                                            <span className="text-secondary text-[11px]">41 / Blanco</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-right font-label-md text-label-md font-semibold text-on-surface">$380.000</td>
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-error" />
                                                        <span className="font-label-caps text-label-caps uppercase text-error font-bold">Quiebre (0 uds)</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className="px-2.5 py-1 rounded-sm text-[11px] font-semibold bg-rose-50 text-error border border-rose-200">
                                                        Bloqueado Stock
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <button className="h-8 px-3 rounded-lg bg-surface-container-lowest text-primary hover:bg-surface-container transition-colors font-label-md text-label-md shadow-xs" type="button">
                                                        Contactar Cliente
                                                    </button>
                                                </td>
                                            </tr>
                                            {/* Row 4 */}
                                            <tr className="hover:bg-surface-container-low/40 transition-colors">
                                                <td className="py-4 px-6 font-label-lg text-label-lg font-bold text-on-surface">#ASC-8935</td>
                                                <td className="py-4 px-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-label-md text-label-md font-semibold text-on-surface">Mariana Castro</span>
                                                        <span className="text-secondary flex items-center gap-1 mt-0.5">
                                                            <span className="material-symbols-outlined text-[13px] text-emerald-600">chat</span>
                                                            {' '}
                                                            +57 316 220 8910
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <img className="w-10 h-10 rounded-lg object-cover bg-surface-container shrink-0" data-alt="Minimalist streetwear heather grey raw edge oversized hoodie luxury retail presentation editorial lookbook aesthetic" src="/images/ascend/minimalist-streetwear-heather-grey-raw-edge.jpg" />
                                                        <div className="flex flex-col">
                                                            <span className="font-label-md text-label-md font-medium text-on-surface truncate max-w-[170px]">
                                                                Hoodie Oversize 'Raw Edge'
                                                            </span>
                                                            <span className="text-secondary text-[11px]">Talla M / Gris</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-right font-label-md text-label-md font-semibold text-on-surface">$240.000</td>
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                                        <span className="font-label-caps text-label-caps uppercase text-emerald-800">Disponible (8 uds)</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className="px-2.5 py-1 rounded-sm text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                                        Confirmado
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <button className="h-8 px-3 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors font-label-md text-label-md" type="button">
                                                        Ver Detalle
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {/* Table Bottom Bar */}
                                <div className="flex items-center justify-between pt-2">
                                    <span className="font-body-sm text-body-sm text-secondary">Mostrando 4 de 24 pedidos asignados</span>
                                    <div className="flex items-center gap-2">
                                        <button className="px-3 py-1.5 rounded-lg bg-surface-container-low text-secondary text-label-md font-label-md" type="button">
                                            Anterior
                                        </button>
                                        <button className="px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface text-label-md font-label-md" type="button">
                                            Siguiente
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Right Column: Operational Aids & Stock Watchlist (35% -> col-span-4 approx) */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            {/* Block 1: Stock Alert in Seller Catalog */}
                            <div className="bg-surface-container-lowest rounded-lg shadow-xs p-6 flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <span className="material-symbols-outlined text-[20px] text-primary-container">inventory</span>
                                        <h3 className="font-title-md text-title-md text-on-surface">Alertas en Catálogo</h3>
                                    </div>
                                    <span className="font-label-caps text-label-caps uppercase text-secondary">Bodega Central</span>
                                </div>
                                <p className="font-body-sm text-body-sm text-secondary">Monitorea el inventario crítico antes de confirmar prendas por canales de mensajería:</p>
                                <div className="flex flex-col gap-3">
                                    {/* Warning Item 1 */}
                                    <div className="p-3 rounded-lg bg-surface-container-low/80 flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                                                <span className="material-symbols-outlined text-secondary text-[18px]">apparel</span>
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="font-label-md text-label-md font-semibold text-on-surface truncate">Camiseta 'Urban Rise'</span>
                                                <span className="font-body-sm text-body-sm text-secondary truncate">L / Negro</span>
                                            </div>
                                        </div>
                                        <span className="px-2 py-0.5 rounded-sm text-[11px] font-semibold bg-amber-100 text-amber-800 shrink-0">1 ud restante</span>
                                    </div>
                                    {/* Warning Item 2 */}
                                    <div className="p-3 rounded-lg bg-surface-container-low/80 flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                                                <span className="material-symbols-outlined text-secondary text-[18px]">styler</span>
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="font-label-md text-label-md font-semibold text-on-surface truncate">Corset 'Siren'</span>
                                                <span className="font-body-sm text-body-sm text-secondary truncate">S / Rojo</span>
                                            </div>
                                        </div>
                                        <span className="px-2 py-0.5 rounded-sm text-[11px] font-semibold bg-amber-100 text-amber-800 shrink-0">2 uds restantes</span>
                                    </div>
                                    {/* Warning Item 3 (Depleted) */}
                                    <div className="p-3 rounded-lg bg-error-container/20 flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                                                <span className="material-symbols-outlined text-error text-[18px]">block</span>
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="font-label-md text-label-md font-semibold text-on-surface truncate">Body Asimétrico 'Nexus'</span>
                                                <span className="font-body-sm text-body-sm text-secondary truncate">XS / Blanco</span>
                                            </div>
                                        </div>
                                        <span className="px-2 py-0.5 rounded-sm text-[11px] font-bold bg-rose-100 text-error shrink-0">AGOTADO</span>
                                    </div>
                                </div>
                                <div className="pt-1 flex items-center justify-between">
                                    <span className="font-label-caps text-label-caps text-secondary uppercase">Sincronizado hace 2 min</span>
                                    <Link to="/vendedor/productos" className="font-label-md text-label-md text-primary font-semibold hover:underline flex items-center gap-1">
                                        Ver catálogo completo
                                        {' '}
                                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                    </Link>
                                </div>
                            </div>
                            {/* Block 2: Recent Activity Timeline */}
                            <div className="bg-surface-container-lowest rounded-lg shadow-xs p-6 flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <span className="material-symbols-outlined text-[20px] text-secondary">update</span>
                                        <h3 className="font-title-md text-title-md text-on-surface">Actividad Reciente del Vendedor</h3>
                                    </div>
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                </div>
                                {/* Timeline Container */}
                                <div className="relative pl-6 flex flex-col gap-5 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-surface-container">
                                    {/* Timeline Item 1 */}
                                    <div className="relative flex flex-col gap-1">
                                        <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-primary-container ring-4 ring-surface-container-lowest" />
                                        <span className="font-label-caps text-label-caps uppercase text-secondary">Hace 10 min</span>
                                        <p className="font-body-sm text-body-sm text-on-surface">
                                            Confirmaste pedido
                                            {' '}
                                            <span className="font-semibold">#ASC-8935</span>
                                            . Stock descontado en Bodega Central.
                                        </p>
                                    </div>
                                    {/* Timeline Item 2 */}
                                    <div className="relative flex flex-col gap-1">
                                        <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-secondary ring-4 ring-surface-container-lowest" />
                                        <span className="font-label-caps text-label-caps uppercase text-secondary">Hace 35 min</span>
                                        <p className="font-body-sm text-body-sm text-on-surface">
                                            Añadiste nota interna a pedido
                                            {' '}
                                            <span className="font-semibold">#ASC-8931</span>
                                            :
                                            {' '}
                                            <span className="italic text-secondary">"Cliente solicita cambio a talla L"</span>
                                            .
                                        </p>
                                    </div>
                                    {/* Timeline Item 3 */}
                                    <div className="relative flex flex-col gap-1">
                                        <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-emerald-600 ring-4 ring-surface-container-lowest" />
                                        <span className="font-label-caps text-label-caps uppercase text-secondary">Hace 1 h</span>
                                        <p className="font-body-sm text-body-sm text-on-surface">
                                            Asignación automática de
                                            {' '}
                                            <span className="font-semibold">3 nuevos pedidos</span>
                                            {' '}
                                            desde WhatsApp Concierge.
                                        </p>
                                    </div>
                                    {/* Timeline Item 4 */}
                                    <div className="relative flex flex-col gap-1">
                                        <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-secondary-container ring-4 ring-surface-container-lowest" />
                                        <span className="font-label-caps text-label-caps uppercase text-secondary">Hace 2 h</span>
                                        <p className="font-body-sm text-body-sm text-on-surface">
                                            Iniciaste turno en
                                            {' '}
                                            <span className="font-semibold">Store Central (ES)</span>
                                            .
                                        </p>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <button className="w-full py-2 rounded-lg bg-surface-container-low text-secondary hover:text-on-surface hover:bg-surface-container transition-colors font-label-md text-label-md" type="button">
                                        Descargar Reporte de Sesión
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
