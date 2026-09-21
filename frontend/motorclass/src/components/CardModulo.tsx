import { Link } from "react-router-dom";
import type { Modulo } from "../types";

interface CardModuloProps {
    modulo: Modulo;
}

export default function CardModulo({
    modulo,
}: CardModuloProps) {
    return (
        <Link
            to={`/modulos/${modulo.codigo}`}
            className="
                my-2
                group
                flex
                h-full
                flex-col
                w-[260px]
                shrink-0
                overflow-hidden
                border-2
                border-mainlight
                transition-transform
                duration-300
                hover:-translate-y-2
                rounded-lg

            "
        >
            <div className="relative aspect-[3/4] overflow-hidden">
                <img
                    src={modulo.imagem}
                    alt={modulo.titulo}
                    className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                    "
                />

                {/* overlay para escurecer a imagem */}
                <div className="absolute inset-0 bg-black/10" />
                {/* número */}
                <span
                    className="
                        absolute
                        bottom-[-12px]
                        left-2
                        font-serif
                        text-[8rem]
                        font-bold
                        leading-none
                        text-mainlight
                    "
                >
                    {String(modulo.ordem).padStart(2, "0")}
                </span>
            </div>

            <div className="flex flex-1 flex-col bg-mainlight px-4 py-4">
                <p className="text-sm font-semibold !text-gray-400 tracking-widest uppercase">
                    MÓDULO {modulo.ordem}
                </p>
                <h3 className="mt-1 text-lg font-bold">
                    {modulo.titulo}
                </h3>
            </div>
        </Link>
    );
}