import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/home/Navbar";

const inputClass =
    "w-full rounded-md border border-border bg-surface px-4 py-3 text-ink placeholder:text-muted outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

export default function Register() {
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        tipoDocumento: "",
        documento: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (
            !form.nombre ||
            !form.apellido ||
            !form.tipoDocumento ||
            !form.documento ||
            !form.email ||
            !form.password ||
            !form.confirmPassword
        ) {
            setError("Por favor completa todos los campos.");
            return;
        }
        if (form.password !== form.confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }
        setError("");
        console.log("Registro:", form);
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-base text-ink">
                <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl flex-col items-center justify-center px-6 py-20">
                    <div className="w-full">
                        <div className="mx-auto w-full max-w-3xl rounded-2xl border border-border bg-surface p-10 shadow-lg">
                            <div className="mb-10 text-center">
                                <h1 className="mt-4 text-4xl font-display uppercase tracking-tight text-ink sm:text-5xl">
                                    Crea tu cuenta
                                </h1>
                                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                                    Completa tus datos para empezar a comprar y
                                    recibir novedades exclusivas.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label
                                            className="mb-2 block text-sm uppercase tracking-[0.3em] text-muted"
                                            htmlFor="nombre"
                                        >
                                            Nombre
                                        </label>
                                        <input
                                            id="nombre"
                                            name="nombre"
                                            type="text"
                                            value={form.nombre}
                                            onChange={handleChange}
                                            placeholder="Tu nombre"
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className="mb-2 block text-sm uppercase tracking-[0.3em] text-muted"
                                            htmlFor="apellido"
                                        >
                                            Apellido
                                        </label>
                                        <input
                                            id="apellido"
                                            name="apellido"
                                            type="text"
                                            value={form.apellido}
                                            onChange={handleChange}
                                            placeholder="Tu apellido"
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label
                                            className="mb-2 block text-sm uppercase tracking-[0.3em] text-muted"
                                            htmlFor="tipoDocumento"
                                        >
                                            Tipo de documento
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="tipoDocumento"
                                                name="tipoDocumento"
                                                value={form.tipoDocumento}
                                                onChange={handleChange}
                                                className={`${inputClass} appearance-none pr-12 text-ink`}
                                            >
                                                <option value="" disabled>
                                                    Selecciona
                                                </option>
                                                <option value="cc">
                                                    Cédula
                                                </option>
                                                <option value="ti">
                                                    Tarjeta de identidad
                                                </option>
                                                <option value="pasaporte">
                                                    Pasaporte
                                                </option>
                                            </select>
                                            <svg
                                                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M6 8l4 4 4-4"
                                                    stroke="currentColor"
                                                    strokeWidth="1.6"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            className="mb-2 block text-sm uppercase tracking-[0.3em] text-muted"
                                            htmlFor="documento"
                                        >
                                            Número de documento
                                        </label>
                                        <input
                                            id="documento"
                                            name="documento"
                                            type="text"
                                            value={form.documento}
                                            onChange={handleChange}
                                            placeholder="12345678"
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        className="mb-2 block text-sm uppercase tracking-[0.3em] text-muted"
                                        htmlFor="email"
                                    >
                                        Correo electrónico
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="tucorreo@ejemplo.com"
                                        className={inputClass}
                                    />
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label
                                            className="mb-2 block text-sm uppercase tracking-[0.3em] text-muted"
                                            htmlFor="password"
                                        >
                                            Contraseña
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={form.password}
                                            onChange={handleChange}
                                            placeholder="Crea una contraseña"
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className="mb-2 block text-sm uppercase tracking-[0.3em] text-muted"
                                            htmlFor="confirmPassword"
                                        >
                                            Repite la contraseña
                                        </label>
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            value={form.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Repite la contraseña"
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-accent-dark focus:outline-none sm:w-auto"
                                    >
                                        Crear cuenta
                                    </button>
                                    <Link
                                        to="/login"
                                        className="text-sm uppercase tracking-[0.25em] text-ink transition hover:text-accent"
                                    >
                                        Ya tengo cuenta
                                    </Link>
                                </div>

                                {error ? (
                                    <p className="rounded-2xl bg-red-500/10 p-3 text-sm text-red-200">
                                        {error}
                                    </p>
                                ) : null}
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
