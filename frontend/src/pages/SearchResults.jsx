import Layout from "../components/Layout";
import FiltersSidebar from "../components/FiltersSidebar";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import axiosInstance from "../api/axiosInstance";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    sort: "",
  });

  const location = useLocation();
  const keyword =
    new URLSearchParams(location.search).get("keyword");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axiosInstance.get("/products", {
        params: {
          keyword,
          page,
          ...filters,
        },
      });

      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    };

    fetchProducts();
  }, [keyword, page, filters]);

  return (
    <Layout>
      <div className="grid md:grid-cols-4 gap-6">
        <FiltersSidebar
          filters={filters}
          setFilters={setFilters}
        />

        <div className="md:col-span-3">
          <h1 className="text-2xl font-bold mb-6">
            Search Results
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
      </div>
    </Layout>
  );
};

export default SearchResults;