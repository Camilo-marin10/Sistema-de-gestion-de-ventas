import Reveal from './Reveal';

const FEATURES = [
    {
        title: 'Envío rápido',
        desc: 'A todo el país, con seguimiento en tiempo real.',
        icon: 'M3 7h11v9H3zM14 10h4l3 3v3h-7zM6.5 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17.5 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
    },
    {
        title: 'Pago seguro',
        desc: 'Múltiples métodos de pago protegidos.',
        icon: 'M3 6h18v12H3zM3 10h18M7 15h4',
    },
    {
        title: 'Cambios fáciles',
        desc: '30 días para cambios y devoluciones.',
        icon: 'M4 4v6h6M20 20v-6h-6M4.5 15a8 8 0 0 0 14.3 3M19.5 9A8 8 0 0 0 5.2 6',
    },
    {
        title: 'Soporte 24/7',
        desc: 'Te acompañamos antes y después de tu compra.',
        icon: 'M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
    },
];

export default function FeatureStrip() {
    return (
        <section className="border-y border-border bg-surface px-6 py-16 lg:px-10">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {FEATURES.map((f, i) => (
                    <Reveal key={f.title} delay={i * 90} className="flex items-start gap-4">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border text-accent transition-colors duration-300">
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d={f.icon} />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-display text-sm font-semibold uppercase text-ink">{f.title}</h3>
                            <p className="mt-1 text-xs leading-relaxed text-muted">{f.desc}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
