import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import type { Modulo } from "../types";
import { recompensasPorModulo } from "../data/recompensas";
import Botao from "./Botao";
import { CheckCircle2, Trophy } from "lucide-react";
import ModeloGamificacao from "./3d/ModeloGamificacao";

interface FinalizarModuloProps {
    moduloAtual: string;
    modulos: Modulo[];
    onProgressoAtualizado: () => Promise<void>;
}

interface RecompensaGaragem {
    codigo: string;
    nome: string;
    objeto: string;
    desbloqueada: boolean;
    equipada: boolean;
    modulo: string;
}

//===========================================================================

export default function FinalizarModulo({
    moduloAtual,
    modulos,
    onProgressoAtualizado,
}: FinalizarModuloProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [autenticado, setAutenticado] = useState(false);
    const [verificandoUsuario, setVerificandoUsuario] = useState(true);
    const [concluido, setConcluido] = useState(false);
    const [mostrarModalConclusao, setMostrarModalConclusao] = useState(false);
    const [codigosEquipadosFinal, setCodigosEquipadosFinal] = useState<string[]>([]);

    type ToastData = {
        tipo: "recompensa" | "sucesso";
        mensagem: string;
        recompensa?: string;
    };
    const [toast, setToast] = useState<ToastData | null>(null);
    const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const navigate = useNavigate();

//-------------------------------------------------------

    //verifica se o usuário está logado
    useEffect(() => {
        api.get("/api/user")
            .then(() => {
                setAutenticado(true);
            })
            .catch(() => {
                setAutenticado(false);
            })
            .finally(() => {
                setVerificandoUsuario(false);
            });
    }, []);

    //obtém o estado do módulo
    useEffect(() => {
        const modulo = modulos.find(
            (modulo) => modulo.codigo === moduloAtual
        );
        setConcluido(modulo?.concluido ?? false);
    }, [modulos, moduloAtual]);

    //faz a limpeza do timer do toast
    useEffect(() => {
        return () => {
            if (toastTimer.current) {
                clearTimeout(toastTimer.current);
            }
        };
    }, []);

//-------------------------------------------------------

    const indiceAtual = modulos.findIndex((modulo) => modulo.codigo === moduloAtual);
    const moduloSeguinte =
        indiceAtual >= 0 && indiceAtual < modulos.length - 1
            ? modulos[indiceAtual + 1]
            : null;
    const mostrarToast = (dados: ToastData) => {
        setToast(dados);
        if (toastTimer.current) {
            clearTimeout(toastTimer.current);
        }
        toastTimer.current = setTimeout(() => {
            setToast(null);
        }, 2000);
    };

    const finalizar = async () => {
        if (!autenticado) {
            setError(
                "Você precisa estar logado para salvar seu progresso."
            );
            return;
        }
        setLoading(true);
        setError("");
        try {
            const estavaConcluido = concluido;
            const resposta = await api.post(
                `/api/modulos/${moduloAtual}/alternar-conclusao`
            );
            const novoEstado = resposta.data.concluido;
            setConcluido(novoEstado);
            try {
                await onProgressoAtualizado();
            } catch (erroAtualizacao) {
                console.error(
                    "Erro ao atualizar a lista de módulos:",
                    erroAtualizacao
                );
            }
            //exibe a recompensa no toast
            if (!estavaConcluido && novoEstado) {
                // exibe a recompensa do módulo, se houver.
                const recompensa = recompensasPorModulo[moduloAtual];
                if (recompensa) {
                    mostrarToast({
                        tipo: "recompensa",
                        mensagem: "Uma nova peça está disponível para seu projeto:",
                        recompensa: recompensa.nome,
                    });
                } else {
                    mostrarToast({
                        tipo: "sucesso",
                        mensagem: "Seu progresso foi salvo. Continue aprendendo!",
                    });
                }

                // verifica se esta conclusão encerrou toda a jornada.
                const finalizouTodos = resposta.data.progresso?.finalizou_todos_agora === true;
                if (finalizouTodos) {
                    try {
                        const respostaGaragem = await api.get("/api/garagem");
                        const recompensas = respostaGaragem.data as RecompensaGaragem[];

                        const equipadas = recompensas
                            .filter((recompensa) => recompensa.equipada)
                            .map((recompensa) => recompensa.codigo);

                        setCodigosEquipadosFinal(equipadas);
                    } catch (erroGaragem) {
                        console.error(
                            "Não foi possível carregar as peças da garagem:",
                            erroGaragem
                        );
                    }

                    setMostrarModalConclusao(true);
                    return;
                }
                // se ainda houver módulos pendentes, mantém a navegação atual.
                await new Promise((resolve) =>
                    setTimeout(resolve, 2000)
                );

                if (moduloSeguinte) {
                    navigate(`/modulos/${moduloSeguinte.codigo}`);
                } else {
                    navigate("/modulos");
                }
                return;
            }
            // //remove a conclusão
            // if (estavaConcluido && !novoEstado) {
            //     mostrarToast(
            //         "A conclusão do módulo foi removida."
            //     );
            // }
        } catch (error) {
            console.error(
                "Erro ao atualizar conclusão do módulo:",
                error
            );
            setError(
                "Não foi possível atualizar o progresso do módulo."
            );
        } finally {
            setLoading(false);
        }
    };

//-------------------------------------------------------

    return (
        <div className="my-16 text-center">
            {error && (
                <p className="mb-4 text-sm text-red-600">
                    {error}
                </p>
            )}

            <Botao
                onClick={finalizar}
                disabled={
                    loading ||
                    verificandoUsuario ||
                    !autenticado
                }
                className={`w-full px-6 py-3 transition ${
                    concluido
                        ? "border border-blue3 bg-blue1 text-mainlight hover:bg-blue5"
                        : ""
                }`}
            >
                {verificandoUsuario
                    ? "Verificando..."
                    : loading
                        ? "Atualizando..."
                        : concluido
                            ? "✓ Módulo concluído"
                            : moduloSeguinte
                                ? "Finalizar módulo e continuar"
                                : "Finalizar módulo"}
            </Botao>

            {toast && (
                <div
                    className="
                        fixed
                        right-6
                        top-6
                        z-[100]
                        w-[360px]
                        overflow-hidden
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                        shadow-xl
                    "
                >
                    <div className="flex items-center gap-4 px-5 py-4">
                        <div
                            className={`
                                flex
                                h-12
                                w-12
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                ${
                                    toast.tipo === "recompensa"
                                        ? "bg-yellow-100"
                                        : "bg-green-100"
                                }
                            `}
                        >
                            {toast.tipo === "recompensa" ? (
                                <Trophy className="h-6 w-6 text-yellow-600" />
                            ) : (
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                            )}
                        </div>

                        <div className="min-w-0 text-left">
                            <p className="font-bold">
                                Módulo concluído!
                            </p>
                            <p className="text-sm !text-gray-600">
                                {toast.mensagem}
                            </p>
                            {toast.recompensa && (
                                <p className="mt-1 font-semibold !text-blue1">
                                    {toast.recompensa}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="h-1 bg-gray-100">
                        <div className="h-full w-full origin-left bg-blue1" />
                    </div>
                </div>
            )}

            {mostrarModalConclusao && (
                <div className="
                    fixed inset-0 z-[90]
                    flex items-center justify-center
                    overflow-y-auto
                    bg-black/70 p-4
                ">
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="titulo-conclusao"
                        className="
                            relative my-auto w-full max-w-5xl
                            rounded-2xl bg-white p-6 shadow-2xl
                            md:p-10
                        "
                    >
                        <button
                            type="button"
                            onClick={() => setMostrarModalConclusao(false)}
                            aria-label="Fechar modal de conclusão"
                            className="
                                absolute right-4 top-4
                                rounded-full px-3 py-2
                                text-gray-500 hover:bg-gray-100
                            "
                        >
                            ✕
                        </button>

                        <div className="
                            grid items-center gap-8
                            md:grid-cols-2
                        ">
                            <div>
                                <p className="
                                    mb-3 text-sm font-bold
                                    uppercase tracking-widest !text-blue3
                                ">
                                    Jornada concluída
                                </p>
                                <h2
                                    id="titulo-conclusao"
                                    className="
                                        mb-4 text-3xl font-bold
                                        !text-gray-900 md:text-4xl
                                    "
                                >
                                    Parabéns!
                                    Você concluiu o MOTORCLASS.
                                </h2>
                                <p className="mb-6 !text-gray-600">
                                    Você concluiu todos os módulos e conquistou
                                    novas peças para o seu carro. Sua garagem
                                    representa sua trajetória de aprendizado.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMostrarModalConclusao(false);
                                        navigate("/garagem");
                                    }}
                                    className="
                                        rounded-lg bg-blue3 px-5 py-3
                                        font-semibold text-white
                                        transition hover:opacity-90
                                    "
                                >
                                    Ver minha garagem
                                </button>
                            </div>

                            <div className="
                                h-[300px] w-full min-w-0
                                overflow-hidden rounded-xl bg-maindark
                                md:h-[380px]
                            ">
                                <ModeloGamificacao
                                    recompensasEquipadas={codigosEquipadosFinal}
                                    pos={[6, 1, 6]}
                                    origem={[0, -0.8, 0]}
                                />
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}