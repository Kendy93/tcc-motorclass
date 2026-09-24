import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

//===========================================================================

interface PontoInterativo3DProps {
    objeto: THREE.Object3D;
    titulo: string;
    onClick: () => void;
}

//===========================================================================

export default function PontoInterativo3D({
    objeto,
    titulo,
    onClick,
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
                        className="
                            absolute
                            h-7 w-7
                            rounded-full
                            bg-blue1/40
                            animate-ping
                        "
                    />
                    {/* ponto central */}
                    <span
                        className="
                            relative
                            h-5 w-5
                            rounded-full
                            border-3
                            border-white
                            bg-red
                        "
                    />
                    {/* label com o nome da parte */}
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
                </button>
            </Html>
        </group>
    );
}