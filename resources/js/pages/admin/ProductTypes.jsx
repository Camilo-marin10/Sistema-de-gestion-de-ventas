import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { productTypesApi } from '../../api/productTypes';
import { parseApiError } from '../../api/axios';
import Badge from '../../components/ui/Badge';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Toast, { useToast } from '../../components/ui/Toast';
import { formatDate, plural } from '../../lib/format';

const inputClass = (error) =>
    `w-full h-10 px-space-md rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface placeholder:text-secondary focus:outline-hidden focus:ring-1 transition-all border ${
        error ? 'border-primary-container focus:ring-primary-container bg-error-container/10' : 'border-secondary-container focus:ring-primary focus:border-primary'
    }`;

const iconBtn = 'p-1.5 rounded-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed';

function Toggle({ checked, disabled, onChange, label }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            disabled={disabled}
            onClick={onChange}
            className={`relative w-11 h-6 rounded-full transition-colors shrink-0 disabled:opacity-50 ${checked ? 'bg-primary-container' : 'bg-surface-container-highest'}`}
        >
            <span className={`absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-5' : ''}`} />
        </button>
    );
}

function KpiCard({ label, value, icon, hint }) {
    return (
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
                <span className="font-label-caps text-label-caps uppercase text-secondary font-semibold">{label}</span>
                <span className="material-symbols-outlined text-[20px] text-secondary">{icon}</span>
            </div>
            <span className="font-display-lg text-display-lg tracking-tight text-on-surface">{value ?? '—'}</span>
            {hint && <span className="font-body-sm text-body-sm text-secondary">{hint}</span>}
        </div>
    );
}

/** Fila en modo edición (también se usa para crear). */
function EditRow({ initial, saving, errors, onSave, onCancel, submitLabel }) {
    const [name, setName] = useState(initial.name ?? '');
    const [description, setDescription] = useState(initial.description ?? '');
    const nameRef = useRef(null);

    useEffect(() => {
        nameRef.current?.focus();
    }, []);

    const submit = () => onSave({ name, description });
    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submit();
        }
        if (e.key === 'Escape' && onCancel) onCancel();
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm items-start">
            <div className="md:col-span-4 flex flex-col gap-space-xxs">
                <input
                    ref={nameRef}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Nombre del tipo (ej. Camisetas oversize)"
                    aria-label="Nombre del tipo de producto"
                    maxLength={80}
                    className={inputClass(errors?.name)}
                />
                {errors?.name && <span className="font-body-sm text-body-sm text-primary">{errors.name}</span>}
            </div>
            <div className="md:col-span-6 flex flex-col gap-space-xxs">
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Descripción opcional (corte, uso, material...)"
                    aria-label="Descripción del tipo de producto"
                    maxLength={255}
                    className={inputClass(errors?.description)}
                />
                {errors?.description && <span className="font-body-sm text-body-sm text-primary">{errors.description}</span>}
            </div>
            <div className="md:col-span-2 flex items-center gap-space-xs md:justify-end">
                <button
                    type="button"
                    onClick={submit}
                    disabled={saving}
                    className="h-10 px-space-md rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg flex items-center gap-1 transition-colors disabled:opacity-70 disabled:cursor-wait whitespace-nowrap"
                >
                    <span className={`material-symbols-outlined text-[18px] ${saving ? 'animate-spin' : ''}`}>{saving ? 'progress_activity' : initial.id ? 'check' : 'add'}</span>
                    {submitLabel}
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel} disabled={saving} title="Cancelar" aria-label="Cancelar edición" className={`${iconBtn} h-10 px-2 text-secondary hover:bg-surface-container hover:text-on-surface`}>
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                )}
            </div>
        </div>
    );
}

