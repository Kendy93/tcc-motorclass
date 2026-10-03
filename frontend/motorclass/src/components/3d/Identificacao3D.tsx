import { Canvas, useFrame } from "@react-three/fiber";
import {Environment, OrbitControls, useGLTF} from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {useQuestionario} from "../Questionario";
import PontoInterativo3D from "./PontoInterativo3D";
import type {ConfiguracaoModelo3D, PerguntaIdentificacao3D} from "../../types";

//===========================================================================

interface Identificacao3DProps {
    id: string;
    configuracao: ConfiguracaoModelo3D;
    perguntas: PerguntaIdentificacao3D[];
}

interface ModeloIdentificacao3DProps {
    configuracao: ConfiguracaoModelo3D;
    objetoSelecionado: string | null;
    onSelecionar: (objeto: THREE.Object3D) => void;
}

//-------------------------------------------------------

function encontrarPeca(
    objeto: THREE.Object3D,
    pecas: Record<string, unknown>,
): THREE.Object3D | null {
    let atual: THREE.Object3D | null = objeto;
    while (atual) {
        if (pecas[atual.name]) {
            return atual;
        }
        atual = atual.parent;
    }
    return null;
}

//===========================================================================

function ModeloIdentificacao3D({
    configuracao,
    objetoSelecionado,
    onSelecionar,
}: ModeloIdentificacao3DProps) {
    const { scene } = useGLTF(configuracao.modelo);
    const modelo = useMemo(() => scene.clone(true), [scene]);

    const objetosInterativos = useMemo(() => {
        const encontrados: THREE.Object3D[] = [];
        if (!configuracao.pecas) {
            return encontrados;
        }
        modelo.traverse((objeto) => {
            if (configuracao.pecas && configuracao.pecas[objeto.name]) {
                encontrados.push(objeto);
            }
        });
        return encontrados;
    }, [
        modelo,
        configuracao.pecas,
    ]);

    return (
        <group scale={configuracao.escala}>
            <primitive object={modelo} />
            {objetosInterativos.map((objeto) => (
                <PontoInterativo3D
                    key={objeto.uuid}
                    objeto={objeto}
                    titulo={
                        configuracao.pecas?.[
                            objeto.name
                        ]?.titulo ?? ""
                    }
                    mostrarTitulo={false}
                    selecionado={objeto.name === objetoSelecionado}
                    onClick={() => {
                        const peca =
                            encontrarPeca(
                                objeto,
                                configuracao.pecas ?? {},
                            );

                        if (peca) {
                            onSelecionar(peca);
                        }
                    }}
                />
            ))}
        </group>
    );
}

export default function Identificacao3D({
    id,
    configuracao,
    perguntas,
}: Identificacao3DProps) {
    const {
        registrarResposta,
        enviado,
    } = useQuestionario();
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [objetoSelecionado, setObjetoSelecionado] = useState<THREE.Object3D | null>(null);
    const perguntasIniciais = useRef(perguntas).current;

    //reinicia
    useEffect(() => {
        if (!enviado) {
            setIndiceAtual(0);
            setObjetoSelecionado(null);
        }
    }, [enviado]);

    //verificação
    if (perguntas.length === 0) {
        return null;
    }
    const finalizada = indiceAtual >= perguntas.length;
    const perguntaAtual = perguntas[indiceAtual];

    const selecionarObjeto = (
        objeto: THREE.Object3D,
    ) => {
        if (enviado || finalizada) {
            return;
        }
        setObjetoSelecionado(objeto);
    };

    const confirmar = () => {
        if (!objetoSelecionado || !perguntaAtual || enviado) {
            return;
        }
        registrarResposta(
            perguntaAtual.codigo,
            objetoSelecionado.name,
        );
        setObjetoSelecionado(null);
        setIndiceAtual(
            (atual) => atual + 1,
        );
    };

//-------------------------------------------------------

    return (
        <section className="border-b border-gray-200 pb-8 last:border-b-0">
            <div>
                {!finalizada && (
                    <p className="text-xs font-medium uppercase tracking-wide !text-blue1">
                        Identificação 3D - Peça {indiceAtual + 1} de{" "} {perguntas.length}
                    </p>
                )}
            </div>

            {!finalizada ? (
                <>
                    <p className="mb-5 text-base font-medium leading-relaxed text-gray-900">
                        {perguntaAtual.pergunta}
                    </p>
                    <div className="mb-5 h-[600px] overflow-hidden rounded-xl bg-maindark">
                        <Canvas
                            camera={{
                                position: configuracao.camera.camerapos,
                                fov: 40,
                            }}
                        >
                            <ambientLight intensity={1} />
                            <color
                                attach="background"
                                args={["#2A84D7"]}
                            />
                            <Environment files="/hdri/cloudy_cliffside_road_2k.hdr"/>

                            <ModeloIdentificacao3D
                                configuracao={configuracao}
                                objetoSelecionado={objetoSelecionado?.name ?? null}
                                onSelecionar={selecionarObjeto}
                            />

                            <OrbitControls
                                enablePan={false}
                                target={configuracao.camera.origem}
                            />
                        </Canvas>
                    </div>

                    {/* seleção */}
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-sm">
                            {objetoSelecionado
                                ? "Peça selecionada. Confirme sua resposta."
                                : "Clique no ponto correspondente à peça."}
                        </p>
                        <button
                            type="button"
                            onClick={confirmar}
                            disabled={
                                !objetoSelecionado ||
                                enviado
                            }
                            className="
                                rounded-lg
                                bg-blue3
                                px-5
                                py-2.5
                                text-sm
                                font-medium
                                text-white
                                transition
                                hover:brightness-95
                                disabled:cursor-not-allowed
                                disabled:opacity-40
                            "
                        >
                            Confirmar
                        </button>
                    </div>
                </>
            ) : (
                <div className="rounded-lg bg-mainlight p-5">
                    <p className="font-medium !text-blue1">
                        Identificação concluída.
                    </p>
                    <p className="text-sm !text-gray-500">
                        Continue respondendo o restante do questionário.
                    </p>
                </div>
            )}
        </section>
    );
}