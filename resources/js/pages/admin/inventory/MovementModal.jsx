import { useEffect, useState } from 'react';
import { inventoryApi } from '../../../api/inventory';
import { parseApiError } from '../../../api/axios';
import { useAuth } from '../../../context/AuthContext';
import useDebounce from '../../../hooks/useDebounce';

const TYPES = [
    { value: 'entrada', label: 'Entrada', icon: 'add_circle', color: 'text-tertiary', hint: 'Compra, reposición o devolución' },
    { value: 'salida', label: 'Salida', icon: 'remove_circle', color: 'text-primary', hint: 'Merma, defecto o muestra' },
    { value: 'ajuste', label: 'Ajuste Fijo', icon: 'tune', color: 'text-on-surface', hint: 'Conteo físico (reemplaza el saldo)' },
];
const PROJECTED_COLOR = { entrada: 'text-tertiary', salida: 'text-primary', ajuste: 'text-on-surface' };

const field = (error) =>
    `w-full h-11 px-space-md rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-hidden focus:ring-1 ${
        error ? 'ring-1 ring-primary-container focus:ring-primary-container' : 'focus:ring-primary-container'
    }`;

/** Buscador de variantes (SKU / producto) para elegir a cuál aplicar el movimiento. */
function VariantPicker({ onPick, error }) {
    const [q, setQ] = useState('');
    const debounced = useDebounce(q, 300);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let alive = true;
        setLoading(true);
        inventoryApi
            .list({ q: debounced || undefined, sort: 'producto', per_page: 8 })
            .then((res) => alive && setResults(res.data))
            .finally(() => alive && setLoading(false));
        return () => {
            alive = false;
        };
    }, [debounced]);

    return (
        <div className="flex flex-col gap-space-xs">
            <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px]">search</span>
                <input
                    autoFocus
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Busca por producto o SKU..."
                    aria-label="Buscar variante"
                    className={`${field(error)} pl-9`}
                />
            </div>
            <div className={`max-h-56 overflow-y-auto rounded-lg border border-surface-container ${loading ? 'opacity-60' : ''}`}>
                {results.map((v) => (
                    <button
                        key={v.id}
                        type="button"
                        onClick={() => onPick(v)}
                        className="w-full flex items-center justify-between gap-space-sm px-space-md py-space-sm text-left hover:bg-surface-container-low border-b border-surface-container last:border-0"
                    >
                        <div className="flex flex-col min-w-0">
                            <span className="font-label-lg text-label-lg text-on-surface truncate">{v.product.name}</span>
                            <span className="font-body-sm text-body-sm text-secondary font-mono">
                                {v.sku} · {v.size} / {v.color}
                            </span>
                        </div>
                        <span className="font-label-md text-label-md text-on-surface font-semibold whitespace-nowrap">{v.stock} und.</span>
                    </button>
                ))}
                {!loading && results.length === 0 && <p className="px-space-md py-space-md font-body-sm text-body-sm text-secondary">No se encontraron variantes.</p>}
            </div>
            {error && <span className="font-body-sm text-body-sm text-primary">{error}</span>}
        </div>
    );
}

/**
 * Modal para registrar entradas, salidas o ajustes de stock.
 * @param {object|null} variant  variante preseleccionada (desde la fila) o null para buscarla.
 */
