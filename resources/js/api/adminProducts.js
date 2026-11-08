import api from './axios';

/** Catálogo de productos del administrador. */
export const adminProductsApi = {
    list: (params) => api.get('/admin/products', { params }).then((r) => r.data),
    get: (id) => api.get(`/admin/products/${id}`).then((r) => r.data),
    create: (payload) => api.post('/admin/products', payload).then((r) => r.data),
    update: (id, payload) => api.put(`/admin/products/${id}`, payload).then((r) => r.data),
    remove: (id) => api.delete(`/admin/products/${id}`).then((r) => r.data),
    setFeatured: (id, isFeatured) => api.patch(`/admin/products/${id}/featured`, { is_featured: isFeatured }).then((r) => r.data),
    uploadImage: (id, file) => {
        const form = new FormData();
        form.append('image', file);
        return api.post(`/admin/products/${id}/image`, form).then((r) => r.data);
    },
    deleteImage: (id) => api.delete(`/admin/products/${id}/image`).then((r) => r.data),
};
