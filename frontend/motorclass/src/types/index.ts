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

export interface Animacao3DConfig {
    gatilho: string;
    titulo: string;
    animacao: string;
    anotacoes?: AnotacaoAnimacao3D[];
    velocidade?: number;
}

export interface AnotacaoAnimacao3D {
    id: string;
    texto: string;
    inicio: number;
    fim: number;
    posicao: [number, number, number];
}