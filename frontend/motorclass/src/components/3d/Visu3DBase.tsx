import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import "./configurarDraco";
import CanvasVisivel from "./CanvasVisivel";

//===========================================================================

//parâmetros e componente para carregar o modelo
interface Visualizador3DProps {
    modelo: string;
    escala?: number;
    camerapos?: [number, number, number];
    origem?: [number, number, number];
    altura?: string;
    zoom?: boolean;
}
function Modelo3D({ modelo, escala }: Visualizador3DProps) {
    const { scene } = useGLTF(modelo);
    return <primitive object={scene} scale={escala}/>;
}

//===========================================================================

export default function Visualizador3D({ 
    modelo, 
    //escala, 
    camerapos, 
    origem,
    altura = "650px", 
    zoom = true, 
}: Visualizador3DProps) {
    return (
        <div
            className="w-full"
            style={{ height: altura }}
        >
            <CanvasVisivel
                // cena estática: só redesenha quando a câmera se move
                frameloop="demand"
                camera={{
                    position: camerapos,
                    fov: 40,
                }}
            >
                //iluminação com HDRI
                <Environment files="/hdri/cloudy_cliffside_road_1k.hdr" />
                //carrega o modelo
                <Modelo3D modelo={modelo} />
                //para rodar a câmera
                <OrbitControls target={origem} enableZoom={zoom}/>
            </CanvasVisivel>
        </div>
    );
}