import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import type { Recompensa } from "../../types";
import { recompensasPorModulo } from "../../data/recompensas.ts";

//===========================================================================

const MODELO = "/models/tcc_model-gaming.glb";

interface ModeloGamificacaoProps {
    recompensas: Recompensa[];
}

interface ModeloCarroProps {
    recompensas: Recompensa[];
}

//-------------------------------------------------------

function ModeloCarro({ recompensas }: ModeloCarroProps) {
    const { scene } = useGLTF(MODELO);
    //cria uma cópia do modelo para não afetar outras instâncias
    const modelo = useMemo(() => scene.clone(true), [scene]);
    //busca os itens desbloqueados
    const objetosDesbloqueados = useMemo(
        () => new Set(recompensas.map((recompensa) => recompensa.objeto)),
        [recompensas],
    );
    const objetosDeRecompensa = useMemo(
        () =>
            new Set(
                Object.values(recompensasPorModulo).map(
                    (recompensa) => recompensa.objeto,
                ),
            ),
        [],
    );

    //muda a visibilidade de acordo com as recompensas desbloqueados
    useEffect(() => {
        modelo.traverse((objeto) => {
            if (!objetosDeRecompensa.has(objeto.name)) {
                return;
            }
            objeto.visible = objetosDesbloqueados.has(objeto.name);
        });
    }, [modelo, objetosDeRecompensa, objetosDesbloqueados]);

    return <primitive object={modelo} />;
}

//===========================================================================

export default function ModeloGamificacao({
    recompensas,
}: ModeloGamificacaoProps) {
    return (
        <div className="h-[800px] w-full">
            <Canvas
                camera={{
                    position: [3.5, 1, 3.5],
                    fov: 40,
                }}
            >
                <ambientLight intensity={1} />
                <color
                    attach="background"
                    args={["#2A84D7"]}
                />
                <Environment files="/hdri/cloudy_cliffside_road_2k.hdr"/>

                <ModeloCarro recompensas={recompensas} />
                <OrbitControls
                    minDistance={2}
                    maxDistance={6}
                    target={[0, 0.5, 0]}
                />
            </Canvas>
        </div>
    );
}

useGLTF.preload(MODELO);