
export default function Sobre() {
    const pdfUrl = "/documents/TCC_1-Rafael_Kendy_Naramoto_Lopes.pdf";

    return (
        <main className="min-h-screen bg-module px-6 py-10">
            <div className="mx-auto max-w-[1400px]">
                <header className="mb-8">
                    <h1 className="!mt-12 font-semibold !text-blue1">
                        Sobre o MOTORCLASS
                    </h1>
                    <p className="text-xl">
                        Conheça o projeto e sua proposta educacional.
                    </p>
                </header>

                <hr className="border-gray-300 mb-6"/>

                <section className="
                    overflow-hidden
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    shadow-sm
                ">
                    <iframe
                        src={pdfUrl}
                        title="Documento sobre o MOTORCLASS"
                        className="
                            h-[calc(100vh-220px)]
                            min-h-[500px]
                            w-full
                            border-0
                        "
                    />
                </section>

                <div className="mt-4 text-right">
                    <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            text-sm
                            font-medium
                            text-blue3
                            hover:underline
                        "
                    >
                        Abrir PDF em uma nova aba ↗
                    </a>
                </div>

            </div>
        </main>
    );
}
