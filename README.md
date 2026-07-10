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
│   ├── Models/                # Product, Category, Customer, Sale, SaleItem, StockMovement, User
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
│   │   ├── components/layout/    # Vacía, lista para el layout de la app
│   │   ├── context/              # Vacía, lista para contextos (ej. auth)
│   │   ├── pages/                 # Dashboard.jsx (base) + carpetas vacías: products, sales, stock, customers
│   │   ├── routes/                # Vacía, lista para guards/rutas adicionales
│   │   ├── main.jsx                # Punto de entrada
│   │   └── App.jsx                 # Router con una sola ruta: "/" → Dashboard
│   └── views/
│       └── app.blade.php        # Vista raíz que monta la SPA (@vite + <div id="root">)
└── public/                     # Build final de Vite + index de Laravel
```

## Cómo levantar el proyecto

```bash
composer install
npm install
cp .env.example .env   # si no existe
php artisan key:generate
php artisan migrate

# Compilar el frontend de React a estático (una vez, o cada vez que cambie el frontend)
npm run build

# Levantar TODO el proyecto con un solo comando en una sola terminal:
php artisan serve
```

Con `php artisan serve` Laravel sirve tanto la API (`/api/*`) como los assets de React ya compilados (`public/build`) a través de la vista `resources/views/app.blade.php`. No hace falta un segundo proceso de Vite corriendo en paralelo.

> Si vas a desarrollar el frontend activamente y quieres hot-reload, existe también `npm run dev` (servidor Vite) y `composer run dev` (levanta todo junto con concurrently), pero el flujo por defecto de este proyecto es compilar con `npm run build` y servir todo desde `php artisan serve`.

## Estado actual

Esto es solo el **esqueleto** del proyecto:

- Backend: modelos, migraciones, controladores, Form Requests y API Resources están creados pero vacíos (stubs por defecto de Laravel), listos para implementarse. Las rutas en `routes/api.php` ya están registradas apuntando a sus controladores.
- Frontend: solo existe un Dashboard base (`resources/js/pages/Dashboard.jsx`) montado en `/`. El resto de carpetas (`products`, `sales`, `stock`, `customers`, `components/layout`, `context`, `routes`) están vacías, listas para agregar páginas, layout, contexto de auth, etc.
