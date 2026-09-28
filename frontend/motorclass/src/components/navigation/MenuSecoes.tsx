import { useEffect, useState } from "react";
import type { Secao, NivelSecao } from "../../types";

interface MenuSecoesProps {
    secoes: Secao[];
}

//===========================================================================

export default function MenuSecoes({ secoes }: MenuSecoesProps) {
    const [secaoAtiva, setSecaoAtiva] = useState(secoes[0]?.id);

    function irParaSecao(id: string) {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
        setSecaoAtiva(id);
    }

    //para formatar de acordo com o nível
    const indentacao: Record<NivelSecao, string> = {
        1: "pl-2",
        2: "pl-5",
        3: "pl-8",
        4: "pl-11",
    };

    //observa a seção atual e atualiza o menu
    useEffect(() => {
        const elementos = secoes
            .map((secao) => document.getElementById(secao.id))
            .filter((elemento): elemento is HTMLElement => elemento !== null);
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setSecaoAtiva(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-20% 0px -70% 0px",
            }
        );

        elementos.forEach((elemento) => observer.observe(elemento));
        return () => {
            observer.disconnect();
        };
    }, [secoes]);

    return (
        <aside className="sticky top-8">
            <p className="!text-blue1 py-3 text-left">
                Neste módulo
            </p>

            <nav>
                {secoes.map((secao) => {
                    const ativa = secao.id === secaoAtiva;

                    return (
                        <button
                            key={secao.id}
                            onClick={() => irParaSecao(secao.id)}
                            className={`
                                relative
                                block w-full
                                border-l-2
                                py-1
                                text-left text-sm
                                transition-colors
                                ${indentacao[secao.nivel]}
                                ${
                                    ativa
                                        ? "border-blue2 text-black"
                                        : "border-gray-300 text-gray-500 hover:text-blue1"
                                }
                            `}
                        >
                            {secao.titulo}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}