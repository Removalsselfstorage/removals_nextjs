// import PaymentForm from "@/components/Payment/PaymentForm";
import React, { useEffect, useState } from "react";
// import { PayPalButton } from "react-paypal-button-v3";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const CheckoutForm = ({
  partDepositOnchange,
  fullDepositOnchange,
  cardOnchange,
  paypalOnchange,
}) => {
  const [amount, setAmount] = useState(20);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const addPaypalScript = () => {
    if (window.paypal) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AUjKA9gFxV187adUYdXSmLX-XQkhTp4mb9pHwovh-ICBlBFpqlbmwFH920CRsQncHmB1CObNRic2scql";

    script.type = "text/javascript";
    script.async = true;
    script.onload = () => {
      setScriptLoaded(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    addPaypalScript();
  }, []);

  const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
  };

  return (
    <div className="bg-white shadow-lg rounded-[30px] lg:flex-[2] py-[30px] px-[30px] md:px-[50px] w-full">
      {/*50% payment row */}
      <div className="mt-[0px]">
        <h1 className="text-xl font-bold mb-[20px] px-[0px]">Payment Type*</h1>
        <div className="flex space-x-[20px] items-center">
          {/* left */}
          <div className="mb-[0px]">
            <label className="label cursor-pointer flex items-center space-x-[10px] md:space-x-[10px] w-full">
              <input
                type="radio"
                name="radio-1"
                className="radio radio-primary"
                onChange={partDepositOnchange}
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
                onChange={fullDepositOnchange}
              />
              <p className="leading-[18px] text-[15px] md:text-[16px] font-semibold mb-[0px] ">
                Full Deposit
              </p>
            </label>
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
        {/* <div className="mb-[20px]">
          <div className="flex mt-[10px] mb-[10px] md:mb-[20px] w-full">
            <div className="form-control ">
              <label className="label cursor-pointer flex items-start space-x-[10px] md:space-x-[10px] w-full">
                <input
                  type="radio"
                  name="radio-2"
                  className="radio radio-primary"
                  onChange={cardOnchange}
                />
                <span className="flex flex-col w-full">
                  <p className="leading-[18px] text-[15px] md:text-[16px] font-semibold mb-[10px] ">
                    Credit/Debit Card
                  </p>
                  <img
                    src="/svg/cards.svg"
                    alt=""
                    className="h-[20px] md:h-[30px] w-fit"
                  />
                </span>
              </label>
            </div>
          </div>
        </div> */}
        {/* row 2 */}
        {/* <div className="mb-[20px]">
          <div className="flex mt-[10px] mb-[10px] md:mb-[20px] w-full">
            <div className="form-control ">
              <label className="label cursor-pointer flex items-start space-x-[10px] md:space-x-[10px] w-full">
                <input
                  type="radio"
                  name="radio-2"
                  className="radio radio-primary"
                  onChange={paypalOnchange}
                />
                <span className="flex flex-col w-full">
                  <p className="leading-[18px] text-[15px] md:text-[16px] font-semibold mb-[10px]">
                    Paypal
                  </p>
                  <img
                    src="/svg/paypal.svg"
                    alt=""
                    className="h-[20px] md:h-[30px] w-fit"
                  />
                </span>
              </label>
            </div>
          </div>
        </div> */}
      </div>
      {/* comment row */}
      <div className="mt-[10px] md:mt-[30px]">
        <h1 className="text-xl font-bold mb-[20px] px-[0px]">
          Leave a comment
        </h1>
        {/* row 1 */}
        <div className="w-full">
          <textarea
            className="textarea w-full textarea-primary min-h-[150px] max-h-[200px]"
            placeholder="(eg. mention if you want to travel with the van). Please do not list items here."
          ></textarea>
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
            />
            <span className="leading-[20px] text-[14px] md:text-[15px]">
              You acknwoledge that your inventory is accurate and will contact
              us to add further items <b>(prices may change)</b>
            </span>
          </label>
        </div>
      </div>

      {/* <PaymentForm/> */}
      {/* {scriptLoaded ? (
        <PayPalButton
          amount={amount}
          onSuccess={(details, data) => {
            console.log({ details, data });
          }}
        />
      ) : (
        <span>Loading...</span>
      )} */}
    </div>
  );
};

export default CheckoutForm;
