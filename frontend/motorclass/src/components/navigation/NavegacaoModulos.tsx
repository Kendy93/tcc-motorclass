import { Link } from "react-router-dom";
import type { Modulo } from "../../types";

interface NavegacaoModulosProps {
    modulos: Modulo[];
    moduloAtual: string;
}

export default function NavegacaoModulos({
    modulos,
    moduloAtual,
}: NavegacaoModulosProps) {
    const indiceAtual = modulos.findIndex(
        (modulo) => modulo.codigo === moduloAtual
    );
    const moduloAnterior =
        indiceAtual > 0
            ? modulos[indiceAtual - 1]
            : null;
    const moduloSeguinte =
        indiceAtual < modulos.length - 1
            ? modulos[indiceAtual + 1]
            : null;

    return (
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-8">
            <div>
                {moduloAnterior && (
                    <Link
                        to={`/modulos/${moduloAnterior.codigo}`}
                        className="
                            inline-flex
                            items-center
                            rounded-lg
                            px-5 py-2
                            text-left
                            transition-colors
                            hover:bg-blue1/10
                        "
                    >
                        <div>
                            <p className="text-xs !text-gray-400">
                                Módulo anterior
                            </p>

                            <p className="!text-blue1">
                                ← {moduloAnterior.titulo}
                            </p>
                        </div>
                    </Link>
                )}
            </div>

            <div>
                {moduloSeguinte && (
                    <Link
                        to={`/modulos/${moduloSeguinte.codigo}`}
                        className="
                            inline-flex
                            rounded-lg
                            px-5 py-2
                            text-right
                            transition-colors
                            hover:bg-blue1/10
                        "
                    >
                        <div>
                            <p className="text-xs !text-gray-400">
                                Próximo módulo
                            </p>

                            <p className="!text-blue1">
                                {moduloSeguinte.titulo} →
                            </p>
                        </div>
                    </Link>
                )}
            </div>
        </nav>
    );
}