import { BookOpen, User } from "lucide-react";
import lendifyLogo from "../../../../assets/images/lendify.png";

const BookCard = ({ book, onBorrow, onReturn, isAvailable }) => {
  const imageUrl = book.image
    ? `${import.meta.env.VITE_PUBLIC_BASE_URL}storage/books/${book.image}`
    : lendifyLogo;

  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col items-center hover:shadow-lg transition-all w-64">
      <img
        src={imageUrl}
        alt={book.title}
        className="w-40 h-60 object-cover rounded mb-4"
      />
      <h3 className="text-md font-semibold text-center line-clamp-2 mb-1">
        {book.title}
      </h3>
      <p className="text-sm text-gray-600 text-center mb-1 flex items-center gap-1">
        <User size={14} /> {book.author?.name || "Unknown"}
      </p>
      <p className="text-xs text-gray-500 mb-3">ISBN: {book.isbn}</p>
      <button
        onClick={() => (isAvailable ? onBorrow(book) : onReturn(book))}
        className={`px-4 py-1 text-sm rounded transition-all ${
          isAvailable
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-green-600 text-white hover:bg-green-700"
        }`}
      >
        {isAvailable ? "Borrow" : "Return"}
      </button>
    </div>
  );
};

export default BookCard;
