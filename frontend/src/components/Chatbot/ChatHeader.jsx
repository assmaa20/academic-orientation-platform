import {
    FaRobot,
    FaExpand,
    FaCompress
} from "react-icons/fa";

export default function ChatHeader({

    fullscreen,

    setFullscreen

}) {

    return (

        <header
            className="
                h-20
                bg-white
                border-b
                flex
                items-center
                justify-between
                px-8
            "
        >

            <div className="flex items-center gap-4">

                <div
                    className="
                        w-14
                        h-14
                        rounded-2xl
                        bg-blue-600
                        flex
                        items-center
                        justify-center
                        text-white
                        text-2xl
                    "
                >

                    <FaRobot />

                </div>

                <div>

                    <h2 className="text-3xl font-bold">

                        OFM AI

                    </h2>

                    <p className="text-slate-500">

                        Assistant intelligent d'orientation universitaire

                    </p>

                </div>

            </div>

            <button

                onClick={() => setFullscreen(!fullscreen)}

                className="
                    w-12
                    h-12
                    rounded-xl
                    hover:bg-slate-100
                    transition
                    flex
                    items-center
                    justify-center
                    text-xl
                "

                title={
                    fullscreen
                        ? "Quitter le plein écran"
                        : "Plein écran"
                }

            >

                {
                    fullscreen
                        ? <FaCompress />
                        : <FaExpand />
                }

            </button>

        </header>

    );

}