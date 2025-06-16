import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Modal } from "../../../../components/modal/Modal";
import Swal from "sweetalert2";
import { getRolesController } from "../../../roles/controller/GetRolesController";
import { updateUserController } from "../../controller/UpdateUserController";

const EditUserModal = ({ show, onClose, onUpdate, user }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);

  useEffect(() => {
    if (show && user) {
      fetchRoles();
      reset({
        name: user.name,
        email: user.email,
        library_id: user.library_id,
        role: {
          value: user.roles[0]?.name,
          label: user.roles[0]?.name,
        },
      });
    }
  }, [show, user]);

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

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      library_id: data.library_id,
      role: data.role.value,
    };

    const response = await updateUserController(user.id, payload);

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

    onUpdate?.(response);
    reset();
    onClose();
  };

  return (
    <Modal show={show} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Edit User</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            {...register("name", { required: true })}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
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
          />
          {errors.library_id && (
            <p className="text-red-500 text-xs">Library ID is required</p>
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
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditUserModal;
