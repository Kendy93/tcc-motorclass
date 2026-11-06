import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";

//===========================================================================

// Substitui o <Canvas>: só monta a cena quando ela está perto da tela e
// desmonta quando sai, para não manter vários contextos WebGL e texturas
// ocupando memória ao mesmo tempo. Também limita a resolução (dpr) em telas
// de alta densidade.
//
// O carregamento dos modelos fica contido no próprio Canvas: sem esse
// Suspense, o r3f repassa a espera para a página, que troca tudo pelo
// "Carregando..." e faz a rolagem pular para o topo.
export default function CanvasVisivel({ children, ...props }: CanvasProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visivel, setVisivel] = useState(false);

    useEffect(() => {
        const elemento = ref.current;
        if (!elemento) {return;}

        const observer = new IntersectionObserver(
            ([entrada]) => setVisivel(entrada.isIntersecting),
            { rootMargin: "300px 0px" },
        );
        observer.observe(elemento);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className="h-full w-full">
            {visivel && (
                <Canvas dpr={[1, 1.5]} {...props}>
                    <Suspense fallback={null}>{children}</Suspense>
                </Canvas>
            )}
        </div>
    );
}
