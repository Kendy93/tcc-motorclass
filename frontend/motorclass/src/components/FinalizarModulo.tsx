import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import type { Modulo } from "../types";
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

    const navigate = useNavigate();

    //verificando se o usuário está logado
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

    const indiceAtual = modulos.findIndex((modulo) => modulo.codigo === moduloAtual);

    const moduloSeguinte = indiceAtual >= 0 && indiceAtual < modulos.length - 1
        ? modulos[indiceAtual + 1]
        : null;

    const finalizar = async () => {
        if (!autenticado) { 
            setError("Você precisa estar logado para salvar seu progresso.");
            return; 
        }
        setLoading(true);
        setError("");
        try {
            await api.post(
                `/api/modulos/${moduloAtual}/concluir`
            );
            if (moduloSeguinte) {
                navigate(`/modulos/${moduloSeguinte.codigo}`);
            } else {
                navigate("/modulos");
            }
        } catch (error) {
            console.error("Erro ao concluir módulo:", error);
            setError("Não foi possível concluir o módulo.");
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
                disabled={loading}
                className="px-6 py-3 w-full"
            >
                {loading
                    ? "Finalizando..."
                    : moduloSeguinte
                        ? "Finalizar módulo e continuar"
                        : "Finalizar módulo"}
            </Botao>
        </div>
    );
}