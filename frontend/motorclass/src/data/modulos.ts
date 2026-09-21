import type { ConfiguracaoModulo } from "../types/index";

import FundamentosTexto from "../content/texto/01_como_o_motor_funciona.mdx";
import FreiosTexto from "../content/texto/10_parando_o_carro.mdx";

export const configuracoesModulos: Record<string, ConfiguracaoModulo> = {
    "fundamentos":{
        modelo3D: "/models/Caravan_details_BRAKES.glb",
        escala: 1,
        conteudo: FundamentosTexto,
        camera: {
            camerapos: [3.2, 1.1, 0],
            origem: [0, 0.25, 0],
        },

        secoes: [
            {
                id: "como-o-motor-funciona",
                titulo: "Como o motor funciona",
                nivel: 1,
            },
            {
                id: "os-fundamentos",
                titulo: "Os fundamentos",
                nivel: 2,
            },
            {
                id: "os-ciclos-dos-motores",
                titulo: "Os ciclos dos motores",
                nivel: 2,
            },
            {
                id: "o-ciclo-de-quatro-tempos",
                titulo: "O ciclo de quatro tempos",
                nivel: 3,
            },
            {
                id: "o-ciclo-de-dois-tempos",
                titulo: "O ciclo de dois tempos",
                nivel: 3,
            },
            {
                id: "por-que-4-e-nao-2-tempos",
                titulo: "Por quê 4 e não 2 tempos?",
                nivel: 3,
            },
            {
                id: "alguns-termos-que-valem-ser-mencionados",
                titulo: "Alguns termos que valem ser mencionados",
                nivel: 3,
            },
            {
                id: "as-partes-que-fazem-isso-ser-possivel",
                titulo: "As partes que fazem isso ser possível",
                nivel: 2,
            },
            {
                id: "o-basico",
                titulo: "O básico",
                nivel: 3,
            },
            {
                id: "o-conjunto-rotativo",
                titulo: "O conjunto rotativo",
                nivel: 3,
            },
            {
                id: "valvulas-e-a-sincronia",
                titulo: "Válvulas e a sincronia",
                nivel: 3,
            },
            {
                id: "os-diferentes-tipos-de-motores",
                titulo: "Os diferentes tipos de motores",
                nivel: 2,
            },
            {
                id: "tamanho-e-layout",
                titulo: "Tamanho e layout",
                nivel: 3,
            },
            {
                id: "cabecotes",
                titulo: "Cabeçotes",
                nivel: 3,
            },
            {
                id: "valvulas",
                titulo: "Válvulas",
                nivel: 3,
            },
            {
                id: "virabrequim",
                titulo: "Virabrequim",
                nivel: 3,
            },
            {
                id: "problemas-comuns",
                titulo: "Problemas comuns",
                nivel: 2,
            },
        ],
    },
    "freios": {
        modelo3D: "/models/Caravan_details_BRAKES.glb",
        escala: 1,
        conteudo: FreiosTexto,
        camera: {
            camerapos: [3.2, 1.1, 0],
            origem: [0, 0.25, 0],
        },

        secoes: [
            {
                id: "parando-o-carro",
                titulo: "Parando o carro",
                nivel: 1,
            },
            {
                id: "transmitindo-a-força",
                titulo: "Transmitindo a força",
                nivel: 2,
            },
            {
                id: "gerando-o-atrito",
                titulo: "Gerando o atrito",
                nivel: 2,
            },
            {
                id: "freio-a-tambor",
                titulo: "Freio a tambor",
                nivel: 3,
            },
            {
                id: "freio-a-disco",
                titulo: "Freio a disco",
                nivel: 3,
            },
            {
                id: "voltando-para-a-nossa-realidade",
                titulo: "Voltando para a nossa realidade",
                nivel: 2,
            },
            {
                id: "parando-ainda-mais-o-carro",
                titulo: "Parando ainda mais o carro",
                nivel: 2,
            },
            {
                id: "mas-e-o-arrasto",
                titulo: "Mas e o arrasto",
                nivel: 3,
            },
            {
                id: "os-problemas-não-param",
                titulo: "Os problemas não param",
                nivel: 2,
            },
        ],
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