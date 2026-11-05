import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import MenuSuperior from "./components/navigation/MenuSuperior";
import Rodape from "./components/Rodape";

export default function Layout() {
    return (
        <div className="flex min-h-screen flex-col">

            <MenuSuperior />

            <main className="flex-1">
                <Suspense fallback={<p>Carregando...</p>}>
                    <Outlet />
                </Suspense>
            </main>

            <Rodape />

        </div>
    );
}