import { Suspense, useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import StoreHeader from './StoreHeader';
import StoreFooter from './StoreFooter';
import PageLoader from '../ui/PageLoader';

export function useScrollTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
}

/**
 * Publica la altura real del header en la variable CSS --store-header-h
 * para que los elementos sticky (filtros, sidebar de cuenta) se alineen debajo.
 */
function useHeaderHeightVar(ref) {
    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        const update = () => document.documentElement.style.setProperty('--store-header-h', `${el.offsetHeight}px`);
        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => ro.disconnect();
    }, [ref]);
}

export default function StoreLayout() {
    const headerRef = useRef(null);
    useScrollTop();
    useHeaderHeightVar(headerRef);

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <StoreHeader ref={headerRef} />
            <main className="w-full flex-1">
                <Suspense fallback={<PageLoader />}>
                    <Outlet />
                </Suspense>
            </main>
            <StoreFooter />
        </div>
    );
}
