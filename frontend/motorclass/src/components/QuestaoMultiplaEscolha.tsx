import { useEffect } from "react";
import { useQuestionario } from "./Questionario";

interface Alternativa {
    id: string;
    texto: string;
}

interface QuestaoMultiplaEscolhaProps {
    id: string;
    pergunta: string;
    alternativas: Alternativa[];
    respostaCorreta: string;
    explicacao: string;
}

//===========================================================================

export default function QuestaoMultiplaEscolha({
    id,
    pergunta,
    alternativas,
    respostaCorreta,
    explicacao,
}: QuestaoMultiplaEscolhaProps) {
    const {
        registrarQuestao,
        removerQuestao,
        registrarResposta,
        respostas,
        enviado,
    } = useQuestionario();

    //registra no questionário
    useEffect(() => {
        registrarQuestao({
            id,
            tipo: "multipla-escolha",
            pergunta,
            explicacao,
            respostaCorreta,
            opcoes: Object.fromEntries(
                alternativas.map((alternativa) => [
                    alternativa.id,
                    alternativa.texto,
                ]),
            ),
        });
        return () => {
            removerQuestao(id);
        };
    }, [
        id,
        respostaCorreta,
        registrarQuestao,
        removerQuestao,
    ]);

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
                                    onChange={() =>
                                        selecionarResposta(
                                            alternativa.id,
                                        )
                                    }
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