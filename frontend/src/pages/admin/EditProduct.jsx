import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import AdminSidebar from "./AdminSidebar";


const EditProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    axiosInstance.get(`/products/${id}`).then((res) => {
      setData(res.data);
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axiosInstance.put(`/products/${id}`, data);
    alert("Product Updated");
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold mb-6">
          Edit Product
        </h1>

        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            className="border p-2 w-full"
            value={data.name || ""}
            onChange={(e) =>
              setData({ ...data, name: e.target.value })
            }
          />

          <input
            className="border p-2 w-full"
            value={data.price || ""}
            onChange={(e) =>
              setData({ ...data, price: e.target.value })
            }
          />

          <input
            className="border p-2 w-full"
            value={data.stock || ""}
            onChange={(e) =>
              setData({ ...data, stock: e.target.value })
            }
          />

          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;