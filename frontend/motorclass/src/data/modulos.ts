import type { ConfiguracaoModulo } from "../types/index";

import FundamentosTexto from "../content/texto/01_como_o_motor_funciona.mdx";
import AdmissaoEscape from "../content/texto/02_entrada_e_saida_do_ar.mdx";
import Combustivel from "../content/texto/03_o_caminho_do_combustivel.mdx";
import Ignicao from "../content/texto/04_a_faisca_do_motor.mdx";
import Temperatura from "../content/texto/05_controlando_a_temperatura.mdx";
import Lubrificacao from "../content/texto/06_lubrificacao_e_protecao.mdx";
import Eletrica from "../content/texto/07_energia_eletrica_no_veiculo.mdx";
import Potencia from "../content/texto/08_aumentando_a_potencia.mdx";
import Transmissao from "../content/texto/09_como_a_potencia_chega_ao_asfalto.mdx";
import FreiosTexto from "../content/texto/10_parando_o_carro.mdx";
import SuspensaoDirecao from "../content/texto/11_suspensao_e_direcao.mdx";

export const configuracoesModulos: Record<string, ConfiguracaoModulo> = {
    "fundamentos":{
        conteudo: FundamentosTexto,
        modelos3D: {
            principal: {
                modelo: "/models/01_como_o_motor_funciona/tcc-fundamentos_motor.glb",
                escala: 1,
                interativo: false,
                camera: {
                    camerapos: [-1.5, 0.8, 1.4],
                    origem: [0, 0.5, 0],
                },
            },
                motorAnimacao: {
                modelo: "/models/01_como_o_motor_funciona/tcc-animacao-ciclos.glb",
                escala: 1,
                interativo: false,
                camera: {
                    camerapos: [0.5, 0.1, 0.1],
                    origem: [0, 0, 0],
                },
            },
            configuracoesMotor: {
                modelo: "/models/01_como_o_motor_funciona/tcc-configuracoes_motor.glb",
                escala: 1,
                interativo: true,
                camera: {
                    camerapos: [5, 2, 5],
                    origem: [0, -0.3, 0],
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
            motor: {
                modelo: "/models/01_como_o_motor_funciona/tcc-fundamentos_motor.glb",
                escala: 1,
                interativo: true,
                camera: {
                    camerapos: [-1.5, 0.8, 1.4],
                    origem: [0, 0.5, 0],
                },
                pecas: {
                    balancim: {
                        titulo: "Balancim",
                        descricao:
                            "Funciona como uma alavanca que transmite o movimento das varetas às válvulas. Ao ser acionado, pressiona a haste da válvula para abri-la, enquanto a mola é responsável por retorná-la à posição fechada.",
                    },

                    bobina: {
                        titulo: "Bobina de ignição",
                        descricao:
                            "Transforma a baixa tensão elétrica da bateria em uma tensão elevada, necessária para produzir a centelha nas velas de ignição. Essa centelha inicia a combustão da mistura de ar e combustível dentro dos cilindros.",
                    },

                    cabecote: {
                        titulo: "Cabeçote",
                        descricao:
                            "Fecha a parte superior dos cilindros e abriga componentes importantes, como as válvulas, as velas de ignição e os dutos de admissão e escape. Sua estrutura também participa da formação das câmaras de combustão, onde ocorre a queima da mistura de ar e combustível.",
                    },

                    carburador: {
                        titulo: "Carburador",
                        descricao:
                            "Mistura o ar e o combustível em proporções adequadas para alimentar o motor. Seu funcionamento influencia a quantidade de mistura admitida pelos cilindros de acordo com as condições de operação do motor.",
                    },

                    carcaca_valvula_term: {
                        titulo: "Carcaça da válvula termostática",
                        descricao:
                            "Aloja a válvula termostática e conecta esse componente ao circuito de arrefecimento. A válvula controla a passagem do líquido de arrefecimento de acordo com a temperatura do motor, ajudando a manter sua temperatura de funcionamento adequada.",
                    },

                    coletor_admissao: {
                        titulo: "Coletor de admissão",
                        descricao:
                            "Conduz e distribui a mistura de ar e combustível proveniente do carburador para os cilindros do motor. Seu formato influencia a distribuição da mistura e o fluxo de admissão.",
                    },

                    coletor_escape: {
                        titulo: "Coletor de escape",
                        descricao:
                            "Reúne os gases resultantes da combustão que saem dos cilindros e os conduz para o restante do sistema de escapamento. Seu funcionamento permite a expulsão dos gases queimados, preparando os cilindros para um novo ciclo.",
                    },

                    mola_valvula: {
                        titulo: "Mola da válvula",
                        descricao:
                            "Mantém a válvula pressionada contra seu assento quando ela está fechada, ajudando a vedar a câmara de combustão. Também garante que a válvula retorne à posição fechada após ser aberta pelo mecanismo de acionamento.",
                    },

                    panela: {
                        titulo: "Panela do filtro de ar",
                        descricao:
                            "Abriga o filtro responsável por reter poeira e outras partículas presentes no ar admitido pelo motor. Dessa forma, ajuda a fornecer ar limpo ao carburador, reduzindo a entrada de impurezas no motor.",
                    },

                    tampa_valvula: {
                        titulo: "Tampa de válvulas",
                        descricao:
                            "Cobre a parte superior do cabeçote, protegendo o conjunto de válvulas e balancins. Também ajuda a conter o óleo lubrificante que circula nessa região, evitando vazamentos quando suas vedações estão em boas condições.",
                    },

                    valvulas: {
                        titulo: "Válvulas de admissão e escape",
                        descricao:
                            "Controlam a entrada da mistura de ar e combustível e a saída dos gases queimados dos cilindros. As válvulas de admissão permitem o enchimento dos cilindros, enquanto as de escape possibilitam a expulsão dos gases após a combustão.",
                    },

                    varetas: {
                        titulo: "Varetas de acionamento",
                        descricao:
                            "Transmitem o movimento dos tuchos, acionados pelo comando de válvulas, até os balancins. Esse mecanismo permite que as válvulas sejam abertas no momento adequado do ciclo de funcionamento do motor.",
                    },

                    velas: {
                        titulo: "Velas de ignição",
                        descricao:
                            "Produzem uma centelha elétrica dentro da câmara de combustão para inflamar a mistura comprimida de ar e combustível. A combustão resultante libera a energia que impulsiona os pistões e permite o funcionamento do motor.",
                    },

                    aneis: {
                        titulo: "Anéis do pistão",
                        descricao:
                            "Ficam instalados nas ranhuras ao redor do pistão e desempenham funções importantes na vedação dos cilindros. Ajudam a impedir que os gases da combustão escapem para o cárter, controlam o excesso de óleo nas paredes dos cilindros e contribuem para transferir calor do pistão para o cilindro.",
                    },

                    biela: {
                        titulo: "Biela",
                        descricao:
                            "Conecta o pistão ao virabrequim, transmitindo a força gerada pela combustão. Em conjunto com esses componentes, transforma o movimento alternativo dos pistões em movimento rotacional, utilizado para produzir o torque do motor.",
                    },

                    bloco: {
                        titulo: "Bloco do motor",
                        descricao:
                            "É a estrutura principal do motor, onde ficam alojados os cilindros e diversos componentes internos. Também pode conter galerias para a circulação do óleo lubrificante e do líquido de arrefecimento, além de servir como base para a montagem de outros componentes.",
                    },

                    cabo_vela: {
                        titulo: "Cabo de vela",
                        descricao:
                            "Conduz a alta tensão elétrica proveniente do sistema de ignição até a vela correspondente. Essa energia permite produzir a centelha necessária para iniciar a combustão da mistura de ar e combustível dentro do cilindro.",
                    },

                    distribuidor: {
                        titulo: "Distribuidor de ignição",
                        descricao:
                            "Distribui a alta tensão gerada pela bobina para as velas de ignição, seguindo a ordem de funcionamento dos cilindros. Seu mecanismo também permite sincronizar a distribuição das centelhas com o ciclo do motor, garantindo que a mistura seja inflamada no momento adequado.",
                    },

                    filtro_oleo: {
                        titulo: "Filtro de óleo",
                        descricao:
                            "Retém partículas e impurezas presentes no óleo lubrificante antes que elas possam circular pelo motor e provocar desgaste nos componentes. Dessa forma, contribui para preservar as superfícies internas e manter a lubrificação adequada.",
                    },

                    pistao: {
                        titulo: "Pistão",
                        descricao:
                            "Movimenta-se para cima e para baixo dentro do cilindro, comprimindo a mistura de ar e combustível e recebendo a força gerada pela combustão. Essa força é transmitida à biela e, em seguida, ao virabrequim, contribuindo para a produção do movimento rotacional do motor.",
                    },

                    polias: {
                        titulo: "Polias do motor",
                        descricao:
                            "Transmitem o movimento rotacional entre o motor e componentes auxiliares por meio de correias. Dependendo da configuração, podem acionar equipamentos como o alternador e a bomba de água, permitindo seu funcionamento enquanto o motor está em operação.",
                    },

                    bomba_combustivel: {
                        titulo: "Bomba de combustível",
                        descricao:
                            "Responsável por transportar o combustível do tanque até o sistema de alimentação do motor. Em motores carburados, fornece combustível ao carburador na pressão e vazão necessárias para manter o funcionamento do motor em diferentes condições de operação.",
                    },

                    bronzinas: {
                        titulo: "Bronzinas",
                        descricao:
                            "São revestimentos metálicos instalados entre os eixos do motor e seus mancais, reduzindo o atrito durante a rotação. Com a presença de uma película de óleo lubrificante entre as superfícies, permitem que componentes como o virabrequim girem com menor desgaste e suportem os esforços gerados pelo funcionamento do motor.",
                    },

                    carter: {
                        titulo: "Cárter de óleo",
                        descricao:
                            "Localizado na parte inferior do motor, funciona como reservatório do óleo lubrificante. O óleo retorna ao cárter após circular pelos componentes internos e é novamente aspirado pela bomba de óleo, dando continuidade ao ciclo de lubrificação.",
                    },

                    comando: {
                        titulo: "Comando de válvulas",
                        descricao:
                            "Controla o momento em que as válvulas de admissão e escape são abertas e fechadas. Possui ressaltos, chamados cames, que transformam o movimento de rotação do eixo em movimentos que acionam o mecanismo das válvulas, sincronizando a admissão da mistura e a expulsão dos gases com o ciclo do motor.",
                    },

                    mancal: {
                        titulo: "Mancal",
                        descricao:
                            "Serve de apoio e sustentação para eixos rotativos, como o virabrequim, ajudando a mantê-los alinhados durante o funcionamento do motor. Em conjunto com as bronzinas e a lubrificação, suporta os esforços mecânicos e permite a rotação do eixo com atrito reduzido.",
                    },

                    virabrequim: {
                        titulo: "Virabrequim",
                        descricao:
                            "Transforma o movimento alternativo dos pistões em movimento rotacional por meio da ligação com as bielas. Durante o funcionamento do motor, recebe as forças produzidas pela combustão e transmite o torque gerado para o sistema de transmissão, que o utiliza para movimentar o veículo.",
                    },

                    motor:{
                        titulo: "Motor completo",
                        descricao:
                            "Esse é o motor utilizado pelo nosso carro. Ele é um 6 cilindros em linha, com cabeçote convencional, utiliza varetas (pushrod) nas válvulas e possui aproximadamente 4 litros de capacidade, gerando em torno de 135 cavalos.",
                    },
                },
            },
            basico: {
                modelo: "/models/01_como_o_motor_funciona/tcc-fundamentos-basico.glb",
                escala: 1,
                interativo: true,
                camera: {
                    camerapos: [1.2, 0.6, 1.2],
                    origem: [0, 0.2, 0],
                },
                pecas: {
                    cabecote: {
                        titulo: "Cabeçote",
                        descricao:
                            "Fecha a parte superior dos cilindros e abriga componentes importantes, como as válvulas, as velas de ignição e os dutos de admissão e escape. Sua estrutura também participa da formação das câmaras de combustão, onde ocorre a queima da mistura de ar e combustível.",
                    },
                    carter: {
                        titulo: "Cárter de óleo",
                        descricao:
                            "Localizado na parte inferior do motor, funciona como reservatório do óleo lubrificante. O óleo retorna ao cárter após circular pelos componentes internos e é novamente aspirado pela bomba de óleo, dando continuidade ao ciclo de lubrificação.",
                    },
                    bloco: {
                        titulo: "Bloco do motor",
                        descricao:
                            "É a estrutura principal do motor, onde ficam alojados os cilindros e diversos componentes internos. Também pode conter galerias para a circulação do óleo lubrificante e do líquido de arrefecimento, além de servir como base para a montagem de outros componentes.",
                    },

                },
            },
            rotativo: {
                modelo: "/models/01_como_o_motor_funciona/tcc-fundamentos-rotativo.glb",
                escala: 1,
                interativo: true,
                camera: {
                    camerapos: [1, 0.4, 1],
                    origem: [0, 0.2, 0],
                },
                pecas: {
                    aneis: {
                        titulo: "Anéis do pistão",
                        descricao:
                            "Ficam instalados nas ranhuras ao redor do pistão e desempenham funções importantes na vedação dos cilindros. Ajudam a impedir que os gases da combustão escapem para o cárter, controlam o excesso de óleo nas paredes dos cilindros e contribuem para transferir calor do pistão para o cilindro.",
                    },
                    biela: {
                        titulo: "Biela",
                        descricao:
                            "Conecta o pistão ao virabrequim, transmitindo a força gerada pela combustão. Em conjunto com esses componentes, transforma o movimento alternativo dos pistões em movimento rotacional, utilizado para produzir o torque do motor.",
                    },
                    pistao: {
                        titulo: "Pistão",
                        descricao:
                            "Movimenta-se para cima e para baixo dentro do cilindro, comprimindo a mistura de ar e combustível e recebendo a força gerada pela combustão. Essa força é transmitida à biela e, em seguida, ao virabrequim, contribuindo para a produção do movimento rotacional do motor.",
                    },
                    bronzinas: {
                        titulo: "Bronzinas",
                        descricao:
                            "São revestimentos metálicos instalados entre os eixos do motor e seus mancais, reduzindo o atrito durante a rotação. Com a presença de uma película de óleo lubrificante entre as superfícies, permitem que componentes como o virabrequim girem com menor desgaste e suportem os esforços gerados pelo funcionamento do motor.",
                    },
                    virabrequim: {
                        titulo: "Virabrequim",
                        descricao:
                            "Transforma o movimento alternativo dos pistões em movimento rotacional por meio da ligação com as bielas. Durante o funcionamento do motor, recebe as forças produzidas pela combustão e transmite o torque gerado para o sistema de transmissão, que o utiliza para movimentar o veículo.",
                    },
                },
            },
            valvulas: {
                modelo: "/models/01_como_o_motor_funciona/tcc-fundamentos-valvulas.glb",
                escala: 1,
                interativo: true,
                camera: {
                    camerapos: [1, 0.4, 1],
                    origem: [0, 0.2, 0.2],
                },
                pecas: {
                    balancim: {
                        titulo: "Balancim",
                        descricao:
                            "Funciona como uma alavanca que transmite o movimento das varetas às válvulas. Ao ser acionado, pressiona a haste da válvula para abri-la, enquanto a mola é responsável por retorná-la à posição fechada.",
                    },
                    mola_valvula: {
                        titulo: "Mola da válvula",
                        descricao:
                            "Mantém a válvula pressionada contra seu assento quando ela está fechada, ajudando a vedar a câmara de combustão. Também garante que a válvula retorne à posição fechada após ser aberta pelo mecanismo de acionamento.",
                    },
                    valvulas: {
                        titulo: "Válvulas de admissão e escape",
                        descricao:
                            "Controlam a entrada da mistura de ar e combustível e a saída dos gases queimados dos cilindros. As válvulas de admissão permitem o enchimento dos cilindros, enquanto as de escape possibilitam a expulsão dos gases após a combustão.",
                    },
                    varetas: {
                        titulo: "Varetas de acionamento",
                        descricao:
                            "Transmitem o movimento dos tuchos, acionados pelo comando de válvulas, até os balancins. Esse mecanismo permite que as válvulas sejam abertas no momento adequado do ciclo de funcionamento do motor.",
                    },
                    polias: {
                        titulo: "Polias do motor",
                        descricao:
                            "Transmitem o movimento rotacional entre o motor e componentes auxiliares por meio de correias. Dependendo da configuração, podem acionar equipamentos como o alternador e a bomba de água, permitindo seu funcionamento enquanto o motor está em operação.",
                    },
                    comando: {
                        titulo: "Comando de válvulas",
                        descricao:
                            "Controla o momento em que as válvulas de admissão e escape são abertas e fechadas. Possui ressaltos, chamados cames, que transformam o movimento de rotação do eixo em movimentos que acionam o mecanismo das válvulas, sincronizando a admissão da mistura e a expulsão dos gases com o ciclo do motor.",
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
                id: "por-quê-4-e-não-2-tempos",
                titulo: "Por quê 4 e não 2 tempos?",
                nivel: 3,
            },
            {
                id: "alguns-termos-que-valem-ser-mencionados",
                titulo: "Alguns termos que valem ser mencionados",
                nivel: 3,
            },
            {
                id: "as-partes-que-fazem-isso-ser-possível",
                titulo: "As partes que fazem isso ser possível",
                nivel: 2,
            },
            {
                id: "o-básico",
                titulo: "O básico",
                nivel: 3,
            },
            {
                id: "o-conjunto-rotativo",
                titulo: "O conjunto rotativo",
                nivel: 3,
            },
            {
                id: "válvulas-e-a-sincronia",
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
                id: "cabeçotes",
                titulo: "Cabeçotes",
                nivel: 3,
            },
            {
                id: "válvulas",
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
    "ar":{
        conteudo: AdmissaoEscape,
        modelos3D: {
            principal: {
                modelo: "/models/tcc_model-landingpage.glb",
                escala: 1,
                interativo: false,
                camera: {
                    camerapos: [8, 3, 0],
                    origem: [0, 1.3, 0],
                },
            },
        },
        secoes: [
            {
                id: "entrada-e-saida-do-ar",
                titulo: "Entrada e saída do ar",
                nivel: 1,
            },
            {
                id: "uma-aula-de-física",
                titulo: "Uma aula de física",
                nivel: 2,
            },
            {
                id: "diferenças-de-pressão",
                titulo: "Diferenças de pressão",
                nivel: 3,
            },
            {
                id: "temperatura-e-altitude",
                titulo: "Temperatura e altitude",
                nivel: 3,
            },
            {
                id: "capturando-o-ar",
                titulo: "Capturando o ar",
                nivel: 2,
            },
            {
                id: "limpando-as-impurezas",
                titulo: "Limpando as impurezas",
                nivel: 3,
            },
            {
                id: "onde-a-mágica-acontece",
                titulo: "Onde a mágica acontece",
                nivel: 3,
            },
            {
                id: "expulsando-o-ar",
                titulo: "Expulsando o ar",
                nivel: 2,
            },
            {
                id: "a-porta-de-saída",
                titulo: "A porta de saída",
                nivel: 3,
            },
            {
                id: "fazendo-barulho-ou-não",
                titulo: "Fazendo barulho, ou não",
                nivel: 3,
            },
            {
                id: "problemas-respiratórios",
                titulo: "Problemas respiratórios",
                nivel: 2,
            },
        ],
    },
    "combustivel":{
        conteudo: Combustivel,
        modelos3D: {
            principal: {
                modelo: "/models/tcc_model-landingpage.glb",
                escala: 1,
                interativo: false,
                camera: {
                    camerapos: [8, 3, 0],
                    origem: [0, 1.3, 0],
                },
            },
        },
        secoes: [
            {
                id: "o-caminho-do-combustível",
                titulo: "O caminho do combustível",
                nivel: 1,
            },
            {
                id: "como-o-combustível-chega-ao-motor",
                titulo: "Como o combustível chega ao motor",
                nivel: 2,
            },
            {
                id: "onde-a-mágica-acontece",
                titulo: "Onde a mágica acontece",
                nivel: 2,
            },
            {
                id: "o-efeito-venturi",
                titulo: "O efeito Venturi",
                nivel: 3,
            },
            {
                id: "as-partes-do-carburador",
                titulo: "As partes do carburador",
                nivel: 3,
            },
            {
                id: "alimentando-o-motor",
                titulo: "Alimentando o motor",
                nivel: 2,
            },
            {
                id: "os-combustíveis",
                titulo: "Os combustíveis",
                nivel: 3,
            },
            {
                id: "e-se-a-mistura-não-estiver-certa",
                titulo: "E se a mistura não estiver certa",
                nivel: 3,
            },
            {
                id: "um-pouco-da-injeção-eletrônica",
                titulo: "Um pouco da injeção eletrônica",
                nivel: 3,
            },
            {
                id: "problemas-na-alimentação",
                titulo: "Problemas na alimentação",
                nivel: 2,
            },
        ],
    },
    "ignicao":{
        conteudo: Ignicao,
        modelos3D: {
            principal: {
                modelo: "/models/tcc_model-landingpage.glb",
                escala: 1,
                interativo: false,
                camera: {
                    camerapos: [8, 3, 0],
                    origem: [0, 1.3, 0],
                },
            },
        },
        secoes: [
            {
                id: "a-faísca-do-motor",
                titulo: "A faísca do motor",
                nivel: 1,
            },
            {
                id: "por-que-uma-faísca",
                titulo: "Por que uma faísca?",
                nivel: 2,
            },
            {
                id: "gerando-a-faísca",
                titulo: "Gerando a faísca",
                nivel: 2,
            },
            {
                id: "a-vela-de-ignição",
                titulo: "A vela de ignição",
                nivel: 3,
            },
            {
                id: "voltando-no-tempo",
                titulo: "Voltando no tempo?",
                nivel: 3,
            },
            {
                id: "avançando-no-tempo",
                titulo: "Avançando no tempo",
                nivel: 3,
            },
            {
                id: "problemas-com-a-faísca",
                titulo: "Problemas com a faísca",
                nivel: 2,
            },
        ],
    },
    "arrefecimento":{
        conteudo: Temperatura,
        modelos3D: {
            principal: {
                modelo: "/models/tcc_model-landingpage.glb",
                escala: 1,
                interativo: false,
                camera: {
                    camerapos: [8, 3, 0],
                    origem: [0, 1.3, 0],
                },
            },
        },
        secoes: [
            {
                id: "controlando-a-temperatura",
                titulo: "Controlando a temperatura",
                nivel: 1,
            },
            {
                id: "o-problema-do-calor",
                titulo: "O problema do calor",
                nivel: 2,
            },
            {
                id: "esfriando-a-cabeça",
                titulo: "Esfriando a cabeça",
                nivel: 2,
            },
            {
                id: "o-caminho-do-líquido-de-arrefecimento",
                titulo: "O caminho do líquido de arrefecimento",
                nivel: 3,
            },
            {
                id: "afinal-o-que-é-o-líquido-de-arrefecimento",
                titulo: "Afinal, o que é o líquido de arrefecimento?",
                nivel: 3,
            },
            {
                id: "quente-demais",
                titulo: "Quente demais",
                nivel: 2,
            },
        ],
    },
    "lubrificacao":{
        conteudo: Lubrificacao,
        modelos3D: {
            principal: {
                modelo: "/models/tcc_model-landingpage.glb",
                escala: 1,
                interativo: false,
                camera: {
                    camerapos: [8, 3, 0],
                    origem: [0, 1.3, 0],
                },
            },
        },
        secoes: [
            {
                id: "lubrificação-e-proteção",
                titulo: "Lubrificação e proteção",
                nivel: 1,
            },
            {
                id: "o-problema-do-atrito",
                titulo: "O problema do atrito",
                nivel: 2,
            },
            {
                id: "o-caminho-do-óleo-pelo-motor",
                titulo: "O caminho do óleo pelo motor",
                nivel: 2,
            },
            {
                id: "os-tipos-de-óleo",
                titulo: "Os tipos de óleo",
                nivel: 2,
            },
            {
                id: "óleo-mineral-e-sintético",
                titulo: "Óleo mineral e sintético",
                nivel: 3,
            },
            {
                id: "viscosidades",
                titulo: "Viscosidades",
                nivel: 3,
            },
            {
                id: "os-problemas-na-lubrificação",
                titulo: "Os problemas na lubrificação",
                nivel: 2,
            },
        ],
    },
    "eletrica":{
        conteudo: Eletrica,
        modelos3D: {
            principal: {
                modelo: "/models/tcc_model-landingpage.glb",
                escala: 1,
                interativo: false,
                camera: {
                    camerapos: [8, 3, 0],
                    origem: [0, 1.3, 0],
                },
            },
        },
        secoes: [
            {
                id: "o-sistema-elétrico",
                titulo: "O sistema elétrico",
                nivel: 1,
            },
            {
                id: "o-que-é-eletricidade",
                titulo: "O que é eletricidade?",
                nivel: 2,
            },
            {
                id: "tensão-corrente-e-resistência",
                titulo: "Tensão, corrente e resistência",
                nivel: 3,
            },
            {
                id: "como-funciona-um-circuito-elétrico",
                titulo: "Como funciona um circuito elétrico?",
                nivel: 2,
            },
            {
                id: "aterramento",
                titulo: "Aterramento",
                nivel: 3,
            },
            {
                id: "o-caminho-da-eletricidade",
                titulo: "O caminho da eletricidade",
                nivel: 2,
            },
            {
                id: "consumindo-a-eletricidade",
                titulo: "Consumindo a eletricidade",
                nivel: 3,
            },
            {
                id: "o-circuito-de-partida",
                titulo: "O circuito de partida",
                nivel: 3,
            },
            {
                id: "outros-detalhes",
                titulo: "Outros detalhes",
                nivel: 3,
            },
            {
                id: "problemas-eletrizantes",
                titulo: "Problemas eletrizantes",
                nivel: 2,
            },
        ],
    },
    "potencia":{
        conteudo: Potencia,
        modelos3D: {
            principal: {
                modelo: "/models/tcc_model-landingpage.glb",
                escala: 1,
                interativo: false,
                camera: {
                    camerapos: [8, 3, 0],
                    origem: [0, 1.3, 0],
                },
            },
        },
        secoes: [
            {
                id: "aumentando-a-potência",
                titulo: "Aumentando a potência",
                nivel: 1,
            },
            {
                id: "de-onde-vem-a-potência-extra",
                titulo: "De onde vem a potência extra?",
                nivel: 2,
            },
            {
                id: "indução-forçada",
                titulo: "Indução forçada",
                nivel: 3,
            },
            {
                id: "o-turbocompressor",
                titulo: "O turbocompressor",
                nivel: 4,
            },
            {
                id: "o-compressor-mecânico",
                titulo: "O compressor mecânico",
                nivel: 4,
            },
            {
                id: "apimentando-as-coisas",
                titulo: "Apimentando as coisas",
                nivel: 2,
            },
            {
                id: "dois-é-mais-do-que-um",
                titulo: "Dois é mais do que um",
                nivel: 3,
            },
            {
                id: "superchargers-também-são-legais",
                titulo: "Superchargers também são legais",
                nivel: 3,
            },
            {
                id: "o-mais-legal-twin-charging",
                titulo: "O mais legal: twin charging",
                nivel: 3,
            },
            {
                id: "resfriando-o-ar",
                titulo: "Resfriando o ar",
                nivel: 2,
            },
            {
                id: "aumentando-a-potência-de-outras-formas",
                titulo: "Aumentando a potência de outras formas",
                nivel: 2,
            },
            {
                id: "mais-potência--mais-problemas",
                titulo: "Mais potência = mais problemas?",
                nivel: 2,
            },
        ],
    },
    "transmissao":{
        conteudo: Transmissao,
        modelos3D: {
            principal: {
                modelo: "/models/tcc_model-landingpage.glb",
                escala: 1,
                interativo: false,
                camera: {
                    camerapos: [8, 3, 0],
                    origem: [0, 1.3, 0],
                },
            },
        },
        secoes: [
            {
                id: "como-a-potência-chega-ao-asfalto",
                titulo: "Como a potência chega ao asfalto",
                nivel: 1,
            },
            {
                id: "a-embreagem",
                titulo: "A embreagem",
                nivel: 2,
            },
            {
                id: "mas-porque-desacoplar-o-motor",
                titulo: "Mas porque desacoplar o motor?",
                nivel: 3,
            },
            {
                id: "a-caixa-de-câmbio",
                titulo: "A caixa de câmbio",
                nivel: 2,
            },
            {
                id: "como-as-engrenagens-mudam-a-força",
                titulo: "Como as engrenagens mudam a força",
                nivel: 3,
            },
            {
                id: "trocando-de-marcha",
                titulo: "Trocando de marcha",
                nivel: 3,
            },
            {
                id: "câmbios-automáticos",
                titulo: "Câmbios automáticos",
                nivel: 4,
            },
            {
                id: "levando-a-potência-para-as-rodas",
                titulo: "Levando a potência para as rodas",
                nivel: 2,
            },
            {
                id: "tração-dianteira-traseira-e-integral",
                titulo: "Tração dianteira, traseira e integral",
                nivel: 3,
            },
            {
                id: "o-diferencial",
                titulo: "O diferencial",
                nivel: 2,
            },
            {
                id: "a-borracha-também-importa",
                titulo: "A borracha também importa",
                nivel: 2,
            },
            {
                id: "Problemas",
                titulo: "Problemas",
                nivel: 2,
            },
        ],
    },
    "suspensao_direcao":{
        conteudo: SuspensaoDirecao,
        modelos3D: {
            principal: {
                modelo: "/models/tcc_model-landingpage.glb",
                escala: 1,
                interativo: false,
                camera: {
                    camerapos: [8, 3, 0],
                    origem: [0, 1.3, 0],
                },
            },
        },
        secoes: [
            {
                id: "suspensão-e-direção",
                titulo: "Suspensão e direção",
                nivel: 1,
            },
            {
                id: "suspensão",
                titulo: "Suspensão",
                nivel: 2,
            },
            {
                id: "as-partes-da-suspensão",
                titulo: "As partes da suspensão",
                nivel: 3,
            },
            {
                id: "segurando-a-suspensão",
                titulo: "Segurando a suspensão",
                nivel: 4,
            },
            {
                id: "a-barra-estabilizadora",
                titulo: "A barra estabilizadora",
                nivel: 4,
            },
            {
                id: "os-tipos-de-suspensão",
                titulo: "Os tipos de suspensão",
                nivel: 3,
            },
            {
                id: "suspensão-dependente",
                titulo: "Suspensão dependente",
                nivel: 4,
            },
            {
                id: "suspensão-independetes",
                titulo: "Suspensão independetes",
                nivel: 4,
            },
            {
                id: "alguns-tipos-de-suspensões-independentes",
                titulo: "Alguns tipos de suspensões independentes",
                nivel: 4,
            },
            {
                id: "direção",
                titulo: "Direção",
                nivel: 2,
            },
            {
                id: "seguindo-o-movimento",
                titulo: "Seguindo o movimento",
                nivel: 3,
            },
            {
                id: "alguns-tipos-de-direção",
                titulo: "Alguns tipos de direção",
                nivel: 3,
            },
            {
                id: "alinhamento-das-rodas",
                titulo: "Alinhamento das rodas",
                nivel: 2,
            },
            {
                id: "juntando-suspensão-e-direção",
                titulo: "Juntando suspensão e direção",
                nivel: 2,
            },
            {
                id: "problemas-no-caminho",
                titulo: "Problemas no caminho",
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