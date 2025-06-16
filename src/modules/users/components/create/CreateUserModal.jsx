import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Modal } from "../../../../components/modal/Modal";
import Swal from "sweetalert2";
import { getRolesController } from "../../../roles/controller/GetRolesController";
import { saveUserController } from "../../controller/SaveUserController";

const CreateUserModal = ({ show, onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);

  const password = watch("password");

  useEffect(() => {
    if (show) {
      fetchRoles();
      const newId = generateLibraryId();
      setValue("library_id", newId);
    }
  }, [show]);

  const fetchRoles = async () => {
    try {
      const data = await getRolesController();
      const formatted = data.map((role) => ({
        value: role.name,
        label: role.name,
      }));
      setRoles(formatted);
    } catch (error) {
      console.error("Error loading roles:", error);
    } finally {
      setLoadingRoles(false);
    }
  };

  const generateLibraryId = () => {
    const random = Math.floor(100000 + Math.random() * 900000);
    return `LIB${random}`;
  };

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      library_id: data.library_id,
      password: data.password,
      role: data.role?.value,
    };

    const response = await saveUserController(payload);

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

    onSave?.(response);
    reset();
    onClose();
  };

  return (
    <Modal show={show} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Create New User</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            {...register("name", { required: true })}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            placeholder="User's name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">Name is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            placeholder="email@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">Valid email is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Library ID</label>
          <input
            {...register("library_id", { required: true })}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            placeholder="e.g. LIB123456"
          />
          {errors.library_id && (
            <p className="text-red-500 text-xs">Library ID is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Minimum 6 characters"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">
              Password must be at least 6 characters
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            {...register("password_confirmation", {
              required: true,
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Re-enter password"
          />
          {errors.password_confirmation && (
            <p className="text-red-500 text-xs">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Role</label>
          <Controller
            name="role"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={roles}
                isLoading={loadingRoles}
                placeholder="Select a role..."
              />
            )}
          />
          {errors.role && (
            <p className="text-red-500 text-xs">Role is required</p>
          )}
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
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateUserModal;
