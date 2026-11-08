import api from './axios';

/** API de gestión de usuarios del administrador. */
export const adminUsersApi = {
    list: (params) => api.get('/admin/users', { params }).then((r) => r.data),
    get: (id) => api.get(`/admin/users/${id}`).then((r) => r.data),
    history: (id, params) => api.get(`/admin/users/${id}/history`, { params }).then((r) => r.data),
    create: (payload) => api.post('/admin/users', payload).then((r) => r.data),
    update: (id, payload) => api.put(`/admin/users/${id}`, payload).then((r) => r.data),
    remove: (id) => api.delete(`/admin/users/${id}`).then((r) => r.data),
};
