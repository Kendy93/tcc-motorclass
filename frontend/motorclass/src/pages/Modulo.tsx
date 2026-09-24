import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../lib/api";
import type { Modulo } from "../types";

import { configuracoesModulos } from "../data/modulos.ts";
import Visualizador3D from "../components/3d/Visualizador3D.tsx";
import MenuSecoes from "../components/navigation/MenuSecoes.tsx";
import MenuSecoesMobile from "../components/navigation/MenuSecoesMobile.tsx";
import MenuModulos from "../components/navigation/MenuModulos.tsx";
import MenuModulosMobile from "../components/navigation/MenuModulosMobile.tsx";
import NavegacaoModulos from "../components/navigation/NavegacaoModulos.tsx";
import FinalizarModulo from "../components/FinalizarModulo.tsx";
import type { ConfiguracaoModulo } from "../types";

import AnimacaoVideo from "../components/AnimacaoVideo";
import { BordaImagem } from "../components/BordaImagem.tsx";
import Problema from "../components/Problema.tsx";
import QuestaoMultiplaEscolha from "../components/QuestaoMultiplaEscolha.tsx";

export default function Modulo() {
    const { codigo } = useParams();
    const [modulo, setModulo] = useState<Modulo | null>(null);
    const [modulos, setModulos] = useState<Modulo[]>([]);

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

    //pegando todos os módulos do banco
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

    //wrapper para funcionar dentro do MDX
    interface Visualizador3DMDXProps {
        nome: string;
    }
    function Visualizador3DMDX({
        nome,
    }: Visualizador3DMDXProps) {
        const modelo = configuracao.modelos3D[nome];

        if (!modelo) {
            console.warn(
                `Modelo 3D "${nome}" não encontrado no módulo "${codigo}".`
            );

            return (
                <p>
                    Modelo 3D "{nome}" não encontrado.
                </p>
            );
        }

        return (
            <Visualizador3D configuracao={modelo} />
        );
    }

    return (
        <main>
            <Visualizador3D
                configuracao={configuracao.modelos3D.principal}
            />

            <NavegacaoModulos
                modulos={modulos}
                moduloAtual={codigo!}
            />

            <div className="
                mx-auto 
                grid max-w-[1700px] 
                grid-cols-1 
                gap-8 
                px-6 
                xl:grid-cols-[260px_minmax(0,1fr)_260px]
            ">

                <aside className="hidden py-15 px-5 xl:flex justify-center">
                    <MenuModulos 
                        modulos={modulos}
                        moduloAtual={codigo!}
                    />
                </aside>

                <article className="prose max-w-4xl justify-self-center text-left [&_p]:indent-3 [&_p]:!mb-5">
                    <Conteudo
                        components={{
                            AnimacaoVideo,
                            BordaImagem,
                            Problema,
                            QuestaoMultiplaEscolha,
                            Visualizador3D: Visualizador3DMDX,
                        }}
                    />

                    <FinalizarModulo
                        moduloAtual={codigo!}
                        modulos={modulos}
                    />

                </article>

                <aside className="hidden py-15 px-5 xl:block">
                    <MenuSecoes
                        secoes={configuracao.secoes}
                    />
                </aside>

            </div>

            <MenuModulosMobile 
                modulos={modulos}
                moduloAtual={codigo!}
            />
            <MenuSecoesMobile
                secoes={configuracao.secoes}
            />

        </main>
    );
}