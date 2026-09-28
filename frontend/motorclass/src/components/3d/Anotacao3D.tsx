import { Billboard, Text } from "@react-three/drei";

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
            <Text
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
            </Text>
        </Billboard>
    );
}