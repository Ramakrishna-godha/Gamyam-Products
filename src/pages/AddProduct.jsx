import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function AddProduct({ products, setProducts }) {
  const navigate = useNavigate();

  // Setup form using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle submit
  const onSubmit = (data) => {
    const newProduct = {
      id: Date.now(),
      name: data.name,
      price: Number(data.price),
      category: data.category,
      stock: Number(data.stock) || 0,
      description: data.description || "",
      isActive: true,
      createdAt: new Date().toISOString(),
      tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
    };

    setProducts([newProduct, ...products]);
    localStorage.setItem("products", JSON.stringify([newProduct, ...products]));
    reset();
    navigate("/"); // go back to home page
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
        ➕ Add New Product
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name*</label>
          <input
            {...register("name", { required: "Product name is required" })}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter product name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price*</label>
          <input
            type="number"
            {...register("price", {
              required: "Price is required",
              min: { value: 1, message: "Price must be positive" },
            })}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter price (₹)"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category*</label>
          <input
            {...register("category", { required: "Category is required" })}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="Electronics / Furniture / Kitchen etc."
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Stock */}
        <div>
          <label className="block mb-1 font-medium">Stock</label>
          <input
            type="number"
            {...register("stock")}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter available stock"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-500"
            rows={3}
            placeholder="Short description of the product"
          ></textarea>
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-1 font-medium">
            Tags{" "}
            <span className="text-gray-500 text-sm">(comma-separated)</span>
          </label>
          <input
            {...register("tags")}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="wireless, mouse, accessories"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md font-medium"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
