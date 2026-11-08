import { useCallback, useEffect, useState } from 'react';
import { adminProductsApi } from '../../../api/adminProducts';
import { parseApiError } from '../../../api/axios';
import ProductTypeSelect from '../../../components/catalog/ProductTypeSelect';
import Badge from '../../../components/ui/Badge';
import ConfirmDialog from '../../../components/ui/ConfirmDialog';
import Toast, { useToast } from '../../../components/ui/Toast';
import useDebounce from '../../../hooks/useDebounce';
import { formatCOP } from '../../../lib/format';
import { LINES, STATUS_TONE, STOCK_STATUS } from './catalog';
import ProductFormDrawer from './ProductFormDrawer';

const INITIAL_FILTERS = { q: '', line: '', type: '', status: '', page: 1 };
const filterSelect = 'h-10 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md cursor-pointer focus:outline-hidden';

function Metric({ label, icon, iconClass = 'text-on-surface-variant', value, valueClass = 'text-on-surface', note, noteClass = 'text-secondary' }) {
    return (
        <div className="p-space-md bg-surface-container-lowest rounded-lg shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">{label}</span>
                <span className={`material-symbols-outlined text-[20px] ${iconClass}`}>{icon}</span>
            </div>
            <div className="mt-space-sm flex items-baseline justify-between gap-space-sm">
                <span className={`font-display-lg text-display-lg ${valueClass}`}>{value ?? '—'}</span>
                {note && <span className={`font-label-md text-label-md text-right ${noteClass}`}>{note}</span>}
            </div>
        </div>
    );
}

/** Chips de tallas y puntos de color de las variantes. */
function VariantChips({ variants }) {
    const sizes = [...new Set(variants.map((v) => v.size))];
    const colors = [...new Map(variants.map((v) => [v.color.toLowerCase(), v])).values()];
    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-1">
                {sizes.slice(0, 5).map((s) => (
                    <span key={s} className="px-1.5 py-0.5 bg-surface-container text-on-surface font-label-caps text-[10px] rounded-sm font-semibold">
                        {s}
                    </span>
                ))}
                {sizes.length > 5 && <span className="text-on-surface-variant font-label-caps text-[10px]">+{sizes.length - 5}</span>}
            </div>
            <div className="flex items-center gap-1.5">
                {colors.slice(0, 5).map((c) => (
                    <span
                        key={c.color}
                        title={c.color}
                        className="w-3.5 h-3.5 rounded-full ring-1 ring-secondary-container"
                        style={{ backgroundColor: c.color_hex || '#e3e2e2' }}
                    />
                ))}
                <span className="text-on-surface-variant font-label-caps text-[10px]">{variants.length} comb.</span>
            </div>
        </div>
    );
}

