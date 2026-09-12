import {

    FaUniversity,
    FaGraduationCap,
    FaBook,
    FaAward,
    FaLanguage

} from "react-icons/fa";

export default function UniversityHeader({

    university

}) {

    if (!university) return null;

    return (

        <div

            className="

                bg-gradient-to-r

                from-blue-700

                to-indigo-700

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

                    md:flex-row

                    justify-between

                    gap-8

                "

            >

                {/* Informations */}

                <div className="flex items-center gap-6">

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

                        <FaUniversity />

                    </div>

                    <div>

                        <p className="text-blue-100">

                            Code Université

                        </p>

                        <h1

                            className="

                                text-4xl

                                font-bold

                            "

                        >

                            {university.code}

                        </h1>

                        <p className="mt-2 text-blue-100">

                            Informations calculées directement depuis les filières.

                        </p>

                    </div>

                </div>

                {/* Résumé */}

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

                            <FaGraduationCap className="text-2xl"/>

                            <div>

                                <p className="text-blue-100 text-sm">

                                    Filières

                                </p>

                                <h2 className="text-2xl font-bold">

                                    {university.programs_count}

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

                            <FaBook className="text-2xl"/>

                            <div>

                                <p className="text-blue-100 text-sm">

                                    Disciplines

                                </p>

                                <h2 className="text-2xl font-bold">

                                    {university.disciplines_count}

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

                            <FaAward className="text-2xl"/>

                            <div>

                                <p className="text-blue-100 text-sm">

                                    Diplômes

                                </p>

                                <h2 className="text-2xl font-bold">

                                    {university.degrees_count}

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

                            <FaLanguage className="text-2xl"/>

                            <div>

                                <p className="text-blue-100 text-sm">

                                    Langues

                                </p>

                                <h2 className="text-2xl font-bold">

                                    {university.languages_count}

                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}