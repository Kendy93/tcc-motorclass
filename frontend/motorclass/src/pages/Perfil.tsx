import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import type { Modulo, Recompensa } from "../types";
import Botao from "../components/Botao";
import ModeloGamificacao from "../components/3d/ModeloGamificacao";
import { obterProximaRecompensa, obterRecompensasDesbloqueadas, recompensasPorModulo } from "../data/recompensas";
import { CheckCircle2, Trophy } from "lucide-react";
import IntroducaoGaragem from "../components/IntroducaoGaragem";
import CertificadoConquista, {type Certificado} from "../components/CertificadoConquista";

//===========================================================================

interface Usuario {
    name: string;
    email: string;
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

export default function Perfil() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [modulos, setModulos] = useState<Modulo[]>([]);
    const [recompensasGaragem, setRecompensasGaragem] = useState<RecompensaGaragem[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");
    const [atualizandoRecompensa, setAtualizandoRecompensa] = useState<string | null>(null);
    const [certificado, setCertificado] = useState<Certificado | null>(null);

    //carregando os dados
    useEffect(() => {
        async function carregarPerfil() {
            try {
                const [
                    respostaUsuario,
                    respostaModulos,
                    respostaGaragem,
                ] = await Promise.all([
                    api.get("/api/user"),
                    api.get("/api/modulos"),
                    api.get("/api/garagem"),
                ]);
                setUsuario(respostaUsuario.data.user);
                setModulos(respostaModulos.data);
                setRecompensasGaragem(respostaGaragem.data,);
                try {
                    const respostaCertificado = await api.get("/api/certificado");
                    setCertificado(respostaCertificado.data);
                } catch (erro) {
                    console.error("Erro ao carregar certificado:", erro);
                }
            } catch (erro) {
                console.error("Erro ao carregar perfil:", erro);
                setErro("Não foi possível carregar seu perfil.");
            } finally {
                setLoading(false);
            }
        }
        carregarPerfil();
    }, []);

    const modulosConcluidos = useMemo(() => 
        modulos.filter((modulo) => modulo.concluido), [modulos]);
    const quantidadeConcluida = modulosConcluidos.length;
    const porcentagem = modulos.length > 0
            ? Math.round((quantidadeConcluida / modulos.length) * 100,)
            : 0;

    const recompensasDesbloqueadas = useMemo(() => 
        obterRecompensasDesbloqueadas(modulos), [modulos]);
    const proximaRecompensa = useMemo(() => 
        obterProximaRecompensa(modulos), [modulos]);
    const recompensasVisiveis = useMemo(() => {
        return modulos
            .map((modulo) => {
                const recompensa = recompensasPorModulo[modulo.codigo];
                if (!recompensa) {
                    return null;
                }
                return {
                    modulo,
                    recompensa,
                };
            })
            .filter(
                (item): item is {
                    modulo: Modulo;
                    recompensa: Recompensa;
                } => item !== null,
            );
    }, [modulos]);
    
    //carrega com base na configuração
    const pecasEquipadas = useMemo(() => {
        return recompensasGaragem
            .filter(
                (recompensa) =>
                    recompensa.desbloqueada &&
                    recompensa.equipada,
            )
            .map(
                (recompensa) =>
                    recompensa.codigo,
            );
    }, [recompensasGaragem]);
    const recompensasVisiveisNoCarro = useMemo(() => {
        const equipadas = new Set(pecasEquipadas);

        return recompensasDesbloqueadas.filter(
            (recompensa) =>
                equipadas.has(
                    recompensa.codigo,
                ),
        );
    }, [
        recompensasDesbloqueadas,
        pecasEquipadas,
    ]);
    const codigosEquipados = useMemo(
        () =>
            recompensasGaragem
                .filter((recompensa) => recompensa.equipada)
                .map((recompensa) => recompensa.codigo),
        [recompensasGaragem],
    );

    //alterna se as recompensas ficam visíveis ou não
    const alternarRecompensa = async (
        recompensa: RecompensaGaragem,
    ) => {
        if (!recompensa.desbloqueada) {
            return;
        }
        try {
            setAtualizandoRecompensa(recompensa.codigo);
            const resposta = await api.post(`/api/garagem/${recompensa.codigo}/alternar`);
            const equipada = resposta.data.equipada;

            setRecompensasGaragem(
                (atual) =>
                    atual.map((item) =>
                        item.codigo ===
                        recompensa.codigo? {
                                ...item,
                                equipada,
                            }
                        : item,
                    ),
            );
        } catch (erro) {
            console.error("Erro ao atualizar recompensa:", erro);
        } finally {
            setAtualizandoRecompensa(null);
        }
    };


    //logout
    const sair = async () => {
        try {
            await api.post("/logout");
            navigate("/");
        } catch (erro) {
            console.error("Erro ao sair:", erro);
        }
    };

//-------------------------------------------------------

    if (loading) {
        return (
            <main className="min-h-screen bg-module px-6 py-10">
                <div className="mx-auto max-w-6xl">
                    <p className="text-gray-600">
                        Carregando sua garagem...
                    </p>
                </div>
            </main>
        );
    }
    if (erro || !usuario) {
        return (
            <main className="min-h-screen bg-module px-6 py-10">
                <div className="mx-auto max-w-6xl">
                    <p className="text-red-600">
                        {erro || "Não foi possível carregar o perfil."}
                    </p>
                </div>
            </main>
        );
    }


//===========================================================================

    return (
        <main className="min-h-screen bg-module px-6 py-10">
            <div className="mx-auto max-w-[120rem]">
                <header className="mx-auto mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between !w-6xl">
                    <div>
                        <h1 className="text-3xl">
                            Olá, {usuario.name}
                        </h1>
                    </div>
                    <Botao
                        onClick={sair}
                        className="w-full px-5 py-2 sm:w-auto"
                    >
                        Sair
                    </Botao>
                </header>

{/*//-------------------------------------------------------*/}

                <IntroducaoGaragem />

                <section className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.5fr)]">
                    {/* carro */}
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                        <div className="border-b border-gray-200 px-6 py-5 text-left">
                            <h2 className="text-xl">
                                Minha garagem
                            </h2>
                            <p className="mt-1 text-sm !text-gray-500">
                                Continue aprendendo para desbloquear novas peças.
                            </p>
                        </div>

