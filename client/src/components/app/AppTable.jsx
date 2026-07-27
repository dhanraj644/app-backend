import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function AppTable({
  apps,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="text-left p-4">
              App Name
            </th>

            <th className="text-left p-4">
              App Code
            </th>

            <th className="text-center p-4">
              Status
            </th>

            <th className="text-center p-4">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {apps.length === 0 ? (
            <tr>

              <td
                colSpan={4}
                className="text-center py-8 text-gray-500"
              >
                No Apps Found
              </td>

            </tr>
          ) : (
            apps.map((app) => (
              <tr
                key={app._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {app.appName}
                </td>

                <td className="p-4">
                  {app.appCode}
                </td>

                <td className="text-center">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      app.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {app.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>

                </td>

                <td>

                  <div className="flex justify-center gap-4">

                    <Link
                      to={`/apps/${app._id}`}
                    >
                      <Eye
                        className="text-blue-600 hover:text-blue-800"
                      />
                    </Link>

                    <Link
                      to={`/apps/edit/${app._id}`}
                    >
                      <Pencil
                        className="text-yellow-500 hover:text-yellow-700"
                      />
                    </Link>

                    <button
                      onClick={() =>
                        onDelete(app._id)
                      }
                    >
                      <Trash2
                        className="text-red-600 hover:text-red-800"
                      />
                    </button>

                  </div>

                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}