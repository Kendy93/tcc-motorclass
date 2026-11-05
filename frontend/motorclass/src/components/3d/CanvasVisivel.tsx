import { Canvas, type CanvasProps } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

//===========================================================================

// Substitui o <Canvas>: só monta a cena quando ela está perto da tela e
// desmonta quando sai, para não manter vários contextos WebGL e texturas
// ocupando memória ao mesmo tempo. Também limita a resolução (dpr) em telas
// de alta densidade.
export default function CanvasVisivel(props: CanvasProps) {
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
            {visivel && <Canvas dpr={[1, 1.5]} {...props} />}
        </div>
    );
}
