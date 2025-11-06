import React, { useState } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import ProductTable from "../components/ProductTable";
import ProductCardGrid from "../components/ProductCardGrid";
import Pagination from "../components/Pagination";

export default function ProductList({ products, setProducts }) {
  const [search, setSearch] = useState("");
  const [view, setView] = useState("table");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  // Debounced search input
  const handleSearch = debounce((value) => {
    setSearch(value.toLowerCase());
    setCurrentPage(1);
  }, 500);

  // Filtered data
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search)
  );

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div>
      {/* Search & Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-3">
        <input
          type="text"
          placeholder="Search product..."
          onChange={(e) => handleSearch(e.target.value)}
          className="border px-4 py-2 rounded-md w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={() => setView(view === "table" ? "grid" : "table")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {view === "table" ? "Grid View" : "Table View"}
        </button>
      </div>

      {/* Products Display */}
      {view === "table" ? (
        <ProductTable products={paginated} />
      ) : (
        <ProductCardGrid products={paginated} />
      )}

      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* No results found */}
      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No products found matching your search.
        </p>
      )}
    </div>
  );
}
