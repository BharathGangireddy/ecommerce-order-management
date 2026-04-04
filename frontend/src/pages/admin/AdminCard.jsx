import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-60 bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-xl font-bold mb-6">
        Admin Panel
      </h2>

      <div className="flex flex-col gap-4">
        <button onClick={() => navigate("/admin")}>
          Dashboard
        </button>

        <button onClick={() => navigate("/admin/products")}>
          Products
        </button>

        <button onClick={() => navigate("/admin/orders")}>
          Orders
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;