export default function MovementModal({ open, variant: initialVariant, onClose, onSaved }) {
    const { user } = useAuth();
    const [variant, setVariant] = useState(null);
    const [type, setType] = useState('entrada');
    const [qty, setQty] = useState(1);
    const [reason, setReason] = useState('');
    const [note, setNote] = useState('');
    const [reasons, setReasons] = useState({});
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!open) return;
        setVariant(initialVariant ?? null);
        setType('entrada');
        setQty(1);
        setReason('');
        setNote('');
        setErrors({});
        inventoryApi.reasons().then(setReasons).catch(() => setReasons({}));
    }, [open, initialVariant]);

    useEffect(() => {
        if (!open) return undefined;
        const onKey = (e) => e.key === 'Escape' && !saving && onClose();
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open, saving, onClose]);

    if (!open) return null;

    const current = variant?.stock ?? 0;
    const amount = Math.max(0, parseInt(qty, 10) || 0);
    const projected = type === 'entrada' ? current + amount : type === 'salida' ? current - amount : amount;
    const invalidProjection = variant && projected < 0;

    const changeType = (t) => {
        setType(t);
        setReason('');
        setQty(t === 'ajuste' ? current : 1);
        setErrors({});
    };

    const submit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setErrors({});
        try {
            const res = await inventoryApi.move({ product_variant_id: variant?.id, type, quantity: amount, reason, note: note || null });
            onSaved(res);
        } catch (err) {
            const parsed = parseApiError(err);
            setErrors(Object.keys(parsed.fields).length ? parsed.fields : { form: parsed.message });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-xs z-[70] flex items-center justify-center p-space-md" role="dialog" aria-modal="true" aria-labelledby="movement-title">
            <div className="absolute inset-0" onClick={() => !saving && onClose()} />
            <div className="relative bg-surface-container-lowest w-full max-w-2xl rounded-xl shadow-[0_20px_25px_-5px_rgba(23,23,23,0.12),0_8px_10px_-6px_rgba(23,23,23,0.04)] overflow-hidden flex flex-col max-h-[92vh]">
                <div className="px-space-xl py-space-lg bg-surface-container-low flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="font-label-caps text-label-caps text-primary uppercase tracking-wider font-semibold">Kardex de Inventario</span>
                        <h3 className="font-headline-md text-headline-md text-on-surface" id="movement-title">
                            Registrar Movimiento de Stock
                        </h3>
                    </div>
                    <button type="button" onClick={onClose} disabled={saving} aria-label="Cerrar" className="text-secondary hover:text-on-surface p-1 rounded-lg hover:bg-surface-container transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form onSubmit={submit} noValidate className="p-space-xl overflow-y-auto flex flex-col gap-space-lg">
                    {errors.form && (
                        <div role="alert" className="flex items-start gap-space-sm px-space-md py-space-sm rounded-lg bg-error-container/40 text-on-error-container font-body-sm text-body-sm">
                            <span className="material-symbols-outlined text-[18px] text-primary">error</span>
                            <span>{errors.form}</span>
                        </div>
                    )}

                    {/* Variante */}
                    <div className="flex flex-col gap-space-xs">
                        <label className="font-label-caps text-label-caps text-secondary uppercase">SKU / Producto a intervenir *</label>
                        {variant ? (
                            <div className="flex items-center justify-between gap-space-md p-space-md rounded-lg bg-surface-container-low">
                                <div className="flex items-center gap-space-md min-w-0">
                                    <div className="w-11 h-12 rounded-md overflow-hidden bg-surface-container flex items-center justify-center shrink-0">
                                        {variant.product.image_url ? (
                                            <img src={variant.product.image_url} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="material-symbols-outlined text-secondary">apparel</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="font-title-md text-body-md text-on-surface font-semibold truncate">{variant.product.name}</span>
                                        <span className="font-body-sm text-body-sm text-secondary font-mono">
                                            {variant.sku} · {variant.size} / {variant.color}
                                        </span>
                                    </div>
                                </div>
                                {!initialVariant && (
                                    <button type="button" onClick={() => setVariant(null)} className="font-label-md text-label-md text-primary hover:underline whitespace-nowrap">
                                        Cambiar
                                    </button>
                                )}
                            </div>
                        ) : (
                            <VariantPicker
                                error={errors.product_variant_id}
                                onPick={(v) => {
                                    setVariant(v);
                                    setErrors({});
                                    if (type === 'ajuste') setQty(v.stock);
                                }}
                            />
                        )}
                    </div>

                    {/* Tipo */}
                    <div className="flex flex-col gap-space-xs">
                        <label className="font-label-caps text-label-caps text-secondary uppercase">Tipo de movimiento *</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm" role="radiogroup">
                            {TYPES.map((t) => (
                                <label
                                    key={t.value}
                                    className={`relative flex flex-col p-space-md rounded-xl cursor-pointer transition-all bg-surface-container-low ${
                                        type === t.value ? 'shadow-[0_0_0_2px_#c62835]' : 'hover:bg-surface-container'
                                    }`}
                                >
                                    <input type="radio" name="movement_type" value={t.value} checked={type === t.value} onChange={() => changeType(t.value)} className="absolute right-3 top-3 accent-primary-container" />
                                    <div className={`flex items-center gap-1.5 ${t.color}`}>
                                        <span className="material-symbols-outlined text-[20px]">{t.icon}</span>
                                        <span className="font-label-lg text-label-lg font-bold">{t.label}</span>
                                    </div>
                                    <span className="font-body-sm text-body-sm text-secondary mt-1">{t.hint}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Cantidad y saldo */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md items-start">
                        <div className="flex flex-col gap-space-xs">
                            <label htmlFor="movement-qty" className="font-label-caps text-label-caps text-secondary uppercase">
                                {type === 'ajuste' ? 'Nuevo saldo contado *' : 'Cantidad a modificar *'}
                            </label>
                            <div className="flex items-center">
                                <button type="button" aria-label="Disminuir" onClick={() => setQty((q) => Math.max(0, (parseInt(q, 10) || 0) - 1))} className="w-11 h-11 bg-surface-container text-on-surface font-title-md font-bold rounded-l-lg hover:bg-surface-container-high">
                                    -
                                </button>
                                <input
                                    id="movement-qty"
                                    type="number"
                                    min="0"
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                    className="w-full h-11 text-center bg-surface-container-low font-headline-md text-headline-md text-on-surface focus:outline-hidden"
                                />
                                <button type="button" aria-label="Aumentar" onClick={() => setQty((q) => (parseInt(q, 10) || 0) + 1)} className="w-11 h-11 bg-surface-container text-on-surface font-title-md font-bold rounded-r-lg hover:bg-surface-container-high">
                                    +
                                </button>
                            </div>
                            {errors.quantity && <span className="font-body-sm text-body-sm text-primary">{errors.quantity}</span>}
                        </div>
                        <div className={`p-space-md rounded-xl flex items-center justify-between ${invalidProjection ? 'bg-error-container/40' : 'bg-surface-container-low'}`}>
                            <div className="flex flex-col">
                                <span className="font-label-caps text-label-caps text-secondary uppercase">Saldo resultante</span>
                                <span className="font-body-sm text-body-sm text-secondary">
                                    Stock actual: <span className="font-semibold text-on-surface">{variant ? current : '—'}</span> und.
                                </span>
                            </div>
                            <div className="flex items-center gap-space-xs">
                                <span className="material-symbols-outlined text-secondary text-[18px]">arrow_forward</span>
                                <span className={`font-display-lg text-display-lg font-bold ${invalidProjection ? 'text-primary' : PROJECTED_COLOR[type]}`} data-testid="projected-stock">
                                    {variant ? projected : '—'}
                                </span>
                            </div>
                        </div>
                    </div>
                    {invalidProjection && <span className="font-body-sm text-body-sm text-primary -mt-space-md">No puedes retirar más unidades de las disponibles ({current}).</span>}

                    {/* Motivo y nota */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                        <div className="flex flex-col gap-space-xs">
                            <label htmlFor="movement-reason" className="font-label-caps text-label-caps text-secondary uppercase">
                                Motivo *
                            </label>
                            <select id="movement-reason" value={reason} onChange={(e) => setReason(e.target.value)} className={`${field(errors.reason)} px-space-sm`}>
                                <option value="">Selecciona el motivo</option>
                                {(reasons[type] ?? []).map((r) => (
                                    <option key={r} value={r}>
                                        {r}
                                    </option>
                                ))}
                            </select>
                            {errors.reason && <span className="font-body-sm text-body-sm text-primary">{errors.reason}</span>}
                        </div>
                        <div className="flex flex-col gap-space-xs">
                            <label htmlFor="movement-note" className="font-label-caps text-label-caps text-secondary uppercase">
                                Nota {reason === 'Otro' ? '*' : '(opcional)'}
                            </label>
                            <input id="movement-note" value={note} onChange={(e) => setNote(e.target.value)} maxLength={500} placeholder="Factura, lote, observaciones..." className={field(errors.note)} />
                            {errors.note && <span className="font-body-sm text-body-sm text-primary">{errors.note}</span>}
                        </div>
                    </div>

                    <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-on-primary text-[16px]">person</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-label-caps text-label-caps text-secondary uppercase">Responsable del movimiento</span>
                            <span className="font-label-md text-label-md text-on-surface font-semibold">{user?.name}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-space-md pt-space-xs">
                        <button type="button" onClick={onClose} disabled={saving} className="h-11 px-space-lg rounded-lg text-on-surface font-label-lg text-label-lg hover:bg-surface-container transition-colors">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={saving || !variant || invalidProjection}
                            className="h-11 px-space-xl rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg shadow-xs transition-all flex items-center gap-space-xs disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className={`material-symbols-outlined text-[18px] ${saving ? 'animate-spin' : ''}`}>{saving ? 'progress_activity' : 'verified'}</span>
                            <span>{saving ? 'Registrando...' : 'Confirmar y Aplicar'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
