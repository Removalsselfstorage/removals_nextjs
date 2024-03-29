import useQuote from "@/hooks/useQuote";
import { moveBalanceCheckout, moveExtraCheckout } from "@/lib/moveCheckout";
import { formatMovePrice } from "@/utils/logics";
import React, { useEffect, useState } from "react";
import { BiHelpCircle } from "react-icons/bi";

const PaymentDashboard = ({ allPayments,  isGivenDateGreaterThanCurrent }) => {
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
        // return "prod_POPusLAAFFnRbH";
        return "prod_PPEeeyQP8FPvY1";
        break;

      case "Gold":
        // return "prod_POPsmf3NPL7bH0";
        return "prod_PPEefKSsXywBWo";
        break;

      case "Premium":
        // return "prod_POPr8CvDDIssjJ";
        return "prod_PPEdIEVlOOJZ28";
        break;

      case "Premium plus":
        // return "prod_POPov6EMMJTV0n";
        return "prod_PPEdNuqILaKyZY";
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

  const handleOutstanding = () => {
    setSubmitLoading(true);
    moveBalanceCheckout(stripeProductId, stripeOutAmount);
  };

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
    <div className="flex flex-col space-y-[5px]">
      <div className="stats bg-primary text-white ">
        {/* Move price */}
        {/* <div className="flex flex-col px-[20px] py-[30px]">
          <div className="font-bold">Move Price</div>
          <div className="font-bold text-[30px]">
            {formatMovePrice(reserveDetails?.moverPrice)}
          </div>
          <div className="stat-actions">
            <div className="text-white font-semibold">
              {reserveDetails?.movePackage?.toUpperCase()}
            </div>
          </div>
        </div> */}
        {/* payment made */}
        <div className="flex flex-col px-[20px] py-[30px]">
          <div className="font-bold">Move Payment made</div>
          <div className="font-bold text-[30px]">
            {!isGivenDateGreaterThanCurrent
              ? "***"
              : formatMovePrice(allPayments()?.total)}
          </div>
          <div className="stat-actions">
            {/* <div className="text-white font-semibold">
              ({reserveDetails?.paymentType} Deposit)
            </div> */}
            {/* <p
              onClick={() => window.my_modal_51.showModal()}
              className="link text-white font-semibold"
            >
              My Payment History
            </p> */}
            <button
              className=" bg-white text-black font-semibold hover:scale-[1.02] transition-all duration-300 focus:bg-white w-[200px] active:bg-white px-[10px] py-[5px] rounded-[5px]"
              onClick={() => window.my_modal_51.showModal()}
              // disabled={submitLoading || outstandingPrice === 0}
            >
              PAYMENT HISTORY
            </button>
          </div>
        </div>
        {/*  outstanding payment */}
        <div className="flex flex-col px-[20px] py-[30px]">
          <div className="font-bold">Outstanding Payment</div>
          <div className="font-bold text-[30px]">
            {!isGivenDateGreaterThanCurrent
              ? "***"
              : formatMovePrice(outstandingPrice)}
          </div>
          <div className="stat-actions space-x-[10px]">
            <button
              className=" bg-white hover:scale-[1.02] transition-all duration-300 focus:bg-white w-[200px] active:bg-white px-[10px] py-[5px] rounded-[5px]"
              onClick={handleOutstanding}
              disabled={
                submitLoading ||
                outstandingPrice === 0 ||
                !isGivenDateGreaterThanCurrent
              }
            >
              {/* Pay Outstanding */}
              {!submitLoading && (
                <span className="text-black font-semibold">
                  PAY OUTSTANDING
                </span>
              )}
              {submitLoading && (
                <div className="flex items-center justify-center space-x-[5px]">
                  {/* <span className="text-black font-semibold">CHECKING OUT</span> */}
                  <span
                    className={`loading loading-spinner loading-md text-black`}
                  ></span>
                </div>
              )}
            </button>
          </div>
        </div>
        {/* Extra payment */}
        <div className="flex flex-col px-[20px] py-[30px]">
          <div className="font-bold flex items-center space-x-[5px]">
            <p className="">Add-ons</p>
            <div
              className="cursor-pointer"
              onMouseEnter={() => setShowTip(true)}
              onMouseLeave={() => setShowTip(false)}
            >
              <BiHelpCircle className={`"font-bold text-[25px] text-white"`} />
            </div>
          </div>
          <div className="font-bold text-[30px]">
            {`${
              !isGivenDateGreaterThanCurrent
                ? "***"
                : paidExtra()
                ? formatMovePrice(0)
                : formatMovePrice(extraPrice || 0)
            }`}
            {/* {formatMovePrice(extraPrice || 0)} */}
            {/* {reserveDetails?.moverPrice -
            reserveDetails?.paidPrice} */}
          </div>
          <div className="stat-actions space-x-[10px]">
            <button
              className=" bg-white hover:scale-[1.02] transition-all duration-300 focus:bg-white w-[200px] active:bg-white px-[10px] py-[5px] rounded-[5px] flex justify-center "
              onClick={handleExtra}
              disabled={
                submitLoading2 ||
                extraPrice === 0 ||
                paidExtra() ||
                !isGivenDateGreaterThanCurrent
              }
            >
              {/* Pay Outstanding */}
              {!submitLoading2 && (
                <span className="text-black font-semibold text-center">
                  {`${paidExtra() ? "PAID" : "PAY ADD-ONS"}`}
                </span>
              )}
              {submitLoading2 && (
                <div className="flex items-center justify-center space-x-[5px] text-center w-full">
                  {/* <span className="text-black font-semibold">CHECKING OUT</span> */}
                  <span
                    className={`loading loading-spinner loading-md text-black text-center`}
                  ></span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`flex items-center space-x-[5px] duration-300 transition-all ${
          showTip ? "opacity-1" : "opacity-0"
        }`}
      >
        <BiHelpCircle className="font-bold text-[40px] mr-[10px] md:mr-0  md:text-[25px] text-primary" />
        <p className="text-[14px] font-semibold text-gray-500">
          The Add-ons Payment depends on the amount of items picked for move
          that exceeds the package selected.
        </p>
      </div>
    </div>
  );
};

export default PaymentDashboard;
