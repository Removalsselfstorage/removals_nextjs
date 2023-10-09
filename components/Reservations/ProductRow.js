import React, { useRef, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import ProductCard from "./ProductCard";
import useProductCart from "@/hooks/useProductCart";

const ProductRow = ({ products, id }) => {
  const {
    allProducts,
    allCartProducts,

    // All Products
    increaseProductQtyFxn,
    decreaseProductQtyFxn,

    // Cart Products
    addToCartFxn,
    increaseQuantityFxn,
    decreaseQuantityFxn,
    deleteProductFxn,
    resetCartFxn,

    router,
  } = useProductCart();

  const rowRef = useRef(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  console.log({ allProducts });

  return (
    <div id={id} className="">
      {/* <h2 className="my-[10px] cursor-pointer text-xl font-semibold text-secondary">
        {title}
      </h2> */}
      <div className="group relative border-b border-white/20 pb-[30px] md:-ml-2 md:pb-[40px]">
        <BiChevronLeft
          className={`absolute top-[33%] left-2 z-40 h-10  w-10 cursor-pointer text-green-100  transition hover:scale-125 group-hover:opacity-100 bg-green-700/50 hover:bg-green-700/60 hover:text-white rounded-full ${
            !isMoved && "hidden"
          }`}
          onClick={() => handleClick("left")}
        />
        <div
          className="flex w-full lg:w-[900px] space-x-[20px] overflow-hidden overflow-x-scroll scrollbar-hide md:space-x-[20px]"
          ref={rowRef}
        >
          {allProducts?.map((product) => (
            <div className="" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <BiChevronRight
          className="absolute top-[33%] right-2  z-40 h-10  w-10 cursor-pointer text-green-100  transition hover:scale-125 group-hover:opacity-100 bg-green-700/50 hover:bg-green-700/60 hover:text-white rounded-full"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default ProductRow;
