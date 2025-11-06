import React from "react";
import { Link } from "react-router-dom";

export default function ProductTable({ products }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-indigo-100 text-indigo-700 uppercase text-xs font-semibold">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Active</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr
              key={p.id}
              className="border-t hover:bg-gray-50 transition-colors"
            >
              <td className="p-3 font-medium">{p.name}</td>
              <td className="p-3">{p.category}</td>
              <td className="p-3">₹{p.price}</td>
              <td className="p-3">{p.stock}</td>
              <td className="p-3">
                {p.isActive ? (
                  <span className="text-green-600 font-medium">Active</span>
                ) : (
                  <span className="text-red-500 font-medium">Inactive</span>
                )}
              </td>
              <td className="p-3">
                <Link
                  to={`/edit/${p.id}`}
                  className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
