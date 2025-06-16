import { Modal } from "../../../../components/modal/Modal";
import { Users, X } from "lucide-react";
import lendifyLogo from "../../../../assets/images/lendify.png";

const ViewUserModal = ({ show, onClose, user }) => {
  if (!user) return null;

  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Users size={20} /> User Details
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
          src={lendifyLogo}
          alt="User"
          className="w-full sm:w-32 h-auto rounded shadow"
        />
        <div className="text-sm flex-1 space-y-2">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Library ID:</strong> {user.library_id}
          </p>
          <p>
            <strong>Role:</strong> {user.roles?.[0]?.name || "No role"}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(user.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ViewUserModal;