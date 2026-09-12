import {

    FaPlus,

    FaRobot,

    FaComments

} from "react-icons/fa";

import ChatHistory from "./ChatHistory";

export default function ChatSidebar({

    conversations,

    currentConversation,

    setCurrentConversation,

    newConversation,

}) {

    return (

        <aside className="w-80 h-full bg-[#202123] text-white flex flex-col">

            <div className="p-8 border-b border-slate-700">

                <h1 className="text-5xl font-black flex items-center gap-3">

                    <FaRobot />

                    OFM AI

                </h1>

                <p className="text-slate-400 mt-3">

                    Assistant intelligent

                </p>

            </div>

            <div className="p-4">

                <button

                    onClick={newConversation}

                    className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-4 flex items-center justify-center gap-3 font-bold transition"

                >

                    <FaPlus />

                    Nouveau chat

                </button>

            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden px-4">

                <p className="text-slate-400 text-sm mb-3">

                    Conversations

                </p>

                <ChatHistory

                    conversations={conversations}

                    currentConversation={currentConversation}

                    setCurrentConversation={setCurrentConversation}

                />

            </div>

            <div className="border-t border-slate-700 p-6 flex items-center gap-3 text-slate-400">

                <FaComments />

                Orientation Filière Maroc

            </div>

        </aside>

    );

}