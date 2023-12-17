import ReviewCard2 from "@/components/HomePage/OurReviews/ReviewCard2";
import StarRating from "@/components/Rating/EditHalfStars2";
import { reviews } from "@/dummyData/dummyData";
import {
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
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
  getLastTwoWords,
  getRatingGrade,
} from "@/utils/logics";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowRight, FaThumbsUp, FaTruckMoving } from "react-icons/fa";
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
import { BiHelpCircle } from "react-icons/bi";
import { PiHandsPrayingFill } from "react-icons/pi";

const CartSideDrawer = ({
  image,
  showLoader2,
  selectedTime,
  setSelectedTime,
  clickedModalOpen,
  setClickedModalOpen,
  isGivenDateGreaterThanCurrent,
  showReview,
  // approvedMovers,
  // timeValue,
  // setTimeValue,
}) => {
  const { reserveDetails, resetBookS, reserveId, updateReserveIdFxn } =
    useQuote();

  const [reviews2, setReviews2] = useState([]);
  const [submitError, setSubmitError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [comments, setComments] = useState(
    reserveDetails?.reviewDetails?.review ?? ""
  );
  const [reviewCount, setReviewCount] = useState(
    reserveDetails?.reviewDetails?.rating ?? -1
  );
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

  function calculateAverageRating(reviews) {
    const totalRating = reviews.reduce(
      (sum, review) => sum + review.reviewDetails.rating,
      0
    );
    const averageRating = totalRating / reviews.length;
    return averageRating;
  }

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

  const reviewRef = collection(db, "bookingData");

  const reviewAverage = (calculateAverageRating(reviews2) + reviewCount)/2;

  
  // const revAvg= (reviewAverage + reviewCount) / 2

  const reviewGrade = reviewAverage ? getRatingGrade(reviewAverage) : "Poor";

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

  const trimmedAddress1 = getLastTwoWords(reserveDetails?.address1);
  const trimmedAddress2 = getLastTwoWords(reserveDetails?.address2);

  // const checkMoverUid = () => {
  //   const pm = approvedMovers.find(
  //     (am) => am.generatedName === reserveDetails.moverName
  //   );

  //   return pm.uid;
  // };

  // const moverUid = checkMoverUid()

  const handleReview = async () => {
    const moversRef = doc(db, "moversData", moverUid);

    setSubmitError(false);
    setSubmitSuccess(false);
    if (!comments || reviewCount === -1) {
      setSubmitError(true);
      return;
    } else {
      try {
        setSubmitLoading2(true);
        await setDoc(
          doc(db, "bookingData", bookingId),

          {
            date: getCurrentDateFormatted(),
            stage: "Submitted Review",
            activity: [
              ...reserveDetails?.activity,
              {
                name: `Submitted review after move`,
                date: getCurrentDateFormatted(),
              },
            ],

            reviewDetails: {
              name: `${reserveDetails?.firstName} ${reserveDetails?.lastName}`,
              review: comments,
              rating: reviewCount,
              date: getCurrentDateFormatted(),
              moverName: `${reserveDetails?.moverName}`,
              moveItem: `${reserveDetails?.propertyType}`,
              address1: trimmedAddress1,
              address2: trimmedAddress2,
              // createdAt: serverTimestamp(),
            },
          },
          { merge: true }
        );

        // await setDoc(
        //   moversRef,

        //   {
        //     reviewAverage,
        //     reviewGrade,
        //     reviewCount: reviews2?.length,
        //     reviews: reviews2,
        //   },
        //   { merge: true }
        // );

        setSubmitLoading2(false);

        setSubmitSuccess(true);

        // return true;
        console.log(
          "review submission was successful @ user dashboard sidebar"
        );
      } catch (error) {
        console.log(error);
        // return false;
        console.log(
          "review submission was unsuccessful @ user dashboard sidebar"
        );
      }
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

  useEffect(() => {
    // const queryMessages = query(reviewRef);
    const queryMessages = query(
      reviewRef,
      where("moverName", "==", reserveDetails?.moverName)
      // orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let rev = [];
      snapshot.forEach((doc) => {
        rev.push({ ...doc.data(), id: doc.id });
      });
      // const completedMb = rev?.filter((bc) => bc.completedBook === true);
      const reviewedM = rev?.filter((bc) => bc.reviewDetails != undefined);
      // const completedMb = rev?.filter((bc) => bc.moveCarriedOut === true);
      setReviews2(reviewedM);
      // console.log({ reviewedM, personalMoverDetails, reviews2 });
    });

    return () => unsubscribe();
  }, []);

  // console.log({ reserveDetails, approvedMovers, checkMoverUid: checkMoverUid() });

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
                    <div className='flex items-center space-x-[10px] mb-[15px]'>
                      <h1 className='text-[18px] font-bold mb-[0px] px-[0px]'>
                        Leave a star rating
                      </h1>
                      <StarRating size='text-[20px]' rating={reviewCount} />
                    </div>
                    <RatingCircles
                      reviewCount={reviewCount}
                      setReviewCount={setReviewCount}
                    />

                    <div
                      className='flex items-center space-x-[5px] mt-[20px]'
                      // className="tooltip cursor-pointer"
                      // data-tip="Please always submit after adding items"
                    >
                      <IoIosWarning className='font-bold text-[25px] text-secondary' />
                      <p className='text-[14px] text-black font-semibold'>
                        <span className='font-bold'>NB:</span> Review submission
                        will only be active after move is completed.
                      </p>
                    </div>

                    <div className='w-full flex justify-center mt-[30px] '>
                      <button
                        // disabled={
                        //   submitLoading2 || isGivenDateGreaterThanCurrent
                        // }
                        onClick={handleReview}
                        className='btn btn-secondary btn-wide  '
                      >
                        {!submitLoading2 && (
                          <span className=''>Submit Review</span>
                        )}
                        {submitLoading2 && (
                          <span className='loading loading-spinner loading-md text-white'></span>
                        )}
                      </button>
                    </div>
                    {submitError && (
                      <div className='w-full flex justify-center mt-[10px] '>
                        <div className='flex items-center space-x-[5px] mt-[0px]'>
                          <PiHandsPrayingFill className='font-bold text-[25px] text-secondary' />
                          <p className='text-[14px] text-secondary font-semibold'>
                            Please help us with a comment and review.
                          </p>
                        </div>
                      </div>
                    )}
                    {submitSuccess && (
                      <div className='w-full flex justify-center mt-[10px] '>
                        <div className='flex items-center space-x-[5px] mt-[0px]'>
                          <FaThumbsUp className='font-bold text-[25px] text-primary' />
                          <p className='text-[14px] text-primary font-semibold'>
                            Thank you for dropping your review
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* {false && (
                <div className='flex flex-col items-center justify-center w-full min-h-[80vh]'>
                  <div className='text-[50px] mb-[10px] text-secondary'>
                    <IoIosWarning />
                  </div>
                  <p className='text-[18px]'>Move not yet carried out!</p>
                </div>
              )} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSideDrawer;
