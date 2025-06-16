// Sidebar.jsx
import {
  LayoutDashboard,
  Users,
  BookOpen,
  LogOut,
  BookCopy,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";
import HasPermission from "../permissions/HasPermission";

const Sidebar = ({ show, onClose }) => {
  const { logout } = useAuth();

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
      isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
    }`;

  const handleClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        show ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-16 flex items-center justify-center">
        <h1 className="text-xl font-bold text-blue-600">Lendify</h1>
      </div>

      <nav className="mt-4 px-4 space-y-1">
        <NavLink to="/dashboard" className={linkClasses} onClick={handleClick}>
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>

        <HasPermission permission="users.index">
          <NavLink to="/users" className={linkClasses} onClick={handleClick}>
            <Users size={18} /> Users
          </NavLink>
        </HasPermission>

        <HasPermission permission="books.index">
          <NavLink to="/books" className={linkClasses} onClick={handleClick}>
            <BookOpen size={18} /> Books
          </NavLink>
        </HasPermission>

        <HasPermission permission="borrowings.index">
          <NavLink
            to="/borrowings"
            className={linkClasses}
            onClick={handleClick}
          >
            <BookCopy size={18} /> Borrow
          </NavLink>
        </HasPermission>
      </nav>

      <div className="absolute bottom-0 w-full px-4 mb-4">
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 w-full rounded-lg"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;