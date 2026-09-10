import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../lib/api";
import type { Modulo } from "../types";

import { configuracoesModulos } from "../data/modulos.ts";
import Visualizador3D from "../components/Visualizador3D";
import MenuSecoes from "../components/navigation/MenuSecoes.tsx";
import MenuSecoesMobile from "../components/navigation/MenuSecoesMobile.tsx";

export default function Modulo() {
    const { codigo } = useParams();
    const [modulo, setModulo] = useState<Modulo | null>(null);

    //para pegar qual o módulo a carregar
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

    //pega as configurações com base no módulo
    const configuracao = codigo
        ? configuracoesModulos[codigo]
        : undefined;
    if (!configuracao) {
        return <p>Módulo não encontrado.</p>;
    }
    const Conteudo = configuracao.conteudo;

    return (
        <main>
            <Visualizador3D
                modelo={configuracao.modelo3D}
                escala={configuracao.escala}
                camerapos={configuracao.camera.camerapos}
                origem={configuracao.camera.origem}
            />


            <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 px-6 lg:grid-cols-[220px_minmax(0,1fr)_220px]">

                <aside>
                    {/*<MenuModulos />*/}
                    <p>Texto temporário</p>
                </aside>

                <article className="prose max-w-3xl justify-self-center text-left [&_p]:indent-3 [&_p]:!mb-5">
                    <Conteudo />
                </article>

                <aside className="hidden py-15 px-5 xl:block">
                    <MenuSecoes
                        secoes={configuracao.secoes}
                    />
                </aside>

            </div>

            <MenuSecoesMobile
                secoes={configuracao.secoes}
            />

        </main>
    );
}