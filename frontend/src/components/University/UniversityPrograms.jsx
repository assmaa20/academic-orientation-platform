import {

    FaGraduationCap,
    FaBook,
    FaLanguage,
    FaCalendarAlt

} from "react-icons/fa";

export default function UniversityPrograms({

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

                        (program) => (

                            <div

                                key={program.id}

                                className="

                                    bg-white

                                    rounded-2xl

                                    border

                                    border-slate-200

                                    shadow-sm

                                    hover:shadow-lg

                                    transition

                                    p-6

                                "

                            >

                                <div className="flex items-center gap-3 mb-4">

                                    <FaGraduationCap

                                        className="

                                            text-blue-600

                                            text-2xl

                                        "

                                    />

                                    <div>

                                        <h3

                                            className="

                                                font-bold

                                                text-lg

                                            "

                                        >

                                            {program.code_filiere}

                                        </h3>

                                        <p className="text-sm text-slate-500">

                                            {program.diplome}

                                        </p>

                                    </div>

                                </div>

                                <div className="space-y-3">

                                    <div className="flex gap-2">

                                        <FaBook className="text-slate-500 mt-1"/>

                                        <div>

                                            <p className="font-medium">

                                                Discipline

                                            </p>

                                            <p className="text-slate-600">

                                                {program.discipline || "-"}

                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex gap-2">

                                        <FaLanguage className="text-slate-500 mt-1"/>

                                        <div>

                                            <p className="font-medium">

                                                Langue

                                            </p>

                                            <p className="text-slate-600">

                                                {program.langue || "-"}

                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex gap-2">

                                        <FaCalendarAlt className="text-slate-500 mt-1"/>

                                        <div>

                                            <p className="font-medium">

                                                Session

                                            </p>

                                            <p className="text-slate-600">

                                                {program.session || "-"}

                                            </p>

                                        </div>

                                    </div>

                                    <div>

                                        <p className="font-medium mb-1">

                                            Description

                                        </p>

                                        <p className="text-slate-600 text-sm">

                                            {

                                                program.description ||

                                                "Aucune description."

                                            }

                                        </p>

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