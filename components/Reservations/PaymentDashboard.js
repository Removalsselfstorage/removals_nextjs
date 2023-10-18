import useQuote from "@/hooks/useQuote";
import { moveBalanceCheckout } from "@/lib/moveCheckout";
import { formatMovePrice } from "@/utils/logics";
import React, { useEffect, useState } from "react";
import { BiHelpCircle } from "react-icons/bi";

const PaymentDashboard = ({ completedBooking, extraPrice }) => {
  const {
    setReserveDetailsFxn,
    updateReserveDetailsFxn,
    resetReserveDetailsFxn,
    // completedBooking,
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

  const computeProductId = () => {
    switch (completedBooking?.movePackage) {
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
    (completedBooking?.moverPrice - completedBooking?.paidPrice) * 100
  );

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
    // moveBalanceCheckout(stripeProductId, stripeOutAmount);
  };

  useEffect(() => {}, []);

  console.log({ completedBooking });

  return (
    <div className="flex flex-col space-y-[10px]">
      <div className="stats bg-primary text-white ">
        {/* Move price */}
        <div className="flex flex-col px-[20px] py-[30px]">
          <div className="font-bold">Move Price</div>
          <div className="font-bold text-[30px]">
            {/* ₤{completedBooking?.moverPrice} */}
            {formatMovePrice(completedBooking?.moverPrice)}
          </div>
          <div className="stat-actions">
            <div className="text-white font-semibold">
              {completedBooking?.movePackage?.toUpperCase()}
            </div>
          </div>
        </div>
        {/* payment made */}
        <div className="flex flex-col px-[20px] py-[30px]">
          <div className="font-bold">Payment made</div>
          <div className="font-bold text-[30px]">
            {formatMovePrice(completedBooking?.paidPrice)}
          </div>
          <div className="stat-actions">
            <div className="text-white font-semibold">
              ({completedBooking?.paymentType} Deposit)
            </div>
          </div>
        </div>
        {/*  outstanding payment */}
        <div className="flex flex-col px-[20px] py-[30px]">
          <div className="font-bold">Outstanding Payment</div>
          <div className="font-bold text-[30px]">
            {formatMovePrice(
              completedBooking?.moverPrice - completedBooking?.paidPrice
            )}
          </div>
          <div className="stat-actions space-x-[10px]">
            <button
              className=" bg-white hover:scale-[1.02] transition-all duration-300 focus:bg-white w-[200px] active:bg-white px-[10px] py-[5px] rounded-[5px]"
              onClick={handleOutstanding}
              disabled={submitLoading}
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
          <div className="font-bold">Extra Payment</div>
          <div className="font-bold text-[30px]">
            {formatMovePrice(Number(completedBooking?.extraPrice) || 0.0)}
            {/* {completedBooking?.moverPrice -
            completedBooking?.paidPrice} */}
          </div>
          <div className="stat-actions space-x-[10px]">
            <button
              className=" bg-white hover:scale-[1.02] transition-all duration-300 focus:bg-white w-[200px] active:bg-white px-[10px] py-[5px] rounded-[5px] flex justify-center "
              onClick={handleExtra}
              // disabled={submitLoading2}
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
      <div className="flex items-center space-x-[5px]">
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
