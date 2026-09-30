import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import type { Modulo } from "../types";
import { recompensasPorModulo } from "../data/recompensas";
import Botao from "./Botao";

interface FinalizarModuloProps {
    moduloAtual: string;
    modulos: Modulo[];
}

//===========================================================================

export default function FinalizarModulo({
    moduloAtual,
    modulos,
}: FinalizarModuloProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [autenticado, setAutenticado] = useState(false);
    const [verificandoUsuario, setVerificandoUsuario] = useState(true);

    const [concluido, setConcluido] = useState(false);
    const [toast, setToast] = useState<string | null>(null);
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
    const mostrarToast = (mensagem: string) => {
        setToast(mensagem);
        if (toastTimer.current) {
            clearTimeout(toastTimer.current);
        }
        toastTimer.current = setTimeout(() => {
            setToast(null);
        }, 1800);
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
            //exibe a recompensa no toast
            if (!estavaConcluido && novoEstado) {
                const recompensa =
                    recompensasPorModulo[moduloAtual];

                if (recompensa) {
                    mostrarToast(
                        `Módulo concluído! Você desbloqueou: ${recompensa.nome}.`
                    );
                } else {
                    mostrarToast("Módulo concluído!");
                }
                //deixa um tempo para o toast antes de seguir para o próx módulo
                await new Promise((resolve) =>
                    setTimeout(resolve, 1800)
                );

                if (moduloSeguinte) {
                    navigate(`/modulos/${moduloSeguinte.codigo}`);
                } else {
                    navigate("/modulos");
                }
                return;
            }
            //remove a conclusão
            if (estavaConcluido && !novoEstado) {
                mostrarToast(
                    "A conclusão do módulo foi removida."
                );
            }
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
                        max-w-sm
                        rounded-lg
                        border
                        border-gray-200
                        bg-white
                        px-5
                        py-4
                        text-left
                        shadow-lg
                    "
                >
                    <p className="text-sm">
                        {toast}
                    </p>
                </div>
            )}
        </div>
    );
}