import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../lib/api";
import type { Modulo } from "../types";

export default function Modulo() {
    const { codigo } = useParams();

    const [modulo, setModulo] = useState<Modulo | null>(null);

    useEffect(() => {
        api.get(`/api/modulos/${codigo}`)
            .then((response) => {
                setModulo(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar módulo:", error);
            });
    }, [codigo]);

    if (!modulo) {
        return <p>Carregando...</p>;
    }

    return (
        <main>
            <h1>{modulo.titulo}</h1>
            <p>{modulo.descricao}</p>
        </main>
    );
}