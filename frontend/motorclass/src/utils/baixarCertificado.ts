import { api } from "../lib/api";

/** Baixa o PDF do certificado do usuário autenticado. */
export async function baixarCertificado(codigo: string): Promise<void> {
    const resposta = await api.get("/api/certificado/pdf", {
        responseType: "blob",
    });

    const arquivo = new Blob([resposta.data], {
        type: "application/pdf",
    });

    const url = window.URL.createObjectURL(arquivo);
    const link = document.createElement("a");

    link.href = url;
    link.download = `certificado-motorclass-${codigo}.pdf`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    // Dá tempo para o navegador iniciar o download antes de liberar a URL.
    window.setTimeout(() => window.URL.revokeObjectURL(url), 1000);
}
