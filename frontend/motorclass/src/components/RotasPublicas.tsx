import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function RotasPublicas() {
    const [carregando, setCarregando] = useState(true);
    const [autenticado, setAutenticado] = useState(false);

    useEffect(() => {
        api.get("/api/user")
            .then(() => {
                setAutenticado(true);
            })
            .catch(() => {
                setAutenticado(false);
            })
            .finally(() => {
                setCarregando(false);
            });
    }, []);

    if (carregando) {
        return null;
    }
    if (autenticado) {
        return <Navigate to="/perfil" replace />;
    }

    return <Outlet />;
}