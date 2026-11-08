import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminUsersApi } from '../../../api/adminUsers';
import { parseApiError } from '../../../api/axios';
import Badge, { ROLE_BADGE } from '../../../components/ui/Badge';
import ConfirmDialog from '../../../components/ui/ConfirmDialog';
import Toast, { useToast } from '../../../components/ui/Toast';
import { useAuth } from '../../../context/AuthContext';
import useDebounce from '../../../hooks/useDebounce';
import { formatCOP, formatDate, formatRelative, initials, plural } from '../../../lib/format';
import { groupForRole, USER_GROUPS } from './groups';
import UserFormDrawer from './UserFormDrawer';

function KpiCard({ label, value, icon, accent = false, children }) {
    return (
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs flex flex-col justify-between gap-space-sm">
            <div className="flex items-center justify-between">
                <span className="font-label-caps text-label-caps uppercase text-secondary font-semibold">{label}</span>
                <span className={`material-symbols-outlined text-[20px] ${accent ? 'text-primary' : 'text-secondary'}`}>{icon}</span>
            </div>
            <span className={`font-display-lg text-display-lg tracking-tight ${accent ? 'text-primary' : 'text-on-surface'}`}>{value ?? '—'}</span>
            {children && <div className="font-body-sm text-body-sm text-secondary">{children}</div>}
        </div>
    );
}

const selectClass =
    'h-10 pl-3 pr-8 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface font-medium focus:outline-hidden focus:ring-1 focus:ring-primary cursor-pointer';

