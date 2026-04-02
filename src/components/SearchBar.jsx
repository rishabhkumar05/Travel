import { useState } from "react";

function SearchBar({ placeholder, onSearch }) {

  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={query}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
}

export default SearchBar;