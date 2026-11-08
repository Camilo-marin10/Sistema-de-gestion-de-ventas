import { useEffect } from 'react';

/** Diálogo de confirmación (Level 4) para acciones destructivas. */
export default function ConfirmDialog({ open, title, message, confirmLabel = 'Confirmar', busy = false, onConfirm, onCancel }) {
    useEffect(() => {
        if (!open) return undefined;
        const onKey = (e) => e.key === 'Escape' && !busy && onCancel();
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open, busy, onCancel]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-space-md" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-[#171717]/40 backdrop-blur-xs" onClick={() => !busy && onCancel()} />
            <div className="relative w-full max-w-md bg-surface-container-lowest rounded-xl shadow-[0_20px_25px_-5px_rgba(23,23,23,0.12),0_8px_10px_-6px_rgba(23,23,23,0.04)] overflow-hidden">
                <div className="w-full h-1.5 bg-primary-container" />
                <div className="p-space-lg flex flex-col gap-space-md">
                    <div className="flex items-start gap-space-md">
                        <div className="w-10 h-10 rounded-lg bg-error-container/40 flex items-center justify-center text-primary shrink-0">
                            <span className="material-symbols-outlined text-[22px]">warning</span>
                        </div>
                        <div className="flex flex-col gap-space-xxs">
                            <h3 className="font-title-md text-title-md text-on-surface font-semibold">{title}</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant">{message}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-space-sm pt-space-xs">
                        <button
                            type="button"
                            disabled={busy}
                            onClick={onCancel}
                            className="h-10 px-space-md rounded-lg text-on-surface font-label-lg text-label-lg hover:bg-surface-container-low transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            disabled={busy}
                            onClick={onConfirm}
                            className="h-10 px-space-md rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg flex items-center gap-space-xs transition-colors disabled:opacity-70"
                        >
                            {busy && <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>}
                            {confirmLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
