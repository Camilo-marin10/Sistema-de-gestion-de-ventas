import Reveal from './Reveal';

export default function Newsletter() {
    return (
        <section className="bg-base px-6 py-24 lg:px-10">
            <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-surface px-8 py-14 text-center sm:px-14">
                <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
                <p className="relative font-mono text-xs tracking-widest text-muted">// NO TE PIERDAS NADA</p>
                <h2 className="relative mt-3 font-display text-3xl font-bold uppercase text-ink sm:text-4xl">
                    Sumate a la lista
                </h2>
                <p className="relative mx-auto mt-3 max-w-md text-sm text-muted">
                    Recibí novedades de nuevas colecciones, drops limitados y descuentos exclusivos.
                </p>

                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="relative mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
                >
                    <input
                        type="email"
                        placeholder="tu@email.com"
                        className="w-full rounded-full border border-border bg-base px-5 py-3 text-sm text-ink placeholder:text-muted-2 outline-none transition-colors duration-300 focus:border-accent"
                    />
                    <button
                        type="submit"
                        className="shrink-0 rounded-full bg-accent px-6 py-3 font-mono text-xs font-semibold tracking-widest text-base transition-transform duration-300 hover:scale-105"
                    >
                        SUSCRIBIRME
                    </button>
                </form>
            </Reveal>
        </section>
    );
}
