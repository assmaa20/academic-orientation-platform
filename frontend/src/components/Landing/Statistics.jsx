import {
  FaDatabase,
  FaUniversity,
  FaGraduationCap,
  FaBriefcase,
} from "react-icons/fa";

const stats = [
  {
    value: "4451",
    label: "Filières",
    icon: <FaDatabase />,
  },
  {
    value: "13",
    label: "Universités",
    icon: <FaUniversity />,
  },
  {
    value: "49",
    label: "Diplômes",
    icon: <FaGraduationCap />,
  },
  {
    value: "4356",
    label: "Métiers",
    icon: <FaBriefcase />,
  },
];

export default function Statistics() {
  return (
    <section
      id="statistics"
      className="py-28 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center">

          <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">

            Quelques chiffres

          </span>

          <h2 className="text-5xl font-black mt-8">

            Une base de données riche

          </h2>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {stats.map((item) => (

            <div
              key={item.label}
              className="bg-white rounded-3xl shadow-lg p-10 text-center hover:shadow-2xl hover:-translate-y-2 transition"
            >

              <div className="text-5xl text-blue-600 mb-6 flex justify-center">

                {item.icon}

              </div>

              <h3 className="text-6xl font-black text-slate-900">

                {item.value}

              </h3>

              <p className="text-slate-500 mt-3 text-lg">

                {item.label}

              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}