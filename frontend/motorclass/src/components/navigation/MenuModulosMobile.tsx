import { useState } from "react";
import type { Modulo } from "../../types";
import MenuModulos from "./MenuModulos";

interface MenuModulosMobileProps {
    modulos: Modulo[];
    moduloAtual: string;
}

export default function MenuModulosMobile({
    modulos,
    moduloAtual,
}: MenuModulosMobileProps) {
    const [aberto, setAberto] = useState(false);

    return (
        <>
            <button
                onClick={() => setAberto(true)}
                className="
                    fixed left-0 top-1/2 z-40-translate-y-1/2
                    rounded-r-lg
                    bg-white
                    px-3 py-4
                    text-lg
                    shadow-md
                    xl:hidden
                "
                aria-label="Abrir menu de módulos"
            >
                ≡
            </button>

            {aberto && (
                <div
                    className="fixed inset-0 z-40 bg-black/30 xl:hidden"
                    onClick={() => setAberto(false)}
                />
            )}

            <aside
                className={`
                    fixed left-0 top-0 z-50
                    h-full w-80
                    overflow-y-auto
                    bg-white p-6
                    shadow-xl
                    transition-transform duration-300
                    xl:hidden
                    ${
                        aberto
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }
                `}
            >
                <div className="mb-2 flex items-center justify-end">
                    <button
                        onClick={() => setAberto(false)}
                        className="text-xl text-gray-500 hover:text-black"
                        aria-label="Fechar menu de módulos"
                    >
                        ×
                    </button>
                </div>

                <MenuModulos 
                    modulos={modulos}
                    moduloAtual={moduloAtual}
                />
            </aside>
        </>
    );
}