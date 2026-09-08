export interface Modulo {
    id: number;
    titulo: string;
    codigo: string;
    descricao: string;
    ordem: number;
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
    conteudo: string;
    camera: ConfiguracaoCamera;
}