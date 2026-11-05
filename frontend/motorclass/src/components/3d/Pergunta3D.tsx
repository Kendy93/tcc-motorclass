import { Suspense, useState } from "react";
import { type ThreeEvent } from "@react-three/fiber";
import {
    Environment,
    OrbitControls,
    useGLTF,
} from "@react-three/drei";
import "./configurarDraco";
import CanvasVisivel from "./CanvasVisivel";
import * as THREE from "three";

import PontoInterativo3D from "./PontoInterativo3D";

import type { ConfiguracaoModelo3D } from "../../types";
import type { PecaSelecionada } from "../../types";

//===========================================================================

interface Pergunta3DProps {
    configuracao: ConfiguracaoModelo3D;
    pergunta: string;
    resposta: string;
}

interface ModeloPerguntaProps {
    configuracao: ConfiguracaoModelo3D;
    onSelecionar: (peca: PecaSelecionada) => void;
}

//-------------------------------------------------------

function ModeloPergunta({
    configuracao,
    onSelecionar,
}: ModeloPerguntaProps) {
    const { scene } = useGLTF(configuracao.modelo);
    const pecas = configuracao.pecas ?? {};
    //const objetosInterativos = Object.values(scene.children);
    
    //recebe um objeto e tenta descobrir se é uma das peças
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

    //tratamento dos cliques
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

    return (
        <>
            <primitive
                object={scene}
                scale={configuracao.escala}
                onClick={clicar}
            />

            //pega cada entrada da configuração e vira InformacaoPeca para os pontos
            {Object.entries(pecas).map(([nome, informacao]) => {
                let objeto: THREE.Object3D | null = null;
                scene.traverse((item) => {
                    if (item.name === nome) {
                        objeto = item;
                    }
                });
                if (!objeto) {
                    return null;
                }
                return (
                    <PontoInterativo3D
                        key={nome}
                        objeto={objeto}
                        titulo={informacao.titulo}
                        mostrarTitulo={false}
                        onClick={() => {
                            const posicao = new THREE.Vector3();
                            objeto!.getWorldPosition(posicao);
                            onSelecionar({
                                objeto: objeto!,
                                posicao,
                                informacao,
                            });
                        }}
                    />
                );
            })}
        </>
    );
}

//===========================================================================

export default function Pergunta3D({
    configuracao,
    pergunta,
    resposta,
}: Pergunta3DProps) {
    const [resultado, setResultado] = useState<boolean | null>(null);
    const [pecaSelecionada, setPecaSelecionada] = useState<PecaSelecionada | null>(null);
    
    const responder = (peca: PecaSelecionada) => {
        setPecaSelecionada(peca);
        const correta =
            peca.objeto.name === resposta;
        setResultado(correta);
    };

    return (
        <div className="my-10 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <div className="px-6 pt-5">
                <h3 className="mb-2 text-lg font-semibold text-blue3">
                    {pergunta}
                </h3>
                <p>
                    Clique na peça que você considera correta.
                </p>
            </div>

            <div className="h-[600px] w-full">
                <CanvasVisivel
                    camera={{
                        position: configuracao.camera.camerapos,
                        fov: 45,
                    }}
                >
                    <ambientLight intensity={1} />

                    <Suspense fallback={null}>
                        <color
                            attach="background"
                            args={["#2A84D7"]}
                        />
                        <Environment files="/hdri/cloudy_cliffside_road_1k.hdr" />
                        <ModeloPergunta
                            configuracao={configuracao}
                            onSelecionar={responder}
                        />
                    </Suspense>

                    <OrbitControls
                        target={configuracao.camera.origem}
                    />
                </CanvasVisivel>
            </div>

            <div className="px-6 py-4">
                {resultado === null && (
                    <p>
                        Selecione uma peça no modelo.
                    </p>
                )}

                {resultado === true && pecaSelecionada &&(
                    <div className="rounded-lg bg-green-50 px-4 py-2">
                        <p className="font-semibold text-green-800">
                            ✓ Correto!
                        </p>
                        <p className="text-green-700">
                            {pecaSelecionada.informacao.titulo} - {pecaSelecionada.informacao.descricao}
                        </p>
                    </div>
                )}
                {resultado === false && (
                    <div className="rounded-lg bg-red-50 px-4 py-2">
                        <p className="font-bold">
                            ✗ Essa não é a peça correta...
                        </p>
                        <p>
                            Tente novamente.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
}