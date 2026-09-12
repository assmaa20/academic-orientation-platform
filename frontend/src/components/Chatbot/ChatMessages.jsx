import {

    useEffect,

    useRef

} from "react";

import ChatMessage from "./ChatMessage";

export default function ChatMessages({

    messages,

    typing

}) {

    const bottomRef = useRef(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({

            behavior: "smooth"

        });

    }, [

        messages,

        typing

    ]);

    return (

        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-[#f7f7f8]">

            <div className="max-w-5xl mx-auto px-8 py-10">

                {

                    messages.map((message) => (

                        <ChatMessage

                            key={message.id}

                            role={message.role}

                            content={message.content}

                            created_at={message.created_at}

                        />

                    ))

                }

                {

                    typing && (

                        <ChatMessage

                            role="assistant"

                            content="OFM AI réfléchit..."

                        />

                    )

                }

                <div ref={bottomRef}></div>

            </div>

        </div>

    );

}   