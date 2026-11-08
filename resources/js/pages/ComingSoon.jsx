import { Link } from 'react-router-dom';

/** Sección aún sin mockup: mantiene el mismo patrón de encabezado y tarjetas. */
export default function ComingSoon({ section, title, icon = 'construction', backTo = '/', backLabel = 'Volver al inicio' }) {
    return (
        <div className="flex flex-col w-full gap-space-xl">
            <div className="flex flex-col gap-space-xs">
                <div className="flex items-center gap-space-xs text-secondary font-label-caps text-label-caps tracking-widest uppercase">
                    <span>Inicio</span>
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    <span className="text-primary font-bold">{section}</span>
                </div>
                <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight">{title}</h1>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-space-2xl shadow-xs flex flex-col items-center text-center gap-space-md">
                <div className="w-14 h-14 rounded-xl bg-error-container/40 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[28px]">{icon}</span>
                </div>
                <div className="flex flex-col gap-space-xs max-w-md">
                    <span className="font-label-caps text-label-caps uppercase text-secondary">Próximamente</span>
                    <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Módulo en construcción</h2>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                        Esta sección seguirá el mismo sistema de diseño ASCEND. Aún no cuenta con un mockup aprobado.
                    </p>
                </div>
                <Link
                    to={backTo}
                    className="mt-space-sm inline-flex items-center gap-space-xs h-10 px-space-md rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg transition-colors"
                >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    {backLabel}
                </Link>
            </div>
        </div>
    );
}
