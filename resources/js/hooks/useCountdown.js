import { useEffect, useState } from 'react';

/** Cuenta regresiva en segundos. Devuelve el texto "mm:ss". */
export default function useCountdown(initialSeconds) {
    const [left, setLeft] = useState(initialSeconds);

    useEffect(() => {
        const id = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
        return () => clearInterval(id);
    }, []);

    const mm = String(Math.floor(left / 60)).padStart(2, '0');
    const ss = String(left % 60).padStart(2, '0');
    return `${mm}:${ss}`;
}
