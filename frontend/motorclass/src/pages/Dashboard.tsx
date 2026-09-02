import { useEffect, useState } from "react";
import { api } from "../lib/api";

import { type User, type Modulo } from "../types";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);

    //para mostrar os módulos
    const [modulos, setModulos] = useState<Modulo[]>([]);
    useEffect(() => {
        api.get("/api/modulos")
            .then((response) => {
                console.log("Módulos recebidos:", response.data);
                setModulos(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar módulos:", error);
            });
    }, []);

    useEffect(() => {
        api.get("/api/user")
            .then((response) => {
                setUser(response.data.user);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    async function handleLogout() {
        await api.post("/logout");
        window.location.href = "/login";
    }

    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <p className="mt-2 text-gray-600">
                    Bem-vindo, {user?.name}.
                </p>

                {modulos.map((modulo) => (
                    <div key={modulo.id}>
                        <Link to={`/modulos/${modulo.codigo}`}>
                            <h2>{modulo.titulo}</h2>
                        </Link>

                        <p>{modulo.descricao}</p>
                    </div>
                ))}

                <button
                    onClick={handleLogout}
                    className="mt-6 rounded-lg bg-black px-4 py-2 text-white"
                >
                    Sair
                </button>
            </div>
        </main>
    );
}