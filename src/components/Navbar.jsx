import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="bg-indigo-600 text-white py-3 px-6 flex justify-between items-center shadow-md">
      <Link
        to="/"
        className="text-lg font-semibold"
      >
        🛍️ Gamyam Products
      </Link>

      <div className="flex gap-3">
        {pathname !== "/add" && (
          <Link
            to="/add"
            className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-indigo-100"
          >
            + Add Product
          </Link>
        )}
      </div>
    </nav>
  );
}
