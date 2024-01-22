import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ProductRow from "./ProductRow";
import { MdNotificationsActive } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import useProductCart from "@/hooks/useProductCart";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import useQuote from "@/hooks/useQuote";
import { formatMovePrice, getCurrentDateFormatted } from "@/utils/logics";

const BuyItems = ({
  image,
  showLoader2,
  selectedTime,
  setSelectedTime,
  clickedModalOpen,
  setClickedModalOpen,
  isGivenDateGreaterThanCurrent,
  setShowReview,
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

  const bookingId = reserveDetails?.bookingId;

  const handleCart = async () => {
    try {
      setShowReview(false);
      await setDoc(
        doc(db, "bookingData", bookingId),

        {
          date: getCurrentDateFormatted(),
          stage: "Added Item to cart",
          activity: [
            ...reserveDetails?.activity,
            {
              name: `Added Item(s) to cart in reservation dashboard`,
              date: getCurrentDateFormatted(),
            },
          ],
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

  const totalPrice = () => {
    let totalPrice = 0;
    reserveDetails?.cartStripeProducts?.forEach((pr) => {
      pr?.product?.forEach((pr2) => {
        totalPrice += (pr2?.price / 100) * pr2?.quantity;
      }); // Assuming each product has a 'price' property
    });
    return formatMovePrice(totalPrice);
  };

  const productAmount = () => {
    let totalAmount = 0;
    reserveDetails?.cartStripeProducts?.forEach((pr) => {
      totalAmount += pr?.product?.length;
    });
    return totalAmount;
  };

  // const stripeCart = {
  //   details: reserveDetails?.cartStripeDetails,
  //   products: reserveDetails?.cartStripeProducts,
  // };

  const stripeCart = [];

  // const [allProducts, setAllProducts] = useState(products);
  console.log({  reserveDetails });

  return (
    <div>
      {isGivenDateGreaterThanCurrent && (
        <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center'>
          <div className='drawer-content mb-[10px] md:mb-[20px] flex space-x-[10px]'>
            <p className='text-2xl font-bold mb-[10px] select-none'>
              Buy Packaging Items:
            </p>
            <label
              htmlFor='my_drawer_44'
              className='drawer-button  flex items-center relative cursor-pointer'
              onClick={handleCart}
            >
              <span className='text-[25px] mr-[10px] '>
                <BsCart4 />
              </span>
              <div className='absolute top-[-5px] right-[-4px] bg-secondary rounded-full flex justify-center items-center p-[0px] text-white w-[25px] h-[25px] text-[10px]'>
                {allCartProducts?.length}
              </div>
            </label>
          </div>
          <div className='drawer-content mb-[10px] md:mb-[20px] flex space-x-[10px]'>
            <label
              htmlFor='my_drawer_44'
              className='drawer-button btn btn-outline btn-primary  flex items-center relative cursor-pointer'
              onClick={handleCart}
            >
              CheckOut Cart
            </label>
          </div>
        </div>
      )}

      {true && (
        <div className='w-full mb-[20px]'>
          {reserveDetails?.cartStripeProducts?.length > 0 && (
            <div className='collapse bg-orange-500/10 collapse-arrow mb-[10px]'>
              <input type='checkbox' />
              <div className='collapse-title font-semibold text-secondary flex items-center space-x-[10px] mb-[0px]'>
                <div className='text-secondary text-[18px] font-bold'>
                  Ordered Items: {productAmount()}
                </div>
              </div>
              <div className='collapse-content'>
                {reserveDetails?.cartStripeProducts?.map((sp, index1) => {
                  return (
                    <div className='' key={index1}>
                      <p className='text-[13px] mb-[10px] font-semibold'>
                        {sp.date}
                      </p>
                      {sp?.product?.map((ssp, index2) => {
                        // console.log({ ssp });
                        return (
                          <div className='text-[13px]' key={index2}>
                            <div className='text-[13px] flex flex-col mb-[10px] space-y-[5px] md:space-y-0 md:flex-row md:justify-between md:items-center'>
                              <p className=''>
                                <span className='font-semibold'>
                                  {ssp?.quantity} x
                                </span>{" "}
                                {ssp?.name} ----------{" "}
                              </p>
                              <p className='font-semibold'>
                                {(
                                  (ssp?.price / 100) *
                                  ssp?.quantity
                                ).toLocaleString("en-GB", {
                                  style: "currency",
                                  currency: "GBP",
                                })}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
                {/* {totalPrice()} */}
                {reserveDetails?.cartStripeProducts?.length > 0 && (
                  <div className='w-full font-semibold flex justify-end text-[15px] space-x-[10px] mt-[10px]'>
                    <p className=''>Total:</p>
                    <p className=''>{totalPrice()}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {isGivenDateGreaterThanCurrent && (
        <ProductRow
          id='product_box'
          // products={allProducts}
          // products2={allProducts}
        />
      )}
    </div>
  );
};

export default BuyItems;
