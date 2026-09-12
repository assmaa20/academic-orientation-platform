import { FaRobot } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function OrientationResultCard({

    filiere

}) {

    const navigate = useNavigate();

    return (

        <div
            className="
                bg-white
                rounded-3xl
                shadow
                p-6
                hover:shadow-xl
                transition
            "
        >

            <div className="flex justify-between">

                <div>

                    <h2 className="text-2xl font-bold">

                        {filiere.libelle_diplome}

                    </h2>

                    <p className="text-slate-500">

                        {filiere.discipline}

                    </p>

                </div>

                <div
                    className="
                        w-20
                        h-20
                        rounded-full
                        bg-blue-100
                        flex
                        items-center
                        justify-center
                        text-blue-700
                        text-2xl
                        font-bold
                    "
                >

                    {filiere.score}%

                </div>

            </div>

            <div className="mt-5">

                <p className="text-sm text-slate-500">

                    Pourquoi ?

                </p>

                <div className="flex flex-wrap gap-2 mt-3">

                    {

                        filiere.reasons.map((reason) => (

                            <span

                                key={reason}

                                className="
                                    bg-blue-50
                                    text-blue-700
                                    px-3
                                    py-1
                                    rounded-full
                                    text-sm
                                "

                            >

                                {reason}

                            </span>

                        ))

                    }

                </div>

            </div>

            <div className="flex gap-3 mt-6">

                <button

                    onClick={() =>

                        navigate(

                            `/dashboard/filieres/${filiere.id}`

                        )

                    }

                    className="
                        flex-1
                        bg-slate-200
                        rounded-xl
                        py-3
                        font-semibold
                    "
                >

                    Voir la fiche

                </button>

                <button

                    onClick={() =>

                        navigate(

                            `/dashboard/chat?filiere=${filiere.id}`

                        )

                    }

                    className="
                        flex-1
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        rounded-xl
                        py-3
                        font-semibold
                        flex
                        justify-center
                        items-center
                        gap-2
                    "
                >

                    <FaRobot />

                    OFM AI

                </button>

            </div>

        </div>

    );

}