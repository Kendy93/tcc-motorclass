interface ImageCardProps {
    src: string;
    alt: string;
    maxWidth?: string,
    className?: string;
}

export function BordaImagem({ src, alt, maxWidth = "max-w-full", className = "" }: ImageCardProps) {
    return (
        <div className={`
            flex
            w-full
            ${maxWidth}
            items-center
            justify-center
            rounded-2xl
            border
            border-gray-200
            bg-white
            shadow-sm
            ${className}
            mb-5
        `}>
            <img 
                src={src} 
                alt={alt}
                className="h-full w-full rounded-2xl object-cover"
            />
        </div>
    );
}
