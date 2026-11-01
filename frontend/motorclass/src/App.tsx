import { BrowserRouter, Routes, Route } from "react-router-dom";

import RotasProtegidas from "./components/RotasProtegidas";
import RotasPublicas from "./components/RotasPublicas";

import Login from "./pages/Login";
import Dashboard from "./pages/Modulos";
import Modulo from "./pages/Modulo";
import Layout from "./MainLayout";
import LandingPage from "./pages/LandingPage";
import Cadastro from "./pages/Cadastro";
import Perfil from "./pages/Perfil";
import Sobre from "./pages/Sobre";

function App() {
    return (
        <BrowserRouter>
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
        </BrowserRouter>
    );
}

export default App;