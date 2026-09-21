import { Link } from "react-router-dom";
import Visualizador3D from "../components/Visualizador3D";
import { BordaImagem } from "../components/BordaImagem";
import BotaoLink from "../components/BotaoLink";
import CarrosselModulos from "../components/CarrosselModulos";
import type { Modulo } from "../types";
import { api } from "../lib/api";
import { useEffect, useState } from "react";

export default function LandingPage() {
    const [modulos, setModulos] = useState<Modulo[]>([]);
    useEffect(() => {
        api.get("/api/modulos")
            .then((response) => {
                console.log("Módulos recebidos:", response.data);
                setModulos(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar módulos:", error);
            });
    }, []);

    return (
        <main>
            <div className="relative">
                {/* desativado o zoom para não conflitar com o hero */}
                <div className="sticky top-16 z-0 h-[900px]">
                    <Visualizador3D
                        modelo="/models/Caravan_landingpage.glb"
                        escala={1}
                        camerapos={[8, 3, 0]}
                        origem={[0, 1.3, 0]}
                        altura="900px"
                        zoom={false}
                    />
                </div>

                <section className="relative z-10 bg-mainlight/60 backdrop-blur-md">
                    <div className="mx-auto grid min-h-200 w-full max-w-7xl px-8 py-10 md:grid-cols-2 md:items-center">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-widest !text-blue1">
                                MOTORCLASS
                            </p>

                            <h1 className="text-4xl font-bold leading-tight">
                                Entenda como seu carro funciona.
                            </h1>
                            <p className="text-lg leading-relaxed text-gray-600">
                                Aprenda os principais sistemas de um automóvel,
                                focando no melhor tipo, os carros <span className="line-through">velhos</span> <span className="font-bold">antigos!</span>
                            </p>

                            <div className="mt-8 flex justify-center gap-4">
                                <BotaoLink to="/modulos" className="px-6 py-3">
                                    Começar a aprender
                                </BotaoLink>
                                <BotaoLink to="/sobre" className="px-6 py-3" variant="secondary">
                                    Saiba mais
                                </BotaoLink>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <BordaImagem
                                src="/images/landingpage.png" 
                                alt="Carro antigo com capô aberto."
                                maxWidth="max-w-md"
                            />
                        </div>

                    </div>
                </section>
            </div>

            <CarrosselModulos modulos={modulos} />

        </main>
    );
}