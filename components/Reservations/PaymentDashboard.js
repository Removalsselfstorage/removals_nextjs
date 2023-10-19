import useQuote from "@/hooks/useQuote";
import { moveBalanceCheckout, moveExtraCheckout } from "@/lib/moveCheckout";
import { formatMovePrice } from "@/utils/logics";
import React, { useEffect, useState } from "react";
import { BiHelpCircle } from "react-icons/bi";

const PaymentDashboard = () => {
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
    (reserveDetails?.moverPrice - reserveDetails?.paidPrice) * 100
  );

  const stripeExtraAmount = parseInt(reserveDetails?.extraPrice * 100);

  // useEffect(() => {
  //   setCompletedBooking(completedBook(id));
  //   setExtraPrice(completedBook(id)?.extraPrice);
  // }, [completedBookings]);

  console.log({
    stripeProductId,
    stripeOutAmount,
    // price: paymentDetails?.paidPrice,
  });

  const handleOutstanding = () => {
    setSubmitLoading(true);
    moveBalanceCheckout(stripeProductId, stripeOutAmount);
  };

  const handleExtra = () => {
    setSubmitLoading2(!submitLoading2);
    moveExtraCheckout(stripeProductId, stripeExtraAmount);
  };

  const paidPrice =
    Number(reserveDetails?.paidPrice) + Number(reserveDetails?.outPrice);

  const outstandingPrice =
    reserveDetails?.moverPrice -
    reserveDetails?.paidPrice -
    reserveDetails?.outPrice;

  const extraPrice =
    reserveDetails?.extraPrice - reserveDetails?.extraPricePaid;

  useEffect(() => {}, []);

  console.log({
    reserveDetails,
    extraPrice,
    outstandingPrice,
  });

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
          <div className="font-bold">Payment made</div>
          <div className="font-bold text-[30px]">
            {formatMovePrice(paidPrice)}
          </div>
          <div className="stat-actions">
            <div className="text-white font-semibold">
              ({reserveDetails?.paymentType} Deposit)
            </div>
          </div>
        </div>
        {/*  outstanding payment */}
        <div className="flex flex-col px-[20px] py-[30px]">
          <div className="font-bold">Outstanding Payment</div>
          <div className="font-bold text-[30px]">
            {formatMovePrice(outstandingPrice)}
          </div>
          <div className="stat-actions space-x-[10px]">
            <button
              className=" bg-white hover:scale-[1.02] transition-all duration-300 focus:bg-white w-[200px] active:bg-white px-[10px] py-[5px] rounded-[5px]"
              onClick={handleOutstanding}
              disabled={submitLoading || outstandingPrice === 0}
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
                    className={`loading loading-dots loading-md text-black`}
                  ></span>
                </div>
              )}
            </button>
          </div>
        </div>
        {/* Extra payment */}
        <div className="flex flex-col px-[20px] py-[30px]">
          <div className="font-bold flex items-center space-x-[5px]">
            <p className="">Extra Payment</p>
            <div
              className="cursor-pointer"
              onMouseEnter={() => setShowTip(true)}
              onMouseLeave={() => setShowTip(false)}
            >
              <BiHelpCircle className={`"font-bold text-[25px] text-white"`} />
            </div>
          </div>
          <div className="font-bold text-[30px]">
            {formatMovePrice(extraPrice || 0)}
            {/* {reserveDetails?.moverPrice -
            reserveDetails?.paidPrice} */}
          </div>
          <div className="stat-actions space-x-[10px]">
            <button
              className=" bg-white hover:scale-[1.02] transition-all duration-300 focus:bg-white w-[200px] active:bg-white px-[10px] py-[5px] rounded-[5px] flex justify-center "
              onClick={handleExtra}
              disabled={submitLoading2 || extraPrice === 0}
            >
              {/* Pay Outstanding */}
              {!submitLoading2 && (
                <span className="text-black font-semibold text-center">
                  PAY EXTRA
                </span>
              )}
              {submitLoading2 && (
                <div className="flex items-center justify-center space-x-[5px] text-center w-full">
                  {/* <span className="text-black font-semibold">CHECKING OUT</span> */}
                  <span
                    className={`loading loading-dots loading-md text-black text-center`}
                  ></span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`flex items-center space-x-[5px] ${
          showTip ? "opacity-1" : "opacity-0"
        }`}
      >
        <BiHelpCircle className="font-bold text-[40px] mr-[10px] md:mr-0  md:text-[25px] text-primary" />
        <p className="text-[14px] font-semibold text-gray-500">
          The Extra Payment depends on the amount of items picked for move that
          exceeds the package selected.
        </p>
      </div>
    </div>
  );
};

export default PaymentDashboard;
