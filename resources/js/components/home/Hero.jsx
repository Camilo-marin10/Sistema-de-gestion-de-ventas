import { useEffect, useState } from "react";

export default function Hero() {
    const slides = [
        {
            src: "/images/Diseño-uno-ascend.....png",
            label: "Edición urbana",
        },
        {
            src: "/images/Diseño-2-ascend.png",
            label: "Diseño premium",
        },
        {
            src: "/images/Diseño-3-ascend.png",
            label: "Estilo icónico",
        },
    ];
    const [activeIndex, setActiveIndex] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % slides.length);
        }, 5200);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <section
            id="top"
            className="relative isolate overflow-hidden bg-[#050505] pt-24 text-white"
        >
            <div className="absolute inset-0">
                <img
                    src="/images/Diseño-2-ascend.png"
                    alt="Fondo estático del diseño 2"
                    className="h-full w-full object-cover object-center"
                    loading="eager"
                    fetchpriority="high"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(220,38,38,0.22),_transparent_42%)]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/70 to-[#050505]/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-base/95 via-base/20 to-transparent" />
            </div>

            <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                }}
            />

            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-7xl flex-col gap-12 px-6 py-20 lg:flex-row lg:items-start lg:px-10">
                <div className="max-w-2xl lg:flex-1">
                    <div className="animate-pulse-glow mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.35em] text-white/80 backdrop-blur md:text-xs">
                        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                        Primera colección
                    </div>

                    <h1 className="animate-fade-up max-w-3xl font-display text-5xl font-bold uppercase leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl [animation-delay:120ms]">
                        La prenda que{" "}
                        <span className="font-logo text-accent">destaca</span>{" "}
                        desde el primer vistazo
                    </h1>

                    <p className="animate-fade-up mt-6 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base [animation-delay:220ms]">
                        Descubre la nueva propuesta de ASCEND con un diseño que
                        combina estilo, confort y presencia. Esta colección está
                        pensada para marcar la diferencia.
                    </p>

                    <div className="animate-fade-up mt-9 flex flex-wrap items-center gap-4 [animation-delay:320ms]">
                        <a
                            href="#colecciones"
                            className="group relative overflow-hidden rounded-full bg-accent px-7 py-3 font-mono text-xs font-semibold tracking-[0.3em] text-base transition-all duration-300 hover:scale-105"
                        >
                            <span className="relative z-10">Ver colección</span>
                            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
                        </a>
                        <a
                            href="#novedades"
                            className="rounded-full border border-white/25 bg-white/10 px-7 py-3 font-mono text-xs font-semibold tracking-[0.3em] text-white transition-all duration-300 hover:border-accent hover:bg-accent/10"
                        >
                            Ver novedades
                        </a>
                    </div>
                </div>

                <aside className="w-full lg:w-[420px]">
                    <div className="animate-float-slow relative mx-auto w-full rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl">
                        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-accent/20 via-transparent to-white/10" />
                        <div className="relative overflow-hidden rounded-[1.5rem]">
                            <img
                                src={slides[activeIndex].src}
                                alt={`Diseño destacado: ${slides[activeIndex].label}`}
                                className="h-[560px] w-full object-cover object-center transition duration-700 ease-in-out hover:scale-105"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6">
                                <h2 className="text-2xl font-mono uppercase tracking-[0.35em] text-white">
                                    Primera colección
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center gap-3 text-center">
                        {slides.map((slide, index) => (
                            <button
                                key={slide.src}
                                type="button"
                                onClick={() => setActiveIndex(index)}
                                className={`rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.35em] transition-all duration-300 ${
                                    index === activeIndex
                                        ? "bg-accent text-white shadow-lg shadow-accent/25"
                                        : "bg-white/10 text-white/70 hover:bg-white/20"
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </aside>
            </div>
        </section>
    );
}
