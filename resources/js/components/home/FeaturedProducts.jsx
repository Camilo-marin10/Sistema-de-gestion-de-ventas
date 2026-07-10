import Reveal from './Reveal';

const PRODUCTS = [
    { name: 'Hoodie Oversize', price: '$89.900', tag: 'NUEVO' },
    { name: 'Cargo Pants', price: '$119.900', tag: 'DROP_01' },
    { name: 'Jacket Técnica', price: '$159.900', tag: 'LIMITADO' },
    { name: 'Gorra Táctica', price: '$49.900', tag: 'NUEVO' },
];

export default function FeaturedProducts() {
    return (
        <section id="novedades" className="bg-base px-6 py-24 lg:px-10">
            <div className="mx-auto max-w-7xl">
                <Reveal className="flex items-end justify-between gap-6 border-b border-border pb-6">
                    <div>
                        <p className="font-mono text-xs tracking-widest text-muted">// NOVEDADES</p>
                        <h2 className="mt-2 font-display text-3xl font-bold uppercase text-ink sm:text-4xl">
                            Últimas piezas agregadas
                        </h2>
                    </div>
                </Reveal>

                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {PRODUCTS.map((p, i) => (
                        <Reveal key={p.name} delay={i * 90}>
                            <a
                                href="#"
                                className="group relative block overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/60"
                            >
                                <div className="relative aspect-3/4 overflow-hidden bg-surface-alt">
                                    <div
                                        className="absolute inset-0 opacity-50 transition-transform duration-700 group-hover:scale-110"
                                        style={{
                                            backgroundImage:
                                                'linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)',
                                            backgroundSize: '22px 22px',
                                        }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="h-16 w-16 text-border transition-colors duration-500 group-hover:text-accent/40"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1"
                                        >
                                            <path d="M6 8 3 21h4l1-6h8l1 6h4L18 8l-3-5H9zM9 3v6M15 3v6" />
                                        </svg>
                                    </div>
                                    <span className="absolute left-3 top-3 rounded-full border border-accent/40 bg-base/70 px-2.5 py-1 font-mono text-[10px] tracking-widest text-accent">
                                        {p.tag}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-4">
                                    <h3 className="font-display text-sm font-semibold uppercase text-ink">
                                        {p.name}
                                    </h3>
                                    <span className="font-mono text-sm font-semibold text-accent-dark">{p.price}</span>
                                </div>
                            </a>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
