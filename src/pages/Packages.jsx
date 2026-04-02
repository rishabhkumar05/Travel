import { useState } from "react";
import PackageCard from "../components/PackageCard";
import packagesData from "../data/packages";
import SearchBar from "../components/SearchBar";

function Packages() {

  const [packages, setPackages] = useState(packagesData);

  const handleSearch = (query) => {
    const filtered = packagesData.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setPackages(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Tour Packages
      </h1>

      <div className="mb-6">
        <SearchBar
          placeholder="Search packages..."
          onSearch={handleSearch}
        />
      </div>

      {packages.length === 0 ? (
        <p className="text-gray-500">No packages found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}

        </div>
      )}

    </div>
  );
}

export default Packages;