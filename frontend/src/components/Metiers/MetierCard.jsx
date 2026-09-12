import { Link } from "react-router-dom";

import {

    FaBriefcase,
    FaGraduationCap,
    FaArrowRight

} from "react-icons/fa";

export default function MetierCard({

    job

}) {

    return (

        <div

            className="

                bg-white

                rounded-3xl

                shadow-md

                border

                border-slate-100

                overflow-hidden

                hover:shadow-xl

                hover:-translate-y-1

                transition-all

                duration-300

            "

        >

            {/* Header */}

            <div

                className="

                    bg-gradient-to-r

                    from-blue-600

                    to-indigo-600

                    text-white

                    p-6

                    flex

                    items-center

                    gap-4

                "

            >

                <div

                    className="

                        w-16

                        h-16

                        rounded-2xl

                        bg-white/20

                        flex

                        items-center

                        justify-center

                        text-3xl

                    "

                >

                    <FaBriefcase />

                </div>

                <div>

                    <h2

                        className="

                            text-xl

                            font-bold

                        "

                    >

                        {job.name}

                    </h2>

                </div>

            </div>

            {/* Body */}

            <div className="p-6">

                <div

                    className="

                        flex

                        justify-between

                        items-center

                    "

                >

                    <span

                        className="

                            flex

                            items-center

                            gap-2

                            text-slate-600

                        "

                    >

                        <FaGraduationCap />

                        Filières

                    </span>

                    <span

                        className="

                            text-2xl

                            font-bold

                            text-blue-600

                        "

                    >

                        {job.programs}

                    </span>

                </div>

            </div>

            {/* Footer */}

            <div

                className="

                    px-6

                    pb-6

                "

            >

                <Link

                    to={`/dashboard/metiers/${encodeURIComponent(job.id)}`}

                    className="

                        w-full

                        flex

                        justify-center

                        items-center

                        gap-2

                        bg-blue-600

                        hover:bg-blue-700

                        text-white

                        rounded-2xl

                        py-3

                        font-semibold

                        transition

                    "

                >

                    Voir les détails

                    <FaArrowRight />

                </Link>

            </div>

        </div>

    );

}