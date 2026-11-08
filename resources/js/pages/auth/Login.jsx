import { useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { parseApiError } from '../../api/axios';
import { HOME_BY_ROLE, useAuth } from '../../context/AuthContext';
import useCountdown from '../../hooks/useCountdown';

const BAR_IDLE = 'h-full w-1/4 bg-surface-container transition-all';

/** Evalúa la fortaleza de la contraseña (misma regla del mockup). */
function passwordStrength(val) {
    if (!val) return { label: 'Mínimo 8 caract.', labelClass: 'text-secondary', bars: 0, color: '' };
    if (val.length < 6) return { label: 'Débil', labelClass: 'text-error font-semibold', bars: 1, color: 'bg-error' };
    if (val.length < 10) return { label: 'Aceptable', labelClass: 'text-secondary font-semibold', bars: 2, color: 'bg-secondary' };
    if (/[A-Z]/.test(val) && /[0-9]/.test(val)) return { label: 'Excelente', labelClass: 'text-tertiary font-semibold', bars: 4, color: 'bg-tertiary' };
    return { label: 'Fuerte', labelClass: 'text-primary font-semibold', bars: 3, color: 'bg-primary' };
}

const EMPTY_ERRORS = { fields: {}, message: '' };

function FieldError({ message }) {
    if (!message) return null;
    return <span className="font-body-sm text-body-sm text-primary">{message}</span>;
}

function FormAlert({ message }) {
    if (!message) return null;
    return (
        <div role="alert" className="flex items-start gap-space-sm px-space-md py-space-sm rounded-lg bg-error-container/40 text-on-error-container font-body-sm text-body-sm">
            <span className="material-symbols-outlined text-[18px] text-primary shrink-0">error</span>
            <span>{message}</span>
        </div>
    );
}

/** Sólo se aceptan rutas internas como destino de redirección. */
function safeRedirect(value) {
    return value && value.startsWith('/') && !value.startsWith('//') ? value : null;
}

function VisibilityToggle({ visible, onToggle }) {
    return (
        <button
            className="absolute right-space-sm text-secondary hover:text-on-surface p-1 focus:outline-hidden"
            onClick={onToggle}
            type="button"
            aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
            <span className="material-symbols-outlined text-[18px]">{visible ? 'visibility_off' : 'visibility'}</span>
        </button>
    );
}

export default function Login() {
    const { user, login, register } = useAuth();
    const [params] = useSearchParams();
    const redirect = safeRedirect(params.get('redirect'));
    const [mode, setMode] = useState(params.get('modo') === 'registro' ? 'register' : redirect ? 'login' : 'register');
    const [show, setShow] = useState({ password: false, confirm: false, login: false });
    const [password, setPassword] = useState('');
    const strength = passwordStrength(password);
    const reservation = useCountdown(14 * 60 + 59);

    const [submitting, setSubmitting] = useState(false);
    const [regErrors, setRegErrors] = useState(EMPTY_ERRORS);
    const [loginErrors, setLoginErrors] = useState(EMPTY_ERRORS);

    const toggle = (field) => setShow((s) => ({ ...s, [field]: !s[field] }));

    const switchMode = (next) => {
        setMode(next);
        setRegErrors(EMPTY_ERRORS);
        setLoginErrors(EMPTY_ERRORS);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (submitting) return;
        const data = new FormData(e.currentTarget);
        setSubmitting(true);
        setRegErrors(EMPTY_ERRORS);
        try {
            await register({
                name: data.get('name'),
                phone: data.get('phone'),
                email: data.get('email'),
                password: data.get('password'),
                password_confirmation: data.get('password_confirmation'),
                terms: data.get('terms') === 'on',
            });
        } catch (error) {
            setRegErrors(parseApiError(error));
            setSubmitting(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (submitting) return;
        const data = new FormData(e.currentTarget);
        setSubmitting(true);
        setLoginErrors(EMPTY_ERRORS);
        try {
            await login({ email: data.get('email'), password: data.get('password') });
        } catch (error) {
            setLoginErrors(parseApiError(error));
            setSubmitting(false);
        }
    };

    // Con sesión activa (o recién iniciada) se envía al destino según el rol.
    if (user) {
        const target = user.role === 'cliente' && redirect ? redirect : HOME_BY_ROLE[user.role] ?? '/';
        return <Navigate to={target} replace />;
    }

    const tabClass = (active) =>
        `flex-1 py-space-xs sm:py-space-sm text-center font-label-lg text-label-lg rounded-md transition-all flex items-center justify-center gap-space-xs ${
            active ? 'font-semibold bg-surface-container-lowest text-on-surface shadow-xs' : 'font-medium text-secondary hover:text-on-surface'
        }`;

    return (
        <>
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-space-lg py-space-xl lg:py-space-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-stretch">
                    {/* Left Column: Editorial & Contextual Order Hook */}
                    <section className="lg:col-span-5 flex flex-col justify-between bg-surface-container-low p-space-lg sm:p-space-xl rounded-xl relative overflow-hidden shadow-xs">
                        {/* Subtle Ambient Background Glow */}
                        <div className="absolute -right-24 -top-24 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                        <div className="relative z-10 flex flex-col gap-space-lg">
                            {/* Monogram Tag */}
                            <div className="inline-flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-xs rounded-full w-fit shadow-xs">
                                <span className="w-2 h-2 rounded-full bg-primary" />
                                <span className="font-label-caps text-label-caps tracking-widest uppercase text-on-surface">Membresía Privilegiada</span>
                            </div>
                            {/* Headline & Narrative */}
                            <div className="space-y-space-xs">
                                <h1 className="font-headline-lg text-display-lg text-on-surface font-semibold tracking-tight leading-tight">
                                    Bienvenido al universo
                                    {' '}
                                    <span className="inline-flex items-end gap-1.5 font-bold uppercase tracking-tight text-on-surface">
                                        ASCEND
                                        <span className="w-2 h-2 rounded-full bg-primary-container mb-2" aria-hidden="true" />
                                    </span>
                                </h1>
                                <p className="font-body-md text-body-md text-secondary leading-relaxed">
                                    Crea tu cuenta hoy. Accede a lanzamientos exclusivos, seguimiento de pedidos en tiempo real y recibe un cupón de bienvenida sujeto a condiciones para tu primera compra.
                                </p>
                            </div>
                            {/* Fashion Benefit Perks */}
                            <div className="grid grid-cols-1 gap-space-sm pt-space-xs">
                                <div className="flex items-start gap-space-sm bg-surface-container-lowest p-space-md rounded-lg shadow-xs">
                                    <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 text-primary">
                                        <span className="material-symbols-outlined text-[18px]">loyalty</span>
                                    </div>
                                    <div className="space-y-space-xxs">
                                        <div className="font-label-lg text-label-lg text-on-surface">15% OFF Cortesía Inicial</div>
                                        <div className="font-body-sm text-body-sm text-secondary">Aplicable automáticamente al finalizar esta compra.</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-space-sm bg-surface-container-lowest p-space-md rounded-lg shadow-xs">
                                    <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center shrink-0 text-on-surface">
                                        <span className="material-symbols-outlined text-[18px]">verified</span>
                                    </div>
                                    <div className="space-y-space-xxs">
                                        <div className="font-label-lg text-label-lg text-on-surface">Acceso Anticipado Runway</div>
                                        <div className="font-body-sm text-body-sm text-secondary">Reserva cápsulas numeradas antes de su estreno global.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Pending Cart Contextual Visual Anchor */}
                        <div className="mt-space-xl relative z-10 bg-surface-container-lowest p-space-md rounded-xl shadow-xs">
                            <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-surface-container-high">
                                <span className="font-label-caps text-label-caps tracking-widest uppercase text-primary font-semibold flex items-center gap-space-xxs">
                                    <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                                    {' '}
                                    Prenda reservada en tu cesta
                                </span>
                                <span className="font-label-caps text-label-caps text-secondary font-medium">Caduca en {reservation}</span>
                            </div>
                            <div className="flex items-center gap-space-md">
                                <div className="w-20 h-24 rounded-lg overflow-hidden shrink-0 bg-surface-container">
                                    <img className="w-full h-full object-cover object-center" data-alt="Close up editorial shot of a high luxury structured corset in crimson carmine satin fabric, delicate boning architecture, studio lighting with dramatic deep shadows and rich textures." src="/images/ascend/close-up-editorial-shot-of-a.jpg" />
                                </div>
                                <div className="flex flex-col justify-center space-y-space-xxs">
                                    <span className="font-title-md text-title-md text-on-surface font-semibold line-clamp-1">Corset Estructurado Siren</span>
                                    <div className="flex items-center gap-space-xs font-label-md text-label-md text-secondary">
                                        <span>
                                            Talla:
                                            {' '}
                                            <strong className="text-on-surface font-medium">S</strong>
                                        </span>
                                        <span>•</span>
                                        <span>
                                            Color:
                                            {' '}
                                            <strong className="text-on-surface font-medium">Rojo Carmín</strong>
                                        </span>
                                    </div>
                                    <div className="font-label-lg text-label-lg text-primary font-bold pt-space-xxs">$385.000 COP</div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Right Column: Authentication Form Card */}
                    <section className="lg:col-span-7 flex flex-col justify-center">
                        <div className="bg-surface-container-lowest p-space-lg sm:p-space-xl rounded-xl shadow-md flex flex-col">
                            {/* Segmented Control / Tabs */}
                            <div className="flex bg-surface-container rounded-lg p-space-xxs mb-space-lg">
                                <button className={tabClass(mode === 'register')} onClick={() => switchMode('register')} type="button">
                                    <span className="material-symbols-outlined text-[18px]">person_add</span>
                                    {' '}
                                    Crear Cuenta
                                </button>
                                <button className={tabClass(mode === 'login')} onClick={() => switchMode('login')} type="button">
                                    <span className="material-symbols-outlined text-[18px]">login</span>
                                    {' '}
                                    Iniciar Sesión
                                </button>
                            </div>
                            {/* Registration Form Container */}
                            <div className={`space-y-space-md ${mode === 'register' ? '' : 'hidden'}`} id="register-container">
                                <div>
                                    <h2 className="font-headline-md text-headline-md font-semibold text-on-surface">Completa tus datos de acceso</h2>
                                    <p className="font-body-sm text-body-sm text-secondary">Ingresa tu información para continuar con el pago seguro y reservar tu inventario.</p>
                                </div>
                                <form className="space-y-space-md" id="registration-form" onSubmit={handleRegister} noValidate>
                                    <FormAlert message={regErrors.message && !Object.keys(regErrors.fields).length ? regErrors.message : ''} />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                                        {/* Full Name */}
                                        <div className="flex flex-col gap-space-xxs">
                                            <label className="font-label-md text-label-md font-medium text-on-surface" htmlFor="fullName">Nombre Completo</label>
                                            <div className="relative">
                                                <input className="w-full h-10 px-space-md rounded-lg bg-surface-container-lowest text-on-surface placeholder-secondary font-body-md text-body-md shadow-xs outline-hidden focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all" id="fullName" name="name" autoComplete="name" placeholder="Valentina Morales" type="text" />
                                            </div>
                                            <FieldError message={regErrors.fields.name} />
                                        </div>
                                        {/* Phone / WhatsApp */}
                                        <div className="flex flex-col gap-space-xxs">
                                            <label className="font-label-md text-label-md font-medium text-on-surface" htmlFor="phone">Teléfono / WhatsApp</label>
                                            <div className="relative">
                                                <input className="w-full h-10 px-space-md rounded-lg bg-surface-container-lowest text-on-surface placeholder-secondary font-body-md text-body-md shadow-xs outline-hidden focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all" id="phone" name="phone" autoComplete="tel" placeholder="+57 300 000 0000" type="tel" />
                                            </div>
                                            <FieldError message={regErrors.fields.phone} />
                                        </div>
                                    </div>
                                    {/* Email */}
                                    <div className="flex flex-col gap-space-xxs">
                                        <label className="font-label-md text-label-md font-medium text-on-surface" htmlFor="email">Correo Electrónico</label>
                                        <div className="relative">
                                            <input className="w-full h-10 px-space-md rounded-lg bg-surface-container-lowest text-on-surface placeholder-secondary font-body-md text-body-md shadow-xs outline-hidden focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all" id="email" name="email" autoComplete="email" placeholder="correo@ejemplo.com" type="email" />
                                        </div>
                                        <FieldError message={regErrors.fields.email} />
                                    </div>
                                    {/* Passwords Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                                        {/* Password Field */}
                                        <div className="flex flex-col gap-space-xxs">
                                            <label className="font-label-md text-label-md font-medium text-on-surface flex justify-between items-center" htmlFor="password">
                                                <span>Contraseña</span>
                                                <span className={`font-label-caps text-label-caps ${strength.labelClass}`} id="strength-label">{strength.label}</span>
                                            </label>
                                            <div className="relative flex items-center">
                                                <input className="w-full h-10 pl-space-md pr-10 rounded-lg bg-surface-container-lowest text-on-surface placeholder-secondary font-body-md text-body-md shadow-xs outline-hidden focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all" id="password" name="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••" type={show.password ? 'text' : 'password'} />
                                                <VisibilityToggle visible={show.password} onToggle={() => toggle('password')} />
                                            </div>
                                            {/* Security indicator bar */}
                                            <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden flex gap-0.5 mt-1">
                                                <div className={strength.bars >= 1 ? `h-full w-1/4 ${strength.color} transition-all` : BAR_IDLE} id="bar-1" />
                                                <div className={strength.bars >= 2 ? `h-full w-1/4 ${strength.color} transition-all` : BAR_IDLE} id="bar-2" />
                                                <div className={strength.bars >= 3 ? `h-full w-1/4 ${strength.color} transition-all` : BAR_IDLE} id="bar-3" />
                                                <div className={strength.bars >= 4 ? `h-full w-1/4 ${strength.color} transition-all` : BAR_IDLE} id="bar-4" />
                                            </div>
                                            <FieldError message={regErrors.fields.password} />
                                        </div>
                                        {/* Confirm Password Field */}
                                        <div className="flex flex-col gap-space-xxs">
                                            <label className="font-label-md text-label-md font-medium text-on-surface" htmlFor="confirmPassword">Confirmar Contraseña</label>
                                            <div className="relative flex items-center">
                                                <input className="w-full h-10 pl-space-md pr-10 rounded-lg bg-surface-container-lowest text-on-surface placeholder-secondary font-body-md text-body-md shadow-xs outline-hidden focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all" id="confirmPassword" name="password_confirmation" autoComplete="new-password" placeholder="••••••••••••" type={show.confirm ? 'text' : 'password'} />
                                                <VisibilityToggle visible={show.confirm} onToggle={() => toggle('confirm')} />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Checkbox Declarations */}
                                    <div className="space-y-space-xs pt-space-xs">
                                        <label className="flex items-start gap-space-sm cursor-pointer select-none">
                                            <input defaultChecked className="mt-1 h-4 w-4 rounded-sm accent-primary text-primary focus:ring-0 cursor-pointer" id="terms-check" name="terms" type="checkbox" />
                                            <span className="font-body-sm text-body-sm text-on-surface leading-tight">
                                                Acepto los
                                                {' '}
                                                <a href="#" className="underline font-medium hover:text-primary">Términos y Condiciones</a>
                                                {' '}
                                                y la
                                                {' '}
                                                <a href="#" className="underline font-medium hover:text-primary">Política de Tratamiento de Datos Personales</a>
                                                {' '}
                                                de ASCEND.
                                            </span>
                                        </label>
                                        <FieldError message={regErrors.fields.terms} />
                                        <label className="flex items-start gap-space-sm cursor-pointer select-none">
                                            <input className="mt-1 h-4 w-4 rounded-sm accent-primary text-primary focus:ring-0 cursor-pointer" id="marketing-check" type="checkbox" />
                                            <span className="font-body-sm text-body-sm text-secondary leading-tight">
                                                Deseo recibir novedades editoriales, acceso prioritario y códigos de descuento exclusivos.
                                            </span>
                                        </label>
                                    </div>
                                    {/* Main Submission Button */}
                                    <button disabled={submitting} className="w-full h-11 bg-primary text-on-primary font-label-lg text-label-lg font-semibold rounded-lg hover:bg-primary-container active:scale-[0.99] transition-all flex items-center justify-center gap-space-xs shadow-md mt-space-sm disabled:opacity-70 disabled:cursor-wait" type="submit">
                                        {submitting ? (
                                            <>
                                                <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                                                <span>Creando tu cuenta...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>{redirect ? 'Crear Cuenta y Continuar Compra' : 'Crear Cuenta'}</span>
                                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                                {/* Social / Alternate Divider */}
                                <div className="relative flex items-center justify-center my-space-md">
                                    <div className="w-full h-px bg-surface-container" />
                                    <span className="absolute bg-surface-container-lowest px-space-md font-label-caps text-label-caps text-secondary uppercase tracking-widest">
                                        o continúa con
                                    </span>
                                </div>
                                {/* Single Quick Alternate Access */}
                                <div className="grid grid-cols-2 gap-space-sm">
                                    <button className="h-10 px-space-md rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-space-xs transition-colors" type="button">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="currentColor" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="currentColor" />
                                        </svg>
                                        <span>Google</span>
                                    </button>
                                    <button className="h-10 px-space-md rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-space-xs transition-colors" type="button">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.76 1.05-1.81.93-2.87-.9.04-2 .6-2.63 1.34-.56.64-1.05 1.71-.92 2.74 1.01.08 2.02-.51 2.62-1.21z" />
                                        </svg>
                                        <span>Apple ID</span>
                                    </button>
                                </div>
                                {/* Switch to Login Link */}
                                <div className="text-center pt-space-xs">
                                    <p className="font-body-md text-body-md text-secondary">
                                        ¿Ya tienes una cuenta en ASCEND?
                                        {' '}
                                        <button className="font-label-md text-label-md font-semibold text-primary hover:underline ml-1" onClick={() => switchMode('login')} type="button">
                                            Inicia sesión aquí
                                        </button>
                                    </p>
                                </div>
                                {/* Guarantee Note */}
                                <div className="flex items-center justify-center gap-space-xs font-label-caps text-label-caps text-secondary pt-space-xxs">
                                    <span className="material-symbols-outlined text-[16px] text-tertiary">gpp_good</span>
                                    <span>Tus datos están protegidos bajo protocolos de privacidad de alto estándar.</span>
                                </div>
                            </div>
                            {/* Login View (Hidden by default, switchable via tabs) */}
                            <div className={`space-y-space-md ${mode === 'login' ? '' : 'hidden'}`} id="login-container">
                                <div>
                                    <h2 className="font-headline-md text-headline-md font-semibold text-on-surface">Bienvenido de nuevo</h2>
                                    <p className="font-body-sm text-body-sm text-secondary">Ingresa tus credenciales para reanudar tu pedido y acceder a tu perfil.</p>
                                </div>
                                <form className="space-y-space-md" onSubmit={handleLogin} noValidate>
                                    <FormAlert message={loginErrors.message} />
                                    <div className="flex flex-col gap-space-xxs">
                                        <label className="font-label-md text-label-md font-medium text-on-surface" htmlFor="login-email">Correo Electrónico</label>
                                        <input className="w-full h-10 px-space-md rounded-lg bg-surface-container-lowest text-on-surface placeholder-secondary font-body-md text-body-md shadow-xs outline-hidden focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all" id="login-email" name="email" autoComplete="email" placeholder="correo@ejemplo.com" type="email" />
                                    </div>
                                    <div className="flex flex-col gap-space-xxs">
                                        <div className="flex justify-between items-center">
                                            <label className="font-label-md text-label-md font-medium text-on-surface" htmlFor="login-pwd">Contraseña</label>
                                            <a href="#" className="font-label-sm text-body-sm text-primary hover:underline">¿Olvidaste tu contraseña?</a>
                                        </div>
                                        <div className="relative flex items-center">
                                            <input className="w-full h-10 pl-space-md pr-10 rounded-lg bg-surface-container-lowest text-on-surface placeholder-secondary font-body-md text-body-md shadow-xs outline-hidden focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all" id="login-pwd" name="password" autoComplete="current-password" placeholder="••••••••••••" type={show.login ? 'text' : 'password'} />
                                            <VisibilityToggle visible={show.login} onToggle={() => toggle('login')} />
                                        </div>
                                    </div>
                                    <button disabled={submitting} className="w-full h-11 bg-primary text-on-primary font-label-lg text-label-lg font-semibold rounded-lg hover:bg-primary-container active:scale-[0.99] transition-all flex items-center justify-center gap-space-xs shadow-md mt-space-sm disabled:opacity-70 disabled:cursor-wait" type="submit">
                                        {submitting ? (
                                            <>
                                                <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                                                <span>Verificando...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>{redirect ? 'Ingresar y Finalizar Compra' : 'Ingresar'}</span>
                                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                                <div className="text-center pt-space-xs">
                                    <p className="font-body-md text-body-md text-secondary">
                                        ¿No posees una cuenta aún?
                                        {' '}
                                        <button className="font-label-md text-label-md font-semibold text-primary hover:underline ml-1" onClick={() => switchMode('register')} type="button">
                                            Regístrate aquí
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
