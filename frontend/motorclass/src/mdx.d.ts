//para permitir arquivo mdx como componente
declare module "*.mdx" {
    import type { ComponentType } from "react";
    import type { MDXProps } from "mdx/types";

    const MDXComponent: ComponentType<MDXProps>;
    export default MDXComponent;
}