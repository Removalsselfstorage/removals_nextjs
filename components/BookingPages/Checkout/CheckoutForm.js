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
import movingVan from "@/lottieJsons/movingVan.json";
import { useRouter } from "next/router";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getCurrentDateFormatted } from "@/utils/logics";
import useQuote from "@/hooks/useQuote";
import { db } from "@/firebase";

const CheckoutForm = ({ cardOnchange, paypalOnchange, scriptLoaded }) => {
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
    router,
  } = useQuote();

  const [amount, setAmount] = useState(20);
  const [showProgressMessage, setShowProgressMessage] = useState(false);
  const [progressLoading, setProgressLoading] = useState(false);
  const [inventConfirm, setInventConfirm] = useState(false);
  const [comments, setComments] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const { paidPart, paidFull, paidPrice } = paymentDetails;

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
      inventConfirm &&
      comments
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

  const completeCheckout = async () => {
    // setProgressLoading(true);
    updateBookS("book/checkout");

    updatePayment({
      comment: comments,
      completedBook: true,
    });

    const bookingId = moveDetails?.bookingId;

    const bookingRef = doc(db, "bookingData", bookingId);

    try {
      await setDoc(
        bookingRef,

        {
          date: getCurrentDateFormatted(),
          stage: "book/checkout",
          createdAt: serverTimestamp(),
          comments,
          paymentMethod: "",
          paidPart,
          paidFull,
          completedBook: true,
          paidPrice,
        },
        { merge: true }
      );

      window.my_modal_13.showModal();
      // return true;
      console.log("booking update was successful @ movers");
    } catch (error) {
      console.log(error);
      // return false;
      console.log("booking update was unsuccessful @ movers");
    }
  };

  const reservationSubmit = () => {
    // window.my_modal_13.close();
    setSubmitLoading(true);

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
      router.push("/reservations");
    }, 5000);
  };

  // console.log({ depositFull, depositPart, inventConfirm });

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
                onChange={(e) => {
                  updatePayment({
                    paidPart: e.target.checked,
                    paidFull: false,
                    paidPrice: (moverDetails?.moverPrice * 0.2).toFixed(),
                  });
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
                onChange={(e) => {
                  updatePayment({
                    paidPart: false,
                    paidFull: e.target.checked,
                    paidPrice: (moverDetails?.moverPrice * 1).toFixed(),
                  });
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
      <div className="mt-[30px] md:mt-[50px]">
        <h1 className="text-xl font-bold mb-[20px] px-[0px]">
          Payment Method*
        </h1>
        {/* row 1 */}
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
      </div>
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
            <span>Booking</span>
            <span
              className={`loading loading-dots loading-md text-white`}
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
              <Lottie animationData={EmailSent} className="w-[200px]" />
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
                disabled={submitLoading}
                type="submit"
                className="btn btn-secondary btn-wide flex items-center space-x-[5px]"
                // disabled={progressLoading}
              >
                {!submitLoading && (
                  <span className=""> Reservation Dashboard</span>
                )}
                {submitLoading && (
                  <span className="loading loading-dots loading-md text-white"></span>
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
