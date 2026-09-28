import { useState } from "react";
import type { Alternativa } from "../types";
import Botao from "./Botao";

export interface QuestaoMultiplaEscolhaProps {
    pergunta: string;
    alternativas: Alternativa[];
    explicacao?: string;
}

//===========================================================================

export default function QuestaoMultiplaEscolha({
    pergunta,
    alternativas,
    explicacao,
}: QuestaoMultiplaEscolhaProps) {
    const [selecionada, setSelecionada] = useState<number | null>(null);
    const [respondida, setRespondida] = useState(false);

    const responder = () => {
        if (selecionada === null) return;
        setRespondida(true);
    };
    const selecionarAlternativa = (index: number) => {
        setSelecionada(index);
        setRespondida(false);
    };
    const correta =
        selecionada !== null &&
        alternativas[selecionada].correta;

    return (
        <div className="my-10 rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-semibold text-blue3">
                {pergunta}
            </h3>

            <div className="space-y-3">
                {alternativas.map((alternativa, index) => {
                    const selecionadaAtual =
                        index === selecionada;

                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => selecionarAlternativa(index)}
                            className={`
                                w-full
                                rounded-lg
                                border
                                px-4 py-3
                                text-left
                                transition
                                ${
                                    selecionadaAtual
                                        ? "border-gray-900 bg-gray-50"
                                        : "border-gray-200 hover:bg-gray-50"
                                }
                            `}
                        >
                            {alternativa.texto}
                        </button>
                    );
                })}
            </div>

            {!respondida && (
                <Botao
                    type="button"
                    onClick={responder}
                    disabled={selecionada === null}
                    className="mt-6 px-4 py-2 text-sm"
                >
                    Responder
                </Botao>
            )}

            {respondida && (
                <div
                    className={`
                        mt-6
                        rounded-lg
                        p-4
                        ${
                            correta
                                ? "bg-green-50"
                                : "bg-red-50"
                        }
                    `}
                >
                    <p className="font-semibold">
                        {correta ? " ✓ Correto!" : "✗ Errado..."}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed">
                        {explicacao}
                    </p>
                </div>
            )}
        </div>
    );
}