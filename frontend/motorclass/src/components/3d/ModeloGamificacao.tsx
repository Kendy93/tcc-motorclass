import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import "./configurarDraco";
import { Canvas } from "@react-three/fiber";
import { useLayoutEffect, useMemo } from "react";
//import type { Recompensa } from "../../types";
import { recompensasPorModulo } from "../../data/recompensas.ts";

//===========================================================================

const MODELO = "/models/tcc_model-gaming.glb";

interface ModeloGamificacaoProps {
    recompensasEquipadas: string[];
    pos?: [number, number, number];
    origem?: [number, number, number];
}

interface ModeloCarroProps {
    recompensasEquipadas: string[];
}

//-------------------------------------------------------

function ModeloCarro({ recompensasEquipadas }: ModeloCarroProps) {
    const { scene } = useGLTF(MODELO);
    //cria uma cópia do modelo para não afetar outras instâncias
    const modelo = useMemo(() => scene.clone(true), [scene]);
    //busca os itens desbloqueados
    const codigosEquipados = useMemo(
        () => new Set(recompensasEquipadas),
        [recompensasEquipadas],
    );
    // const objetosDeRecompensa = useMemo(
    //     () =>
    //         new Set(
    //             Object.values(recompensasPorModulo).map(
    //                 (recompensa) => recompensa.objeto,
    //             ),
    //         ),
    //     [],
    // );

    //muda a visibilidade de acordo com as recompensas desbloqueados
    useLayoutEffect(() => {
        const alterarVisibilidade = (
            nome: string,
            visivel: boolean,
        ) => {
            const objeto = modelo.getObjectByName(nome);
            if (!objeto) {
                console.warn(`Objeto "${nome}" não encontrado no modelo de gamificação.`);
                return;
            }
            objeto.visible = visivel;
        };

        // aplica o estado de cada recompensa equipada
        Object.values(recompensasPorModulo).forEach(
            (recompensa) => {
                const equipada = codigosEquipados.has(recompensa.codigo);
                // a peça nova aparece apenas quando equipada
                alterarVisibilidade(recompensa.objeto, equipada);
                // a antiga volta quando a recompensa não está equipada
                if (recompensa.objetoSubstituido) {
                    alterarVisibilidade(recompensa.objetoSubstituido, !equipada);
                }
            },
        );
    }, [modelo, codigosEquipados]);

    return <primitive object={modelo} />;
}

//===========================================================================

export default function ModeloGamificacao({
    recompensasEquipadas,
    pos = [3.5, 1, 3.5],
    origem = [0, 0.5, 0],
}: ModeloGamificacaoProps) {
    return (
        <div className="h-[800px] w-full">
            <Canvas
                camera={{
                    position: pos,
                    fov: 40,
                }}
            >
                <ambientLight intensity={1} />
                <color
                    attach="background"
                    args={["#2A84D7"]}
                />
                <Environment files="/hdri/cloudy_cliffside_road_1k.hdr"/>

                <ModeloCarro recompensasEquipadas={recompensasEquipadas} />
                <OrbitControls
                    minDistance={2}
                    maxDistance={8}
                    target={origem}
                />
            </Canvas>
        </div>
    );
}
