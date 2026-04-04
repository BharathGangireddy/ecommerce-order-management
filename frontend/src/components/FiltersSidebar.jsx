const FiltersSidebar = ({ filters, setFilters }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="font-bold mb-4">Filters</h2>

      {/* CATEGORY */}
      <select
        className="border p-2 w-full mb-4"
        value={filters.category}
        onChange={(e) =>
          setFilters({ ...filters, category: e.target.value })
        }
      >
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Mobiles">Mobiles</option>
        <option value="Fashion">Fashion</option>
      </select>

      {/* SORT */}
      <select
        className="border p-2 w-full"
        value={filters.sort}
        onChange={(e) =>
          setFilters({ ...filters, sort: e.target.value })
        }
      >
        <option value="">Sort</option>
        <option value="low">Price Low → High</option>
        <option value="high">Price High → Low</option>
      </select>
    </div>
  );
};
    
export default FiltersSidebar;