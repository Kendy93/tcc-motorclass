import type { ButtonHTMLAttributes, ReactNode } from "react";

interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
    children: ReactNode;
}

export default function Botao({
    variant = "primary",
    children,
    className = "",
    type = "button",
    ...props
}: BotaoProps) {
    const baseClasses = `
        rounded-lg
        font-medium
        transition
        disabled:cursor-not-allowed
        disabled:opacity-50
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
        <button
            type={type}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}