import { Modal } from "../../../../components/modal/Modal";
import { BookOpen, X } from "lucide-react";
import lendifyLogo from "../../../../assets/images/lendify.png";

const ViewBookModal = ({ show, onClose, book }) => {
  if (!book) return null;

  const imageUrl = book.image
    ? `${import.meta.env.VITE_PUBLIC_BASE_URL}storage/books/${book.image}`
    : lendifyLogo;

  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <BookOpen size={20} /> Book Details
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-500 transition"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <img
          src={imageUrl}
          alt={book.title}
          className="w-full sm:w-48 h-auto rounded shadow"
        />
        <div className="text-sm flex-1 space-y-2">
          <p>
            <strong>Title:</strong> {book.title}
          </p>
          <p>
            <strong>Author:</strong> {book.author?.name || "Unknown"}
          </p>
          <p>
            <strong>ISBN:</strong> {book.isbn}
          </p>
          <p>
            <strong>Year:</strong> {book.publication_year}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className="px-2 py-1 rounded text-xs font-medium"
              style={{
                backgroundColor: `#${
                  book.book_status?.background_color || "e5e7eb"
                }`,
                color: `#${book.book_status?.text_color || "111827"}`,
              }}
            >
              {book.book_status?.name || "No Status"}
            </span>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ViewBookModal;
