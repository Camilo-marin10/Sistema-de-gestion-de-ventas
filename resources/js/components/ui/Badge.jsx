/**
 * Badges de estado según DESIGN.md: 24px de alto, 11px / 600, radio 4px, borde hairline.
 */
const TONES = {
    success: 'text-[#065F46] bg-[#ECFDF5] border-[#A7F3D0]',
    warning: 'text-[#92400E] bg-[#FFFBEB] border-[#FDE68A]',
    critical: 'text-[#9F1D2A] bg-[#FCEAEC] border-[#FCA5A5]',
    neutral: 'text-[#858585] bg-[#F5F5F5] border-[#E5E5E5]',
    info: 'text-tertiary bg-tertiary-fixed/30 border-tertiary-fixed-dim/60',
    dark: 'text-inverse-on-surface bg-inverse-surface border-inverse-surface',
    brand: 'text-on-primary bg-primary-container border-primary-container',
};

export default function Badge({ tone = 'neutral', icon, children, className = '' }) {
    return (
        <span
            className={`inline-flex items-center gap-1 h-6 px-2.5 rounded-sm border font-label-caps text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap ${TONES[tone] ?? TONES.neutral} ${className}`}
        >
            {icon && <span className="material-symbols-outlined text-[14px]">{icon}</span>}
            {children}
        </span>
    );
}

export const ROLE_BADGE = {
    admin: { tone: 'brand', icon: 'shield_person' },
    vendedor: { tone: 'dark', icon: 'storefront' },
    cliente: { tone: 'neutral', icon: 'person' },
};

export const SALE_STATUS_TONE = {
    pendiente: 'warning',
    confirmado: 'info',
    preparacion: 'info',
    enviado: 'info',
    entregado: 'success',
    cancelado: 'critical',
};
