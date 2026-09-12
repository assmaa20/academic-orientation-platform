import {
    FaBell,
    FaSearch,
    FaUserCircle,
    FaSignOutAlt,
    FaBars,
} from "react-icons/fa";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useSidebar } from "../context/SidebarContext";

export default function Navbar() {

    const navigate = useNavigate();

    const {
        user,
        logout
    } = useAuth();

    const { toggleSidebar } = useSidebar();

    const [search, setSearch] = useState("");

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    const handleSearch = (e) => {

        if (e.key !== "Enter") return;

        if (!search.trim()) return;

        navigate(

            `/dashboard/filieres?search=${encodeURIComponent(search.trim())}`

        );

    };

    return (

        <header className="h-20 bg-white shadow-sm border-b flex items-center justify-between px-8">

            {/* ================= Partie gauche ================= */}

            <div className="flex items-center gap-6">

                <button

                    onClick={toggleSidebar}

                    className="text-2xl text-slate-600 hover:text-blue-600 transition"

                >

                    <FaBars />

                </button>

                <div className="flex items-center bg-slate-100 rounded-xl px-4 py-3 w-[520px]">

                    <FaSearch className="text-gray-400 text-lg" />

                    <input

                        type="text"

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                        onKeyDown={handleSearch}

                        placeholder="Rechercher une filière..."

                        className="ml-3 bg-transparent outline-none w-full text-lg"

                    />

                </div>

            </div>

            {/* ================= Partie droite ================= */}

            <div className="flex items-center gap-6">

                <button

                    className="text-2xl text-gray-600 hover:text-blue-600 transition"

                >

                    <FaBell />

                </button>

                <div className="flex items-center gap-3">

                    <FaUserCircle className="text-4xl text-blue-600" />

                    <div>

                        <h2 className="font-bold text-slate-800">

                            {

                                user

                                    ? `${user.prenom} ${user.nom}`

                                    : "Utilisateur"

                            }

                        </h2>

                        <p className="text-sm text-slate-500">

                            {

                                user

                                    ? user.email

                                    : ""

                            }

                        </p>

                    </div>

                </div>

                <button

                    onClick={handleLogout}

                    title="Déconnexion"

                    className="

                        w-12

                        h-12

                        rounded-full

                        bg-red-500

                        hover:bg-red-600

                        transition

                        flex

                        items-center

                        justify-center

                        text-white

                        text-xl

                        shadow

                    "

                >

                    <FaSignOutAlt />

                </button>

            </div>

        </header>

    );

}