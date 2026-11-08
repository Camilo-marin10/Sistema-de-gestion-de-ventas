import { useEffect, useState } from 'react';
import { adminUsersApi } from '../../../api/adminUsers';
import { parseApiError } from '../../../api/axios';
import { useAuth } from '../../../context/AuthContext';
import { ROLE_OPTIONS } from './groups';

const EMPTY = { name: '', email: '', phone: '', role: 'vendedor', is_active: true, password: '', password_confirmation: '' };

const inputClass = (error) =>
    `w-full h-10 px-space-md rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface placeholder:text-secondary focus:outline-hidden focus:ring-1 transition-all border ${
        error ? 'border-primary-container focus:ring-primary-container bg-error-container/10' : 'border-secondary-container focus:ring-primary focus:border-primary'
    }`;

function Field({ label, htmlFor, error, hint, children }) {
    return (
        <div className="flex flex-col gap-space-xxs">
            <label htmlFor={htmlFor} className="font-label-md text-label-md text-on-surface font-medium">
                {label}
            </label>
            {children}
            {error ? (
                <span className="font-body-sm text-body-sm text-primary">{error}</span>
            ) : (
                hint && <span className="font-body-sm text-body-sm text-secondary">{hint}</span>
            )}
        </div>
    );
}

function Section({ icon, title, children }) {
    return (
        <div className="flex flex-col gap-space-md p-space-md bg-surface-container-low rounded-lg">
            <div className="flex items-center gap-space-xs text-on-surface font-title-md text-title-md">
                <span className="material-symbols-outlined text-primary text-[20px]">{icon}</span>
                {title}
            </div>
            {children}
        </div>
    );
}

/**
 * Drawer lateral para crear o editar un usuario (cualquier rol).
 * @param {object|null} user  null = crear
 */
