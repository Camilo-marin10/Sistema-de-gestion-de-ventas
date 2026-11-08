/** Constantes compartidas del catálogo de productos. */

export const LINES = [
    { value: 'hombre', label: 'Hombre' },
    { value: 'mujer', label: 'Mujer' },
    { value: 'unisex', label: 'Unisex' },
];

export const STATUSES = [
    { value: 'activo', label: 'Publicado / Activo en web', tone: 'success' },
    { value: 'borrador', label: 'En revisión / Borrador', tone: 'warning' },
    { value: 'inactivo', label: 'Desactivado / Oculto', tone: 'neutral' },
];

export const STATUS_TONE = { activo: 'success', borrador: 'warning', inactivo: 'neutral' };

export const STOCK_STATUS = {
    optimo: { label: 'En stock óptimo', className: 'text-tertiary' },
    critico: { label: 'Stock crítico', className: 'text-[#92400E]' },
    agotado: { label: 'Agotado', className: 'text-primary' },
};

export const SIZE_SUGGESTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'ÚNICA', '36', '37', '38', '39', '40', '41', '42', '43', '44'];

export const COLOR_PRESETS = [
    { name: 'Negro', hex: '#111111' },
    { name: 'Blanco', hex: '#ffffff' },
    { name: 'Gris', hex: '#8a8a8a' },
    { name: 'Rojo Carmín', hex: '#c62835' },
    { name: 'Beige', hex: '#d8c3a5' },
    { name: 'Azul Marino', hex: '#1f2a44' },
    { name: 'Verde Oliva', hex: '#5b6236' },
    { name: 'Café', hex: '#6b4f3a' },
];

export const TAG_SUGGESTIONS = ['Novedades', 'Colección 2025', 'Ofertas', 'Edición limitada', 'Más vendido'];

/** Código corto del color para el SKU: "Rojo Carmín" → "ROJ". */
export function colorCode(color = '') {
    const clean = color
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-zA-Z0-9]/g, '')
        .toUpperCase();
    return clean.slice(0, 3);
}

/** SKU sugerido para una variante: BASE-TALLA-COLOR. */
export function variantSku(baseSku, size, color) {
    const parts = [baseSku, size, colorCode(color)]
        .map((p) =>
            (p ?? '')
                .toString()
                .normalize('NFD')
                .replace(/[̀-ͯ]/g, '')
                .trim()
                .toUpperCase()
                .replace(/[^A-Z0-9-]/g, ''),
        )
        .filter(Boolean);
    return parts.join('-');
}
