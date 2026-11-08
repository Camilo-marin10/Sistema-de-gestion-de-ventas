import { useState } from 'react';

const FILTERS = [
    { id: 'all', label: 'Todos', count: 3 },
    { id: 'revision', label: 'Pendientes de Revisión', count: 1 },
    { id: 'preparacion', label: 'En Preparación', count: 1 },
    { id: 'completados', label: 'Completados', count: 1 },
];

export default function AccountOrders() {
    const [filter, setFilter] = useState('all');
    const visible = (cat) => (filter === 'all' || filter === cat ? '' : 'hidden');

    return (
        <>
            <div className="flex flex-col w-full">
                <div className="relative bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-xs mb-space-xl overflow-hidden">
                    <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-space-lg">
                        <div className="space-y-space-xs">
                            <div className="flex items-center gap-space-sm">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-caps text-label-caps font-bold tracking-widest uppercase">
                                    Socio VIP ASCEND
                                </span>
                                <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-surface-tint" />
                                    {' '}
                                    Miembro desde 2025
                                </span>
                            </div>
                            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">Hola, Valentina Morales</h1>
                            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                                Supervisión prioritaria y estado logístico en tiempo real de tus adquisiciones de archivo y pasarela.
                            </p>
                        </div>
                        <div className="flex items-center gap-space-md self-start md:self-auto bg-surface-container-low px-space-md py-space-sm rounded-lg">
                            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-xs">
                                <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
                            </div>
                            <div>
                                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block">Nivel de Lealtad</span>
                                {' '}
                                <span className="font-title-md text-title-md text-on-surface font-bold">Gold Tier Concierge</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md mb-space-lg">
                    <div>
                        <div className="flex items-center gap-space-xs text-on-surface-variant mb-space-xxs">
                            <span className="font-label-caps text-label-caps uppercase tracking-wider">Gestión de Cuenta</span>
                            <span className="text-xs">•</span>
                            <span className="font-label-caps text-label-caps text-primary-container font-semibold uppercase tracking-wider">Historial Activo</span>
                        </div>
                        <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">Historial de Mis Pedidos</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                            Consulta el estado de verificación de tus órdenes en bodega y seguimiento de despacho.
                        </p>
                    </div>
                    <div className="flex items-center gap-space-xs p-1 bg-surface-container-high rounded-lg overflow-x-auto max-w-full">
                        {FILTERS.map((f) => (
                            <button
                                key={f.id}
                                type="button"
                                onClick={() => setFilter(f.id)}
                                className={`px-space-md py-1.5 rounded-md font-label-md text-label-md transition-all whitespace-nowrap ${
                                    filter === f.id
                                        ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-xs'
                                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                                }`}
                            >
                                {f.label} <span className="ml-1 text-on-surface-variant font-normal">({f.count})</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="space-y-space-lg mb-space-2xl">
                    <div className={`order-card relative bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-xs transition-all hover:shadow-md ${visible('revision')}`} data-category="revision">
                        <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-primary-container rounded-l-xl" />
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-lg mb-space-lg bg-surface-container-low/40 p-space-md rounded-lg">
                            <div className="flex flex-wrap items-center gap-space-md">
                                <div className="flex items-center gap-space-sm">
                                    <span className="font-title-md text-title-md font-bold text-on-surface">#ASC-8945</span>
                                    <span className="px-2 py-0.5 rounded-sm bg-primary-fixed-dim/40 text-on-primary-fixed font-label-caps text-label-caps font-bold">RECIENTE</span>
                                </div>
                                <span className="hidden sm:inline text-surface-variant">|</span>
                                <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                                    {' '}
                                    Hoy, 11:42 AM
                                </span>
                                <span className="hidden sm:inline text-surface-variant">|</span>
                                <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">support_agent</span>
                                    {' '}
                                    WhatsApp Concierge (+57 300 492 8812)
                                </span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-900 shadow-2xs self-start lg:self-auto">
                                <span className="material-symbols-outlined text-[18px] text-amber-700 animate-spin" style={{ animationDuration: "4s" }}>hourglass_top</span>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-x-2">
                                    <span className="font-label-caps text-label-caps font-bold tracking-wider uppercase text-amber-900">PENDIENTE DE REVISIÓN</span>
                                    <span className="hidden sm:inline text-amber-300">•</span>
                                    <span className="font-body-sm text-body-sm text-amber-800">Verificando existencias físicas en bodega central</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
                            <div className="lg:col-span-7 space-y-space-md">
                                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block">Artículos en Validación (2)</span>
                                <div className="flex items-center gap-space-md p-space-sm rounded-lg bg-surface-container-low/30 hover:bg-surface-container-low transition-colors">
                                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-surface-container-high shrink-0 relative">
                                        <img className="w-full h-full object-cover" data-alt="High-end red carmine structured corset presented in a minimalist studio photoshoot, editorial lighting, luxurious texture, clean backdrop" src="/images/ascend/high-end-red-carmine-structured-corset.jpg" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-title-md text-title-md text-on-surface font-semibold truncate">Corset Estructurado 'Siren'</h4>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Talla S • Rojo Carmín • Colección Cápsula</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="font-label-caps text-label-caps px-1.5 py-0.5 rounded-sm bg-surface-container text-on-surface-variant font-medium">
                                                Pieza de Pasarela
                                            </span>
                                            <span className="font-body-sm text-body-sm text-on-surface font-medium">$210.000 COP</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-space-md p-space-sm rounded-lg bg-surface-container-low/30 hover:bg-surface-container-low transition-colors">
                                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-surface-container-high shrink-0 relative">
                                        <img className="w-full h-full object-cover" data-alt="Premium oversized black boxy t-shirt draped elegantly, luxury streetwear minimalism, soft cinematic shadow" src="/images/ascend/premium-oversized-black-boxy-t-shirt.jpg" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-title-md text-title-md text-on-surface font-semibold truncate">Camiseta Boxy Heavyweight</h4>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Talla M • Negro Puro • Algodón 280 GSM</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="font-label-caps text-label-caps px-1.5 py-0.5 rounded-sm bg-surface-container text-on-surface-variant font-medium">
                                                Básico Esencial
                                            </span>
                                            <span className="font-body-sm text-body-sm text-on-surface font-medium">$104.000 COP</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-5 flex flex-col justify-between bg-surface-container-low p-space-lg rounded-xl">
                                <div>
                                    <div className="flex items-center justify-between pb-space-sm mb-space-sm bg-surface-container/50 px-space-sm py-1 rounded-sm">
                                        <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[16px] text-primary-container">sell</span>
                                            {' '}
                                            Cupón Aplicado
                                        </span>
                                        <span className="font-label-caps text-label-caps font-bold text-primary-container">ASCENDVIP (-10%)</span>
                                    </div>
                                    <div className="space-y-1 text-right mb-space-md">
                                        <span className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider">Total Liquidado</span>
                                        {' '}
                                        <span className="font-headline-lg text-headline-lg text-on-surface font-bold text-primary-container tracking-tight block">
                                            $282.600
                                            {' '}
                                            <span className="font-label-md text-label-md text-on-surface-variant font-normal">COP</span>
                                        </span>
                                        {' '}
                                        <span className="font-body-sm text-body-sm text-on-surface-variant block">Pago contraentrega verificado</span>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-space-sm pt-space-md">
                                    <button className="flex-1 h-10 px-4 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-lg text-label-lg font-semibold shadow-2xs flex items-center justify-center gap-2 transition-all" type="button">
                                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                                        {' '}
                                        Ver Detalle
                                    </button>
                                    <a href="https://wa.me/573004928812" className="flex-1 h-10 px-4 rounded-lg bg-primary-container text-on-primary hover:bg-primary font-label-lg text-label-lg font-semibold shadow-2xs flex items-center justify-center gap-2 transition-all" rel="noopener noreferrer" target="_blank">
                                        <span className="material-symbols-outlined text-[18px]">chat</span>
                                        {' '}
                                        Chatear con Asesor
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`order-card relative bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-xs transition-all hover:shadow-md ${visible('preparacion')}`} data-category="preparacion">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-lg mb-space-lg bg-surface-container-low/40 p-space-md rounded-lg">
                            <div className="flex flex-wrap items-center gap-space-md">
                                <span className="font-title-md text-title-md font-bold text-on-surface">#ASC-8520</span>
                                <span className="hidden sm:inline text-surface-variant">|</span>
                                <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                                    {' '}
                                    14 Feb 2025
                                </span>
                                <span className="hidden sm:inline text-surface-variant">|</span>
                                <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">language</span>
                                    {' '}
                                    Web Directa
                                </span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-50 text-sky-950 shadow-2xs self-start lg:self-auto">
                                <span className="material-symbols-outlined text-[18px] text-sky-700">inventory_2</span>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-x-2">
                                    <span className="font-label-caps text-label-caps font-bold tracking-wider uppercase text-sky-900">EN PREPARACIÓN</span>
                                    <span className="hidden sm:inline text-sky-300">•</span>
                                    <span className="font-body-sm text-body-sm text-sky-800">Empaque y control de calidad en curso</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
                            <div className="lg:col-span-7 space-y-space-md">
                                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block">Artículos en Proceso (1)</span>
                                <div className="flex items-center gap-space-md p-space-sm rounded-lg bg-surface-container-low/30 hover:bg-surface-container-low transition-colors">
                                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-surface-container-high shrink-0 relative">
                                        <img className="w-full h-full object-cover" data-alt="Sculptural white asymmetric bodysuit model shoot, avant-garde tailoring, stark architectural minimalism, pristine clean studio" src="/images/ascend/sculptural-white-asymmetric-bodysuit-model-shoot.jpg" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-title-md text-title-md text-on-surface font-semibold truncate">Body Asimétrico Esculpido 'Nexus'</h4>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Talla S • Blanco Puro • Edición Limitada</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="font-label-caps text-label-caps px-1.5 py-0.5 rounded-sm bg-surface-container text-on-surface-variant font-medium">
                                                Control de Tensión Aprobado
                                            </span>
                                            <span className="font-body-sm text-body-sm text-on-surface font-medium">$160.000 COP</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-space-md rounded-lg bg-surface-container-low/50 flex items-center justify-between">
                                    <div className="flex items-center gap-space-sm">
                                        <span className="material-symbols-outlined text-primary-container text-[20px]">local_shipping</span>
                                        <div>
                                            <span className="font-label-md text-label-md font-semibold text-on-surface block">Transportadora Asignada: Servientrega Express</span>
                                            {' '}
                                            <span className="font-body-sm text-body-sm text-on-surface-variant">Guía: SER-992014902-CO • Destino: El Poblado, Medellín</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-5 flex flex-col justify-between bg-surface-container-low p-space-lg rounded-xl">
                                <div className="space-y-1 text-right mb-space-md">
                                    <span className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider">Total Registrado</span>
                                    {' '}
                                    <span className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight block">
                                        $160.000
                                        {' '}
                                        <span className="font-label-md text-label-md text-on-surface-variant font-normal">COP</span>
                                    </span>
                                    {' '}
                                    <span className="font-body-sm text-body-sm text-emerald-800 flex items-center justify-end gap-1 font-medium">
                                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                        {' '}
                                        Pago Aprobado Online (Tarjeta)
                                    </span>
                                </div>
                                <div className="pt-space-md">
                                    <button className="w-full h-10 px-4 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-lg text-label-lg font-semibold shadow-2xs flex items-center justify-center gap-2 transition-all" type="button">
                                        <span className="material-symbols-outlined text-[18px]">route</span>
                                        {' '}
                                        Ver Guía de Envío Servientrega
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`order-card relative bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-xs transition-all hover:shadow-md opacity-95 ${visible('completados')}`} data-category="completados">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-lg mb-space-lg bg-surface-container-low/40 p-space-md rounded-lg">
                            <div className="flex flex-wrap items-center gap-space-md">
                                <span className="font-title-md text-title-md font-bold text-on-surface">#ASC-7910</span>
                                <span className="hidden sm:inline text-surface-variant">|</span>
                                <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                                    {' '}
                                    28 Ene 2025
                                </span>
                                <span className="hidden sm:inline text-surface-variant">|</span>
                                <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                                    {' '}
                                    Instagram Concierge
                                </span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-950 shadow-2xs self-start lg:self-auto">
                                <span className="material-symbols-outlined text-[18px] text-emerald-700">check_circle</span>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-x-2">
                                    <span className="font-label-caps text-label-caps font-bold tracking-wider uppercase text-emerald-900">COMPLETADO</span>
                                    <span className="hidden sm:inline text-emerald-300">•</span>
                                    <span className="font-body-sm text-body-sm text-emerald-800">Entregado a satisfacción en Medellín</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
                            <div className="lg:col-span-7 space-y-space-md">
                                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block">Artículos Entregados (1)</span>
                                <div className="flex items-center gap-space-md p-space-sm rounded-lg bg-surface-container-low/30 hover:bg-surface-container-low transition-colors">
                                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-surface-container-high shrink-0 relative">
                                        <img className="w-full h-full object-cover" data-alt="Luxury avant-garde chunky designer sneakers with architectural sole, elevated fashion footwear studio product photo, clean background" src="/images/ascend/luxury-avant-garde-chunky-designer-sneakers.jpg" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-title-md text-title-md text-on-surface font-semibold truncate">Tenis Ascend Vanguard Femme</h4>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Talla 38 • Suela Escultórica • Calzado de Autor</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="font-label-caps text-label-caps px-1.5 py-0.5 rounded-sm bg-surface-container text-on-surface-variant font-medium">
                                                Garantía Activa (6 meses)
                                            </span>
                                            <span className="font-body-sm text-body-sm text-on-surface font-medium">$380.000 COP</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-5 flex flex-col justify-between bg-surface-container-low p-space-lg rounded-xl">
                                <div className="space-y-1 text-right mb-space-md">
                                    <span className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider">Total Facturado</span>
                                    {' '}
                                    <span className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight block">
                                        $380.000
                                        {' '}
                                        <span className="font-label-md text-label-md text-on-surface-variant font-normal">COP</span>
                                    </span>
                                    {' '}
                                    <span className="font-body-sm text-body-sm text-on-surface-variant block">Factura Electrónica FE-40291 emitido DIAN</span>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-space-sm pt-space-md">
                                    <button className="flex-1 h-10 px-4 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-lg text-label-lg font-semibold shadow-2xs flex items-center justify-center gap-2 transition-all" type="button">
                                        <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                                        {' '}
                                        Factura DIAN
                                    </button>
                                    <button className="flex-1 h-10 px-4 rounded-lg bg-surface-container-highest text-on-surface hover:bg-surface-container-high font-label-lg text-label-lg font-semibold shadow-2xs flex items-center justify-center gap-2 transition-all" type="button">
                                        <span className="material-symbols-outlined text-[18px]">replay</span>
                                        {' '}
                                        Volver a Comprar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-space-lg bg-surface-container-low rounded-xl flex flex-col md:flex-row items-center justify-between gap-space-md">
                    <div className="flex items-center gap-space-md">
                        <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant shrink-0 shadow-2xs">
                            <span className="material-symbols-outlined text-[20px]">lock</span>
                        </div>
                        <div>
                            <h4 className="font-title-md text-title-md font-semibold text-on-surface">Privacidad y Seguridad Garantizada</h4>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                                Esta vista contiene información cifrada y confidencial vinculada exclusivamente a la cuenta de Valentina Morales.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-space-sm shrink-0">
                        <span className="inline-flex items-center px-3 py-1 rounded-sm bg-surface-container-lowest font-label-caps text-label-caps text-on-surface-variant font-medium">
                            Protocolo TLS 1.3
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-sm bg-surface-container-lowest font-label-caps text-label-caps text-on-surface-variant font-medium">
                            DIAN Conforme
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
