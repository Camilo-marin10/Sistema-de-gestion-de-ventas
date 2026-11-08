import { useState } from 'react';

export default function SellerOrders() {
    const [confirmState, setConfirmState] = useState('idle'); // idle | processing | done

    const confirmOrder = () => {
        if (confirmState !== 'idle') return;
        setConfirmState('processing');
        setTimeout(() => setConfirmState('done'), 1200);
    };

    return (
        <>
            <div className="flex flex-col w-full">
                <div className="flex flex-col gap-6">
                    {/* Breadcrumb & Header Title Area */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2">
                                <span className="font-label-caps text-label-caps uppercase text-secondary tracking-widest">Inicio</span>
                                <span className="text-secondary text-[10px]">•</span>
                                <span className="font-label-caps text-label-caps uppercase text-secondary tracking-widest">Pedidos</span>
                                <span className="text-secondary text-[10px]">•</span>
                                <span className="font-label-caps text-label-caps uppercase text-primary font-semibold tracking-widest">Pedidos Asignados</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Gestión y Validación de Pedidos</h1>
                                <span className="px-2.5 py-0.5 rounded-full bg-primary-container/10 text-primary font-label-caps text-label-caps uppercase tracking-wider">
                                    Turno Activo
                                </span>
                            </div>
                            <p className="font-body-md text-body-md text-secondary max-w-2xl">
                                Listado de pedidos autorizados y bandeja de verificación de existencias para confirmación de ventas e impacto inmediato en inventario.
                            </p>
                        </div>
                        {/* Quick Metrics Strip */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-surface-container-lowest shadow-xs">
                                <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-label-caps text-label-caps uppercase text-secondary">Tasa Confirmación</span>
                                    <span className="font-title-md text-title-md text-on-surface font-semibold leading-none">92.4%</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-surface-container-lowest shadow-xs">
                                <div className="w-8 h-8 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-[20px]">timer</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-label-caps text-label-caps uppercase text-secondary">Tiempo Promedio</span>
                                    <span className="font-title-md text-title-md text-on-surface font-semibold leading-none">4.2 min</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Filter Pills Bar */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        <button className="px-3.5 py-1.5 rounded-lg bg-surface-container-lowest text-secondary hover:text-on-surface font-label-md text-label-md flex items-center gap-2 transition-colors shadow-xs" type="button">
                            <span>Todos mis asignados</span>
                            <span className="px-1.5 py-0.2 rounded-full bg-surface-container text-secondary text-[11px] font-semibold">24</span>
                        </button>
                        <button className="px-3.5 py-1.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center gap-2 shadow-xs" type="button">
                            <span>Pendientes de Revisión</span>
                            <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-on-primary text-[11px] font-bold">8</span>
                        </button>
                        <button className="px-3.5 py-1.5 rounded-lg bg-surface-container-lowest text-secondary hover:text-on-surface font-label-md text-label-md flex items-center gap-2 transition-colors shadow-xs" type="button">
                            <span>Confirmados</span>
                            <span className="px-1.5 py-0.2 rounded-full bg-surface-container text-secondary text-[11px]">10</span>
                        </button>
                        <button className="px-3.5 py-1.5 rounded-lg bg-surface-container-lowest text-secondary hover:text-on-surface font-label-md text-label-md flex items-center gap-2 transition-colors shadow-xs" type="button">
                            <span>En Preparación</span>
                            <span className="px-1.5 py-0.2 rounded-full bg-surface-container text-secondary text-[11px]">4</span>
                        </button>
                        <button className="px-3.5 py-1.5 rounded-lg bg-surface-container-lowest text-error hover:text-on-surface font-label-md text-label-md flex items-center gap-2 transition-colors shadow-xs" type="button">
                            <span>Bloqueados por Stock</span>
                            <span className="px-1.5 py-0.2 rounded-full bg-error-container text-on-error-container text-[11px] font-bold">2</span>
                        </button>
                    </div>
                    {/* Multi-Column Operational Layout: List & Live Stock Inspector */}
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                        {/* LEFT COLUMN: Order Queue & Filters (7 Cols Desktop) */}
                        <div className="xl:col-span-7 flex flex-col gap-4">
                            {/* Filter Controls Bar */}
                            <div className="p-4 rounded-xl bg-surface-container-lowest shadow-xs flex flex-col md:flex-row items-center gap-3">
                                <div className="relative flex-1 w-full">
                                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-[18px]">search</span>
                                    {' '}
                                    <input className="w-full h-10 pl-9 pr-4 rounded-lg bg-surface-container-low text-on-surface placeholder:text-secondary font-body-sm text-body-sm outline-hidden focus:bg-surface-container transition-colors" placeholder="Buscar por #ID (#ASC-), nombre de cliente, teléfono o SKU..." type="text" defaultValue="#ASC-8945" />
                                </div>
                                <div className="flex items-center gap-2 w-full md:w-auto">
                                    <div className="relative flex-1 md:w-44">
                                        <select className="w-full h-10 px-3 pr-8 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md appearance-none outline-hidden cursor-pointer" defaultValue="Estado: Pendientes">
                                            <option value="Estado: Pendientes">Estado: Pendientes</option>
                                            <option value="Estado: Todos">Estado: Todos</option>
                                            <option value="Estado: Confirmados">Estado: Confirmados</option>
                                            <option value="Estado: Bloqueados">Estado: Bloqueados</option>
                                        </select>
                                        {' '}
                                        <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-secondary text-[18px] pointer-events-none">expand_more</span>
                                    </div>
                                    <div className="relative flex-1 md:w-36">
                                        <select className="w-full h-10 px-3 pr-8 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md appearance-none outline-hidden cursor-pointer" defaultValue="Canal: Todos">
                                            <option value="Canal: Todos">Canal: Todos</option>
                                            <option value="WhatsApp">WhatsApp</option>
                                            <option value="Instagram">Instagram</option>
                                            <option value="Web Directa">Web Directa</option>
                                        </select>
                                        {' '}
                                        <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-secondary text-[18px] pointer-events-none">expand_more</span>
                                    </div>
                                    <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-surface-container-low text-secondary hover:text-on-surface transition-colors shrink-0" title="Refrescar existencias" type="button">
                                        <span className="material-symbols-outlined text-[18px]">sync</span>
                                    </button>
                                </div>
                            </div>
                            {/* Orders Table / Stack */}
                            <div className="rounded-xl bg-surface-container-lowest shadow-xs overflow-hidden flex flex-col">
                                <div className="px-5 py-3.5 bg-surface-container-low flex items-center justify-between text-secondary">
                                    <span className="font-label-caps text-label-caps uppercase tracking-wider">Órdenes Autorizadas en Cola</span>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        <span className="font-label-caps text-label-caps uppercase text-on-surface font-semibold">Validación en tiempo real</span>
                                    </div>
                                </div>
                                {/* Table Header */}
                                <div className="hidden sm:grid grid-cols-12 px-5 py-3 bg-surface-container text-secondary font-label-caps text-label-caps uppercase tracking-wider">
                                    <div className="col-span-3">Pedido / Cliente</div>
                                    <div className="col-span-3">Canal &amp; Contacto</div>
                                    <div className="col-span-2">Prendas / Total</div>
                                    <div className="col-span-2">Estado</div>
                                    <div className="col-span-2 text-right">Disponibilidad</div>
                                </div>
                                {/* Order Rows Container */}
                                <div className="divide-y divide-surface-container-low flex flex-col">
                                    {/* ROW 1 (Active / Selected) */}
                                    <div className="grid grid-cols-1 sm:grid-cols-12 p-4 sm:px-5 sm:py-4 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer relative items-center gap-3 sm:gap-0">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                                        <div className="sm:col-span-3 flex flex-col">
                                            <div className="flex items-center gap-1.5">
                                                <span className="font-label-lg text-label-lg font-bold text-primary">#ASC-8945</span>
                                                <span className="px-1.5 py-0.5 rounded-sm text-[10px] font-bold bg-primary text-on-primary">ACTUAL</span>
                                            </div>
                                            <span className="font-body-md text-body-md font-semibold text-on-surface">Laura Méndez</span>
                                            <span className="font-body-sm text-body-sm text-secondary">Medellín, Antioquia</span>
                                        </div>
                                        <div className="sm:col-span-3 flex flex-col">
                                            <div className="flex items-center gap-1.5 text-on-surface">
                                                <span className="material-symbols-outlined text-[16px] text-tertiary">chat</span>
                                                <span className="font-label-md text-label-md font-medium">WhatsApp Concierge</span>
                                            </div>
                                            <span className="font-body-sm text-body-sm text-secondary">312 458 9021</span>
                                            <span className="font-label-caps text-[10px] text-secondary">Hoy, 11:42 AM</span>
                                        </div>
                                        <div className="sm:col-span-2 flex flex-col">
                                            <span className="font-body-md text-body-md text-on-surface font-semibold">2 prendas</span>
                                            <span className="font-title-md text-title-md text-on-surface font-bold">$210.000</span>
                                            <span className="font-label-caps text-[10px] text-secondary">COP</span>
                                        </div>
                                        <div className="sm:col-span-2 flex flex-col items-start">
                                            <span className="px-2.5 py-1 rounded-sm bg-surface-container text-secondary font-label-caps text-label-caps uppercase font-bold">
                                                Pendiente
                                            </span>
                                            <span className="font-label-caps text-[10px] text-secondary mt-1">Requiere Check</span>
                                        </div>
                                        <div className="sm:col-span-2 flex flex-col items-end text-right">
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[11px] font-semibold bg-tertiary-container/10 text-tertiary">
                                                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                                {' '}
                                                Stock OK
                                            </span>
                                            <span className="font-body-sm text-body-sm text-secondary mt-0.5">2 SKUs Listos</span>
                                        </div>
                                    </div>
                                    {/* ROW 2 */}
                                    <div className="grid grid-cols-1 sm:grid-cols-12 p-4 sm:px-5 sm:py-4 bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer items-center gap-3 sm:gap-0">
                                        <div className="sm:col-span-3 flex flex-col">
                                            <span className="font-label-lg text-label-lg font-bold text-on-surface">#ASC-8942</span>
                                            <span className="font-body-md text-body-md font-semibold text-on-surface">Valentina Morales</span>
                                            <span className="font-body-sm text-body-sm text-secondary">Bogotá D.C.</span>
                                        </div>
                                        <div className="sm:col-span-3 flex flex-col">
                                            <div className="flex items-center gap-1.5 text-on-surface">
                                                <span className="material-symbols-outlined text-[16px] text-secondary">photo_camera</span>
                                                <span className="font-label-md text-label-md font-medium">Instagram Direct</span>
                                            </div>
                                            <span className="font-body-sm text-body-sm text-secondary">310 492 8812</span>
                                            <span className="font-label-caps text-[10px] text-secondary">Hoy, 10:15 AM</span>
                                        </div>
                                        <div className="sm:col-span-2 flex flex-col">
                                            <span className="font-body-md text-body-md text-on-surface font-semibold">1 prenda</span>
                                            <span className="font-title-md text-title-md text-on-surface font-bold">$145.000</span>
                                            <span className="font-label-caps text-[10px] text-secondary">COP</span>
                                        </div>
                                        <div className="sm:col-span-2 flex flex-col items-start">
                                            <span className="px-2.5 py-1 rounded-sm bg-surface-container text-secondary font-label-caps text-label-caps uppercase font-bold">
                                                Pendiente
                                            </span>
                                            <span className="font-label-caps text-[10px] text-secondary mt-1">Por confirmar</span>
                                        </div>
                                        <div className="sm:col-span-2 flex flex-col items-end text-right">
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[11px] font-semibold bg-surface-container text-secondary">
                                                <span className="material-symbols-outlined text-[14px]">inventory_2</span>
                                                {' '}
                                                1 ud Almacén
                                            </span>
                                            <span className="font-body-sm text-body-sm text-secondary mt-0.5">Última pieza</span>
                                        </div>
                                    </div>
                                    {/* ROW 3 (Stock Alert) */}
                                    <div className="grid grid-cols-1 sm:grid-cols-12 p-4 sm:px-5 sm:py-4 bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer items-center gap-3 sm:gap-0">
                                        <div className="sm:col-span-3 flex flex-col">
                                            <span className="font-label-lg text-label-lg font-bold text-on-surface">#ASC-8938</span>
                                            <span className="font-body-md text-body-md font-semibold text-on-surface">Carlos Henao</span>
                                            <span className="font-body-sm text-body-sm text-secondary">Cali, Valle</span>
                                        </div>
                                        <div className="sm:col-span-3 flex flex-col">
                                            <div className="flex items-center gap-1.5 text-on-surface">
                                                <span className="material-symbols-outlined text-[16px] text-secondary">language</span>
                                                <span className="font-label-md text-label-md font-medium">Web Flagship</span>
                                            </div>
                                            <span className="font-body-sm text-body-sm text-secondary">300 781 2290</span>
                                            <span className="font-label-caps text-[10px] text-secondary">Ayer, 06:50 PM</span>
                                        </div>
                                        <div className="sm:col-span-2 flex flex-col">
                                            <span className="font-body-md text-body-md text-on-surface font-semibold">1 prenda</span>
                                            <span className="font-title-md text-title-md text-on-surface font-bold">$380.000</span>
                                            <span className="font-label-caps text-[10px] text-secondary">COP</span>
                                        </div>
                                        <div className="sm:col-span-2 flex flex-col items-start">
                                            <span className="px-2.5 py-1 rounded-sm bg-error-container text-on-error-container font-label-caps text-label-caps uppercase font-bold">
                                                Retenido
                                            </span>
                                            <span className="font-label-caps text-[10px] text-error mt-1">Sin Existencias</span>
                                        </div>
                                        <div className="sm:col-span-2 flex flex-col items-end text-right">
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[11px] font-semibold bg-error-container text-on-error-container">
                                                <span className="material-symbols-outlined text-[14px]">warning</span>
                                                {' '}
                                                Agotado
                                            </span>
                                            <span className="font-body-sm text-body-sm text-error mt-0.5">Bodega 0 uds</span>
                                        </div>
                                    </div>
                                    {/* ROW 4 */}
                                    <div className="grid grid-cols-1 sm:grid-cols-12 p-4 sm:px-5 sm:py-4 bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer items-center gap-3 sm:gap-0">
                                        <div className="sm:col-span-3 flex flex-col">
                                            <span className="font-label-lg text-label-lg font-bold text-on-surface">#ASC-8935</span>
                                            <span className="font-body-md text-body-md font-semibold text-on-surface">Mariana Restrepo</span>
                                            <span className="font-body-sm text-body-sm text-secondary">Barranquilla</span>
                                        </div>
                                        <div className="sm:col-span-3 flex flex-col">
                                            <div className="flex items-center gap-1.5 text-on-surface">
                                                <span className="material-symbols-outlined text-[16px] text-tertiary">chat</span>
                                                <span className="font-label-md text-label-md font-medium">WhatsApp Concierge</span>
                                            </div>
                                            <span className="font-body-sm text-body-sm text-secondary">315 890 1144</span>
                                            <span className="font-label-caps text-[10px] text-secondary">Ayer, 04:30 PM</span>
                                        </div>
                                        <div className="sm:col-span-2 flex flex-col">
                                            <span className="font-body-md text-body-md text-on-surface font-semibold">3 prendas</span>
                                            <span className="font-title-md text-title-md text-on-surface font-bold">$420.000</span>
                                            <span className="font-label-caps text-[10px] text-secondary">COP</span>
                                        </div>
                                        <div className="sm:col-span-2 flex flex-col items-start">
                                            <span className="px-2.5 py-1 rounded-sm bg-tertiary-container/10 text-tertiary font-label-caps text-label-caps uppercase font-bold">
                                                Confirmado
                                            </span>
                                            <span className="font-label-caps text-[10px] text-secondary mt-1">Facturado</span>
                                        </div>
                                        <div className="sm:col-span-2 flex flex-col items-end text-right">
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[11px] font-semibold bg-tertiary-container/10 text-tertiary">
                                                <span className="material-symbols-outlined text-[14px]">done_all</span>
                                                {' '}
                                                Despachado
                                            </span>
                                            <span className="font-body-sm text-body-sm text-secondary mt-0.5">En Guía Servientrega</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Pagination Bar */}
                                <div className="p-4 bg-surface-container-low flex items-center justify-between">
                                    <span className="font-body-sm text-body-sm text-secondary">Mostrando 4 de 24 órdenes asignadas</span>
                                    <div className="flex items-center gap-1">
                                        <button className="px-3 py-1.5 rounded-sm bg-surface-container-lowest text-secondary font-label-md text-label-md hover:bg-surface-container disabled:opacity-50" type="button">
                                            Anterior
                                        </button>
                                        <button className="px-3 py-1.5 rounded-sm bg-primary text-on-primary font-label-md text-label-md font-semibold" type="button">1</button>
                                        <button className="px-3 py-1.5 rounded-sm bg-surface-container-lowest text-secondary font-label-md text-label-md hover:bg-surface-container" type="button">
                                            2
                                        </button>
                                        <button className="px-3 py-1.5 rounded-sm bg-surface-container-lowest text-secondary font-label-md text-label-md hover:bg-surface-container" type="button">
                                            Siguiente
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Inventory Sync Alert */}
                            <div className="p-4 rounded-xl bg-surface-container-lowest shadow-xs flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-[22px]">swap_horizontal_circle</span>
                                    <div className="flex flex-col">
                                        <span className="font-label-md text-label-md font-semibold text-on-surface">Bodega Central Bogotá conectada con Showroom Flagship</span>
                                        <span className="font-body-sm text-body-sm text-secondary">
                                            Última conciliación automática: hace 47 segundos. Stock reservado expira a los 45 minutos sin confirmación.
                                        </span>
                                    </div>
                                </div>
                                <span className="font-label-caps text-label-caps text-secondary uppercase font-semibold">Live Feed</span>
                            </div>
                        </div>
                        {/* RIGHT COLUMN: Active Inspection & Stock Validation Drawer (5 Cols Desktop) */}
                        <div className="xl:col-span-5 flex flex-col gap-5 sticky top-20">
                            {/* Inspector Panel Wrapper */}
                            <div className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col">
                                {/* Detail Header */}
                                <div className="p-5 bg-inverse-surface text-surface-container-lowest flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-0.5 rounded-sm bg-primary text-on-primary font-label-caps text-label-caps font-bold">EN INSPECCIÓN</span>
                                            <span className="font-headline-md text-headline-md text-surface-container-lowest font-bold">#ASC-8945</span>
                                        </div>
                                        <span className="px-2.5 py-1 rounded-sm bg-white/10 text-surface-container-lowest font-label-md text-label-md">WhatsApp Concierge</span>
                                    </div>
                                    <div className="flex items-center justify-between text-secondary-fixed-dim font-body-sm text-body-sm">
                                        <div className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                                            <span>Registrado: Hoy, 11:42 AM</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[16px]">person_pin</span>
                                            <span>Asesor: Juan Pérez</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Customer Contact Card */}
                                <div className="p-5 bg-surface-container-low flex flex-col gap-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold font-title-md">LM</div>
                                            <div className="flex flex-col">
                                                <span className="font-title-md text-title-md text-on-surface font-bold leading-tight">Laura Méndez</span>
                                                <span className="font-body-sm text-body-sm text-secondary">Cliente Registrado • 3 compras previas</span>
                                            </div>
                                        </div>
                                        <a href="https://wa.me/573124589021" className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md font-semibold flex items-center gap-1.5 hover:bg-surface-container transition-colors shadow-xs" target="_blank">
                                            <span className="material-symbols-outlined text-[18px] text-tertiary">chat</span>
                                            <span>WhatsApp</span>
                                        </a>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 pt-2 text-on-surface">
                                        <div className="flex flex-col">
                                            <span className="font-label-caps text-label-caps uppercase text-secondary">Teléfono de Enlace</span>
                                            <span className="font-body-md text-body-md font-semibold text-on-surface">+57 312 458 9021</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-label-caps text-label-caps uppercase text-secondary">Ciudad &amp; Destino</span>
                                            <span className="font-body-md text-body-md font-semibold text-on-surface">Medellín, Antioquia</span>
                                        </div>
                                        <div className="col-span-2 flex flex-col">
                                            <span className="font-label-caps text-label-caps uppercase text-secondary">Dirección de Entrega</span>
                                            <span className="font-body-md text-body-md text-on-surface">Cl. 10 #43E-20, Barrio El Poblado, Apto 502</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Product Stock Verification Section */}
                                <div className="p-5 flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <span className="font-label-caps text-label-caps uppercase text-secondary tracking-wider">Prendas Solicitadas &amp; Stock en Bodega</span>
                                        <span className="font-label-caps text-label-caps text-tertiary uppercase font-bold flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                                            {' '}
                                            Stock Sincronizado
                                        </span>
                                    </div>
                                    {/* Product Item 1 */}
                                    <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-3">
                                        <div className="flex gap-3">
                                            <img className="w-16 h-20 rounded-lg object-cover bg-surface-container shrink-0" data-alt="High luxury black contour mesh women bodysuit fashion garment studio flat lay photography on neutral warm grey background minimalist aesthetic" src="/images/ascend/high-luxury-black-contour-mesh-women.jpg" />
                                            <div className="flex flex-col flex-1 justify-between">
                                                <div className="flex flex-col">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <span className="font-title-md text-title-md text-on-surface font-semibold leading-snug">Body 'Contour Mesh'</span>
                                                        <span className="font-title-md text-title-md text-on-surface font-bold whitespace-nowrap">$90.000 COP</span>
                                                    </div>
                                                    <span className="font-body-sm text-body-sm text-secondary">SKU: BOD-BLK-M</span>
                                                </div>
                                                <div className="flex items-center gap-2 pt-1">
                                                    <span className="px-2 py-0.5 rounded-sm bg-surface-container font-label-caps text-label-caps font-semibold text-on-surface">
                                                        Talla: M
                                                    </span>
                                                    <span className="px-2 py-0.5 rounded-sm bg-surface-container font-label-caps text-label-caps font-semibold text-on-surface">
                                                        Color: Negro
                                                    </span>
                                                    <span className="font-body-sm text-body-sm text-secondary font-medium ml-auto">Cant: 1 ud</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Stock Availability Bar Item 1 */}
                                        <div className="px-3 py-2 rounded-lg bg-surface-container-lowest flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
                                                <div className="flex flex-col">
                                                    <span className="font-label-md text-label-md font-semibold text-on-surface">6 uds disponibles en Almacén Central</span>
                                                    <span className="font-body-sm text-body-sm text-secondary">Requerido: 1 ud (Quedarán 5 tras confirmación)</span>
                                                </div>
                                            </div>
                                            <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase bg-tertiary-container/10 text-tertiary">DISPONIBLE</span>
                                        </div>
                                    </div>
                                    {/* Product Item 2 */}
                                    <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-3">
                                        <div className="flex gap-3">
                                            <img className="w-16 h-20 rounded-lg object-cover bg-surface-container shrink-0" data-alt="Editorial tailored structured crimson red siren corset top with satin finish and boning fashion luxury apparel clean white backdrop" src="/images/ascend/editorial-tailored-structured-crimson-red-siren.jpg" />
                                            <div className="flex flex-col flex-1 justify-between">
                                                <div className="flex flex-col">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <span className="font-title-md text-title-md text-on-surface font-semibold leading-snug">Corset Estructurado 'Siren'</span>
                                                        <span className="font-title-md text-title-md text-on-surface font-bold whitespace-nowrap">$120.000 COP</span>
                                                    </div>
                                                    <span className="font-body-sm text-body-sm text-secondary">SKU: COR-RED-S</span>
                                                </div>
                                                <div className="flex items-center gap-2 pt-1">
                                                    <span className="px-2 py-0.5 rounded-sm bg-surface-container font-label-caps text-label-caps font-semibold text-on-surface">
                                                        Talla: S
                                                    </span>
                                                    <span className="px-2 py-0.5 rounded-sm bg-primary-container/10 font-label-caps text-label-caps font-semibold text-primary">
                                                        Rojo Carmín
                                                    </span>
                                                    <span className="font-body-sm text-body-sm text-secondary font-medium ml-auto">Cant: 1 ud</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Stock Availability Bar Item 2 */}
                                        <div className="px-3 py-2 rounded-lg bg-surface-container-lowest flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
                                                <div className="flex flex-col">
                                                    <span className="font-label-md text-label-md font-semibold text-on-surface">4 uds disponibles en Almacén Central</span>
                                                    <span className="font-body-sm text-body-sm text-secondary">Requerido: 1 ud (Quedarán 3 tras confirmación)</span>
                                                </div>
                                            </div>
                                            <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase bg-tertiary-container/10 text-tertiary">DISPONIBLE</span>
                                        </div>
                                    </div>
                                    {/* Financial Summary Box */}
                                    <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-2">
                                        <div className="flex justify-between font-body-sm text-body-sm text-secondary">
                                            <span>Subtotal (2 prendas)</span>
                                            <span>$210.000 COP</span>
                                        </div>
                                        <div className="flex justify-between font-body-sm text-body-sm text-secondary">
                                            <span>Descuento aplicado (Cupón $0)</span>
                                            <span>-$0 COP</span>
                                        </div>
                                        <div className="flex justify-between font-body-sm text-body-sm text-secondary">
                                            <span>Tarifa de Envío Nacional</span>
                                            <span className="font-semibold text-tertiary">GRATIS (Concierge)</span>
                                        </div>
                                        <div className="pt-2 mt-1 border-t border-surface-container flex justify-between items-baseline text-on-surface">
                                            <span className="font-label-lg text-label-lg font-bold">Total a Cobrar</span>
                                            <span className="font-headline-md text-headline-md font-bold text-primary">$210.000 COP</span>
                                        </div>
                                    </div>
                                    {/* Internal Vendor Notes Section */}
                                    <div className="flex flex-col gap-2.5">
                                        <div className="flex items-center justify-between">
                                            <span className="font-label-caps text-label-caps uppercase text-secondary tracking-wider">Bitácora Interna del Asesor</span>
                                            <span className="font-label-caps text-label-caps text-secondary">Confidencial</span>
                                        </div>
                                        {/* Previous Note Item */}
                                        <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-1 text-on-surface">
                                            <div className="flex items-center justify-between font-body-sm text-body-sm text-secondary">
                                                <span className="font-semibold text-on-surface">Juan Pérez (Tú)</span>
                                                <span className="font-label-caps text-[10px]">11:45 AM</span>
                                            </div>
                                            <p className="font-body-sm text-body-sm text-on-surface">
                                                Cliente envió comprobante de transferencia Bancolombia #88291. Se verificó abono en cuenta comercial de la boutique.
                                            </p>
                                        </div>
                                        {/* Add New Note Form */}
                                        <div className="flex flex-col gap-2">
                                            <textarea className="w-full p-2.5 rounded-lg bg-surface-container-low text-on-surface placeholder:text-secondary font-body-sm text-body-sm outline-hidden resize-none focus:bg-surface-container transition-colors" placeholder="Escribe observaciones adicionales para bodega o despacho..." rows="2" />
                                            <div className="flex justify-end">
                                                <button className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md font-medium transition-colors" type="button">
                                                    Añadir Nota
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Safeguard Warning Callout */}
                                    <div className="p-3.5 rounded-xl bg-tertiary-container/10 flex items-start gap-3">
                                        <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5">inventory</span>
                                        <p className="font-body-sm text-body-sm text-on-surface">
                                            <strong className="font-semibold text-tertiary">Stock comprobado exitosamente.</strong>
                                            {' '}
                                            Al confirmar, el sistema reservará de manera inmediata y definitiva 1 unidad de BOD-BLK-M y 1 unidad de COR-RED-S, enviando la orden a mesa de empaque.
                                        </p>
                                    </div>
                                    {/* Action Buttons Block */}
                                    <div className="flex flex-col gap-2.5 pt-2">
                                        <button
                                            className={`w-full h-11 px-4 rounded-lg ${confirmState === 'done' ? 'bg-tertiary' : 'bg-primary hover:bg-on-primary-fixed-variant'} ${confirmState === 'processing' ? 'opacity-75' : ''} text-on-primary font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99]`}
                                            id="confirmOrderBtn"
                                            type="button"
                                            onClick={confirmOrder}
                                        >
                                            {confirmState === 'idle' && (
                                                <>
                                                    <span className="material-symbols-outlined text-[20px]">check</span>
                                                    <span>Confirmar Pedido y Descontar Stock</span>
                                                </>
                                            )}
                                            {confirmState === 'processing' && (
                                                <>
                                                    <span className="material-symbols-outlined animate-spin text-[20px]">autorenew</span>
                                                    <span>Descontando Stock e Imprimiendo Rótulo...</span>
                                                </>
                                            )}
                                            {confirmState === 'done' && (
                                                <>
                                                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                                                    <span>¡Pedido #ASC-8945 Confirmado Exitosamente!</span>
                                                </>
                                            )}
                                        </button>
                                        <div className="grid grid-cols-2 gap-2">
                                            {/* Reject Action with Reason Select */}
                                            <div className="relative">
                                                <select className="w-full h-10 pl-3 pr-7 rounded-lg bg-error-container/20 text-error font-label-md text-label-md font-semibold appearance-none outline-hidden cursor-pointer" defaultValue="">
                                                    <option disabled value="">Rechazar Pedido...</option>
                                                    <option value="sin_comprobante">Sin Comprobante Válido</option>
                                                    <option value="cancelacion_cliente">Solicitud de Cliente</option>
                                                    <option value="datos_incompletos">Datos Incompletos</option>
                                                </select>
                                                {' '}
                                                <span className="material-symbols-outlined absolute right-2 top-2.5 text-error text-[18px] pointer-events-none">expand_more</span>
                                            </div>
                                            {/* Secondary Action WhatsApp */}
                                            <a href="https://wa.me/573124589021" className="h-10 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 transition-colors" target="_blank">
                                                <span className="material-symbols-outlined text-[18px] text-tertiary">send</span>
                                                <span>Notificar Guía</span>
                                            </a>
                                        </div>
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
