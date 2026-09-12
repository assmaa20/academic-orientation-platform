import {
  FaUserPlus,
  FaSearch,
  FaRobot,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus />,
    number: "01",
    title: "Créez votre compte",
    description:
      "Inscrivez-vous gratuitement et confirmez votre adresse e-mail en quelques secondes.",
  },
  {
    icon: <FaSearch />,
    number: "02",
    title: "Explorez les filières",
    description:
      "Recherchez parmi des milliers de formations grâce aux filtres intelligents.",
  },
  {
    icon: <FaRobot />,
    number: "03",
    title: "Laissez l'IA vous guider",
    description:
      "Notre assistant analyse vos objectifs et vous recommande les formations adaptées.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center">

          <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">

            Comment ça marche ?

          </span>

          <h2 className="text-5xl font-black text-slate-900 mt-8">

            Trouvez votre orientation
            en seulement 3 étapes

          </h2>

          <p className="text-slate-500 text-xl mt-6 max-w-3xl mx-auto">

            Une expérience simple,
            rapide
            et accompagnée par
            l'intelligence artificielle.

          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-10 mt-24">

          {steps.map((step) => (

            <div
              key={step.number}
              className="relative bg-slate-50 rounded-3xl p-10 shadow-md hover:shadow-2xl hover:-translate-y-2 transition"
            >

              <div className="absolute top-8 right-8 text-6xl font-black text-slate-200">

                {step.number}

              </div>

              <div className="w-20 h-20 rounded-3xl bg-blue-600 text-white flex items-center justify-center text-3xl">

                {step.icon}

              </div>

              <h3 className="text-3xl font-bold mt-10">

                {step.title}

              </h3>

              <p className="text-slate-500 leading-8 mt-5">

                {step.description}

              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}