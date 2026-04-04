import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import AdminSidebar from "./AdminSidebar";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  /* FETCH ALL ORDERS */
  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/admin/orders");
      setOrders(res.data);
    } catch (error) {
      console.log("Error fetching orders", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* UPDATE ORDER STATUS */
  const updateStatus = async (id, status) => {
    try {
      await axiosInstance.put(`/admin/orders/${id}`, {
        status,
      });
      fetchOrders();
    } catch (error) {
      console.log("Status update error", error);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="p-6 flex-1 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">
          Admin Orders
        </h1>

        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="border-b">
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b text-center"
              >
                <td>{order.user?.name}</td>
                <td>₹{order.totalAmount}</td>
                <td>{order.status}</td>

                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className="border p-1"
                  >
                    <option>Pending</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;