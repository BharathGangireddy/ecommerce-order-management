import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition cursor-pointer"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <img
        src={product.image || "https://via.placeholder.com/150"}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />

      <h2 className="mt-2 font-semibold">{product.name}</h2>
      <p className="text-gray-600">₹{product.price}</p>
    </div>
  );
};

export default ProductCard;
