import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { inventoryApi } from '../../../api/inventory';
import { parseApiError } from '../../../api/axios';
import ProductTypeSelect from '../../../components/catalog/ProductTypeSelect';
import Badge from '../../../components/ui/Badge';
import Toast, { useToast } from '../../../components/ui/Toast';
import useDebounce from '../../../hooks/useDebounce';
import { formatCOP, formatDateTime } from '../../../lib/format';
import { LINES } from '../products/catalog';
import MovementModal from './MovementModal';

const STOCK_BADGE = {
    optimo: { tone: 'success', label: 'Óptimo' },
    critico: { tone: 'warning', label: 'Stock bajo' },
    agotado: { tone: 'critical', label: 'Agotado' },
};

const MOVEMENT_BADGE = {
    inicial: 'neutral',
    entrada: 'success',
    salida: 'critical',
    ajuste: 'info',
    venta: 'dark',
    devolucion: 'warning',
};

const MOVEMENT_TYPES = [
    ['', 'Todos los tipos'],
    ['inicial', 'Stock inicial'],
    ['entrada', 'Entradas'],
    ['salida', 'Salidas'],
    ['ajuste', 'Ajustes'],
    ['venta', 'Ventas'],
    ['devolucion', 'Devoluciones'],
];

const selectClass = 'h-10 px-space-md rounded-lg bg-surface-container-low font-label-md text-label-md text-on-surface focus:outline-hidden cursor-pointer';
const tabClass = (active) =>
    `px-space-md py-space-xs rounded-md font-label-lg text-label-lg transition-all flex items-center gap-space-xs whitespace-nowrap ${
        active ? 'bg-surface-container-lowest text-on-surface shadow-xs' : 'text-secondary hover:text-on-surface'
    }`;

function Kpi({ label, icon, iconClass = 'text-secondary', value, valueClass = 'text-on-surface', children }) {
    return (
        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
                <span className="font-label-caps text-label-caps text-secondary uppercase tracking-wider">{label}</span>
                <span className={`material-symbols-outlined text-[20px] ${iconClass}`}>{icon}</span>
            </div>
            <span className={`mt-space-md font-display-lg text-display-lg leading-tight ${valueClass}`}>{value ?? '—'}</span>
            <div className="mt-space-xs font-body-sm text-body-sm text-secondary">{children}</div>
        </div>
    );
}

