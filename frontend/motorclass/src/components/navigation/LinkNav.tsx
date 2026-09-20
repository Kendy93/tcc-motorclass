import { Link } from "react-router-dom";

type TipoLink = "texto" | "imagem" | "icone";

interface LinkNavProps {
    tipo: TipoLink;
    destino: string;
    tamanho?: "pequeno" | "medio" | "grande";
    texto?: string;
    imagem?: string;
    icone?: React.ReactNode;
    alt?: string;
}

export default function LinkNav({
    tipo,
    destino,
    tamanho = "medio",
    texto,
    imagem,
    icone,
    alt = "",
}: LinkNavProps) {
    const tamanhos = {
        pequeno: "h-6",
        medio: "h-8",
        grande: "h-10",
    };

    return (
        <Link to={destino}>
            {tipo === "texto" && (
                <span>{texto}</span>
            )}

            {tipo === "imagem" && imagem && (
                <img
                    src={imagem}
                    alt={alt}
                    className={tamanhos[tamanho]}
                />
            )}

            {tipo === "icone" && (
                <span className={tamanhos[tamanho]}>
                    {icone}
                </span>
            )}
        </Link>
    );
}