import { useEffect, useState } from "react";

import UniversityCard from "../../components/University/UniversityCard";
import UniversitySearch from "../../components/University/UniversitySearch";

import {

    getUniversities

} from "../../services/universityService";

export default function Universites() {

    const [universities, setUniversities] = useState([]);

    const [filteredUniversities, setFilteredUniversities] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadUniversities();

    }, []);

    useEffect(() => {

        if (!search.trim()) {

            setFilteredUniversities(

                universities

            );

            return;

        }

        const value = search.toLowerCase();

        setFilteredUniversities(

            universities.filter(

                (university) =>

                    String(

                        university.code

                    )

                        .toLowerCase()

                        .includes(value)

            )

        );

    }, [

        search,

        universities

    ]);

    async function loadUniversities() {

        try {

            const data = await getUniversities();

            setUniversities(data);

            setFilteredUniversities(data);

        }

        catch (error) {

            console.error(

                "Erreur :", error

            );

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <div className="p-10 text-center">

                Chargement des universités...

            </div>

        );

    }

    return (

        <div

            className="

                max-w-7xl

                mx-auto

                p-8

                space-y-8

            "

        >

            <div>

                <h1

                    className="

                        text-4xl

                        font-bold

                    "

                >

                    Universités

                </h1>

                <p

                    className="

                        text-slate-500

                        mt-2

                    "

                >

                    Universités disponibles dans la base de données.

                </p>

            </div>

            <UniversitySearch

                value={search}

                onChange={setSearch}

            />

            {

                filteredUniversities.length === 0 && (

                    <div

                        className="

                            text-center

                            text-slate-500

                            py-20

                        "

                    >

                        Aucune université trouvée.

                    </div>

                )

            }

            <div

                className="

                    grid

                    grid-cols-1

                    md:grid-cols-2

                    xl:grid-cols-3

                    gap-6

                "

            >

                {

                    filteredUniversities.map(

                        (

                            university

                        ) => (

                            <UniversityCard

                                key={

                                    university.id

                                }

                                university={

                                    university

                                }

                            />

                        )

                    )

                }

            </div>

        </div>

    );

}