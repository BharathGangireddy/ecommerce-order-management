const CouponBox = ({ setDiscount }) => {
  const applyCoupon = () => {
    setDiscount(100);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-4">
      <input
        placeholder="Enter Coupon Code"
        className="border px-3 py-2 mr-2"
      />

      <button
        onClick={applyCoupon}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Apply
      </button>
    </div>
  );
};

export default CouponBox;