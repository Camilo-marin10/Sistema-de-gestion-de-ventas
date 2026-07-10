import useReveal from '../../hooks/useReveal';

export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children }) {
    const ref = useReveal();

    return (
        <Tag
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`opacity-0 translate-y-7 transition-all duration-700 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 ${className}`}
        >
            {children}
        </Tag>
    );
}
