export default function Sobre() {
    const pdfUrl = "/documents/TCC_1-Rafael_Kendy_Naramoto_Lopes.pdf";

    return (
        <main className="bg-module px-6 py-10 mt-10">
            <div className="mx-auto max-w-4xl text-left">

                <header className="mb-10 mt-5">
                    <h1 className="!mt-0 font-semibold">
                        Sobre o projeto
                    </h1>
                    <p className="mt-4 max-w-3xl text-lg leading-relaxed">
                        Uma plataforma educacional dedicada a explorar o funcionamento dos automóveis por meio de conteúdos didáticos e recursos interativos.
                    </p>
                </header>

                <div className="space-y-6">

                    <section>
                        <h2 className="!mb-3 text-2xl font-semibold text-blue1">
                            O que é o MOTORCLASS?
                        </h2>
                        <p>
                            O MOTORCLASS é uma plataforma voltada à aprendizagem de mecânica automotiva, com ênfase na compreensão dos sistemas e componentes que permitem o funcionamento de um veículo. A proposta é tornar esses conhecimentos mais acessíveis a pessoas interessadas em entender a mecânica dos automóveis, especialmente dos modelos clássicos.
                        </p>
                        <p className="!mt-3">
                            Mais do que apresentar nomes de peças e suas funções
                            individuais, a plataforma busca explicar como os
                            componentes se relacionam, como os diferentes sistemas
                            trabalham em conjunto e como determinadas falhas podem
                            afetar o comportamento do veículo.
                        </p>
                    </section>

                    <section>
                        <h2 className="!mb-3 text-2xl font-semibold text-blue1">
                            Como funciona o aprendizado?
                        </h2>
                        <p>
                            Os conteúdos são organizados em módulos temáticos, cada um dedicado a aspectos específicos da mecânica automotiva. Essa organização permite explorar os sistemas separadamente e, ao mesmo tempo, compreender suas relações com o funcionamento geral do veículo.
                        </p>
                        <p className="!mt-3">
                            Nos módulos que contam com esses recursos, as explicações textuais são complementadas por modelos tridimensionais, animações e questionários. Esses elementos permitem visualizar componentes, acompanhar demonstrações de funcionamento e verificar a compreensão dos conceitos apresentados.
                        </p>
                    </section>

                    <section>
                        <h2 className="!mb-3 text-2xl font-semibold text-blue1">
                            Exploração e progressão
                        </h2>
                        <p>
                            A plataforma também incorpora elementos de gamificação para tornar a experiência de aprendizagem mais envolvente. Por meio da garagem, você pode acompanhar seu progresso e interagir com recompensas relacionadas à conclusão dos conteúdos. Essas recompensas permitem personalizar seu próprio veículo!
                        </p>
                    </section>

                    <section className="border-t border-gray-300 pt-8">
                        <h2 className="mb-3 text-2xl font-semibold text-blue1">
                            Documentação do projeto
                        </h2>
                        <p>
                            Para conhecer o projeto a fundo, incluindo a documentação relacionada à proposta do MOTORCLASS, você pode consultar o documento disponibilizado a seguir.
                        </p>
                        <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-2 font-medium text-blue3 underline underline-offset-4 hover:text-blue1"
                        >
                            Consultar documento em PDF
                            <span aria-hidden="true">↗</span>
                        </a>
                    </section>

                </div>
            </div>
        </main>
    );
}