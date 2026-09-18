import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Modulo from "./pages/Modulo";
import Layout from "./MainLayout";
import LandingPage from "./pages/LandingPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                {/* <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/modulos/:codigo" element={<Modulo />} /> */}

                <Route element={<Layout />}>

                    <Route path="/" element={<LandingPage />}/>
                    <Route path="/modulos" element={<Dashboard />} />
                    <Route path="/modulos/:codigo" element={<Modulo />}/>

                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;