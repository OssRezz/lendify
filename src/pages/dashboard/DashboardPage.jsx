import { useAuth } from "../../context/auth/AuthContext";
import AdminDashboard from "../../modules/dashboard/components/client/ClientDashboard"; 
import ClientDashboard from "../../modules/dashboard/components/admin/AdminDashboard";

const DashboardPage = () => {
  const { user } = useAuth();
  console.log("user");
  console.log(user);
  
  if (!user) return null;
  switch (user.role) {
    case "Admin":
      return <AdminDashboard />;
    case "Client":
      return <ClientDashboard />;
    default:
      return (
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            No dashboard available for your role
          </h1>
        </div>
      );
  }
};

export default DashboardPage;