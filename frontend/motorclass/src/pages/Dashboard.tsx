import { useEffect, useState } from "react";
import { api } from "../lib/api";

interface User {
    id: number;
    name: string;
    email: string;
}

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);

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