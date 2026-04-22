import { useState, useEffect } from "react";
import PackageCard from "../components/PackageCard";
import packagesData from "../data/packages";
import SearchBar from "../components/SearchBar";

function Packages() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const filteredPackages = packagesData.filter((p) => {
    const q = debouncedQuery.toLowerCase().trim();
    if (!q) return true;

    return (
      p.name.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      (p.description || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Tour Packages
      </h1>

      <div className="mb-6">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search by name, location..."
        />
      </div>

      {filteredPackages.length === 0 ? (
        <p className="text-gray-500">
          No packages found. Try a different search.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Packages;