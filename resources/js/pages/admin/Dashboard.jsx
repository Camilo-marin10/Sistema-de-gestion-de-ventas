import { useState } from 'react';
import { Link } from 'react-router-dom';

const PERIODS = ['Hoy', 'Esta semana', 'Últimos 30 días'];

export default function AdminDashboard() {
    const [period, setPeriod] = useState(PERIODS[2]);

    return (
        <>
            <div className="flex flex-col w-full gap-space-xl">
                {/* Top Control Bar / Operational Header */}
                <section className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
                    <div className="flex flex-col gap-space-xs">
                        <div className="flex items-center gap-space-xs text-secondary font-label-caps text-label-caps tracking-widest uppercase">
                            <span>Inicio</span>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-primary font-bold">Dashboard Operativo</span>
                        </div>
                        <div className="flex items-baseline gap-space-md">
                            <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight">Panel de Control Principal</h1>
                            <span className="hidden lg:inline-flex items-center gap-1 font-label-md text-label-md text-tertiary bg-tertiary-fixed/30 px-2 py-0.5 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
                                {' '}
                                Sistema en tiempo real
                            </span>
                        </div>
                    </div>
                    {/* Actions & Date Range Switcher */}
                    <div className="flex flex-wrap items-center gap-space-sm">
                        <div className="bg-surface-container-lowest p-1 rounded-lg shadow-xs flex items-center">
                            {PERIODS.map((label) => (
                                <button
                                    key={label}
                                    type="button"
                                    onClick={() => setPeriod(label)}
                                    className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md transition-all ${
                                        period === label ? 'bg-inverse-surface text-inverse-on-surface shadow-xs' : 'text-on-surface hover:bg-surface-container'
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                        <button className="flex items-center gap-space-xs bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg px-space-md h-10 rounded-lg shadow-xs transition-all duration-150" type="button">
                            <span className="material-symbols-outlined text-[18px]">file_download</span>
                            <span>Exportar Reporte</span>
                        </button>
                    </div>
                </section>
                {/* High-Density Fashion KPIs Grid */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
                    {/* KPI 1: Critical Attention */}
                    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
                        <div className="flex items-center justify-between">
                            <span className="font-label-caps text-label-caps uppercase text-secondary font-semibold">Pedidos Pendientes</span>
                            <span className="material-symbols-outlined text-primary text-[20px]">pending_actions</span>
                        </div>
                        <div className="my-space-md flex items-baseline gap-space-sm">
                            <span className="font-display-lg text-display-lg text-primary tracking-tight">28</span>
                            <span className="font-label-md text-label-md text-primary font-semibold bg-error-container/60 px-2 py-0.5 rounded-sm">Acción prioritaria</span>
                        </div>
                        <div className="flex items-center gap-1 font-body-sm text-body-sm text-primary">
                            <span className="material-symbols-outlined text-[16px]">priority_high</span>
                            <span>Requieren validación de stock</span>
                        </div>
                    </div>
                    {/* KPI 2: Confirmed Orders */}
                    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center justify-between">
                            <span className="font-label-caps text-label-caps uppercase text-secondary font-semibold">Ventas Confirmadas</span>
                            <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                        </div>
                        <div className="my-space-md flex items-baseline gap-space-sm">
                            <span className="font-display-lg text-display-lg text-on-surface tracking-tight">342</span>
                            <span className="font-label-md text-label-md text-tertiary font-semibold flex items-center">
                                <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                                {' '}
                                +14.2%
                            </span>
                        </div>
                        <span className="font-body-sm text-body-sm text-secondary">vs. 299 mes anterior</span>
                    </div>
                    {/* KPI 3: Total Revenue Period */}
                    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center justify-between">
                            <span className="font-label-caps text-label-caps uppercase text-secondary font-semibold">Ingresos del Período</span>
                            <span className="material-symbols-outlined text-secondary text-[20px]">payments</span>
                        </div>
                        <div className="my-space-md flex flex-col">
                            <span className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight text-truncate">
                                $48.650.000
                                {' '}
                                <span className="font-label-caps text-label-caps text-secondary font-medium">COP</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-tertiary">
                            <span className="material-symbols-outlined text-[16px]">trending_up</span>
                            <span>+18.4% margen bruto proyectado</span>
                        </div>
                    </div>
                    {/* KPI 4: Active Catalog Split */}
                    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center justify-between">
                            <span className="font-label-caps text-label-caps uppercase text-secondary font-semibold">Catálogo Activo</span>
                            <span className="material-symbols-outlined text-secondary text-[20px]">styler</span>
                        </div>
                        <div className="my-space-md flex items-baseline gap-space-sm">
                            <span className="font-display-lg text-display-lg text-on-surface tracking-tight">156</span>
                            <span className="font-label-md text-label-md text-secondary">SKUs en vivo</span>
                        </div>
                        <div className="flex items-center justify-between font-label-md text-label-md text-secondary pt-1">
                            <span>
                                Hombre:
                                {' '}
                                <strong className="text-on-surface font-semibold">84</strong>
                            </span>
                            <span>•</span>
                            <span>
                                Mujer:
                                {' '}
                                <strong className="text-on-surface font-semibold">72</strong>
                            </span>
                        </div>
                    </div>
                </section>
                {/* Secondary Ribbon Metrics */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                    {/* Alert Stock Strip */}
                    <div className="bg-surface-container-lowest rounded-xl px-space-lg py-space-md shadow-xs flex items-center justify-between">
                        <div className="flex items-center gap-space-md">
                            <div className="w-10 h-10 rounded-lg bg-error-container/40 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-[22px]">inventory_2</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-label-caps text-label-caps uppercase text-secondary font-semibold">Alertas de Stock</span>
                                <span className="font-title-md text-title-md text-on-surface font-semibold">6 con stock crítico</span>
                            </div>
                        </div>
                        <span className="font-label-md text-label-md text-primary font-semibold bg-error-container/50 px-2.5 py-1 rounded-md">2 Agotados</span>
                    </div>
                    {/* Active Customers */}
                    <div className="bg-surface-container-lowest rounded-xl px-space-lg py-space-md shadow-xs flex items-center justify-between">
                        <div className="flex items-center gap-space-md">
                            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface">
                                <span className="material-symbols-outlined text-[22px]">group</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-label-caps text-label-caps uppercase text-secondary font-semibold">Clientes Registrados</span>
                                <span className="font-title-md text-title-md text-on-surface font-semibold">1.840 usuarios</span>
                            </div>
                        </div>
                        <span className="font-label-md text-label-md text-tertiary font-semibold flex items-center">
                            <span className="material-symbols-outlined text-[16px]">person_add</span>
                            {' '}
                            +48 esta sem.
                        </span>
                    </div>
                    {/* Sales Reps */}
                    <div className="bg-surface-container-lowest rounded-xl px-space-lg py-space-md shadow-xs flex items-center justify-between">
                        <div className="flex items-center gap-space-md">
                            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface">
                                <span className="material-symbols-outlined text-[22px]">storefront</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-label-caps text-label-caps uppercase text-secondary font-semibold">Fuerza de Venta</span>
                                <span className="font-title-md text-title-md text-on-surface font-semibold">8 asesores en línea</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                            <span className="font-label-md text-label-md text-on-surface font-semibold">100% activo</span>
                        </div>
                    </div>
                </section>
                {/* Analytical Data Visualizations */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
                    {/* Main Revenue & Sales Curve (8 Cols) */}
                    <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-space-lg shadow-xs flex flex-col justify-between">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-lg gap-space-sm">
                            <div className="flex flex-col">
                                <span className="font-label-caps text-label-caps uppercase text-secondary tracking-widest font-semibold">Curva de Rendimiento</span>
                                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Ventas e Ingresos Mensuales</h2>
                            </div>
                            <div className="flex items-center gap-space-md font-label-md text-label-md">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-3 h-3 rounded-full bg-primary-container" />
                                    <span className="text-on-surface font-medium">Ingresos COP</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-3 h-3 rounded-full bg-secondary-fixed-dim" />
                                    <span className="text-secondary font-medium">Unidades Vendidas</span>
                                </div>
                            </div>
                        </div>
                        {/* High-End Minimalist Vector Chart */}
                        <div className="relative w-full h-72 flex flex-col justify-end">
                            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 700 240">
                                <defs>
                                    <lineargradient id="ascendCrimsonFade" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#C62835" stopOpacity="0.25" />
                                        <stop offset="100%" stopColor="#C62835" stopOpacity="0.0" />
                                    </lineargradient>
                                    <lineargradient id="ascendNeutralFade" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#A0A0A0" stopOpacity="0.1" />
                                        <stop offset="100%" stopColor="#A0A0A0" stopOpacity="0.0" />
                                    </lineargradient>
                                </defs>
                                {/* Horizontal Grid Lines */}
                                <line stroke="#f0f0f0" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="700" y1="20" y2="20" />
                                <line stroke="#f0f0f0" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="700" y1="80" y2="80" />
                                <line stroke="#f0f0f0" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="700" y1="140" y2="140" />
                                <line stroke="#f0f0f0" strokeWidth="1" x1="0" x2="700" y1="200" y2="200" />
                                {/* Secondary Curve (Units) */}
                                <path d="M 0 170 C 100 160, 150 140, 230 145 C 320 150, 420 120, 500 100 C 580 80, 640 90, 700 70" fill="none" stroke="#C8C6C5" strokeLinecap="round" strokeWidth="2" />
                                {/* Primary Curve Filled Area (Revenue) */}
                                <path d="M 0 190 C 80 180, 140 110, 220 130 C 300 150, 400 90, 480 60 C 560 30, 620 45, 700 25 L 700 200 L 0 200 Z" fill="url(#ascendCrimsonFade)" />
                                {/* Primary Curve Stroke */}
                                <path d="M 0 190 C 80 180, 140 110, 220 130 C 300 150, 400 90, 480 60 C 560 30, 620 45, 700 25" fill="none" stroke="#C62835" strokeLinecap="round" strokeWidth="3.5" />
                                {/* Data Points */}
                                <circle cx="220" cy="130" fill="#FFFFFF" r="4" stroke="#C62835" strokeWidth="2.5" />
                                <circle cx="480" cy="60" fill="#FFFFFF" r="4" stroke="#C62835" strokeWidth="2.5" />
                                <circle cx="700" cy="25" fill="#C62835" r="5" stroke="#FFFFFF" strokeWidth="2" />
                            </svg>
                            <div className="flex justify-between items-center pt-space-sm text-secondary font-label-caps text-label-caps uppercase">
                                <span>Sem 1</span>
                                <span>Sem 2</span>
                                <span>Sem 3</span>
                                <span>Sem 4</span>
                                <span>Cierre Mes (Hoy)</span>
                            </div>
                        </div>
                        {/* Quick Metrics Summary */}
                        <div className="grid grid-cols-3 gap-space-md pt-space-lg mt-space-md bg-surface-container-low/60 p-space-md rounded-lg">
                            <div>
                                <span className="font-label-caps text-label-caps uppercase text-secondary">Ticket Promedio</span>
                                <p className="font-title-md text-title-md text-on-surface font-bold">$142.250 COP</p>
                            </div>
                            <div>
                                <span className="font-label-caps text-label-caps uppercase text-secondary">Tasa Conversión</span>
                                <p className="font-title-md text-title-md text-tertiary font-bold">3.82%</p>
                            </div>
                            <div>
                                <span className="font-label-caps text-label-caps uppercase text-secondary">Retorno de Carrito</span>
                                <p className="font-title-md text-title-md text-on-surface font-bold">22.4%</p>
                            </div>
                        </div>
                    </div>
                    {/* Distribution by Order Status (4 Cols) */}
                    <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-space-lg shadow-xs flex flex-col justify-between">
                        <div className="flex flex-col">
                            <span className="font-label-caps text-label-caps uppercase text-secondary tracking-widest font-semibold">Embudo de Operaciones</span>
                            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Distribución por Estado</h2>
                        </div>
                        {/* Donut Chart Representation */}
                        <div className="relative flex items-center justify-center my-space-md">
                            <svg className="w-48 h-48 -rotate-90" viewBox="0 0 160 160">
                                {/* Background Track */}
                                <circle cx="80" cy="80" fill="transparent" r="60" stroke="#F5F3F3" strokeWidth="16" />
                                {/* Confirmado: 52% (dasharray ~196 of 376.99) */}
                                <circle cx="80" cy="80" fill="transparent" r="60" stroke="#007283" strokeDasharray="196 377" strokeDashoffset="0" strokeWidth="16" />
                                {/* En Preparacion: 24% (dasharray ~90.5 of 376.99) */}
                                <circle cx="80" cy="80" fill="transparent" r="60" stroke="#5F5E5E" strokeDasharray="90.5 377" strokeDashoffset="-196" strokeWidth="16" />
                                {/* Pendiente: 12% (dasharray ~45.2 of 376.99) */}
                                <circle cx="80" cy="80" fill="transparent" r="60" stroke="#C62835" strokeDasharray="45.2 377" strokeDashoffset="-286.5" strokeWidth="16" />
                                {/* Cancelado: 12% (dasharray ~45.2 of 376.99) */}
                                <circle cx="80" cy="80" fill="transparent" r="60" stroke="#E2DFDE" strokeDasharray="45.2 377" strokeDashoffset="-331.7" strokeWidth="16" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="font-label-caps text-label-caps text-secondary uppercase font-semibold">Total</span>
                                <span className="font-display-lg text-display-lg text-on-surface font-bold leading-none">388</span>
                                <span className="font-label-caps text-label-caps text-secondary">Órdenes</span>
                            </div>
                        </div>
                        {/* Legend with Status Specific Tokens */}
                        <div className="flex flex-col gap-space-xs font-label-md text-label-md">
                            <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-container-low transition-colors">
                                <div className="flex items-center gap-space-sm">
                                    <span className="w-3 h-3 rounded-full bg-tertiary-container" />
                                    <span className="text-on-surface font-medium">Confirmado</span>
                                </div>
                                <span className="font-title-md text-title-md text-on-surface font-semibold">
                                    52%
                                    {' '}
                                    <span className="font-body-sm text-body-sm text-secondary font-normal">(202)</span>
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-container-low transition-colors">
                                <div className="flex items-center gap-space-sm">
                                    <span className="w-3 h-3 rounded-full bg-secondary" />
                                    <span className="text-on-surface font-medium">En Preparación</span>
                                </div>
                                <span className="font-title-md text-title-md text-on-surface font-semibold">
                                    24%
                                    {' '}
                                    <span className="font-body-sm text-body-sm text-secondary font-normal">(93)</span>
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-1.5 rounded-lg bg-primary/5">
                                <div className="flex items-center gap-space-sm">
                                    <span className="w-3 h-3 rounded-full bg-primary-container" />
                                    <span className="text-primary font-bold">Pendiente (Stock)</span>
                                </div>
                                <span className="font-title-md text-title-md text-primary font-bold">
                                    12%
                                    {' '}
                                    <span className="font-body-sm text-body-sm font-semibold">(28)</span>
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-container-low transition-colors">
                                <div className="flex items-center gap-space-sm">
                                    <span className="w-3 h-3 rounded-full bg-secondary-container" />
                                    <span className="text-secondary font-medium">Cancelado</span>
                                </div>
                                <span className="font-title-md text-title-md text-secondary font-semibold">
                                    12%
                                    {' '}
                                    <span className="font-body-sm text-body-sm text-secondary font-normal">(45)</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Critical Operational Table: Stock Attention */}
                <section className="bg-surface-container-lowest rounded-xl shadow-xs overflow-hidden flex flex-col">
                    <div className="px-space-lg py-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-md bg-surface-container-lowest">
                        <div className="flex items-center gap-space-sm">
                            <div className="w-3 h-3 rounded-full bg-primary-container" />
                            <div className="flex flex-col">
                                <h2 className="font-title-md text-title-md text-on-surface font-bold">Pedidos que Requieren Atención Inmediata</h2>
                                <span className="font-body-sm text-body-sm text-secondary">Órdenes retenidas por discrepancia o bajo volumen de inventario</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-space-sm">
                            <span className="font-label-caps text-label-caps uppercase bg-error-container text-on-error-container px-2 py-1 rounded-sm font-bold">
                                5 Casos críticos
                            </span>
                            <Link to="/admin/pedidos" className="text-primary hover:text-on-primary-fixed-variant font-label-md text-label-md font-semibold underline flex items-center">
                                Ver todos los pendientes
                                {' '}
                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                    {/* Table Responsive Layout */}
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-surface-container-low text-secondary font-label-caps text-label-caps uppercase">
                                <tr>
                                    <th className="py-3 px-space-lg font-semibold">Pedido ID</th>
                                    <th className="py-3 px-space-md font-semibold">Prenda / SKU</th>
                                    <th className="py-3 px-space-md font-semibold">Cliente</th>
                                    <th className="py-3 px-space-md font-semibold">Canal de Venta</th>
                                    <th className="py-3 px-space-md font-semibold">Balance Stock</th>
                                    <th className="py-3 px-space-md font-semibold text-right">Total Monto</th>
                                    <th className="py-3 px-space-lg font-semibold text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-surface-container text-body-md font-body-md">
                                {/* Row 1 (User Prompt Focus: Camiseta Oversize) */}
                                <tr className="hover:bg-surface-container/50 transition-colors">
                                    <td className="py-space-md px-space-lg font-semibold text-primary">#ASC-8941</td>
                                    <td className="py-space-md px-space-md">
                                        <div className="flex items-center gap-space-sm">
                                            <img className="w-10 h-10 object-cover rounded-md shrink-0" data-alt="High-end studio product shot of an ASCEND luxury heavyweight black oversize t-shirt on a crisp architectural pedestal with dramatic minimalist studio lighting" src="/images/ascend/high-end-studio-product-shot-of.jpg" />
                                            <div className="flex flex-col">
                                                <span className="font-label-lg text-label-lg font-bold text-on-surface">Camiseta Oversize Negra</span>
                                                <span className="font-body-sm text-body-sm text-secondary">Talla L • Heavy Cotton 280g</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md">
                                        <div className="flex flex-col">
                                            <span className="text-on-surface font-medium">Mateo Gómez</span>
                                            <span className="font-body-sm text-body-sm text-secondary">Medellín, CO</span>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md">
                                        <span className="inline-flex items-center gap-1 font-label-md text-label-md px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                                            <span className="material-symbols-outlined text-[14px]">chat</span>
                                            {' '}
                                            WhatsApp Concierge
                                        </span>
                                    </td>
                                    <td className="py-space-md px-space-md">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-1 font-label-md text-label-md">
                                                <span className="text-on-surface font-semibold">Disponible: 4</span>
                                                <span className="text-secondary">/</span>
                                                <span className="text-primary font-bold">Solicitado: 2</span>
                                            </div>
                                            <span className="font-label-caps text-label-caps text-primary font-bold uppercase">Últimas 2 en rack</span>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md text-right font-title-md text-title-md font-bold text-on-surface">
                                        $145.000
                                        {' '}
                                        <span className="font-label-caps text-label-caps font-normal text-secondary">COP</span>
                                    </td>
                                    <td className="py-space-md px-space-lg text-center">
                                        <div className="flex items-center justify-center gap-space-xs">
                                            <button className="h-8 px-space-sm bg-primary-container text-on-primary font-label-md text-label-md rounded-md hover:bg-primary transition-colors" type="button">
                                                Aprobar
                                            </button>
                                            <button className="h-8 px-space-sm bg-surface-container text-on-surface font-label-md text-label-md rounded-md hover:bg-surface-container-high transition-colors" type="button">
                                                Reasignar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {/* Row 2: Bodysuit */}
                                <tr className="hover:bg-surface-container/50 transition-colors">
                                    <td className="py-space-md px-space-lg font-semibold text-primary">#ASC-8940</td>
                                    <td className="py-space-md px-space-md">
                                        <div className="flex items-center gap-space-sm">
                                            <img className="w-10 h-10 object-cover rounded-md shrink-0" data-alt="High fashion editorial photography of an ASCEND sculptural compression bodysuit in beige nude tones, smooth studio background with soft directional light" src="/images/ascend/high-fashion-editorial-photography-of-an.jpg" />
                                            <div className="flex flex-col">
                                                <span className="font-label-lg text-label-lg font-bold text-on-surface">Body Esculpidor Seamless</span>
                                                <span className="font-body-sm text-body-sm text-secondary">Talla S • Arena Neutro</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md">
                                        <div className="flex flex-col">
                                            <span className="text-on-surface font-medium">Camila Rincón</span>
                                            <span className="font-body-sm text-body-sm text-secondary">Bogotá, CO</span>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md">
                                        <span className="inline-flex items-center gap-1 font-label-md text-label-md px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-semibold">
                                            <span className="material-symbols-outlined text-[14px]">language</span>
                                            {' '}
                                            Web Directa
                                        </span>
                                    </td>
                                    <td className="py-space-md px-space-md">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-1 font-label-md text-label-md">
                                                <span className="text-primary font-bold">Disponible: 1</span>
                                                <span className="text-secondary">/</span>
                                                <span className="text-on-surface font-semibold">Solicitado: 1</span>
                                            </div>
                                            <span className="font-label-caps text-label-caps text-primary font-bold uppercase">Stock Cero Al Asignar</span>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md text-right font-title-md text-title-md font-bold text-on-surface">
                                        $189.000
                                        {' '}
                                        <span className="font-label-caps text-label-caps font-normal text-secondary">COP</span>
                                    </td>
                                    <td className="py-space-md px-space-lg text-center">
                                        <div className="flex items-center justify-center gap-space-xs">
                                            <button className="h-8 px-space-sm bg-primary-container text-on-primary font-label-md text-label-md rounded-md hover:bg-primary transition-colors" type="button">
                                                Aprobar
                                            </button>
                                            <button className="h-8 px-space-sm bg-surface-container text-on-surface font-label-md text-label-md rounded-md hover:bg-surface-container-high transition-colors" type="button">
                                                Reasignar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {/* Row 3: Corset Atelier */}
                                <tr className="hover:bg-surface-container/50 transition-colors">
                                    <td className="py-space-md px-space-lg font-semibold text-primary">#ASC-8937</td>
                                    <td className="py-space-md px-space-md">
                                        <div className="flex items-center gap-space-sm">
                                            <img className="w-10 h-10 object-cover rounded-md shrink-0" data-alt="Detail shot of a tailored architectural black corset with boning and subtle matte silver metallic eyelets, luxury fashion runway aesthetic" src="/images/ascend/detail-shot-of-a-tailored-architectural.jpg" />
                                            <div className="flex flex-col">
                                                <span className="font-label-lg text-label-lg font-bold text-on-surface">Corset Estructural Ébano</span>
                                                <span className="font-body-sm text-body-sm text-secondary">Talla M • Línea Atelier</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md">
                                        <div className="flex flex-col">
                                            <span className="text-on-surface font-medium">Sofía Vergara D.</span>
                                            <span className="font-body-sm text-body-sm text-secondary">Cali, CO</span>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md">
                                        <span className="inline-flex items-center gap-1 font-label-md text-label-md px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-semibold">
                                            <span className="material-symbols-outlined text-[14px]">storefront</span>
                                            {' '}
                                            Showroom El Poblado
                                        </span>
                                    </td>
                                    <td className="py-space-md px-space-md">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-1 font-label-md text-label-md">
                                                <span className="text-primary font-bold">Disponible: 0</span>
                                                <span className="text-secondary">/</span>
                                                <span className="text-primary font-bold">Solicitado: 1</span>
                                            </div>
                                            <span className="font-label-caps text-label-caps text-error font-bold uppercase">Quiebre Inmediato</span>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md text-right font-title-md text-title-md font-bold text-on-surface">
                                        $290.000
                                        {' '}
                                        <span className="font-label-caps text-label-caps font-normal text-secondary">COP</span>
                                    </td>
                                    <td className="py-space-md px-space-lg text-center">
                                        <div className="flex items-center justify-center gap-space-xs">
                                            <button className="h-8 px-space-sm bg-error text-on-error font-label-md text-label-md rounded-md hover:bg-primary transition-colors" type="button">
                                                Traspaso Bodega
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                {/* Bottom Split Grid: Top Selling Items & Real-Time Operational Logs */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
                    {/* Top Best Sellers (7 Cols) */}
                    <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg shadow-xs flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-space-md">
                            <div className="flex flex-col">
                                <span className="font-label-caps text-label-caps uppercase text-secondary tracking-widest font-semibold">Rendimiento de Línea</span>
                                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Top Productos Más Vendidos</h3>
                            </div>
                            <span className="font-label-md text-label-md text-secondary font-medium">Últimos 30 días</span>
                        </div>
                        <div className="flex flex-col divide-y divide-surface-container">
                            {/* Product 1 */}
                            <div className="py-space-md flex items-center justify-between gap-space-md">
                                <div className="flex items-center gap-space-md min-w-0">
                                    <span className="font-label-caps text-label-caps font-bold text-secondary w-4">01</span>
                                    <img className="w-12 h-12 object-cover rounded-lg shrink-0" data-alt="Commercial catalog photo of ASCEND signature oversized boxy t-shirt folded neatly on a slate surface, monochromatic style" src="/images/ascend/commercial-catalog-photo-of-ascend-signature.jpg" />
                                    <div className="flex flex-col min-w-0">
                                        <span className="font-title-md text-title-md text-on-surface font-bold truncate">Camiseta Oversize Heavyweight</span>
                                        <span className="font-body-sm text-body-sm text-secondary">Hombre • 5 Colores • Algodón 280g</span>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="font-title-md text-title-md text-on-surface font-bold">128 uds.</p>
                                    <span className="font-label-md text-label-md text-tertiary font-medium">$18.560.000 COP</span>
                                </div>
                            </div>
                            {/* Product 2 */}
                            <div className="py-space-md flex items-center justify-between gap-space-md">
                                <div className="flex items-center gap-space-md min-w-0">
                                    <span className="font-label-caps text-label-caps font-bold text-secondary w-4">02</span>
                                    <img className="w-12 h-12 object-cover rounded-lg shrink-0" data-alt="Editorial catalog portrait of a model wearing an ASCEND high-fashion structured nude compression body, minimal clean studio setting" src="/images/ascend/editorial-catalog-portrait-of-a-model.jpg" />
                                    <div className="flex flex-col min-w-0">
                                        <span className="font-title-md text-title-md text-on-surface font-bold truncate">Body Minimalista Seamless</span>
                                        <span className="font-body-sm text-body-sm text-secondary">Mujer • 3 Tonos • Spandex Microfibra</span>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="font-title-md text-title-md text-on-surface font-bold">94 uds.</p>
                                    <span className="font-label-md text-label-md text-tertiary font-medium">$15.980.000 COP</span>
                                </div>
                            </div>
                            {/* Product 3 */}
                            <div className="py-space-md flex items-center justify-between gap-space-md">
                                <div className="flex items-center gap-space-md min-w-0">
                                    <span className="font-label-caps text-label-caps font-bold text-secondary w-4">03</span>
                                    <img className="w-12 h-12 object-cover rounded-lg shrink-0" data-alt="Editorial product shot of ASCEND urban leather sneakers with architectural thick sole and sharp paneling on dark background" src="/images/ascend/editorial-product-shot-of-ascend-urban.jpg" />
                                    <div className="flex flex-col min-w-0">
                                        <span className="font-title-md text-title-md text-on-surface font-bold truncate">Tenis Urbanos Monocromáticos</span>
                                        <span className="font-body-sm text-body-sm text-secondary">Unisex • Cuero Genuino Blanco/Negro</span>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="font-title-md text-title-md text-on-surface font-bold">62 uds.</p>
                                    <span className="font-label-md text-label-md text-tertiary font-medium">$19.840.000 COP</span>
                                </div>
                            </div>
                            {/* Product 4 */}
                            <div className="py-space-md flex items-center justify-between gap-space-md">
                                <div className="flex items-center gap-space-md min-w-0">
                                    <span className="font-label-caps text-label-caps font-bold text-secondary w-4">04</span>
                                    <img className="w-12 h-12 object-cover rounded-lg shrink-0" data-alt="Studio fashion shot of modern luxury tailoring corset garment hanging on a brushed metal designer rack, minimalist runway style" src="/images/ascend/studio-fashion-shot-of-modern-luxury.jpg" />
                                    <div className="flex flex-col min-w-0">
                                        <span className="font-title-md text-title-md text-on-surface font-bold truncate">Corset Sastrería Contemporáneo</span>
                                        <span className="font-body-sm text-body-sm text-secondary">Mujer • Edición Limitada Atelier</span>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="font-title-md text-title-md text-on-surface font-bold">48 uds.</p>
                                    <span className="font-label-md text-label-md text-tertiary font-medium">$13.920.000 COP</span>
                                </div>
                            </div>
                        </div>
                        <div className="pt-space-md flex justify-end">
                            <Link to="/admin/productos" className="font-label-md text-label-md text-primary hover:text-on-primary-fixed-variant font-semibold flex items-center gap-1">
                                Ver reporte detallado de productos
                                {' '}
                                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                            </Link>
                        </div>
                    </div>
                    {/* System Live Activity Logs (5 Cols) */}
                    <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-xs flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-space-md">
                            <div className="flex flex-col">
                                <span className="font-label-caps text-label-caps uppercase text-secondary tracking-widest font-semibold">Trazabilidad</span>
                                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Actividad Reciente</h3>
                            </div>
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                        </div>
                        {/* Log Timeline */}
                        <div className="flex flex-col gap-space-lg relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-surface-container">
                            {/* Log Item 1 */}
                            <div className="relative flex flex-col gap-0.5">
                                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-tertiary ring-4 ring-surface-container-lowest" />
                                <div className="flex items-center justify-between">
                                    <span className="font-label-md text-label-md text-on-surface font-bold">Pedido #8930 Confirmado</span>
                                    <span className="font-body-sm text-body-sm text-secondary">Hace 4 min</span>
                                </div>
                                <p className="font-body-sm text-body-sm text-secondary">
                                    El vendedor
                                    {' '}
                                    <strong className="text-on-surface font-medium">Juan P. (WhatsApp)</strong>
                                    {' '}
                                    validó comprobante de transferencia y cerró la orden.
                                </p>
                            </div>
                            {/* Log Item 2 */}
                            <div className="relative flex flex-col gap-0.5">
                                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-surface-container-lowest" />
                                <div className="flex items-center justify-between">
                                    <span className="font-label-md text-label-md text-primary font-bold">Ajuste Manual de Inventario</span>
                                    <span className="font-body-sm text-body-sm text-secondary">Hace 22 min</span>
                                </div>
                                <p className="font-body-sm text-body-sm text-secondary">
                                    <strong className="text-on-surface font-medium">Administrador Principal</strong>
                                    {' '}
                                    ajustó stock de
                                    {' '}
                                    <span className="text-on-surface font-medium">Tenis Urbanos (Talla 41)</span>
                                    {' '}
                                    por ingreso de showroom (+12 uds).
                                </p>
                            </div>
                            {/* Log Item 3 */}
                            <div className="relative flex flex-col gap-0.5">
                                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-secondary ring-4 ring-surface-container-lowest" />
                                <div className="flex items-center justify-between">
                                    <span className="font-label-md text-label-md text-on-surface font-bold">Nuevo Cliente Registrado</span>
                                    <span className="font-body-sm text-body-sm text-secondary">Hace 1 h</span>
                                </div>
                                <p className="font-body-sm text-body-sm text-secondary">
                                    <strong className="text-on-surface font-medium">Valeria Henao</strong>
                                    {' '}
                                    completó registro a través de Campaña Colección Invierno.
                                </p>
                            </div>
                            {/* Log Item 4 */}
                            <div className="relative flex flex-col gap-0.5">
                                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-tertiary-container ring-4 ring-surface-container-lowest" />
                                <div className="flex items-center justify-between">
                                    <span className="font-label-md text-label-md text-on-surface font-bold">Cupón Redimido [ASCENDVIP]</span>
                                    <span className="font-body-sm text-body-sm text-secondary">Hace 2 h</span>
                                </div>
                                <p className="font-body-sm text-body-sm text-secondary">Descuento del 15% aplicado a orden #8928 por valor de $320.000 COP.</p>
                            </div>
                        </div>
                        <div className="pt-space-md border-t border-surface-container flex items-center justify-between">
                            <span className="font-label-caps text-label-caps text-secondary uppercase font-semibold">Base de Auditoría OK</span>
                            <button className="font-label-md text-label-md text-secondary hover:text-on-surface font-medium underline" type="button">Historial completo</button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
