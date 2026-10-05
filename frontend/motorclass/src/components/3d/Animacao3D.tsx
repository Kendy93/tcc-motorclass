import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Environment, OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";

import PontoInterativo3D from "./PontoInterativo3D";
import type { ConfiguracaoModelo3D, Animacao3DConfig, AnotacaoAnimacao3D } from "../../types";
import Anotacao3D from "./Anotacao3D";

//============================================================================

interface Animacao3DProps {
    configuracao: ConfiguracaoModelo3D;
    animacoes: Animacao3DConfig[];
    anotacoes?: AnotacaoAnimacao3D[];
}

interface ModeloAnimadoProps {
    configuracao: ConfiguracaoModelo3D;
    animacoes: Animacao3DConfig[];
    anotacoes?: AnotacaoAnimacao3D[];
    onAnimacao: (
        nome: string,
        titulo: string
    ) => void;
}

//============================================================================

function ModeloAnimado({
    configuracao,
    animacoes,
    onAnimacao,
}: ModeloAnimadoProps) {
    const { scene, animations } = useGLTF(configuracao.modelo);
    const { actions, names } = useAnimations(animations, scene);

    const [animacaoAtual, setAnimacaoAtual] = useState<string | null>(null);
    const [anotacoesAtivas, setAnotacoesAtivas] = useState<string[]>([]);

    const ultimaChaveAnotacoes = useRef("");

    //busca pelos gatilhos no modelo
    const gatilhos = useMemo(() => {
        const encontrados: Record<string, THREE.Object3D> = {};
        const nomesGatilhos = new Set(animacoes.map((animacao) => animacao.gatilho));
        scene.traverse((objeto) => {
            if (nomesGatilhos.has(objeto.name)) {
                encontrados[objeto.name] = objeto;
            }
        });
        return encontrados;
    }, [scene, animacoes]);

    //inicia a animacao
    const tocarAnimacao = (
        configuracaoAnimacao: Animacao3DConfig
    ) => {
        //busca a animação
        const action = actions[configuracaoAnimacao.animacao];
        //verifica se a animação existe e então para todas as outras
        if (!action) {
            console.warn(
                `Animação "${configuracaoAnimacao.animacao}" não encontrada.`,
                "Animações disponíveis:",
                names
            );
            return;
        }
        Object.values(actions).forEach(
            (outraAction) => {
                if (
                    outraAction &&
                    outraAction !== action
                ) {
                    outraAction.stop();
                }
            }
        );
        //reinicia a animação e toca 1 vez
        action.reset();
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
        action.timeScale = configuracaoAnimacao.velocidade ?? 1;
        action.fadeIn(0.15);
        action.play();
        setAnimacaoAtual(
            configuracaoAnimacao.animacao
        );

        ultimaChaveAnotacoes.current = "";
        setAnotacoesAtivas([]);
        onAnimacao(
            configuracaoAnimacao.animacao,
            configuracaoAnimacao.titulo
        );
    };

//-------------------------------------------------------

    //verifica qual animação deve tocar naquele momento, executa a cada frame
    useFrame(() => {
        //verifica se tem animação e paga a atual
        if (!animacaoAtual) {
            return;
        }
        const action = actions[animacaoAtual];
        if (!action) {
            return;
        }
        const tempo = action.time;
        //busca a configuração correspondente
        const configuracaoAnimacao =
            animacoes.find(
                (item) =>
                    item.animacao ===
                    animacaoAtual
            );
        if (!configuracaoAnimacao) {
            return;
        }
        //pega as anotações e decide qual está ativa de acordo com o tempo
        const anotacoes = configuracaoAnimacao.anotacoes ?? [];
        const idsAtivos =
            anotacoes
                .filter((anotacao) => tempo >= anotacao.inicio && tempo < anotacao.fim)
                .map((anotacao) => anotacao.id);
        const chaveAtual = idsAtivos.join("|");
        //verifica se mudou a anotação para atualizar (evita atualizar todo frame)
        if (chaveAtual !== ultimaChaveAnotacoes.current) {
            ultimaChaveAnotacoes.current = chaveAtual;
            setAnotacoesAtivas(idsAtivos);
        }
    });

//-------------------------------------------------------

    return (
        <>
            <primitive
                object={scene}
                scale={configuracao.escala}
            />
            //percorre os gatilhos para colocar os pontos
            {animacoes.map(
                (configuracaoAnimacao) => {
                    const objeto = gatilhos[configuracaoAnimacao.gatilho];
                    if (!objeto) {
                        console.warn(`Gatilho "${configuracaoAnimacao.gatilho}" não encontrado no modelo "${configuracao.modelo}".`);
                        return null;
                    }

                    return (
                        <PontoInterativo3D
                            tipo="animacao"
                            key={configuracaoAnimacao.gatilho}
                            objeto={objeto}
                            titulo={configuracaoAnimacao.titulo}
                            onClick={() => {
                                tocarAnimacao(
                                    configuracaoAnimacao
                                );
                            }}
                        />
                    );
                }
            )}
            //percorre as anotações para exibir
            {animacaoAtual && 
            animacoes.find((item) => item.animacao === animacaoAtual) 
                ?.anotacoes 
                ?.map((anotacao) => {
                        if (!anotacoesAtivas.includes(anotacao.id)) {
                            return null;
                        }
                        return (
                            <Anotacao3D
                                key={anotacao.id}
                                texto={anotacao.texto}
                                posicao={anotacao.posicao}
                            />
                        );
                    }
                )
            }
        </>
    );
}

//===========================================================================

export default function Animacao3D({
    configuracao,
    animacoes,
}: Animacao3DProps) {
    const [animacaoAtual, setAnimacaoAtual] = useState<string | null>(null);
    const [tituloAtual, setTituloAtual] = useState<string | null>(null);

    const handleAnimacao = (
        nome: string,
        titulo: string
    ) => {
        setAnimacaoAtual(nome);
        setTituloAtual(titulo);
    };

//-------------------------------------------------------

    return (
        <div className="
            my-10
            overflow-hidden
            rounded-xl
            border
            border-gray-200
            bg-white
            shadow-sm
        ">
            <div className="
                border-b
                border-gray-200
                px-6
                pt-5
            ">
                <h3 className="
                    text-lg
                    font-bold
                    text-blue3
                    mb-1
                ">
                    Observe o funcionamento
                </h3>
                <p>
                    Clique nos pontos do modelo
                    para visualizar diferentes
                    situações.
                </p>
            </div>

            <div className="h-[600px] w-full">
                <Canvas
                    camera={{
                        position:
                            configuracao.camera.camerapos,
                        fov: 45,
                    }}
                >
                    <ambientLight intensity={1} />

                    <Suspense fallback={null}>
                        <color
                            attach="background"
                            args={["#2A84D7"]}
                        />
                        <Environment files="/hdri/cloudy_cliffside_road_2k.hdr"/>

                        <ModeloAnimado
                            configuracao={configuracao}
                            animacoes={animacoes}
                            onAnimacao={handleAnimacao}
                        />
                    </Suspense>

                    <OrbitControls
                        target={
                            configuracao.camera.origem
                        }
                    />
                </Canvas>
            </div>

            <div className="
                border-t
                border-gray-200
                px-6
                py-4
            ">
                {animacaoAtual !== null && (
                    <div>
                        <p className="font-bold">
                            {tituloAtual}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}