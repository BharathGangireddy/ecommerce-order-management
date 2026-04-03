import ProductCard from "./ProductCard";

const FeaturedProducts = ({ products }) => {
  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold mb-6">
        Featured Products
      </h2>

      <div className="flex gap-6 overflow-x-auto">
        {products.slice(0, 6).map((product) => (
          <div className="min-w-[250px]" key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;