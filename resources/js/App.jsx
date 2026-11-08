import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import RequireRole from './routes/RequireRole';
import PageLoader from './components/ui/PageLoader';

import StoreLayout from './components/layout/StoreLayout';
import AccountLayout from './components/layout/AccountLayout';
import AuthLayout from './components/layout/AuthLayout';
import DashboardLayout, { PANELS } from './components/layout/DashboardLayout';

const Home = lazy(() => import('./pages/store/Home'));
const MemberHome = lazy(() => import('./pages/store/MemberHome'));
const Catalog = lazy(() => import('./pages/store/Catalog'));
const ProductDetail = lazy(() => import('./pages/store/ProductDetail'));
const Cart = lazy(() => import('./pages/store/Cart'));
const Checkout = lazy(() => import('./pages/store/Checkout'));
const AccountOrders = lazy(() => import('./pages/account/Orders'));
const AccountCoupons = lazy(() => import('./pages/account/Coupons'));
const Login = lazy(() => import('./pages/auth/Login'));

const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminOrders = lazy(() => import('./pages/admin/Orders'));
const AdminProducts = lazy(() => import('./pages/admin/products/ProductsPage'));
const AdminInventory = lazy(() => import('./pages/admin/inventory/InventoryPage'));
const AdminProductTypes = lazy(() => import('./pages/admin/ProductTypes'));
const AdminUsersList = lazy(() => import('./pages/admin/users/UsersList'));
const AdminUserDetail = lazy(() => import('./pages/admin/users/UserDetail'));

const SellerDashboard = lazy(() => import('./pages/seller/Dashboard'));
const SellerOrders = lazy(() => import('./pages/seller/Orders'));
const SellerCatalog = lazy(() => import('./pages/seller/Catalog'));
const SellerInventory = lazy(() => import('./pages/seller/Inventory'));

import ComingSoon from './pages/ComingSoon';

/** Portada: visitante ve la home pública; cliente autenticado ve su home personalizada. */
function StoreHome() {
    const { user, loading } = useAuth();
    if (loading) return <PageLoader />;
    return user?.role === 'cliente' ? <MemberHome /> : <Home />;
}

/** Rutas del panel sin mockup aún → placeholder con el mismo patrón. */
function pendingPanelRoutes(role, builtPaths) {
    const panel = PANELS[role];
    const items = [...panel.nav, { to: panel.profile, label: 'Mi perfil', icon: 'account_circle' }];
    return items
        .filter((item) => !builtPaths.includes(item.to))
        .map((item) => (
            <Route
                key={item.to}
                path={item.to}
                element={<ComingSoon section={item.label} title={item.label} icon={item.icon} backTo={panel.nav[0].to} backLabel="Volver al dashboard" />}
            />
        ));
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Tienda pública */}
                    <Route element={<StoreLayout />}>
                        <Route index element={<StoreHome />} />
                        <Route path="hombre" element={<Catalog line="hombre" />} />
                        <Route path="mujer" element={<Catalog line="mujer" />} />
                        <Route path="novedades" element={<Catalog line="novedades" />} />
                        <Route path="ofertas" element={<Catalog line="ofertas" />} />
                        <Route path="producto/:slug" element={<ProductDetail />} />

                        {/* Cliente autenticado */}
                        <Route element={<RequireRole roles={['cliente']} />}>
                            <Route path="carrito" element={<Cart />} />
                            <Route path="checkout" element={<Checkout />} />
                            <Route path="cuenta" element={<AccountLayout />}>
                                <Route index element={<Navigate to="pedidos" replace />} />
                                <Route path="pedidos" element={<AccountOrders />} />
                                <Route path="cupones" element={<AccountCoupons />} />
                                <Route path="favoritos" element={<ComingSoon section="Mi Espacio" title="Favoritos" icon="favorite" />} />
                                <Route path="datos" element={<ComingSoon section="Mi Espacio" title="Datos Personales" icon="manage_accounts" />} />
                            </Route>
                        </Route>
                    </Route>

                    <Route element={<AuthLayout />}>
                        <Route path="login" element={<Login />} />
                    </Route>

                    {/* Panel de administración */}
                    <Route element={<RequireRole roles={['admin']} />}>
                        <Route element={<DashboardLayout role="admin" />}>
                            <Route path="admin" element={<AdminDashboard />} />
                            <Route path="admin/pedidos" element={<AdminOrders />} />
                            <Route path="admin/productos" element={<AdminProducts />} />
                            <Route path="admin/inventario" element={<AdminInventory />} />
                            <Route path="admin/empleados" element={<AdminUsersList key="empleados" group="empleados" />} />
                            <Route path="admin/empleados/:id" element={<AdminUserDetail key="empleados" group="empleados" />} />
                            <Route path="admin/clientes" element={<AdminUsersList key="clientes" group="clientes" />} />
                            <Route path="admin/clientes/:id" element={<AdminUserDetail key="clientes" group="clientes" />} />
                            <Route path="admin/usuarios" element={<Navigate to="/admin/empleados" replace />} />
                            <Route path="admin/tipos-de-producto" element={<AdminProductTypes />} />
                            {pendingPanelRoutes('admin', ['/admin', '/admin/pedidos', '/admin/productos', '/admin/inventario', '/admin/empleados', '/admin/clientes', '/admin/tipos-de-producto'])}
                        </Route>
                    </Route>

                    {/* Portal del vendedor */}
                    <Route element={<RequireRole roles={['vendedor']} />}>
                        <Route element={<DashboardLayout role="vendedor" />}>
                            <Route path="vendedor" element={<SellerDashboard />} />
                            <Route path="vendedor/pedidos" element={<SellerOrders />} />
                            <Route path="vendedor/productos" element={<SellerCatalog />} />
                            <Route path="vendedor/inventario" element={<SellerInventory />} />
                            {pendingPanelRoutes('vendedor', ['/vendedor', '/vendedor/pedidos', '/vendedor/productos', '/vendedor/inventario'])}
                        </Route>
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
