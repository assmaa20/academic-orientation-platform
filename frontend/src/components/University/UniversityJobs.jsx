import {

    FaBriefcase,
    FaChartBar

} from "react-icons/fa";

export default function UniversityJobs({

    jobs

}) {

    if (!jobs || jobs.length === 0) {

        return (

            <div className="bg-white rounded-2xl shadow p-6">

                <h2 className="text-2xl font-bold mb-4">

                    Métiers

                </h2>

                <p className="text-slate-500">

                    Aucun métier disponible.

                </p>

            </div>

        );

    }

    return (

        <div className="space-y-6">

            <div>

                <h2 className="text-2xl font-bold">

                    Débouchés professionnels

                </h2>

                <p className="text-slate-500">

                    {jobs.length} métier(s) identifiés.

                </p>

            </div>

            <div

                className="

                    grid

                    sm:grid-cols-2

                    lg:grid-cols-3

                    xl:grid-cols-4

                    gap-5

                "

            >

                {

                    jobs.map(

                        (

                            job,

                            index

                        ) => (

                            <div

                                key={index}

                                className="

                                    bg-white

                                    rounded-2xl

                                    border

                                    border-slate-200

                                    shadow-sm

                                    hover:shadow-lg

                                    transition-all

                                    duration-300

                                    p-5

                                "

                            >

                                <div

                                    className="

                                        flex

                                        items-center

                                        gap-3

                                        mb-5

                                    "

                                >

                                    <div

                                        className="

                                            w-12

                                            h-12

                                            rounded-xl

                                            bg-orange-100

                                            flex

                                            items-center

                                            justify-center

                                            text-orange-600

                                            text-xl

                                        "

                                    >

                                        <FaBriefcase />

                                    </div>

                                    <div>

                                        <h3

                                            className="

                                                font-semibold

                                                text-lg

                                            "

                                        >

                                            {job.name}

                                        </h3>

                                    </div>

                                </div>

                                <div

                                    className="

                                        flex

                                        justify-between

                                        items-center

                                    "

                                >

                                    <span

                                        className="

                                            flex

                                            items-center

                                            gap-2

                                            text-slate-500

                                        "

                                    >

                                        <FaChartBar />

                                        Filières

                                    </span>

                                    <span

                                        className="

                                            bg-orange-500

                                            text-white

                                            px-3

                                            py-1

                                            rounded-full

                                            font-semibold

                                        "

                                    >

                                        {job.programs}

                                    </span>

                                </div>

                            </div>

                        )

                    )

                }

            </div>

        </div>

    );

}