import {

  FaUniversity,

  FaGraduationCap,

} from "react-icons/fa";

export default function RecentFilieres({

  filieres,

}) {

  return (

    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="flex justify-between items-center">

        <h2 className="text-3xl font-black">

          Résultats

        </h2>

        <span className="text-slate-500">

          {filieres.length} filières

        </span>

      </div>

      <div className="mt-8 space-y-5">

        {

          filieres.length === 0 ?

          (

            <p className="text-center text-slate-500 py-10">

              Aucun résultat.

            </p>

          )

          :

          filieres.map((f) => (

            <div

              key={f.id}

              className="border rounded-2xl p-6 hover:border-blue-600 transition"

            >

              <h2 className="font-bold text-2xl">

                {f.code_filiere}

              </h2>

              <div className="flex flex-wrap gap-6 mt-5">

                <span className="flex items-center gap-2">

                  <FaUniversity />

                  Université {f.code_universite}

                </span>

                <span className="flex items-center gap-2">

                  <FaGraduationCap />

                  {f.libelle_diplome}

                </span>

              </div>

              <p className="mt-4 text-blue-600">

                {f.discipline}

              </p>

              <p className="mt-4 text-slate-600 line-clamp-3">

                {f.description}

              </p>

            </div>

          ))

        }

      </div>

    </div>

  );

}