import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initialProducts } from "./data/products";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

export default function App() {
  const [products, setProducts] = useState([]);

  // ✅ Load data once on startup
  useEffect(() => {
    // Get saved products from localStorage
    const stored = localStorage.getItem("products");

    if (stored) {
      const savedProducts = JSON.parse(stored);

      // Merge initialProducts (from data file) + stored ones
      // without duplicating same IDs
      const merged = [
        ...initialProducts.filter(
          (item) => !savedProducts.some((p) => p.id === item.id)
        ),
        ...savedProducts,
      ];

      setProducts(merged);
    } else {
      // If nothing in localStorage, load default data
      setProducts(initialProducts);
    }
  }, []);

  // ✅ Keep localStorage in sync whenever products change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* Top Navigation */}
        <Navbar />

        {/* Main Content */}
        <div className="p-6">
          <Routes>
            {/* Product List (Home) */}
            <Route
              path="/"
              element={
                <ProductList
                  products={products}
                  setProducts={setProducts}
                />
              }
            />

            {/* Add Product */}
            <Route
              path="/add"
              element={
                <AddProduct
                  products={products}
                  setProducts={setProducts}
                />
              }
            />

            {/* Edit Product */}
            <Route
              path="/edit/:id"
              element={
                <EditProduct
                  products={products}
                  setProducts={setProducts}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
