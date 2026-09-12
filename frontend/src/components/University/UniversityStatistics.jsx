import {

    FaGraduationCap,
    FaBook,
    FaBriefcase,
    FaBrain,
    FaSchool,
    FaLanguage,
    FaLaptopHouse,
    FaUniversity,
    FaChalkboardTeacher

} from "react-icons/fa";

export default function UniversityStatistics({

    statistics

}) {

    if (!statistics) {

        return null;

    }

    const cards = [

        {

            title: "Filières",

            value: statistics.programs,

            icon: <FaGraduationCap />,

            color: "text-blue-600"

        },

        {

            title: "Disciplines",

            value: statistics.disciplines,

            icon: <FaBook />,

            color: "text-green-600"

        },

        {

            title: "Diplômes",

            value: statistics.degrees,

            icon: <FaUniversity />,

            color: "text-purple-600"

        },

        {

            title: "Métiers",

            value: statistics.jobs,

            icon: <FaBriefcase />,

            color: "text-orange-600"

        },

        {

            title: "Matières",

            value: statistics.subjects,

            icon: <FaChalkboardTeacher />,

            color: "text-pink-600"

        },

        {

            title: "Compétences",

            value: statistics.competencies,

            icon: <FaBrain />,

            color: "text-red-600"

        },

        {

            title: "Poursuite d'études",

            value: statistics.further_studies,

            icon: <FaSchool />,

            color: "text-cyan-600"

        },

        {

            title: "Séries Bac",

            value: statistics.bac_series,

            icon: <FaBook />,

            color: "text-indigo-600"

        },

        {

            title: "Langues",

            value: statistics.languages,

            icon: <FaLanguage />,

            color: "text-yellow-600"

        },

        {

            title: "Présentiel",

            value: statistics.presentiel,

            icon: <FaUniversity />,

            color: "text-emerald-600"

        },

        {

            title: "À distance",

            value: statistics.distance,

            icon: <FaLaptopHouse />,

            color: "text-sky-600"

        },

        {

            title: "Alternance",

            value: statistics.alternance,

            icon: <FaGraduationCap />,

            color: "text-violet-600"

        }

    ];

    return (

        <div className="space-y-6">

            <div>

                <h2

                    className="

                        text-2xl

                        font-bold

                    "

                >

                    Statistiques

                </h2>

                <p

                    className="

                        text-slate-500

                    "

                >

                    Vue globale de l'université.

                </p>

            </div>

            <div

                className="

                    grid

                    grid-cols-1

                    sm:grid-cols-2

                    lg:grid-cols-3

                    xl:grid-cols-4

                    gap-6

                "

            >

                {

                    cards.map(

                        (

                            card,

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

                                    p-6

                                "

                            >

                                <div

                                    className="

                                        flex

                                        justify-between

                                        items-center

                                    "

                                >

                                    <div>

                                        <p

                                            className="

                                                text-slate-500

                                                text-sm

                                            "

                                        >

                                            {card.title}

                                        </p>

                                        <h3

                                            className="

                                                text-3xl

                                                font-bold

                                                mt-2

                                            "

                                        >

                                            {card.value}

                                        </h3>

                                    </div>

                                    <div

                                        className={`

                                            text-4xl

                                            ${card.color}

                                        `}

                                    >

                                        {card.icon}

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