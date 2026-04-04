import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productSlice";
import AdminSidebar from "./AdminSidebar";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: products } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="p-6 flex-1">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">
            Products
          </h1>

          <button
            onClick={() => navigate("/admin/add-product")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </div>

        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="border-b">
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b text-center">
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <button
                    onClick={() =>
                      navigate(`/admin/edit-product/${p._id}`)
                    }
                    className="text-blue-500"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;