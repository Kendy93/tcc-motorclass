import { useState } from "react";
import type { Animacao } from "../types";

interface AnimacaoVideoProps {
    animacoes: Animacao[];
}

export default function AnimacaoVideo({
    animacoes,
}: AnimacaoVideoProps) {
    const [animacaoAtiva, setAnimacaoAtiva] = useState(0);
    const animacao = animacoes[animacaoAtiva];

    return (
        <div className="my-8 overflow-hidden rounded-lg border bg-white shadow-sm">
            {/* botões */}
            <div className="flex border-b">
                {animacoes.map((item, index) => (
                    <button
                        key={item.titulo}
                        onClick={() => setAnimacaoAtiva(index)}
                        className={`
                            flex-1
                            px-4 py-3
                            text-sm
                            transition-colors
                            ${
                                index === animacaoAtiva
                                    ? "bg-gray-200 text-blue3 font-semibold"
                                    : "hover:bg-gray-100"
                            }
                        `}
                    >
                        {item.titulo}
                    </button>
                ))}
            </div>

            {/* player do vídeo */}
            <div className="bg-black">
                <video
                    key={animacao.video}
                    src={animacao.video}
                    autoPlay
                    muted
                    playsInline
                    loop={animacao.loop ?? true}
                    controls
                    className="mx-auto w-full"
                />
            </div>

            {/* legenda */}
            <div className="px-5 py-4">
                <p>
                    {animacao.legenda}
                </p>
            </div>

        </div>
    );
}