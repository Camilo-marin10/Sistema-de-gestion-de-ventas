import { Fragment, useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { adminUsersApi } from '../../../api/adminUsers';
import { parseApiError } from '../../../api/axios';
import Badge, { ROLE_BADGE, SALE_STATUS_TONE } from '../../../components/ui/Badge';
import ConfirmDialog from '../../../components/ui/ConfirmDialog';
import PageLoader from '../../../components/ui/PageLoader';
import Toast, { useToast } from '../../../components/ui/Toast';
import { useAuth } from '../../../context/AuthContext';
import { formatCOP, formatDate, formatDateTime, formatRelative, initials, plural } from '../../../lib/format';
import { groupForRole, USER_GROUPS } from './groups';
import UserFormDrawer from './UserFormDrawer';

const STATUS_FILTERS = [
    ['', 'Todos'],
    ['pendiente', 'Pendientes'],
    ['confirmado', 'Confirmados'],
    ['preparacion', 'En preparación'],
    ['enviado', 'Enviados'],
    ['entregado', 'Entregados'],
    ['cancelado', 'Cancelados'],
];

function Stat({ label, value, hint, icon }) {
    return (
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
                <span className="font-label-caps text-label-caps uppercase text-secondary font-semibold">{label}</span>
                <span className="material-symbols-outlined text-[20px] text-secondary">{icon}</span>
            </div>
            <span className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight tabular-nums">{value}</span>
            {hint && <span className="font-body-sm text-body-sm text-secondary">{hint}</span>}
        </div>
    );
}

function InfoRow({ icon, label, children }) {
    return (
        <div className="flex items-start gap-space-sm">
            <span className="material-symbols-outlined text-[18px] text-secondary mt-0.5">{icon}</span>
            <div className="flex flex-col min-w-0">
                <span className="font-label-caps text-label-caps uppercase text-secondary">{label}</span>
                <span className="font-body-md text-body-md text-on-surface break-words">{children}</span>
            </div>
        </div>
    );
}

export default function UserDetail({ group: groupKey }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user: me } = useAuth();
    const [toast, notify, dismiss] = useToast();

    const [detail, setDetail] = useState(null); // { data, stats }
    const [error, setError] = useState('');
    const [history, setHistory] = useState({ data: [], meta: null, loading: true });
    const [historyFilter, setHistoryFilter] = useState({ status: '', page: 1 });
    const [expanded, setExpanded] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const loadDetail = useCallback(async () => {
        try {
            const res = await adminUsersApi.get(id);
            // Si el rol no corresponde a esta lista, se redirige a la lista correcta.
            const target = groupForRole(res.data.role);
            if (target.key !== groupKey) {
                navigate(`${target.basePath}/${id}`, { replace: true });
                return;
            }
            setDetail(res);
        } catch (err) {
            setError(err.response?.status === 404 ? 'Este usuario no existe o fue eliminado.' : parseApiError(err).message);
        }
    }, [id, groupKey, navigate]);

    const loadHistory = useCallback(async () => {
        setHistory((h) => ({ ...h, loading: true }));
        try {
            const res = await adminUsersApi.history(id, { status: historyFilter.status || undefined, page: historyFilter.page, per_page: 8 });
            setHistory({ data: res.data, meta: res.meta, loading: false });
        } catch {
            setHistory({ data: [], meta: null, loading: false });
        }
    }, [id, historyFilter]);

    useEffect(() => {
        setDetail(null);
        setError('');
        loadDetail();
    }, [loadDetail]);

    useEffect(() => {
        loadHistory();
    }, [loadHistory]);

    const group = USER_GROUPS[groupKey];

    if (error) {
        return (
            <div className="bg-surface-container-lowest rounded-xl p-space-2xl shadow-xs flex flex-col items-center text-center gap-space-md">
                <span className="material-symbols-outlined text-[32px] text-secondary">person_off</span>
                <p className="font-title-md text-title-md text-on-surface">{error}</p>
                <Link to={group.basePath} className="h-10 px-space-md rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Volver a {group.title}
                </Link>
            </div>
        );
    }
    if (!detail) return <PageLoader />;

    const user = detail.data;
    const stats = detail.stats;
    const isSelf = me?.id === user.id;

    const handleSaved = (saved, message) => {
        setDrawerOpen(false);
        notify(message ?? 'Usuario actualizado', saved.name);
        const target = groupForRole(saved.role);
        if (target.key !== groupKey) {
            navigate(`${target.basePath}/${saved.id}`);
        } else {
            loadDetail();
            loadHistory();
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await adminUsersApi.remove(user.id);
            navigate(group.basePath, { replace: true });
        } catch (err) {
            setConfirmDelete(false);
            notify('No se pudo eliminar', parseApiError(err).message, 'error');
        } finally {
            setDeleting(false);
        }
    };

    const counterpart = (sale) => sale[group.counterpartKey]?.name ?? (groupKey === 'clientes' ? 'Compra web (sin asesor)' : 'Cliente no registrado');

    return (
        <div className="flex flex-col w-full gap-space-xl">
            {/* Encabezado */}
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
                <div className="flex flex-col gap-space-xs">
                    <div className="flex items-center gap-space-xs text-secondary font-label-caps text-label-caps tracking-widest uppercase">
                        <span>Usuarios</span>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <Link to={group.basePath} className="hover:text-on-surface">
                            {group.title}
                        </Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="text-primary font-bold">Detalle</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-space-md">
                        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight">{user.name}</h1>
                        <Badge {...ROLE_BADGE[user.role]}>{user.role_label}</Badge>
                        <Badge tone={user.is_active ? 'success' : 'critical'}>{user.is_active ? 'Activo' : 'Inactivo'}</Badge>
                        {isSelf && <Badge tone="info">Tu cuenta</Badge>}
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-space-sm">
                    <Link
                        to={group.basePath}
                        className="h-10 px-space-md rounded-lg bg-surface-container-lowest text-on-surface font-label-lg text-label-lg shadow-xs hover:bg-surface-container transition-colors flex items-center gap-space-xs"
                    >
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                        {group.title}
                    </Link>
                    {!isSelf && (
                        <button
                            type="button"
                            onClick={() => setConfirmDelete(true)}
                            className="h-10 px-space-md rounded-lg bg-[#FCEAEC] text-primary-container border border-primary-container/20 font-label-lg text-label-lg hover:bg-primary-container hover:text-on-primary transition-colors flex items-center gap-space-xs"
                        >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                            Eliminar
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => setDrawerOpen(true)}
                        className="h-10 px-space-md rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg shadow-xs transition-colors flex items-center gap-space-xs"
                    >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                        Editar usuario
                    </button>
                </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
                {/* Perfil */}
                <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-space-lg shadow-xs flex flex-col gap-space-lg">
                    <div className="flex items-center gap-space-md">
                        <div
                            className={`w-14 h-14 rounded-full flex items-center justify-center font-title-md text-title-md font-bold ${
                                user.is_active ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-secondary'
                            }`}
                        >
                            {initials(user.name)}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="font-title-md text-title-md text-on-surface font-semibold truncate">{user.name}</span>
                            <span className="font-label-caps text-label-caps uppercase text-secondary">
                                {user.role_label} · ID #{user.id}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-space-md pt-space-md border-t border-surface-container">
                        <InfoRow icon="mail" label="Correo">
                            {user.email}
                        </InfoRow>
                        <InfoRow icon="call" label="Teléfono / WhatsApp">
                            {user.phone || 'Sin registrar'}
                        </InfoRow>
                        <InfoRow icon="calendar_month" label="Registrado">
                            {formatDateTime(user.created_at)}
                        </InfoRow>
                        <InfoRow icon="login" label="Último acceso">
                            {user.last_login_at ? `${formatRelative(user.last_login_at)} · ${formatDateTime(user.last_login_at)}` : 'Nunca ha iniciado sesión'}
                        </InfoRow>
                    </div>
                </div>

                {/* Estadísticas */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-gutter content-start">
                    <Stat
                        label={stats.type === 'ventas' ? 'Total vendido' : 'Total comprado'}
                        value={formatCOP(stats.total)}
                        icon="payments"
                        hint="Excluye pedidos cancelados"
                    />
                    <Stat
                        label={stats.type === 'ventas' ? 'Ventas gestionadas' : 'Compras realizadas'}
                        value={stats.count}
                        icon="receipt_long"
                        hint={stats.cancelled ? plural(stats.cancelled, 'cancelada') : 'Sin cancelaciones'}
                    />
                    <Stat label="Ticket promedio" value={formatCOP(stats.average)} icon="query_stats" />
                    <Stat
                        label="Pedidos en curso"
                        value={stats.pending}
                        icon="pending_actions"
                        hint={stats.last_at ? `Último pedido: ${formatRelative(stats.last_at).toLowerCase()}` : 'Sin pedidos aún'}
                    />
                </div>
            </section>

            {/* Registro de compras / ventas */}
            <section className="bg-surface-container-lowest rounded-xl shadow-xs overflow-hidden">
                <div className="p-space-lg flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
                    <div className="flex flex-col">
                        <span className="font-label-caps text-label-caps uppercase text-secondary tracking-widest font-semibold">Historial</span>
                        <h2 className="font-headline-md text-headline-md text-on-surface font-bold">{group.historyTitle}</h2>
                        <p className="font-body-sm text-body-sm text-secondary">{group.historyDescription}</p>
                    </div>
                    <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar bg-surface-container-low p-1 rounded-lg">
                        {STATUS_FILTERS.map(([value, label]) => (
                            <button
                                key={value || 'all'}
                                type="button"
                                onClick={() => setHistoryFilter({ status: value, page: 1 })}
                                className={`px-space-sm py-1 rounded-md font-label-md text-label-md whitespace-nowrap transition-all ${
                                    historyFilter.status === value ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-xs' : 'text-secondary hover:text-on-surface'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-surface-container-low text-on-surface-variant font-label-caps text-label-caps uppercase tracking-wider">
                                <th className="py-space-sm px-space-lg font-semibold">Pedido</th>
                                <th className="py-space-sm px-space-md font-semibold">Fecha</th>
                                <th className="py-space-sm px-space-md font-semibold">{group.counterpartLabel}</th>
                                <th className="py-space-sm px-space-md font-semibold">Canal</th>
                                <th className="py-space-sm px-space-md font-semibold">Estado</th>
                                <th className="py-space-sm px-space-md font-semibold text-right">Prendas</th>
                                <th className="py-space-sm px-space-lg font-semibold text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className={history.loading ? 'opacity-50 transition-opacity' : 'transition-opacity'}>
                            {history.data.map((sale) => {
                                const open = expanded === sale.id;
                                const units = sale.items?.reduce((n, i) => n + i.quantity, 0) ?? 0;
                                return (
                                    <Fragment key={sale.id}>
                                        <tr
                                            onClick={() => setExpanded(open ? null : sale.id)}
                                            className={`border-b border-surface-container cursor-pointer transition-colors ${open ? 'bg-surface-container-low/70' : 'hover:bg-surface-container-low/50'}`}
                                        >
                                            <td className="py-space-md px-space-lg">
                                                <div className="flex items-center gap-space-xs">
                                                    <span className={`material-symbols-outlined text-[18px] text-secondary transition-transform ${open ? 'rotate-90' : ''}`}>chevron_right</span>
                                                    <span className="font-label-lg text-label-lg text-primary font-bold">#{sale.code}</span>
                                                </div>
                                            </td>
                                            <td className="py-space-md px-space-md font-body-md text-body-md text-on-surface whitespace-nowrap">{formatDate(sale.created_at)}</td>
                                            <td className="py-space-md px-space-md font-body-md text-body-md text-on-surface">{counterpart(sale)}</td>
                                            <td className="py-space-md px-space-md font-body-md text-body-md text-secondary whitespace-nowrap">{sale.channel_label}</td>
                                            <td className="py-space-md px-space-md">
                                                <Badge tone={SALE_STATUS_TONE[sale.status]}>{sale.status_label}</Badge>
                                            </td>
                                            <td className="py-space-md px-space-md text-right font-body-md text-body-md text-on-surface tabular-nums">{units}</td>
                                            <td className="py-space-md px-space-lg text-right whitespace-nowrap">
                                                <span className={`font-label-lg text-label-lg font-semibold tabular-nums ${sale.status === 'cancelado' ? 'text-secondary line-through' : 'text-on-surface'}`}>
                                                    {formatCOP(sale.total)}
                                                </span>
                                            </td>
                                        </tr>
                                        {open && (
                                            <tr className="bg-surface-container-low/40 border-b border-surface-container">
                                                <td colSpan={7} className="px-space-lg py-space-md">
                                                    <div className="flex flex-col lg:flex-row gap-space-lg">
                                                        <div className="flex-1 flex flex-col gap-space-xs">
                                                            {sale.items.map((item) => (
                                                                <div key={item.id} className="flex items-center justify-between gap-space-md p-space-sm rounded-lg bg-surface-container-lowest">
                                                                    <div className="flex items-center gap-space-sm min-w-0">
                                                                        <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                                                                            <span className="material-symbols-outlined text-[18px] text-secondary">apparel</span>
                                                                        </div>
                                                                        <div className="flex flex-col min-w-0">
                                                                            <span className="font-label-lg text-label-lg text-on-surface truncate">{item.product_name}</span>
                                                                            <span className="font-body-sm text-body-sm text-secondary">
                                                                                {[item.sku, item.size && `Talla ${item.size}`, item.color].filter(Boolean).join(' · ')}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-col items-end shrink-0">
                                                                        <span className="font-label-lg text-label-lg text-on-surface font-semibold tabular-nums">{formatCOP(item.line_total)}</span>
                                                                        <span className="font-body-sm text-body-sm text-secondary tabular-nums">
                                                                            {item.quantity} × {formatCOP(item.unit_price)}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="lg:w-80 flex flex-col gap-space-xs p-space-md rounded-lg bg-surface-container-lowest self-start w-full">
                                                            <div className="flex justify-between font-body-sm text-body-sm text-secondary">
                                                                <span>Subtotal</span>
                                                                <span className="tabular-nums whitespace-nowrap">{formatCOP(sale.subtotal)}</span>
                                                            </div>
                                                            {sale.discount > 0 && (
                                                                <div className="flex justify-between font-body-sm text-body-sm text-tertiary">
                                                                    <span>Descuento {sale.coupon_code ? `(${sale.coupon_code})` : ''}</span>
                                                                    <span className="tabular-nums whitespace-nowrap">-{formatCOP(sale.discount)}</span>
                                                                </div>
                                                            )}
                                                            <div className="flex justify-between pt-space-xs border-t border-surface-container font-label-lg text-label-lg text-on-surface font-bold">
                                                                <span>Total</span>
                                                                <span className="tabular-nums">{formatCOP(sale.total)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                    {!history.loading && history.data.length === 0 && (
                        <div className="py-space-2xl flex flex-col items-center text-center gap-space-sm px-space-md">
                            <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center">
                                <span className="material-symbols-outlined text-secondary text-[24px]">receipt_long</span>
                            </div>
                            <span className="font-title-md text-title-md text-on-surface font-semibold">
                                {historyFilter.status ? 'No hay pedidos con este estado' : group.emptyHistory}
                            </span>
                            <span className="font-body-sm text-body-sm text-secondary max-w-sm">Los pedidos aparecerán aquí automáticamente cuando se registren en el módulo de ventas.</span>
                        </div>
                    )}
                </div>

                {history.meta && history.meta.last_page > 1 && (
                    <div className="px-space-lg py-space-md flex items-center justify-between gap-space-md border-t border-surface-container">
                        <span className="font-body-sm text-body-sm text-secondary">
                            {history.meta.from}–{history.meta.to} de {history.meta.total} {group.historyNoun}
                        </span>
                        <div className="flex items-center gap-space-xs">
                            <button
                                type="button"
                                disabled={history.meta.current_page <= 1}
                                onClick={() => setHistoryFilter((f) => ({ ...f, page: f.page - 1 }))}
                                className="h-9 px-space-md rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md hover:bg-surface-container disabled:opacity-40"
                            >
                                Anterior
                            </button>
                            <button
                                type="button"
                                disabled={history.meta.current_page >= history.meta.last_page}
                                onClick={() => setHistoryFilter((f) => ({ ...f, page: f.page + 1 }))}
                                className="h-9 px-space-md rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md hover:bg-surface-container disabled:opacity-40"
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                )}
            </section>

            <UserFormDrawer open={drawerOpen} user={user} onClose={() => setDrawerOpen(false)} onSaved={handleSaved} />
            <ConfirmDialog
                open={confirmDelete}
                title={`¿Eliminar a ${user.name}?`}
                message="Esta acción no se puede deshacer. Si el usuario tiene ventas registradas, el sistema te pedirá desactivarlo en su lugar para conservar el historial."
                confirmLabel="Eliminar usuario"
                busy={deleting}
                onConfirm={handleDelete}
                onCancel={() => setConfirmDelete(false)}
            />
            <Toast toast={toast} onClose={dismiss} />
        </div>
    );
}
