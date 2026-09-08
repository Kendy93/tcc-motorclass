import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../lib/api";
import type { Modulo } from "../types";

import { configuracoesModulos } from "../data/modulos.ts";
import Visualizador3D from "../components/Visualizador3D";

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

    const configuracao = codigo
        ? configuracoesModulos[codigo]
        : undefined;
    if (!configuracao) {
        return <p>Módulo não encontrado.</p>;
    }

    return (
        <main>
            <Visualizador3D
                modelo={configuracao.modelo3D}
                escala={configuracao.escala}
                camerapos={configuracao.camera.camerapos}
                origem={configuracao.camera.origem}
            />

            <h1>{modulo.titulo}</h1>
            <p>{modulo.descricao}</p>
        </main>
    );
}