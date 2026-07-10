export default function Logo({ className = '', markClassName = '', textClassName = '' }) {
    return (
        <span className={`inline-flex items-center gap-2 text-ink ${className}`}>
            <img
                src="/images/logo-mark.svg"
                alt=""
                aria-hidden="true"
                className={`h-6 w-6 ${markClassName}`}
                width="240"
                height="200"
            />
            <span className={`font-logo tracking-wide ${textClassName}`}>ASCEND</span>
        </span>
    );
}
