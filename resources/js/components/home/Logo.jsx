export default function Logo({ className = "", textClassName = "" }) {
    return (
        <span className={`inline-flex items-center ${className}`}>
            <span
                className={`font-display text-2xl uppercase tracking-[0.35em] ${textClassName}`}
            >
                ASCEND
            </span>
        </span>
    );
}
