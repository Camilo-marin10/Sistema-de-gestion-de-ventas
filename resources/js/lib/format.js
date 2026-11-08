/** Formatea un valor en pesos colombianos: 189000 → "$189.000 COP". */
export function formatCOP(value) {
    return '$' + Math.round(Number(value) || 0).toLocaleString('es-CO') + ' COP';
}

/** "6 nov 2026" */
export function formatDate(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** "6 nov 2026, 4:32 p. m." */
export function formatDateTime(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleString('es-CO', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}

/** "Hace 3 días" / "Hoy" */
export function formatRelative(iso) {
    if (!iso) return 'Nunca';
    const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
    if (days <= 0) return 'Hoy';
    if (days === 1) return 'Ayer';
    if (days < 30) return `Hace ${days} días`;
    const months = Math.floor(days / 30);
    if (months < 12) return `Hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
    return formatDate(iso);
}

/** "Camilo Marin" → "CM" */
export function initials(name = '') {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase() ?? '')
        .join('');
}

/** plural(1, 'compra') → "1 compra"; plural(3, 'compra') → "3 compras" */
export function plural(n, singular, pluralForm = `${singular}s`) {
    return `${n} ${n === 1 ? singular : pluralForm}`;
}
