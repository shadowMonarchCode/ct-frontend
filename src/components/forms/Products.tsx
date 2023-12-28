import { useState } from "react";

interface ProductFieldProps {
  productName: string;
  initialQuantity: number;
}

const ProductField = ({ productName, initialQuantity }: ProductFieldProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex gap-4 justify-between w-full md:w-4/5  px-4 rounded-lg">
      <p className="py-1">{productName}</p>
      <div className="flex">
        <button
          onClick={handleDecrement}
          disabled={quantity === 0}
          className="w-8 bg-light-3 h-full rounded-s-lg"
        >
          -
        </button>
        <p className="w-8 text-center h-full border-[1px] border-light-3">
          {quantity}
        </p>
        <button
          onClick={handleIncrement}
          className="w-8 bg-light-3 h-full rounded-e-lg"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductField;
