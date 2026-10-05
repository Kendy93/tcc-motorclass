import type { ConfiguracaoModulo, ConfiguracaoModelo3D } from "../types/index";

import FundamentosTexto from "../content/texto/01_como_o_motor_funciona.mdx";
import FreiosTexto from "../content/texto/10_parando_o_carro.mdx";

export const configuracoesModulos: Record<string, ConfiguracaoModulo> = {
    "fundamentos":{
        conteudo: FundamentosTexto,
        modelos3D: {
            principal: {
                modelo: "/models/10_parando_o_carro/tcc_models-brakesMAIN.glb",
                escala: 1,
                interativo: false,
                camera: {
                    camerapos: [3.2, 1.1, 0],
                    origem: [0, 0.25, 0],
                },
            },
                configuracoesMotor: {
                modelo: "/models/01_como_o_motor_funciona/tcc-configuracoes_motor.glb",
                escala: 1,
                interativo: true,
                camera: {
                    camerapos: [5, 2, 5],
                    origem: [0, 0, 0],
                },
                pecas: {
                    f4: {
                        titulo: "Motor horizontal / deitado",
                        descricao:
                            "Como o nome diz, nesse motor os pistões ficam deitados. Existem 2 configurações usadas, o 'boxer', onde os pistões movem em direções diferentes, e o 'flat', onde eles se movem na mesma direção. Exemplos famosos são o Boxer-4 do Subaru Impreza, Flat-6 do Porsche 911, Flat-12 do Ferari Testarossa e o Boxer-4 do famoso Fusca.",
                    },
                    i6: {
                        titulo: "Motor em linha",
                        descricao:
                            "Possivelmente a configuração mais comum, onde os cilindros ficam um atrás do outro, formando uma linha. Nosso carro usa essa configuração, um I6. Também podemos citar a série K de motores 4 cilindros em linha da Honda, os 6 em linha da BMW, Toyota Supra e Nissan Skyline.",
                    },
                    radial: {
                        titulo: "Motor radial",
                        descricao:
                            "uma configuração raramente vista atualmente, principalmente em carros. Devido ao tamanho e disposição, costumava ser mais usada em aviões, como o R-4360 Wasp Major de 28 cilindros. Nos carros, o Monaco Trossi de 1935 usava um motor radial de 16 cilindros. Este modelo mostra um motor com 7 cilindros e apenas uma fileira.",
                    },
                    v8: {
                        titulo: "Motor em V",
                        descricao:
                            "Ganhou esse nome pois olhando de frente, os cilindros formam um V. Essa é a segunda configuração mais comum e, possivelmente, a mais amada. Quanto aos exemplares notáveis, temos o V6 Busso da Alfa Romeo, os V8 americanos, os V10 do Lexus LFA e do Porsche Carrera GT e também os V12 italianos.",
                    },
                    vr6: {
                        titulo: "Motor VR",
                        descricao:
                            "Essa é uma configuração usada praticamente apenas pelas marcas do grupo VW. É um tipo de V tão estreito que acaba usando apenas um cabeçote. Muito conhecido pelos VR6 usados nos VW Golf, Corrado e Passat.",
                    },
                    w12: {
                        titulo: "Motor em W",
                        descricao:
                            "Assim como o motor em V, este recebeu seu nome pelo formato quando visto de frente. Mais uma opção raramente usada em carros, principalmente neste formato com 3 bancadas de cilindros. Sua aplicação mais famosa é no Napier-Railton W12, um motor de avião que chegou a ser colocado em um carro de corrida em 1933, o Napier-Railton.",
                    },
                    wankel4: {
                        titulo: "Motor wankel / rotativo",
                        descricao:
                            "Diferente dos outros, não usa um pistão, em vez disso usa esses triângulos, chamados de rotores. Embora seja um conceito alemão, ele ficou famoso com os carros da Mazda, principalmente pelo seu uso no RX-7.",
                    },
                    wr16: {
                        titulo: "Motor em W (WR)",
                        descricao:
                            "Outro tipo de motor em W, aqui sua configuração é basicamente um motor VR em V. Também famosa pelo uso em carros do grupo VW, como nos W16 do Bugatti Veyron e Chiron, nos W8 do Volkswagem Phaeton e Passat, e também no W12 do Bentley Continental.",
                    },
                },
            },
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
        modelos3D: {
            principal: {
                modelo: "/models/10_parando_o_carro/tcc_models-brakesMAIN.glb",
                escala: 1,
                interativo: false,
                camera: {
                    camerapos: [3.2, 1.1, 0],
                    origem: [0, 0.25, 0],
                },
            },
                freioAnimacao: {
                modelo: "/models/10_parando_o_carro/tcc_models-freio_ANIMACAO.glb",
                escala: 1,
                interativo: false,
                camera: {
                    camerapos: [1.1, 0.6, -0.5],
                    origem: [0.25, 0.42, -0.1],
                },
            },
            cilindroMestre: {
                modelo: "/models/10_parando_o_carro/tcc_models-brake_booster.glb",
                escala: 1,
                interativo: true,
                camera: {
                    camerapos: [0.6, 0.2, 0.4],
                    origem: [0, 0.05, 0],
                },
                pecas: {
                    cilindro_mestre: {
                        titulo: "Cilindro mestre",
                        descricao:
                            "Dentro dele fica o pistão que ajuda a converter a força recebida do pedal em pressão hidráulica, empurrando o fluido pelas linhas de freio até as rodas.",
                    },
                    hidrovacuo: {
                        titulo: "Hidrovácuo",
                        descricao:
                            "Usa o vácuo do motor para aumentar a força aplicada ao sistema de freios, permitindo que o motorista precise fazer menos esforço ao pressionar o pedal.",
                    },
                    linhas_freio: {
                        titulo: "Linhas de freio",
                        descricao:
                            "São os tubos que conduzem o fluido pressurizado pelo sistema, levando a força gerada no cilindro mestre até os freios das rodas.",
                    },
                    pedal_freio: {
                        titulo: "Pedal do freio",
                        descricao:
                            "É a peça acionada pelo motorista para iniciar a frenagem. Ao ser pressionado, transmite a força até o cilindro mestre.",
                    },
                    reservatorio_freio: {
                        titulo: "Reservatório de fluido de freio",
                        descricao:
                            "Armazena o fluido usado pelo sistema hidráulico e mantém uma quantidade disponível para que a frenagem possa funcionar corretamente.",
                    },

                },
            },
            freioTambor: {
                modelo: "/models/10_parando_o_carro/tcc_models-drum_brakes.glb",
                escala: 1,
                interativo: true,
                camera: {
                    camerapos: [0.9, 0.1, 0.3],
                    origem: [0, 0, -0.08],
                },
                pecas: {
                    molas: {
                        titulo: "Molas de retorno",
                        descricao:
                            "Mantêm as sapatas afastadas do tambor quando o pedal de freio é solto, fazendo com que elas retornem à posição inicial.",
                    },
                    pistao: {
                        titulo: "Pistão",
                        descricao:
                            "É empurrado pela pressão do fluido de freio que chega pelas linhas e movimenta as sapatas, fazendo com que elas pressionem o tambor.",
                    },
                    regulador: {
                        titulo: "Regulador",
                        descricao:
                            "Permite ajustar a posição das sapatas para compensar o desgaste e manter a distância correta em relação ao tambor.",
                    },
                    sapatas: {
                        titulo: "Sapatas de freio",
                        descricao:
                            "São pressionadas contra a parte interna do tambor para criar o atrito responsável por diminuir a velocidade da roda.",
                    },
                    tambor: {
                        titulo: "Tambor de freio",
                        descricao:
                            "É a parte que gira junto com a roda. As sapatas são pressionadas contra sua superfície interna para gerar o atrito da frenagem.",
                    },
                    tampa_traseira: {
                        titulo: "Tampa traseira",
                        descricao:
                            "É a estrutura fixa onde ficam montados os principais componentes do freio a tambor, como as sapatas, molas e cilindro da roda.",
                    },
                    tambor_completo: {
                        titulo: "Freio a tambor",
                        descricao:
                            "Freio a tambor montado (sem o tambor em si para facilitar a visualização).",
                    },
                },
            },
            freioDisco: {
                modelo: "/models/10_parando_o_carro/tcc_models-disk_brakes.glb",
                escala: 1,
                interativo: true,
                camera: {
                    camerapos: [0.9, 0.1, 0.3],
                    origem: [0, 0.07, 0],
                },
                pecas: {
                    disco: {
                        titulo: "Disco de freio",
                        descricao:
                            "É a parte que gira junto com a roda. As pastilhas são pressionadas contra suas superfícies para gerar o atrito responsável pela frenagem.",
                    },
                    disco_completo: {
                        titulo: "Freio a disco",
                        descricao:
                            "Freio a disco completo.",
                    },
                    pastilha: {
                        titulo: "Pastilhas",
                        descricao:
                            "São pressionada contra o disco pela pinça, criando o atrito necessário para diminuir a velocidade da roda.",
                    },
                    pinca: {
                        titulo: "Pinças de freio",
                        descricao:
                            "Abriga os pistões e mantém as pastilhas posicionadas ao redor do disco. Ao receber pressão do fluido, seus pistões pressionam as pastilhas contra o disco.",
                    },
                    tampa_tras: {
                        titulo: "Tampa traseira",
                        descricao:
                            "É uma proteção localizada atrás do disco que ajuda a proteger o sistema contra sujeira, água e outros detritos.",
                    },
                },
            },
            freioCompleto: {
                modelo: "/models/10_parando_o_carro/tcc_models-full_brakes.glb",
                escala: 1,
                interativo: true,
                camera: {
                    camerapos: [3.2, 1.1, 0],
                    origem: [0, 0.25, 0],
                },
                pecas: {
                    disco_frente: {
                        titulo: "Freios a disco",
                        descricao:
                            "Conjunto superior usado na frente, onde a maior parte da frenagem acontece.",
                    },
                    tambor_tras: {
                        titulo: "Freios a tambor",
                        descricao:
                            "Sistema usado na traseira do nosso carro, onde a frenagem não é tão necessária.",
                    },
                },
            },
            sistemaCompleto: {
                modelo: "/models/10_parando_o_carro/tcc_models-full_brakes_COMPLETO.glb",
                escala: 1,
                interativo: true,
                camera: {
                    camerapos: [3.2, 1.1, 0],
                    origem: [0, 0.25, 0],
                },
                pecas: {
                    cilindro_mestre: {
                        titulo: "Cilindro mestre",
                        descricao:
                            "Dentro dele fica o pistão que ajuda a converter a força recebida do pedal em pressão hidráulica, empurrando o fluido pelas linhas de freio até as rodas.",
                    },
                    hidrovacuo: {
                        titulo: "Hidrovácuo",
                        descricao:
                            "Usa o vácuo do motor para aumentar a força aplicada ao sistema de freios, permitindo que o motorista precise fazer menos esforço ao pressionar o pedal.",
                    },
                    linhas_freio: {
                        titulo: "Linhas de freio",
                        descricao:
                            "São os tubos que conduzem o fluido pressurizado pelo sistema, levando a força gerada no cilindro mestre até os freios das rodas.",
                    },
                    pedal_freio: {
                        titulo: "Pedal do freio",
                        descricao:
                            "É a peça acionada pelo motorista para iniciar a frenagem. Ao ser pressionado, transmite a força até o cilindro mestre.",
                    },
                    reservatorio_freio: {
                        titulo: "Reservatório de fluido de freio",
                        descricao:
                            "Armazena o fluido usado pelo sistema hidráulico e mantém uma quantidade disponível para que a frenagem possa funcionar corretamente.",
                    },
                    molas: {
                        titulo: "Molas de retorno",
                        descricao:
                            "Mantêm as sapatas afastadas do tambor quando o pedal de freio é solto, fazendo com que elas retornem à posição inicial.",
                    },
                    pistao: {
                        titulo: "Pistão",
                        descricao:
                            "É empurrado pela pressão do fluido de freio que chega pelas linhas e movimenta as sapatas, fazendo com que elas pressionem o tambor.",
                    },
                    regulador: {
                        titulo: "Regulador",
                        descricao:
                            "Permite ajustar a posição das sapatas para compensar o desgaste e manter a distância correta em relação ao tambor.",
                    },
                    sapatas: {
                        titulo: "Sapatas de freio",
                        descricao:
                            "São pressionadas contra a parte interna do tambor para criar o atrito responsável por diminuir a velocidade da roda.",
                    },
                    tambor: {
                        titulo: "Tambor de freio",
                        descricao:
                            "É a parte que gira junto com a roda. As sapatas são pressionadas contra sua superfície interna para gerar o atrito da frenagem.",
                    },
                    tampa_traseira: {
                        titulo: "Tampa traseira",
                        descricao:
                            "É a estrutura fixa onde ficam montados os principais componentes do freio a tambor, como as sapatas, molas e cilindro da roda.",
                    },
                    tambor_completo: {
                        titulo: "Freio a tambor",
                        descricao:
                            "Freio a tambor montado (sem o tambor em si para facilitar a visualização).",
                    },
                    disco: {
                        titulo: "Disco de freio",
                        descricao:
                            "É a parte que gira junto com a roda. As pastilhas são pressionadas contra suas superfícies para gerar o atrito responsável pela frenagem.",
                    },
                    disco_completo: {
                        titulo: "Freio a disco",
                        descricao:
                            "Freio a disco completo.",
                    },
                    pastilha: {
                        titulo: "Pastilhas",
                        descricao:
                            "É pressionada contra o disco pela pinça, criando o atrito necessário para diminuir a velocidade da roda.",
                    },
                    pinca: {
                        titulo: "Pinças de freio",
                        descricao:
                            "Abriga os pistões e mantém as pastilhas posicionadas ao redor do disco. Ao receber pressão do fluido, seus pistões pressionam as pastilhas contra o disco.",
                    },
                    tampa_tras: {
                        titulo: "Tampa traseira",
                        descricao:
                            "É uma proteção localizada atrás do disco que ajuda a proteger o sistema contra sujeira, água e outros detritos.",
                    },
                },
            },
        },
        conteudo: FreiosTexto,
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