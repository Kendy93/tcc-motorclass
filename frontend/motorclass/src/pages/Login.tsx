import { useState } from "react";
import type { SubmitEventHandler } from "react";
import { api } from "../lib/api";
import { Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            await api.get("/sanctum/csrf-cookie");

            await api.post("/login", {
                email,
                password,
            });

            const response = await api.get("/api/user");

            console.log("Usuário autenticado:", response.data);

            window.location.href = "/modulos";
        } catch (error: any) {
            if (error.response?.status === 422) {
                setError("E-mail ou senha incorretos.");
            } else {
                setError("Não foi possível realizar o login.");
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-blue1">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow text-left">
                <img
                    src="/images/logo.png"
                    alt="MOTORCLASS"
                    className="h-10 w-10 mb-4"
                />
                <p className="!my-5 text-xl font-bold">
                    Bem vindo de volta.
                </p>
                
                <hr className="border-gray-300 mb-6"/>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            E-mail
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            autoComplete="email"
                            placeholder="email@email.com"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Senha
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            autoComplete="current-password"
                            placeholder="********"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-blue3"
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                </form>
                <p className="text-sm !mt-3">
                    Ainda não possui conta? <Link to="/cadastro" className="underline hover:text-blue1">Se cadastrar.</Link>
                </p>
            </div>

        </main>
    );
}