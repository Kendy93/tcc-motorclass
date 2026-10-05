import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

//===========================================================================

interface PontoInterativo3DProps {
    objeto: THREE.Object3D;
    titulo: string;
    onClick: () => void;
    mostrarTitulo?: boolean;
    selecionado?: boolean;
    tipo?: TipoPontoInterativo;
}

type TipoPontoInterativo =
    | "visualizador"
    | "pergunta"
    | "animacao";

//===========================================================================

export default function PontoInterativo3D({
    objeto,
    titulo,
    onClick,
    mostrarTitulo = true,
    selecionado = false,
    tipo = "visualizador",
}: PontoInterativo3DProps) {
    const grupoRef = useRef<THREE.Group>(null);
    const posicao = useRef(new THREE.Vector3());

    const estilosPorTipo = {
        visualizador: {
            ponto: "bg-blue-500",
            circulo: "bg-blue-400/40",
            simbolo: null,
        },
        pergunta: {
            ponto: "bg-red-500",
            circulo: "bg-red-400/40",
            simbolo: "?",
        },
        animacao: {
            ponto: "bg-green-500",
            circulo: "bg-green-400/40",
            simbolo: "▶",
        },
    };
    const estilo = estilosPorTipo[tipo];

    useFrame(() => {
        if (!grupoRef.current) {
            return;
        }
        objeto.getWorldPosition(posicao.current);
        grupoRef.current.position.copy(posicao.current);
    });

//-------------------------------------------------------

    return (
        <group ref={grupoRef}>
            <Html center style={{ pointerEvents: "auto" }}>
                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation();
                        onClick();
                    }}
                    className="
                        group 
                        relative 
                        flex 
                        h-7 w-7 
                        items-center 
                        justify-center
                    "
                    aria-label={`Selecionar ${titulo}`}
                >
                    {/* círculo pulsante */}
                    <span
                        className={`
                            absolute 
                            h-7 w-7 
                            rounded-full 
                            animate-ping 
                            ${
                                selecionado
                                    ? "bg-yellow-400/70"
                                    : estilo.circulo
                            }
                        `}
                    />

                    {/* ponto central */}
                    <span
                        className={`
                            relative 
                            flex 
                            h-4 w-4 
                            items-center 
                            justify-center 
                            rounded-full 
                            border-2 
                            border-white 
                            text-[9px] 
                            font-bold 
                            text-white 
                            shadow-md 
                            ${
                                selecionado
                                    ? "bg-yellow-400"
                                    : estilo.ponto
                            }
                        `}
                    >
                        {estilo.simbolo}
                    </span>

                    {/* label com o nome da parte */}
                    {mostrarTitulo && (
                        <span className="
                                pointer-events-none
                                absolute
                                left-10
                                whitespace-nowrap
                                rounded-md
                                bg-black
                                px-2 py-1
                                text-lg
                                text-white
                                opacity-0
                                transition-opacity
                                group-hover:opacity-100
                        ">
                            {titulo}
                        </span>
                    )}
                </button>
            </Html>
        </group>
    );
}