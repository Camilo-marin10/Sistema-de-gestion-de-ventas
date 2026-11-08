import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminProductsApi } from '../../../api/adminProducts';
import { parseApiError } from '../../../api/axios';
import ProductTypeSelect from '../../../components/catalog/ProductTypeSelect';
import { formatCOP } from '../../../lib/format';
import { COLOR_PRESETS, LINES, SIZE_SUGGESTIONS, STATUSES, TAG_SUGGESTIONS, variantSku } from './catalog';

let keySeq = 0;
const newKey = () => `v${++keySeq}`;

const EMPTY = {
    product_type_id: '',
    name: '',
    sku: '',
    line: 'unisex',
    description: '',
    price: '',
    sale_price: '',
    stock_alert_threshold: 5,
    status: 'activo',
    is_featured: false,
    tags: [],
};

const emptyVariant = (base = '') => ({ key: newKey(), id: null, size: '', color: '', color_hex: '#111111', sku: base ? `${base}-` : '', stock: 0, skuTouched: false });

const field = (error) =>
    `h-10 px-space-md rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:outline-hidden focus:ring-1 w-full transition-all ${
        error ? 'ring-1 ring-primary-container focus:ring-primary-container bg-error-container/10' : 'focus:ring-primary'
    }`;

function Section({ icon, title, action, children }) {
    return (
        <div className="flex flex-col gap-space-md p-space-md bg-surface-container-low rounded-lg">
            <div className="flex items-center justify-between gap-space-sm">
                <div className="flex items-center gap-space-xs text-on-surface font-title-md text-title-md">
                    <span className="material-symbols-outlined text-primary text-[20px]">{icon}</span>
                    <span>{title}</span>
                </div>
                {action}
            </div>
            {children}
        </div>
    );
}

function Field({ label, htmlFor, error, hint, className = '', children }) {
    return (
        <div className={`flex flex-col gap-space-xxs ${className}`}>
            <label htmlFor={htmlFor} className="font-label-md text-label-md text-on-surface font-medium">
                {label}
            </label>
            {children}
            {error ? <span className="font-body-sm text-body-sm text-primary">{error}</span> : hint && <span className="font-body-sm text-body-sm text-secondary">{hint}</span>}
        </div>
    );
}

/**
 * Drawer para crear o editar un producto (con variantes e imagen).
 * @param {object|null} product  producto a editar (null = crear)
 */
