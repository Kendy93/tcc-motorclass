interface ProblemaProps {
    titulo: string;
    children: React.ReactNode;
}

//===========================================================================

export default function Problema({
    titulo,
    children,
}: ProblemaProps) {
    return (
        <div className="my-5 rounded-lg border border-gray-200 bg-white p-5 pb-1 shadow-sm">
            <h3 className="mb-2 text-base font-semibold">
                {titulo}
            </h3>

            <div className="text-sm">
                {children}
            </div>
        </div>
    );
}