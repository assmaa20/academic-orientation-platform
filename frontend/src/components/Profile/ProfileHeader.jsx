import {
    FaUserEdit,
    FaUserCircle,
    FaEnvelope,
    FaCalendarAlt
} from "react-icons/fa";

export default function ProfileHeader({

    user,

    onEdit

}) {

    return (

        <div
            className="
                bg-white
                rounded-3xl
                shadow
                p-8
                flex
                flex-col
                md:flex-row
                items-center
                justify-between
                gap-8
            "
        >

            {/* Avatar + Informations */}

            <div className="flex items-center gap-6">

                <div
                    className="
                        w-32
                        h-32
                        rounded-full
                        bg-blue-100
                        flex
                        items-center
                        justify-center
                        text-blue-600
                        text-7xl
                        shadow-inner
                    "
                >

                    {

                        user?.avatar

                            ?

                            <img

                                src={user.avatar}

                                alt="Avatar"

                                className="
                                    w-full
                                    h-full
                                    rounded-full
                                    object-cover
                                "

                            />

                            :

                            <FaUserCircle />

                    }

                </div>

                <div>

                    <h1
                        className="
                            text-4xl
                            font-bold
                            text-slate-800
                        "
                    >

                        {user?.name || "Utilisateur"}

                    </h1>

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-slate-500
                            mt-3
                        "
                    >

                        <FaEnvelope />

                        <span>

                            {user?.email || "-"}

                        </span>

                    </div>

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-slate-500
                            mt-2
                        "
                    >

                        <FaCalendarAlt />

                        <span>

                            Inscrit le{" "}

                            {

                                user?.created_at

                                    ?

                                    new Date(

                                        user.created_at

                                    ).toLocaleDateString(

                                        "fr-FR"

                                    )

                                    :

                                    "-"

                            }

                        </span>

                    </div>

                </div>

            </div>

            {/* Bouton Modifier */}

            <button

                onClick={onEdit}

                className="
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-8
                    py-4
                    rounded-2xl
                    flex
                    items-center
                    gap-3
                    font-semibold
                    transition
                    shadow
                "

            >

                <FaUserEdit />

                Modifier le profil

            </button>

        </div>

    );

}