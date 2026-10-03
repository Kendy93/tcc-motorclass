import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import Botao from "./Botao";
import type { TipoQuestao, RespostaQuestionario, QuestaoRegistrada, TentativaQuestionario, ResultadoQuestao, ResultadoQuestionario } from "../types";

//===========================================================================

interface QuestionarioContexto {
    registrarQuestao: (questao: QuestaoRegistrada) => void;
    removerQuestao: (questaoId: string) => void;
    registrarResposta: (questaoId: string, resposta: RespostaQuestionario) => void;
    respostas: Record<string, RespostaQuestionario>;
    questoes: QuestaoRegistrada[];
    enviado: boolean;
    enviando: boolean;
    completo: boolean;
    resultado: ResultadoQuestionario | null;
    enviar: () => Promise<void>;
    reiniciar: () => void;
}
const ContextoQuestionario = createContext<QuestionarioContexto | null>(null);

export function useQuestionario() {
    const contexto = useContext(ContextoQuestionario);
    if (!contexto) {
        throw new Error("useQuestionario deve ser usado dentro de um <Questionario>.");
    }
    return contexto;
}

//-------------------------------------------------------

function respostasIguais(
    primeira: RespostaQuestionario,
    segunda: RespostaQuestionario,
): boolean {
    if (Array.isArray(primeira) && Array.isArray(segunda)) {
        if (primeira.length !== segunda.length) {
            return false;
        }
        const a = [...primeira].sort();
        const b = [...segunda].sort();
        return a.every(
            (valor, indice) =>
                valor === b[indice],
        );
    }

    return primeira === segunda;
}

function transformarRespostaEmTexto(
    resposta: RespostaQuestionario,
    opcoes?: Record<string, string>,
): string {
    const respostas = Array.isArray(resposta)
        ? resposta
        : [resposta];
    const textos = respostas.map(
        (valor) => opcoes?.[valor] ?? valor,
    );
    return textos.join(", ");
}

//-------------------------------------------------------

interface QuestionarioProps {
    id: string;
    titulo?: string;
    children: ReactNode;
    onEnviar?: (
        tentativa: TentativaQuestionario,
    ) => void | Promise<void>;
}

//===========================================================================

