import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import useProductCart from "@/hooks/useProductCart";
import BookingLayout from "@/layouts/BookingLayout";
import useQuote from "@/hooks/useQuote";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { getCurrentDateFormatted } from "@/utils/logics";
import { allNotificationEmail, bookedEmail } from "@/lib/sendCustomEmail";
import Lottie from "lottie-react";
import success from "@/lottieJsons/success.json";
import { initializeApp } from "firebase/app";
import { MdError } from "react-icons/md";

const QuoteCheckoutError = () => {


  
  // const { paidPart, paidFull, paidPrice, paymentType } = paymentDetails;

  const [submitLoading, setSubmitLoading] = useState(false);

  const { reserveDetails, moveDetails,  router, } = useQuote();

  const bookingId = moveDetails?.bookingId;

  const handleDashboard = () => {
    setSubmitLoading(true);
    router.push(`/book/checkout/invoice/${bookingId}`);
  };

  // console.log({ paymentType, bookingId });

  return (
    <BookingLayout>
      <div className="bg-white py-[20px]">
        <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex justify-center w-full">
            {/* <Lottie animationData={success} className="w-[200px]" /> */}
            <MdError className="text-secondary text-[80px]" />
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <p className="mt-2 text-4xl font-extrabold tracking-tight  sm:text-5xl text-secondary">
              Payment Cancelled
            </p>
            <p className=" text-base text-gray-500 text-center lg:px-[50px] mt-[20px]">
              Your payment was not successful. Please return to the
              checkout page and try again!
            </p>
          </div>

          <div className="w-full mt-10 flex justify-center items-center">
            <button
              onClick={handleDashboard}
              disabled={submitLoading}
              className="btn btn-primary btn-wide"
            >
              {/* Return to Dashboard */}
              {!submitLoading && <span className="">Go to Checkout</span>}
              {submitLoading && (
                <span className="loading loading-spinner loading-md text-white"></span>
              )}
            </button>
          </div>
        </div>
      </div>
    </BookingLayout>
  )
}

export default QuoteCheckoutError;
