import {
    FaRobot,
    FaClock,
    FaComments
} from "react-icons/fa";

export default function RecentChats({

    chats

}) {

    return (

        <div
            className="
                bg-white
                rounded-3xl
                shadow
                p-8
            "
        >

            <div className="flex items-center gap-3 mb-8">

                <FaComments className="text-blue-600 text-2xl" />

                <h2 className="text-2xl font-bold">

                    Conversations récentes

                </h2>

            </div>

            {

                chats?.length > 0

                    ?

                    <div className="space-y-5">

                        {

                            chats.map((chat) => (

                                <div

                                    key={chat.id}

                                    className="
                                        border
                                        rounded-2xl
                                        p-5
                                        hover:border-blue-500
                                        hover:shadow-md
                                        transition-all
                                    "

                                >

                                    <div className="flex justify-between items-start">

                                        <div className="flex gap-4">

                                            <div
                                                className="
                                                    w-14
                                                    h-14
                                                    rounded-2xl
                                                    bg-blue-100
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-blue-600
                                                    text-2xl
                                                "
                                            >

                                                <FaRobot />

                                            </div>

                                            <div>

                                                <h3 className="font-bold text-lg">

                                                    {

                                                        chat.title ||

                                                        "Nouvelle conversation"

                                                    }

                                                </h3>

                                                <p
                                                    className="
                                                        text-slate-500
                                                        mt-2
                                                        line-clamp-2
                                                    "
                                                >

                                                    {

                                                        chat.last_message ||

                                                        "Aucun message."

                                                    }

                                                </p>

                                            </div>

                                        </div>

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-2
                                                text-slate-400
                                                text-sm
                                            "
                                        >

                                            <FaClock />

                                            {

                                                chat.updated_at ||

                                                "-"

                                            }

                                        </div>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                    :

                    <div
                        className="
                            text-center
                            py-12
                            text-slate-500
                        "
                    >

                        <FaComments className="text-5xl mx-auto mb-4 text-slate-300" />

                        <p>

                            Aucune conversation récente.

                        </p>

                    </div>

            }

        </div>

    );

}