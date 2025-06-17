import { useEffect, useState } from "react";
import { GetBorrowBooksController } from "../../modules/borrowings/controller/GetBorrowBooksController";
import BookCard from "../../modules/borrowings/components/borrow/BookCard";
import BookCardSkeleton from "../../modules/borrowings/components/borrow/BookCardSkeleton";
import SearchBar from "../../modules/borrowings/components/borrow/SearchBar";
import { motion, AnimatePresence } from "framer-motion";
import BorrowModal from "../../modules/borrowings/components/borrow/BorrowModal";
import AlertClose from "../../components/alerts/AlertClose";
import { SuccessIcon } from "../../assets/icons/Icons";
import ReturnModal from "../../modules/borrowings/components/return/ReturnModal";

const ITEMS_PER_PAGE = 6;
let debounceTimeout;

const BorrowPage = () => {
  const [loading, setLoading] = useState(true);
  const [availableBooks, setAvailableBooks] = useState([]);
  const [toReturnBooks, setToReturnBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [show, setShow] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnBook, setReturnBook] = useState(null);
  const [alertMessage, setAlertMessage] = useState({
    title: "",
    message: "",
    success: true,
  });

  const openReturnModal = (book) => {
    setReturnBook(book);
    setShowReturnModal(true);
  };

  const closeReturnModal = () => {
    setReturnBook(null);
    setShowReturnModal(false);
  };

  const openBorrowModal = (book) => {
    setSelectedBook(book);
    setShowBorrowModal(true);
  };

  const closeBorrowModal = () => {
    setShowBorrowModal(false);
    setSelectedBook(null);
  };

  const fetchBooks = async (term = "") => {
    setLoading(true);
    try {
      const data = await GetBorrowBooksController(term);
      setAvailableBooks(data.available);
      setToReturnBooks(data.to_return);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      fetchBooks(searchTerm);
    }, 500); 
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const paginatedBooks = (books) => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return books.slice(start, start + ITEMS_PER_PAGE);
  };

  const handleBorrowBook = async (res) => {
    setAlertMessage({
      title: res.title,
      message: res.message,
      success: res.success,
    });
    setShow(true);
    fetchBooks();
    closeBorrowModal();
  };

  const handleReturnBook = (res) => {
    setAlertMessage({
      title: res.title,
      message: res.message,
      success: res.success,
    });
    setShow(true);
    fetchBooks();
  };

  const totalPages = Math.ceil(availableBooks.length / ITEMS_PER_PAGE);

  return (
    <div className="p-6">
      {show && (
        <AlertClose
          icon={SuccessIcon}
          title={alertMessage.title}
          content={alertMessage.message}
          colorClass="bg-green-100 text-green-700"
          onClose={() => setShow(false)}
        />
      )}
      <h1 className="text-2xl font-semibold mb-4">Search books</h1>
      <SearchBar onSearch={handleSearch} />

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeletons"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <BookCardSkeleton key={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {toReturnBooks.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Books to Return</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {toReturnBooks.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      onBorrow={openBorrowModal}
                      onReturn={openReturnModal}
                      isAvailable={false}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Available Books</h2>
              {availableBooks.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedBooks(availableBooks).map((book) => (
                      <BookCard
                        key={book.id}
                        book={book}
                        onBorrow={openBorrowModal}
                        onReturn={openReturnModal}
                        isAvailable={true}
                      />
                    ))}
                  </div>

                  <div className="mt-6 flex justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          currentPage === i + 1
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-gray-500">
                  No books found for the selected filter.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BorrowModal
        show={showBorrowModal}
        onClose={closeBorrowModal}
        book={selectedBook}
        borrowBookSubmit={handleBorrowBook}
      />
      <ReturnModal
        show={showReturnModal}
        onClose={closeReturnModal}
        book={returnBook}
        returnBookSubmit={handleReturnBook}
      />
    </div>
  );
};

export default BorrowPage;
