import { forwardRef, type ReactNode, useEffect, useLayoutEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

// @ts-ignore
import { Text as TroikaText } from "troika-three-text";

//===========================================================================

interface Texto3DProps {
    children: ReactNode;
    fontSize?: number;
    color?: THREE.ColorRepresentation;

    anchorX?: number | "left" | "center" | "right";
    anchorY?:
        | number
        | "top"
        | "top-baseline"
        | "middle"
        | "bottom-baseline"
        | "bottom";

    maxWidth?: number;
    textAlign?: "left" | "right" | "center" | "justify";
    lineHeight?: number | "normal";
    outlineWidth?: number | string;
    outlineColor?: THREE.ColorRepresentation;
    renderOrder?: number;
    depthOffset?: number;
    position?: THREE.Vector3 | [number, number, number];
    visible?: boolean;
}

//-------------------------------------------------------

const Texto3D = forwardRef<THREE.Object3D, Texto3DProps>(
    (
        {
            children,
            fontSize = 1,
            color = "white",
            anchorX = "center",
            anchorY = "middle",
            maxWidth,
            textAlign = "left",
            lineHeight = "normal",
            outlineWidth = 0,
            outlineColor = "black",
            renderOrder = 0,
            depthOffset = 0,
            position,
            visible = true,
        },
        ref,
    ) => {
        const invalidate = useThree((state) => state.invalidate);

        const texto = useMemo(() => {
            const mesh = new TroikaText();
            mesh.gpuAccelerateSDF = false;
            
            mesh.material.depthTest = false;
            mesh.material.depthWrite = false;
            mesh.renderOrder = 1000;

            return mesh;
        }, []);

        const conteudo = useMemo(() => {
            let resultado = "";
            const adicionarTexto = (node: ReactNode) => {
                if (typeof node === "string" || typeof node === "number") {
                    resultado += node;
                    return;
                }
                if (Array.isArray(node)) {
                    node.forEach(adicionarTexto);
                }
            };
            adicionarTexto(children);
            return resultado;
        }, [children]);

//-------------------------------------------------------

        useLayoutEffect(() => {
            texto.text = conteudo;
            texto.fontSize = fontSize;
            texto.color = color;
            texto.anchorX = anchorX;
            texto.anchorY = anchorY;
            texto.textAlign = textAlign;
            texto.lineHeight = lineHeight;
            texto.outlineWidth = outlineWidth;
            texto.outlineColor = outlineColor;
            texto.depthOffset = depthOffset;
            if (maxWidth !== undefined) {
                texto.maxWidth = maxWidth;
            }

            texto.material.depthTest = false;
            texto.material.depthWrite = false;
            texto.renderOrder = renderOrder;

            texto.gpuAccelerateSDF = false;
            texto.sync(() => {invalidate();});
        }, [
            texto,
            conteudo,
            fontSize,
            color,
            anchorX,
            anchorY,
            maxWidth,
            textAlign,
            lineHeight,
            outlineWidth,
            outlineColor,
            depthOffset,
            renderOrder,
            invalidate,
        ]);

        useEffect(() => {
            return () => {texto.dispose();};
        }, [texto]);

        return (
            <primitive
                ref={ref}
                object={texto}
                renderOrder={renderOrder}
                position={position}
                visible={visible}
            />
        );
    },
);

Texto3D.displayName = "Texto3D";

export default Texto3D;