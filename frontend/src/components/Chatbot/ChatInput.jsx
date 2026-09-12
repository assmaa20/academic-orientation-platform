import {

    useState

} from "react";

import {

    FaPaperPlane

} from "react-icons/fa";

export default function ChatInput({

    onSend,

    disabled = false

}) {

    const [text, setText] = useState("");

    const send = () => {

        if (!text.trim()) return;

        if (disabled) return;

        onSend(text.trim());

        setText("");

    };

    return (

        <div className="bg-white border-t flex-shrink-0">

            <div className="max-w-5xl mx-auto p-6">

                <div className="flex gap-4 items-end">

                    <textarea

                        value={text}

                        rows={2}

                        autoFocus

                        disabled={disabled}

                        onChange={(e)=>setText(e.target.value)}

                        onKeyDown={(e)=>{

                            if(

                                e.key==="Enter"

                                &&

                                !e.shiftKey

                            ){

                                e.preventDefault();

                                send();

                            }

                        }}

                        placeholder="Posez votre question..."

                        className="

                            flex-1

                            resize-none

                            rounded-3xl

                            border

                            px-6

                            py-4

                            outline-none

                            focus:border-blue-600

                            disabled:bg-slate-100

                        "

                    />

                    <button

                        onClick={send}

                        disabled={disabled}

                        className="

                            w-14

                            h-14

                            rounded-full

                            bg-blue-600

                            hover:bg-blue-700

                            transition

                            text-white

                            shadow

                            disabled:bg-slate-400

                        "

                    >

                        <FaPaperPlane className="mx-auto"/>

                    </button>

                </div>

                <p className="text-center text-xs text-slate-400 mt-3">

                    OFM AI peut faire des erreurs. Vérifiez les informations importantes.

                </p>

            </div>

        </div>

    );

}