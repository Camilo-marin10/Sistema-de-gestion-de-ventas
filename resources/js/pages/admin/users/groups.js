/** Configuración de las dos listas de usuarios del administrador. */
export const USER_GROUPS = {
    empleados: {
        key: 'empleados',
        title: 'Empleados',
        singular: 'empleado',
        description: 'Administradores y vendedores con acceso a los paneles internos.',
        basePath: '/admin/empleados',
        icon: 'badge',
        defaultRole: 'vendedor',
        roleFilters: [
            { value: '', label: 'Todos los roles' },
            { value: 'admin', label: 'Administradores' },
            { value: 'vendedor', label: 'Vendedores' },
        ],
        activityLabel: 'Ventas gestionadas',
        historyTitle: 'Registro de ventas',
        historyDescription: 'Pedidos gestionados por este empleado en todos los canales.',
        historyNoun: 'ventas',
        counterpartLabel: 'Cliente',
        counterpartKey: 'customer',
        emptyHistory: 'Este empleado aún no ha gestionado ventas.',
    },
    clientes: {
        key: 'clientes',
        title: 'Clientes',
        singular: 'cliente',
        description: 'Cuentas registradas en la tienda online.',
        basePath: '/admin/clientes',
        icon: 'group',
        defaultRole: 'cliente',
        roleFilters: null,
        activityLabel: 'Compras',
        historyTitle: 'Registro de compras',
        historyDescription: 'Pedidos realizados por este cliente y su estado actual.',
        historyNoun: 'compras',
        counterpartLabel: 'Atendido por',
        counterpartKey: 'seller',
        emptyHistory: 'Este cliente aún no ha realizado compras.',
    },
};

export const ROLE_OPTIONS = [
    { value: 'admin', label: 'Administrador', icon: 'shield_person', description: 'Acceso total al panel de administración.' },
    { value: 'vendedor', label: 'Vendedor', icon: 'storefront', description: 'Portal operativo: pedidos, catálogo e inventario.' },
    { value: 'cliente', label: 'Cliente', icon: 'person', description: 'Compra en la tienda online.' },
];

export const groupForRole = (role) => (role === 'cliente' ? USER_GROUPS.clientes : USER_GROUPS.empleados);
