import Layout from "../components/Layout.jsx";
import Hero from "../components/Hero.jsx";
import Categories from "../components/Categories.jsx";
//import DealsSection from "../components/DealsSection.jsx";
import FeaturedProducts from "../components/FeaturedProducts.jsx";
import ProductCard from "../components/ProductCard.jsx";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { fetchProducts } from "../features/products/productSlice.jsx";

const Home = () => {
  const dispatch = useDispatch();
  const { list: products } = useSelector((state) => state.products);

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);

  return (
    <Layout>
      <Hero />
      <Categories />
      {/* <DealsSection /> */}
      <FeaturedProducts products={products} />

      <div className="py-10">
        <h2 className="text-2xl font-bold mb-6">
          Latest Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;