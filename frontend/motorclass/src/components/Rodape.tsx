import LinkNav from "./navigation/LinkNav";

export default function Rodape() {
    return (
        <footer className="w-full py-10 px-32 bg-maindark mt-10">
            <div className="mx-auto flex h-16 items-center justify-between">
                {/* logo */}
                <div className="flex-shrink-0">
                    <LinkNav
                        tipo="imagem"
                        imagem="/images/logo_light.png"
                        destino="/"
                        tamanho="pequeno"
                        alt="Página inicial"
                    />
                </div>

                <div className="flex-shrink min-w-0">
                    <p className="text-sm text-right max-w-3xl !text-mainlight">
                        O ensino da mecânica automotiva, especialmente focado em veículos clássicos, enfrenta o desafio de se tornar um conhecimento progressivamente perdido e restrito. Este trabalho apresenta o planejamento de uma plataforma web educacional interativa, cujo objetivo principal é reduzir essas barreiras ao aprendizado.
                    </p>
                </div>
            </div>
        </footer>
    );
}