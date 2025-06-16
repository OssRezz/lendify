import { useEffect, useState } from "react";
import { Modal } from "../../../../components/modal/Modal";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { ReturnBookController } from "../../controller/ReturnBookController"; 
import { GetBorrowerByBookController } from "../../controller/GetBorrowerByBookController";

const ReturnModal = ({ show, onClose, book, returnBookSubmit }) => {
  const [borrowData, setBorrowData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBorrower = async () => {
      if (book?.id) {
        setLoading(true);
        try {
          const response = await GetBorrowerByBookController(book.id);
          if (response.success) {
            setBorrowData(response.data);
          }
        } catch (error) {
          console.error("Error fetching borrower info:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (show) fetchBorrower();
  }, [show, book]);

  const handleReturn = async () => {
    console.log(borrowData);
    if (!borrowData?.user.id) return;

    const payload = {
      user_id: borrowData.user.id,
      book_ids: book.id,
    };

    const response = await ReturnBookController(payload);
    console.log(response);
    if (!response.success) {
      Swal.fire({
        icon: "error",
        title: response.title || "Error",
        html: Array.isArray(response.message)
          ? `<ul class="text-left">${response.message
              .map((msg) => `<li>• ${msg}</li>`)
              .join("")}</ul>`
          : response.message,
        confirmButtonText: "OK",
      });
      return;
    }

    returnBookSubmit(response);
    onClose();
  };

  const getDaysRemaining = () => {
    const today = dayjs();
    const dueDate = dayjs(borrowData?.due_date);
    return dueDate.diff(today, "day");
  };

  if (!show || !book) return null;

  const daysRemaining = getDaysRemaining();
  const lateReturn = daysRemaining < -5;

  return (
    <Modal show={show} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Return Book</h2>

      {loading ? (
        <p className="text-gray-500">Loading borrower info...</p>
      ) : borrowData ? (
        <div className="space-y-3">
          <p>
            <strong>Book:</strong> {book.title}
          </p>
          <p>
            <strong>Author:</strong> {book.author?.name}
          </p>
          <p>
            <strong>ISBN:</strong> {book.isbn}
          </p>
          <p>
            <strong>User:</strong> {borrowData?.user?.name} (
            {borrowData?.user?.email})
          </p>
          <p>
            <strong>Borrowed Date:</strong>{" "}
            {dayjs(borrowData?.borrowed_at).format("YYYY-MM-DD")}
          </p>
          <p>
            <strong>Due Date:</strong>{" "}
            {dayjs(borrowData?.due_date).format("YYYY-MM-DD")}
          </p>
          <p>
            <strong>Days Remaining:</strong>{" "}
            <span className={lateReturn ? "text-red-600 font-semibold" : ""}>
              {daysRemaining}
            </span>
          </p>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleReturn}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Confirm Return
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Borrower information not found.</p>
      )}
    </Modal>
  );
};

export default ReturnModal;
