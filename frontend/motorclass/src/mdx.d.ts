//para permitir arquivo mdx como componente
declare module "*.mdx" {
    import type { ComponentType } from "react";

    const MDXComponent: ComponentType;
    export default MDXComponent;
}