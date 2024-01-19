import useQuote from "@/hooks/useQuote";
import { moveBalanceCheckout, moveExtraCheckout } from "@/lib/moveCheckout";
import { convertToSqFt, formatMovePrice } from "@/utils/logics";
import React, { useEffect, useState } from "react";
import { BiHelpCircle } from "react-icons/bi";



const StorageDashboard = ({ progressData, isGivenDateGreaterThanCurrent }) => {
  const {
    setReserveDetailsFxn,
    updateReserveDetailsFxn,
    resetReserveDetailsFxn,
    reserveDetails,
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
    reserveId,
    updateReserveIdFxn,
  } = useQuote();

  const [outstandingFee, setOutstandingFee] = useState(null);
  const [extraFee, setExtraFee] = useState(null);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitLoading2, setSubmitLoading2] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const extraPrice =
    reserveDetails?.extraPrice?.length > 0 &&
    reserveDetails?.extraPrice[reserveDetails?.extraPrice?.length - 1]?.amount;
  // const extraPrice =
  //   ((reserveDetails?.extraPrice?.length > 0 &&
  //     reserveDetails?.extraPrice[reserveDetails?.extraPrice?.length - 1]) ||
  //     0) -
  //   ((reserveDetails?.extraPricePaid?.length > 0 &&
  //     reserveDetails?.extraPricePaid[
  //       reserveDetails?.extraPricePaid?.length - 1
  //     ]) ||
  //     0);

  const paidExtra = () => {
    if (extraPrice !== 0 && reserveDetails?.extraStripePayment?.length > 0) {
      if (
        reserveDetails?.extraStripePayment[
          reserveDetails?.extraStripePayment?.length - 1
        ]?.amount?.toFixed(0) ===
        reserveDetails?.extraPrice[
          reserveDetails?.extraPrice?.length - 1
        ]?.amount?.toFixed(0)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const computeProductId = () => {
    switch (reserveDetails?.movePackage) {
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

  const stripeOutAmount = parseInt(
    (reserveDetails?.moverPrice - reserveDetails?.moveStripePayment?.amount) *
      100
  );

  const stripeExtraAmount = parseInt(extraPrice * 100);

  // useEffect(() => {
  //   setCompletedBooking(completedBook(id));
  //   setExtraPrice(completedBook(id)?.extraPrice);
  // }, [completedBookings]);

  // console.log({
  //   reserveDetails,
  //   // stripeProductId,
  //   // stripeOutAmount,
  //   // price: paymentDetails?.paidPrice,
  // });

 

  const handleExtra = () => {
    setSubmitLoading2(!submitLoading2);
    moveExtraCheckout(stripeProductId, stripeExtraAmount);
  };

  const paidPrice =
    reserveDetails?.moveStripePayment?.amount +
    reserveDetails?.outStripePayment?.amount;

  const outstandingPrice = reserveDetails?.moverPrice - paidPrice;

  // reserveDetails?.extraPrice - reserveDetails?.extraPricePaid;

  // const extraPrice = reserveDetails?.extraPrice
  //   ? reserveDetails?.extraPrice[reserveDetails?.extraPrice?.length - 1] -
  //     reserveDetails?.extraPricePaid[reserveDetails?.extraPricePaid?.length - 1]
  //   : 0;

  useEffect(() => {}, []);

  // console.log({
  //   paidPrice,
  //   reserveDetails,
  //   // extraPrice,
  //   // outstandingPrice,
  // });

  return (
    <div className='flex flex-col space-y-[5px]'>
      <div className='stats bg-primary text-white '>
        {/* payment made */}
        <div className='flex flex-col px-[20px] py-[30px]'>
          <div className='font-bold'>Storage Size</div>
          <div className='font-bold text-[30px]'>
            {convertToSqFt(progressData?.containerSize)}
          </div>
          <div className='stat-actions'>
            <button
              className=' bg-white text-black font-semibold hover:scale-[1.02] transition-all duration-300 focus:bg-white w-[200px] active:bg-white px-[10px] py-[5px] rounded-[5px]'
              onClick={() => window.my_modal_51.showModal()}
              // disabled={submitLoading || outstandingPrice === 0}
            >
              View Features
            </button>
          </div>
        </div>
        {/*  outstanding payment */}
        <div className='flex flex-col px-[20px] py-[30px]'>
          <div className='font-bold'>Initial Payment</div>
          <div className='font-bold text-[30px]'>
            {formatMovePrice(progressData?.paidPrice)}
            {/* {formatMovePrice(progressData?.totalPrice)} */}
          </div>
          <div className='stat-actions space-x-[10px]'></div>
        </div>
        {/* Extra payment */}
        <div className='flex flex-col px-[20px] py-[30px]'>
          <div className='font-bold flex items-center space-x-[5px]'>
            <p className=''>Outstanding Payment</p>
            <div
              className='cursor-pointer'
              onMouseEnter={() => setShowTip(true)}
              onMouseLeave={() => setShowTip(false)}
            >
              <BiHelpCircle className={`"font-bold text-[25px] text-white"`} />
            </div>
          </div>
          <div className='font-bold text-[30px]'>
            {formatMovePrice(progressData?.totalPrice)}
          </div>
          <div className='stat-actions space-x-[10px]'></div>
        </div>
      </div>
      <div
        className={`flex items-center space-x-[5px] duration-300 transition-all ${
          showTip ? "opacity-1" : "opacity-0"
        }`}
      >
        <BiHelpCircle className='font-bold text-[40px] mr-[10px] md:mr-0 md:text-[25px] text-secondary' />
        <p className='text-[14px] font-semibold text-secondary'>
          The Outstanding Payment will be made physically at the point of moving
          in the items to be stored.
        </p>
      </div>
    </div>
  );
};

export default StorageDashboard;
