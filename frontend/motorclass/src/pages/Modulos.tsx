import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";

import type { User, Modulo } from "../types";
import { configuracoesModulos } from "../data/modulos";
import BotaoLink from "../components/BotaoLink";

//===========================================================================

export default function Modulos() {
    const [user, setUser] = useState<User | null>(null);
    const [modulos, setModulos] = useState<Modulo[]>([]);
    const [loading, setLoading] = useState(true);

    //carrega os modulos
    useEffect(() => {
        const carregarModulos = async () => {
            try {
                const response = await api.get("/api/modulos");
                setModulos(response.data);
            } catch (error) {
                console.error(
                    "Erro ao buscar módulos:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };
        carregarModulos();
    }, []);

    //tenta carregar o usuário
    useEffect(() => {
        const carregarUsuario = async () => {
            try {
                const response = await api.get("/api/user");
                setUser(
                    response.data.user ??
                    response.data
                );
            } catch (error: any) {
                if (error.response?.status !== 401) {
                    console.error(
                        "Erro ao buscar usuário:",
                        error
                    );
                }
                setUser(null);
            }
        };

        carregarUsuario();
    }, []);

    const modulosConcluidos = modulos.filter((modulo) => modulo.concluido).length;
    const totalModulos = modulos.length;
    const progresso =
        totalModulos > 0
            ? Math.round(
                  (modulosConcluidos /
                      totalModulos) *
                      100
              )
            : 0;

    if (loading) {
        return (
            <main>
                <div className="mx-auto max-w-7xl px-6 py-16">
                    <p className="text-gray-500">
                        Carregando módulos...
                    </p>
                </div>
            </main>
        );
    }

//-------------------------------------------------------

    return (
        <main>
            <div className="mx-auto max-w-7xl px-6 py-12">

                {/* cabeçalho */}
                <header className="flex flex-col items-center text-center">
                    <p className="pt-10 text-sm font-semibold uppercase tracking-widest !text-blue1">
                        Curso de mecânica automotiva
                    </p>
                    <h1 className="!my-10">
                        Módulos
                    </h1>
                    <p className="max-w-2xl leading-relaxed">
                        Aprenda como funcionam os principais sistemas de um automóvel e como seus componentes se relacionam.
                    </p>
                </header>

                {/* barra de progresso */}
                {user && (
                    <section className="mt-6 rounded-xl border border-gray-200 bg-blue2 p-6 shadow-sm">
                        <div className="flex items-end justify-between gap-4">
                            <div>
                                <p className="text-sm !text-mainlight">
                                    Seu progresso
                                </p>

                                <p className="mt-1 text-3xl font-bold !text-mainlight">
                                    {progresso}%
                                </p>
                            </div>

                            <p className="text-sm !text-mainlight">
                                {modulosConcluidos} de {totalModulos} módulos concluídos
                            </p>
                        </div>

                        <div className="mt-4 h-3 overflow-hidden rounded-full bg-mainlight">
                            <div
                                className="h-full rounded-full bg-blue5 transition-all"
                                style={{
                                    width: `${progresso}%`,
                                }}
                            />
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-4">
                            <p className="text-sm !text-mainlight">
                                Continue aprendendo para desbloquear novas peças para sua garagem.
                            </p>

                            <BotaoLink
                                to="/perfil"
                                variant="secondary"
                                className="shrink-0 px-4 py-2"
                            >
                                Ver garagem
                            </BotaoLink>
                        </div>
                    </section>
                )}

                {/* cards dos módulos */}
                <section className="mt-8">
                    <div className="mb-6">
                        {!user && (
                            <div className="rounded-xl border border-blue1/20 bg-blue1/5 px-5 py-4">
                                <p className="text-sm font-semibold !text-blue1">
                                    Crie sua garagem
                                </p>

                                <p className="mt-1 text-sm text-gray-600">
                                    Conclua módulos para desbloquear novas peças e personalize seu
                                    carro conforme você aprende.
                                </p>

                                <BotaoLink
                                    to="/cadastro"
                                    className="mt-3 px-4 py-2"
                                >
                                    Criar minha conta
                                </BotaoLink>
                            </div>
                        )}
                    </div>

                    {/* cards */}
                    <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {modulos.map((modulo) => {
                            //muda o card de acordo com o módulo estar pronto ou não
                            const disponivel = !!configuracoesModulos[modulo.codigo];
                            const conteudo = (
                                <div
                                    className={`
                                        h-full
                                        rounded-xl
                                        border
                                        p-6
                                        shadow-sm
                                        transition
                                        ${
                                            disponivel
                                                ? `
                                                    border-gray-200
                                                    bg-white
                                                    group
                                                    hover:-translate-y-1
                                                    hover:shadow-md
                                                    cursor-pointer
                                                `
                                                : `
                                                    border-gray-200
                                                    bg-gray-100
                                                    text-gray-400
                                                    cursor-not-allowed
                                                `
                                        }
                                    `}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div
                                            className={`
                                                flex
                                                h-9
                                                w-9
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-full
                                                border
                                                text-sm
                                                font-semibold
                                                ${
                                                    modulo.concluido && disponivel
                                                        ? `
                                                            border-blue3
                                                            bg-blue1
                                                            text-white
                                                        `
                                                        : `
                                                            border-gray-300
                                                            bg-gray-50
                                                            text-gray-500
                                                        `
                                                }
                                            `}
                                        >
                                            {modulo.concluido && disponivel
                                                ? "✓"
                                                : String(modulo.ordem).padStart(2, "0")}
                                        </div>

                                        <span
                                            className={`
                                                text-xs
                                                font-medium
                                                ${
                                                    disponivel
                                                        ? modulo.concluido
                                                            ? "text-blue1"
                                                            : "text-gray-400"
                                                        : "text-gray-400"
                                                }
                                            `}
                                        >
                                            {!disponivel
                                                ? "Em breve"
                                                : user
                                                    ? modulo.concluido
                                                        ? "Concluído"
                                                        : "Não iniciado"
                                                    : null}
                                        </span>
                                    </div>

                                    <h3
                                        className={`text-xl font-semibold
                                            ${
                                                disponivel
                                                    ? "text-gray-900 group-hover:text-blue3"
                                                    : "text-gray-400"
                                            }
                                        `}
                                    >
                                        {modulo.titulo}
                                    </h3>
                                    <p
                                        className={`
                                            mt-3
                                            leading-relaxed
                                            ${
                                                disponivel
                                                    ? "text-gray-600"
                                                    : "text-gray-400"
                                            }
                                        `}
                                    >
                                        {modulo.descricao}
                                    </p>
                                    {disponivel && (
                                        <div className="mt-3 text-sm text-blue3">
                                            Acessar módulo →
                                        </div>
                                    )}
                                </div>
                            );

                            return disponivel ? (
                                <Link
                                    key={modulo.id}
                                    to={`/modulos/${modulo.codigo}`}
                                >
                                    {conteudo}
                                </Link>
                            ) : (
                                <div key={modulo.id}>
                                    {conteudo}
                                </div>
                            );
                        })}
                    </div>
                </section>

            </div>
        </main>
    );
}