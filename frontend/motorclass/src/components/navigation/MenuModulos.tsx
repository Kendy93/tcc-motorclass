import { Link } from "react-router-dom";

import type { Modulo } from "../../types";

interface MenuModulosProps {
    modulos: Modulo[];
    moduloAtual: string;
}

//===========================================================================

export default function MenuModulos({
    modulos,
    moduloAtual,
}: MenuModulosProps) {
    return (
        <aside className="sticky top-8">
            <h2 className="mb-4 font-semibold text-left">
                Todos os assuntos
            </h2>

            <div className="overflow-hidden rounded-lg border border-gray-200">
                {modulos.map((modulo, index) => {
                    const atual = modulo.codigo === moduloAtual;
                    return (
                        <Link
                            key={modulo.codigo}
                            to={`/modulos/${modulo.codigo}`}
                            className={`
                                flex items-center gap-3
                                px-4 py-3
                                text-sm
                                text-left
                                transition
                                ${index !== modulos.length - 1 ? "border-b border-gray-200" : ""}
                                ${
                                    atual
                                        ? "bg-blue1/10 font-semibold text-blue3"
                                        : "border-gray-300 text-gray-500 hover:text-blue1"
                                }
                            `}
                        >
                            <span
                                className={`
                                    flex h-5 w-5 shrink-0
                                    items-center justify-center
                                    rounded-full border
                                    text-xs
                                    ${
                                        modulo.concluido
                                            ? "border-gray-400 bg-blue3 text-white"
                                            : "border-gray-400"
                                    }
                                `}
                            >
                                {modulo.concluido && "✓"}
                            </span>

                            <span>
                                {modulo.ordem}. {modulo.titulo}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
}