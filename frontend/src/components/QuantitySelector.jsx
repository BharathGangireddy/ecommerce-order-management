const QuantitySelector = ({ quantity, setQuantity }) => {
  return (
    <div className="flex items-center gap-3 mt-4">
      <button
        onClick={() => setQuantity(quantity - 1)}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        -
      </button>

      <span>{quantity}</span>

      <button
        onClick={() => setQuantity(quantity + 1)}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;