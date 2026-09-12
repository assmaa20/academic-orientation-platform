import {

    FaLanguage,
    FaGlobe

} from "react-icons/fa";

export default function UniversityLanguages({

    languages

}) {

    if (!languages || languages.length === 0) {

        return (

            <div className="bg-white rounded-2xl shadow p-6">

                <h2 className="text-2xl font-bold mb-4">

                    Langues d'enseignement

                </h2>

                <p className="text-slate-500">

                    Aucune langue disponible.

                </p>

            </div>

        );

    }

    return (

        <div className="space-y-6">

            <div>

                <h2 className="text-2xl font-bold">

                    Langues d'enseignement

                </h2>

                <p className="text-slate-500">

                    {languages.length} langue(s)

                </p>

            </div>

            <div

                className="

                    grid

                    sm:grid-cols-2

                    lg:grid-cols-3

                    xl:grid-cols-4

                    gap-5

                "

            >

                {

                    languages.map(

                        (

                            language,

                            index

                        ) => (

                            <div

                                key={index}

                                className="

                                    bg-white

                                    rounded-2xl

                                    border

                                    border-slate-200

                                    shadow-sm

                                    hover:shadow-lg

                                    transition-all

                                    duration-300

                                    p-5

                                "

                            >

                                <div

                                    className="

                                        flex

                                        items-center

                                        gap-3

                                        mb-5

                                    "

                                >

                                    <div

                                        className="

                                            w-12

                                            h-12

                                            rounded-xl

                                            bg-indigo-100

                                            flex

                                            items-center

                                            justify-center

                                            text-indigo-600

                                            text-xl

                                        "

                                    >

                                        <FaLanguage />

                                    </div>

                                    <div>

                                        <h3

                                            className="

                                                font-semibold

                                                text-lg

                                            "

                                        >

                                            {language.language}

                                        </h3>

                                    </div>

                                </div>

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

                                            text-slate-500

                                        "

                                    >

                                        <FaGlobe />

                                        Filières

                                    </span>

                                    <span

                                        className="

                                            bg-indigo-600

                                            text-white

                                            px-3

                                            py-1

                                            rounded-full

                                            font-semibold

                                        "

                                    >

                                        {language.programs}

                                    </span>

                                </div>

                            </div>

                        )

                    )

                }

            </div>

        </div>

    );

}