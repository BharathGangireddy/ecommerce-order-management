import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingCart from "./FloatingCart";

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-6">
        {children}
      </div>

      <Footer />
      <FloatingCart />
    </div>
  );
};

export default Layout;