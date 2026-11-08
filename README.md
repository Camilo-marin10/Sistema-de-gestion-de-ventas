# Sistema de Gestión de Ventas

Proyecto de venta de ropa. Sistema de gestión de ventas y control de stock/inventario.

## Stack

- **Backend:** Laravel 12 (API REST + Sanctum)
- **Frontend:** React 18 + React Router + Axios, dentro de `resources/js`, compilado con Vite (`laravel-vite-plugin`)
- **Base de datos:** SQLite por defecto (`database/database.sqlite`), configurable a MySQL en `.env`

## Estructura de carpetas

```
├── app/
│   ├── Http/
│   │   ├── Controllers/Api/   # Controladores de la API REST (Products, Sales, Stock, Customers, Auth)
│   │   ├── Requests/          # Form Requests (validación)
│   │   └── Resources/         # API Resources (transformación de respuestas JSON)
│   ├── Models/                # Product, ProductType, ProductVariant, Customer, Sale, SaleItem, StockMovement, User
│   └── Services/              # Lógica de negocio (ventas, stock)
├── database/
│   ├── migrations/
│   └── seeders/
├── routes/
│   ├── api.php                 # Rutas de la API consumidas por React
│   └── web.php                 # Catch-all que sirve la SPA de React
├── resources/
│   ├── js/                     # Frontend React (SPA)
│   │   ├── api/                 # Cliente axios (instancia base)
│   │   ├── components/
│   │   │   ├── brand/Logo.jsx     # Logo único de ASCEND (wordmark + punto carmesí)
│   │   │   ├── layout/            # StoreLayout, AccountLayout, AuthLayout, DashboardLayout (admin + vendedor)
│   │   │   └── ui/                # Toast, PageLoader
│   │   ├── context/AuthContext.jsx # Sesión y roles (admin | vendedor | cliente) — simulada por ahora
│   │   ├── hooks/ · lib/          # useCountdown, formatCOP
│   │   ├── pages/                 # store/, account/, auth/, admin/, seller/ + ComingSoon
│   │   ├── routes/RequireRole.jsx  # Guard de rutas por rol
│   │   ├── main.jsx                # Punto de entrada
│   │   └── App.jsx                 # Router con las 3 zonas (tienda, /admin, /vendedor)
│   └── views/
│       └── app.blade.php        # Vista raíz que monta la SPA (@vite + <div id="root">)
└── public/                     # Build final de Vite + index de Laravel
```

## Cómo levantar el proyecto

```bash
composer run setup
```

Este comando instala las dependencias, genera la clave de Laravel, crea la base SQLite si hace falta, ejecuta las migraciones e instala/compila el frontend. Después, para iniciar el sistema:

```bash
php artisan serve
```

Con `php artisan serve` Laravel sirve tanto la API (`/api/*`) como los assets de React ya compilados (`public/build`) a través de la vista `resources/views/app.blade.php`. No hace falta un segundo proceso de Vite corriendo en paralelo.

> Si vas a desarrollar el frontend activamente y quieres hot-reload, existe también `npm run dev` (servidor Vite) y `composer run dev` (levanta todo junto con concurrently), pero el flujo por defecto de este proyecto es compilar con `npm run build` y servir todo desde `php artisan serve`.

## Estado actual

Esto es solo el **esqueleto** del proyecto:

- Backend: modelos, migraciones, controladores, Form Requests y API Resources están creados pero vacíos (stubs por defecto de Laravel), listos para implementarse. Las rutas en `routes/api.php` ya están registradas apuntando a sus controladores.
- Frontend: diseño completo implementado a partir de los mockups (17 pantallas) con un único sistema de diseño (tokens en `resources/css/app.css`, Montserrat + Material Symbols, logo unificado). Los datos aún son de ejemplo (estáticos) y la sesión es simulada en `localStorage`.

### Base de datos (XAMPP)

1. Inicia **MySQL** desde el panel de XAMPP.
2. Crea la base (una sola vez):
   ```sql
   CREATE DATABASE ascend_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
3. En `.env`: `DB_CONNECTION=mariadb`, `DB_DATABASE=ascend_db`, `DB_USERNAME=root`, `DB_PASSWORD=` (vacío por defecto en XAMPP).
4. `php artisan migrate`

### Autenticación

- API con **Laravel Sanctum** (token Bearer): `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`, `POST /api/auth/logout`.
- Roles en `users.role`: `admin`, `vendedor`, `cliente`. El registro público siempre crea **clientes**.
- Login limitado a 5 intentos fallidos por correo/IP (bloqueo de 5 minutos). Los tokens vencen a los 7 días.
- Crear un administrador (la contraseña se pide oculta si no se pasa `--password`):
  ```bash
  php artisan ascend:crear-admin --name="Nombre Apellido" --email=correo@dominio.com
  ```

### Gestión de usuarios (Administrador)

- **Empleados** (`/admin/empleados`): administradores y vendedores. Su historial es el **registro de ventas** que gestionaron.
- **Clientes** (`/admin/clientes`): cuentas de la tienda. Su historial es el **registro de compras**.
- El admin puede crear, editar todos los datos, cambiar el rol (el usuario pasa de lista automáticamente), activar/desactivar, restablecer contraseña y eliminar.
- Reglas de seguridad: un admin no puede cambiar su propio rol, desactivarse ni eliminarse; siempre queda al menos un admin activo; cambiar rol, estado o contraseña cierra las sesiones abiertas del usuario; no se elimina un usuario con ventas registradas (se desactiva para conservar el historial).
- API: `GET|POST /api/admin/users`, `GET|PUT|DELETE /api/admin/users/{id}`, `GET /api/admin/users/{id}/history` (requiere rol admin).

### Datos de demostración (opcional)

```bash
php artisan db:seed --class=DemoDataSeeder   # 3 vendedores, 12 clientes y ~40 ventas (@demo.ascend.co, clave Demo12345)
php artisan ascend:limpiar-demo              # elimina todos los datos demo
```

### Pruebas

```bash
php artisan test   # usa SQLite en memoria, no toca ascend_db
```
