import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productTypesApi } from '../../api/productTypes';

/**
 * Select de tipos de producto (sólo activos), alimentado por la API.
 *
 * @param {string|number} value      id seleccionado ('' = ninguno)
 * @param {(id: string) => void} onChange
 * @param {string} [placeholder]     texto de la opción vacía
 * @param {any} [reloadKey]          cambia para volver a consultar (ej. al abrir el formulario)
 * @param {number} [includeId]       incluye este tipo aunque esté inactivo (al editar)
 * @param {boolean} [showEmptyHint]  muestra un enlace para crear tipos si no hay ninguno
 */
export default function ProductTypeSelect({ value, onChange, placeholder = 'Selecciona un tipo', reloadKey, includeId, className = '', error, id, showEmptyHint = true, ...rest }) {
    const [options, setOptions] = useState([]);
    const [state, setState] = useState('loading'); // loading | ready | error

    useEffect(() => {
        let alive = true;
        setState('loading');
        productTypesApi
            .options(includeId || value || undefined)
            .then((data) => {
                if (!alive) return;
                setOptions(data);
                setState('ready');
            })
            .catch(() => alive && setState('error'));
        return () => {
            alive = false;
        };
        // `value` sólo se usa para incluir un tipo desactivado al editar; no recargar en cada cambio.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reloadKey]);

    const empty = state === 'ready' && options.length === 0;

    return (
        <div className="flex flex-col gap-space-xxs">
            <select
                id={id}
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value)}
                disabled={state !== 'ready' || empty}
                className={`${className} ${error ? 'ring-1 ring-primary-container bg-error-container/10' : ''} disabled:opacity-60`}
                {...rest}
            >
                <option value="">{state === 'loading' ? 'Cargando tipos...' : state === 'error' ? 'No se pudieron cargar' : empty ? 'Sin tipos creados' : placeholder}</option>
                {options.map((o) => (
                    <option key={o.id} value={o.id}>
                        {o.name}
                        {o.is_active ? '' : ' (inactivo)'}
                    </option>
                ))}
            </select>
            {error && <span className="font-body-sm text-body-sm text-primary">{error}</span>}
            {empty && showEmptyHint && (
                <Link to="/admin/tipos-de-producto" className="font-body-sm text-body-sm text-primary hover:underline inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">add</span>
                    Crear tipos de producto
                </Link>
            )}
        </div>
    );
}
