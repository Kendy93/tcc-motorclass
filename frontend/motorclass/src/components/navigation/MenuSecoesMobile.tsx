import { useState } from "react";
import type { Secao } from "../../types";
import MenuSecoes from "./MenuSecoes";

interface MenuSecoesMobileProps {
    secoes: Secao[];
}

export default function MenuSecoesMobile({
    secoes,
}: MenuSecoesMobileProps) {
    const [aberto, setAberto] = useState(false);

    return (
        <>
            <button
                onClick={() => setAberto(true)}
                className="
                    fixed right-0 top-1/2 z-40-translate-y-1/2
                    rounded-l-lg
                    bg-white
                    px-3 py-4
                    text-lg
                    shadow-md
                    xl:hidden
                "
                aria-label="Abrir menu de seções"
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
                    fixed right-0 top-0 z-50
                    h-full w-80
                    overflow-y-auto
                    bg-white p-6
                    shadow-xl
                    transition-transform duration-300
                    xl:hidden
                    ${
                        aberto
                            ? "translate-x-0"
                            : "translate-x-full"
                    }
                `}
            >
                <div className="mb-6 flex items-center justify-between">
                    <button
                        onClick={() => setAberto(false)}
                        className="text-xl text-gray-500 hover:text-black"
                        aria-label="Fechar menu de seções"
                    >
                        ×
                    </button>
                </div>

                <MenuSecoes secoes={secoes} />
            </aside>
        </>
    );
}