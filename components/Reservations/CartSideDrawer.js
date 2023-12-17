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
  convertDateFormat,
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
import { IoIosWarning } from "react-icons/io";
import dayjs from "dayjs";
import RatingCircles from "../Rating/RatingCircles";

const CartSideDrawer = ({
  image,
  showLoader2,
  selectedTime,
  setSelectedTime,
  clickedModalOpen,
  setClickedModalOpen,
  isGivenDateGreaterThanCurrent,
  showReview,
  // timeValue,
  // setTimeValue,
}) => {
  const [submitError, setSubmitError] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [comments, setComments] = useState("");
  const [reviewCount, setReviewCount] = useState(0);
  // const [submitLoading, setSubmitLoading] = useState(false);
  const [submitLoading2, setSubmitLoading2] = useState(false);

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

  const bioMaxLength = 200;
  const handleComment = (e) => {
    const value = e.target.value;
    if (value.length <= bioMaxLength) {
      setComments(e.target.value);
    }
  };

  const handleKeyDown = (event) => {
    if (comments.length >= bioMaxLength && event.key !== "Backspace") {
      event.preventDefault(); // Prevent typing more characters
    }
  };

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
          stage: "Checked out shopping cart",
          activity: [
            ...reserveDetails?.activity,
            {
              name: `Completed checkout of ${totalPrice()} for cart item(s) in reservation dashboard`,
              date: getCurrentDateFormatted(),
            },
          ],
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

  console.log({ reserveDetails });

  return (
    <div className='drawer drawer-end'>
      <input
        id='my_drawer_44'
        type='checkbox'
        className='drawer-toggle'
        checked={checked}
        onChange={handleClick}
      />
      <div className='drawer-side z-[99999] h-[100vh]'>
        <label htmlFor='my_drawer_44' className='drawer-overlay'></label>
        <div className='lg:w-[50vw] w-[90vw]  md:w-[70vw] px-[20px]  bg-white text-base-content min-h-screen'>
          {!showReview && (
            <div className='flex flex-col  overflow-auto-y py-[30px]'>
              <div className='mb-[30px] flex justify-between items-center border-b py-[10px]'>
                <p className='text-2xl font-bold mb-[0px] '>Shopping Cart</p>
                <div
                  className='text-[40px] text-primary cursor-pointer'
                  onClick={handleClick}
                >
                  <AiOutlineCloseCircle />
                </div>
              </div>

              {allCartProducts?.map((cp, index) => {
                return (
                  <div
                    key={cp?.id}
                    className='flex flex-col space-y-[5px] border-b py-[15px] px-[10px]'
                  >
                    <div className='flex items-center justify-between '>
                      <div className='flex items-center space-x-[10px] flex-[1]'>
                        <img
                          src={cp?.image}
                          // alt={name}
                          className='w-[100px] h-[100px] object-contain select-none '
                        />
                        <p className='text-[14px] line-clamp-2 '>{cp?.name}</p>
                      </div>
                      <div className='flex flex-col items-center ml-[30px]'>
                        <p className='font-semibold text-[14px]'>
                          {cp?.qty} x £{cp?.price}
                        </p>
                        <p className='font-bold text-[20px]'>
                          £{Number(cp?.qty * cp?.price)?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center justify-between'>
                      <div
                        className='flex items-center space-x-[10px] flex-[1] text-secondary cursor-pointer'
                        onClick={() => deleteProductFxn(cp?.id)}
                      >
                        <p className='text-[14px] line-clamp-2 font-bold '>
                          REMOVE
                        </p>
                        <span className='text-[25px]'>
                          <RiDeleteBin2Line />
                        </span>
                      </div>
                      <div className='flex items-center'>
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
                <div className='flex items-start justify-between mt-[20px] px-[10px]'>
                  <div className='flex items-center space-x-[10px] flex-[1]'>
                    <div className='flex flex-col space-y-[0px]'>
                      <p className='line-clamp-2 font-bold text-[20px] text-primary'>
                        SubTotal
                      </p>
                      <p className='line-clamp-2 text-[14px] text-gray-500'>
                        VAT included
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center space-x-[20px]'>
                    {/* <p className="line-clamp-2 font-bold text-[20px] text-primary">
                    Total Price:
                  </p> */}
                    <p className='font-bold text-[20px]'>{totalPrice()}</p>
                  </div>
                </div>
              )}

              {allCartProducts?.length === 0 && (
                <div className='flex flex-col items-center justify-center w-full min-h-[80vh]'>
                  <div className='text-[50px] mb-[10px] text-primary'>
                    <BsCart4 />
                  </div>
                  <p className='text-[20px]'>Cart Empty</p>
                </div>
              )}

              {/* check out */}
              {allCartProducts?.length > 0 && (
                <div className='flex flex-col space-y-[10px] items-center'>
                  <div className='flex flex-col space-y-[10px] md:space-y-0 md:flex-row  md:items-center md:space-x-[20px] justify-center mt-[30px] mb-[20px]'>
                    <button
                      disabled={submitLoading}
                      onClick={() => resetCartFxn()}
                      className='btn btn-primary btn-outline xl:btn-wide  '
                    >
                      Clear All Cart
                    </button>
                    <button
                      disabled={submitLoading}
                      onClick={handleCheckout}
                      className='btn btn-primary xl:btn-wide  '
                    >
                      {!submitLoading && <span className=''>Check Out</span>}
                      {submitLoading && (
                        <span className='loading loading-spinner loading-md text-white'></span>
                      )}
                    </button>
                  </div>
                  <div
                    className='flex items-center space-x-[10px] flex-[1] w-full justify-center  cursor-pointer'
                    onClick={handleClick}
                  >
                    <p className='text-[14px] line-clamp-2  '>
                      Or <span className='text-primary'>continue Shopping</span>
                    </p>
                    <span className='text-[14px] text-primary'>
                      <FaArrowRight />
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
          {showReview && (
            <div className='flex flex-col  overflow-auto-y py-[30px]'>
              <div className='mb-[30px] flex justify-between items-center border-b py-[10px]'>
                <p className='text-2xl font-bold mb-[0px] text-primary'>
                  Review {reserveDetails?.moverName}
                </p>
                <div
                  className='text-[40px] text-secondary cursor-pointer'
                  onClick={handleClick}
                >
                  <AiOutlineCloseCircle />
                </div>
              </div>

              {/* {allCartProducts?.map((cp, index) => {
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
            })} */}

              {true && (
                <div className=''>
                  <div className='flex flex-col space-y-[0px]'>
                    <p className='line-clamp-2 font-bold text-[20px]'>
                      {reserveDetails.propertyType} {reserveDetails.movePackage}{" "}
                      Package with {reserveDetails.numberOfMovers} and Jumbo Van
                      Move
                    </p>
                    <div className=''>
                      <p className='font-bold text-[14px] text-gray-500 '>
                        {dayjs(
                          convertDateFormat(reserveDetails?.moveDate)
                        ).format("dddd, MMMM D, YYYY")}{" "}
                        ({reserveDetails?.moverTime})
                      </p>
                    </div>
                  </div>

                  <div className='mt-[30px] md:mt-[30px]'>
                    <h1 className='text-[18px] font-bold mb-[10px] px-[0px]'>
                      Leave a comment
                    </h1>
                    {/* row 1 */}
                    <div className='w-full'>
                      <textarea
                        className='textarea w-full textarea-primary min-h-[150px] max-h-[200px]'
                        placeholder='Please give a honest review about the move / mover'
                        onChange={handleComment}
                        value={comments}
                        // disabled={personalBio.length >= bioMaxLength}
                        onKeyDown={handleKeyDown}
                      ></textarea>
                      <p className='text-gray-500 mb-[10px] text-[15px] mt-[5px]'>
                        {comments.length} / {bioMaxLength} Characters
                      </p>
                    </div>
                  </div>

                  <div className='mt-[30px] md:mt-[30px]'>
                    <div className='flex items-center space-x-[10px] mb-[10px]'>
                      <h1 className='text-[18px] font-bold mb-[0px] px-[0px]'>
                        Leave a star rating
                      </h1>
                      <StarRating size='text-[20px]' rating={reviewCount} />
                    </div>
                    <RatingCircles
                      reviewCount={reviewCount}
                      setReviewCount={setReviewCount}
                    />
                  </div>
                </div>
              )}

              {false && (
                <div className='flex flex-col items-center justify-center w-full min-h-[80vh]'>
                  <div className='text-[50px] mb-[10px] text-secondary'>
                    <IoIosWarning />
                  </div>
                  <p className='text-[18px]'>Move not yet carried out!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSideDrawer;
