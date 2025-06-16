const AdminDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-700 font-semibold">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600">124</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-700 font-semibold">Active Books</h2>
          <p className="text-3xl font-bold text-green-600">58</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-700 font-semibold">Pending Returns</h2>
          <p className="text-3xl font-bold text-red-600">7</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
