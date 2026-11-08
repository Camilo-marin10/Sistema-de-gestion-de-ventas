import api from './axios';

/** Inventario: existencias por variante, kardex y movimientos manuales. */
export const inventoryApi = {
    list: (params) => api.get('/admin/inventory', { params }).then((r) => r.data),
    movements: (params) => api.get('/admin/inventory/movements', { params }).then((r) => r.data),
    reasons: () => api.get('/admin/inventory/reasons').then((r) => r.data.data),
    move: (payload) => api.post('/admin/inventory/movements', payload).then((r) => r.data),
};
