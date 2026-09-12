import { useEffect, useState } from "react";

import MetierCard from "../../components/Metiers/MetierCard";
import MetierSearch from "../../components/Metiers/MetierSearch";

import {

    getJobs

} from "../../services/metierService";

export default function Metiers() {

    const [jobs, setJobs] = useState([]);

    const [filtered, setFiltered] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadJobs();

    }, []);

    useEffect(() => {

        if (!search.trim()) {

            setFiltered(

                jobs

            );

            return;

        }

        const value = search.toLowerCase();

        setFiltered(

            jobs.filter(

                (job) =>

                    job.name

                        .toLowerCase()

                        .includes(value)

            )

        );

    }, [

        search,

        jobs

    ]);

    async function loadJobs() {

        try {

            const data = await getJobs();

            setJobs(

                data

            );

            setFiltered(

                data

            );

        }

        catch (error) {

            console.error(

                error

            );

        }

        finally {

            setLoading(

                false

            );

        }

    }

    if (loading) {

        return (

            <div className="p-10 text-center">

                Chargement...

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

                    Métiers

                </h1>

                <p

                    className="

                        text-slate-500

                        mt-2

                    "

                >

                    Découvrez les métiers accessibles à partir des différentes filières.

                </p>

            </div>

            <MetierSearch

                value={search}

                onChange={setSearch}

            />

            <div

                className="

                    grid

                    md:grid-cols-2

                    xl:grid-cols-3

                    gap-6

                "

            >

                {

                    filtered.map(

                        (job) => (

                            <MetierCard

                                key={job.id}

                                job={job}

                            />

                        )

                    )

                }

            </div>

            {

                filtered.length === 0 && (

                    <div

                        className="

                            text-center

                            text-slate-500

                            py-20

                        "

                    >

                        Aucun métier trouvé.

                    </div>

                )

            }

        </div>

    );

}