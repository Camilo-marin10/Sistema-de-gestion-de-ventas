import { useEffect, useState } from 'react';
import Toast, { useToast } from '../../components/ui/Toast';

export default function AdminOrders() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [toast, notify, dismiss] = useToast();

    useEffect(() => {
        document.body.style.overflow = drawerOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [drawerOpen]);

    const openDrawer = () => setDrawerOpen(true);
    const closeDrawer = () => setDrawerOpen(false);
    const confirmOrder = () => {
        closeDrawer();
        notify('Pedido #ASC-8942 confirmado', 'Inventario central actualizado y notificación enviada al cliente.');
    };

    return (
        <>
            <div className="flex flex-col w-full">
                {/* Top Context Header & Key KPIs */}
                <div className="flex flex-col gap-space-lg mb-space-xl">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
                        <div className="flex flex-col gap-space-xs">
                            <div className="flex items-center gap-space-xs font-label-caps text-label-caps text-secondary uppercase tracking-wider">
                                <span>Inicio</span>
                                <span className="material-symbols-outlined text-[14px] text-secondary">chevron_right</span>
                                <span>Pedidos</span>
                                <span className="material-symbols-outlined text-[14px] text-secondary">chevron_right</span>
                                <span className="text-primary font-semibold">Listado General</span>
                            </div>
                            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Gestión de Pedidos</h1>
                            <p className="font-body-md text-body-md text-secondary">Control omnicanal, verificación en tiempo real de inventario y confirmación de ventas.</p>
                        </div>
                        <div className="flex items-center gap-space-sm">
                            <button className="h-10 px-space-md rounded-lg bg-surface-container-lowest text-on-surface font-title-md text-title-md shadow-xs hover:bg-surface-container transition-all flex items-center gap-space-xs" type="button">
                                <span className="material-symbols-outlined text-[18px]">file_download</span>
                                <span>Exportar CSV</span>
                            </button>
                            <button className="h-10 px-space-md rounded-lg bg-primary-container text-on-primary font-title-md text-title-md shadow-xs hover:bg-primary transition-all flex items-center gap-space-xs" type="button">
                                <span className="material-symbols-outlined text-[18px]">add</span>
                                <span>Crear Pedido Manual</span>
                            </button>
                        </div>
                    </div>
                    {/* KPI Summary Blocks (Bento Style) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
                        {/* Metric 1: Pendientes */}
                        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs flex flex-col justify-between relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary-fixed/30 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
                            <div className="flex items-center justify-between z-10">
                                <span className="font-label-caps text-label-caps uppercase text-secondary">Pendientes de Revisión</span>
                                <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
                                    <span className="material-symbols-outlined text-[20px]">pending_actions</span>
                                </span>
                            </div>
                            <div className="mt-space-md z-10">
                                <div className="flex items-baseline gap-space-xs">
                                    <span className="font-display-lg text-display-lg text-on-surface">28</span>
                                    <span className="font-label-caps text-label-caps text-amber-700 bg-amber-50 px-2 py-0.5 rounded-sm font-semibold">Urgente</span>
                                </div>
                                <p className="font-body-sm text-body-sm text-secondary mt-1">Requieren validación de inventario</p>
                            </div>
                        </div>
                        {/* Metric 2: Confirmados */}
                        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs flex flex-col justify-between relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-50 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
                            <div className="flex items-center justify-between z-10">
                                <span className="font-label-caps text-label-caps uppercase text-secondary">Confirmados (Hoy)</span>
                                <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                                    <span className="material-symbols-outlined text-[20px]">verified</span>
                                </span>
                            </div>
                            <div className="mt-space-md z-10">
                                <div className="flex items-baseline gap-space-xs">
                                    <span className="font-display-lg text-display-lg text-on-surface">342</span>
                                    <span className="font-label-caps text-label-caps text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm font-semibold">+18.4%</span>
                                </div>
                                <p className="font-body-sm text-body-sm text-secondary mt-1">Stock ya descontado en almacén</p>
                            </div>
                        </div>
                        {/* Metric 3: Despachados */}
                        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs flex flex-col justify-between relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-tertiary-container/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
                            <div className="flex items-center justify-between z-10">
                                <span className="font-label-caps text-label-caps uppercase text-secondary">Despachados / Tránsito</span>
                                <span className="p-1.5 rounded-lg bg-tertiary-fixed/40 text-tertiary">
                                    <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                                </span>
                            </div>
                            <div className="mt-space-md z-10">
                                <div className="flex items-baseline gap-space-xs">
                                    <span className="font-display-lg text-display-lg text-on-surface">215</span>
                                    <span className="font-label-caps text-label-caps text-tertiary bg-tertiary-fixed/30 px-2 py-0.5 rounded-sm font-semibold">92% On-Time</span>
                                </div>
                                <p className="font-body-sm text-body-sm text-secondary mt-1">Guías activas con transportadora</p>
                            </div>
                        </div>
                        {/* Metric 4: Cancelados */}
                        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs flex flex-col justify-between relative overflow-hidden group">
                            <div className="flex items-center justify-between z-10">
                                <span className="font-label-caps text-label-caps uppercase text-secondary">Cancelados / Sin Stock</span>
                                <span className="p-1.5 rounded-lg bg-surface-container text-secondary">
                                    <span className="material-symbols-outlined text-[20px]">cancel</span>
                                </span>
                            </div>
                            <div className="mt-space-md z-10">
                                <div className="flex items-baseline gap-space-xs">
                                    <span className="font-display-lg text-display-lg text-on-surface">18</span>
                                    <span className="font-label-caps text-label-caps text-secondary bg-surface-container px-2 py-0.5 rounded-sm font-semibold">2.4% Tasa</span>
                                </div>
                                <p className="font-body-sm text-body-sm text-secondary mt-1">Sin afectación al inventario activo</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Operational Filter Toolbar */}
                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs mb-space-lg flex flex-col lg:flex-row gap-space-md lg:items-center justify-between">
                    <div className="flex flex-wrap items-center gap-space-sm flex-1">
                        {/* Search Field */}
                        <div className="relative w-full sm:w-72">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px]">search</span>
                            {' '}
                            <input className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-secondary focus:outline-hidden focus:bg-surface-container-lowest transition-all" placeholder="Buscar ID (#ASC), cliente o WhatsApp..." type="text" />
                        </div>
                        {/* Filter: Estado */}
                        <div className="relative flex-1 sm:flex-initial">
                            <select className="w-full sm:w-48 h-10 px-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-hidden cursor-pointer appearance-none pr-8" defaultValue="Pendiente de Revisión">
                                <option value="Estado: Todos">Estado: Todos</option>
                                <option value="Pendiente de Revisión">Pendiente de Revisión</option>
                                <option value="Confirmado">Confirmado</option>
                                <option value="En Preparación">En Preparación</option>
                                <option value="Entregado">Entregado</option>
                                <option value="Cancelado">Cancelado</option>
                            </select>
                            {' '}
                            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary text-[18px] pointer-events-none">
                                expand_more
                            </span>
                        </div>
                        {/* Filter: Canal */}
                        <div className="relative flex-1 sm:flex-initial">
                            <select className="w-full sm:w-44 h-10 px-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-hidden cursor-pointer appearance-none pr-8">
                                <option value="Canal: Todos">Canal: Todos</option>
                                <option value="WhatsApp Direct">WhatsApp Direct</option>
                                <option value="Instagram DM">Instagram DM</option>
                                <option value="Tienda Web Online">Tienda Web Online</option>
                            </select>
                            {' '}
                            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary text-[18px] pointer-events-none">
                                expand_more
                            </span>
                        </div>
                        {/* Filter: Vendedor Asignado */}
                        <div className="relative flex-1 sm:flex-initial">
                            <select className="w-full sm:w-48 h-10 px-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-hidden cursor-pointer appearance-none pr-8">
                                <option value="Vendedor: Todos">Vendedor: Todos</option>
                                <option value="Laura Restrepo">Laura Restrepo</option>
                                <option value="Carlos Mendoza">Carlos Mendoza</option>
                                <option value="Sin Asignar">Sin Asignar</option>
                            </select>
                            {' '}
                            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary text-[18px] pointer-events-none">
                                expand_more
                            </span>
                        </div>
                    </div>
                    {/* Quick Utilities */}
                    <div className="flex items-center gap-space-xs self-end lg:self-auto">
                        <button className="h-10 px-3 rounded-lg bg-surface-container-low text-secondary hover:text-on-surface hover:bg-surface-container transition-colors font-label-md text-label-md flex items-center gap-1">
                            <span className="material-symbols-outlined text-[18px]">tune</span>
                            <span>Filtros Avanzados</span>
                        </button>
                        <button className="h-10 w-10 rounded-lg bg-surface-container-low text-secondary hover:text-on-surface hover:bg-surface-container transition-colors flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px]">refresh</span>
                        </button>
                    </div>
                </div>
                {/* Primary Orders Data Table */}
                <div className="bg-surface-container-lowest rounded-xl shadow-xs overflow-hidden flex flex-col">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-surface-container-low/50">
                                    <th className="py-space-sm px-space-md font-label-caps text-label-caps uppercase text-secondary font-semibold">ID Pedido</th>
                                    <th className="py-space-sm px-space-md font-label-caps text-label-caps uppercase text-secondary font-semibold">Cliente y Teléfono</th>
                                    <th className="py-space-sm px-space-md font-label-caps text-label-caps uppercase text-secondary font-semibold">Fecha / Hora</th>
                                    <th className="py-space-sm px-space-md font-label-caps text-label-caps uppercase text-secondary font-semibold">Prendas y Variantes</th>
                                    <th className="py-space-sm px-space-md font-label-caps text-label-caps uppercase text-secondary font-semibold text-right">Total (COP)</th>
                                    <th className="py-space-sm px-space-md font-label-caps text-label-caps uppercase text-secondary font-semibold text-center">Canal</th>
                                    <th className="py-space-sm px-space-md font-label-caps text-label-caps uppercase text-secondary font-semibold text-center">Estado</th>
                                    <th className="py-space-sm px-space-md font-label-caps text-label-caps uppercase text-secondary font-semibold">Vendedor</th>
                                    <th className="py-space-sm px-space-md font-label-caps text-label-caps uppercase text-secondary font-semibold text-right">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="font-body-md text-body-md text-on-surface">
                                {/* Row 1: High Priority Urgent (Triggers Drawer) */}
                                <tr className="hover:bg-surface-container-low/40 transition-colors group bg-amber-50/20">
                                    <td className="py-space-md px-space-md font-title-md text-title-md font-semibold text-primary">
                                        <span className="cursor-pointer hover:underline" onClick={openDrawer}>#ASC-8942</span>
                                    </td>
                                    <td className="py-space-md px-space-md">
                                        <div className="flex flex-col">
                                            <span className="font-title-md text-title-md font-semibold text-on-surface">Valentina Morales</span>
                                            <span className="font-body-sm text-body-sm text-secondary flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[13px] text-emerald-600">call</span>
                                                {' '}
                                                310 492 8812
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="font-label-lg text-label-md font-medium text-on-surface">Hace 15m</span>
                                            <span className="font-body-sm text-body-sm text-secondary">11:42 AM</span>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md max-w-xs">
                                        <div className="flex items-center gap-space-xs">
                                            <div className="flex -space-x-2 overflow-hidden">
                                                <img className="inline-block h-8 w-8 rounded-md object-cover bg-surface-container" data-alt="High fashion studio product shot of a black minimalist bodysuit on clean neutral backdrop with dramatic editorial shadows" src="/images/ascend/high-fashion-studio-product-shot-of.jpg" />
                                                <img className="inline-block h-8 w-8 rounded-md object-cover bg-surface-container" data-alt="Sensual deep crimson red corset high fashion studio close-up garment photograph textured luxury silk" src="/images/ascend/sensual-deep-crimson-red-corset-high.jpg" />
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="font-body-sm text-body-sm truncate text-on-surface">
                                                    Bodys x1
                                                    {' '}
                                                    <span className="text-secondary">(M/Negro)</span>
                                                </span>
                                                <span className="font-body-sm text-body-sm truncate text-on-surface">
                                                    + Corset x1
                                                    {' '}
                                                    <span className="text-secondary">(S/Rojo)</span>
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md text-right font-title-md text-title-md font-semibold text-on-surface whitespace-nowrap">$210.000</td>
                                    <td className="py-space-md px-space-md text-center">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-emerald-800 bg-emerald-50 text-[11px] font-semibold uppercase tracking-wider">
                                            <span className="material-symbols-outlined text-[14px]">chat</span>
                                            {' '}
                                            WhatsApp
                                        </span>
                                    </td>
                                    <td className="py-space-md px-space-md text-center whitespace-nowrap">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm font-semibold text-[11px] text-amber-800 bg-amber-50 animate-pulse">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                            {' '}
                                            Pendiente de Revisión
                                        </span>
                                    </td>
                                    <td className="py-space-md px-space-md whitespace-nowrap">
                                        <div className="flex items-center gap-space-xs">
                                            <span className="w-6 h-6 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-label-caps text-label-caps font-bold">
                                                LR
                                            </span>
                                            <span className="font-body-sm text-body-sm font-medium">Laura Restrepo</span>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md text-right whitespace-nowrap">
                                        <button className="h-9 px-3 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-md hover:bg-primary transition-all flex items-center gap-1 ml-auto shadow-xs" onClick={openDrawer}>
                                            <span className="material-symbols-outlined text-[16px]">visibility</span>
                                            <span>Revisar Pedido</span>
                                        </button>
                                    </td>
                                </tr>
                                {/* Row 2: Unassigned Urgent */}
                                <tr className="hover:bg-surface-container-low/40 transition-colors group">
                                    <td className="py-space-md px-space-md font-title-md text-title-md font-semibold text-on-surface">#ASC-8941</td>
                                    <td className="py-space-md px-space-md">
                                        <div className="flex flex-col">
                                            <span className="font-title-md text-title-md font-semibold text-on-surface">Mateo Gómez</span>
                                            <span className="font-body-sm text-body-sm text-secondary">318 201 9904</span>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="font-label-lg text-label-md font-medium text-on-surface">Hace 40m</span>
                                            <span className="font-body-sm text-body-sm text-secondary">11:15 AM</span>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md max-w-xs">
                                        <div className="flex items-center gap-space-xs">
                                            <img className="h-8 w-8 rounded-md object-cover bg-surface-container" data-alt="Modern oversize streetwear grey t-shirt hung against concrete wall studio product photography luxury apparel" src="/images/ascend/modern-oversize-streetwear-grey-t-shirt.jpg" />
                                            <span className="font-body-sm text-body-sm truncate text-on-surface">
                                                Camiseta Oversize
                                                {' '}
                                                <span className="text-secondary">(L/Gris)</span>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md text-right font-title-md text-title-md font-semibold text-on-surface whitespace-nowrap">$145.000</td>
                                    <td className="py-space-md px-space-md text-center">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-blue-800 bg-blue-50 text-[11px] font-semibold uppercase tracking-wider">
                                            <span className="material-symbols-outlined text-[14px]">language</span>
                                            {' '}
                                            Web
                                        </span>
                                    </td>
                                    <td className="py-space-md px-space-md text-center whitespace-nowrap">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm font-semibold text-[11px] text-amber-800 bg-amber-50">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                            {' '}
                                            Pendiente de Revisión
                                        </span>
                                    </td>
                                    <td className="py-space-md px-space-md whitespace-nowrap">
                                        <span className="font-body-sm text-body-sm text-secondary italic bg-surface-container px-2 py-0.5 rounded-sm">Sin Asignar</span>
                                    </td>
                                    <td className="py-space-md px-space-md text-right whitespace-nowrap">
                                        <button className="h-9 px-3 rounded-lg bg-surface-container-high text-on-surface font-label-lg text-label-md hover:bg-surface-container transition-all flex items-center gap-1 ml-auto" onClick={openDrawer}>
                                            <span className="material-symbols-outlined text-[16px]">visibility</span>
                                            <span>Revisar Pedido</span>
                                        </button>
                                    </td>
                                </tr>
                                {/* Row 3: Confirmed / Processing */}
                                <tr className="hover:bg-surface-container-low/40 transition-colors group">
                                    <td className="py-space-md px-space-md font-title-md text-title-md font-semibold text-on-surface">#ASC-8939</td>
                                    <td className="py-space-md px-space-md">
                                        <div className="flex flex-col">
                                            <span className="font-title-md text-title-md font-semibold text-on-surface">Camila Osorio</span>
                                            <span className="font-body-sm text-body-sm text-secondary">301 552 1420</span>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="font-label-lg text-label-md font-medium text-on-surface">Hace 2h</span>
                                            <span className="font-body-sm text-body-sm text-secondary">09:50 AM</span>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md max-w-xs">
                                        <div className="flex items-center gap-space-xs">
                                            <img className="h-8 w-8 rounded-md object-cover bg-surface-container" data-alt="White leather designer street sneakers side perspective clean luxury fashion product photography isolated" src="/images/ascend/white-leather-designer-street-sneakers-side.jpg" />
                                            <span className="font-body-sm text-body-sm truncate text-on-surface">
                                                Tenis Street
                                                {' '}
                                                <span className="text-secondary">(38/Blanco)</span>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md text-right font-title-md text-title-md font-semibold text-on-surface whitespace-nowrap">$320.000</td>
                                    <td className="py-space-md px-space-md text-center">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-fuchsia-800 bg-fuchsia-50 text-[11px] font-semibold uppercase tracking-wider">
                                            <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                                            {' '}
                                            Instagram
                                        </span>
                                    </td>
                                    <td className="py-space-md px-space-md text-center whitespace-nowrap">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm font-semibold text-[11px] text-emerald-800 bg-emerald-50">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                            {' '}
                                            Confirmado
                                        </span>
                                    </td>
                                    <td className="py-space-md px-space-md whitespace-nowrap">
                                        <div className="flex items-center gap-space-xs">
                                            <span className="w-6 h-6 rounded-full bg-surface-container text-on-surface flex items-center justify-center font-label-caps text-label-caps font-bold">
                                                CM
                                            </span>
                                            <span className="font-body-sm text-body-sm font-medium">Carlos Mendoza</span>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md text-right whitespace-nowrap">
                                        <button className="h-9 px-3 rounded-lg bg-surface-container-low text-secondary hover:text-on-surface hover:bg-surface-container transition-all flex items-center gap-1 ml-auto font-label-lg text-label-md">
                                            <span className="material-symbols-outlined text-[16px]">article</span>
                                            <span>Ver Detalle</span>
                                        </button>
                                    </td>
                                </tr>
                                {/* Row 4: Dispatch in progress */}
                                <tr className="hover:bg-surface-container-low/40 transition-colors group">
                                    <td className="py-space-md px-space-md font-title-md text-title-md font-semibold text-on-surface">#ASC-8930</td>
                                    <td className="py-space-md px-space-md">
                                        <div className="flex flex-col">
                                            <span className="font-title-md text-title-md font-semibold text-on-surface">David Rojas</span>
                                            <span className="font-body-sm text-body-sm text-secondary">315 889 0019</span>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="font-label-lg text-label-md font-medium text-on-surface">Hace 4h</span>
                                            <span className="font-body-sm text-body-sm text-secondary">07:30 AM</span>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md max-w-xs">
                                        <div className="flex items-center gap-space-xs">
                                            <img className="h-8 w-8 rounded-md object-cover bg-surface-container" data-alt="High quality graphic black premium cotton t-shirt flat lay editorial fashion aesthetic luxury merchandise" src="/images/ascend/high-quality-graphic-black-premium-cotton.jpg" />
                                            <span className="font-body-sm text-body-sm truncate text-on-surface">
                                                Camiseta Importada
                                                {' '}
                                                <span className="text-secondary">(M/Negro)</span>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md text-right font-title-md text-title-md font-semibold text-on-surface whitespace-nowrap">$180.000</td>
                                    <td className="py-space-md px-space-md text-center">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-blue-800 bg-blue-50 text-[11px] font-semibold uppercase tracking-wider">
                                            <span className="material-symbols-outlined text-[14px]">language</span>
                                            {' '}
                                            Web
                                        </span>
                                    </td>
                                    <td className="py-space-md px-space-md text-center whitespace-nowrap">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm font-semibold text-[11px] text-tertiary bg-tertiary-fixed/30">
                                            <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                                            {' '}
                                            En Despacho
                                        </span>
                                    </td>
                                    <td className="py-space-md px-space-md whitespace-nowrap">
                                        <div className="flex items-center gap-space-xs">
                                            <span className="w-6 h-6 rounded-full bg-surface-container text-on-surface flex items-center justify-center font-label-caps text-label-caps font-bold">
                                                CM
                                            </span>
                                            <span className="font-body-sm text-body-sm font-medium">Carlos Mendoza</span>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md text-right whitespace-nowrap">
                                        <button className="h-9 px-3 rounded-lg bg-surface-container-low text-secondary hover:text-on-surface hover:bg-surface-container transition-all flex items-center gap-1 ml-auto font-label-lg text-label-md">
                                            <span className="material-symbols-outlined text-[16px]">article</span>
                                            <span>Ver Detalle</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* Table Pagination & Count */}
                    <div className="flex items-center justify-between p-space-md bg-surface-container-low/30">
                        <span className="font-body-sm text-body-sm text-secondary">
                            Mostrando
                            {' '}
                            <strong className="text-on-surface">1 - 4</strong>
                            {' '}
                            de
                            {' '}
                            <strong className="text-on-surface">575</strong>
                            {' '}
                            pedidos registrados
                        </span>
                        <div className="flex items-center gap-space-xs">
                            <button className="h-8 px-2.5 rounded-lg bg-surface-container-lowest text-secondary hover:text-on-surface disabled:opacity-50 font-label-md text-label-md flex items-center gap-1 shadow-xs" disabled>
                                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                                <span>Anterior</span>
                            </button>
                            <button className="h-8 w-8 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold">1</button>
                            <button className="h-8 w-8 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-md text-label-md shadow-xs">
                                2
                            </button>
                            <button className="h-8 w-8 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-md text-label-md shadow-xs">
                                3
                            </button>
                            <span className="text-secondary px-1">...</span>
                            <button className="h-8 w-8 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-md text-label-md shadow-xs">
                                24
                            </button>
                            <button className="h-8 px-2.5 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-md text-label-md flex items-center gap-1 shadow-xs">
                                <span>Siguiente</span>
                                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Interactive Slide-over Drawer / Modal: Validación y Confirmación de Pedido */}
                <div aria-labelledby="slide-over-title" aria-modal="true" className={`fixed inset-0 z-[70] overflow-hidden ${drawerOpen ? '' : 'hidden'}`} id="orderDrawer" role="dialog">
                    {/* Backdrop Scrim */}
                    <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-xs transition-opacity duration-300" onClick={closeDrawer} />
                    <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                        <div className="w-screen max-w-2xl bg-surface-container-lowest shadow-2xl flex flex-col justify-between">
                            {/* Drawer Header */}
                            <div className="p-space-lg bg-surface-container-low flex items-center justify-between">
                                <div className="flex items-center gap-space-sm">
                                    <span className="p-2 rounded-lg bg-primary-fixed text-primary">
                                        <span className="material-symbols-outlined text-[24px]">verified_user</span>
                                    </span>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-space-xs">
                                            <h2 className="font-headline-md text-headline-md text-on-surface" id="slide-over-title">Validar Pedido #ASC-8942</h2>
                                            <span className="px-2 py-0.5 rounded-sm text-[11px] font-semibold uppercase bg-amber-50 text-amber-800">Pendiente</span>
                                        </div>
                                        <span className="font-body-sm text-body-sm text-secondary">Verificación estricta de inventario previo a deducción física</span>
                                    </div>
                                </div>
                                <button className="p-2 rounded-lg text-secondary hover:text-on-surface hover:bg-surface-container transition-colors" onClick={closeDrawer}>
                                    <span className="material-symbols-outlined text-[20px]">close</span>
                                </button>
                            </div>
                            {/* Drawer Content Body (Scrollable) */}
                            <div className="p-space-lg overflow-y-auto flex-1 flex flex-col gap-space-lg">
                                {/* Customer & Delivery Brief */}
                                <div className="grid grid-cols-2 gap-space-md p-space-md bg-surface-container-low/50 rounded-xl">
                                    <div className="flex flex-col gap-space-xs">
                                        <span className="font-label-caps text-label-caps uppercase text-secondary font-semibold">Cliente</span>
                                        <span className="font-title-md text-title-md font-semibold text-on-surface">Valentina Morales</span>
                                        <span className="font-body-sm text-body-sm text-secondary">valen.morales@gmail.com</span>
                                        <span className="font-body-sm text-body-sm text-on-surface flex items-center gap-1 font-medium">
                                            <span className="material-symbols-outlined text-[14px] text-emerald-600">call</span>
                                            {' '}
                                            +57 310 492 8812
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-space-xs">
                                        <span className="font-label-caps text-label-caps uppercase text-secondary font-semibold">Dirección de Entrega</span>
                                        <span className="font-body-md text-body-md text-on-surface font-medium">Carrera 43A # 1Sur - 180, Apto 904</span>
                                        <span className="font-body-sm text-body-sm text-secondary">El Poblado, Medellín, Antioquia</span>
                                        <span className="font-label-caps text-label-caps text-secondary uppercase mt-1">Canal Origen: WhatsApp Direct</span>
                                    </div>
                                </div>
                                {/* Inventory Critical Validation Matrix */}
                                <div className="flex flex-col gap-space-xs">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-title-md text-title-md font-semibold text-on-surface flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[18px] text-primary">inventory</span>
                                            {' '}
                                            Comprobación Crítica de Stock
                                        </h3>
                                        <span className="font-label-caps text-label-caps text-secondary uppercase">2 Ítems Registrados</span>
                                    </div>
                                    <div className="bg-surface-container-lowest rounded-xl shadow-xs overflow-hidden mt-space-xs">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-surface-container-low font-label-caps text-label-caps text-secondary uppercase">
                                                    <th className="py-2.5 px-3">Prenda &amp; Variante</th>
                                                    <th className="py-2.5 px-3 text-center">Req.</th>
                                                    <th className="py-2.5 px-3 text-center">Disponible</th>
                                                    <th className="py-2.5 px-3 text-right">Diagnóstico</th>
                                                </tr>
                                            </thead>
                                            <tbody className="font-body-sm text-body-sm">
                                                {/* Item 1: Stock OK */}
                                                <tr className="hover:bg-surface-container-low/20">
                                                    <td className="py-3 px-3">
                                                        <div className="flex items-center gap-space-xs">
                                                            <img className="w-10 h-10 rounded-sm object-cover bg-surface-container" data-alt="Black luxury minimalist bodysuit studio garment photography clean backdrop" src="/images/ascend/black-luxury-minimalist-bodysuit-studio-garment.jpg" />
                                                            <div className="flex flex-col">
                                                                <span className="font-title-md text-label-lg font-semibold text-on-surface">Bodys Silueta Perfecta</span>
                                                                <span className="text-secondary font-body-sm">Negro • Talla M • SKU: BOD-SL-BLK-M</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-3 text-center font-title-md text-title-md font-semibold text-on-surface">1</td>
                                                    <td className="py-3 px-3 text-center font-title-md text-title-md font-semibold text-on-surface">8</td>
                                                    <td className="py-3 px-3 text-right">
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm font-semibold text-[11px] text-emerald-800 bg-emerald-50">
                                                            <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                                            {' '}
                                                            Stock OK
                                                        </span>
                                                    </td>
                                                </tr>
                                                {/* Item 2: Stock Alert / Low Stock */}
                                                <tr className="hover:bg-surface-container-low/20">
                                                    <td className="py-3 px-3">
                                                        <div className="flex items-center gap-space-xs">
                                                            <img className="w-10 h-10 rounded-sm object-cover bg-surface-container" data-alt="Crimson red designer corset luxury apparel fashion catalogue studio shot" src="/images/ascend/crimson-red-designer-corset-luxury-apparel.jpg" />
                                                            <div className="flex flex-col">
                                                                <span className="font-title-md text-label-lg font-semibold text-on-surface">Corset Vanguardia</span>
                                                                <span className="text-secondary font-body-sm">Rojo • Talla S • SKU: CRS-VNG-RED-S</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-3 text-center font-title-md text-title-md font-semibold text-on-surface">1</td>
                                                    <td className="py-3 px-3 text-center font-title-md text-title-md font-semibold text-amber-700">2</td>
                                                    <td className="py-3 px-3 text-right">
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm font-semibold text-[11px] text-amber-800 bg-amber-50">
                                                            <span className="material-symbols-outlined text-[14px]">warning</span>
                                                            {' '}
                                                            Stock Bajo (2 Disp.)
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/* Coupon Applied & Financial Calculation */}
                                <div className="p-space-md bg-surface-container rounded-xl flex flex-col gap-space-xs">
                                    <div className="flex items-center justify-between pb-space-xs">
                                        <span className="font-body-md text-body-md text-secondary">Subtotal Prendas</span>
                                        <span className="font-body-md text-body-md text-on-surface font-semibold">$231.000 COP</span>
                                    </div>
                                    <div className="flex items-center justify-between py-1 px-2 bg-primary-fixed/30 rounded-lg">
                                        <div className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[16px] text-primary">sell</span>
                                            <span className="font-label-caps text-label-caps uppercase font-bold text-primary">Cupón Aplicado: BIENVENIDA-10</span>
                                        </div>
                                        <span className="font-label-lg text-label-md font-semibold text-primary">-$21.000 COP</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-space-xs">
                                        <span className="font-body-md text-body-md text-secondary">Envío Express (Medellín)</span>
                                        <span className="font-label-caps text-label-caps text-emerald-700 font-bold uppercase bg-emerald-50 px-2 py-0.5 rounded-sm">Gratis</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-space-sm mt-space-xs">
                                        <span className="font-headline-md text-headline-md font-bold text-on-surface">Total Liquidado</span>
                                        <span className="font-headline-lg text-headline-lg font-bold text-primary">$210.000 COP</span>
                                    </div>
                                </div>
                                {/* Critical Business Rule Callout */}
                                <div className="p-space-md bg-error-container/40 rounded-xl flex items-start gap-space-sm">
                                    <span className="material-symbols-outlined text-[20px] text-primary mt-0.5">policy</span>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="font-title-md text-label-lg font-bold text-primary">Advertencia de Inventario Central</span>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                                            Al confirmar este pedido se descontará el stock una sola vez en la base de datos de ASCEND. Esta acción es
                                            {' '}
                                            <strong>irreversible</strong>
                                            {' '}
                                            y notificará de forma inmediata a despacho para etiquetado.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Drawer Action Footer */}
                            <div className="p-space-lg bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-md">
                                <div className="flex items-center gap-space-xs w-full sm:w-auto">
                                    <button className="h-10 px-space-md rounded-lg bg-surface-container-lowest text-on-surface font-title-md text-label-lg hover:bg-surface-container transition-colors" onClick={closeDrawer} type="button">
                                        Rechazar / Cancelar
                                    </button>
                                    <button className="h-10 px-space-md rounded-lg bg-surface-container-lowest text-on-surface font-title-md text-label-lg hover:bg-surface-container transition-colors flex items-center gap-1" type="button">
                                        <span className="material-symbols-outlined text-[18px]">person_add</span>
                                        <span>Reasignar</span>
                                    </button>
                                </div>
                                <button className="w-full sm:w-auto h-11 px-space-xl rounded-lg bg-primary-container text-on-primary font-title-md text-title-md font-semibold hover:bg-primary transition-all shadow-md flex items-center justify-center gap-space-xs" onClick={confirmOrder} type="button">
                                    <span className="material-symbols-outlined text-[20px]">check</span>
                                    <span>Confirmar Pedido y Descontar Stock</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toast toast={toast} onClose={dismiss} />
        </>
    );
}
