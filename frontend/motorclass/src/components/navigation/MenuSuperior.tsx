import LinkNav from "./LinkNav";
import { CircleUserRound } from "lucide-react";

export default function MenuSuperior() {
    return (
        <header className="w-full bg-text fixed z-50 bg-mainlight">
            <nav className="mx-auto flex h-16 items-center justify-between px-8 ">

                {/* logo */}
                <LinkNav
                    tipo="imagem"
                    imagem="/images/logo.png"
                    destino="/"
                    tamanho="grande"
                    alt="Página inicial"
                />

                {/* links */}
                <div className="flex items-center gap-8">

                    <LinkNav
                        tipo="texto"
                        texto="Módulos"
                        destino="/modulos"
                    />

                    <LinkNav
                        tipo="texto"
                        texto="Sobre"
                        destino="/sobre"
                    />

                    <LinkNav
                        tipo="icone"
                        icone={<CircleUserRound size={24} />}
                        destino="/perfil"
                        tamanho="medio"
                    />

                </div>
            </nav>
        </header>
    );
}