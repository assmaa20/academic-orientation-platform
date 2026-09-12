import Navbar from "./Navbar";

import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaRobot,
  FaGraduationCap,
  FaUniversity
} from "react-icons/fa";

export default function Hero() {

  return (

    <>

      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-white pt-36 pb-28">

        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">

          {/* Texte */}

          <div>

            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold mb-8">

              🎓 Orientation Filière Maroc

            </div>

            <h1 className="text-6xl lg:text-7xl font-black leading-tight text-slate-900">

              Trouvez la

              <span className="text-blue-600">

                {" "}meilleure

              </span>

              <br />

              filière grâce

              <br />

              à l'IA.

            </h1>

            <p className="mt-8 text-xl text-slate-600 leading-9">

              Explorez plus de

              <strong> 4451 formations universitaires</strong>,

              comparez les diplômes,

              découvrez les métiers

              et laissez notre intelligence artificielle vous guider.

            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to="/register"
                className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition shadow-xl"
              >

                Commencer

                <FaArrowRight />

              </Link>

              <Link
                to="/login"
                className="px-8 py-4 rounded-2xl border border-slate-300 hover:bg-white transition"
              >

                Se connecter

              </Link>

            </div>

            <div className="grid grid-cols-3 gap-8 mt-16">

              <div>

                <FaGraduationCap className="text-blue-600 text-4xl mb-3" />

                <h3 className="font-bold text-3xl">

                  4451

                </h3>

                <p className="text-slate-500">

                  Filières

                </p>

              </div>

              <div>

                <FaUniversity className="text-blue-600 text-4xl mb-3" />

                <h3 className="font-bold text-3xl">

                  13

                </h3>

                <p className="text-slate-500">

                  Universités

                </p>

              </div>

              <div>

                <FaRobot className="text-blue-600 text-4xl mb-3" />

                <h3 className="font-bold text-3xl">

                  IA

                </h3>

                <p className="text-slate-500">

                  Assistant intelligent

                </p>

              </div>

            </div>

          </div>

          {/* Partie droite */}

          <div className="relative flex justify-center">

            <div className="bg-white rounded-[35px] shadow-2xl p-8 w-full max-w-lg">

              <div className="bg-slate-100 rounded-xl p-4">

                <p className="text-slate-500">

                  🤖 Assistant IA

                </p>

              </div>

              <div className="mt-6 bg-blue-50 rounded-2xl p-5">

                Bonjour 👋

                <br />

                Je peux vous aider à trouver

                la filière idéale selon :

                <ul className="mt-4 space-y-3 text-slate-700">

                  <li>✅ Votre moyenne</li>

                  <li>✅ Vos matières préférées</li>

                  <li>✅ Vos objectifs</li>

                  <li>✅ Les métiers souhaités</li>

                </ul>

              </div>

              <div className="mt-6 border rounded-xl p-4 text-slate-400">

                Posez votre question...

              </div>

              <button className="mt-6 w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition">

                Commencer une conversation

              </button>

            </div>

          </div>

        </div>

      </section>

    </>

  );

}