import {

    FaChartBar,
    FaGraduationCap,
    FaUniversity,
    FaBook,
    FaLanguage

} from "react-icons/fa";

export default function MetierTabs({

    activeTab,

    setActiveTab

}) {

    const tabs = [

        {

            id: "statistics",

            label: "Statistiques",

            icon: <FaChartBar />

        },

        {

            id: "programs",

            label: "Filières",

            icon: <FaGraduationCap />

        },

        {

            id: "universities",

            label: "Universités",

            icon: <FaUniversity />

        },

        {

            id: "disciplines",

            label: "Disciplines",

            icon: <FaBook />

        },

        {

            id: "languages",

            label: "Langues",

            icon: <FaLanguage />

        }

    ];

    return (

        <div

            className="

                bg-white

                rounded-2xl

                shadow

                p-2

                flex

                flex-wrap

                gap-2

            "

        >

            {

                tabs.map(

                    (tab) => (

                        <button

                            key={tab.id}

                            onClick={() =>

                                setActiveTab(

                                    tab.id

                                )

                            }

                            className={`

                                flex

                                items-center

                                gap-2

                                px-5

                                py-3

                                rounded-xl

                                font-medium

                                transition-all

                                duration-200

                                ${

                                    activeTab === tab.id

                                        ? "bg-blue-600 text-white shadow"

                                        : "text-slate-600 hover:bg-slate-100"

                                }

                            `}

                        >

                            {tab.icon}

                            {tab.label}

                        </button>

                    )

                )

            }

        </div>

    );

}