export default function ProductFormDrawer({ open, product, onClose, onSaved }) {
    const [form, setForm] = useState(EMPTY);
    const [variants, setVariants] = useState([]);
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState('');
    const [saving, setSaving] = useState(null); // null | 'draft' | 'save'
    const [tagInput, setTagInput] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [removeImage, setRemoveImage] = useState(false);
    const fileRef = useRef(null);
    const bodyRef = useRef(null);

    const editing = Boolean(product);

    useEffect(() => {
        if (!open) return;
        if (product) {
            setForm({
                product_type_id: String(product.product_type_id ?? ''),
                name: product.name,
                sku: product.sku,
                line: product.line,
                description: product.description ?? '',
                price: String(Math.round(product.price)),
                sale_price: product.sale_price != null ? String(Math.round(product.sale_price)) : '',
                stock_alert_threshold: product.stock_alert_threshold,
                status: product.status,
                is_featured: product.is_featured,
                tags: product.tags ?? [],
            });
            setVariants((product.variants ?? []).map((v) => ({ ...v, key: newKey(), color_hex: v.color_hex ?? '#111111', skuTouched: true })));
        } else {
            setForm(EMPTY);
            setVariants([emptyVariant()]);
        }
        setErrors({});
        setFormError('');
        setTagInput('');
        setImageFile(null);
        setImagePreview(null);
        setRemoveImage(false);
        bodyRef.current?.scrollTo(0, 0);
    }, [open, product]);

    useEffect(() => {
        if (!open) return undefined;
        const onKey = (e) => e.key === 'Escape' && !saving && onClose();
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open, saving, onClose]);

    useEffect(() => () => imagePreview && URL.revokeObjectURL(imagePreview), [imagePreview]);

    if (!open) return null;

    const clearError = (...keys) =>
        setErrors((er) => {
            if (!keys.some((k) => er[k])) return er;
            const next = { ...er };
            keys.forEach((k) => delete next[k]);
            return next;
        });

    const set = (key) => (e) => {
        setForm((f) => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
        clearError(key);
    };

    // Cambiar el SKU base actualiza los SKU de variantes que no se han editado a mano.
    const setBaseSku = (e) => {
        const sku = e.target.value.toUpperCase().replace(/\s+/g, '-');
        setForm((f) => ({ ...f, sku }));
        clearError('sku');
        setVariants((list) => list.map((v) => (v.skuTouched ? v : { ...v, sku: variantSku(sku, v.size, v.color) })));
    };

    const updateVariant = (key, changes) => {
        const index = variants.findIndex((v) => v.key === key);
        clearError('variants', ...Object.keys(changes).map((c) => `variants.${index}.${c === 'skuTouched' ? 'sku' : c}`), ...('size' in changes || 'color' in changes ? [`variants.${index}.sku`, `variants.${index}.color`] : []));
        setVariants((list) =>
            list.map((v) => {
                if (v.key !== key) return v;
                const next = { ...v, ...changes };
                if ('color' in changes) {
                    const preset = COLOR_PRESETS.find((c) => c.name.toLowerCase() === changes.color.trim().toLowerCase());
                    if (preset) next.color_hex = preset.hex;
                }
                if (!next.skuTouched && ('size' in changes || 'color' in changes)) next.sku = variantSku(form.sku, next.size, next.color);
                return next;
            }),
        );
    };

    const addVariant = () => setVariants((list) => [...list, emptyVariant(form.sku)]);
    const removeVariant = (key) => setVariants((list) => list.filter((v) => v.key !== key));

    const addTag = (tag) => {
        const t = tag.trim();
        if (!t || form.tags.includes(t) || form.tags.length >= 8) return;
        setForm((f) => ({ ...f, tags: [...f.tags, t] }));
        setTagInput('');
    };
    const removeTag = (tag) => setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));

    const pickImage = (e) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
            setErrors((er) => ({ ...er, image: 'Formatos permitidos: JPG, PNG o WEBP.' }));
            return;
        }
        if (file.size > 4 * 1024 * 1024) {
            setErrors((er) => ({ ...er, image: 'La imagen no puede superar 4 MB.' }));
            return;
        }
        setErrors((er) => ({ ...er, image: undefined }));
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        setRemoveImage(false);
    };

    const currentImage = imagePreview ?? (removeImage ? null : product?.image_url);
    const totalStock = variants.reduce((n, v) => n + (parseInt(v.stock, 10) || 0), 0);
    const price = parseFloat(form.price) || 0;
    const sale = parseFloat(form.sale_price) || 0;
    const discount = price && sale && sale < price ? Math.round((1 - sale / price) * 100) : null;

    const submit = async (asDraft) => {
        setSaving(asDraft ? 'draft' : 'save');
        setErrors({});
        setFormError('');
        const payload = {
            ...form,
            status: asDraft ? 'borrador' : form.status,
            product_type_id: form.product_type_id ? Number(form.product_type_id) : null,
            sale_price: form.sale_price === '' ? null : form.sale_price,
            variants: variants.map(({ id, size, color, color_hex, sku, stock }) => ({ id, size, color, color_hex, sku, stock: stock === '' ? null : Number(stock) })),
        };

        let saved;
        try {
            const res = editing ? await adminProductsApi.update(product.id, payload) : await adminProductsApi.create(payload);
            saved = res.data;
        } catch (err) {
            const parsed = parseApiError(err);
            setErrors(parsed.fields);
            setFormError(Object.keys(parsed.fields).length ? 'Revisa los campos marcados en rojo.' : parsed.message);
            setSaving(null);
            bodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // La imagen se sube después de guardar los datos del producto.
        let imageWarning = null;
        try {
            if (imageFile) saved = (await adminProductsApi.uploadImage(saved.id, imageFile)).data;
            else if (removeImage && product?.image_url) saved = (await adminProductsApi.deleteImage(saved.id)).data;
        } catch (err) {
            imageWarning = parseApiError(err).message;
        }

        setSaving(null);
        onSaved(saved, { created: !editing, draft: asDraft, imageWarning });
    };

    const vErr = (i, key) => errors[`variants.${i}.${key}`];

    return (
        <div aria-labelledby="product-drawer-title" aria-modal="true" className="fixed inset-0 z-[70] overflow-hidden" id="productDrawer" role="dialog">
            <div className="fixed inset-0 bg-[#171717]/40 backdrop-blur-xs transition-opacity" onClick={() => !saving && onClose()} />
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-2xl bg-surface-container-lowest shadow-2xl flex flex-col h-full">
                    {/* Encabezado */}
                    <div className="p-space-lg bg-surface-container-low flex items-center justify-between shrink-0">
                        <div className="flex flex-col gap-space-xxs">
                            <span className="font-label-caps text-label-caps text-primary font-bold uppercase tracking-wider">Editor de Catálogo ASCEND</span>
                            <h2 className="font-headline-md text-headline-md text-on-surface" id="product-drawer-title">
                                {editing ? `Editar Producto (${product.sku})` : 'Crear Nuevo Producto'}
                            </h2>
                        </div>
                        <button type="button" onClick={onClose} disabled={Boolean(saving)} aria-label="Cerrar" className="p-2 rounded-lg text-secondary hover:text-on-surface hover:bg-surface-container transition-colors">
                            <span className="material-symbols-outlined text-[24px]">close</span>
                        </button>
                    </div>

                    {/* Contenido */}
                    <div ref={bodyRef} className="flex-1 overflow-y-auto p-space-lg flex flex-col gap-space-lg">
                        {formError && (
                            <div role="alert" className="flex items-start gap-space-sm px-space-md py-space-sm rounded-lg bg-error-container/40 text-on-error-container font-body-sm text-body-sm">
                                <span className="material-symbols-outlined text-[18px] text-primary">error</span>
                                <span>{formError}</span>
                            </div>
                        )}

                        {/* Imagen */}
                        <Section icon="photo_camera" title="Imagen Principal">
                            <div className="flex items-center gap-space-md">
                                <div className="w-24 h-28 rounded-lg overflow-hidden bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-xs">
                                    {currentImage ? (
                                        <img src={currentImage} alt="Vista previa" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="material-symbols-outlined text-[32px] text-secondary-fixed-dim">apparel</span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-space-xs">
                                    <div className="flex flex-wrap gap-space-xs">
                                        <button
                                            type="button"
                                            onClick={() => fileRef.current?.click()}
                                            className="h-9 px-space-md rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-xs hover:bg-surface-container transition-colors flex items-center gap-1"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">upload</span>
                                            {currentImage ? 'Cambiar imagen' : 'Subir imagen'}
                                        </button>
                                        {currentImage && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setImageFile(null);
                                                    setImagePreview(null);
                                                    setRemoveImage(true);
                                                }}
                                                className="h-9 px-space-md rounded-lg text-primary font-label-md text-label-md hover:bg-error-container/30 transition-colors flex items-center gap-1"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                                Quitar
                                            </button>
                                        )}
                                    </div>
                                    <span className="font-body-sm text-body-sm text-secondary">JPG, PNG o WEBP · máximo 4 MB · formato vertical recomendado.</span>
                                    {errors.image && <span className="font-body-sm text-body-sm text-primary">{errors.image}</span>}
                                </div>
                                <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={pickImage} data-testid="product-image-input" />
                            </div>
                        </Section>

                        {/* Información general */}
                        <Section icon="info" title="Información General">
                            <Field label="Nombre del Producto *" htmlFor="p-name" error={errors.name}>
                                <input id="p-name" value={form.name} onChange={set('name')} placeholder="Ej. Camiseta Boxy Heavyweight 'Archive 92'" className={field(errors.name)} maxLength={150} />
                            </Field>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                                <Field label="SKU Base *" htmlFor="p-sku" error={errors.sku} hint="Letras, números y guiones.">
                                    <input id="p-sku" value={form.sku} onChange={setBaseSku} placeholder="ASC-TS-092" className={`${field(errors.sku)} font-mono uppercase`} maxLength={40} />
                                </Field>
                                <Field label="Umbral Stock Crítico (Alerta) *" htmlFor="p-threshold" error={errors.stock_alert_threshold}>
                                    <div className="relative">
                                        <input id="p-threshold" type="number" min="0" max="1000" value={form.stock_alert_threshold} onChange={set('stock_alert_threshold')} className={field(errors.stock_alert_threshold)} />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 font-label-caps text-[11px] text-on-surface-variant uppercase pointer-events-none">unidades</span>
                                    </div>
                                </Field>
                            </div>
                            <Field label="Descripción Detallada & Ficha Técnica" htmlFor="p-desc" error={errors.description}>
                                <textarea
                                    id="p-desc"
                                    rows={3}
                                    value={form.description}
                                    onChange={set('description')}
                                    placeholder="Material, gramaje, corte, cuidados..."
                                    className="p-space-sm rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:outline-hidden focus:ring-1 focus:ring-primary resize-none"
                                />
                            </Field>
                        </Section>

                        {/* Línea y tipo */}
                        <Section icon="account_tree" title="Línea y Tipo de Producto">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                                <Field label="Línea Oficial *" htmlFor="p-line" error={errors.line}>
                                    <select id="p-line" value={form.line} onChange={set('line')} className={`${field(errors.line)} px-space-sm`}>
                                        {LINES.map((l) => (
                                            <option key={l.value} value={l.value}>
                                                {l.label}
                                            </option>
                                        ))}
                                    </select>
                                </Field>
                                <div className="flex flex-col gap-space-xxs sm:col-span-2">
                                    <label className="font-label-md text-label-md text-on-surface font-medium" htmlFor="productTypeSelect">
                                        Tipo de Producto *
                                    </label>
                                    <ProductTypeSelect
                                        id="productTypeSelect"
                                        value={form.product_type_id}
                                        onChange={(id) => {
                                            setForm((f) => ({ ...f, product_type_id: id }));
                                            clearError('product_type_id');
                                        }}
                                        reloadKey={`${open}-${product?.id ?? 'new'}`}
                                        includeId={product?.product_type_id}
                                        error={errors.product_type_id}
                                        className="h-10 px-space-sm rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:outline-hidden focus:ring-1 focus:ring-primary w-full"
                                    />
                                </div>
                            </div>
                        </Section>

                        {/* Precios */}
                        <Section icon="monetization_on" title="Estructura de Precios (COP)">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                                <Field label="Precio Regular (COP) *" htmlFor="p-price" error={errors.price} hint={price ? formatCOP(price) : null}>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-secondary">$</span>
                                        <input id="p-price" type="number" min="0" step="1000" value={form.price} onChange={set('price')} placeholder="145000" className={`${field(errors.price)} pl-7 font-semibold`} />
                                    </div>
                                </Field>
                                <Field
                                    label="Precio Promocional (Opcional)"
                                    htmlFor="p-sale"
                                    error={errors.sale_price}
                                    hint={discount ? `${formatCOP(sale)} · ${discount}% de descuento` : 'Déjalo vacío si no hay promoción.'}
                                >
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-primary">$</span>
                                        <input id="p-sale" type="number" min="0" step="1000" value={form.sale_price} onChange={set('sale_price')} placeholder="125000" className={`${field(errors.sale_price)} pl-7 font-semibold text-primary`} />
                                    </div>
                                </Field>
                            </div>
                        </Section>

                        {/* Variantes */}
                        <Section
                            icon="layers"
                            title="Matriz de Variantes & Control de Stock"
                            action={
                                <button type="button" onClick={addVariant} className="font-label-caps text-label-caps text-primary hover:underline font-bold flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">add</span>
                                    Agregar Variante
                                </button>
                            }
                        >
                            {errors.variants && <span className="font-body-sm text-body-sm text-primary -mt-space-xs">{errors.variants}</span>}
                            <div className="overflow-x-auto bg-surface-container-lowest rounded-lg">
                                <table className="w-full text-left border-collapse text-body-sm">
                                    <thead>
                                        <tr className="bg-surface-container text-on-surface-variant font-label-caps text-[10px] uppercase">
                                            <th className="p-2.5 w-20">Talla</th>
                                            <th className="p-2.5">Color</th>
                                            <th className="p-2.5 w-[42%]">SKU Variante</th>
                                            <th className="p-2.5 text-right w-20">{editing ? 'Stock' : 'Stock inicial'}</th>
                                            <th className="p-2.5 w-10" />
                                        </tr>
                                    </thead>
                                    <tbody className="text-on-surface">
                                        {variants.map((v, i) => (
                                            <tr key={v.key} className="border-b border-surface-container last:border-0 align-top" data-variant-row={i}>
                                                <td className="p-2">
                                                    <input
                                                        list="size-suggestions"
                                                        value={v.size}
                                                        onChange={(e) => updateVariant(v.key, { size: e.target.value.toUpperCase() })}
                                                        placeholder="M"
                                                        aria-label={`Talla variante ${i + 1}`}
                                                        className={`${field(vErr(i, 'size'))} h-8 px-2 font-bold uppercase`}
                                                        maxLength={20}
                                                    />
                                                    {vErr(i, 'size') && <span className="block text-[11px] text-primary mt-0.5">{vErr(i, 'size')}</span>}
                                                </td>
                                                <td className="p-2">
                                                    <div className="flex items-center gap-1.5">
                                                        <input
                                                            type="color"
                                                            value={v.color_hex || '#111111'}
                                                            onChange={(e) => updateVariant(v.key, { color_hex: e.target.value })}
                                                            aria-label={`Tono variante ${i + 1}`}
                                                            className="w-7 h-7 rounded-full overflow-hidden border border-secondary-container cursor-pointer shrink-0 p-0 bg-transparent"
                                                        />
                                                        <input
                                                            list="color-suggestions"
                                                            value={v.color}
                                                            onChange={(e) => updateVariant(v.key, { color: e.target.value })}
                                                            placeholder="Negro"
                                                            aria-label={`Color variante ${i + 1}`}
                                                            className={`${field(vErr(i, 'color'))} h-8 px-2`}
                                                            maxLength={40}
                                                        />
                                                    </div>
                                                    {vErr(i, 'color') && <span className="block text-[11px] text-primary mt-0.5">{vErr(i, 'color')}</span>}
                                                </td>
                                                <td className="p-2">
                                                    <input
                                                        value={v.sku}
                                                        onChange={(e) => updateVariant(v.key, { sku: e.target.value.toUpperCase().replace(/\s+/g, '-'), skuTouched: true })}
                                                        aria-label={`SKU variante ${i + 1}`}
                                                        className={`${field(vErr(i, 'sku'))} h-8 px-2 font-mono text-[12px] text-on-surface-variant uppercase`}
                                                        maxLength={60}
                                                    />
                                                    {vErr(i, 'sku') && <span className="block text-[11px] text-primary mt-0.5">{vErr(i, 'sku')}</span>}
                                                </td>
                                                <td className="p-2 text-right">
                                                    {v.id ? (
                                                        <span className="inline-flex items-center justify-end gap-1 h-8 font-semibold text-on-surface" title="El stock se gestiona desde Inventario" aria-label={`Stock variante ${i + 1}`}>
                                                            {v.stock}
                                                            <span className="material-symbols-outlined text-[14px] text-secondary">lock</span>
                                                        </span>
                                                    ) : (
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={v.stock}
                                                        onChange={(e) => updateVariant(v.key, { stock: e.target.value })}
                                                        aria-label={`Stock variante ${i + 1}`}
                                                        className={`${field(vErr(i, 'stock'))} h-8 px-2 text-right font-semibold`}
                                                    />
                                                    )}
                                                    {vErr(i, 'stock') && <span className="block text-[11px] text-primary mt-0.5 text-left">{vErr(i, 'stock')}</span>}
                                                </td>
                                                <td className="p-2 text-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeVariant(v.key)}
                                                        disabled={variants.length === 1}
                                                        title={variants.length === 1 ? 'Debe existir al menos una variante' : 'Quitar variante'}
                                                        aria-label={`Quitar variante ${i + 1}`}
                                                        className="text-secondary hover:text-error disabled:opacity-30 disabled:cursor-not-allowed mt-1.5"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="bg-surface-container/60 font-label-caps text-[11px] uppercase text-on-surface-variant">
                                            <td className="p-2.5" colSpan={3}>
                                                {variants.length} {variants.length === 1 ? 'variante' : 'variantes'}
                                            </td>
                                            <td className="p-2.5 text-right text-on-surface font-bold">{totalStock} und.</td>
                                            <td />
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <p className="font-body-sm text-body-sm text-secondary flex items-start gap-1 -mt-space-xs">
                                <span className="material-symbols-outlined text-[16px] text-tertiary">info</span>
                                {editing ? (
                                    <span>
                                        El stock de las variantes existentes se gestiona desde{' '}
                                        <Link to="/admin/inventario" onClick={onClose} className="text-primary hover:underline font-medium">
                                            Inventario
                                        </Link>{' '}
                                        (entradas, salidas y ajustes con registro). Las variantes nuevas ingresan con su stock inicial.
                                    </span>
                                ) : (
                                    <span>El stock que definas aquí ingresa al inventario como stock inicial. Después se gestiona desde Inventario.</span>
                                )}
                            </p>
                            <datalist id="size-suggestions">
                                {SIZE_SUGGESTIONS.map((s) => (
                                    <option key={s} value={s} />
                                ))}
                            </datalist>
                            <datalist id="color-suggestions">
                                {COLOR_PRESETS.map((c) => (
                                    <option key={c.name} value={c.name} />
                                ))}
                            </datalist>
                        </Section>

                        {/* Visibilidad */}
                        <Section icon="sell" title="Visibilidad y Colecciones">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                                <Field label="Estado del Producto" htmlFor="p-status" error={errors.status}>
                                    <select id="p-status" value={form.status} onChange={set('status')} className={`${field(errors.status)} px-space-sm`}>
                                        {STATUSES.map((s) => (
                                            <option key={s.value} value={s.value}>
                                                {s.label}
                                            </option>
                                        ))}
                                    </select>
                                </Field>
                                <label className="flex items-center justify-between gap-space-md p-space-sm rounded-lg bg-surface-container-lowest cursor-pointer self-end h-10">
                                    <span className="font-label-md text-label-md text-on-surface font-medium flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[18px] text-primary">star</span>
                                        Producto destacado
                                    </span>
                                    <span className="relative inline-flex items-center shrink-0">
                                        <input type="checkbox" className="peer sr-only" checked={form.is_featured} onChange={set('is_featured')} aria-label="Producto destacado" />
                                        <span className="w-9 h-5 rounded-full bg-surface-container-highest peer-checked:bg-primary-container transition-colors" />
                                        <span className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-4" />
                                    </span>
                                </label>
                            </div>
                            <Field label="Etiquetas Comerciales" htmlFor="p-tag" error={errors.tags}>
                                <div className="flex flex-wrap gap-1.5">
                                    {form.tags.map((t) => (
                                        <span key={t} className="px-2 py-1 rounded-sm bg-primary-container text-on-primary font-label-caps text-[10px] font-bold flex items-center gap-1">
                                            {t}
                                            <button type="button" onClick={() => removeTag(t)} aria-label={`Quitar etiqueta ${t}`} className="flex">
                                                <span className="material-symbols-outlined text-[12px]">close</span>
                                            </button>
                                        </span>
                                    ))}
                                    {TAG_SUGGESTIONS.filter((t) => !form.tags.includes(t)).map((t) => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => addTag(t)}
                                            className="px-2 py-1 rounded-sm bg-surface-container text-secondary font-label-caps text-[10px] font-semibold hover:bg-surface-container-highest"
                                        >
                                            + {t}
                                        </button>
                                    ))}
                                </div>
                                <input
                                    id="p-tag"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addTag(tagInput);
                                        }
                                    }}
                                    placeholder="Escribe una etiqueta y presiona Enter"
                                    maxLength={30}
                                    className={`${field(false)} mt-1`}
                                />
                            </Field>
                        </Section>
                    </div>

                    {/* Acciones */}
                    <div className="p-space-lg bg-surface-container-low flex items-center justify-between shrink-0">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={Boolean(saving)}
                            className="h-10 px-space-md rounded-lg bg-surface-container-lowest text-on-surface font-label-lg text-label-lg hover:bg-surface-container transition-colors"
                        >
                            Cancelar
                        </button>
                        <div className="flex items-center gap-space-sm">
                            <button
                                type="button"
                                onClick={() => submit(true)}
                                disabled={Boolean(saving)}
                                className="h-10 px-space-md rounded-lg bg-surface-container-lowest text-primary font-label-lg text-label-lg hover:bg-error-container/30 transition-colors disabled:opacity-60"
                            >
                                {saving === 'draft' ? 'Guardando...' : 'Guardar como Borrador'}
                            </button>
                            <button
                                type="button"
                                onClick={() => submit(false)}
                                disabled={Boolean(saving)}
                                className="h-10 px-space-lg rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg shadow-xs hover:bg-primary transition-all flex items-center gap-space-xs font-semibold disabled:opacity-70 disabled:cursor-wait"
                            >
                                <span className={`material-symbols-outlined text-[18px] ${saving === 'save' ? 'animate-spin' : ''}`}>{saving === 'save' ? 'progress_activity' : 'save'}</span>
                                <span>{saving === 'save' ? 'Guardando...' : 'Guardar Producto'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
