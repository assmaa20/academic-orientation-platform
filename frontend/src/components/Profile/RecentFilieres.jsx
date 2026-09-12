import { FaGraduationCap, FaUniversity, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function RecentFilieres({

    filieres

}) {

    const navigate = useNavigate();

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

                <FaGraduationCap className="text-blue-600 text-2xl" />

                <h2 className="text-2xl font-bold">

                    Dernières filières consultées

                </h2>

            </div>

            {

                filieres?.length > 0

                    ?

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {

                            filieres.map((filiere) => (

                                <div

                                    key={filiere.id}

                                    className="
                                        border
                                        rounded-2xl
                                        p-6
                                        hover:border-blue-500
                                        hover:shadow-lg
                                        transition-all
                                        duration-300
                                    "

                                >

                                    <div
                                        className="
                                            w-14
                                            h-14
                                            rounded-2xl
                                            bg-blue-100
                                            text-blue-600
                                            flex
                                            items-center
                                            justify-center
                                            text-2xl
                                            mb-5
                                        "
                                    >

                                        <FaGraduationCap />

                                    </div>

                                    <h3
                                        className="
                                            text-xl
                                            font-bold
                                            mb-3
                                            line-clamp-2
                                        "
                                    >

                                        {

                                            filiere.libelle_diplome

                                        }

                                    </h3>

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            text-slate-500
                                            mb-5
                                        "
                                    >

                                        <FaUniversity />

                                        <span>

                                            {

                                                filiere.discipline

                                            }

                                        </span>

                                    </div>

                                    {

                                        filiere.description && (

                                            <p
                                                className="
                                                    text-slate-600
                                                    text-sm
                                                    line-clamp-3
                                                    mb-6
                                                "
                                            >

                                                {

                                                    filiere.description

                                                }

                                            </p>

                                        )

                                    }

                                    <button

                                        onClick={() =>

                                            navigate(

                                                `/dashboard/filieres/${filiere.id}`

                                            )

                                        }

                                        className="
                                            w-full
                                            bg-blue-600
                                            hover:bg-blue-700
                                            text-white
                                            py-3
                                            rounded-xl
                                            font-semibold
                                            flex
                                            items-center
                                            justify-center
                                            gap-3
                                            transition
                                        "

                                    >

                                        Voir la fiche

                                        <FaArrowRight />

                                    </button>

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

                        <FaGraduationCap className="text-5xl mx-auto mb-4 text-slate-300" />

                        <p>

                            Aucune filière consultée récemment.

                        </p>

                    </div>

            }

        </div>

    );

}