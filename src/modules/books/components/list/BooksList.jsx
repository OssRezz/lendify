import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { GetBooksController } from "../../controller/GetBooksController";
import TableSkeleton from "../../../../components/tables/TableSkeleton";
import Pagination from "../../../../components/tables/Pagination";
import { Eye, Pencil, Trash2, History } from "lucide-react";

const BookList = forwardRef(({ onView, onEdit }, ref) => {
  const [books, setBooks] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const columns = ["Title", "Author", "ISBN", "Status", "Actions"];

  const fetchBooks = async (pageToFetch = page) => {
    setLoading(true);
    try {
      const data = await GetBooksController(pageToFetch);
      setBooks(data.data);
      setMeta({
        current_page: data.current_page,
        last_page: data.last_page,
      });
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    reloadBooks: () => fetchBooks(1),
  }));

  useEffect(() => {
    fetchBooks(page);
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
              {books.map((book, index) => {
                const status = book.book_status || {};
                const bgColor = status.background_color
                  ? `#${status.background_color}`
                  : "#e5e7eb";
                const textColor = status.text_color
                  ? `#${status.text_color}`
                  : "#111827";

                return (
                  <tr
                    key={book.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4">{book.title}</td>
                    <td className="px-6 py-4">
                      {book.author?.name || "Unknown"}
                    </td>
                    <td className="px-6 py-4">{book.isbn}</td>
                    <td className="px-6 py-4">
                      <span
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{ backgroundColor: bgColor, color: textColor }}
                      >
                        {status.name || "No Status"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          className="text-blue-600 hover:text-blue-800 transition"
                          title="View"
                          onClick={() => onView?.(book)}
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="text-yellow-600 hover:text-yellow-800 transition"
                          title="Edit"
                          onClick={() => onEdit?.(book)}
                        >
                          <Pencil size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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

export default BookList;
