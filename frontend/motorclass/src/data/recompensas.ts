import type { Recompensa, Modulo } from "../types";

export const recompensasPorModulo: Record<string, Recompensa> = {
    fundamentos: {
        codigo: "carro_base",
        nome: "Um carro?",
        objeto: "recompensa_fundamento",
        objetoSubstituido: "carro_antigo",
    },
    ar: {
        codigo: "capo_ar",
        nome: "Ventilando um pouco",
        objeto: "recompensa_ar",
    },
    combustivel: {
        codigo: "combustivel",
        nome: "Combustível nunca é demais",
        objeto: "recompensa_combustivel",
    },
    faisca: {
        codigo: "faisca",
        nome: "Garantia da faísca",
        objeto: "recompensa_faisca",
    },
    temperatura: {
        codigo: "temperatura",
        nome: "Para você ficar frio",
        objeto: "recompensa_temperatura",
    },
    lubrificacao: {
        codigo: "lubrificacao",
        nome: "Proteção para nosso motor",
        objeto: "recompensa_lubrificacao",
    },
    eletrica: {
        codigo: "eletrica",
        nome: "Eletrizante!",
        objeto: "recompensa_eletrica",
    },
    potencia: {
        codigo: "potencia",
        nome: "Um pouquinho de potência não faz mal",
        objeto: "recompensa_potencia",
    },
    transmissao: {
        codigo: "transmissao",
        nome: "Melhorando o câmbio",
        objeto: "recompensa_transmissao",
    },
    freios: {
        codigo: "freio_paraqueda",
        nome: "Um paraquedas?",
        objeto: "recompensa_freio",
        objetoSubstituido: "freios_antigo",
    },
    suspensao: {
        codigo: "suspensao",
        nome: "Baixo é sempre melhor",
        objeto: "recompensa_suspensao",
    },
};

export function obterRecompensasDesbloqueadas(
    modulos: Modulo[],
): Recompensa[] {
    return modulos
        .filter((modulo) => modulo.concluido)
        .map((modulo) => recompensasPorModulo[modulo.codigo])
        .filter((recompensa): recompensa is Recompensa => recompensa !== undefined);
}

export function obterProximaRecompensa(
    modulos: Modulo[],
): Recompensa | null {
    for (const modulo of modulos) {
        if (modulo.concluido) {
            continue;
        }
        const recompensa = recompensasPorModulo[modulo.codigo];
        if (recompensa) {
            return recompensa;
        }
    }
    return null;
}