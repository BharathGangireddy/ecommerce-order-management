import Layout from "../components/Layout";

const Orders = () => {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">
        My Orders
      </h1>

      <div className="bg-white p-6 rounded shadow">
        No orders yet
      </div>
    </Layout>
  );
};

export default Orders;