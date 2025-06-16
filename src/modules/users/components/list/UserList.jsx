import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { GetUsersController } from "../../controller/GetUsersController";
import TableSkeleton from "../../../../components/tables/TableSkeleton";
import Pagination from "../../../../components/tables/Pagination"; 
import { Eye, Pencil } from "lucide-react";

const UserList = forwardRef(({ onView, onEdit }, ref) => {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const columns = ["Name", "Email", "Role", "Actions"];

  const fetchUsers = async (pageToFetch = page) => {
    setLoading(true);
    try {
      const data = await GetUsersController(pageToFetch);
      setUsers(data.data);
      setMeta({
        current_page: data.current_page,
        last_page: data.last_page,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    reloadUsers: () => fetchUsers(1),
  }));

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  return (
    <>
      <div className="overflow-x-auto text-sm text-gray-700 font-sans">
        <table className="min-w-full bg-white rounded-xl shadow-sm overflow-hidden">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-6 py-4 text-left font-semibold tracking-wide"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          {loading ? (
            <TableSkeleton columns={columns} rows={10} />
          ) : (
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 capitalize">
                    {user.roles?.[0]?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        className="text-blue-600 hover:text-blue-800 transition"
                        title="View"
                        onClick={() => onView?.(user)}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="text-yellow-600 hover:text-yellow-800 transition"
                        title="Edit"
                        onClick={() => onEdit?.(user)}
                      >
                        <Pencil size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <Pagination
        currentPage={meta.current_page}
        totalPages={meta.last_page}
        onPageChange={setPage}
      />
    </>
  );
});

export default UserList;