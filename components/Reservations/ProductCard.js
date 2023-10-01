import React from "react";
import NumberInput from "./numberInput";

const ProductCard = ({ product, image, name, price }) => {
  return (
    <div className="flex flex-col items-center justify-center w-[250px] py-[20px]  px-[10px] my-[10px] border border-gray-100  bg-white rounded-md shadow-md hover:shadow-lg transition-all duration-300">
      <img
        src={product?.image}
        alt={name}
        className="w-fit h-[200px] object-contain select-none hover:scale-[1.1] transition-all duration-300"
      />
      <p className="mt-4 text-[14px] text-center line-clamp-2 ">
        {product?.name}
      </p>
      <p className="mt-2 font-semibold mb-[10px]">{product?.price}</p>
      <div className="flex items-center justify-between w-full">
        <NumberInput
          count={0}
          minusCount={() => {
            console.log("hello");
          }}
          addCount={() => {
            console.log("hello");
          }}
        />
        <button className="px-4 btn btn-primary py-2 h-[30px] text-white rounded-md ">
          Buy
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
