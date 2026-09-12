export default function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div className="bg-white rounded-3xl p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      <div
        className={`w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl ${color}`}
      >
        {icon}
      </div>

      <h2 className="text-4xl font-bold mt-6 text-slate-800">
        {value}
      </h2>

      <p className="text-gray-500 mt-2">
        {title}
      </p>

      <div className="mt-5 text-green-600 font-medium">

        ↗ Données mises à jour

      </div>

    </div>
  );
}