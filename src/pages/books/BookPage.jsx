import { useRef, useState } from "react";
import BookList from "../../modules/books/components/list/BooksList";
import CreateBookModal from "../../modules/books/components/create/CreateBookModal";
import UpdateBookModal from "../../modules/books/components/update/UpdateBookModal"; // 👈 nuevo
import { SuccessIcon } from "../../assets/icons/Icons";
import AlertClose from "../../components/alerts/AlertClose";
import ViewBookModal from "../../modules/books/components/view/ViewBookModal";

const BookPage = () => {
  const bookListRef = useRef(null);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const [alertMessage, setAlertMessage] = useState({
    title: "",
    message: "",
    success: true,
  });

  const handleSaveBook = (res) => {
    setAlertMessage({
      title: res.title,
      message: res.message,
      success: res.success,
    });
    setShow(true);

    if (res.success && bookListRef.current) {
      bookListRef.current.reloadBooks();
    }
  };

  const handleViewBook = (book) => {
    setSelectedBook(book);
    setShowViewModal(true);
  };

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setShowEditModal(true);
  };

  return (
    <div className="text-sm text-gray-700 font-sans p-6">
      {show && (
        <AlertClose
          icon={SuccessIcon}
          title={alertMessage.title}
          content={alertMessage.message}
          colorClass="bg-green-100 text-green-700"
          onClose={() => setShow(false)}
        />
      )}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Books</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + New book
        </button>
      </div>

      <BookList
        ref={bookListRef}
        onView={handleViewBook}
        onEdit={handleEditClick}
      />

      <CreateBookModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveBook}
      />

      <ViewBookModal
        show={showViewModal}
        onClose={() => setShowViewModal(false)}
        book={selectedBook}
      />

      <UpdateBookModal
        show={showEditModal}
        book={selectedBook}
        onClose={() => setShowEditModal(false)}
        onUpdate={handleSaveBook}
      />
    </div>
  );
};

export default BookPage;
