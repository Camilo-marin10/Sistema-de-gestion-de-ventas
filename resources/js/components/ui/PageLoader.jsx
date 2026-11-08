/** Indicador de carga mientras se descarga el código de una página (lazy). */
export default function PageLoader() {
    return (
        <div className="w-full min-h-[50vh] flex items-center justify-center" role="status" aria-label="Cargando">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-ping" />
        </div>
    );
}
