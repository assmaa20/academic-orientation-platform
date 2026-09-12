import {
    FaRobot,
    FaUserCircle,
    FaRegCopy,
    FaThumbsUp,
    FaThumbsDown
} from "react-icons/fa";

export default function ChatMessage({

    role,

    content,

    created_at

}) {

    const assistant = role === "assistant";

    const time = created_at
        ? new Date(created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
          })
        : "";

    const copyMessage = () => {

        navigator.clipboard.writeText(content);

    };

    return (

        <div
            className={`flex mb-8 ${
                assistant ? "" : "justify-end"
            }`}
        >

            <div
                className={`flex gap-4 max-w-4xl ${
                    assistant ? "" : "flex-row-reverse"
                }`}
            >

                {/* Avatar */}

                <div>

                    {

                        assistant ?

                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">

                            <FaRobot className="text-white text-xl"/>

                        </div>

                        :

                        <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">

                            <FaUserCircle className="text-white text-xl"/>

                        </div>

                    }

                </div>

                {/* Message */}

                <div>

                    <div
                        className={`
                            rounded-3xl
                            px-6
                            py-4
                            shadow
                            whitespace-pre-wrap
                            leading-7
                            ${
                                assistant
                                ? "bg-white"
                                : "bg-blue-600 text-white"
                            }
                        `}
                    >

                        {content}

                    </div>

                    <div className="flex items-center gap-4 mt-2">

                        <span className="text-xs text-slate-400">

                            {time}

                        </span>

                        {

                            assistant &&

                            <>

                                <button

                                    onClick={copyMessage}

                                    className="text-slate-400 hover:text-blue-600"

                                >

                                    <FaRegCopy/>

                                </button>

                                <button className="text-slate-400 hover:text-green-600">

                                    <FaThumbsUp/>

                                </button>

                                <button className="text-slate-400 hover:text-red-600">

                                    <FaThumbsDown/>

                                </button>

                            </>

                        }

                    </div>

                </div>

            </div>

        </div>

    );

}