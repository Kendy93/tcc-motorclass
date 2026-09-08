import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";

//parâmetros e componente para carregar o modelo
interface Visualizador3DProps {
    modelo: string;
    escala?: number;
    camerapos?: [number, number, number];
    origem?: [number, number, number];
}
function Modelo3D({ modelo, escala }: Visualizador3DProps) {
    const { scene } = useGLTF(modelo);
    return <primitive object={scene} scale={escala}/>;
}


export default function Visualizador3D({ modelo, escala, camerapos, origem  }: Visualizador3DProps) {
    return (
        <div className="h-[650px] w-full">
            <Canvas
                camera={{
                    position: camerapos,
                    fov: 40,
                }}
            >
                //iluminação genérica, com direção
                <Environment files="/hdri/cloudy_cliffside_road_2k.hdr" />
                //carrega o modelo
                <Modelo3D modelo={modelo} />
                //para rodar a câmera
                <OrbitControls target={origem} />
            </Canvas>
        </div>
    );
}