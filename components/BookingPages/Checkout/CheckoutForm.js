import React from 'react';

const CheckoutForm = () => {
  return (
    <div className="bg-white shadow-lg rounded-[30px] lg:flex-[3] py-[30px] px-[30px] md:px-[50px] w-full">
      {/* appointment row */}
      <div className="">
        <h1 className="text-xl font-bold mb-[20px] px-[0px]">
          Appointment Info
        </h1>
        {/* row 1 */}
        <div className="flex flex-col items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[50px] mb-[20px]">
          {/* first name */}
          <div className="flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[30px] space-y-[10px] md:space-y-0 md:justify-center">
            {/* first name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">First Name*</span>
              </label>
              <input
                type="text"
                placeholder="Type your first name"
                className="input input-primary w-full"
              />
            </div>
          </div>
          {/* last name */}
          <div className="flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center">
            {/* last name */}
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text font-semibold">Last Name*</span>
              </label>
              <input
                type="text"
                placeholder="Type your last name"
                className="input input-primary w-full"
              />
            </div>
          </div>
        </div>
        {/* row 2 */}
        <div className="flex flex-col items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[50px] mb-[20px]">
          {/* Mobile Number */}
          <div className="flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[30px] space-y-[10px] md:space-y-0 md:justify-center">
            {/* first name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Mobile Number*</span>
              </label>
              <input
                type="text"
                placeholder="Type your mobile number"
                className="input input-primary w-full"
              />
            </div>
          </div>
          {/* Email */}
          <div className="flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center">
            {/* last name */}
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text font-semibold">Email Address*</span>
              </label>
              <input
                type="text"
                placeholder="Type your email address"
                className="input input-primary w-full"
              />
            </div>
          </div>
        </div>
        {/* row 3 */}
        <div className="flex flex-col items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[50px] mb-[20px]">
          {/* Mobile Number */}
          <div className="flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[30px] space-y-[10px] md:space-y-0 md:justify-center">
            {/* first name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Pickup full address*
                </span>
              </label>
              <input
                type="text"
                placeholder="Type your pickup full address"
                className="input input-primary w-full"
              />
            </div>
          </div>
          {/* Email */}
          <div className="flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center">
            {/* last name */}
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text font-semibold">
                  Drop off full address*
                </span>
              </label>
              <input
                type="text"
                placeholder="Type your drop off full address"
                className="input input-primary w-full"
              />
            </div>
          </div>
        </div>
      </div>
      {/* payment row */}
      <div className="mt-[50px]">
        <h1 className="text-xl font-bold mb-[20px] px-[0px]">Payment Method</h1>
        {/* row 1 */}
        <div className="mb-[20px]">
          <div className="flex mt-[10px] mb-[10px] md:mb-[20px] w-full">
            <div className="form-control ">
              <label className="label cursor-pointer flex items-start space-x-[10px] md:space-x-[10px] w-full">
                <input
                  type="radio"
                  name="radio-1"
                  className="radio radio-primary"
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
        </div>
        {/* row 2 */}
        <div className="mb-[20px]">
          <div className="flex mt-[10px] mb-[10px] md:mb-[20px] w-full">
            <div className="form-control ">
              <label className="label cursor-pointer flex items-start space-x-[10px] md:space-x-[10px] w-full">
              <input
                  type="radio"
                  name="radio-1"
                  className="radio radio-primary"
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
        </div>
        {/* row 3 */}
        <div className="mb-[20px]">
          <div className="flex mt-[10px] mb-[10px] md:mb-[20px] w-full">
            <div className="form-control ">
              <label className="label cursor-pointer flex items-start space-x-[5px] md:space-x-[10px] w-full">
              <input
                  type="radio"
                  name="radio-1"
                  className="radio radio-primary"
                />
                <span className="flex flex-col">
                  <p className="leading-[18px] text-[15px] md:text-[16px] font-semibold mb-[10px] pl-[10px]">
                    Payment on-site
                  </p>
                  <p className="text-[14px] text-gray-500  pl-[10px]">
                    Cash payment at appointment.
                  </p>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* comment row */}
      <div className="mt-[50px]">
        <h1 className="text-xl font-bold mb-[20px] px-[0px]">
          Leave a comment
        </h1>
        {/* row 1 */}
        <div className="w-full">
          <textarea
            className="textarea w-full textarea-primary"
            placeholder="(eg. mention if you want to travel with the van). Please do not list items here."
          ></textarea>
          {/* agree to terms */}
          <div className="flex mt-[10px] mb-[7px] md:mb-[10px] w-full">
            <div className="form-control ">
              <label className="label cursor-pointer flex justify-center space-x-[20px] w-full">
                <input
                  type="checkbox"
                  //   checked="checked"
                  className="checkbox checkbox-primary"
                />
                <span className="leading-[20px] text-[13px] md:text-[15px]">
                  I agree to the terms and conditions outlined in the privacy
                  policy.
                </span>
              </label>
            </div>
          </div>
          <div className="flex mt-[10px] mb-[10px] md:mb-[20px] w-full">
            <div className="form-control ">
              <label className="label cursor-pointer flex justify-center space-x-[20px] w-full">
                <input
                  type="checkbox"
                  //   checked="checked"
                  className="checkbox checkbox-primary"
                />
                <span className="leading-[20px] text-[13px] md:text-[15px]">
                  Create account to manage your appointments.
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
