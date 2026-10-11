
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    CarFront,
    ArrowRight,
    ChevronDown,
    X,
} from "lucide-react";

const CHAVE_INTRODUCAO = "motorclass-introducao-garagem-oculta";

export default function IntroducaoGaragem() {
    const [aberta, setAberta] = useState(() => {
        try {
            return (
                localStorage.getItem(CHAVE_INTRODUCAO) !== "true"
            );
        } catch {
            return true;
        }
    });

    function recolher() {
        setAberta(false);
        try {
            localStorage.setItem(CHAVE_INTRODUCAO, "true");
        } catch {}
    }
    function reabrir() {
        setAberta(true);
        try {
            localStorage.removeItem(CHAVE_INTRODUCAO);
        } catch {}
    }

    if (!aberta) {
        return (
            <button
                type="button"
                onClick={reabrir}
                aria-expanded={false}
                className="
                    flex 
                    w-full 
                    items-center 
                    justify-between 
                    gap-3
                    rounded-xl 
                    border 
                    border-gray-200 
                    bg-white
                    px-4 py-3 
                    text-left 
                    shadow-sm 
                    transition
                    hover:border-blue1/30 
                    hover:bg-blue1/5
                    mb-5
                "
            >
                <span className="flex items-center gap-3">
                    <CarFront className="h-5 w-5 text-blue3" />
                    <span className="font-medium">
                        Conheça a história do seu projeto
                    </span>
                </span>
                <ChevronDown className="h-5 w-5 text-gray-500" />
            </button>
        );
    }

    return (
        <section
            aria-labelledby="titulo-projeto"
            className="
                relative 
                overflow-hidden 
                rounded-2xl
                border 
                border-gray-200 
                bg-white
                p-6 
                shadow-sm 
                mb-5
            "
        >
            <button
                type="button"
                onClick={recolher}
                aria-label="Recolher introdução"
                className="
                    absolute 
                    right-4 
                    top-4 
                    rounded-lg 
                    p-2
                    text-gray-500 
                    transition 
                    hover:bg-gray-100
                    hover:text-gray-800
                "
            >
                <X className="h-5 w-5" />
            </button>

            <div className="flex items-start gap-4">
                <div
                    className="
                        flex 
                        h-12 w-12 
                        shrink-0 
                        items-center
                        justify-center 
                        rounded-xl 
                        bg-blue1/10
                    "
                >
                    <CarFront className="h-6 w-6 text-blue3" />
                </div>

                <div className="min-w-0 flex-1 pr-6 text-left">
                    <p className="text-xs font-semibold uppercase tracking-widest !text-blue1">
                        Seu projeto
                    </p>
                    <h2
                        id="titulo-projeto"
                        className="!my-2 text-xl font-bold sm:text-2xl"
                    >
                        Todo grande projeto começa em uma garagem.
                    </h2>

                    <p className="!mt-4 leading-relaxed">
                        Este clássico é o ponto de partida do seu projeto.
                        Para conhecer melhor o carro, você precisará entender
                        o que existe sob seu capô e como seus sistemas
                        trabalham juntos.
                    </p>
                    <p className="!mt-2 leading-relaxed">
                        Conforme você conclui os módulos, novas peças ficam
                        disponíveis para sua garagem. Escolha quais deseja
                        equipar e acompanhe a evolução do seu carro enquanto
                        aprende mecânica automotiva.
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-4">
                        <Link
                            to="/modulos"
                            className="
                                inline-flex 
                                items-center 
                                gap-2
                                rounded-lg 
                                bg-blue1 
                                px-4 py-2.5
                                font-semibold 
                                text-white 
                                transition
                                hover:bg-blue3
                            "
                        >
                            Explorar módulos
                            <ArrowRight className="h-4 w-4" />
                        </Link>

                        <button
                            type="button"
                            onClick={recolher}
                            className="
                                text-sm 
                                font-medium 
                                text-gray-500
                                underline-offset-4 
                                hover:underline
                            "
                        >
                            Entendi
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
