import { FaGraduationCap } from "react-icons/fa";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Partie gauche */}

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 to-indigo-800 text-white items-center justify-center p-16">

        <div className="max-w-lg">

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-2xl bg-white text-blue-700 flex items-center justify-center text-3xl">

              <FaGraduationCap />

            </div>

            <div>

              <h1 className="text-4xl font-bold">

                OFM

              </h1>

              <p className="text-blue-100">

                Orientation Filière Maroc

              </p>

            </div>

          </div>

          <h2 className="text-5xl font-bold mt-16 leading-tight">

            Votre avenir universitaire commence ici.

          </h2>

          <p className="mt-8 text-xl text-blue-100 leading-9">

            Accédez à plus de 4451 filières,
            découvrez les métiers associés
            et échangez avec notre assistant
            intelligent.

          </p>

        </div>

      </div>

      {/* Partie droite */}

      <div className="flex-1 flex items-center justify-center p-10">

        {children}

      </div>

    </div>
  );
}