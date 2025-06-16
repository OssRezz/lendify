import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { getAuthorsController } from "../../../authors/controller/GetAuthorsController";
import { updateBookController } from "../../controller/UpdateBookController";
import Swal from "sweetalert2";
import { Modal } from "../../../../components/modal/Modal";

const UpdateBookModal = ({ show, onClose, onUpdate, book }) => {
  console.log(book);
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [authors, setAuthors] = useState([]);
  const [loadingAuthors, setLoadingAuthors] = useState(true);

  useEffect(() => {
    if (show && book) {
      fetchAuthors();
      reset({
        title: book.title,
        isbn: book.isbn,
        publication_year: book.publication_year,
        author_id: {
          value: book.author?.id,
          label: book.author?.name,
        },
      });
    }
  }, [show, book]);

  const fetchAuthors = async () => {
    try {
      const data = await getAuthorsController();
      const formatted = data.map((author) => ({
        value: author.id,
        label: author.name,
      }));
      setAuthors(formatted);
    } catch (error) {
      console.error("Error loading authors:", error);
    } finally {
      setLoadingAuthors(false);
    }
  };

  const onSubmit = async (data) => {
    const response = await updateBookController(data, book.id);

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

    onUpdate(response);
    reset();
    onClose();
  };

  if (!show || !book) return null;

  return (
    <Modal show={show} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Update Book</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            {...register("title", { required: true })}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Book title"
          />
          {errors.title && (
            <p className="text-red-500 text-xs">Title is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">ISBN</label>
          <input
            {...register("isbn", {
              required: true,
              minLength: 13,
              maxLength: 13,
            })}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            placeholder="13-digit ISBN"
          />
          {errors.isbn && (
            <p className="text-red-500 text-xs">13 characters required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Publication Year</label>
          <input
            type="number"
            {...register("publication_year", {
              required: true,
              min: 1500,
              max: new Date().getFullYear(),
            })}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            placeholder="e.g. 2022"
          />
          {errors.publication_year && (
            <p className="text-red-500 text-xs">
              Enter a valid year between 1500 and {new Date().getFullYear()}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Author</label>
          <Controller
            name="author_id"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={authors}
                isLoading={loadingAuthors}
                placeholder="Select an author..."
              />
            )}
          />
          {errors.author_id && (
            <p className="text-red-500 text-xs">Author is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Book Cover</label>
          <input
            type="file"
            accept="image/*"
            {...register("image_book")}
            className="w-full mt-1"
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={() => {
              reset();
              onClose();
            }}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateBookModal;