                        <div className="bg-maindark">
                            <ModeloGamificacao
                                recompensasEquipadas={codigosEquipados}
                            />
                        </div>
                    </div>

{/*//-------------------------------------------------------*/}

                    {/* progresso */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm text-left">
                        <h2 className="text-xl font-semibold ">
                            Seu progresso
                        </h2>

                        <div className="mt-6">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-sm text-gray-500">
                                    Módulos concluídos
                                </span>
                                <span className="text-sm font-semibold">
                                    {quantidadeConcluida} / {modulos.length}
                                </span>
                            </div>
                            <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                                <div
                                    className="h-full rounded-full bg-blue3 transition-all duration-500"
                                    style={{
                                        width: `${porcentagem}%`,
                                    }}
                                />
                            </div>
                            <p className="mt-2 text-right text-xs !text-gray-500">
                                {porcentagem}% concluído
                            </p>
                        </div>

{/*//-------------------------------------------------------*/}

                        {/* próxima recompensa */}
                        <div className="mt-8 border-t border-gray-200 pt-6">
                            <p className="text-xs font-medium !text-blue1">
                                Próxima recompensa
                            </p>

                            {proximaRecompensa ? (
                                <>
                                    <h3 className="mt-1 text-lg font-bold">
                                        {proximaRecompensa.nome}
                                    </h3>

                                    <p className="mt-1 text-sm leading-relaxed">
                                        Continue avançando pelos módulos para desbloquear essa parte.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h3 className="mt-2 text-lg font-bold">
                                        ✓ Todas as recompensas desbloqueadas
                                    </h3>
                                    <p className="mt-1 text-sm leading-relaxed">
                                        Você já desbloqueou todas as recompensas disponíveis.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {certificado && (
                    <div className="mb-8">
                        <CertificadoConquista
                            certificado={certificado}
                            contexto="perfil"
                        />
                    </div>
                )}

{/*//-------------------------------------------------------*/}

                {/* todas as recompensas */}
                <section className="rounded-2xl bg-white p-6 text-left shadow-sm">

                <div className="mb-6 flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-100">
                        <Trophy className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">
                            Recompensas da sua garagem
                        </h2>

                        <p className="mt-1 text-sm !text-gray-500">
                            As peças são desbloqueadas conforme você conclui os módulos.
                            Escolha quais deseja equipar no carro.
                        </p>
                    </div>
                </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {recompensasVisiveis.map(
                            ({
                                modulo,
                                recompensa,
                            }) => {
                                const desbloqueada = modulo.concluido;
                                //procura o estado para a recompensa
                                const recompensaGaragem =
                                    recompensasGaragem.find(
                                        (item) =>
                                            item.codigo ===
                                            recompensa.codigo,
                                    );
                                const equipada = recompensaGaragem?.equipada ?? false;
                                const atualizando = atualizandoRecompensa === recompensa.codigo;

                                return (
                                    <label
                                        key={recompensa.codigo}
                                        className={`
                                            group
                                            flex
                                            items-start
                                            gap-4
                                            rounded-xl
                                            border
                                            p-5
                                            transition
                                            ${
                                                desbloqueada
                                                    ? "cursor-pointer border-gray-200 bg-white hover:-translate-y-0.5 hover:border-blue1/30 hover:bg-blue1/5 hover:shadow-sm"
                                                    : "cursor-not-allowed border-gray-200 bg-gray-50 opacity-55"
                                            }
                                        `}
                                    >
                                        <div
                                            className={`
                                                flex
                                                h-11
                                                w-11
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-xl
                                                ${
                                                    !desbloqueada
                                                        ? "bg-gray-200"
                                                        : equipada
                                                            ? "bg-blue1/10"
                                                            : "bg-yellow-100"
                                                }
                                            `}
                                        >
                                            <Trophy
                                                className={`
                                                    h-5
                                                    w-5
                                                    ${
                                                        !desbloqueada
                                                            ? "text-gray-400"
                                                            : equipada
                                                                ? "text-blue1"
                                                                : "text-yellow-600"
                                                    }
                                                `}
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between gap-3">
                                                <p
                                                    className={`
                                                        text-xs
                                                        font-semibold
                                                        uppercase
                                                        tracking-wide
                                                        ${
                                                            !desbloqueada
                                                                ? "!text-gray-400"
                                                                : equipada
                                                                    ? "!text-blue1"
                                                                    : "!text-yellow-600"
                                                        }
                                                    `}
                                                >
                                                    {!desbloqueada
                                                        ? "Bloqueada"
                                                        : equipada
                                                            ? "Equipada"
                                                            : "Desbloqueada"}
                                                </p>

                                                <input
                                                    type="checkbox"
                                                    checked={desbloqueada && equipada}
                                                    disabled={!desbloqueada || atualizando}
                                                    onChange={() =>
                                                        recompensaGaragem &&
                                                        alternarRecompensa(recompensaGaragem)
                                                    }
                                                    className="h-4 w-4 cursor-pointer"
                                                />
                                            </div>

                                            <h3 className="mt-1 font-semibold">
                                                {recompensa.nome}
                                            </h3>

                                            <p className="mt-2 text-sm !text-gray-500">
                                                {desbloqueada
                                                    ? equipada
                                                        ? "Aparecendo no carro."
                                                        : "Oculta do carro."
                                                    : `Conclua "${modulo.titulo}" para desbloquear.`}
                                            </p>
                                        </div>
                                    </label>
                                );
                            },
                        )}

                    </div>
                </section>
            </div>
        </main>
    );
}