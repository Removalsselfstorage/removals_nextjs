import ReviewCard2 from "@/components/HomePage/OurReviews/ReviewCard2";
import StarRating from "@/components/Rating/EditHalfStars2";
import { reviews } from "@/dummyData/dummyData";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import useQuote from "@/hooks/useQuote";
import {
  getAllDetails,
  updateMoverDetails,
  updateMoverSideDetails,
} from "@/store/quoteSlice";
import {
  changeFontWeight,
  changeFontWeight2,
  getCurrentDateFormatted,
} from "@/utils/logics";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowRight, FaTruckMoving } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import NumberInput from "./numberInput";
import { RiDeleteBin2Line } from "react-icons/ri";
import { AiOutlineCloseCircle } from "react-icons/ai";
import useProductCart from "@/hooks/useProductCart";
import NumberInputPackaging from "./numberInputPackaging";
import { BsCart4 } from "react-icons/bs";
import { formatPrice } from "@/utils/logics";
import { packagingCheckout } from "@/lib/packagingCheckout";
import { allNotificationEmail, cartCheckOutEmail } from "@/lib/sendCustomEmail";

const CartSideDrawer = ({
  image,
  showLoader2,
  selectedTime,
  setSelectedTime,
  clickedModalOpen,
  setClickedModalOpen,
  // timeValue,
  // setTimeValue,
}) => {
  const [submitError, setSubmitError] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

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
    calculateTotalPriceFxn,

    router,
  } = useProductCart();

  const { reserveDetails, resetBookS, reserveId, updateReserveIdFxn } =
    useQuote();

  const products = [
    {
      id: 1,
      image:
        "https://www.globepackaging.co.uk/images/Large%20Wardrobe%20Box%20Hanging%20Garment%20Carrier%20Moving%20Clothes.jpg",
      name: `Standard Large Size Double Wall Wardrobe Removal Boxes 20"x19"x38"`,
      price: "£20.50",
    },
    {
      id: 2,
      image:
        "https://www.globepackaging.co.uk/images/Removal%20kit%20no%201%20GP%20site.jpg",
      name: "House Moving Removal Kit No 1 (40 Cardboard Boxes + Materials)",
      price: "£39.99",
    },
    {
      id: 3,
      image:
        "https://lirp.cdn-website.com/5499e577/dms3rep/multi/opt/6-640w.jpg",
      name: `Double Wall Medium Storage Packing Boxes 18"x12"x12"`,
      price: "£5.99",
    },
    {
      id: 4,
      image:
        "https://www.globepackaging.co.uk/images/Small%20bubble%20wrap%20PRODUCT%20PIC%20globe%20packaging.jpg",
      name: "300mm x 100M Roll of Small Bubble Wrap",
      price: "£14.99",
    },
    {
      id: 5,
      image:
        "https://www.globepackaging.co.uk/images/Mattress%20cover%20latest%20site.jpg",
      name: "Heavy Duty King Size Mattress Removal Poly Cover Bag",
      price: "£10.99",
    },
    {
      id: 6,
      image:
        "https://www.globepackaging.co.uk/images/sofa%20cover%20latest%20SITE%20RS.jpg",
      name: "Heavy Duty Four Seat Sofa Removal Poly Cover Storage Bag",
      price: "£10.99",
    },
    {
      id: 7,
      image:
        "https://www.globepackaging.co.uk/images/ProLoc%20low%20noise%20tape%20BROWN%20for%20use.jpg",
      name: "Rolls ProLoc Low Noise Brown Packing Tape 48mm x 66M",
      price: "£2.99",
    },
    {
      id: 8,
      image:
        "https://www.globepackaging.co.uk/images/Fragile%20tape%20site.jpg",
      name: "Rolls Of FRAGILE Low Noise Printed Packing Tape 48mm x 66M",
      price: "£3.99",
    },
  ];

  const totalPrice = () => {
    let totalPrice = 0;
    allCartProducts?.forEach((product) => {
      totalPrice += product.price * product.qty; // Assuming each product has a 'price' property
    });
    return formatPrice(totalPrice);
  };

  const notificationEmail = [
    { email: "ifeanyi4umeh@gmail.com" },
    // { email: "removalsselfstorage@gmail.com" },
  ];

  const notificationParams = {
    // firstName: reserveDetails?.firstName,
    // lastName: reserveDetails?.lastName,
    // itemNumber: allCartProducts?.length,
    // totalPrice: totalPrice(),
    message: `User ${reserveDetails?.firstName} ${
      reserveDetails?.lastName
    } with booking ID ${reserveDetails?.bookingId} just checked out ${
      allCartProducts?.length
    } packaging items(s) with a total price of ${totalPrice()}.`,
    subject: `User ${reserveDetails?.firstName} ${reserveDetails?.lastName} checked out ${allCartProducts?.length} packaging Items.`,
    bookLink: `https://rss-admin.vercel.app/secret-admin/users/booking/${reserveDetails?.bookingId}`,
    bookingId: reserveDetails?.bookingId,
    // page: "checkout page",
  };

  const sendAllNotificationEmail = async () => {
    try {
      await allNotificationEmail(notificationEmail, notificationParams);
    } catch (error) {
      console.log(error);
    }
  };

  const [checked, setChecked] = useState(false);

  function handleClick() {
    setChecked(!checked);
  }

  const closeModal = () => {
    window.my_drawer_44.close();
    // setTimeout(() => {
    //   setShowProgressMessage(false);
    //   // setEmail("");
    // }, 500);
  };

  const bookingId = reserveDetails?.bookingId;

  const handleCart = async () => {
    try {
      await setDoc(
        doc(db, "bookingData", bookingId),

        {
          date: getCurrentDateFormatted(),
          stage: "shopping cart checkout",
          cartItems: allCartProducts,
          cartCheckedOut: "YES",
          cartPaymentStatus: "INITIATED",
        },
        { merge: true }
      );

      // return true;
      console.log("cart items update was successful @ Shopping Cart");
    } catch (error) {
      console.log(error);
      // return false;
      console.log("cart items update was unsuccessful @ Shopping Cart");
    }
  };

  const handleCheckout = (event) => {
    event.preventDefault();
    setSubmitLoading(true);
    packagingCheckout(allCartProducts);
    handleCart();
    sendAllNotificationEmail();
    // resetCartFxn();
  };

  // console.log({ allCartProducts });

  return (
    <div className="drawer drawer-end">
      <input
        id="my_drawer_44"
        type="checkbox"
        className="drawer-toggle"
        checked={checked}
        onChange={handleClick}
      />
      <div className="drawer-side z-[99999] h-[100vh]">
        <label htmlFor="my_drawer_44" className="drawer-overlay"></label>
        <div className="lg:w-[50vw] w-[90vw]  md:w-[70vw] px-[20px]  bg-white text-base-content min-h-screen">
          <div className="flex flex-col  overflow-auto-y py-[30px]">
            <div className="mb-[30px] flex justify-between items-center border-b py-[10px]">
              <p className="text-2xl font-bold mb-[0px] ">Shopping Cart</p>
              <div
                className="text-[40px] text-primary cursor-pointer"
                onClick={handleClick}
              >
                <AiOutlineCloseCircle />
              </div>
            </div>

            {allCartProducts?.map((cp, index) => {
              return (
                <div
                  key={cp?.id}
                  className="flex flex-col space-y-[5px] border-b py-[15px] px-[10px]"
                >
                  <div className="flex items-center justify-between ">
                    <div className="flex items-center space-x-[10px] flex-[1]">
                      <img
                        src={cp?.image}
                        // alt={name}
                        className="w-[100px] h-[100px] object-contain select-none "
                      />
                      <p className="text-[14px] line-clamp-2 ">{cp?.name}</p>
                    </div>
                    <div className="flex flex-col items-center ml-[30px]">
                      <p className="font-semibold text-[14px]">
                        {cp?.qty} x £{cp?.price}
                      </p>
                      <p className="font-bold text-[20px]">
                        £{Number(cp?.qty * cp?.price)?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center space-x-[10px] flex-[1] text-secondary cursor-pointer"
                      onClick={() => deleteProductFxn(cp?.id)}
                    >
                      <p className="text-[14px] line-clamp-2 font-bold ">
                        REMOVE
                      </p>
                      <span className="text-[25px]">
                        <RiDeleteBin2Line />
                      </span>
                    </div>
                    <div className="flex items-center">
                      <NumberInputPackaging
                        count={cp?.qty}
                        minusCount={() => {
                          decreaseQuantityFxn(cp);
                        }}
                        addCount={() => {
                          increaseQuantityFxn(cp);
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {allCartProducts?.length > 0 && (
              <div className="flex items-start justify-between mt-[20px] px-[10px]">
                <div className="flex items-center space-x-[10px] flex-[1]">
                  <div className="flex flex-col space-y-[0px]">
                    <p className="line-clamp-2 font-bold text-[20px] text-primary">
                      SubTotal
                    </p>
                    <p className="line-clamp-2 text-[14px] text-gray-500">
                      VAT included
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-[20px]">
                  {/* <p className="line-clamp-2 font-bold text-[20px] text-primary">
                    Total Price:
                  </p> */}
                  <p className="font-bold text-[20px]">{totalPrice()}</p>
                </div>
              </div>
            )}

            {allCartProducts?.length === 0 && (
              <div className="flex flex-col items-center justify-center w-full min-h-[80vh]">
                <div className="text-[50px] mb-[10px] text-primary">
                  <BsCart4 />
                </div>
                <p className="text-[20px]">Cart Empty</p>
              </div>
            )}

            {/* check out */}
            {allCartProducts?.length > 0 && (
              <div className="flex flex-col space-y-[10px] items-center">
                <div className="flex flex-col space-y-[10px] md:space-y-0 md:flex-row  md:items-center md:space-x-[20px] justify-center mt-[30px] mb-[20px]">
                  <button
                    disabled={submitLoading}
                    onClick={() => resetCartFxn()}
                    className="btn btn-primary btn-outline xl:btn-wide  "
                  >
                    Clear All Cart
                  </button>
                  <button
                    disabled={submitLoading}
                    onClick={handleCheckout}
                    className="btn btn-primary xl:btn-wide  "
                  >
                    {!submitLoading && <span className="">Check Out</span>}
                    {submitLoading && (
                      <span className="loading loading-dots loading-md text-white"></span>
                    )}
                  </button>
                </div>
                <div
                  className="flex items-center space-x-[10px] flex-[1] w-full justify-center  cursor-pointer"
                  onClick={handleClick}
                >
                  <p className="text-[14px] line-clamp-2  ">
                    Or <span className="text-primary">continue Shopping</span>
                  </p>
                  <span className="text-[14px] text-primary">
                    <FaArrowRight />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSideDrawer;
