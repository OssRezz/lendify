const BookCardSkeleton = () => {
  return (
    <div className="bg-white shadow rounded-xl p-4 w-64 animate-pulse">
      <div className="w-40 h-60 bg-gray-300 mx-auto rounded mb-4" />
      <div className="h-4 bg-gray-300 rounded mb-2" />
      <div className="h-3 bg-gray-200 rounded mb-1" />
      <div className="h-3 bg-gray-200 rounded mb-4 w-3/4" />
      <div className="h-8 bg-gray-300 rounded w-full" />
    </div>
  );
};

export default BookCardSkeleton;