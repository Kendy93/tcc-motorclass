import type { ConfiguracaoModulo } from "../types/index";

export const configuracoesModulos: Record<string, ConfiguracaoModulo> = {
    "freios": {
        modelo3D: "/models/Caravan_details_BRAKES.glb",
        escala: 1,
        conteudo: "/src/content/texto/10_parando_o_carro.mdx",
        camera: {
            camerapos: [3, 1.1, 0],
            origem: [0, 0.25, 0],
        },
    },

    // "combustivel": {
    //     modelo3D: "/models/carburador.glb",

    //     conteudo: "/src/content/modules/combustivel.mdx",

    //     camera: {
    //         position: [3, 2, 3],
    //         fov: 45,
    //         minDistance: 2,
    //         maxDistance: 8,
    //     },
    // },

    // "ignicao": {
    //     modelo3D: "/models/ignicao.glb",

    //     conteudo: "/src/content/modules/ignicao.mdx",

    //     camera: {
    //         position: [4, 2.5, 4],
    //         fov: 50,
    //         minDistance: 2.5,
    //         maxDistance: 9,
    //     },
    // },
};