const ClientDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Client Dashboard</h1>
      <div className="space-y-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-700 font-semibold">Books Borrowed</h2>
          <p className="text-xl text-blue-600">You have borrowed 3 books</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-700 font-semibold">Next Return Date</h2>
          <p className="text-xl text-green-600">June 20, 2025</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-700 font-semibold">Overdue Books</h2>
          <p className="text-xl text-red-600">1 book overdue</p>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
