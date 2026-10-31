import {Award, CalendarDays, ShieldCheck, ExternalLink} from "lucide-react";

export interface Certificado {
    codigo: string;
    nome_titular: string;
    curso: string;
    emitido_em: string;
}

interface CertificadoConquistaProps {
    certificado: Certificado;
    contexto?: "perfil" | "conclusao";
    onVisualizar?: () => void;
}

//===========================================================================

export default function CertificadoConquista({
    certificado,
    contexto = "perfil",
    onVisualizar,
}: CertificadoConquistaProps) {
    const data = new Date(certificado.emitido_em);
    const dataFormatada = Number.isNaN(data.getTime())
        ? certificado.emitido_em
        : new Intl.DateTimeFormat("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
          }).format(data);
    const conclusao = contexto === "conclusao";

//-------------------------------------------------------

    return (
        <section className="
            relative 
            overflow-hidden 
            rounded-2xl
            border 
            border-gray-200 
            bg-white
            px-6 py-2
            shadow-sm 
            mb-5
        ">
            <div className="
                flex flex-col
                gap-4
                p-2
                sm:flex-row
                sm:items-center
                sm:gap-4
                sm:p-2
            ">

                {/* ícone da conquista */}
                <div className="
                    flex 
                    h-12 w-12 
                    shrink-0 
                    items-center
                    justify-center 
                    rounded-xl 
                    bg-yellow-100
                ">
                    <Award className="h-6 w-6 text-yellow-600" />
                </div>

                {/* informações */}
                <div className="min-w-0 flex-1 text-left">
                    <h3 className="
                        text-lg font-bold
                    ">
                        {conclusao
                            ? "Você conquistou seu certificado!"
                            : "Certificado de conclusão"}
                    </h3>
                    <p className="
                        mt-1
                        text-sm
                        !text-gray-500
                    ">
                        {conclusao
                            ? `Parabéns, ${certificado.nome_titular}! Você concluiu todos os módulos do ${certificado.curso}.`
                            : `Certificado emitido em reconhecimento à conclusão do percurso de aprendizagem do ${certificado.curso}.`}
                    </p>

                    {/* data e identificação */}
                    <div className="
                        mt-4
                        flex flex-col
                        gap-2
                        text-xs text-gray-500
                        sm:flex-row sm:flex-wrap
                        sm:gap-5
                    ">
                        <span className="flex items-center gap-1.5">
                            <CalendarDays className="h-4 w-4" />
                            Emitido em {dataFormatada}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <ShieldCheck className="h-4 w-4" />
                            Código: {certificado.codigo}
                        </span>
                    </div>

                    {onVisualizar && (
                        <button
                            type="button"
                            onClick={onVisualizar}
                            className="
                                mt-4
                                inline-flex items-center gap-2
                                text-sm font-semibold
                                text-blue3
                                transition
                                hover:text-blue5
                            "
                        >
                            Visualizar certificado
                            <ExternalLink className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>

            <div className="h-1 bg-amber-400" />
        </section>
    );
}
