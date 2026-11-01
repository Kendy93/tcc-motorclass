import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    useEffect,
} from "react";
import Botao from "./Botao";
import type { 
    RespostaQuestionario, 
    QuestaoRegistrada, 
    TentativaQuestionario, 
    ResultadoQuestionario,
    QuestaoPublica, 
    ConfiguracaoModelo3D,
    BlocoQuestionario,
} from "../types";

import QuestaoMultiplaEscolha from "./QuestaoMultiplaEscolha";
import Identificacao3D from "./3d/Identificacao3D";
//import { api } from "../lib/api";
import { tocarSomEnvio } from "../utils/efeitosSonoros";

//===========================================================================

interface QuestionarioContexto {
    registrarQuestao?: (questao: QuestaoRegistrada) => void;
    removerQuestao?: (questaoId: string) => void;
    registrarResposta: (questaoId: string, resposta: RespostaQuestionario) => void;
    respostas: Record<string, RespostaQuestionario>;
    questoes?: QuestaoRegistrada[];
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

// function respostasIguais(
//     primeira: RespostaQuestionario,
//     segunda: RespostaQuestionario,
// ): boolean {
//     if (Array.isArray(primeira) && Array.isArray(segunda)) {
//         if (primeira.length !== segunda.length) {
//             return false;
//         }
//         const a = [...primeira].sort();
//         const b = [...segunda].sort();
//         return a.every(
//             (valor, indice) =>
//                 valor === b[indice],
//         );
//     }

//     return primeira === segunda;
// }

// function transformarRespostaEmTexto(
//     resposta: RespostaQuestionario,
//     opcoes?: Record<string, string>,
// ): string {
//     const respostas = Array.isArray(resposta)
//         ? resposta
//         : [resposta];
//     const textos = respostas.map(
//         (valor) => opcoes?.[valor] ?? valor,
//     );
//     return textos.join(", ");
// }

//-------------------------------------------------------

interface QuestionarioProps {
    id: string;
    titulo?: string;
    questoes: QuestaoPublica[];
    modelos3D: Record<string, ConfiguracaoModelo3D>;
    resultadoInicial?: ResultadoQuestionario | null;
    onEnviar: (
        tentativa: TentativaQuestionario,
    ) => Promise<ResultadoQuestionario>;
}

//===========================================================================

export default function Questionario({
    id,
    titulo,
    questoes,
    modelos3D,
    resultadoInicial = null,
    onEnviar,
}: QuestionarioProps) {
    const [respostas, setRespostas] = useState<Record<string, RespostaQuestionario>>({});
    const [enviado, setEnviado] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const [resultado, setResultado] = useState<ResultadoQuestionario | null>(null);

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
            (questao) => respostas[questao.codigo] !== undefined,
        );
    }, [questoes, respostas]);


    const enviar = useCallback(async () => {
        tocarSomEnvio();
        if (!completo || enviado || enviando) {
            return;
        }
        try {
            setEnviando(true);
            const tentativa: TentativaQuestionario = {
                questionarioId: id,
                respostas,
            };
            const novoResultado = await onEnviar(tentativa);
            setResultado(novoResultado);
            setEnviado(true);
        } catch (erro) {
            console.error("Erro ao enviar questionário:", erro);
        } finally {
            setEnviando(false);
        }
    }, [
        id,
        completo,
        enviado,
        enviando,
        respostas,
        onEnviar,
    ]);

    const reiniciar = useCallback(() => {
        setRespostas({});
        setResultado(null);
        setEnviado(false);
    }, []);

    const quantidadeRespondida =
        questoes.filter(
            (questao) =>
                respostas[
                    questao.codigo
                ] !== undefined,
        ).length;

    //preenche se já tiver resposta anterior
    useEffect(() => {
        if (!resultadoInicial) {
            return;
        }
        setResultado(resultadoInicial);
        setEnviado(true);
    }, [resultadoInicial]);

    const blocos = useMemo<BlocoQuestionario[]>(() => {
        const resultado: BlocoQuestionario[] = [];
        for (const questao of questoes) {
            //questões 3D no mesmo grupo
            if (questao.tipo === "identificacao-3d") {
                const grupo =
                    questao.grupo_3d ??
                    questao.codigo;
                const ultimo = resultado[resultado.length - 1];
                if (ultimo?.tipo === "identificacao-3d" && ultimo.grupo3D === grupo) {
                    ultimo.perguntas3D?.push(questao);
                    continue;
                }
                resultado.push({
                    tipo: "identificacao-3d",
                    modelo3D: questao.modelo_3d ?? "",
                    grupo3D: grupo,
                    perguntas3D: [questao],
                });
                continue;
            }

            resultado.push({tipo: "multipla-escolha", questao});
        }
        return resultado;
    }, [questoes]);

    const contexto = useMemo(
        () => ({
            registrarResposta,
            respostas,
            enviado,
            enviando,
            completo,
            resultado,
            enviar,
            reiniciar,
        }),
        [
            registrarResposta,
            respostas,
            enviado,
            enviando,
            completo,
            resultado,
            enviar,
            reiniciar,
        ],
    );

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

                {/* pergunta */}
                <div className="space-y-8 px-6 py-8">
                    {blocos.map((bloco) => {
                        if (bloco.tipo === "multipla-escolha") {
                            const questao = bloco.questao!;

                            return (
                                <QuestaoMultiplaEscolha
                                    key={questao.codigo}
                                    id={questao.codigo}
                                    ordem={questao.ordem}
                                    pergunta={questao.pergunta}
                                    alternativas={Object.entries(questao.opcoes ?? {}).map(
                                        ([id, texto]) => ({
                                            id,
                                            texto,
                                        }),
                                    )}
                                />
                            );
                        }
                        const configuracao = modelos3D[bloco.modelo3D!];
                        if (!configuracao) {
                            return (
                                <p
                                    key={bloco.grupo3D}
                                    className="text-red-600"
                                >
                                    Modelo 3D "{bloco.modelo3D}" não encontrado.
                                </p>
                            );
                        }

                        return (
                            <Identificacao3D
                                key={bloco.grupo3D}
                                id={bloco.grupo3D!}
                                configuracao={configuracao}
                                perguntas={bloco.perguntas3D!.map(
                                    (questao) => ({
                                        codigo: questao.codigo,
                                        pergunta: questao.pergunta,
                                        destaque: questao.destaque,
                                    }),
                                )}
                            />
                        );
                    })}
                </div>

                {/* resultado */}
                {enviado && resultado && (
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
                                                    <p className="text-xs font-medium uppercase tracking-wide !text-blue1">
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