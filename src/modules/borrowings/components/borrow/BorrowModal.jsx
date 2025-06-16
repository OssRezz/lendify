import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import dayjs from "dayjs";
import { GetAllUsersController } from "../../../users/controller/GetAllUsersController";
import { useAuth } from "../../../../context/auth/AuthContext";
import { Modal } from "../../../../components/modal/Modal";
import { BorrowBookController } from "../../controller/BorrowBookController";
import Swal from "sweetalert2";

const BorrowModal = ({ show, onClose, book, borrowBookSubmit }) => {
  const { user } = useAuth();
  const [userOptions, setUserOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const maxReturnDate = dayjs().add(14, "day").format("YYYY-MM-DD");

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user_id: null,
      book_id: null,
    },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      if (user?.role !== "Client") {
        setLoading(true);
        try {
          const data = await GetAllUsersController();
          const formatted = data.data.map((u) => ({
            label: `${u.name} (${u.email})`,
            value: u.id,
          }));
          setUserOptions(formatted);
        } catch (error) {
          console.error("Error fetching users:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // Cliente: autocompletar y bloquear user_id
        setValue("user_id", {
          label: `${user.name} (${user.email})`,
          value: user.id,
        });
      }
    };

    if (show && book) {
      reset(); // Limpiar el formulario
      setValue("book_id", book.id); // Asignar ID del libro
      fetchUsers();
    }
  }, [show, book]);

  const onSubmit = async (data) => {
    const payload = {
      book_ids: data.book_id,
      user_id: data.user_id.value,
    };
    console.log(payload);
    const response = await BorrowBookController(payload);

    if (!response.success) {
      Swal.fire({
        icon: "error",
        title: response.title || "Error",
        html:
          Array.isArray(response.message) && response.message.length
            ? `<ul class="text-left">${response.message
                .map((msg) => `<li>• ${msg}</li>`)
                .join("")}</ul>`
            : response.message,
        confirmButtonText: "OK",
      });
      return;
    }

    borrowBookSubmit(response);
    reset();
    onClose();
  };

  if (!show || !book) return null;

  return (
    <Modal show={show} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Borrow Book</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Campo oculto para book_id */}
        <input type="hidden" {...register("book_id", { required: true })} />

        <div>
          <strong>Book:</strong> {book.title} <br />
          <strong>Author:</strong> {book.author?.name || "Unknown"} <br />
          <strong>ISBN:</strong> {book.isbn}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Client</label>
          {user?.role === "Cliente" ? (
            <input
              type="text"
              value={`${user.name} (${user.email})`}
              readOnly
              className="w-full bg-gray-100 border px-3 py-2 rounded"
            />
          ) : (
            <Controller
              control={control}
              name="user_id"
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={userOptions}
                  isLoading={loading}
                  placeholder="Select user..."
                />
              )}
            />
          )}
          {errors.user_id && (
            <p className="text-red-500 text-xs mt-1">User is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Return before</label>
          <p className="text-blue-600">{maxReturnDate}</p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Borrow
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BorrowModal;
