import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      placeholder="Search by title, author or ISBN..."
      value={search}
      onChange={handleChange}
      className="w-full max-w-md px-4 py-2  border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
    />
  );
};

export default SearchBar;
