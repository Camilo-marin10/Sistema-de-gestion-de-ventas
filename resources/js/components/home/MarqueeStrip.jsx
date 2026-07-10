const ITEMS = [
    'ENVÍO GRATIS DESDE $150.000',
    'NUEVA COLECCIÓN DISPONIBLE',
    'PAGA CONTRA ENTREGA',
    'CAMBIOS SIN COSTO EN 30 DÍAS',
];

export default function MarqueeStrip() {
    const track = [...ITEMS, ...ITEMS];

    return (
        <div className="overflow-hidden border-y border-border bg-surface py-3">
            <div className="animate-marquee flex w-max items-center gap-10">
                {track.map((item, i) => (
                    <div key={i} className="flex items-center gap-10 font-mono text-xs tracking-widest text-muted">
                        <span>{item}</span>
                        <span className="text-border">/</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
