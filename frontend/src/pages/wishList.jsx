import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const { items } = useSelector((state) => state.wishlist);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">
        Wishlist ❤️
      </h1>

      {items.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Wishlist;