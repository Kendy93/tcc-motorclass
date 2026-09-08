import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";

//componente para carregar o modelo
function Modelo3D() {
    const { scene } = useGLTF("/models/Caravan_details_BRAKES.glb");
    return <primitive object={scene} />;
}


export default function Visualizador3D() {
    return (
        <div className="h-[650px] w-full">
            <Canvas
                camera={{
                    position: [3, 1.1, 0],
                    fov: 40,
                }}
            >
                //iluminação genérica, com direção
                <Environment files="/hdri/cloudy_cliffside_road_2k.hdr" />
                //carrega o modelo
                <Modelo3D />
                //para rodar a câmera
                <OrbitControls target={[0, 0.25, 0]} />
            </Canvas>
        </div>
    );
}