export default function Questionario({
    id,
    titulo,
    children,
    onEnviar,
}: QuestionarioProps) {
    const [questoes, setQuestoes] = useState<QuestaoRegistrada[]>([]);
    const [respostas, setRespostas] = useState<Record<string, RespostaQuestionario>>({});
    const [enviado, setEnviado] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const [resultado, setResultado] = useState<ResultadoQuestionario | null>(null);

    const registrarQuestao = useCallback(
        (questao: QuestaoRegistrada) => {
            setQuestoes((atual) => {
                const existente = atual.find((item) => item.id === questao.id);
                if (existente) {
                    return atual;
                }
                return [
                    ...atual,
                    questao,
                ];
            });
        },
        [],
    );

    const removerQuestao = useCallback(
        (questaoId: string) => {
            setQuestoes((atual) =>
                atual.filter((questao) => questao.id !== questaoId),
            );
            setRespostas((atual) => {
                const nova = {...atual};
                delete nova[questaoId];
                return nova;
            });
        },
        [],
    );

    const registrarResposta = useCallback(
        (
            questaoId: string,
            resposta: RespostaQuestionario,
        ) => {
            if (enviado) {
                return;
            }
            setRespostas((atual) => ({
                ...atual,
                [questaoId]: resposta,
            }));
        },
        [enviado],
    );

    const completo = useMemo(() => {
        if (questoes.length === 0) {
            return false;
        }
        return questoes.every(
            (questao) =>
                respostas[questao.id] !== undefined,
        );
    }, [questoes, respostas]);

    const corrigir = useCallback(() => {
        const resultados = questoes.map((questao) => {
            const resposta = respostas[questao.id];
            const respostaCorreta =questao.respostaCorreta;

            const correta =
                respostaCorreta !== undefined &&
                resposta !== undefined &&
                respostasIguais(
                    resposta,
                    respostaCorreta,
                );

            return {
                id: questao.id,
                tipo: questao.tipo,
                pergunta: questao.pergunta,
                explicacao: questao.explicacao,
                resposta,
                respostaCorreta,
                correta,
                respostaTexto:
                    resposta !== undefined
                        ? transformarRespostaEmTexto(
                            resposta,
                            questao.opcoes,
                        )
                        : undefined,
                respostaCorretaTexto:
                    respostaCorreta !== undefined
                        ? transformarRespostaEmTexto(
                            respostaCorreta,
                            questao.opcoes,
                        )
                        : undefined,
            };
        });

        const total = resultados.length;
        const acertos = resultados.filter((questao) => questao.correta).length;
        const erros = total - acertos;
        const percentual = total > 0 ? Math.round((acertos / total) * 100) : 0;
        const nota = Number(((acertos / total) * 10).toFixed(1));
        return {
            total,
            acertos,
            erros,
            percentual,
            nota,
            questoes: resultados,
        };
    }, [questoes, respostas]);

    const enviar = useCallback(
        async () => {
            if (!completo || enviado || enviando) {
                return;
            }
            try {
                setEnviando(true);
                const novoResultado = corrigir();
                const tentativa: TentativaQuestionario = {
                    questionarioId: id,
                    questoes,
                    respostas,
                    resultado: novoResultado,
                };

                if (onEnviar) {
                    await onEnviar(tentativa);
                }
                setResultado(novoResultado);
                setEnviado(true);
            } catch (erro) {
                console.error(
                    "Erro ao enviar questionário:",
                    erro,
                );
            } finally {
                setEnviando(false);
            }
        },
        [
            completo,
            enviado,
            enviando,
            corrigir,
            questoes,
            respostas,
            onEnviar,
        ],
    );

    const reiniciar = useCallback(() => {
        setRespostas({});
        setResultado(null);
        setEnviado(false);
    }, []);

    const contexto = useMemo(
        () => ({
            registrarQuestao,
            removerQuestao,
            registrarResposta,
            respostas,
            questoes,
            enviado,
            enviando,
            completo,
            resultado,
            enviar,
            reiniciar,
        }),
        [
            registrarQuestao,
            removerQuestao,
            registrarResposta,
            respostas,
            questoes,
            enviado,
            enviando,
            completo,
            resultado,
            enviar,
            reiniciar,
        ],
    );

    const quantidadeRespondida =
        questoes.filter(
            (questao) =>
                respostas[
                    questao.id
                ] !== undefined,
        ).length;

//-------------------------------------------------------

    return (
        <ContextoQuestionario.Provider
            value={contexto}
        >
            <section className="my-10 rounded-xl border border-gray-200 bg-white shadow-sm">
                <header className="border-b border-gray-200 px-6 py-5 text-left">
                    <h2 className="text-xl font-semibold !text-blue3">
                        {titulo ?? "Questionário"}
                    </h2>
                    <p className="mt-1 text-sm !text-gray-500">
                        Responda todas as questões antes de enviar.
                    </p>
                </header>

                <div className="space-y-8 px-6 py-8">
                    {children}
                </div>

                {/* resultado */}
                {enviado &&
                    resultado && (
                        <section className="border-t border-gray-200 px-6 py-8 text-left">
                            <div className="rounded-xl bg-gray-50 p-6">
                                <p className="text-xs font-medium uppercase tracking-wide !text-blue1">
                                    Resultado
                                </p>
                                <h3 className="text-2xl font-bold">
                                    Nota:{" "}{resultado.nota}{" "}/ 10
                                </h3>
                                <p className="mt-2 text-sm">
                                    {resultado.acertos}{" "} de{" "} {resultado.total}{" "} questões corretas.
                                </p>

                                <p className="mt-1 text-sm">
                                    Você errou{" "}
                                    {
                                        resultado.erros
                                    }{" "}
                                    quest
                                    {resultado.erros !==
                                    1
                                        ? "ões"
                                        : "ão"}{" "}
                                    ({100 -
                                        resultado.percentual}
                                    %).
                                </p>
                            </div>

                            {/* correção */}
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold !text-blue3">
                                    Correção
                                </h3>
                                <div className="mt-2 space-y-4">
                                    {resultado.questoes.map(
                                        (questao, indice) => (
                                            <div
                                                key={
                                                    questao.id
                                                }
                                                className={`
                                                    rounded-lg
                                                    border
                                                    px-5
                                                    pt-4
                                                    ${
                                                        questao.correta
                                                            ? "border-green-200 bg-green-50"
                                                            : "border-red-200 bg-red-50"
                                                    }
                                                `}
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <p className="text-xs font-medium uppercase tracking-wide !text-gray-500">
                                                            Questão{" "}{indice + 1}
                                                        </p>
                                                        <p className="font-medium">
                                                            {questao.pergunta}
                                                        </p>
                                                    </div>
                                                    <span
                                                        className={`text-sm font-semibold ${
                                                            questao.correta
                                                                ? "text-green-700"
                                                                : "text-red-700"
                                                        }`}
                                                    >
                                                        {questao.correta
                                                            ? "✓ Correta"
                                                            : "✗ Incorreta"}
                                                    </span>
                                                </div>

                                                <div className="space-y-2 text-sm">
                                                    <p>
                                                        <span className="font-medium">
                                                            Sua resposta:
                                                        </span>{" "}
                                                        {questao.respostaTexto}
                                                    </p>

                                                    {!questao.correta && questao.tipo === "multipla-escolha" && (
                                                        <p>
                                                            <span className="font-medium">
                                                                Resposta correta:
                                                            </span>{" "}
                                                            {questao.respostaCorretaTexto}
                                                        </p>
                                                    )}
                                                    {questao.explicacao && (
                                                        <div className="mt-3 border-t border-gray-200 pt-3">
                                                            <p className="text-sm">
                                                                <span className="font-medium">
                                                                    Explicação:
                                                                </span>{" "}
                                                                {questao.explicacao}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        </section>
                    )}

                {/* rodapé */}
                <footer className="border-t border-gray-200 px-6 py-5">
                    {!enviado ? (
                        <div>
                            <div className="mb-4 flex items-center justify-between">
                                <span className="text-sm !text-gray-500">
                                    {
                                        quantidadeRespondida
                                    }{" "}
                                    de{" "}
                                    {questoes.length}{" "}
                                    questões respondidas
                                </span>
                            </div>
                            <Botao
                                onClick={enviar}
                                disabled={
                                    !completo ||
                                    enviando
                                }
                                className="w-full px-6 py-3"
                            >
                                {enviando
                                    ? "Corrigindo..."
                                    : "Enviar questionário"}
                            </Botao>
                        </div>
                    ) : (
                        <Botao
                            onClick={reiniciar}
                            className="w-full px-6 py-3"
                        >
                            Refazer teste
                        </Botao>
                    )}
                </footer>
            </section>
        </ContextoQuestionario.Provider>
    );
}