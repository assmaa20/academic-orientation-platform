import { Link } from "react-router-dom";

import {

    FaUniversity,

    FaGlobe,

    FaGraduationCap,

    FaArrowRight,

    FaBookOpen

} from "react-icons/fa";

export default function FiliereCard({

    filiere

}) {

    return (

        <div
            className="

                bg-white

                rounded-3xl

                shadow-sm

                hover:shadow-xl

                transition-all

                duration-300

                border

                border-slate-200

                hover:border-blue-500

                overflow-hidden

            "
        >

            {/* Header */}

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">

                <div className="flex items-center gap-3 text-white">

                    <FaGraduationCap className="text-3xl"/>

                    <div>

                        <h2 className="text-xl font-bold">

                            {filiere.libelle_diplome}

                        </h2>

                        <p className="text-blue-100">

                            {filiere.discipline}

                        </p>

                    </div>

                </div>

            </div>

            {/* Body */}

            <div className="p-6 space-y-4">

                <div className="flex items-center gap-3 text-slate-700">

                    <FaUniversity className="text-blue-600"/>

                    <span>

                        Université {filiere.code_universite}

                    </span>

                </div>

                <div className="flex items-center gap-3 text-slate-700">

                    <FaGlobe className="text-green-600"/>

                    <span>

                        {filiere.langue}

                    </span>

                </div>

                <div className="flex items-center gap-3 text-slate-700">

                    <FaBookOpen className="text-orange-500"/>

                    <span>

                        {filiere.series_bac}

                    </span>

                </div>

                {/* Description */}

                <p className="

                    text-slate-600

                    line-clamp-3

                    leading-7

                ">

                    {filiere.description}

                </p>

            </div>

            {/* Footer */}

            <div className="p-6 border-t">

                <Link

                    to={`/dashboard/filieres/${filiere.id}`}

                    className="

                        flex

                        items-center

                        justify-center

                        gap-3

                        bg-blue-600

                        hover:bg-blue-700

                        text-white

                        rounded-xl

                        py-3

                        font-semibold

                        transition

                    "

                >

                    Voir les détails

                    <FaArrowRight/>

                </Link>

            </div>

        </div>

    );

}