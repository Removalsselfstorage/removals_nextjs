import React from "react";

const PayMethod = ({
  partDepositOnchange,
  depositPart,
  depositFull,
  fullDepositOnchange,
}) => {
  return (
    <div className="">
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
              checked={depositPart}
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
              checked={depositFull}
            />
            <p className="leading-[18px] text-[15px] md:text-[16px] font-semibold mb-[0px] ">
              Full Deposit
            </p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PayMethod;
