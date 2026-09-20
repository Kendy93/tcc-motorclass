import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import Botao from "../components/Botao";

import type { User, Modulo } from "../types";

export default function Perfil() {
    const [usuario, setUsuario] = useState<User | null>(null);
    const [modulos, setModulos] = useState<Modulo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const [usuarioResponse, modulosResponse] = await Promise.all([
                    api.get("/api/user"),
                    api.get("/api/modulos"),
                ]);
                setUsuario(usuarioResponse.data);
                setModulos(modulosResponse.data);
            
            } catch (error: any) {
                console.error("Erro ao carregar perfil:", error);
                if (error.response?.status === 401) {
                    navigate("/login");
                    return;
                }
                setError("Não foi possível carregar os dados do perfil.");
            } finally {
                setLoading(false);
            }
        };
        carregarDados();
    }, [navigate]);

    const modulosConcluidos = modulos.filter(
        (modulo) => modulo.concluido
    ).length;
    const totalModulos = modulos.length;
    const porcentagem =
        totalModulos > 0
            ? Math.round((modulosConcluidos / totalModulos) * 100)
            : 0;

    const sair = async () => {
        try {
            await api.post("/logout");
            navigate("/login");
        } catch (error) {
            console.error("Erro ao sair:", error);
            setError("Não foi possível sair da conta.");
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    if (!usuario) {
        return null;
    }

    return (
        <main>
            <h1>Perfil</h1>

            <section>
                <h2>Dados da conta</h2>
                <p>
                    <strong>Nome:</strong> {usuario.name}
                </p>
                <p>
                    <strong>E-mail:</strong> {usuario.email}
                </p>
            </section>

            <section>
                <h2>Progresso</h2>
                <p>
                    {modulosConcluidos} de {totalModulos} módulos
                    concluídos
                </p>
                <p>
                    {porcentagem}% concluído
                </p>
            </section>

            <section>
                <Botao onClick={sair} className="px-4 py-2">
                    Sair da conta
                </Botao>
            </section>
        </main>
    );
}
