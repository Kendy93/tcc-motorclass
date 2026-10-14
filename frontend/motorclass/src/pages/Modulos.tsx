import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";

import type { User, Modulo } from "../types";
import { configuracoesModulos } from "../data/modulos";
import BotaoLink from "../components/BotaoLink";
import Visualizador3D from "../components/3d/Visu3DBase";

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

                {/* progresso / propaganda da garagem */}
                <section className={`
                    mt-6 
                    grid 
                    grid-cols-1 
                    items-center 
                    gap-6
                    rounded-xl 
                    border 
                    p-6 
                    shadow-sm
                    lg:grid-cols-[minmax(0,1fr)_280px]
                    ${user
                        ? "border-gray-200 bg-blue2"
                        : "border-blue1/20 bg-blue1/5"
                    }
                `}>
                    {/* esquerda */}
                    <div className="min-w-0 text-left">
                        {user ? (
                            <>
                                <p className="text-sm !text-mainlight">
                                    Seu progresso
                                </p>
                                <p className="mt-1 text-3xl font-bold !text-mainlight">
                                    {progresso}%
                                </p>
                                <p className="mt-2 text-sm !text-mainlight">
                                    {modulosConcluidos} de {totalModulos} módulos concluídos
                                </p>
                                <div className="mt-2 h-3 overflow-hidden rounded-full bg-mainlight">
                                    <div
                                        className="h-full rounded-full bg-blue5 transition-all"
                                        style={{
                                            width: `${progresso}%`,
                                        }}
                                    />
                                </div>
                                <div className="mt-3 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-sm !text-mainlight">
                                        Continue aprendendo para desbloquear novas peças para seu projeto.
                                    </p>
                                    <BotaoLink
                                        to="/perfil"
                                        variant="secondary"
                                        className="shrink-0 px-4 py-2"
                                    >
                                        Ver garagem
                                    </BotaoLink>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="text-sm font-semibold uppercase tracking-widest !text-blue1">
                                    Seu próximo projeto
                                </p>
                                <h2 className="mt-2 text-2xl font-bold">
                                    Crie sua garagem
                                </h2>
                                <p className="mt-2 leading-relaxed">
                                    Comece a aprender sobre mecânica automotiva, desbloqueie novas peças e transforme seu carro conforme avança pelos módulos.
                                </p>
                                <div className="mt-5">
                                    <BotaoLink
                                        to="/cadastro"
                                        className="px-5 py-2.5"
                                    >
                                        Começar meu projeto
                                    </BotaoLink>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="relative h-[200px] w-full min-w-0">
                        <Visualizador3D
                            modelo="/models/tcc_model-gaming.glb"
                            escala={1}
                            camerapos={[3.75, 1.5, 2.5]}
                            origem={[0, 0.5, 0]}
                            altura="200px"
                            zoom={false}
                        />

                        <div className="
                            pointer-events-none absolute right-2 top-2 z-10
                            rounded border border-blue1
                            bg-blue1 px-3 py-1
                            text-xs font-semibold text-mainlight shadow-sm
                        ">
                            Seu projeto
                        </div>
                    </div>
                </section>

                <section className="mt-8">
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