import {

    BrowserRouter,

    Routes,

    Route,

    Navigate

} from "react-router-dom";

import Landing from "../pages/Landing/Landing";

import Login from "../pages/Auth/Login";

import Register from "../pages/Auth/Register";

import VerifyEmail from "../pages/Auth/VerifyEmail";

import Dashboard from "../pages/Dashboard/Dashboard";

import Chatbot from "../pages/Chatbot/Chatbot";

import Filieres from "../pages/Filieres/Filieres";

import FiliereDetail from "../pages/Filieres/FiliereDetail";

import Universites from "../pages/Universites/Universites";

import UniversiteDetail from "../pages/Universites/UniversiteDetail";

import Metiers from "../pages/Metiers/Metiers";

import MetierDetail from "../pages/Metiers/MetierDetail";

import Orientation from "../pages/Orientation/Orientation";

import Profile from "../pages/Profile/Profile";

import ProtectedRoute from "../components/Auth/ProtectedRoute";

import MainLayout from "../layouts/MainLayout";

export default function AppRouter() {

    return (

        <BrowserRouter>

            <Routes>

                {/* =======================================
                    Pages publiques
                ======================================= */}

                <Route

                    path="/"

                    element={<Landing />}

                />

                <Route

                    path="/login"

                    element={<Login />}

                />

                <Route

                    path="/register"

                    element={<Register />}

                />

                <Route

                    path="/verify/:token"

                    element={<VerifyEmail />}

                />

                {/* =======================================
                    Dashboard protégé
                ======================================= */}

                <Route

                    path="/dashboard"

                    element={

                        <ProtectedRoute>

                            <MainLayout />

                        </ProtectedRoute>

                    }

                >

                    {/* Accueil */}

                    <Route

                        index

                        element={<Dashboard />}

                    />

                    {/* Assistant IA */}

                    <Route

                        path="chat"

                        element={<Chatbot />}

                    />

                    {/* Filières */}

                    <Route

                        path="filieres"

                        element={<Filieres />}

                    />

                    <Route

                        path="filieres/:id"

                        element={<FiliereDetail />}

                    />

                    {/* Universités */}

                    <Route

                        path="universites"

                        element={<Universites />}

                    />

                    <Route

                        path="universites/:id"

                        element={<UniversiteDetail />}

                    />

                    {/* Métiers */}

                    <Route

                        path="metiers"

                        element={<Metiers />}

                    />

                    <Route

                        path="metiers/:id"

                        element={<MetierDetail />}

                    />

                    {/* Orientation */}

                    <Route

                        path="orientation"

                        element={<Orientation />}

                    />

                    {/* Profil */}

                    <Route

                        path="profile"

                        element={<Profile />}

                    />

                </Route>

                {/* =======================================
                    Route inconnue
                ======================================= */}

                <Route

                    path="*"

                    element={<Navigate to="/" replace />}

                />

            </Routes>

        </BrowserRouter>

    );

}