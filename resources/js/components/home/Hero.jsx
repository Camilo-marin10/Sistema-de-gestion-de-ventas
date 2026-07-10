export default function Hero() {
    return (
        <section
            id="top"
            className="relative flex min-h-screen items-end overflow-hidden bg-base pt-24"
        >
            {/* grid + glow backdrop */}
            <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)',
                    backgroundSize: '44px 44px',
                }}
            />
            <div className="pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full bg-accent/10 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-full max-w-2xl overflow-hidden lg:block">
                <div className="absolute inset-0 -translate-y-1/3">
                    <div className="animate-scan absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-accent/10 to-transparent" />
                </div>
                <img
                    src="/images/hero-placeholder.svg"
                    alt="Vista previa de colección"
                    className="h-full w-full object-cover opacity-80 [mask-image:linear-gradient(to_left,black_55%,transparent)]"
                    loading="eager"
                    fetchpriority="high"
                    width="900"
                    height="1100"
                />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 lg:px-10">
                <div className="animate-fade-up mb-5 flex items-center gap-2 font-mono text-xs tracking-widest text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-blink" />
                    SISTEMA ACTIVO / STOCK DISPONIBLE
                </div>

                <h1 className="animate-fade-up max-w-3xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl [animation-delay:120ms]">
                    Bienvenido a <span className="font-logo text-accent">ASCEND</span>
                </h1>
                <p className="animate-fade-up mt-6 max-w-lg text-sm leading-relaxed text-muted sm:text-base [animation-delay:220ms]">
                    Ropa y accesorios pensados para el día a día. Nueva colección disponible,
                    stock actualizado en tiempo real y envíos a todo el país.
                </p>

                <div className="animate-fade-up mt-9 flex flex-wrap items-center gap-4 [animation-delay:320ms]">
                    <a
                        href="#colecciones"
                        className="group relative overflow-hidden rounded-full bg-accent px-7 py-3 font-mono text-xs font-semibold tracking-widest text-base transition-transform duration-300 hover:scale-105"
                    >
                        <span className="relative z-10">VER COLECCIÓN</span>
                        <span className="absolute inset-0 -translate-x-full bg-base/30 transition-transform duration-500 group-hover:translate-x-0" />
                    </a>
                    <a
                        href="#novedades"
                        className="rounded-full border border-border px-7 py-3 font-mono text-xs font-semibold tracking-widest text-ink transition-all duration-300 hover:border-accent hover:text-accent"
                    >
                        VER NOVEDADES
                    </a>
                </div>

                <dl className="animate-fade-up mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6 font-mono text-[11px] tracking-widest text-muted [animation-delay:420ms]">
                    <div>
                        <dt className="text-muted">ENVÍOS</dt>
                        <dd className="mt-1 text-ink">A TODO EL PAÍS</dd>
                    </div>
                    <div>
                        <dt className="text-muted">STOCK</dt>
                        <dd className="mt-1 text-ink">EN VIVO</dd>
                    </div>
                    <div>
                        <dt className="text-muted">SOPORTE</dt>
                        <dd className="mt-1 text-ink">24/7</dd>
                    </div>
                </dl>
            </div>
        </section>
    );
}
