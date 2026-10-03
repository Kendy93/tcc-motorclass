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
}

//===========================================================================

export default function PontoInterativo3D({
    objeto,
    titulo,
    onClick,
    mostrarTitulo = true,
    selecionado = false,
}: PontoInterativo3DProps) {
    const grupoRef = useRef<THREE.Group>(null);
    const posicao = useRef(new THREE.Vector3());

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
            <Html
                center
                style={{
                    pointerEvents: "auto",
                }}
            >
                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation();
                        onClick();
                    }}
                    className="group relative flex h-10 w-10 items-center justify-center"
                    aria-label={`Selecionar ${titulo}`}
                >
                    {/* círculo pulsante */}
                    <span
                        className={`
                            absolute
                            h-7
                            w-7
                            rounded-full
                            animate-ping
                            ${
                                selecionado
                                    ? "bg-yellow-400/70"
                                    : "bg-blue-400/40"
                            }
                        `}
                    />
                    {/* ponto central */}
                    <span
                        className={`
                            relative
                            h-3
                            w-3
                            rounded-full
                            border-2
                            border-white
                            shadow-md
                            ${
                                selecionado
                                    ? "bg-blue1"
                                    : "bg-red"
                            }
                        `}
                    />
                    {/* label com o nome da parte */}
                    {mostrarTitulo && (
                        <span
                            className="
                                pointer-events-none
                                absolute
                                left-10
                                whitespace-nowrap
                                rounded-md
                                bg-black
                                px-2 py-1
                                text-xl
                                text-white
                                opacity-0
                                transition-opacity
                                group-hover:opacity-100
                            "
                        >
                            {titulo}
                        </span>
                    )}
                </button>
            </Html>
        </group>
    );
}