import { useRef, useState } from "react";
import UserList from "../../modules/users/components/list/UserList";
import CreateUserModal from "../../modules/users/components/create/CreateUserModal";
import EditUserModal from "../../modules/users/components/update/EditUserModal";
import AlertClose from "../../components/alerts/AlertClose";
import { SuccessIcon } from "../../assets/icons/Icons";
import ViewUserModal from "../../modules/users/components/view/ViewUserModal";

const UserPage = () => {
  const userListRef = useRef();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [userToView, setUserToView] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    title: "",
    message: "",
    success: true,
  });

  const handleViewUser = (user) => {
    setUserToView(user);
    setShowViewModal(true);
  };

  const handleEditUser = (user) => {
    setUserToEdit(user);
    setShowEditModal(true);
  };

  const handleSaveUser = (res) => {
    setAlertMessage({
      title: res.title,
      message: res.message,
      success: res.success,
    });
    setShowAlert(true);
    userListRef.current?.reloadUsers();
  };

  const handleUpdateUser = (res) => {
    setAlertMessage({
      title: res.title,
      message: res.message,
      success: res.success,
    });
    setShowAlert(true);
    userListRef.current?.reloadUsers();
  };

  return (
    <div className="text-sm text-gray-700 font-sans p-6">
      {showAlert && (
        <AlertClose
          icon={SuccessIcon}
          title={alertMessage.title}
          content={alertMessage.message}
          colorClass="bg-green-100 text-green-700"
          onClose={() => setShowAlert(false)}
        />
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Users</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + New User
        </button>
      </div>

      <UserList ref={userListRef} onView={handleViewUser} onEdit={handleEditUser} />

      <CreateUserModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleSaveUser}
      />

      <EditUserModal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setUserToEdit(null);
        }}
        user={userToEdit}
        onUpdate={handleUpdateUser}
      />

      <ViewUserModal
        show={showViewModal}
        onClose={() => setShowViewModal(false)}
        user={userToView}
      />
    </div>
  );
};

export default UserPage;