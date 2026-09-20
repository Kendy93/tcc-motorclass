import type { ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

interface BotaoLinkProps extends LinkProps {
    variant?: "primary" | "secondary";
    children: ReactNode;
    className?: string;
}

export default function BotaoLink({
    variant = "primary",
    children,
    className = "",
    ...props
}: BotaoLinkProps) {
    const baseClasses = `
        inline-block
        rounded-lg
        font-medium
        transition
    `;

    const variantClasses = {
        primary: `
            bg-black
            text-white
            hover:bg-blue3
        `,
        secondary: `
            border
            border-gray-300
            bg-white
            text-gray-800
            hover:text-blue3
        `,
    };

    return (
        <Link
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {children}
        </Link>
    );
}