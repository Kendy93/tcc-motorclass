import type { ComponentType } from "react";
import * as THREE from "three";

export interface Modulo {
    id: number;
    titulo: string;
    codigo: string;
    descricao: string;
    ordem: number;
    concluido: boolean;
    imagem: string | undefined;
}

export type NivelSecao = 1 | 2 | 3 | 4;

export interface Secao {
    id: string;
    titulo: string;
    nivel: NivelSecao;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface ConfiguracaoCamera {
    camerapos: [number, number, number];
    origem: [number, number, number];
}

export interface ConfiguracaoModulo {
    modelos3D: Record<string, ConfiguracaoModelo3D>;
    conteudo: ComponentType;
    secoes: Secao[]
}

export interface Animacao {
    titulo: string;
    video: string;
    legenda: string;
    loop?: boolean;
}

export interface Alternativa {
    texto: string;
    correta: boolean;
}

export interface Peca3D {
    titulo: string;
    descricao: string;
}

export interface ConfiguracaoModelo3D {
    modelo: string;
    escala: number;
    camera: {
        camerapos: [number, number, number];
        origem: [number, number, number];
    };
    interativo: boolean;
    pecas?: Record<string, Peca3D>;
}

export interface InformacaoPeca {
    titulo: string;
    descricao: string;
}

export interface PecaSelecionada {
    objeto: THREE.Object3D;
    posicao: THREE.Vector3;
    informacao: InformacaoPeca;
}

export interface EtapaMaterial3D {
    inicio: number;
    fim: number;
    cor: string;
    opacidade: number;
}

export interface MaterialAnimado3D {
    objeto: string;
    etapas: EtapaMaterial3D[];
}

export interface Animacao3DConfig {
    gatilho: string;
    titulo: string;
    animacao: string;
    anotacoes?: AnotacaoAnimacao3D[];
    velocidade?: number;
    materiais?: MaterialAnimado3D[];
}

export interface AnotacaoAnimacao3D {
    id: string;
    texto: string;
    inicio: number;
    fim: number;
    posicao: [number, number, number];
}

export interface Recompensa {
    codigo: string;
    nome: string;
    objeto: string;
    objetoSubstituido?: string;
}

export type TipoQuestao =
    | "multipla-escolha"
    | "identificacao-3d";

export type RespostaQuestionario =
    | string
    | string[];

export interface QuestaoRegistrada {
    id: string;
    tipo: TipoQuestao;
    pergunta: string;
}

export interface TentativaQuestionario {
    questionarioId: string;
    respostas: Record<string, RespostaQuestionario>;
}

export interface PerguntaIdentificacao3D {
    codigo: string;
    pergunta: string;
    destaque?: string;
}

export interface ResultadoQuestao {
    id: string;
    tipo: TipoQuestao;
    pergunta: string;
    correta: boolean;
    respostaTexto?: string;
    respostaCorretaTexto?: string;
    explicacao?: string;
}

export interface ResultadoQuestionario {
    total: number;
    acertos: number;
    erros: number;
    percentual: number;
    nota: number;
    questoes: ResultadoQuestao[];
}

export interface QuestaoPublica {
    codigo: string;
    tipo:
        | "multipla-escolha"
        | "identificacao-3d";
    pergunta: string;
    destaque?: string;
    opcoes?: Record<string, string> | null;
    ordem: number;
    modelo_3d?: string | null;
    grupo_3d?: string | null;
}

export interface BlocoQuestionario {
    tipo:
        | "multipla-escolha"
        | "identificacao-3d";
    questao?: QuestaoPublica;
    modelo3D?: string;
    grupo3D?: string;
    perguntas3D?: QuestaoPublica[];
}

