import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import UniversityHeader from "../../components/University/UniversityHeader";
import UniversityTabs from "../../components/University/UniversityTabs";
import UniversityStatistics from "../../components/University/UniversityStatistics";
import UniversityPrograms from "../../components/University/UniversityPrograms";
import UniversityDisciplines from "../../components/University/UniversityDisciplines";
import UniversityJobs from "../../components/University/UniversityJobs";
import UniversityLanguages from "../../components/University/UniversityLanguages";

import {

    getUniversity,
    getUniversityStatistics,
    getUniversityPrograms,
    getUniversityDisciplines,
    getUniversityJobs,
    getUniversityLanguages

} from "../../services/universityService";

export default function UniversiteDetail() {

    const { id } = useParams();

    const [loading, setLoading] = useState(true);

    const [activeTab, setActiveTab] = useState(

        "statistics"

    );

    const [university, setUniversity] = useState(null);

    const [statistics, setStatistics] = useState(null);

    const [programs, setPrograms] = useState([]);

    const [disciplines, setDisciplines] = useState([]);

    const [jobs, setJobs] = useState([]);

    const [languages, setLanguages] = useState([]);

    useEffect(() => {

        loadUniversity();

    }, [id]);

    async function loadUniversity() {

        try {

            const [

                universityData,

                statisticsData,

                programsData,

                disciplinesData,

                jobsData,

                languagesData

            ] = await Promise.all([

                getUniversity(id),

                getUniversityStatistics(id),

                getUniversityPrograms(id),

                getUniversityDisciplines(id),

                getUniversityJobs(id),

                getUniversityLanguages(id)

            ]);

            setUniversity(

                universityData

            );

            setStatistics(

                statisticsData

            );

            setPrograms(

                programsData

            );

            setDisciplines(

                disciplinesData

            );

            setJobs(

                jobsData

            );

            setLanguages(

                languagesData

            );

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <div className="p-10 text-center">

                Chargement...

            </div>

        );

    }

    if (!university) {

        return (

            <div className="p-10 text-center">

                Université introuvable.

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

            <UniversityHeader

                university={university}

            />

            <UniversityTabs

                activeTab={activeTab}

                setActiveTab={setActiveTab}

            />

            {

                activeTab === "statistics" && (

                    <UniversityStatistics

                        statistics={statistics}

                    />

                )

            }

            {

                activeTab === "programs" && (

                    <UniversityPrograms

                        programs={programs}

                    />

                )

            }

            {

                activeTab === "disciplines" && (

                    <UniversityDisciplines

                        disciplines={disciplines}

                    />

                )

            }

            {

                activeTab === "jobs" && (

                    <UniversityJobs

                        jobs={jobs}

                    />

                )

            }

            {

                activeTab === "languages" && (

                    <UniversityLanguages

                        languages={languages}

                    />

                )

            }

        </div>

    );

}