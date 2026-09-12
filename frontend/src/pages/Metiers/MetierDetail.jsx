import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import MetierHeader from "../../components/Metiers/MetierHeader";
import MetierTabs from "../../components/Metiers/MetierTabs";
import MetierStatistics from "../../components/Metiers/MetierStatistics";
import MetierPrograms from "../../components/Metiers/MetierPrograms";
import MetierUniversities from "../../components/Metiers/MetierUniversities";
import MetierDisciplines from "../../components/Metiers/MetierDisciplines";
import MetierLanguages from "../../components/Metiers/MetierLanguages";

import {

    getJob,
    getJobStatistics,
    getJobPrograms,
    getJobUniversities,
    getJobDisciplines,
    getJobLanguages

} from "../../services/metierService";

export default function MetierDetail() {

    const { id } = useParams();

    const [loading, setLoading] = useState(true);

    const [activeTab, setActiveTab] = useState(

        "statistics"

    );

    const [job, setJob] = useState(null);

    const [statistics, setStatistics] = useState(null);

    const [programs, setPrograms] = useState([]);

    const [universities, setUniversities] = useState([]);

    const [disciplines, setDisciplines] = useState([]);

    const [languages, setLanguages] = useState([]);

    useEffect(() => {

        loadJob();

    }, [id]);

    async function loadJob() {

        try {

            const [

                jobData,

                statisticsData,

                programsData,

                universitiesData,

                disciplinesData,

                languagesData

            ] = await Promise.all([

                getJob(id),

                getJobStatistics(id),

                getJobPrograms(id),

                getJobUniversities(id),

                getJobDisciplines(id),

                getJobLanguages(id)

            ]);

            setJob(

                jobData

            );

            setStatistics(

                statisticsData

            );

            setPrograms(

                programsData

            );

            setUniversities(

                universitiesData

            );

            setDisciplines(

                disciplinesData

            );

            setLanguages(

                languagesData

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

    if (!job) {

        return (

            <div className="p-10 text-center">

                Métier introuvable.

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

            <MetierHeader

                job={job}

            />

            <MetierTabs

                activeTab={activeTab}

                setActiveTab={setActiveTab}

            />

            {

                activeTab === "statistics" && (

                    <MetierStatistics

                        statistics={statistics}

                    />

                )

            }

            {

                activeTab === "programs" && (

                    <MetierPrograms

                        programs={programs}

                    />

                )

            }

            {

                activeTab === "universities" && (

                    <MetierUniversities

                        universities={universities}

                    />

                )

            }

            {

                activeTab === "disciplines" && (

                    <MetierDisciplines

                        disciplines={disciplines}

                    />

                )

            }

            {

                activeTab === "languages" && (

                    <MetierLanguages

                        languages={languages}

                    />

                )

            }

        </div>

    );

}