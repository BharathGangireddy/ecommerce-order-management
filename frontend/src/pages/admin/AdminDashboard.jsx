import AdminSidebar from "./AdminSidebar";
import AdminCard from "./AdminCard";
const AdminDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Dashboard Content */}
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AdminCard title="Total Sales" value="₹50,000" />
          <AdminCard title="Total Orders" value="120" />
          <AdminCard title="Total Products" value="45" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;