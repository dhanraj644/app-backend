export default function Card({
  title,
  value,
  icon,
  className = "",
}) {
  return (
    <div
      className={`bg-white rounded-xl shadow p-6 flex justify-between items-center ${className}`}
    >
      <div>
        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {value}
        </h2>
      </div>

      <div className="text-blue-600">
        {icon}
      </div>
    </div>
  );
}