import {
  FaRobot,
  FaSearch,
  FaGraduationCap,
  FaChartLine,
  FaUniversity,
  FaBriefcase,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRobot />,
    title: "Assistant IA",
    description:
      "Discutez avec une intelligence artificielle qui vous guide vers les filières adaptées à votre profil.",
  },
  {
    icon: <FaSearch />,
    title: "Recherche intelligente",
    description:
      "Recherchez parmi plus de 4451 formations grâce à des filtres avancés.",
  },
  {
    icon: <FaGraduationCap />,
    title: "Comparaison des formations",
    description:
      "Comparez facilement plusieurs filières avant de prendre votre décision.",
  },
  {
    icon: <FaUniversity />,
    title: "Universités marocaines",
    description:
      "Explorez les programmes proposés par les principales universités du Maroc.",
  },
  {
    icon: <FaBriefcase />,
    title: "Débouchés",
    description:
      "Découvrez les métiers accessibles après chaque diplôme.",
  },
  {
    icon: <FaChartLine />,
    title: "Décision éclairée",
    description:
      "Toutes les informations sont regroupées pour vous aider à choisir sereinement.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center">

          <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">

            Fonctionnalités

          </span>

          <h2 className="text-5xl font-black text-slate-900 mt-8">

            Tout ce dont un étudiant a besoin

          </h2>

          <p className="text-slate-500 text-xl mt-6 max-w-3xl mx-auto">

            Orientation Filière Maroc centralise les formations,
            les universités,
            les débouchés
            et un assistant IA
            pour accompagner chaque étudiant.

          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {features.map((feature) => (

            <div
              key={feature.title}
              className="group bg-white rounded-3xl p-8 border border-slate-200 hover:border-blue-500 hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >

              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">

                {feature.icon}

              </div>

              <h3 className="text-2xl font-bold mt-8">

                {feature.title}

              </h3>

              <p className="text-slate-500 leading-8 mt-4">

                {feature.description}

              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}