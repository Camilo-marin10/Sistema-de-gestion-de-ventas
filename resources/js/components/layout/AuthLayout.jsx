import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '../brand/Logo';
import PageLoader from '../ui/PageLoader';
import StoreFooter from './StoreFooter';
import { useScrollTop } from './StoreLayout';

/** Layout transaccional mínimo para registro / inicio de sesión. */
export default function AuthLayout() {
    useScrollTop();

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <header className="w-full bg-surface-container-lowest h-20 px-margin-mobile md:px-margin flex items-center justify-between shadow-xs">
                <Logo />
                <div className="flex items-center gap-space-lg text-secondary">
                    <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-secondary-container hidden md:inline-flex items-center gap-space-xs">
                        <span className="material-symbols-outlined text-[16px] text-tertiary">lock</span>
                        Entorno Seguro SSL 256-Bit
                    </span>
                    <a className="font-label-md text-label-md text-on-surface hover:text-primary transition-colors flex items-center gap-space-xxs" href="#">
                        <span className="material-symbols-outlined text-[18px]">help_outline</span>
                        <span>Atención al Cliente</span>
                    </a>
                </div>
            </header>
            <main className="w-full flex-1">
                <Suspense fallback={<PageLoader />}>
                    <Outlet />
                </Suspense>
            </main>
            <StoreFooter compact />
        </div>
    );
}
