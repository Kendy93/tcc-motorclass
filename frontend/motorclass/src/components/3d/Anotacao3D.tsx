import { Billboard } from "@react-three/drei";
import Texto3D from "./Texto3D";

interface Anotacao3DProps {
    texto: string;
    posicao: [number, number, number];
}

//===========================================================================

export default function Anotacao3D({
    texto,
    posicao,
}: Anotacao3DProps) {
    return (
        <Billboard position={posicao} renderOrder={1000}>
            <Texto3D
                fontSize={0.05}
                color="white"
                anchorX="center"
                anchorY="middle"
                maxWidth={1.2}
                textAlign="center"
                lineHeight={1.2}
                outlineWidth={0.005}
                outlineColor="black"
                renderOrder={1000}
                depthOffset={-100}
            >
                {texto}
                <meshBasicMaterial
                    transparent
                    depthTest={false}
                    depthWrite={false}
                />
            </Texto3D>
        </Billboard>
    );
}