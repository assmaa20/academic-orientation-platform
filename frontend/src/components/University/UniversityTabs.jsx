import {

    FaChartBar,
    FaGraduationCap,
    FaBook,
    FaBriefcase,
    FaLanguage

} from "react-icons/fa";

export default function UniversityTabs({

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

            id: "disciplines",

            label: "Disciplines",

            icon: <FaBook />

        },

        {

            id: "jobs",

            label: "Métiers",

            icon: <FaBriefcase />

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

                    tab => (

                        <button

                            key={tab.id}

                            onClick={() =>

                                setActiveTab(tab.id)

                            }

                            className={`

                                px-5

                                py-3

                                rounded-xl

                                flex

                                items-center

                                gap-2

                                transition

                                ${

                                    activeTab === tab.id

                                    ?

                                    "bg-blue-600 text-white"

                                    :

                                    "hover:bg-slate-100"

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