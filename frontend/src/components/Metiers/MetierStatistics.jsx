import {

    FaGraduationCap,
    FaUniversity,
    FaBook,
    FaAward,
    FaLanguage,
    FaClipboardList,
    FaBrain,
    FaArrowCircleUp,
    FaSchool,
    FaChalkboardTeacher,
    FaLaptop,
    FaExchangeAlt

} from "react-icons/fa";

export default function MetierStatistics({

    statistics

}) {

    if (!statistics) return null;

    const cards = [

        {

            title: "Filières",

            value: statistics.programs,

            icon: <FaGraduationCap />

        },

        {

            title: "Universités",

            value: statistics.universities,

            icon: <FaUniversity />

        },

        {

            title: "Disciplines",

            value: statistics.disciplines,

            icon: <FaBook />

        },

        {

            title: "Diplômes",

            value: statistics.degrees,

            icon: <FaAward />

        },

        {

            title: "Langues",

            value: statistics.languages,

            icon: <FaLanguage />

        },

        {

            title: "Matières",

            value: statistics.subjects,

            icon: <FaClipboardList />

        },

        {

            title: "Compétences",

            value: statistics.competencies,

            icon: <FaBrain />

        },

        {

            title: "Poursuite d'études",

            value: statistics.further_studies,

            icon: <FaArrowCircleUp />

        },

        {

            title: "Séries Bac",

            value: statistics.bac_series,

            icon: <FaSchool />

        },

        {

            title: "Présentiel",

            value: statistics.presentiel,

            icon: <FaChalkboardTeacher />

        },

        {

            title: "À distance",

            value: statistics.distance,

            icon: <FaLaptop />

        },

        {

            title: "Alternance",

            value: statistics.alternance,

            icon: <FaExchangeAlt />

        }

    ];

    return (

        <div className="space-y-6">

            <div>

                <h2 className="text-2xl font-bold">

                    Statistiques

                </h2>

                <p className="text-slate-500">

                    Vue d'ensemble du métier.

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

                                    transition-all

                                    duration-300

                                    p-6

                                "

                            >

                                <div

                                    className="

                                        flex

                                        items-center

                                        justify-between

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

                                                text-blue-600

                                            "

                                        >

                                            {card.value}

                                        </h3>

                                    </div>

                                    <div

                                        className="

                                            w-14

                                            h-14

                                            rounded-xl

                                            bg-blue-100

                                            text-blue-600

                                            flex

                                            items-center

                                            justify-center

                                            text-2xl

                                        "

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