import { useEffect, useState } from "react";
import { getApps, deleteApp } from "../api/appApi";
import { toast } from "react-toastify";

export default function AppList() {

  const [apps, setApps] = useState([]);

  const fetchApps = async () => {
    const res = await getApps();
    setApps(res.data.data);
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteApp(id);

      toast.success("Deleted");

      fetchApps();

    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="p-5">

      <h2 className="text-2xl font-bold mb-5">
        Apps
      </h2>

      <table className="table-auto border w-full">

        <thead>

          <tr>

            <th>Name</th>
            <th>Code</th>
            <th>Status</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {apps.map((app) => (

            <tr key={app._id}>

              <td>{app.appName}</td>

              <td>{app.appCode}</td>

              <td>

                {app.isActive ? "Active" : "Inactive"}

              </td>

              <td>

                <button
                  onClick={() => handleDelete(app._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}