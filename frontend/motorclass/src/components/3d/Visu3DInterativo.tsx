import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, type ThreeEvent } from "@react-three/fiber";
import {
    Environment,
    Html,
    OrbitControls,
    useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import { createPortal } from "react-dom";

import PontoInterativo3D from "./PontoInterativo3D";
import type { InformacaoPeca, PecaSelecionada } from "../../types";

//===========================================================================

interface ModeloProps {
    modelo: string;
    escala: number;
    pecas: Record<string, InformacaoPeca>;
    onSelecionar: (peca: PecaSelecionada) => void;
}

interface Visu3DInterativoProps {
    modelo: string;
    escala?: number;
    camerapos: [number, number, number];
    origem: [number, number, number];
    pecas: Record<string, InformacaoPeca>;
    fundo?: string;
}

//-------------------------------------------------------

function Modelo({
    modelo,
    escala,
    pecas,
    onSelecionar,
}: ModeloProps) {
    const { scene } = useGLTF(modelo);

    //encontra todos os objetos do GLB com nome
    const objetosInterativos = useMemo(() => {
        const encontrados: Record<string, THREE.Object3D> = {};
        scene.traverse((objeto) => {
            if (pecas[objeto.name]) {
                encontrados[objeto.name] = objeto;
            }
        });
        return encontrados;
    }, [scene, pecas]);

    //encontra a peça exata que foi clicada
    const encontrarPeca = (
        objeto: THREE.Object3D
    ): THREE.Object3D | null => {
        let atual: THREE.Object3D | null = objeto;
        while (atual) {
            if (pecas[atual.name]) {
                return atual;
            }
            atual = atual.parent;
        }
        return null;
    };

    //tratamento do clique para buscar as informações e a posição
    const clicar = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        const peca = encontrarPeca(event.object);
        if (!peca) {
            return;
        }
        const informacao = pecas[peca.name];
        const posicao = event.point.clone();
        onSelecionar({
            objeto: peca,
            posicao,
            informacao,
        });
    };

    //carrega o modelo, trata os cliques e monta os pontos
    return (
        <>
            <primitive
                object={scene}
                scale={escala}
                onClick={clicar}
            />
            {Object.entries(objetosInterativos).map(
                ([nome, objeto]) => (
                    <PontoInterativo3D
                        tipo="visualizador"
                        key={nome}
                        objeto={objeto}
                        titulo={pecas[nome].titulo}
                        onClick={() => {
                            const informacao = pecas[nome];

                            const posicao = new THREE.Vector3();
                            objeto.getWorldPosition(posicao);

                            onSelecionar({
                                objeto,
                                posicao,
                                informacao,
                            });
                        }}
                    />
                )
            )}
        </>
    );
}

//===========================================================================

export default function Visu3DInterativo({
    modelo,
    escala = 1,
    camerapos,
    origem,
    pecas,
    fundo="#2A84D7",
}: Visu3DInterativoProps) {
    const [selecionada, setSelecionada] = useState<PecaSelecionada | null>(null);
    
    //remove o destaque e volta ao original
    const materialOriginal = useRef<{
        objeto: THREE.Mesh;
        material: THREE.Material | THREE.Material[];
    } | null>(null);
    const removerDestaque = () => {
        if (!materialOriginal.current) {
            return;
        }
        const {
            objeto,
            material,
        } = materialOriginal.current;
        objeto.material = material;
        materialOriginal.current = null;
    };

    //aplica o destaque a parte clicada
    const destacarObjeto = (
        objeto: THREE.Object3D
    ) => {
        const mesh = objeto as THREE.Mesh;
        if (!mesh.isMesh || !mesh.material) {
            return;
        }
        removerDestaque();
        materialOriginal.current = {
            objeto: mesh,
            material: mesh.material,
        };
        const materiais = Array.isArray(mesh.material)
            ? mesh.material.map((material) =>
                  material.clone()
              )
            : mesh.material.clone();
        mesh.material = materiais;

        const aplicarDestaque = (
            material: THREE.Material
        ) => {
            const materialMesh =
                material as THREE.MeshStandardMaterial;

            if ("emissive" in materialMesh) {
                materialMesh.emissive.set("#4a90e2");
                materialMesh.emissiveIntensity = 1.5;
            }
        };
        if (Array.isArray(materiais)) {
            materiais.forEach(aplicarDestaque);
        } else {
            aplicarDestaque(materiais);
        }
    };

    //tratamento da seleção de peça
    const selecionarPeca = (
        peca: PecaSelecionada
    ) => {
        destacarObjeto(peca.objeto);
        setSelecionada(peca);
        console.log(
            "Peça selecionada:",
            peca.objeto.name
        );
    };

    useEffect(() => {
        return () => {
            removerDestaque();
        };
    }, []);

    const fecharSelecao = () => {
        removerDestaque();
        setSelecionada(null);
    };

//-------------------------------------------------------

    return (
        <div className="
            h-[600px] 
            w-full     
            border
            border-gray-200
            bg-white
            mb-5
        ">
            <Canvas
                camera={{
                    position: camerapos,
                    fov: 40,
                }}
            >
                <ambientLight intensity={1} />

                <Suspense fallback={null}>
                    <color
                        attach="background"
                        args={[fundo]}
                    />
                    <Environment files="/hdri/cloudy_cliffside_road_2k.hdr" />

                    <Modelo
                        modelo={modelo}
                        escala={escala}
                        pecas={pecas}
                        onSelecionar={selecionarPeca}
                    />

                    {/* popup com a informação da peça */}
                    {selecionada && (
                        <Html
                            position={selecionada.posicao}
                            center
                            zIndexRange={[2147483647, 2147483647]}
                        >
                            <div className="w-68 rounded-lg bg-white p-4 shadow-xl">
                                <div className="mb-2 flex items-start justify-between gap-3">
                                    <h3 className="font-bold text-xl">
                                        {
                                            selecionada
                                                .informacao
                                                .titulo
                                        }
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={fecharSelecao}
                                        className="
                                            text-lg
                                            text-gray-400
                                            hover:text-black
                                        "
                                        aria-label="Fechar"
                                    >
                                        ×
                                    </button>
                                </div>

                                <p className="leading-relaxed text-gray-600">
                                    {
                                        selecionada
                                            .informacao
                                            .descricao
                                    }
                                </p>
                            </div>
                        </Html>
                    )}
                </Suspense>

                <OrbitControls
                    target={origem}
                />
            </Canvas>
        </div>
    );
}