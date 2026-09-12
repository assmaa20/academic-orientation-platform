import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";


export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">

      <div className="max-w-7xl mx-auto h-20 px-8 flex items-center justify-between">

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <div className="bg-blue-600 p-3 rounded-2xl shadow-lg">

            <FaGraduationCap
              className="text-white text-xl"
            />

          </div>

          <div>

            <h1 className="text-2xl font-extrabold text-slate-900">

              OFM

            </h1>

            <p className="text-sm text-slate-500">

              Orientation Filière Maroc

            </p>

          </div>

        </Link>

        <nav className="hidden lg:flex gap-10 font-medium text-slate-600">

          <a href="#features" className="hover:text-blue-600 transition">
            Fonctionnalités
          </a>

          <a href="#statistics" className="hover:text-blue-600 transition">
            Statistiques
          </a>

          <a href="#how" className="hover:text-blue-600 transition">
            Comment ça marche
          </a>

        </nav>

        <div className="flex gap-4">

          <Link
            to="/login"
            className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 transition"
          >
            Se connecter
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-lg"
          >
            Créer un compte
          </Link>

        </div>

      </div>

    </header>
  );
}