export default function UserFormDrawer({ open, user, defaultRole = 'vendedor', onClose, onSaved }) {
    const { user: me } = useAuth();
    const [form, setForm] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState('');
    const [saving, setSaving] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const editing = Boolean(user);
    const isSelf = editing && me?.id === user.id;

    useEffect(() => {
        if (!open) return;
        setForm(
            user
                ? { ...EMPTY, name: user.name, email: user.email, phone: user.phone ?? '', role: user.role, is_active: user.is_active }
                : { ...EMPTY, role: defaultRole },
        );
        setErrors({});
        setFormError('');
        setShowPassword(false);
    }, [open, user, defaultRole]);

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

    if (!open) return null;

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setErrors({});
        setFormError('');
        const payload = { ...form, phone: form.phone || null };
        if (editing && !payload.password) {
            delete payload.password;
            delete payload.password_confirmation;
        }
        try {
            const res = editing ? await adminUsersApi.update(user.id, payload) : await adminUsersApi.create(payload);
            onSaved(res.data, res.message);
        } catch (error) {
            const parsed = parseApiError(error);
            setErrors(parsed.fields);
            if (!Object.keys(parsed.fields).length) setFormError(parsed.message);
        } finally {
            setSaving(false);
        }
    };

    const roleChanged = editing && form.role !== user.role;
    const movesGroup = roleChanged && (form.role === 'cliente') !== (user.role === 'cliente');

    return (
        <div aria-labelledby="user-drawer-title" aria-modal="true" className="fixed inset-0 z-[70] overflow-hidden" role="dialog">
            <div className="fixed inset-0 bg-[#171717]/40 backdrop-blur-xs transition-opacity" onClick={() => !saving && onClose()} />
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
                <form onSubmit={handleSubmit} noValidate className="w-screen max-w-xl bg-surface-container-lowest shadow-2xl flex flex-col h-full">
                    {/* Encabezado */}
                    <div className="p-space-lg bg-surface-container-low flex items-center justify-between shrink-0">
                        <div className="flex flex-col gap-space-xxs">
                            <span className="font-label-caps text-label-caps text-primary font-bold uppercase tracking-wider">Gestión de Usuarios ASCEND</span>
                            <h2 className="font-headline-md text-headline-md text-on-surface" id="user-drawer-title">
                                {editing ? `Editar ${user.name}` : 'Crear nuevo usuario'}
                            </h2>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={saving}
                            className="p-2 rounded-lg text-secondary hover:text-on-surface hover:bg-surface-container transition-colors"
                            aria-label="Cerrar"
                        >
                            <span className="material-symbols-outlined text-[24px]">close</span>
                        </button>
                    </div>

                    {/* Contenido */}
                    <div className="flex-1 overflow-y-auto p-space-lg flex flex-col gap-space-lg">
                        {formError && (
                            <div role="alert" className="flex items-start gap-space-sm px-space-md py-space-sm rounded-lg bg-error-container/40 text-on-error-container font-body-sm text-body-sm">
                                <span className="material-symbols-outlined text-[18px] text-primary">error</span>
                                <span>{formError}</span>
                            </div>
                        )}

                        <Section icon="badge" title="Datos personales">
                            <Field label="Nombre completo *" htmlFor="u-name" error={errors.name}>
                                <input id="u-name" className={inputClass(errors.name)} value={form.name} onChange={set('name')} placeholder="Nombre y apellido" autoComplete="off" />
                            </Field>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                                <Field label="Correo electrónico *" htmlFor="u-email" error={errors.email} hint="Es el usuario de acceso.">
                                    <input id="u-email" type="email" className={inputClass(errors.email)} value={form.email} onChange={set('email')} placeholder="correo@dominio.com" autoComplete="off" />
                                </Field>
                                <Field label="Teléfono / WhatsApp" htmlFor="u-phone" error={errors.phone}>
                                    <input id="u-phone" type="tel" className={inputClass(errors.phone)} value={form.phone} onChange={set('phone')} placeholder="+57 300 000 0000" autoComplete="off" />
                                </Field>
                            </div>
                        </Section>

                        <Section icon="admin_panel_settings" title="Rol y acceso">
                            {isSelf && (
                                <div className="flex items-start gap-space-sm font-body-sm text-body-sm text-secondary">
                                    <span className="material-symbols-outlined text-[18px] text-tertiary">lock</span>
                                    Estás editando tu propia cuenta: no puedes cambiar tu rol ni desactivarte.
                                </div>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm" role="radiogroup" aria-label="Rol">
                                {ROLE_OPTIONS.map((opt) => {
                                    const active = form.role === opt.value;
                                    return (
                                        <label
                                            key={opt.value}
                                            className={`relative flex flex-col gap-1 p-space-md rounded-xl transition-all ${
                                                isSelf ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                                            } ${active ? 'bg-surface-container-lowest shadow-[0_0_0_2px_#c62835]' : 'bg-surface-container-lowest/60 hover:bg-surface-container-lowest'}`}
                                        >
                                            <input
                                                type="radio"
                                                name="role"
                                                value={opt.value}
                                                checked={active}
                                                disabled={isSelf}
                                                onChange={set('role')}
                                                className="absolute right-3 top-3 accent-primary-container"
                                            />
                                            <span className={`material-symbols-outlined text-[22px] ${active ? 'text-primary' : 'text-secondary'}`}>{opt.icon}</span>
                                            <span className="font-label-lg text-label-lg text-on-surface font-semibold">{opt.label}</span>
                                            <span className="font-body-sm text-body-sm text-secondary">{opt.description}</span>
                                        </label>
                                    );
                                })}
                            </div>
                            {errors.role && <span className="font-body-sm text-body-sm text-primary">{errors.role}</span>}
                            {movesGroup && (
                                <div className="flex items-start gap-space-sm px-space-md py-space-sm rounded-lg bg-[#FFFBEB] text-[#92400E] font-body-sm text-body-sm">
                                    <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
                                    El usuario pasará a la lista de {form.role === 'cliente' ? 'Clientes' : 'Empleados'}. Su historial se conserva.
                                </div>
                            )}

                            <label className={`flex items-center justify-between gap-space-md p-space-md rounded-lg bg-surface-container-lowest ${isSelf ? 'opacity-60' : 'cursor-pointer'}`}>
                                <div className="flex flex-col">
                                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">Cuenta activa</span>
                                    <span className="font-body-sm text-body-sm text-secondary">
                                        {form.is_active ? 'Puede iniciar sesión normalmente.' : 'No podrá iniciar sesión y se cerrarán sus sesiones abiertas.'}
                                    </span>
                                </div>
                                <span className="relative inline-flex items-center shrink-0">
                                    <input type="checkbox" className="peer sr-only" checked={form.is_active} disabled={isSelf} onChange={set('is_active')} />
                                    <span className="w-11 h-6 rounded-full bg-surface-container-highest peer-checked:bg-primary-container transition-colors" />
                                    <span className="absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5" />
                                </span>
                            </label>
                            {errors.is_active && <span className="font-body-sm text-body-sm text-primary">{errors.is_active}</span>}
                        </Section>

                        <Section icon="key" title={editing ? 'Restablecer contraseña' : 'Contraseña de acceso'}>
                            {editing && (
                                <p className="font-body-sm text-body-sm text-secondary -mt-space-xs">
                                    Déjalo en blanco para conservar la contraseña actual. Si la cambias, se cerrarán las sesiones abiertas del usuario.
                                </p>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                                <Field label={editing ? 'Nueva contraseña' : 'Contraseña *'} htmlFor="u-pass" error={errors.password} hint="Mínimo 8 caracteres, letras y números.">
                                    <div className="relative flex items-center">
                                        <input
                                            id="u-pass"
                                            type={showPassword ? 'text' : 'password'}
                                            className={`${inputClass(errors.password)} pr-10`}
                                            value={form.password}
                                            onChange={set('password')}
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((v) => !v)}
                                            className="absolute right-space-sm text-secondary hover:text-on-surface p-1"
                                            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                        >
                                            <span className="material-symbols-outlined text-[18px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                        </button>
                                    </div>
                                </Field>
                                <Field label="Confirmar contraseña" htmlFor="u-pass2">
                                    <input
                                        id="u-pass2"
                                        type={showPassword ? 'text' : 'password'}
                                        className={inputClass(errors.password && errors.password.includes('coinciden'))}
                                        value={form.password_confirmation}
                                        onChange={set('password_confirmation')}
                                        autoComplete="new-password"
                                    />
                                </Field>
                            </div>
                        </Section>
                    </div>

                    {/* Acciones */}
                    <div className="p-space-lg bg-surface-container-low flex items-center justify-between shrink-0">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={saving}
                            className="h-10 px-space-md rounded-lg bg-surface-container-lowest text-on-surface font-label-lg text-label-lg hover:bg-surface-container transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="h-10 px-space-lg rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg shadow-xs hover:bg-primary transition-all flex items-center gap-space-xs font-semibold disabled:opacity-70 disabled:cursor-wait"
                        >
                            <span className={`material-symbols-outlined text-[18px] ${saving ? 'animate-spin' : ''}`}>{saving ? 'progress_activity' : 'save'}</span>
                            <span>{saving ? 'Guardando...' : editing ? 'Guardar cambios' : 'Crear usuario'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
