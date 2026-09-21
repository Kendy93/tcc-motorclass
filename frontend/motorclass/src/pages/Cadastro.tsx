import { useState } from "react";
import type { SubmitEventHandler } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import Botao from "../components/Botao";
import LinkNav from "../components/navigation/LinkNav";

export default function Cadastro() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            await api.get("/sanctum/csrf-cookie");
            await api.post("/register", {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });

            const response = await api.get("/api/user");
            console.log("Usuário cadastrado:", response.data);
            navigate("/modulos");

        } catch (error: any) {
            if (error.response?.status === 422) {
                const errors = error.response.data.errors;
                if (errors?.email) {
                    setError(errors.email[0]);
                } else if (errors?.password) {
                    setError(errors.password[0]);
                } else {
                    setError("Verifique os dados informados.");
                }
            } else {
                setError("Não foi possível realizar o cadastro.");
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-blue2">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow text-left">
                <LinkNav
                    tipo="imagem"
                    imagem="/images/logo_blue3.png"
                    destino="/"
                    tamanho="pequeno"
                    alt="Página inicial"
                />
                <p className="!my-5 text-xl font-bold">
                    Criar conta.
                </p>
                
                <hr className="border-gray-300 mb-6"/>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Nome
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                            autoComplete="name"
                            placeholder="Seu nome"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
                        />
                    </div>

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
                            autoComplete="new-password"
                            placeholder="********"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password_confirmation"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Confirmar senha
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            value={passwordConfirmation}
                            onChange={(event) =>
                                setPasswordConfirmation(event.target.value)
                            }
                            required
                            autoComplete="new-password"
                            placeholder="********"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <Botao
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 w-full"
                    >
                        {loading ? "Criando conta..." : "Criar conta"}
                    </Botao>
                </form>
                    <p className="text-sm !mt-3">
                        Ainda não possui conta? <Link to="/cadastro" className="underline hover:text-blue1">Se cadastrar.</Link>
                    </p>
            </div>
        </main>
    );
}