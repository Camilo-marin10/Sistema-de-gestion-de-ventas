import Logo from './Logo';

const COLUMNS = [
    {
        title: 'Tienda',
        links: ['Hoodies', 'Pantalones', 'Chaquetas', 'Accesorios'],
    },
    {
        title: 'Ayuda',
        links: ['Envíos', 'Cambios y devoluciones', 'Guía de talles', 'Preguntas frecuentes'],
    },
    {
        title: 'Marca',
        links: ['Sobre nosotros', 'Contacto', 'Términos y condiciones', 'Privacidad'],
    },
];

export default function Footer() {
    return (
        <footer id="contacto" className="border-t border-border bg-base px-6 pb-8 pt-16 lg:px-10">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <Logo textClassName="text-lg" />
                        <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted">
                            Ropa y accesorios para el día a día. Stock actualizado en tiempo real.
                        </p>
                    </div>

                    {COLUMNS.map((col) => (
                        <div key={col.title}>
                            <h4 className="font-mono text-xs tracking-widest text-muted">{col.title.toUpperCase()}</h4>
                            <ul className="mt-4 space-y-2.5">
                                {col.links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-sm text-muted transition-colors duration-300 hover:text-accent"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 font-mono text-[11px] tracking-widest text-muted-2 sm:flex-row">
                    <span>© {new Date().getFullYear()} ASCEND. TODOS LOS DERECHOS RESERVADOS.</span>
                    <span>HECHO CON REACT + LARAVEL</span>
                </div>
            </div>
        </footer>
    );
}
