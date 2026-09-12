import {

    FaGraduationCap,
    FaUniversity,
    FaBook,
    FaLanguage,
    FaCalendarAlt

} from "react-icons/fa";

export default function MetierPrograms({

    programs

}) {

    if (!programs || programs.length === 0) {

        return (

            <div className="bg-white rounded-2xl shadow p-6">

                <h2 className="text-2xl font-bold mb-4">

                    Filières

                </h2>

                <p className="text-slate-500">

                    Aucune filière disponible.

                </p>

            </div>

        );

    }

    return (

        <div className="space-y-6">

            <div>

                <h2 className="text-2xl font-bold">

                    Filières

                </h2>

                <p className="text-slate-500">

                    {programs.length} filière(s)

                </p>

            </div>

            <div

                className="

                    grid

                    md:grid-cols-2

                    xl:grid-cols-3

                    gap-6

                "

            >

                {

                    programs.map(

                        (

                            program

                        ) => (

                            <div

                                key={program.id}

                                className="

                                    bg-white

                                    rounded-2xl

                                    border

                                    border-slate-200

                                    shadow-sm

                                    hover:shadow-lg

                                    transition-all

                                    duration-300

                                    p-6

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

                                            bg-blue-100

                                            text-blue-600

                                            flex

                                            items-center

                                            justify-center

                                            text-xl

                                        "

                                    >

                                        <FaGraduationCap />

                                    </div>

                                    <div>

                                        <h3

                                            className="

                                                font-bold

                                                text-lg

                                            "

                                        >

                                            {program.code_filiere}

                                        </h3>

                                        <p className="text-slate-500">

                                            {program.diplome}

                                        </p>

                                    </div>

                                </div>

                                <div className="space-y-3">

                                    <div className="flex items-center gap-2">

                                        <FaUniversity className="text-slate-400" />

                                        <span>

                                            Université {program.code_universite}

                                        </span>

                                    </div>

                                    <div className="flex items-center gap-2">

                                        <FaBook className="text-slate-400" />

                                        <span>

                                            {program.discipline}

                                        </span>

                                    </div>

                                    <div className="flex items-center gap-2">

                                        <FaLanguage className="text-slate-400" />

                                        <span>

                                            {program.langue}

                                        </span>

                                    </div>

                                    <div className="flex items-center gap-2">

                                        <FaCalendarAlt className="text-slate-400" />

                                        <span>

                                            {program.annee}

                                        </span>

                                    </div>

                                </div>

                            </div>

                        )

                    )

                }

            </div>

        </div>

    );

}