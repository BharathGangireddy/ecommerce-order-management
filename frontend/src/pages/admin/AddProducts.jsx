import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";

import AdminSidebar from "./AdminSidebar";

const AddProduct = () => {
  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.post("/products", data);
    alert("Product Added");
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold mb-6">
          Add Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow space-y-4"
        >
          <input placeholder="Name" className="border p-2 w-full"
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />

          <input placeholder="Price" className="border p-2 w-full"
            onChange={(e) => setData({ ...data, price: e.target.value })}
          />

          <input placeholder="Stock" className="border p-2 w-full"
            onChange={(e) => setData({ ...data, stock: e.target.value })}
          />

          <input placeholder="Image URL" className="border p-2 w-full"
            onChange={(e) => setData({ ...data, image: e.target.value })}
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;