export default function ProductsPage() {
    const [filters, setFilters] = useState(INITIAL_FILTERS);
    const debouncedQ = useDebounce(filters.q);
    const [result, setResult] = useState({ data: [], meta: null, summary: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [drawer, setDrawer] = useState({ open: false, product: null });
    const [toDelete, setToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [featuredBusy, setFeaturedBusy] = useState(null);
    const [toast, notify, dismiss] = useToast(4000);

    const load = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const res = await adminProductsApi.list({
                q: debouncedQ || undefined,
                line: filters.line || undefined,
                type: filters.type || undefined,
                status: filters.status || undefined,
                page: filters.page,
                per_page: 10,
            });
            setResult({ data: res.data, meta: res.meta, summary: res.summary });
        } catch (err) {
            setError(parseApiError(err).message);
        } finally {
            setLoading(false);
        }
    }, [debouncedQ, filters.line, filters.type, filters.status, filters.page]);

    useEffect(() => {
        load();
    }, [load]);

    const setFilter = (key) => (eOrValue) => setFilters((f) => ({ ...f, [key]: eOrValue?.target ? eOrValue.target.value : eOrValue, page: 1 }));
    const hasFilters = filters.q || filters.line || filters.type || filters.status;

    const openEditor = async (product) => {
        // Se consulta el detalle fresco (variantes completas) antes de editar.
        try {
            const res = await adminProductsApi.get(product.id);
            setDrawer({ open: true, product: res.data });
        } catch (err) {
            notify('No se pudo abrir el producto', parseApiError(err).message, 'error');
        }
    };

    const handleSaved = (saved, { created, draft, imageWarning }) => {
        setDrawer({ open: false, product: null });
        if (imageWarning) notify('Producto guardado, pero la imagen falló', imageWarning, 'error');
        else notify(created ? (draft ? 'Borrador creado' : 'Producto creado') : 'Producto actualizado', `${saved.name} · ${saved.sku}`);
        load();
    };

    const toggleFeatured = async (product) => {
        setFeaturedBusy(product.id);
        try {
            const res = await adminProductsApi.setFeatured(product.id, !product.is_featured);
            setResult((r) => ({ ...r, data: r.data.map((p) => (p.id === product.id ? res.data : p)) }));
            notify(res.message, product.name);
        } catch (err) {
            notify('No se pudo actualizar', parseApiError(err).message, 'error');
        } finally {
            setFeaturedBusy(null);
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            const res = await adminProductsApi.remove(toDelete.id);
            notify(res.message ?? 'Producto eliminado', `${toDelete.name} · ${toDelete.sku}`);
            setToDelete(null);
            if (result.data.length === 1 && filters.page > 1) setFilters((f) => ({ ...f, page: f.page - 1 }));
            else load();
        } catch (err) {
            setToDelete(null);
            notify('No se pudo eliminar', parseApiError(err).message, 'error');
        } finally {
            setDeleting(false);
        }
    };

    const { data, meta, summary } = result;

    return (
        <>
            <div className="flex flex-col w-full gap-space-lg">
                {/* Encabezado */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                    <div className="flex flex-col gap-space-xxs">
                        <div className="flex items-center gap-space-xs text-on-surface-variant font-label-caps uppercase tracking-wider">
                            <span>Inicio</span>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span>Catálogo</span>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-primary font-bold">Productos</span>
                        </div>
                        <div className="flex items-baseline gap-space-sm">
                            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Catálogo de Productos</h1>
                            <span className="font-label-caps text-label-caps px-space-xs py-0.5 rounded-sm bg-surface-container text-on-surface-variant font-semibold">
                                {summary?.total ?? 0} {summary?.total === 1 ? 'Item' : 'Items'}
                            </span>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setDrawer({ open: true, product: null })}
                        className="h-10 px-space-md rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg shadow-xs hover:bg-primary transition-all flex items-center gap-space-xs group self-start md:self-auto"
                    >
                        <span className="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-90">add</span>
                        <span>Crear Nuevo Producto</span>
                    </button>
                </div>

                {/* Métricas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
                    <Metric label="Activos en Tienda" icon="check_circle" iconClass="text-tertiary" value={summary?.active} note={summary ? `${summary.inactive} ocultos` : null} />
                    <Metric label="Borradores / Revisión" icon="edit_note" iconClass="text-secondary" value={summary?.drafts} />
                    <Metric
                        label="Alerta Stock Crítico"
                        icon="warning"
                        iconClass="text-primary-container"
                        value={summary?.critical}
                        valueClass={summary?.critical ? 'text-primary' : 'text-on-surface'}
                        note={summary ? `${summary.out_of_stock} agotados` : null}
                        noteClass={summary?.out_of_stock ? 'text-primary font-bold' : 'text-secondary'}
                    />
                    <Metric label="Inventario Total Unidades" icon="inventory_2" value={summary ? summary.units.toLocaleString('es-CO') : null} note={summary ? `SKUs: ${summary.skus}` : null} />
                </div>

                {/* Filtros */}
                <div className="p-space-md bg-surface-container-lowest rounded-lg shadow-xs flex flex-col lg:flex-row gap-space-md items-stretch lg:items-center justify-between">
                    <div className="flex-1 flex flex-col sm:flex-row gap-space-sm items-center">
                        <div className="relative w-full sm:w-80">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px]">search</span>
                            <input
                                value={filters.q}
                                onChange={setFilter('q')}
                                placeholder="Buscar por nombre o SKU..."
                                className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-secondary focus:outline-hidden focus:bg-surface-container transition-colors"
                            />
                        </div>
                        <div className="flex items-center gap-space-xs w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                            <select value={filters.line} onChange={setFilter('line')} className={filterSelect} aria-label="Filtrar por línea">
                                <option value="">Línea: Todas</option>
                                {LINES.map((l) => (
                                    <option key={l.value} value={l.value}>
                                        {l.label}
                                    </option>
                                ))}
                            </select>
                            <ProductTypeSelect
                                value={filters.type}
                                onChange={setFilter('type')}
                                placeholder="Tipo: Todos"
                                showEmptyHint={false}
                                aria-label="Filtrar por tipo de producto"
                                className={filterSelect}
                            />
                            <select value={filters.status} onChange={setFilter('status')} className={filterSelect} aria-label="Filtrar por estado">
                                <option value="">Estado: Todos</option>
                                <option value="activo">Publicado / Activo</option>
                                <option value="borrador">En revisión / Borrador</option>
                                <option value="inactivo">Desactivado / Oculto</option>
                                <option value="critico">Stock crítico</option>
                                <option value="agotado">Agotado</option>
                            </select>
                        </div>
                    </div>
                    <button
                        type="button"
                        disabled={!hasFilters}
                        onClick={() => setFilters(INITIAL_FILTERS)}
                        className="h-10 w-10 flex items-center justify-center rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors disabled:opacity-40 self-end lg:self-auto"
                        title="Restablecer filtros"
                        aria-label="Restablecer filtros"
                    >
                        <span className="material-symbols-outlined text-[20px]">filter_alt_off</span>
                    </button>
                </div>

                {/* Tabla */}
                <div className="bg-surface-container-lowest rounded-lg shadow-xs overflow-hidden flex flex-col">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-surface-container-low text-on-surface-variant font-label-caps text-label-caps uppercase tracking-wider">
                                    <th className="py-space-sm px-space-md">Producto &amp; SKU</th>
                                    <th className="py-space-sm px-space-md">Línea / Tipo</th>
                                    <th className="py-space-sm px-space-md">Precio Lista &amp; Promo</th>
                                    <th className="py-space-sm px-space-md">Variantes</th>
                                    <th className="py-space-sm px-space-md text-right">Stock</th>
                                    <th className="py-space-sm px-space-md text-center">Estado</th>
                                    <th className="py-space-sm px-space-md text-center">Destacado</th>
                                    <th className="py-space-sm px-space-md text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className={`text-body-md text-on-surface ${loading ? 'opacity-50' : ''}`}>
                                {data.map((p) => (
                                    <tr key={p.id} className="border-b border-surface-container last:border-0 hover:bg-surface-container-low/60 transition-colors" data-product-id={p.id}>
                                        <td className="py-space-md px-space-md">
                                            <div className="flex items-center gap-space-sm min-w-[240px]">
                                                <div className="w-14 h-16 rounded-lg overflow-hidden bg-surface-container shrink-0 shadow-xs flex items-center justify-center">
                                                    {p.image_url ? (
                                                        <img className="w-full h-full object-cover" src={p.image_url} alt={p.name} />
                                                    ) : (
                                                        <span className="material-symbols-outlined text-[24px] text-secondary-fixed-dim">apparel</span>
                                                    )}
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <button
                                                        type="button"
                                                        onClick={() => openEditor(p)}
                                                        className="text-left font-title-md text-title-md text-on-surface font-semibold truncate hover:text-primary transition-colors"
                                                    >
                                                        {p.name}
                                                    </button>
                                                    <span className="font-body-sm text-body-sm text-on-surface-variant font-mono">SKU: {p.sku}</span>
                                                    {p.tags.length > 0 && (
                                                        <div className="flex flex-wrap items-center gap-1 mt-1">
                                                            {p.tags.slice(0, 2).map((t) => (
                                                                <span key={t} className="font-label-caps text-[10px] px-1.5 py-0.5 bg-secondary-container text-on-secondary-fixed-variant rounded-sm">
                                                                    {t}
                                                                </span>
                                                            ))}
                                                            {p.tags.length > 2 && <span className="font-label-caps text-[10px] text-secondary">+{p.tags.length - 2}</span>}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-space-md px-space-md whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="font-label-md text-label-md text-on-surface font-medium">{p.line_label}</span>
                                                <span className="font-body-sm text-body-sm text-on-surface-variant">{p.type?.name ?? 'Sin tipo'}</span>
                                            </div>
                                        </td>
                                        <td className="py-space-md px-space-md whitespace-nowrap">
                                            {p.sale_price != null ? (
                                                <div className="flex flex-col">
                                                    <span className="font-title-md text-title-md font-semibold text-primary">{formatCOP(p.sale_price)}</span>
                                                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                                                        <span className="line-through">{formatCOP(p.price)}</span> · -{p.discount_percent}%
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="font-title-md text-title-md font-semibold text-on-surface">{formatCOP(p.price)}</span>
                                            )}
                                        </td>
                                        <td className="py-space-md px-space-md">
                                            <VariantChips variants={p.variants ?? []} />
                                        </td>
                                        <td className="py-space-md px-space-md text-right whitespace-nowrap">
                                            <div className="flex flex-col items-end">
                                                <span className={`font-title-md text-title-md font-bold ${p.stock_status === 'agotado' ? 'text-primary' : 'text-on-surface'}`}>{p.total_stock} und.</span>
                                                <span className={`font-label-caps text-[10px] ${STOCK_STATUS[p.stock_status].className}`}>{STOCK_STATUS[p.stock_status].label}</span>
                                            </div>
                                        </td>
                                        <td className="py-space-md px-space-md text-center whitespace-nowrap">
                                            <Badge tone={STATUS_TONE[p.status]}>{p.status_label}</Badge>
                                        </td>
                                        <td className="py-space-md px-space-md text-center">
                                            <button
                                                type="button"
                                                role="switch"
                                                aria-checked={p.is_featured}
                                                aria-label={`Destacar ${p.name}`}
                                                disabled={featuredBusy === p.id}
                                                onClick={() => toggleFeatured(p)}
                                                className={`relative w-9 h-5 rounded-full transition-colors disabled:opacity-50 ${p.is_featured ? 'bg-primary-container' : 'bg-surface-container-highest'}`}
                                            >
                                                <span className={`absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${p.is_featured ? 'translate-x-4' : ''}`} />
                                            </button>
                                        </td>
                                        <td className="py-space-md px-space-md text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-space-xs">
                                                <button
                                                    type="button"
                                                    title="Editar"
                                                    aria-label={`Editar ${p.name}`}
                                                    onClick={() => openEditor(p)}
                                                    className="p-1.5 rounded-sm hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    title="Eliminar"
                                                    aria-label={`Eliminar ${p.name}`}
                                                    onClick={() => setToDelete(p)}
                                                    className="p-1.5 rounded-sm hover:bg-[#FCEAEC] text-on-surface-variant hover:text-primary-container transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {!loading && !error && data.length === 0 && (
                            <div className="py-space-2xl flex flex-col items-center text-center gap-space-sm px-space-md">
                                <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center">
                                    <span className="material-symbols-outlined text-secondary text-[24px]">apparel</span>
                                </div>
                                <span className="font-title-md text-title-md text-on-surface font-semibold">
                                    {hasFilters ? 'Ningún producto coincide con los filtros' : 'Aún no hay productos en el catálogo'}
                                </span>
                                <span className="font-body-sm text-body-sm text-secondary max-w-sm">
                                    {hasFilters ? 'Ajusta la búsqueda o restablece los filtros.' : 'Crea el primero con el botón "Crear Nuevo Producto".'}
                                </span>
                            </div>
                        )}
                        {error && (
                            <div className="py-space-xl flex flex-col items-center gap-space-sm text-center">
                                <span className="font-body-md text-body-md text-primary">{error}</span>
                                <button type="button" onClick={load} className="h-9 px-space-md rounded-lg bg-inverse-surface text-inverse-on-surface font-label-md text-label-md">
                                    Reintentar
                                </button>
                            </div>
                        )}
                    </div>

                    {meta && meta.total > 0 && (
                        <div className="p-space-md bg-surface-container-lowest flex flex-col sm:flex-row items-center justify-between gap-space-sm border-t border-surface-container">
                            <span className="font-body-sm text-body-sm text-on-surface-variant">
                                Mostrando <span className="font-semibold text-on-surface">{meta.from}-{meta.to}</span> de <span className="font-semibold text-on-surface">{meta.total}</span>{' '}
                                {meta.total === 1 ? 'producto' : 'productos'}
                            </span>
                            <div className="flex items-center gap-space-xs">
                                <button
                                    type="button"
                                    disabled={meta.current_page <= 1}
                                    onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
                                    className="h-8 px-2.5 rounded-sm bg-surface-container-low text-on-surface hover:text-primary font-label-md text-label-md disabled:opacity-40"
                                >
                                    Anterior
                                </button>
                                {Array.from({ length: meta.last_page }, (_, i) => i + 1)
                                    .filter((n) => n === 1 || n === meta.last_page || Math.abs(n - meta.current_page) <= 1)
                                    .map((n, i, arr) => (
                                        <span key={n} className="flex items-center gap-space-xs">
                                            {i > 0 && n - arr[i - 1] > 1 && <span className="px-1 text-on-surface-variant">...</span>}
                                            <button
                                                type="button"
                                                onClick={() => setFilters((f) => ({ ...f, page: n }))}
                                                className={`h-8 w-8 rounded-sm font-label-md text-label-md ${
                                                    n === meta.current_page ? 'bg-primary-container text-on-primary font-semibold' : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                                                }`}
                                            >
                                                {n}
                                            </button>
                                        </span>
                                    ))}
                                <button
                                    type="button"
                                    disabled={meta.current_page >= meta.last_page}
                                    onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
                                    className="h-8 px-2.5 rounded-sm bg-surface-container-low text-on-surface hover:text-primary font-label-md text-label-md disabled:opacity-40"
                                >
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ProductFormDrawer open={drawer.open} product={drawer.product} onClose={() => setDrawer({ open: false, product: null })} onSaved={handleSaved} />
            <ConfirmDialog
                open={Boolean(toDelete)}
                title={`¿Eliminar "${toDelete?.name ?? ''}"?`}
                message="Se eliminarán el producto, sus variantes y su imagen. Las ventas registradas conservan su detalle en el historial. Esta acción no se puede deshacer; si sólo quieres ocultarlo de la tienda, cámbialo a Desactivado."
                confirmLabel="Eliminar producto"
                busy={deleting}
                onConfirm={handleDelete}
                onCancel={() => setToDelete(null)}
            />
            <Toast toast={toast} onClose={dismiss} />
        </>
    );
}