export default function UsersList({ group: groupKey }) {
    const group = USER_GROUPS[groupKey];
    const navigate = useNavigate();
    const [toast, notify, dismiss] = useToast();

    const [filters, setFilters] = useState({ q: '', role: '', status: '', sort: 'recientes', page: 1 });
    const debouncedQ = useDebounce(filters.q);
    const [result, setResult] = useState({ data: [], meta: null, summary: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [drawer, setDrawer] = useState({ open: false, user: null });
    const [toDelete, setToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const { user: me } = useAuth();

    // Al cambiar de lista (empleados ↔ clientes) se reinician los filtros.
    useEffect(() => {
        setFilters({ q: '', role: '', status: '', sort: 'recientes', page: 1 });
    }, [groupKey]);

    const load = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const res = await adminUsersApi.list({
                group: groupKey,
                q: debouncedQ || undefined,
                role: filters.role || undefined,
                status: filters.status || undefined,
                sort: filters.sort,
                page: filters.page,
                per_page: 10,
            });
            setResult({ data: res.data, meta: res.meta, summary: res.summary });
        } catch (err) {
            setError(parseApiError(err).message);
        } finally {
            setLoading(false);
        }
    }, [groupKey, debouncedQ, filters.role, filters.status, filters.sort, filters.page]);

    useEffect(() => {
        load();
    }, [load]);

    const setFilter = (key) => (e) => setFilters((f) => ({ ...f, [key]: e.target.value, page: 1 }));
    const hasFilters = filters.q || filters.role || filters.status;

    const handleSaved = (saved, message) => {
        setDrawer({ open: false, user: null });
        const target = groupForRole(saved.role);
        if (target.key !== groupKey) {
            notify(message ?? 'Usuario guardado', `${saved.name} ahora está en la lista de ${target.title}.`);
        } else {
            notify(message ?? 'Usuario guardado', saved.name);
        }
        load();
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            const res = await adminUsersApi.remove(toDelete.id);
            notify(res.message ?? 'Usuario eliminado', toDelete.name);
            setToDelete(null);
            // Si era el último de la página, retrocede una página.
            if (result.data.length === 1 && filters.page > 1) setFilters((f) => ({ ...f, page: f.page - 1 }));
            else load();
        } catch (err) {
            setToDelete(null);
            notify('No se pudo eliminar', parseApiError(err).message, 'error');
        } finally {
            setDeleting(false);
        }
    };

    const actionBtn = 'p-1.5 rounded-sm hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors';

    const { summary, meta, data } = result;
    const isEmployees = groupKey === 'empleados';

    return (
        <div className="flex flex-col w-full gap-space-xl">
            {/* Encabezado */}
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
                <div className="flex flex-col gap-space-xs">
                    <div className="flex items-center gap-space-xs text-secondary font-label-caps text-label-caps tracking-widest uppercase">
                        <span>Inicio</span>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span>Usuarios</span>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="text-primary font-bold">{group.title}</span>
                    </div>
                    <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight">Gestión de {group.title}</h1>
                    <p className="font-body-md text-body-md text-secondary">{group.description}</p>
                </div>
                <div className="flex flex-wrap items-center gap-space-sm">
                    {/* Conmutador de listas */}
                    <div className="bg-surface-container-lowest p-1 rounded-lg shadow-xs flex items-center">
                        {Object.values(USER_GROUPS).map((g) => (
                            <Link
                                key={g.key}
                                to={g.basePath}
                                className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md transition-all flex items-center gap-1.5 ${
                                    g.key === groupKey ? 'bg-inverse-surface text-inverse-on-surface shadow-xs' : 'text-on-surface hover:bg-surface-container'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[16px]">{g.icon}</span>
                                {g.title}
                            </Link>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => setDrawer({ open: true, user: null })}
                        className="flex items-center gap-space-xs bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg px-space-md h-10 rounded-lg shadow-xs transition-all"
                    >
                        <span className="material-symbols-outlined text-[18px]">person_add</span>
                        <span>Nuevo {group.singular}</span>
                    </button>
                </div>
            </section>

            {/* KPIs */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
                <KpiCard label={`Total ${group.title}`} value={summary?.total} icon={group.icon}>
                    {summary ? `+${summary.new_this_month} este mes` : null}
                </KpiCard>
                <KpiCard label="Cuentas activas" value={summary?.active} icon="verified_user" />
                {isEmployees ? (
                    <KpiCard label="Administradores / Vendedores" value={summary ? `${summary.admins} / ${summary.vendedores}` : null} icon="shield_person" />
                ) : (
                    <KpiCard label="Clientes con compras" value={summary?.with_purchases} icon="shopping_bag">
                        {summary?.total ? `${Math.round((summary.with_purchases / summary.total) * 100)}% de conversión` : null}
                    </KpiCard>
                )}
                <KpiCard label="Cuentas inactivas" value={summary?.inactive} icon="block" accent={summary?.inactive > 0} />
            </section>

            {/* Tabla */}
            <section className="bg-surface-container-lowest rounded-xl shadow-xs overflow-hidden">
                <div className="p-space-lg flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
                    <div className="relative w-full lg:max-w-sm">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px]">search</span>
                        <input
                            value={filters.q}
                            onChange={setFilter('q')}
                            placeholder="Buscar por nombre, correo o teléfono..."
                            className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-secondary focus:outline-hidden focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div className="flex flex-wrap items-center gap-space-sm">
                        {group.roleFilters && (
                            <select value={filters.role} onChange={setFilter('role')} className={selectClass} aria-label="Rol">
                                {group.roleFilters.map((r) => (
                                    <option key={r.value} value={r.value}>
                                        {r.label}
                                    </option>
                                ))}
                            </select>
                        )}
                        <select value={filters.status} onChange={setFilter('status')} className={selectClass} aria-label="Estado">
                            <option value="">Todos los estados</option>
                            <option value="activo">Activos</option>
                            <option value="inactivo">Inactivos</option>
                        </select>
                        <select value={filters.sort} onChange={setFilter('sort')} className={selectClass} aria-label="Orden">
                            <option value="recientes">Más recientes</option>
                            <option value="nombre">Nombre (A-Z)</option>
                            <option value="actividad">Mayor {isEmployees ? 'venta' : 'compra'}</option>
                        </select>
                        {hasFilters && (
                            <button
                                type="button"
                                onClick={() => setFilters((f) => ({ ...f, q: '', role: '', status: '', page: 1 }))}
                                className="h-10 px-space-sm rounded-lg text-secondary hover:text-on-surface hover:bg-surface-container-low font-label-md text-label-md flex items-center gap-1"
                            >
                                <span className="material-symbols-outlined text-[16px]">filter_alt_off</span>
                                Limpiar
                            </button>
                        )}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-surface-container-low text-on-surface-variant font-label-caps text-label-caps uppercase tracking-wider">
                                <th className="py-space-sm px-space-lg font-semibold">Usuario</th>
                                <th className="py-space-sm px-space-md font-semibold hidden 2xl:table-cell">Teléfono</th>
                                {isEmployees && <th className="py-space-sm px-space-md font-semibold">Rol</th>}
                                <th className="py-space-sm px-space-md font-semibold">Estado</th>
                                <th className="py-space-sm px-space-md font-semibold text-right">{group.activityLabel}</th>
                                <th className="py-space-sm px-space-md font-semibold">Último acceso</th>
                                <th className="py-space-sm px-space-lg font-semibold text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className={loading ? 'opacity-50 transition-opacity' : 'transition-opacity'}>
                            {data.map((u) => (
                                <tr
                                    key={u.id}
                                    onClick={() => navigate(`${group.basePath}/${u.id}`)}
                                    className="border-b border-surface-container last:border-0 hover:bg-surface-container-low/60 transition-colors cursor-pointer"
                                >
                                    <td className="py-space-md px-space-lg">
                                        <div className="flex items-center gap-space-sm">
                                            <div
                                                className={`w-9 h-9 rounded-full flex items-center justify-center font-label-md text-label-md font-semibold shrink-0 ${
                                                    u.is_active ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-secondary'
                                                }`}
                                            >
                                                {initials(u.name)}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="font-title-md text-body-md text-on-surface font-semibold truncate">{u.name}</span>
                                                <span className="font-body-sm text-body-sm text-secondary truncate">{u.email}</span>
                                                {u.phone && <span className="font-body-sm text-body-sm text-secondary truncate 2xl:hidden">{u.phone}</span>}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md font-body-md text-body-md text-on-surface whitespace-nowrap hidden 2xl:table-cell">{u.phone || '—'}</td>
                                    {isEmployees && (
                                        <td className="py-space-md px-space-md">
                                            <Badge {...ROLE_BADGE[u.role]}>{u.role_label}</Badge>
                                        </td>
                                    )}
                                    <td className="py-space-md px-space-md">
                                        <Badge tone={u.is_active ? 'success' : 'critical'}>{u.is_active ? 'Activo' : 'Inactivo'}</Badge>
                                    </td>
                                    <td className="py-space-md px-space-md text-right whitespace-nowrap">
                                        <div className="flex flex-col items-end">
                                            <span className="font-label-lg text-label-lg text-on-surface font-semibold tabular-nums">{formatCOP(u.activity?.total)}</span>
                                            <span className="font-body-sm text-body-sm text-secondary">
                                                {plural(u.activity?.count ?? 0, isEmployees ? 'venta' : 'compra')}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-md whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="font-body-md text-body-md text-on-surface">{formatRelative(u.last_login_at)}</span>
                                            <span className="font-body-sm text-body-sm text-secondary">Desde {formatDate(u.created_at)}</span>
                                        </div>
                                    </td>
                                    <td className="py-space-md px-space-lg">
                                        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                                            <button
                                                type="button"
                                                title="Editar"
                                                aria-label={`Editar a ${u.name}`}
                                                onClick={() => setDrawer({ open: true, user: u })}
                                                className={actionBtn}
                                            >
                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                            </button>
                                            <Link
                                                to={`${group.basePath}/${u.id}`}
                                                title={group.historyTitle}
                                                aria-label={`${group.historyTitle} de ${u.name}`}
                                                className={actionBtn}
                                            >
                                                <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                                            </Link>
                                            {me?.id === u.id ? (
                                                <span title="No puedes eliminar tu propia cuenta" className="p-1.5 text-surface-container-highest cursor-not-allowed">
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </span>
                                            ) : (
                                                <button
                                                    type="button"
                                                    title="Eliminar"
                                                    aria-label={`Eliminar a ${u.name}`}
                                                    onClick={() => setToDelete(u)}
                                                    className="p-1.5 rounded-sm hover:bg-[#FCEAEC] text-on-surface-variant hover:text-primary-container transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {!loading && !error && data.length === 0 && (
                        <div className="py-space-2xl flex flex-col items-center text-center gap-space-sm px-space-md">
                            <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center">
                                <span className="material-symbols-outlined text-secondary text-[24px]">person_search</span>
                            </div>
                            <span className="font-title-md text-title-md text-on-surface font-semibold">
                                {hasFilters ? 'Ningún usuario coincide con los filtros' : `Aún no hay ${group.title.toLowerCase()} registrados`}
                            </span>
                            <span className="font-body-sm text-body-sm text-secondary max-w-sm">
                                {hasFilters ? 'Ajusta la búsqueda o limpia los filtros.' : `Crea el primer ${group.singular} con el botón "Nuevo ${group.singular}".`}
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
                    <div className="px-space-lg py-space-md flex items-center justify-between gap-space-md border-t border-surface-container">
                        <span className="font-body-sm text-body-sm text-secondary">
                            Mostrando {meta.from}–{meta.to} de {meta.total} {group.title.toLowerCase()}
                        </span>
                        <div className="flex items-center gap-space-xs">
                            <button
                                type="button"
                                disabled={meta.current_page <= 1}
                                onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
                                className="h-9 px-space-md rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md hover:bg-surface-container disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Anterior
                            </button>
                            <span className="font-label-md text-label-md text-on-surface px-space-xs">
                                {meta.current_page} / {meta.last_page}
                            </span>
                            <button
                                type="button"
                                disabled={meta.current_page >= meta.last_page}
                                onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
                                className="h-9 px-space-md rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md hover:bg-surface-container disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                )}
            </section>

            <UserFormDrawer
                open={drawer.open}
                user={drawer.user}
                defaultRole={group.defaultRole}
                onClose={() => setDrawer({ open: false, user: null })}
                onSaved={handleSaved}
            />
            <ConfirmDialog
                open={Boolean(toDelete)}
                title={`¿Eliminar a ${toDelete?.name ?? ''}?`}
                message={
                    toDelete?.activity?.count
                        ? `Tiene ${toDelete.activity.count} ${group.historyNoun} registradas: el sistema no permitirá eliminarlo para conservar el historial. Puedes desactivarlo desde Editar.`
                        : 'Esta acción no se puede deshacer. Se eliminará la cuenta y su acceso al sistema.'
                }
                confirmLabel="Eliminar usuario"
                busy={deleting}
                onConfirm={handleDelete}
                onCancel={() => setToDelete(null)}
            />
            <Toast toast={toast} onClose={dismiss} />
        </div>
    );
}
