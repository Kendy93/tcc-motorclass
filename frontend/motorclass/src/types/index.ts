import type { ComponentType } from "react";

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
    modelo3D: string;
    escala: number;
    conteudo: ComponentType;
    camera: ConfiguracaoCamera;
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