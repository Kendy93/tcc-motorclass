import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <main className="bg-[#F4F1EB]">

            {/* hero */}
            <section className="flex min-h-[calc(100vh-4rem)] items-center">
                <div className="mx-auto grid w-full max-w-7xl gap-12 px-8 py-20 md:grid-cols-2 md:items-center">
                    <div>
                        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-500">
                            Mecânica automotiva
                        </p>

                        <h1 className="max-w-xl text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
                            Entenda como seu carro funciona.
                        </h1>

                        <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-600">
                            Aprenda os principais sistemas de um automóvel,
                            compreendendo como seus componentes funcionam e
                            como eles se relacionam.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                to="/modulos"
                                className="
                                    rounded-lg
                                    bg-black
                                    px-6 py-3
                                    font-medium
                                    text-white
                                    transition
                                    hover:bg-gray-800
                                "
                            >
                                Começar a aprender
                            </Link>

                            <Link
                                to="/sobre"
                                className="
                                    rounded-lg
                                    border
                                    border-gray-300
                                    bg-white
                                    px-6 py-3
                                    font-medium
                                    text-gray-800
                                    transition
                                    hover:bg-gray-50
                                "
                            >
                                Saiba mais
                            </Link>
                        </div>
                    </div>

                    {/* Espaço para o visual do carro */}
                    <div className="flex justify-center">
                        <div className="
                            flex
                            aspect-square
                            w-full
                            max-w-md
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-gray-200
                            bg-white
                            shadow-sm
                        ">
                            <p className="text-center text-gray-400">
                                Visualização do carro
                            </p>
                        </div>
                    </div>

                </div>
            </section>


            {/* Recursos */}
            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-8">

                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                            Aprendizado
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-gray-900">
                            Uma forma diferente de aprender mecânica
                        </h2>

                        <p className="mt-4 text-gray-600">
                            O conteúdo combina explicações, modelos e
                            animações para ajudar você a compreender
                            o funcionamento dos sistemas.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">

                        <div className="rounded-xl border bg-[#F4F1EB] p-6">
                            <span className="text-sm font-semibold text-gray-500">
                                01
                            </span>

                            <h3 className="mt-3 text-xl font-semibold">
                                Módulos
                            </h3>

                            <p className="mt-3 leading-relaxed text-gray-600">
                                Conteúdos organizados pelos principais
                                sistemas de um automóvel.
                            </p>
                        </div>

                        <div className="rounded-xl border bg-[#F4F1EB] p-6">
                            <span className="text-sm font-semibold text-gray-500">
                                02
                            </span>

                            <h3 className="mt-3 text-xl font-semibold">
                                Modelos 3D
                            </h3>

                            <p className="mt-3 leading-relaxed text-gray-600">
                                Explore visualmente componentes e partes
                                do veículo enquanto aprende.
                            </p>
                        </div>

                        <div className="rounded-xl border bg-[#F4F1EB] p-6">
                            <span className="text-sm font-semibold text-gray-500">
                                03
                            </span>

                            <h3 className="mt-3 text-xl font-semibold">
                                Animações
                            </h3>

                            <p className="mt-3 leading-relaxed text-gray-600">
                                Veja exemplos do funcionamento dos
                                sistemas por meio de animações.
                            </p>
                        </div>

                    </div>
                </div>
            </section>


            {/* Chamada final */}
            <section className="py-20">
                <div className="mx-auto max-w-3xl px-8 text-center">

                    <h2 className="text-3xl font-bold text-gray-900">
                        Comece pelos fundamentos.
                    </h2>

                    <p className="mt-4 text-lg leading-relaxed text-gray-600">
                        Conheça os módulos e avance pelo conteúdo
                        entendendo como cada sistema participa do
                        funcionamento do automóvel.
                    </p>

                    <Link
                        to="/modulos"
                        className="
                            mt-8
                            inline-block
                            rounded-lg
                            bg-black
                            px-6 py-3
                            font-medium
                            text-white
                            transition
                            hover:bg-gray-800
                        "
                    >
                        Ver módulos
                    </Link>

                </div>
            </section>

        </main>
    );
}