import { FaComments } from "react-icons/fa";

export default function ChatHistory({

    conversations,

    currentConversation,

    setCurrentConversation

}) {

    if (conversations.length === 0) {

        return (

            <div className="text-slate-500 text-sm text-center mt-8">

                Aucune conversation

            </div>

        );

    }

    return (

        <div className="space-y-2">

            {

                conversations.map((conversation) => (

                    <button

                        key={conversation.id}

                        onClick={() => setCurrentConversation(conversation.id)}

                        className={`

                            w-full

                            flex

                            items-center

                            gap-3

                            rounded-xl

                            p-4

                            transition-all

                            duration-200

                            ${

                                currentConversation === conversation.id

                                    ? "bg-blue-600 text-white"

                                    : "text-slate-300 hover:bg-slate-800"

                            }

                        `}

                    >

                        <FaComments className="text-sm shrink-0" />

                        <span className="truncate">

                            {conversation.title}

                        </span>

                    </button>

                ))

            }

        </div>

    );

}