export default function ProductTypes() {
    const [types, setTypes] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState('');

    const [createKey, setCreateKey] = useState(0); // reinicia la fila de alta tras crear
    const [createErrors, setCreateErrors] = useState({});
    const [creating, setCreating] = useState(false);

    const [editingId, setEditingId] = useState(null);
    const [editErrors, setEditErrors] = useState({});
    const [busyId, setBusyId] = useState(null);

    const [toDelete, setToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [toast, notify, dismiss] = useToast();

    const load = useCallback(async () => {
        setLoadError('');
        try {
            const res = await productTypesApi.list();
            setTypes(res.data);
            setSummary(res.summary);
        } catch (err) {
            setLoadError(parseApiError(err).message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        return types.filter(
            (t) =>
                (!q || t.name.toLowerCase().includes(q) || (t.description ?? '').toLowerCase().includes(q)) &&
                (!status || (status === 'activo') === t.is_active),
        );
    }, [types, query, status]);

    const handleCreate = async ({ name, description }) => {
        setCreating(true);
        setCreateErrors({});
        try {
            const res = await productTypesApi.create({ name, description, is_active: true });
            notify('Tipo de producto creado', res.data.name);
            setCreateKey((k) => k + 1);
            await load();
        } catch (err) {
            const parsed = parseApiError(err);
            setCreateErrors(Object.keys(parsed.fields).length ? parsed.fields : { name: parsed.message });
        } finally {
            setCreating(false);
        }
    };

    const handleUpdate = async (type, changes, { silent = false } = {}) => {
        setBusyId(type.id);
        setEditErrors({});
        try {
            const res = await productTypesApi.update(type.id, {
                name: changes.name ?? type.name,
                description: changes.description !== undefined ? changes.description : type.description,
                is_active: changes.is_active ?? type.is_active,
            });
            setTypes((list) => list.map((t) => (t.id === type.id ? res.data : t)));
            setEditingId(null);
            if (!silent) notify('Tipo de producto actualizado', res.data.name);
            load(); // refresca KPIs
            return true;
        } catch (err) {
            const parsed = parseApiError(err);
            if (silent) notify('No se pudo actualizar', parsed.message, 'error');
            else setEditErrors(Object.keys(parsed.fields).length ? parsed.fields : { name: parsed.message });
            return false;
        } finally {
            setBusyId(null);
        }
    };

    const toggleActive = (type) => {
        handleUpdate(type, { is_active: !type.is_active }, { silent: true }).then((ok) =>
            ok && notify(type.is_active ? 'Tipo desactivado' : 'Tipo activado', `${type.name} ${type.is_active ? 'ya no aparece' : 'vuelve a aparecer'} al crear productos.`),
        );
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await productTypesApi.remove(toDelete.id);
            notify('Tipo de producto eliminado', toDelete.name);
            setToDelete(null);
            load();
        } catch (err) {
            setToDelete(null);
            notify('No se pudo eliminar', parseApiError(err).message, 'error');
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="flex flex-col w-full gap-space-xl">
            {/* Encabezado */}
            <section className="flex flex-col gap-space-xs">
                <div className="flex items-center gap-space-xs text-secondary font-label-caps text-label-caps tracking-widest uppercase">
                    <span>Inicio</span>
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    <span>Catálogo</span>
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    <span className="text-primary font-bold">Tipos de producto</span>
                </div>
                <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight">Tipos de Producto</h1>
                <p className="font-body-md text-body-md text-secondary max-w-3xl">
                    Clasificación a la que se asigna cada producto (ej. camisetas oversize, camisetas ombligueras, tenis urbanos). Los tipos activos aparecen como opciones al crear
                    productos.
                </p>
            </section>

            {/* KPIs */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-gutter">
                <KpiCard label="Tipos registrados" value={summary?.total} icon="style" />
                <KpiCard label="Activos" value={summary?.active} icon="visibility" hint="Disponibles en el formulario de productos" />
                <KpiCard label="En uso" value={summary?.in_use} icon="link" hint="Con al menos un producto asignado" />
            </section>

            <section className="bg-surface-container-lowest rounded-xl shadow-xs overflow-hidden">
                {/* Alta rápida */}
                <div className="p-space-lg bg-surface-container-low/60 flex flex-col gap-space-sm">
                    <div className="flex items-center gap-space-xs text-on-surface font-title-md text-title-md">
                        <span className="material-symbols-outlined text-primary text-[20px]">add_circle</span>
                        Nuevo tipo de producto
                    </div>
                    <EditRow key={createKey} initial={{}} saving={creating} errors={createErrors} onSave={handleCreate} submitLabel="Agregar" />
                </div>

                {/* Filtros */}
                <div className="px-space-lg py-space-md flex flex-col md:flex-row md:items-center justify-between gap-space-sm border-b border-surface-container">
                    <div className="relative w-full md:max-w-sm">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px]">search</span>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Buscar tipo de producto..."
                            className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-secondary focus:outline-hidden focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div className="flex items-center gap-space-sm">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            aria-label="Estado"
                            className="h-10 pl-3 pr-8 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface font-medium focus:outline-hidden focus:ring-1 focus:ring-primary cursor-pointer"
                        >
                            <option value="">Todos los estados</option>
                            <option value="activo">Activos</option>
                            <option value="inactivo">Inactivos</option>
                        </select>
                        <span className="font-body-sm text-body-sm text-secondary whitespace-nowrap">{plural(visible.length, 'tipo')}</span>
                    </div>
                </div>

                {/* Encabezados de la lista */}
                <div className="hidden md:grid grid-cols-12 gap-space-sm px-space-lg py-space-sm bg-surface-container-low text-on-surface-variant font-label-caps text-label-caps uppercase tracking-wider">
                    <span className="col-span-4">Tipo de producto</span>
                    <span className="col-span-4">Descripción</span>
                    <span className="col-span-1 text-center">Productos</span>
                    <span className="col-span-1 text-center">Activo</span>
                    <span className="col-span-2 text-right">Acciones</span>
                </div>

                <ul className={loading ? 'opacity-50' : ''}>
                    {visible.map((type) => (
                        <li key={type.id} className="px-space-lg py-space-md border-b border-surface-container last:border-0 hover:bg-surface-container-low/40 transition-colors" data-type-id={type.id}>
                            {editingId === type.id ? (
                                <EditRow
                                    initial={type}
                                    saving={busyId === type.id}
                                    errors={editErrors}
                                    onSave={(changes) => handleUpdate(type, changes)}
                                    onCancel={() => {
                                        setEditingId(null);
                                        setEditErrors({});
                                    }}
                                    submitLabel="Guardar"
                                />
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm items-center">
                                    <div className="md:col-span-4 flex items-center gap-space-sm min-w-0">
                                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${type.is_active ? 'bg-error-container/40 text-primary' : 'bg-surface-container text-secondary'}`}>
                                            <span className="material-symbols-outlined text-[20px]">style</span>
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className={`font-title-md text-body-md font-semibold truncate ${type.is_active ? 'text-on-surface' : 'text-secondary line-through'}`}>{type.name}</span>
                                            <span className="font-body-sm text-body-sm text-secondary">Creado {formatDate(type.created_at)}</span>
                                        </div>
                                    </div>
                                    <p className="md:col-span-4 font-body-md text-body-md text-on-surface-variant line-clamp-2">
                                        {type.description || <span className="text-secondary italic">Sin descripción</span>}
                                    </p>
                                    <div className="md:col-span-1 flex md:justify-center">
                                        <Badge tone={type.products_count ? 'info' : 'neutral'}>{type.products_count}</Badge>
                                    </div>
                                    <div className="md:col-span-1 flex md:justify-center">
                                        <Toggle
                                            checked={type.is_active}
                                            disabled={busyId === type.id}
                                            onChange={() => toggleActive(type)}
                                            label={`${type.is_active ? 'Desactivar' : 'Activar'} ${type.name}`}
                                        />
                                    </div>
                                    <div className="md:col-span-2 flex items-center md:justify-end gap-1">
                                        <button
                                            type="button"
                                            title="Editar"
                                            aria-label={`Editar ${type.name}`}
                                            onClick={() => {
                                                setEditingId(type.id);
                                                setEditErrors({});
                                            }}
                                            className={`${iconBtn} text-on-surface-variant hover:bg-surface-container hover:text-on-surface`}
                                        >
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                        <button
                                            type="button"
                                            title="Eliminar"
                                            aria-label={`Eliminar ${type.name}`}
                                            onClick={() => setToDelete(type)}
                                            className={`${iconBtn} text-on-surface-variant hover:bg-[#FCEAEC] hover:text-primary-container`}
                                        >
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>

                {!loading && !loadError && visible.length === 0 && (
                    <div className="py-space-2xl flex flex-col items-center text-center gap-space-sm px-space-md">
                        <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center">
                            <span className="material-symbols-outlined text-secondary text-[24px]">style</span>
                        </div>
                        <span className="font-title-md text-title-md text-on-surface font-semibold">
                            {types.length ? 'Ningún tipo coincide con la búsqueda' : 'Aún no hay tipos de producto'}
                        </span>
                        <span className="font-body-sm text-body-sm text-secondary max-w-sm">
                            {types.length ? 'Ajusta la búsqueda o el filtro de estado.' : 'Agrega el primero con el formulario de arriba.'}
                        </span>
                    </div>
                )}
                {loadError && (
                    <div className="py-space-xl flex flex-col items-center gap-space-sm text-center">
                        <span className="font-body-md text-body-md text-primary">{loadError}</span>
                        <button type="button" onClick={load} className="h-9 px-space-md rounded-lg bg-inverse-surface text-inverse-on-surface font-label-md text-label-md">
                            Reintentar
                        </button>
                    </div>
                )}
            </section>

            <ConfirmDialog
                open={Boolean(toDelete)}
                title={`¿Eliminar "${toDelete?.name ?? ''}"?`}
                message={
                    toDelete?.products_count
                        ? `Este tipo tiene ${plural(toDelete.products_count, 'producto asignado', 'productos asignados')}: el sistema no permitirá eliminarlo. Puedes desactivarlo para ocultarlo de los formularios.`
                        : 'Dejará de estar disponible al crear productos. Esta acción no se puede deshacer.'
                }
                confirmLabel="Eliminar tipo"
                busy={deleting}
                onConfirm={handleDelete}
                onCancel={() => setToDelete(null)}
            />
            <Toast toast={toast} onClose={dismiss} />
        </div>
    );
}
