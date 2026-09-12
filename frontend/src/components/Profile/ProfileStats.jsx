import {
    FaComments,
    FaQuestionCircle
} from "react-icons/fa";

export default function ProfileStats({ stats }) {

    const cards = [

        {
            title: "Conversations",
            value: stats?.conversations ?? 0,
            icon: <FaComments />,
            color: "bg-blue-500"
        },

        {
            title: "Questions",
            value: stats?.questions ?? 0,
            icon: <FaQuestionCircle />,
            color: "bg-green-500"
        }

    ];

    return (

        <div
            className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-6
                mt-8
            "
        >

            {cards.map((card) => (

                <div
                    key={card.title}
                    className="
                        bg-white
                        rounded-3xl
                        shadow
                        p-6
                        hover:shadow-xl
                        transition-all
                        duration-300
                    "
                >

                    <div className="flex justify-between items-center">

                        <div>

                            <p
                                className="
                                    text-slate-500
                                    text-sm
                                "
                            >
                                {card.title}
                            </p>

                            <h2
                                className="
                                    text-4xl
                                    font-bold
                                    mt-2
                                "
                            >
                                {card.value}
                            </h2>

                        </div>

                        <div
                            className={`
                                w-16
                                h-16
                                rounded-2xl
                                text-white
                                text-2xl
                                flex
                                items-center
                                justify-center
                                ${card.color}
                            `}
                        >
                            {card.icon}
                        </div>

                    </div>

                </div>

            ))}

        </div>

    );

}