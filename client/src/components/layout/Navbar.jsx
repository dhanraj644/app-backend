import { Bell, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">

      <div className="flex justify-between items-center px-6 py-4">

        <h2 className="text-2xl font-bold">
          Admin Dashboard
        </h2>

        <div className="flex items-center gap-4">

          <button>
            <Bell />
          </button>

          <div className="flex items-center gap-2">

            <UserCircle size={32} />

            <span className="font-medium">
              Admin
            </span>

          </div>

        </div>

      </div>

    </header>
  );
}