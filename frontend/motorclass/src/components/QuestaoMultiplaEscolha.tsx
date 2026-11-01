//import { useEffect } from "react";
import { useQuestionario } from "./Questionario";

import { tocarSomSelecao } from "../utils/efeitosSonoros";

interface Alternativa {
    id: string;
    texto: string;
}

interface QuestaoMultiplaEscolhaProps {
    id: string;
    ordem: number;
    pergunta: string;
    alternativas: Alternativa[];
}

//===========================================================================

export default function QuestaoMultiplaEscolha({
    id,
    pergunta,
    ordem,
    alternativas,
}: QuestaoMultiplaEscolhaProps) {
    const {
        registrarResposta,
        respostas,
        enviado,
    } = useQuestionario();

    const respostaSelecionada = typeof respostas[id] === "string"
        ? respostas[id]
        : undefined;

    const selecionarResposta = (
        alternativaId: string,
    ) => {
        if (enviado) {
            return;
        }
        registrarResposta(
            id,
            alternativaId,
        );
    };

//-------------------------------------------------------

    return (
        <section className="border-b border-gray-200 pb-4 last:border-b-0">
            <p className="leading-relaxed text-gray-900">
                <span className="font-bold text-blue1 mx-2">
                    {ordem}.
                </span>
                {pergunta}
            </p>

            <div className="space-y-2">
                {alternativas.map(
                    (alternativa) => {
                        const selecionada = respostaSelecionada === alternativa.id;
                        return (
                            <label
                                key={alternativa.id}
                                className={`
                                    flex
                                    cursor-pointer
                                    items-start
                                    gap-3
                                    rounded-lg
                                    border
                                    p-4
                                    transition
                                    ${
                                        selecionada
                                            ? "border-blue1 bg-blue1/10"
                                            : "border-gray-200 bg-white hover:bg-gray-50"
                                    }
                                    ${
                                        enviado
                                            ? "cursor-default"
                                            : ""
                                    }
                                `}
                            >
                                <input
                                    type="radio"
                                    name={`questao-${id}`}
                                    value={alternativa.id}
                                    checked={selecionada}
                                    disabled={enviado}
                                    onChange={() => {
                                        selecionarResposta(alternativa.id);
                                        tocarSomSelecao();
                                    }}
                                    className="mt-1 h-4 w-4"
                                />
                                <span className="text-sm leading-relaxed">
                                    {alternativa.texto}
                                </span>
                            </label>
                        );
                    },
                )}
            </div>
        </section>
    );
}