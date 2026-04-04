import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import DealsSection from "../components/DealsSection";
import FeaturedProducts from "../components/FeaturedProducts";
import ProductCard from "../components/ProductCard";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { list: products, loading } = useSelector(
    (state) => state.products
  );

  /* LOAD PRODUCTS */
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Layout>
      <Hero />
      <Categories />
      <DealsSection />

      {/* FEATURED PRODUCTS */}
      {products.length > 0 && (
        <FeaturedProducts products={products} />
      )}

      {/* LATEST PRODUCTS */}
      <div className="py-10">
        <h2 className="text-2xl font-bold mb-6">
          Latest Products
        </h2>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;