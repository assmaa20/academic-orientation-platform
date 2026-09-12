import { Link } from "react-router-dom";

import {

    FaUniversity,
    FaGraduationCap,
    FaBook,
    FaLanguage,
    FaAward,
    FaArrowRight

} from "react-icons/fa";

export default function UniversityCard({

    university

}) {

    return (

        <div

            className="

                bg-white

                rounded-3xl

                shadow-md

                border

                border-slate-200

                hover:shadow-xl

                hover:-translate-y-1

                transition-all

                duration-300

                overflow-hidden

            "

        >

            {/* Header */}

            <div

                className="

                    bg-gradient-to-r

                    from-blue-600

                    to-indigo-700

                    text-white

                    p-6

                "

            >

                <div

                    className="

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

                        <FaUniversity />

                    </div>

                    <div>

                        <h2

                            className="

                                text-2xl

                                font-bold

                            "

                        >

                            Université {university.code}

                        </h2>

                    </div>

                </div>

            </div>

            {/* Body */}

            <div className="p-6 space-y-4">

                <div className="flex justify-between">

                    <span className="flex items-center gap-2 text-slate-600">

                        <FaGraduationCap />

                        Filières

                    </span>

                    <span className="font-bold">

                        {university.programs}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="flex items-center gap-2 text-slate-600">

                        <FaBook />

                        Disciplines

                    </span>

                    <span className="font-bold">

                        {university.disciplines}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="flex items-center gap-2 text-slate-600">

                        <FaAward />

                        Diplômes

                    </span>

                    <span className="font-bold">

                        {university.degrees}

                    </span>

                </div>

                <div>

                    <div

                        className="

                            flex

                            items-center

                            gap-2

                            mb-3

                            text-slate-600

                        "

                    >

                        <FaLanguage />

                        Langues

                    </div>

                    <div

                        className="

                            flex

                            flex-wrap

                            gap-2

                        "

                    >

                        {

                            university.languages.map(

                                (

                                    language,

                                    index

                                ) => (

                                    <span

                                        key={index}

                                        className="

                                            px-3

                                            py-1

                                            rounded-full

                                            bg-blue-100

                                            text-blue-700

                                            text-sm

                                        "

                                    >

                                        {language}

                                    </span>

                                )

                            )

                        }

                    </div>

                </div>

            </div>

            {/* Footer */}

            <div className="p-6 pt-0">

                <Link

                    to={`/dashboard/universites/${university.id}`}

                    className="

                        w-full

                        flex

                        justify-center

                        items-center

                        gap-2

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

                    <FaArrowRight />

                </Link>

            </div>

        </div>

    );

}