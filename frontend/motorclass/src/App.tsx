import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Modulos";
import Modulo from "./pages/Modulo";
import Layout from "./MainLayout";
import LandingPage from "./pages/LandingPage";
import Cadastro from "./pages/Cadastro";
import Perfil from "./pages/Perfil";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                
                <Route element={<Layout />}>

                    <Route path="/" element={<LandingPage />}/>
                    <Route path="/modulos" element={<Dashboard />} />
                    <Route path="/modulos/:codigo" element={<Modulo />}/>
                    <Route path="/perfil" element={<Perfil />} />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;