import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/home/Navbar";

const inputClass =
    "w-full rounded-md border border-border bg-surface px-4 py-3 text-ink placeholder:text-muted outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        if (!email || !password) {
            setError("Por favor completa todos los campos.");
            return;
        }
        setError("");
        console.log("Login:", { email, password });
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-base text-ink">
                <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl flex-col items-center justify-center px-6 py-20">
                    <div className="w-full text-center">
                        <h1 className="mt-4 text-4xl font-display font-bold tracking-tight text-ink sm:text-5xl">
                            ¡Bienvenido de nuevo!
                        </h1>
                        <p className="mt-3 text-muted">
                            Accede a tu cuenta ASCEND para ver tu historial y
                            gestionar pedidos.
                        </p>
                    </div>

                    <div className="mt-8 w-full">
                        <div className="rounded-2xl border border-border bg-surface p-8 shadow">
                            <div className="text-center text-muted mb-4">o</div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label
                                        className="mb-2 block text-sm uppercase tracking-[0.3em] text-muted"
                                        htmlFor="email"
                                    >
                                        Correo electrónico
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                        placeholder="tucorreo@ejemplo.com"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label
                                        className="mb-2 block text-sm uppercase tracking-[0.3em] text-muted"
                                        htmlFor="password"
                                    >
                                        Contraseña
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                        placeholder="Ingresa tu contraseña"
                                        className={inputClass}
                                    />
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="inline-flex w-full max-w-xs items-center justify-center rounded-full bg-ink px-8 py-3 text-sm font-semibold uppercase text-white"
                                    >
                                        Iniciar sesión
                                    </button>
                                </div>

                                <div className="text-center mt-2">
                                    <Link
                                        to="#"
                                        className="text-sm text-muted hover:text-accent"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </div>

                                {error ? (
                                    <p className="rounded-2xl bg-red-500/10 p-3 text-sm text-red-800">
                                        {error}
                                    </p>
                                ) : null}
                            </form>
                        </div>
                    </div>

                    <div className="mt-8 w-full text-center">
                        <hr className="border-t border-border mb-6" />
                        <h2 className="text-xl font-display text-ink">
                            ¿No tienes una cuenta?
                        </h2>
                        <Link
                            to="/register"
                            className="mt-4 inline-block rounded-full bg-accent px-8 py-3 text-white"
                        >
                            Crear cuenta
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
