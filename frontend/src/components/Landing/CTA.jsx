import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function CTA() {

    return (

        <section className="py-28 bg-gradient-to-r from-blue-600 to-indigo-700">

            <div className="max-w-6xl mx-auto px-8 text-center text-white">

                <h2 className="text-5xl font-black">

                    Votre avenir commence aujourd'hui.

                </h2>

                <p className="mt-8 text-xl text-blue-100 max-w-3xl mx-auto leading-9">

                    Rejoignez Orientation Filière Maroc
                    et trouvez la formation qui correspond
                    réellement à vos ambitions.

                </p>

                <Link
                    to="/register"
                    className="inline-flex items-center gap-4 mt-12 bg-white text-blue-700 px-10 py-5 rounded-2xl text-lg font-bold hover:scale-105 transition"
                >

                    Créer un compte

                    <FaArrowRight />

                </Link>

            </div>

        </section>

    );

}