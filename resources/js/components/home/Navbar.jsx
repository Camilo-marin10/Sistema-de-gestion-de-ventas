import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "./Logo";

const LINKS = [
    { label: "COLECCIÓN", href: "#colecciones" },
    { label: "NOVEDADES", href: "#novedades" },
    { label: "CONTACTO", href: "#contacto" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const ticking = useRef(false);
    const location = useLocation();
    const isHome = location.pathname === "/";

    useEffect(() => {
        function onScroll() {
            if (ticking.current) return;
            ticking.current = true;
            requestAnimationFrame(() => {
                setScrolled(window.scrollY > 24);
                ticking.current = false;
            });
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Typography: black outside home, white on home (unless scrolled)
    const textClass = !isHome || scrolled ? "text-ink" : "text-white";
    const linkClass = !isHome || scrolled ? "text-muted" : "text-white/80";
    const borderClass =
        !isHome || scrolled ? "border-border" : "border-white/20";

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
                scrolled
                    ? "bg-base/90 backdrop-blur-md border-b border-border"
                    : "bg-transparent border-b border-transparent"
            }`}
        >
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
                <a href="#top">
                    <Logo textClassName={`text-xl ${textClass}`} />
                </a>

                <ul
                    className={`hidden items-center gap-10 font-mono text-xs tracking-widest ${linkClass} md:flex`}
                >
                    {LINKS.map((link) => (
                        <li key={link.label} className="group relative">
                            <a
                                href={link.href}
                                className="transition-colors duration-300 hover:text-accent"
                            >
                                {link.label}
                            </a>
                            <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                        </li>
                    ))}
                </ul>

                <div className={`flex items-center gap-4 ${textClass}`}>
                    <button
                        type="button"
                        aria-label="Buscar"
                        className={`grid h-9 w-9 place-items-center rounded-full border ${borderClass} transition-all duration-300 hover:border-accent hover:text-accent hover:scale-105`}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="11" cy="11" r="7" />
                            <path d="m20 20-3.5-3.5" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        aria-label="Carrito"
                        className={`relative grid h-9 w-9 place-items-center rounded-full border ${borderClass} transition-all duration-300 hover:border-accent hover:text-accent hover:scale-105`}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6" />
                            <circle cx="9" cy="20" r="1" />
                            <circle cx="18" cy="20" r="1" />
                        </svg>
                        <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-accent text-[9px] font-bold text-base">
                            0
                        </span>
                    </button>
                </div>
            </nav>
        </header>
    );
}
