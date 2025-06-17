import { Menu, Bell } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/auth/AuthContext"; 

const Nav = ({ onToggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useAuth();

  const notifications = [
    {
      id: 1,
      message: "Return 'Clean Code' in 2 days",
      time: "2d",
    },
    {
      id: 2,
      message: "'Design Patterns' due tomorrow",
      time: "1d",
    },
  ];

  return (
    <header className="w-full h-16 bg-white shadow px-4 flex items-center justify-between lg:justify-end relative z-30">
      <button
        onClick={onToggleSidebar}
        className="lg:hidden text-gray-600"
        aria-label="Toggle sidebar"
      >
        <Menu size={24} />
      </button>

      <div className="flex items-center gap-6">
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative focus:outline-none"
            aria-label="Toggle notifications"
          >
            <Bell size={22} className="text-gray-600" />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
              <div className="p-3 border-b font-semibold text-gray-700">
                Notifications
              </div>
              <ul className="max-h-60 overflow-y-auto">
                {notifications.map((note) => (
                  <li
                    key={note.id}
                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                  >
                    <div className="font-medium">{note.message}</div>
                    <div className="text-xs text-gray-400">
                      {note.time} left
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-700 font-medium hidden sm:block">
            Hi, {user?.name || "Admin"}
          </span>
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="rounded-full w-8 h-8"
          />
        </div>
      </div>
    </header>
  );
};

export default Nav;