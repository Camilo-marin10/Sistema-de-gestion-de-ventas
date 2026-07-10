import Reveal from './Reveal';

const CATEGORIES = [
    { name: 'Hoodies', code: 'CAT_01', icon: 'M6 8 3 12l3 4M18 8l3 4-3 4M8 21h8M9 3h6l1 5H8z' },
    { name: 'Pantalones', code: 'CAT_02', icon: 'M7 3h10l1 6-2 12h-3l-1-9-1 9H8L6 9z' },
    { name: 'Chaquetas', code: 'CAT_03', icon: 'M6 8 3 21h4l1-6h8l1 6h4L18 8l-3-5H9zM9 3v6M15 3v6' },
    { name: 'Accesorios', code: 'CAT_04', icon: 'M12 3v4M5 9h14l-1 12H6zM9 9v-2a3 3 0 0 1 6 0v2' },
];

export default function CategoryGrid() {
    return (
        <section id="colecciones" className="bg-base px-6 py-24 lg:px-10">
            <div className="mx-auto max-w-7xl">
                <Reveal className="flex items-end justify-between gap-6 border-b border-border pb-6">
                    <div>
                        <p className="font-mono text-xs tracking-widest text-muted">// COLECCIONES</p>
                        <h2 className="mt-2 font-display text-3xl font-bold uppercase text-ink sm:text-4xl">
                            Explora por categoría
                        </h2>
                    </div>
                    <a
                        href="#novedades"
                        className="hidden font-mono text-xs tracking-widest text-muted transition-colors hover:text-accent sm:block"
                    >
                        VER TODO →
                    </a>
                </Reveal>

                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {CATEGORIES.map((cat, i) => (
                        <Reveal key={cat.code} delay={i * 90}>
                            <a
                                href="#"
                                className="group relative block overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/60"
                            >
                                <div className="pointer-events-none absolute inset-0 scale-0 rounded-2xl bg-accent/5 transition-transform duration-500 group-hover:scale-100" />
                                <div className="relative flex items-center justify-between font-mono text-[10px] tracking-widest text-muted">
                                    <span>{cat.code}</span>
                                    <span className="transition-transform duration-500 group-hover:translate-x-1 group-hover:text-accent">
                                        →
                                    </span>
                                </div>
                                <svg
                                    viewBox="0 0 24 24"
                                    className="relative mt-8 h-10 w-10 text-muted transition-colors duration-500 group-hover:text-accent"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d={cat.icon} />
                                </svg>
                                <h3 className="relative mt-6 font-display text-lg font-semibold uppercase text-ink">
                                    {cat.name}
                                </h3>
                            </a>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
