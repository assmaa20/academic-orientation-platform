import { FaSun, FaArrowTrendUp } from "react-icons/fa6";

const user = JSON.parse(localStorage.getItem("user"));

export default function Hero() {

    const hour = new Date().getHours();

    let greeting = "Bonsoir";

    if (hour < 12) greeting = "Bonjour";
    else if (hour < 18) greeting = "Bon après-midi";

    return (

        <section className="rounded-[35px] overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white">

            <div className="p-12">

                <div className="flex justify-between items-start">

                    <div>

                        <span className="bg-white/20 px-5 py-2 rounded-full inline-flex items-center gap-3">

                            <FaSun />

                            {greeting}

                        </span>

                        <h1 className="text-5xl font-black mt-8">

                            {greeting} {user?.prenom} 👋

                        </h1>

                        <p className="mt-6 text-xl text-blue-100 max-w-2xl leading-9">

                            Heureux de vous revoir.

                            Continuez à explorer les filières universitaires,

                            découvrez les métiers associés

                            et laissez notre IA vous guider.

                        </p>

                    </div>

                    <div className="hidden lg:block">

                        <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-lg">

                            <FaArrowTrendUp className="text-5xl" />

                            <h2 className="mt-6 text-3xl font-bold">

                                Progression

                            </h2>

                            <p className="mt-3 text-blue-100">

                                Continuez votre exploration.

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}