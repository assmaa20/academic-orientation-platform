import {

    FaBriefcase,
    FaGraduationCap,
    FaUniversity,
    FaBook,
    FaLanguage,
    FaAward

} from "react-icons/fa";

export default function MetierHeader({

    job

}) {

    if (!job) return null;

    return (

        <div

            className="

                bg-gradient-to-r

                from-blue-600

                to-indigo-600

                rounded-3xl

                text-white

                shadow-lg

                p-8

            "

        >

            <div

                className="

                    flex

                    flex-col

                    lg:flex-row

                    justify-between

                    gap-8

                "

            >

                {/* Informations */}

                <div

                    className="

                        flex

                        items-center

                        gap-6

                    "

                >

                    <div

                        className="

                            w-24

                            h-24

                            rounded-3xl

                            bg-white/20

                            flex

                            items-center

                            justify-center

                            text-5xl

                        "

                    >

                        <FaBriefcase />

                    </div>

                    <div>

                        <p className="text-blue-100">

                            Métier

                        </p>

                        <h1

                            className="

                                text-4xl

                                font-bold

                            "

                        >

                            {job.name}

                        </h1>

                        <p

                            className="

                                mt-2

                                text-blue-100

                            "

                        >

                            Informations calculées directement depuis les filières.

                        </p>

                    </div>

                </div>

                {/* Statistiques */}

                <div

                    className="

                        grid

                        grid-cols-2

                        gap-4

                    "

                >

                    <div

                        className="

                            bg-white/10

                            rounded-2xl

                            p-5

                        "

                    >

                        <div className="flex items-center gap-3">

                            <FaGraduationCap className="text-2xl" />

                            <div>

                                <p className="text-sm text-blue-100">

                                    Filières

                                </p>

                                <h2 className="text-2xl font-bold">

                                    {job.programs_count}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div

                        className="

                            bg-white/10

                            rounded-2xl

                            p-5

                        "

                    >

                        <div className="flex items-center gap-3">

                            <FaUniversity className="text-2xl" />

                            <div>

                                <p className="text-sm text-blue-100">

                                    Universités

                                </p>

                                <h2 className="text-2xl font-bold">

                                    {job.universities_count}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div

                        className="

                            bg-white/10

                            rounded-2xl

                            p-5

                        "

                    >

                        <div className="flex items-center gap-3">

                            <FaBook className="text-2xl" />

                            <div>

                                <p className="text-sm text-blue-100">

                                    Disciplines

                                </p>

                                <h2 className="text-2xl font-bold">

                                    {job.disciplines_count}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div

                        className="

                            bg-white/10

                            rounded-2xl

                            p-5

                        "

                    >

                        <div className="flex items-center gap-3">

                            <FaLanguage className="text-2xl" />

                            <div>

                                <p className="text-sm text-blue-100">

                                    Langues

                                </p>

                                <h2 className="text-2xl font-bold">

                                    {job.languages_count}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div

                        className="

                            col-span-2

                            bg-white/10

                            rounded-2xl

                            p-5

                        "

                    >

                        <div className="flex items-center gap-3">

                            <FaAward className="text-2xl" />

                            <div>

                                <p className="text-sm text-blue-100">

                                    Diplômes

                                </p>

                                <h2 className="text-2xl font-bold">

                                    {job.degrees_count}

                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}