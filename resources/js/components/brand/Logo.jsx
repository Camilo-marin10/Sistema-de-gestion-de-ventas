import { Link } from 'react-router-dom';

/**
 * Logo oficial de ASCEND — único en toda la plataforma.
 *
 * Wordmark "ASCEND" en Montserrat Bold + punto carmesí (primary-container).
 * Opcionalmente muestra un subtítulo de contexto (ej. "Admin Suite", "Portal Vendedor")
 * en estilo label-caps, alineado bajo el wordmark.
 *
 * @param {'light'|'dark'} tone  light = para fondos claros, dark = para fondos oscuros (sidebar, footer).
 * @param {'sm'|'md'|'lg'} size
 * @param {string} [subtitle]
 * @param {string|null} [to]     Ruta a la que enlaza. null = no enlaza.
 */
const SIZES = {
    sm: { word: 'text-title-md', dot: 'w-1 h-1', gap: 'gap-1' },
    md: { word: 'text-headline-md', dot: 'w-1.5 h-1.5', gap: 'gap-1.5' },
    lg: { word: 'text-headline-lg', dot: 'w-1.5 h-1.5', gap: 'gap-1.5' },
};

export default function Logo({ tone = 'light', size = 'lg', subtitle, to = '/', className = '' }) {
    const s = SIZES[size] ?? SIZES.lg;
    const wordColor = tone === 'dark' ? 'text-inverse-on-surface' : 'text-on-surface';
    const subColor = tone === 'dark' ? 'text-secondary-fixed-dim' : 'text-secondary';

    const content = (
        <span className={`inline-flex flex-col ${className}`}>
            <span className={`inline-flex items-center ${s.gap}`}>
                <span className={`font-headline-lg ${s.word} font-bold uppercase tracking-tight leading-none ${wordColor}`}>
                    ASCEND
                </span>
                <span className={`${s.dot} rounded-full bg-primary-container self-end mb-[0.2em]`} aria-hidden="true" />
            </span>
            {subtitle && (
                <span className={`font-label-caps text-label-caps uppercase tracking-widest mt-1.5 ${subColor}`}>
                    {subtitle}
                </span>
            )}
        </span>
    );

    if (to === null) return content;

    return (
        <Link to={to} aria-label="ASCEND — inicio" className="inline-flex">
            {content}
        </Link>
    );
}
