import type { ConfiguracaoModelo3D } from "../../types";
import Visu3DInterativo from "./Visu3DInterativo";
import Visu3DBase from "./Visu3DBase";

//===========================================================================

interface Visualizador3DProps {
    configuracao: ConfiguracaoModelo3D;
}

//===========================================================================

//escolhe entre o visualizador v1 (base) ou o v2 (interativo)
export default function Visualizador3D({
    configuracao,
}: Visualizador3DProps) {
    if (configuracao.interativo) {
        return (
            <Visu3DInterativo
                modelo={configuracao.modelo}
                escala={configuracao.escala}
                camerapos={configuracao.camera.camerapos}
                origem={configuracao.camera.origem}
                pecas={configuracao.pecas ?? {}}
            />
        );
    }

    return (
        <Visu3DBase
            modelo={configuracao.modelo}
            escala={configuracao.escala}
            camerapos={configuracao.camera.camerapos}
            origem={configuracao.camera.origem}
        />
    );
}