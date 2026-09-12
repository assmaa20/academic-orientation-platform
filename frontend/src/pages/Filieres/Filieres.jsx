import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import { getFilieres } from "../../services/filiereService";

import FiliereCard from "../../components/Filieres/FiliereCard";

export default function Filieres() {

    const [searchParams] = useSearchParams();

    const [filieres, setFilieres] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);

    // ==========================================
    // Charger les filières
    // ==========================================

    const loadFilieres = async (keyword = "") => {

        try {

            setLoading(true);

            const data = await getFilieres(keyword);

            setFilieres(data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Synchronisation avec l'URL
    // ==========================================

    useEffect(() => {

        const keyword = searchParams.get("search") || "";

        setSearch(keyword);

        loadFilieres(keyword);

    }, [searchParams]);

    // ==========================================
    // Recherche
    // ==========================================

    const handleSearch = () => {

        loadFilieres(search);

    };

    // ==========================================
    // Interface
    // ==========================================

    return (

        <div className="max-w-7xl mx-auto">

            {/* ================= Titre ================= */}

            <div className="mb-8">

                <h1 className="text-5xl font-black">

                    🎓 Filières universitaires

                </h1>

                <p className="text-slate-500 text-lg mt-2">

                    Recherchez une filière, un diplôme ou un métier.

                </p>

            </div>

            {/* ================= Barre de recherche ================= */}

            <div className="bg-white rounded-2xl shadow p-6 mb-8">

                <div className="flex gap-4">

                    <div className="relative flex-1">

                        <FaSearch
                            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input

                            value={search}

                            onChange={(e) => setSearch(e.target.value)}

                            onKeyDown={(e) => {

                                if (e.key === "Enter") {

                                    handleSearch();

                                }

                            }}

                            placeholder="Rechercher une filière..."

                            className="

                                w-full
                                rounded-xl
                                border
                                pl-14
                                pr-4
                                py-4
                                outline-none
                                focus:border-blue-600

                            "

                        />

                    </div>

                    <button

                        onClick={handleSearch}

                        className="

                            px-8
                            rounded-xl
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            font-semibold
                            transition

                        "

                    >

                        Rechercher

                    </button>

                </div>

            </div>

            {/* ================= Nombre de résultats ================= */}

            {

                !loading &&

                <p className="text-slate-500 mb-6">

                    {filieres.length} résultat(s)

                </p>

            }

            {/* ================= Chargement ================= */}

            {

                loading ?

                (

                    <div className="text-center py-20 text-xl">

                        Chargement...

                    </div>

                )

                :

                filieres.length === 0 ?

                (

                    <div className="bg-white rounded-2xl shadow p-16 text-center">

                        <h2 className="text-2xl font-bold">

                            Aucune filière trouvée

                        </h2>

                        <p className="text-slate-500 mt-3">

                            Essayez un autre mot-clé.

                        </p>

                    </div>

                )

                :

                (

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {

                            filieres.map((filiere) => (

                                <FiliereCard

                                    key={filiere.id}

                                    filiere={filiere}

                                />

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}