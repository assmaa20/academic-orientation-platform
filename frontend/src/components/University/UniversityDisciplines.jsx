import { FaBook } from "react-icons/fa";

export default function UniversityDisciplines({

    disciplines

}) {

    if (!disciplines || disciplines.length === 0) {

        return (

            <div className="bg-white rounded-2xl shadow p-6">

                <h2 className="text-2xl font-bold mb-4">

                    Disciplines

                </h2>

                <p className="text-slate-500">

                    Aucune discipline disponible.

                </p>

            </div>

        );

    }

    return (

        <div className="space-y-6">

            <div>

                <h2 className="text-2xl font-bold">

                    Disciplines

                </h2>

                <p className="text-slate-500">

                    {disciplines.length} discipline(s)

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

                    disciplines.map(

                        (

                            discipline,

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

                                    transition

                                    p-5

                                "

                            >

                                <div

                                    className="

                                        flex

                                        items-center

                                        gap-3

                                        mb-4

                                    "

                                >

                                    <div

                                        className="

                                            w-12

                                            h-12

                                            rounded-xl

                                            bg-blue-100

                                            flex

                                            items-center

                                            justify-center

                                            text-blue-600

                                            text-xl

                                        "

                                    >

                                        <FaBook />

                                    </div>

                                    <div>

                                        <h3

                                            className="

                                                font-bold

                                                text-lg

                                            "

                                        >

                                            {discipline.name}

                                        </h3>

                                    </div>

                                </div>

                                <div

                                    className="

                                        flex

                                        justify-between

                                        items-center

                                        mt-4

                                    "

                                >

                                    <span className="text-slate-500">

                                        Filières

                                    </span>

                                    <span

                                        className="

                                            bg-blue-600

                                            text-white

                                            px-3

                                            py-1

                                            rounded-full

                                            font-semibold

                                        "

                                    >

                                        {discipline.programs}

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