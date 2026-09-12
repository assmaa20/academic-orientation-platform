import {
    FaDatabase,
    FaUniversity,
    FaGraduationCap,
    FaBriefcase,
} from "react-icons/fa";

export default function QuickStats({ stats }) {

    const cards = [

        {
            title: "Filières",
            value: stats.filieres,
            icon: <FaDatabase />,
            color: "bg-blue-100 text-blue-600",
        },

        {
            title: "Universités",
            value: stats.universites,
            icon: <FaUniversity />,
            color: "bg-purple-100 text-purple-600",
        },

        {
            title: "Diplômes",
            value: stats.diplomes,
            icon: <FaGraduationCap />,
            color: "bg-green-100 text-green-600",
        },

        {
            title: "Métiers",
            value: stats.metiers,
            icon: <FaBriefcase />,
            color: "bg-orange-100 text-orange-600",
        },

    ];

    return (

        <div className="grid lg:grid-cols-4 gap-6">

            {

                cards.map((card) => (

                    <div
                        key={card.title}
                        className="bg-white rounded-3xl p-8 shadow hover:shadow-xl transition duration-300"
                    >

                        <div
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${card.color}`}
                        >

                            {card.icon}

                        </div>

                        <h2 className="text-5xl font-black mt-6">

                            {card.value}

                        </h2>

                        <p className="text-slate-500 mt-2">

                            {card.title}

                        </p>

                    </div>

                ))

            }

        </div>

    );

}