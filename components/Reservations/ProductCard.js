import React from "react";
import NumberInput from "./numberInput";
import useProductCart from "@/hooks/useProductCart";
import NumberInput2 from "./numberInput2";
import NumberInputPackaging from "./numberInputPackaging";
import { toast } from "react-hot-toast";

const ProductCard = ({ product, image, name, price }) => {
  const {
    allProducts,
    allCartProducts,

    // All Products
    increaseProductQtyFxn,
    decreaseProductQtyFxn,
    resetProductQtyFxn,

    // Cart Products
    addToCartFxn,
    increaseQuantityFxn,
    decreaseQuantityFxn,
    deleteProductFxn,
    resetCartFxn,

    router,
  } = useProductCart();

  const addToCart = (item) => {
    addToCartFxn(item);
    resetProductQtyFxn({ itemName: item?.name });
    toast.success(`${item?.qty} x ${item?.name} has been added to cart `, {
      duration: 3000,
      // position: 'top-center',
    });
  };

  console.log({ allCartProducts });

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
      <p className="mt-2 font-semibold mb-[10px]">£{product?.price}</p>
      <div className="flex items-center justify-between w-full">
        <NumberInputPackaging
          count={product?.qty}
          minusCount={() => decreaseProductQtyFxn({ itemName: product?.name })}
          addCount={() => increaseProductQtyFxn({ itemName: product?.name })}
          title={product?.name}
        />
        <button
          onClick={() => addToCart(product)}
          className="px-4 btn btn-primary py-2 h-[30px] text-white rounded-md "
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
