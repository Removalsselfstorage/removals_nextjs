import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ProductRow from "./ProductRow";
import { MdNotificationsActive } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import useProductCart from "@/hooks/useProductCart";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import useQuote from "@/hooks/useQuote";
import { getCurrentDateFormatted } from "@/utils/logics";
import useBookings from "@/hooks/useBookings";

const BuyItems = ({
  image,
  showLoader2,
  selectedTime,
  setSelectedTime,
  clickedModalOpen,
  setClickedModalOpen,
  // timeValue,
  // setTimeValue,
}) => {
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

  const { reserveDetails, resetBookS, reserveId, updateReserveIdFxn } =
    useQuote();

  const {
    completedBookings,
    completedBookingsLoading,
    refetchCompletedBookings,
    completedBook,
  } = useBookings();

  const bookingId = reserveDetails?.bookingId;

  const handleCart = async () => {
    try {
      await setDoc(
        doc(db, "bookingData", bookingId),

        {
          date: getCurrentDateFormatted(),
          stage: "Added Item to cart",
          cartCheckedOut: "NO",
          cartItems: allCartProducts,
        },
        { merge: true }
      );

      // return true;
      console.log("cart items update was successful @ reservation");
    } catch (error) {
      console.log(error);
      // return false;
      console.log("cart items update was unsuccessful @ reservation");
    }
  };

  // const [allProducts, setAllProducts] = useState(products);
  // console.log({ reserveDetails });

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <div className="drawer-content mb-[10px] md:mb-[20px] flex space-x-[10px]">
          <p className="text-2xl font-bold mb-[10px] select-none">
            Buy Packaging Items:
          </p>
          <label
            htmlFor="my_drawer_44"
            className="drawer-button  flex items-center relative cursor-pointer"
            onClick={handleCart}
          >
            <span className="text-[25px] mr-[10px] ">
              <BsCart4 />
            </span>
            <div className="absolute top-[-5px] right-[-4px] bg-secondary rounded-full flex justify-center items-center p-[0px] text-white w-[25px] h-[25px] text-[10px]">
              {allCartProducts?.length}
            </div>
          </label>
        </div>
        <div className="drawer-content mb-[10px] md:mb-[20px] flex space-x-[10px]">
          <label
            htmlFor="my_drawer_44"
            className="drawer-button btn btn-outline btn-primary  flex items-center relative cursor-pointer"
            onClick={handleCart}
          >
            CheckOut Cart
          </label>
        </div>
      </div>

      <div className="w-full mb-[20px]">
        {reserveDetails?.stripeCartProducts?.length > 0 && (
          <div className="text-secondary font-bold">Ordered Items: </div>
        )}
        {reserveDetails?.stripeCartProducts?.map((sp, index) => {
          return (
            <div className="text-[14px] font-semibold" key={index}>
              {sp.quantity} x {sp.name},{" "}
            </div>
          );
        })}
      </div>

      <ProductRow
        id="product_box"
        // products={allProducts}
        // products2={allProducts}
      />
    </div>
  );
};

export default BuyItems;
