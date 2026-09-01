import { useEffect, useState } from 'react';
import './App.css';
import { api } from "./lib/api";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        api.get("/api/test")
            .then((response) => {
                setMessage(response.data.message);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold">
                Plataforma de Mecânica
            </h1>

            <p>{message}</p>
        </main>
    );
}

export default App
