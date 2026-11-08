import api from './axios';

/** Tipos de producto: CRUD del administrador + opciones para selects. */
export const productTypesApi = {
    list: (params) => api.get('/admin/product-types', { params }).then((r) => r.data),
    create: (payload) => api.post('/admin/product-types', payload).then((r) => r.data),
    update: (id, payload) => api.put(`/admin/product-types/${id}`, payload).then((r) => r.data),
    remove: (id) => api.delete(`/admin/product-types/${id}`).then((r) => r.data),
    /** Sólo activos (más el tipo `include` si se edita un producto con un tipo desactivado). */
    options: (include) => api.get('/catalog/product-types', { params: { include } }).then((r) => r.data.data),
};
