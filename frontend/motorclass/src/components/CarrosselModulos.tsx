import { useRef } from "react";
import CardModulo from "./CardModulo";
import type { Modulo } from "../types";

interface CarrosselModulosProps {
    modulos: Modulo[];
}

//===========================================================================

export default function CarrosselModulos({
    modulos,
}: CarrosselModulosProps) {
    const carrosselRef = useRef<HTMLDivElement>(null);
    function mover(distancia: number) {
        carrosselRef.current?.scrollBy({
            left: distancia,
            behavior: "smooth",
        });
    }

    return (
        <section className="overflow-hidden bg-blue2 py-16">
            <div className="mx-auto max-w-[1600px] px-6">

                <div
                    ref={carrosselRef}
                    className="
                        flex
                        snap-x
                        snap-mandatory
                        gap-5
                        overflow-x-auto
                        pb-10
                        [scrollbar-width:none]
                        [&::-webkit-scrollbar]:hidden
                        items-stretch
                    "
                >
                    {modulos.map((modulo) => (
                        <div
                            key={modulo.codigo}
                            className="snap-start"
                        >
                            <CardModulo modulo={modulo}/>
                        </div>
                    ))}
                </div>

                <div className="flex items-end justify-between gap-6">
                    <div className="max-w-xl text-white text-left">
                        <h2 className="mt-2 text-3xl font-bold !text-mainlight">
                            Explore os sistemas automotivos
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed !text-mainlight/80 md:text-base">
                            Conheça os principais sistemas de um carro e entenda como seus componentes funcionam e se relacionam.
                        </p>
                    </div>

                    <div className="hidden shrink-0 gap-2 sm:flex">
                        <button
                            type="button"
                            onClick={() => mover(-700)}
                            className="
                                flex h-10 w-10
                                items-center justify-center
                                border border-white/40
                                text-white
                                transition
                                hover:bg-white
                                hover:text-blue3
                                rounded-lg
                            "
                            aria-label="Módulos anteriores"
                        >
                            ←
                        </button>
                        <button
                            type="button"
                            onClick={() => mover(700)}
                            className="
                                flex h-10 w-10
                                items-center justify-center
                                border border-white/40
                                text-white
                                transition
                                hover:bg-white
                                hover:text-blue1
                                rounded-lg
                            "
                            aria-label="Próximos módulos"
                        >
                            →
                        </button>
                    </div>
                </div>

                {/* controles mobile */}
                <div className="mt-4 flex justify-end gap-2 sm:hidden">
                    <button
                        type="button"
                        onClick={() => mover(-300)}
                        className="
                            flex h-10 w-10
                            items-center justify-center
                            border border-white/40
                            text-white
                        "
                        aria-label="Módulos anteriores"
                    >
                        ←
                    </button>

                    <button
                        type="button"
                        onClick={() => mover(300)}
                        className="
                            flex h-10 w-10
                            items-center justify-center
                            border border-white/40
                            text-white
                        "
                        aria-label="Próximos módulos"
                    >
                        →
                    </button>
                </div>
            </div>
        </section>
    );
}