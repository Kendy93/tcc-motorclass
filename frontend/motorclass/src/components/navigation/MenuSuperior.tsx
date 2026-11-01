import LinkNav from "./LinkNav";
import { Warehouse } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

//===========================================================================

export default function MenuSuperior() {
    const [autenticado, setAutenticado] = useState(false);
    const [, setVerificandoUsuario] = useState(true);
    
    //verificando se o usuário está logado
    useEffect(() => {
        api.get("/api/user")
            .then(() => {
                setAutenticado(true);
            })
            .catch(() => {
                setAutenticado(false);
            })
            .finally(() => {
                setVerificandoUsuario(false);
            });
    }, []);

    return (
        <header className="w-full bg-text fixed z-50 bg-mainlight">
            <nav className="mx-auto flex h-16 items-center justify-between px-8 ">

                {/* logo */}
                <LinkNav
                    tipo="imagem"
                    imagem="/images/logo.png"
                    destino="/"
                    tamanho="pequeno"
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
                        icone={<Warehouse size={24} />}
                        destino={autenticado ? "/perfil" : "/login"}
                        tamanho="medio"
                    />

                </div>
            </nav>
        </header>
    );
}