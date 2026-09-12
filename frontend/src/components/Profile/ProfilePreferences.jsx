import {
    FaGraduationCap,
    FaLanguage,
    FaUniversity,
    FaHeart
} from "react-icons/fa";

export default function ProfilePreferences({

    preferences

}) {

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

                <FaHeart className="text-red-500 text-2xl" />

                <h2 className="text-2xl font-bold">

                    Préférences d'orientation

                </h2>

            </div>

            <div className="grid md:grid-cols-3 gap-6">

                {/* Bac */}

                <div
                    className="
                        bg-slate-50
                        rounded-2xl
                        p-6
                    "
                >

                    <div className="flex items-center gap-3 mb-4">

                        <FaUniversity className="text-blue-600 text-2xl" />

                        <h3 className="font-bold">

                            Baccalauréat

                        </h3>

                    </div>

                    <p className="text-slate-600">

                        {preferences?.bac || "-"}

                    </p>

                </div>

                {/* Niveau */}

                <div
                    className="
                        bg-slate-50
                        rounded-2xl
                        p-6
                    "
                >

                    <div className="flex items-center gap-3 mb-4">

                        <FaGraduationCap className="text-green-600 text-2xl" />

                        <h3 className="font-bold">

                            Niveau souhaité

                        </h3>

                    </div>

                    <p className="text-slate-600">

                        {preferences?.niveau || "-"}

                    </p>

                </div>

                {/* Langue */}

                <div
                    className="
                        bg-slate-50
                        rounded-2xl
                        p-6
                    "
                >

                    <div className="flex items-center gap-3 mb-4">

                        <FaLanguage className="text-purple-600 text-2xl" />

                        <h3 className="font-bold">

                            Langue

                        </h3>

                    </div>

                    <p className="text-slate-600">

                        {preferences?.langue || "-"}

                    </p>

                </div>

            </div>

            {/* Centres d'intérêt */}

            <div className="mt-10">

                <h3 className="font-bold text-lg mb-5">

                    Centres d'intérêt

                </h3>

                <div className="flex flex-wrap gap-3">

                    {

                        preferences?.interets?.length > 0

                            ?

                            preferences.interets.map((item) => (

                                <span

                                    key={item}

                                    className="
                                        px-4
                                        py-2
                                        rounded-full
                                        bg-blue-100
                                        text-blue-700
                                        font-medium
                                    "

                                >

                                    {item}

                                </span>

                            ))

                            :

                            <span className="text-slate-500">

                                Aucune préférence enregistrée.

                            </span>

                    }

                </div>

            </div>

        </div>

    );

}