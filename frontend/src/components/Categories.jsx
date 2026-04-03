import { FaLaptop, FaMobileAlt, FaTshirt, FaHeadphones } from "react-icons/fa";

const Categories = () => {
  const categories = [
    { name: "Electronics", icon: <FaLaptop /> },
    { name: "Mobiles", icon: <FaMobileAlt /> },
    { name: "Fashion", icon: <FaTshirt /> },
    { name: "Accessories", icon: <FaHeadphones /> },
  ];

  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold mb-6">Categories</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl"
          >
            <div className="text-3xl text-blue-600 mb-2">
              {cat.icon}
            </div>
            <p className="font-semibold">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;