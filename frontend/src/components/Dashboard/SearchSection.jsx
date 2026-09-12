import {
  FaSearch,
  FaSlidersH,
} from "react-icons/fa";

export default function SearchSection({

  search,

  setSearch,

}) {

  return (

    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-3xl font-black">

        Recherche intelligente

      </h2>

      <p className="text-slate-500 mt-2">

        Recherchez une filière par nom, diplôme,
        discipline ou métier.

      </p>

      <div className="mt-8 flex gap-4">

        <div className="flex-1 flex items-center bg-slate-100 rounded-2xl px-5">

          <FaSearch className="text-slate-400" />

          <input

            type="text"

            value={search}

            onChange={(e) =>

              setSearch(e.target.value)

            }

            className="w-full bg-transparent outline-none px-4 py-5"

            placeholder="Ex : Informatique, IA, Big Data..."

          />

        </div>

        <button className="w-16 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition">

          <FaSlidersH className="mx-auto" />

        </button>

      </div>

      <div className="flex flex-wrap gap-3 mt-8">

        <button
          onClick={() => setSearch("informatique")}
          className="px-5 py-2 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white transition"
        >
          Informatique
        </button>

        <button
          onClick={() => setSearch("master")}
          className="px-5 py-2 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white transition"
        >
          Master
        </button>

        <button
          onClick={() => setSearch("licence")}
          className="px-5 py-2 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white transition"
        >
          Licence
        </button>

        <button
          onClick={() => setSearch("ingénieur")}
          className="px-5 py-2 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white transition"
        >
          Ingénieur
        </button>

      </div>

    </div>

  );

}