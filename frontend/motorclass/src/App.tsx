import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RotasProtegidas from "./components/RotasProtegidas";
import RotasPublicas from "./components/RotasPublicas";

import Layout from "./MainLayout";

// Cada página é carregada sob demanda, para não baixar o 3D de todas de uma vez
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Modulos"));
const Modulo = lazy(() => import("./pages/Modulo"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Cadastro = lazy(() => import("./pages/Cadastro"));
const Perfil = lazy(() => import("./pages/Perfil"));
const Sobre = lazy(() => import("./pages/Sobre"));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<p>Carregando...</p>}>
            <Routes>
                <Route element={<RotasPublicas />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                </Route>

                <Route element={<Layout />}>

                    <Route path="/" element={<LandingPage />}/>
                    <Route path="/modulos" element={<Dashboard />} />
                    <Route path="/modulos/:codigo" element={<Modulo />}/>
                    <Route path="/sobre" element={<Sobre />} />

                    <Route element={<RotasProtegidas />}>
                        <Route path="/perfil" element={<Perfil />} />
                    </Route>

                </Route>
            </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
