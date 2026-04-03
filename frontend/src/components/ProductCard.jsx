import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4">
      <img
        src={product.image}
        className="h-48 w-full object-cover rounded-lg"
      />

      <h2 className="mt-3 font-semibold">
        {product.name}
      </h2>

      <p className="text-gray-500">
        ₹{product.price}
      </p>

      <button
        onClick={() => navigate(`/product/${product._id}`)}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        View Details
      </button>
    </div>
  );
};

export default ProductCard;