//para permitir arquivo mdx como componente
declare module "*.mdx" {
    import type { ComponentType } from "react";
    import type { MDXProps } from "mdx/types";
    import type { MDXContent } from "mdx/types";

    const MDXComponent: MDXContent;
    export default MDXComponent;
}