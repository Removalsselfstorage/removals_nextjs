import React from "react";
// import { getAllMoveItems, updateQtyInBedroom } from "@/store/quoteSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCartDetails,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  resetCart,
  // calculateTotalPrice,
} from "@/store/cartSlice";
import {
  getAllPackagingDetails,
  increaseProductQty,
  decreaseProductQty,
  resetProductQty,
} from "@/store/packagingSlice";

const useProductCart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const allCartProducts = useSelector(getAllCartDetails);
  const allProducts = useSelector(getAllPackagingDetails);
  // const { moveItems } = useSelector(getAllMoveItems);

  // ALL PRODUCTS
  const increaseProductQtyFxn = (payload) => {
    dispatch(increaseProductQty(payload));
  };
  const decreaseProductQtyFxn = (payload) => {
    dispatch(decreaseProductQty(payload));
  };
  const resetProductQtyFxn = (payload) => {
    dispatch(resetProductQty(payload));
  };

  //CART PRODUCTS
  const addToCartFxn = (payload) => {
    dispatch(addToCart(payload));
  };
  const increaseQuantityFxn = (payload) => {
    dispatch(increaseQuantity(payload));
  };
  const decreaseQuantityFxn = (payload) => {
    dispatch(decreaseQuantity(payload));
  };
  const deleteProductFxn = (payload) => {
    dispatch(deleteProduct(payload));
  };
  const resetCartFxn = () => {
    dispatch(resetCart());
  };
  // const calculateTotalPriceFxn = () => {
  //   dispatch(calculateTotalPrice());
  // };

  // console.log({ allProducts, allCartProducts });

  return {
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
    // calculateTotalPriceFxn,

    router,
  };
};

export default useProductCart;
