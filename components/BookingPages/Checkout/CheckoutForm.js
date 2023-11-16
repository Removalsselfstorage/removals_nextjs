// import PaymentForm from "@/components/Payment/PaymentForm";
import React, { useEffect, useState } from "react";
// import { PayPalButton } from "react-paypal-button-v3";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  getAllDetails,
  updateBookStage,
  updateMoverDetails,
  updatePaymentDetails,
  updatePaymentDetails2,
} from "@/store/quoteSlice";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import EmailSent from "@/lottieJsons/EmailSent2.json";
import success from "@/lottieJsons/success.json";
import { useRouter } from "next/router";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getCurrentDateFormatted } from "@/utils/logics";
import useQuote from "@/hooks/useQuote";
import { db } from "@/firebase";
import { allNotificationEmail, bookedEmail } from "@/lib/sendCustomEmail";
import getStripe from "@/lib/get-stripe";
import axios from "axios";
import { moveCheckout, quoteCheckout } from "@/lib/moveCheckout";

const CheckoutForm = ({ currentBook }) => {
  const {
    serviceLocation,
    personalDetails,
    moveDetails,
    moverSideDetails,
    moverDetails,
    paymentDetails,
    bookStage,
    updateLocationFrom,
    resetLocationFrom,
    updateLocationTo,
    resetLocationTo,
    updatePersonal,
    resetPersonal,
    updateMove,
    resetMove,
    updateMover,
    resetMover,
    updatePayment,
    resetPayment,
    updatePickP,
    updateMoverSide,
    resetMoverSide,
    updateBookS,
    resetBookS,
    updateReserveIdFxn,
    reserveId,
    router,
  } = useQuote();

  const [amount, setAmount] = useState(20);
  const [showProgressMessage, setShowProgressMessage] = useState(false);
  const [progressLoading, setProgressLoading] = useState(false);
  const [inventConfirm, setInventConfirm] = useState(false);
  const [comments, setComments] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitLoading2, setSubmitLoading2] = useState(false);

  const { paidPart, paidFull, paidPrice, paymentType } = paymentDetails;

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

  const closeModal = () => {
    window.my_modal_13.close();
    setTimeout(() => {
      setShowProgressMessage(false);
      // setEmail("");
    }, 500);
  };

  const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
  };

  const activateCheckout = () => {
    if (
      (paymentDetails?.paidPart || paymentDetails?.paidFull) &&
      inventConfirm
    ) {
      return false;
    } else return true;
  };

  // const params = {
  //   firstName: details.personalDetails.firstName,
  //   lastName: details.personalDetails.lastName,
  //   email: email,
  //   quoteRef: details.moveDetails.quoteRef,
  //   progressLink: `https://removalstorage.vercel.app/book/movers/${details.moveDetails.bookingId}`,
  //   address1: details.serviceLocation.locationFrom.name,
  //   address2: details.serviceLocation.locationTo.name,
  // };

  // const params = {
  //   firstName,
  //   lastName,
  //   email,
  // };

  const params3 = {
    firstName: personalDetails?.firstName,
    lastName: personalDetails?.lastName,
    email: personalDetails?.email,
    quoteRef: moveDetails?.quoteRef,
    progressLink: `https://removalstorage.vercel.app/book/checkout/${moveDetails?.bookingId}`,
    // progressLink2: `https://removalstorage.vercel.app/book/checkout/${moveDetails?.bookingId}`,
    progressLink2: `https://removalstorage.vercel.app/reservations`,
    address1: serviceLocation?.locationFrom?.name,
    address2: serviceLocation?.locationTo?.name,
    initialPackagePrice: moveDetails?.initialPackagePrice,
    pickPrice: moverDetails?.pickPrice,
    propertyType: moveDetails?.propertyType,
    numberOfMovers: moveDetails?.numberOfMovers,
    mileage: moveDetails?.mileage,
    volume: moveDetails?.volume,
    duration: moveDetails?.duration,
    moveDate: moveDetails?.moveDate,
    movePackage: moveDetails?.movePackage,
    moverName: moverDetails?.moverName,
    moverPrice: moverDetails?.moverPrice,
    paidPrice: paymentDetails?.paidPrice,
    paymentType: paidPart ? "20%" : paidFull ? "full" : "",
    bookingId: moveDetails?.bookingId,
  };

  const sendBookedMail = async () => {
    try {
      await bookedEmail(personalDetails?.email, params3);
    } catch (error) {
      console.log(error);
    }
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
    message: `User ${personalDetails?.firstName} ${personalDetails?.lastName} with booking ID ${moveDetails?.bookingId} just checked out payment for ${moveDetails?.propertyType} ${moveDetails?.movePackage} Package with ${moveDetails?.numberOfMovers} and Jumbo Van with a total price of ₤${paymentDetails?.paidPrice} out of ₤${moverDetails?.moverPrice}.`,
    subject: `User ${personalDetails?.firstName} ${personalDetails?.lastName} checked out ${moveDetails?.propertyType} ${moveDetails?.movePackage} package`,
    bookLink: `https://rss-admin.vercel.app/secret-admin/users/booking/${moveDetails?.bookingId}`,
    bookingId: moveDetails?.bookingId,
    // page: "checkout page",
  };

  const sendAllNotificationEmail = async () => {
    try {
      await allNotificationEmail(notificationEmail, notificationParams);
    } catch (error) {
      console.log(error);
    }
  };

  const bookingId = moveDetails?.bookingId;

  const bookingRef = doc(db, "bookingData", bookingId);

  const computePriceId = () => {
    switch (moveDetails?.movePackage) {
      case "Standard":
        return "price_1O1VVhA4LmEvtWCnWuQno1NU";
        break;

      case "Gold":
        return "price_1O1VWrA4LmEvtWCnAJCO7fUY";
        break;

      case "Premium":
        return "price_1O1VXKA4LmEvtWCnNCaYJQyG";
        break;

      case "Premium plus":
        return "price_1O1VYAA4LmEvtWCnXFzwlz8L";
        break;

      default:
        break;
    }
  };

  const computeProductId = () => {
    switch (moveDetails?.movePackage) {
      case "Standard":
        return "prod_Op9phPa4F3ONn6";
        break;

      case "Gold":
        return "prod_Op9qBpiza2aiHw";
        break;

      case "Premium":
        return "prod_Op9ri9qUNjyaMp";
        break;

      case "Premium plus":
        return "prod_Op9rYIKw1kPhzB";
        break;

      default:
        break;
    }
  };

  const stripeProductId = computeProductId();

  const stripeAmount = parseInt(paymentDetails?.paidPrice * 100);

  console.log({
    stripeProductId,
    stripeAmount,
    price: paymentDetails?.paidPrice,
  });

  const completeCheckout = async () => {
    // setProgressLoading(true);

    setSubmitLoading(true);
    updateBookS("book/checkout");

    sendBookedMail();

    sendAllNotificationEmail();

    updatePayment({
      comment: comments,

      paymentType: paidPart ? "20%" : paidFull ? "Full" : "",
    });

    try {
      await setDoc(
        bookingRef,

        {
          date: getCurrentDateFormatted(),
          stage: "book/checkout",
          activity: [
            ...currentBook?.activity,
            {
              name: `completed ${
                paidPart ? "20%" : paidFull ? "Full" : ""
              } payment checkout of ${paidPrice} for move`,
              date: getCurrentDateFormatted(),
            },
          ],
          // createdAt: serverTimestamp(),
          comments,
          paymentMethod: "",
          paidPart,
          paidFull,
          // completedBook: true,
          paidPrice,
          paymentType: paidPart ? "20%" : paidFull ? "Full" : "",
          moveCheckedOut: "YES",
          movePaymentStatus: "INITIATED",
        },
        { merge: true }
      );

      // window.my_modal_13.showModal();
      // return true;
      console.log("booking update was successful @ checkout");
    } catch (error) {
      console.log(error);
      // return false;
      console.log("booking update was unsuccessful @ checkout");
    }

    if (moveDetails?.quoteType === "online") {
      moveCheckout(stripeProductId, stripeAmount);
    } else if (moveDetails?.quoteType === "quote") {
      quoteCheckout(stripeProductId, stripeAmount);
    }
  };

  const reservationSubmit = () => {
    // window.my_modal_13.close();
    setSubmitLoading2(true);

    setTimeout(() => {
      // setShowProgressMessage(false);
      // window.my_modal_13.close();
      resetLocationFrom();
      resetLocationTo();
      resetPersonal();
      resetMove();
      resetMover();
      resetPayment();
      resetMoverSide();
      resetBookS();
      // setEmail("");
    }, 5000);
    setTimeout(() => {
      router.push(`/reservations/${moveDetails?.bookingId}`);
      updateReserveIdFxn(moveDetails?.bookingId);
    }, 5000);
  };

  //paymentDetails.paidPrice

  console.log({ moveDetails, currentBook, paidPart, paidFull });

  return (
    <div className="lg:sticky lg:top-[80px] bg-white shadow-lg rounded-[30px] lg:flex-[2] py-[30px] px-[30px] md:px-[50px] w-full">
      {/*50% payment row */}
      <div className="mt-[0px] ">
        <h1 className="text-xl font-bold mb-[20px] px-[0px]">Payment Type*</h1>
        <div className="flex space-x-[20px] items-center">
          {/* left */}
          <div className="mb-[0px]">
            <label className="label cursor-pointer flex items-center space-x-[10px] md:space-x-[10px] w-full">
              <input
                type="radio"
                name="radio-1"
                className="radio radio-primary"
                onChange={async (e) => {
                  updatePayment({
                    paidPart: e.target.checked,
                    paidFull: false,
                    paidPrice: (moverDetails?.moverPrice * 0.2).toFixed(),
                  });
                  updateBookS("book/checkout");
                  try {
                    await setDoc(
                      bookingRef,

                      {
                        date: getCurrentDateFormatted(),
                        paymentMethod: "",
                        paidPart: e.target.checked,
                        paidFull: false,
                        paidPrice: (moverDetails?.moverPrice * 0.2).toFixed(),
                        stage: "book/checkout",
                      },
                      { merge: true }
                    );

                    // window.my_modal_13.showModal();
                    // return true;
                    console.log("booking update was successful @ checkout");
                  } catch (error) {
                    console.log(error);
                    // return false;
                    console.log("booking update was unsuccessful @ checkout");
                  }
                }}
                checked={paidPart}
              />
              <p className="leading-[18px] text-[15px] md:text-[16px] font-semibold mb-[0px] ">
                20% Deposit
              </p>
            </label>
          </div>
          {/* right */}
          <div className="mb-[0px]">
            <label className="label cursor-pointer flex items-center space-x-[10px] md:space-x-[10px] w-full">
              <input
                type="radio"
                name="radio-1"
                className="radio radio-primary"
                onChange={async (e) => {
                  updatePayment({
                    paidPart: false,
                    paidFull: e.target.checked,
                    paidPrice: (moverDetails?.moverPrice * 1).toFixed(),
                  });
                  updateBookS("book/checkout");
                  try {
                    await setDoc(
                      bookingRef,

                      {
                        date: getCurrentDateFormatted(),
                        paymentMethod: "",
                        paidPart: false,
                        paidFull: e.target.checked,
                        paidPrice: (moverDetails?.moverPrice * 1).toFixed(),
                        stage: "book/checkout",
                      },
                      { merge: true }
                    );

                    // window.my_modal_13.showModal();
                    // return true;
                    console.log("booking update was successful @ checkout");
                  } catch (error) {
                    console.log(error);
                    // return false;
                    console.log("booking update was unsuccessful @ checkout");
                  }
                }}
                checked={paidFull}
              />
              <p className="leading-[18px] text-[15px] md:text-[16px] font-semibold mb-[0px] ">
                Full Deposit
              </p>
            </label>
          </div>
        </div>
      </div>
      {/* price section */}
      <div className="lg:hidden">
        <div className="flex justify-between mb-[10px] md:mb-[10px] border-t border-black/30 pt-[20px] mt-[20px]">
          <h2 className="text-[18px] font-semibold text-primary ">
            Mover Price:
          </h2>
          <div className="flex flex-col items-end">
            <h2 className="text-[16px] font-bold ">
              ₤ {moverDetails?.moverPrice}
            </h2>
            {/* <p className="text-[12px] text-gray-500">VAT included</p> */}
          </div>
        </div>
      </div>

      {/* payment method */}
      <div className="lg:hidden">
        <div className="flex justify-between mb-[10px] md:mb-[10px]  pt-[0px]">
          <h2 className="text-[18px] font-semibold text-primary">
            Payment Method:
          </h2>
          <div className="flex flex-col items-end">
            {paidPart && <h2 className="text-[16px] font-bold ">20%</h2>}
            {paidFull && <h2 className="text-[16px] font-bold ">100%</h2>}
            {!paidFull && !paidPart && (
              <h2 className="text-[16px] font-bold ">--</h2>
            )}
          </div>
        </div>
      </div>

      {/* final price */}
      <div className="lg:hidden">
        <div className="flex justify-between mb-[10px] md:mb-[20px] border-t border-b border-black/30 pt-[20px] pb-[20px]">
          <h2 className="text-primary font-semibold text-[18px]">
            Final Price:
          </h2>
          <div className="flex flex-col items-end">
            {paidPrice && (
              <h2 className="text-[25px] font-bold ">₤ {paidPrice}</h2>
            )}

            {!paidPrice && <h2 className="text-[25px] font-bold ">--</h2>}
          </div>
        </div>
      </div>

      {/* full payment row */}
      {/* <div className="mt-[30px] md:mt-[50px]">
        <h1 className="text-xl font-bold mb-[20px] px-[0px]">
          Payment Method*
        </h1>
        <div className="w-full md:px-[100px]">
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons style={{ layout: "vertical" }} />
          </PayPalScriptProvider>
        </div>
      
        <div className="w-full flex justify-center">
          <img
            src="/svg/cards.svg"
            alt=""
            className="h-[15px] md:h-[25px] w-fit"
          />
        </div>
      </div> */}

      {/* comment row */}
      <div className="mt-[30px] md:mt-[30px]">
        <h1 className="text-xl font-bold mb-[20px] px-[0px]">
          Leave a comment
        </h1>
        {/* row 1 */}
        <div className="w-full">
          <textarea
            className="textarea w-full textarea-primary min-h-[150px] max-h-[200px]"
            placeholder="(eg. mention if you want to travel with the van). Please do not list items here."
            onChange={handleComment}
            value={comments}
            // disabled={personalBio.length >= bioMaxLength}
            onKeyDown={handleKeyDown}
          ></textarea>
          <p className="text-gray-500 mb-[10px] text-[15px] mt-[5px]">
            {comments.length} / {bioMaxLength} Characters
          </p>
        </div>
      </div>
      {/* acknowledge inventory check */}
      <div className="flex mt-[10px] mb-[10px] md:mb-[20px] w-full">
        <div className="form-control ">
          <label className="label cursor-pointer flex justify-center space-x-[20px] w-full">
            <input
              type="checkbox"
              //   checked="checked"
              className="checkbox checkbox-primary"
              onChange={(e) => setInventConfirm(e.target.checked)}
            />
            <span className="leading-[20px] text-[14px] md:text-[15px]">
              You acknwoledge that your inventory is accurate and will contact
              us to add further items <b>(prices may change)</b>
            </span>
          </label>
        </div>
      </div>

      {/* Payment button */}
      <button
        onClick={completeCheckout}
        disabled={activateCheckout() || submitLoading}
        className="btn btn-secondary btn-block mb-[30px]"
      >
        {!submitLoading && <span className="">Complete Check-Out</span>}
        {submitLoading && (
          <>
            <span>Checking Out</span>
            <span
              className={`loading loading-spinner loading-md text-white`}
            ></span>
          </>
        )}
      </button>

      {/* modal */}
      <dialog id="my_modal_13" className="modal py-[20px] px-[10px]">
        <form method="dialog" className="modal-box px-[20px]">
          <div
            onClick={closeModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border border-primary text-primary"
          >
            ✕
          </div>

          <div className="py-[50px]">
            <div className="flex justify-center w-full">
              <Lottie animationData={success} className="w-[200px]" />
            </div>
            <h3
              onClick={() => window.my_modal_13.close()}
              className="font-bold text-[24px] mt-[10px] text-primary text-center"
            >
              Congratulations
            </h3>
            <p className="py-4 text-center text-primary px-[30px]">
              Your checkout process is completed. Go to reservations page to see
              booking details.
            </p>
            {/* button */}
            <div className="flex w-full justify-center my-[20px]">
              <div
                onClick={reservationSubmit}
                disabled={submitLoading2}
                type="submit"
                className="btn btn-secondary btn-wide flex items-center space-x-[5px]"
                // disabled={progressLoading}
              >
                {!submitLoading2 && (
                  <span className=""> Reservation Dashboard</span>
                )}
                {submitLoading2 && (
                  <span className="loading loading-spinner loading-md text-white"></span>
                )}
              </div>
            </div>
          </div>
        </form>
        <form method="dialog">
          <button>close</button>
        </form>
        {/* <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                          </form> */}
      </dialog>
    </div>
  );
};

export default CheckoutForm;
