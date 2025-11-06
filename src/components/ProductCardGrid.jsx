import React from "react";
import { Link } from "react-router-dom";

export default function ProductCardGrid({ products }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((p) => (
        <div
          key={p.id}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <h2 className="text-lg font-semibold text-indigo-700">{p.name}</h2>
          <p className="text-sm text-gray-600">{p.category}</p>
          <p className="mt-2 font-medium">₹{p.price}</p>
          <p className="text-sm text-gray-500 mt-1">
            Stock: {p.stock} |{" "}
            {p.isActive ? (
              <span className="text-green-600 font-semibold">Active</span>
            ) : (
              <span className="text-red-500 font-semibold">Inactive</span>
            )}
          </p>

          <p className="text-sm mt-2 text-gray-700">{p.description}</p>

          <Link
            to={`/edit/${p.id}`}
            className="inline-block mt-3 bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 text-sm"
          >
            Edit
          </Link>
        </div>
      ))}
    </div>
  );
}
