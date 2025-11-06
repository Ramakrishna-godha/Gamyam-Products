import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct({ products, setProducts }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 🟢 Find the product by ID (convert ID to number)
  const productToEdit = products.find((p) => Number(p.id) === Number(id));

  // 🟢 Prefill the form with existing product data
  useEffect(() => {
    if (productToEdit) {
      reset({
        ...productToEdit,
        // If tags is an array, convert it to a comma-separated string
        tags: Array.isArray(productToEdit.tags)
          ? productToEdit.tags.join(", ")
          : productToEdit.tags || "",
      });
    }
  }, [productToEdit, reset]);

  // 🟢 Handle form submission
  const onSubmit = (data) => {
    // Normalize tags safely (works for both string and array)
    const normalizedTags =
      typeof data.tags === "string"
        ? data.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : Array.isArray(data.tags)
        ? data.tags
        : [];

    const updatedProduct = {
      ...productToEdit,
      ...data,
      id: Number(productToEdit.id),
      price: Number(data.price),
      stock: Number(data.stock) || 0,
      isActive: !!data.isActive,
      tags: normalizedTags,
    };

    // Update product in list
    const updatedList = products.map((p) =>
      Number(p.id) === Number(updatedProduct.id) ? updatedProduct : p
    );

    // Save updates
    setProducts(updatedList);
    localStorage.setItem("products", JSON.stringify(updatedList));
    navigate("/");
  };

  // 🟢 If product not found
  if (!productToEdit) {
    return (
      <p className="text-center text-red-500 mt-10">
        Product not found.{" "}
        <span
          onClick={() => navigate("/")}
          className="text-indigo-600 underline cursor-pointer"
        >
          Go back
        </span>
      </p>
    );
  }

  // 🟢 Render form
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
        ✏️ Edit Product
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
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-500"
            rows={3}
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
          />
        </div>

        {/* Active Toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register("isActive")}
          />
          <label>Active Product</label>
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
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