function Pagination({ meta, onPage, noun }) {
    if (!meta || meta.total === 0) return null;
    return (
        <div className="p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm border-t border-surface-container">
            <span className="font-body-sm text-body-sm text-secondary">
                Mostrando {meta.from}–{meta.to} de {meta.total} {noun}
            </span>
            <div className="flex items-center gap-space-xs">
                <button type="button" disabled={meta.current_page <= 1} onClick={() => onPage(meta.current_page - 1)} className="h-8 px-2.5 rounded-sm bg-surface-container-low text-on-surface font-label-md text-label-md disabled:opacity-40">
                    Anterior
                </button>
                <span className="font-label-md text-label-md px-space-xs">
                    {meta.current_page} / {meta.last_page}
                </span>
                <button type="button" disabled={meta.current_page >= meta.last_page} onClick={() => onPage(meta.current_page + 1)} className="h-8 px-2.5 rounded-sm bg-surface-container-low text-on-surface font-label-md text-label-md disabled:opacity-40">
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default function InventoryPage() {
    const [tab, setTab] = useState('variants');
    const [toast, notify, dismiss] = useToast(4000);
    const [modal, setModal] = useState({ open: false, variant: null });

    // Existencias
    const [stockFilters, setStockFilters] = useState({ q: '', status: '', line: '', type: '', page: 1 });
    const stockQ = useDebounce(stockFilters.q);
    const [stock, setStock] = useState({ data: [], meta: null, summary: null, loading: true, error: '' });

    // Kardex
    const [moveFilters, setMoveFilters] = useState({ q: '', type: '', page: 1 });
    const moveQ = useDebounce(moveFilters.q);
    const [moves, setMoves] = useState({ data: [], meta: null, loading: true });

    const loadStock = useCallback(async () => {
        setStock((s) => ({ ...s, loading: true, error: '' }));
        try {
            const res = await inventoryApi.list({
                q: stockQ || undefined,
                status: stockFilters.status || undefined,
                line: stockFilters.line || undefined,
                type: stockFilters.type || undefined,
                page: stockFilters.page,
                per_page: 10,
            });
            setStock({ data: res.data, meta: { from: res.from, to: res.to, total: res.total, current_page: res.current_page, last_page: res.last_page }, summary: res.summary, loading: false, error: '' });
        } catch (err) {
            setStock((s) => ({ ...s, loading: false, error: parseApiError(err).message }));
        }
    }, [stockQ, stockFilters.status, stockFilters.line, stockFilters.type, stockFilters.page]);

    const loadMoves = useCallback(async () => {
        setMoves((m) => ({ ...m, loading: true }));
        try {
            const res = await inventoryApi.movements({ q: moveQ || undefined, type: moveFilters.type || undefined, page: moveFilters.page, per_page: 12 });
            setMoves({ data: res.data, meta: { from: res.from, to: res.to, total: res.total, current_page: res.current_page, last_page: res.last_page }, loading: false });
        } catch {
            setMoves({ data: [], meta: null, loading: false });
        }
    }, [moveQ, moveFilters.type, moveFilters.page]);

    useEffect(() => {
        loadStock();
    }, [loadStock]);

    useEffect(() => {
        loadMoves();
    }, [loadMoves]);

    const setStockFilter = (key) => (e) => setStockFilters((f) => ({ ...f, [key]: e?.target ? e.target.value : e, page: 1 }));

    const handleSaved = (res) => {
        setModal({ open: false, variant: null });
        const m = res.movement;
        notify('Movimiento registrado', `${m.sku} · ${m.quantity > 0 ? '+' : ''}${m.quantity} und. → saldo ${m.stock_after}`);
        loadStock();
        loadMoves();
    };

    const { summary } = stock;

    return (
        <div className="flex flex-col w-full gap-space-xl">
            {/* Encabezado */}
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
                <div className="flex flex-col gap-space-xxs">
                    <div className="flex items-center gap-space-xs font-label-caps text-label-caps text-secondary uppercase tracking-widest">
                        <span>Inicio</span>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span>Operaciones</span>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="text-primary font-bold">Inventario y Existencias</span>
                    </div>
                    <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight mt-space-xs">Control y Gestión de Inventario</h1>
                    <p className="font-body-md text-body-md text-secondary">
                        Stock por variante (talla y color) alimentado por el catálogo de productos. Cada cambio queda registrado en el kardex.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => setModal({ open: true, variant: null })}
                    className="h-10 px-space-md rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg shadow-xs transition-all flex items-center gap-space-xs shrink-0 self-start md:self-auto"
                >
                    <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
                    <span>Registrar Movimiento</span>
                </button>
            </section>

            {/* KPIs */}
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
                <Kpi label="Total Unidades en Stock" icon="inventory_2" value={summary ? summary.units.toLocaleString('es-CO') : null}>
                    {summary ? `${summary.variants} SKUs (variantes)` : ''}
                </Kpi>
                <Kpi label="Valor del Inventario" icon="payments" value={summary ? formatCOP(summary.value).replace(' COP', '') : null}>
                    COP · a precio de venta vigente
                </Kpi>
                <Kpi
                    label="Alertas Stock Bajo"
                    icon="warning"
                    iconClass="text-primary"
                    value={summary?.critical}
                    valueClass={summary?.critical ? 'text-primary' : 'text-on-surface'}
                >
                    Variantes en o bajo su umbral
                </Kpi>
                <Kpi label="Referencias Agotadas" icon="block" iconClass="text-primary" value={summary?.out_of_stock} valueClass={summary?.out_of_stock ? 'text-primary' : 'text-on-surface'}>
                    {summary ? `${summary.movements_24h} movimientos en 24h` : ''}
                </Kpi>
            </section>

            <section className="flex flex-col gap-space-lg">
                {/* Pestañas y filtros */}
                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs flex flex-col 2xl:flex-row items-stretch 2xl:items-center justify-between gap-space-md">
                    <div className="flex items-center p-1 bg-surface-container rounded-lg self-start">
                        <button type="button" className={tabClass(tab === 'variants')} onClick={() => setTab('variants')}>
                            <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                            Existencias por Variante
                            <span className="font-label-caps text-label-caps bg-surface-container-high px-1.5 py-0.5 rounded-sm text-on-surface">{summary?.variants ?? 0}</span>
                        </button>
                        <button type="button" className={tabClass(tab === 'history')} onClick={() => setTab('history')}>
                            <span className="material-symbols-outlined text-[18px]">history</span>
                            Historial de Movimientos
                        </button>
                    </div>

                    {tab === 'variants' ? (
                        <div className="flex items-center flex-wrap gap-space-sm">
                            <div className="relative min-w-[220px] flex-1 sm:flex-initial">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px]">search</span>
                                <input
                                    value={stockFilters.q}
                                    onChange={setStockFilter('q')}
                                    placeholder="Producto o SKU..."
                                    className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-secondary focus:outline-hidden"
                                />
                            </div>
                            <select value={stockFilters.status} onChange={setStockFilter('status')} className={selectClass} aria-label="Filtrar por estado de stock">
                                <option value="">Todos los estados</option>
                                <option value="optimo">En stock óptimo</option>
                                <option value="critico">Stock bajo (≤ umbral)</option>
                                <option value="agotado">Agotados (0)</option>
                            </select>
                            <select value={stockFilters.line} onChange={setStockFilter('line')} className={selectClass} aria-label="Filtrar por línea">
                                <option value="">Línea: Todas</option>
                                {LINES.map((l) => (
                                    <option key={l.value} value={l.value}>
                                        {l.label}
                                    </option>
                                ))}
                            </select>
                            <ProductTypeSelect value={stockFilters.type} onChange={setStockFilter('type')} placeholder="Tipo: Todos" showEmptyHint={false} aria-label="Filtrar por tipo" className={selectClass} />
                        </div>
                    ) : (
                        <div className="flex items-center flex-wrap gap-space-sm">
                            <div className="relative min-w-[220px] flex-1 sm:flex-initial">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px]">search</span>
                                <input
                                    value={moveFilters.q}
                                    onChange={(e) => setMoveFilters((f) => ({ ...f, q: e.target.value, page: 1 }))}
                                    placeholder="Producto o SKU..."
                                    className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-secondary focus:outline-hidden"
                                />
                            </div>
                            <select value={moveFilters.type} onChange={(e) => setMoveFilters((f) => ({ ...f, type: e.target.value, page: 1 }))} className={selectClass} aria-label="Filtrar por tipo de movimiento">
                                {MOVEMENT_TYPES.map(([v, l]) => (
                                    <option key={v} value={v}>
                                        {l}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* Existencias por variante */}
                {tab === 'variants' && (
                    <div className="bg-surface-container-lowest rounded-xl shadow-xs overflow-hidden flex flex-col">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-surface-container-low text-secondary font-label-caps text-label-caps uppercase whitespace-nowrap">
                                        <th className="py-space-md px-space-lg">Producto</th>
                                        <th className="py-space-md px-space-md">Variante (SKU)</th>
                                        <th className="py-space-md px-space-md">Línea / Tipo</th>
                                        <th className="py-space-md px-space-md text-right">Stock</th>
                                        <th className="py-space-md px-space-md">Estado</th>
                                        <th className="py-space-md px-space-lg text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className={`text-on-surface ${stock.loading ? 'opacity-50' : ''}`}>
                                    {stock.data.map((v) => (
                                        <tr key={v.id} data-variant-id={v.id} className={`border-b border-surface-container last:border-0 hover:bg-surface-container-low/50 transition-colors ${v.stock_status === 'agotado' ? 'bg-error-container/10' : ''}`}>
                                            <td className="py-space-md px-space-lg">
                                                <div className="flex items-center gap-space-md min-w-[200px] max-w-[300px]">
                                                    <div className="w-12 h-14 rounded-md bg-surface-container shrink-0 overflow-hidden flex items-center justify-center">
                                                        {v.product.image_url ? <img src={v.product.image_url} alt="" className="w-full h-full object-cover" /> : <span className="material-symbols-outlined text-secondary-fixed-dim">apparel</span>}
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="font-title-md text-title-md font-semibold truncate">{v.product.name}</span>
                                                        <span className="font-body-sm text-body-sm text-secondary">
                                                            {v.product.status === 'activo' ? 'Publicado en tienda' : v.product.status === 'borrador' ? 'Borrador' : 'Oculto'} · {formatCOP(v.unit_price)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-space-md px-space-md whitespace-nowrap">
                                                <div className="flex flex-col items-start gap-1">
                                                    <span className="font-label-md text-label-md bg-surface-container px-2 py-0.5 rounded-sm text-on-surface font-mono">{v.sku}</span>
                                                    <span className="flex items-center gap-space-xs font-label-md text-label-md font-medium">
                                                        <span className="w-3 h-3 rounded-full ring-1 ring-secondary-container" style={{ backgroundColor: v.color_hex || '#e3e2e2' }} title={v.color} />
                                                        {v.color} / <span className="font-bold">{v.size}</span>
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-space-md px-space-md whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="font-label-md text-label-md font-medium">{v.product.line_label}</span>
                                                    <span className="font-body-sm text-body-sm text-secondary">{v.product.type ?? 'Sin tipo'}</span>
                                                </div>
                                            </td>
                                            <td className="py-space-md px-space-md text-right whitespace-nowrap">
                                                <div className="flex flex-col items-end">
                                                    <span className={`font-title-md text-title-md font-bold ${v.stock_status === 'optimo' ? 'text-on-surface' : 'text-primary'}`}>{v.stock} und.</span>
                                                    <span className="font-body-sm text-body-sm text-secondary">mín. {v.threshold}</span>
                                                </div>
                                            </td>
                                            <td className="py-space-md px-space-md">
                                                <Badge tone={STOCK_BADGE[v.stock_status].tone}>{STOCK_BADGE[v.stock_status].label}</Badge>
                                            </td>
                                            <td className="py-space-md px-space-lg text-right">
                                                <button
                                                    type="button"
                                                    aria-label={`Ajustar stock ${v.sku}`}
                                                    onClick={() => setModal({ open: true, variant: v })}
                                                    className={`h-8 px-space-sm rounded-lg font-label-md text-label-md transition-all whitespace-nowrap inline-flex items-center gap-1 ${
                                                        v.stock_status === 'optimo' ? 'bg-surface-container text-on-surface hover:bg-primary-container hover:text-on-primary' : 'bg-primary-container text-on-primary hover:opacity-90'
                                                    }`}
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">{v.stock_status === 'agotado' ? 'add_box' : 'tune'}</span>
                                                    {v.stock_status === 'agotado' ? 'Reponer' : 'Ajustar'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {!stock.loading && !stock.error && stock.data.length === 0 && (
                                <div className="py-space-2xl flex flex-col items-center text-center gap-space-sm px-space-md">
                                    <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center">
                                        <span className="material-symbols-outlined text-secondary text-[24px]">inventory_2</span>
                                    </div>
                                    <span className="font-title-md text-title-md text-on-surface font-semibold">
                                        {stockFilters.q || stockFilters.status || stockFilters.line || stockFilters.type ? 'Ninguna variante coincide con los filtros' : 'El inventario está vacío'}
                                    </span>
                                    <span className="font-body-sm text-body-sm text-secondary max-w-sm">
                                        El inventario se llena con los productos del catálogo.{' '}
                                        <Link to="/admin/productos" className="text-primary hover:underline">
                                            Crear un producto
                                        </Link>
                                    </span>
                                </div>
                            )}
                            {stock.error && <p className="py-space-xl text-center font-body-md text-body-md text-primary">{stock.error}</p>}
                        </div>
                        <Pagination meta={stock.meta} noun="variantes" onPage={(page) => setStockFilters((f) => ({ ...f, page }))} />
                    </div>
                )}

                {/* Kardex */}
                {tab === 'history' && (
                    <div className="bg-surface-container-lowest rounded-xl shadow-xs overflow-hidden flex flex-col">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-surface-container-low text-secondary font-label-caps text-label-caps uppercase">
                                        <th className="py-space-md px-space-lg">Fecha / Hora</th>
                                        <th className="py-space-md px-space-md">Tipo</th>
                                        <th className="py-space-md px-space-md">Variante (SKU)</th>
                                        <th className="py-space-md px-space-md text-right">Variación</th>
                                        <th className="py-space-md px-space-md text-right">Saldo</th>
                                        <th className="py-space-md px-space-md">Motivo</th>
                                        <th className="py-space-md px-space-lg">Responsable</th>
                                    </tr>
                                </thead>
                                <tbody className={`text-on-surface ${moves.loading ? 'opacity-50' : ''}`}>
                                    {moves.data.map((m) => (
                                        <tr key={m.id} data-movement-id={m.id} className="border-b border-surface-container last:border-0 hover:bg-surface-container-low/50">
                                            <td className="py-space-md px-space-lg font-body-sm text-body-sm text-secondary whitespace-nowrap">{formatDateTime(m.created_at)}</td>
                                            <td className="py-space-md px-space-md">
                                                <Badge tone={MOVEMENT_BADGE[m.type]}>{m.type_label}</Badge>
                                            </td>
                                            <td className="py-space-md px-space-md">
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-label-md text-label-md font-mono">{m.sku}</span>
                                                    <span className="font-body-sm text-body-sm text-secondary truncate max-w-[220px]">
                                                        {m.product_name} · {m.variant_label}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-space-md px-space-md text-right whitespace-nowrap">
                                                <span className={`font-label-lg text-label-lg font-bold ${m.quantity > 0 ? 'text-tertiary' : 'text-primary'}`}>
                                                    {m.quantity > 0 ? '+' : ''}
                                                    {m.quantity}
                                                </span>
                                            </td>
                                            <td className="py-space-md px-space-md text-right whitespace-nowrap font-body-md text-body-md">
                                                <span className="text-secondary">{m.stock_before} →</span> <span className="font-semibold">{m.stock_after}</span>
                                            </td>
                                            <td className="py-space-md px-space-md">
                                                <div className="flex flex-col">
                                                    <span className="font-body-md text-body-md">{m.reason}</span>
                                                    {m.note && <span className="font-body-sm text-body-sm text-secondary">{m.note}</span>}
                                                </div>
                                            </td>
                                            <td className="py-space-md px-space-lg font-body-md text-body-md whitespace-nowrap">{m.user ?? <span className="text-secondary">Sistema</span>}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {!moves.loading && moves.data.length === 0 && (
                                <p className="py-space-2xl text-center font-body-md text-body-md text-secondary">No hay movimientos registrados con estos filtros.</p>
                            )}
                        </div>
                        <Pagination meta={moves.meta} noun="movimientos" onPage={(page) => setMoveFilters((f) => ({ ...f, page }))} />
                    </div>
                )}
            </section>

            <MovementModal open={modal.open} variant={modal.variant} onClose={() => setModal({ open: false, variant: null })} onSaved={handleSaved} />
            <Toast toast={toast} onClose={dismiss} />
        </div>
    );
}
