import { useCallback, useEffect, useRef, useState } from 'react';

/** Hook para mostrar una notificación temporal: const [toast, notify] = useToast(); notify('Título', 'Detalle'). */
export function useToast(duration = 3200) {
    const [toast, setToast] = useState(null);
    const timer = useRef(null);

    const notify = useCallback(
        (title, description = '', tone = 'success') => {
            clearTimeout(timer.current);
            setToast({ title, description, tone });
            timer.current = setTimeout(() => setToast(null), duration);
        },
        [duration],
    );

    useEffect(() => () => clearTimeout(timer.current), []);

    return [toast, notify, () => setToast(null)];
}

const TONES = {
    success: { icon: 'check_circle', iconClass: 'text-emerald-400' },
    info: { icon: 'info', iconClass: 'text-tertiary-fixed-dim' },
    error: { icon: 'error', iconClass: 'text-primary-fixed-dim' },
};

/** Toast oscuro (Level 3) anclado abajo a la derecha. */
export default function Toast({ toast, onClose }) {
    const tone = TONES[toast?.tone] ?? TONES.success;
    return (
        <div
            aria-live="polite"
            className={`fixed bottom-6 right-6 z-[80] max-w-sm w-[calc(100%-3rem)] sm:w-auto transition-all duration-300 ${
                toast ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
            }`}
        >
            {toast && (
                <div className="flex items-start gap-3 bg-inverse-surface text-inverse-on-surface rounded-lg px-4 py-3 shadow-[0_10px_15px_-3px_rgba(23,23,23,0.18)]">
                    <span className={`material-symbols-outlined text-[20px] ${tone.iconClass}`}>{tone.icon}</span>
                    <div className="flex flex-col min-w-0">
                        <span className="font-label-lg text-label-lg font-semibold">{toast.title}</span>
                        {toast.description && <span className="font-body-sm text-body-sm text-secondary-fixed-dim">{toast.description}</span>}
                    </div>
                    <button type="button" onClick={onClose} className="ml-2 text-secondary-fixed-dim hover:text-inverse-on-surface" aria-label="Cerrar">
                        <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                </div>
            )}
        </div>
    );
}
