const TableSkeleton = ({ columns = [] }) => {
  const rows = 10;

  return (
    <tbody className="divide-y divide-gray-200">
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <tr key={rowIdx} className="bg-white hover:bg-gray-50 transition">
          {columns.map((_, colIdx) => (
            <td key={colIdx} className="px-6 py-4">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableSkeleton;