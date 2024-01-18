import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import GoogleSearchInput from "../Inputs/GoogleSearchInput";
import SelectSearch from "../Inputs/SelectSearch";
import { containerOptions, storageReason } from "@/dummyData/inputData";
import BasicDatePicker from "../DatePicker/DatePicker";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BiSave } from "react-icons/bi";
import { IoMdInformationCircle } from "react-icons/io";

const Payment = ({
  activateError,
  activateError2,
  fullName,
  setFullName,
  firstName,
  setFirstName,
  setLastName,
  lastName,
  email,
  emailError,
  handleEmailChange,
  phone,
  setPhone,
  phoneError,
  submitSuccess,
  setSubmitSuccess,
  submitError,
  personSubmit,
  personBack,
  defaultRoleValue,
  redirect,
  submitStatus,
  submitStatus2,
  address,
  setAddress,
  addressDetails,
  setAddressDetails,
  defaultStorageReason,
  storageReasonOption,
  setStorageReasonOption,
  defaultContainerAmount,
  containerAmount,
  setContainerAmount,
  dateValue,
  setDateValue,
  durationCount,
  setDurationCount,
  weekValue,
  paymentSubmit,
  paymentSubmit2,
  date,
  date2,
  setActivateError,
  setActivateError2,
  setSubmitStatus,
  setSubmitStatus2,
  containerSize,
  setContainerSize,
  price,
  agreeTerms,
  setAgreeTerms,
  bookRef,
  discount,
  setDiscount,
  totalPrice,
}) => {
  const router = useRouter();
  const { query } = router;

  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    window.my_modal_64.close();
    setOpenModal(false);
    // setTimeout(() => {
    //   setShowProgressMessage(false);
    //   setShowSent(false);
    //   // setEmail("");
    // }, 500);
  };

  const modalContentRef = useRef(null);

  useEffect(() => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTop = 0;
    }
  }, [openModal]);

  // const totalPrice = calculateStoragePrice() * Number(containerAmount);
  // const totalPrice = price * durationCount * Number(containerAmount);

  return (
    <div className=''>
      {/* body */}
      <div className='px-[20px]  lg:px-[50px] mb-[50px] py-[30px] bg-white rounded-bl-[20px] rounded-br-[20px] mx-[10px] md:mx-[100px]'>
        {/* row 1 - fullname + email */}
        <div className='flex flex-col mb-[20px] items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-start lg:space-x-[50px]'>
          {/* left */}
          <div className='flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[30px] space-y-[10px] md:space-y-0 md:justify-center'>
            {/* first name */}
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text font-semibold'>
                  Full Name<span className='text-secondary'>*</span>
                </span>
              </label>
              <input
                type='text'
                placeholder='e.g John Doe'
                className={`${
                  activateError && !fullName ? "ring ring-secondary" : ""
                } input input-primary w-full h-[43px]`}
                onChange={(e) => setFullName(e.target.value)}
                defaultValue={fullName}
              />
            </div>
          </div>
          {/* right */}
          <div className='flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center'>
            {/* email */}
            <div className='form-control w-full '>
              <label className='label'>
                <span className='label-text font-semibold'>
                  Email<span className='text-secondary'>*</span>
                </span>
              </label>
              <input
                type='email'
                placeholder='e.g johndoe@gmail.com'
                className={`${
                  activateError && (!email || !emailError)
                    ? "ring ring-secondary"
                    : ""
                } input input-primary w-full h-[43px]`}
                onChange={handleEmailChange}
                //
                defaultValue={email}
              />
              {!emailError && (
                <p className='text-[14px] text-secondary mt-[5px]'>
                  Email format is incorrect.
                </p>
              )}
              {/* {emailError && (
                <p className='text-[14px] text-primary mt-[5px]'>
                  Please enter only a valid email.
                </p>
              )} */}
            </div>
          </div>
        </div>

        {/* row 2 - address + telephone*/}
        <div className='flex flex-col mb-[20px] items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-start  lg:space-x-[50px]'>
          {/* left */}
          <div className='flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center'>
            {/* email */}
            <div className='form-control w-full '>
              <label className='label'>
                <span className='label-text font-semibold'>
                  Home Address<span className='text-secondary'>*</span>
                </span>
              </label>
              <GoogleSearchInput
                styles='py-[10px] px-[10px]'
                setAddress={setAddress}
                addressDetails={addressDetails}
                setAddressDetails={setAddressDetails}
                placeholder='Search location...'
                defaultValue={address}
                errorCheck={activateError && !address}
              />
            </div>
          </div>

          {/* right */}
          <div className='flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[30px] space-y-[10px] md:space-y-0 md:justify-center md:items-start'>
            {/* Telephone* */}
            <div className='form-control w-full flex-[1]'>
              <label className='label'>
                <span className='label-text font-semibold'>
                  Telephone<span className='text-secondary'>*</span>
                </span>
              </label>

              <div
                className={`${
                  activateError && !phone ? "ring ring-secondary" : ""
                }  flex input input-primary h-[43px]`}
              >
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  flags={flags}
                  defaultCountry='GB'
                  onChange={setPhone}
                  value={phone}
                />
              </div>
              {!phoneError && (
                <p className='text-[14px] text-secondary mt-[5px]'>
                  Please enter a valid number
                </p>
              )}
            </div>
          </div>
        </div>

        {/* row 3 - storage reason + container amount*/}
        <div className='flex flex-col items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[50px] mb-[20px]'>
          {/* left */}
          <div className='flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center'>
            {/* property type */}
            <div className='flex flex-col w-full'>
              <label className='label'>
                <span className='label-text font-semibold'>
                  Reason for Storage<span className='text-secondary'>*</span>
                </span>
              </label>
              <div className='w-full'>
                <SelectSearch
                  placeholder='Select'
                  options={storageReason}
                  isSearchable={false}
                  //   name="service2"
                  // defaultValue={serviceOptions[2]}
                  defaultValue={defaultStorageReason()}
                  setValue={setStorageReasonOption}
                  errorCheck={activateError && storageReasonOption == ""}
                />
              </div>
            </div>
          </div>

          {/* right */}
          <div className='flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[30px] space-y-[10px] md:space-y-0 md:justify-center'>
            {/* Number of movers */}
            <div className='form-control w-full '>
              <label className='label'>
                <span className='label-text font-semibold'>
                  Number of Container
                  <span className='text-secondary'>*</span>
                </span>
              </label>
              <div className='w-full'>
                <SelectSearch
                  placeholder='Select'
                  options={containerOptions}
                  isSearchable={false}
                  name='service35'
                  defaultValue={defaultContainerAmount() || containerOptions[0]}
                  //   defaultValue={menOptions[0]}
                  setValue={setContainerAmount}
                  errorCheck={activateError && containerAmount == ""}
                />
              </div>
            </div>
          </div>
        </div>

        {/* row 4 - duration + date*/}
        <div className='flex flex-col  justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-start lg:space-x-[50px] mb-[50px]'>
          {/* left */}
          <div className='flex flex-[1]'>
            {/* duration */}
            <div className='flex flex-col w-full'>
              <div className='flex flex-col w-full'>
                <label className='label'>
                  <span className='label-text font-semibold'>
                    Duration<span className='text-secondary'>*</span>
                  </span>
                </label>
                <div className='flex items-center space-x-[5px]'>
                  <div
                    onClick={() =>
                      durationCount > 1 && setDurationCount((prev) => prev - 1)
                    }
                    className='flex justify-center items-center btn btn-primary w-[45px] p-[5px] h-[45px] rounded-[5px]'
                  >
                    <AiOutlineMinus className='text-white font-bold text-[18px]' />
                  </div>
                  <div
                    className={`${
                      activateError && !durationCount
                        ? "flex justify-center items-center h-[48px] rounded-[10px] w-full border border-primary font-semibold ring ring-secondary"
                        : "flex justify-center items-center h-[48px] rounded-[10px] w-full border border-primary font-semibold"
                    }`}
                  >
                    {durationCount} {weekValue}
                  </div>
                  <div
                    onClick={() => setDurationCount((prev) => prev + 1)}
                    className='flex justify-center items-center btn btn-primary w-[45px] p-[5px] h-[45px] rounded-[5px]'
                  >
                    <AiOutlinePlus className='text-white font-bold text-[18px]' />
                  </div>
                </div>
                <p className='text-[14px] mt-[20px]'>
                  <span className='font-semibold'>NB:</span> The selected
                  storage rate is{" "}
                  <span className='font-semibold text-secondary'>
                    ${discount}/week
                  </span>{" "}
                  for the first 8 weeks, then{" "}
                  <span className='font-semibold text-secondary'>
                    ${price}/week
                  </span>{" "}
                  afterwards.
                </p>
                {/* <p className="text-[14px] mt-[10px]">Enjoy a special rate of $10 per week for the first 8 weeks of storage, and thereafter, the weekly rate is $20.</p> */}
              </div>
            </div>
          </div>
          {/* right */}
          <div className='flex flex-[1] space-x-[20px]'>
            

            <div className='flex flex-[1]'>
              {/* move date*/}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text font-semibold'>
                    Storage Start Date<span className='text-secondary'>*</span>
                  </span>
                </label>
                <button
                  className={`${
                    activateError && date == "Invalid Date"
                      ? "ring ring-secondary"
                      : ""
                  } flex justify-center items-center bg-white border-[1.4px] rounded-[8px] border-primary cursor-pointer overflow-hidden py-[4px] focus:ring-[2px] active:ring-[2px] ring-primary`}
                >
                  <div className='opacity-[0.9] mt-[-10px] cursor-pointer'>
                    <BasicDatePicker
                      setDateValue={setDateValue}
                      dateValue={dateValue}
                    />
                  </div>
                </button>
                {/* <p className="">{dateValue}</p> */}
                {/* <DatePicker2 /> */}
                {/* <div className="bg-white border rounded-[8px] border-primary">
                          <BasicDatePicker />
                        </div> */}
              </div>
            </div>

            <div className='flex flex-[1]'>
              {/* move date*/}
              <div className='form-control w-full'>
                <label className='label'>
                  <span className='label-text font-semibold'>Total Price</span>
                </label>
                <div
                  // type='number'
                  // placeholder='e.g John Doe'
                  className={`border-[1px] input rounded-[8px] border-primary flex justify-start items-center w-full h-[43px] text-primary font-semibold`}
                  // onChange={(e) => setFullName(e.target.value)}
                  // readOnly
                  // value={totalPrice.toFixed(2)}
                >
                  £{totalPrice.toFixed(2)}
                  </div>
              </div>
            </div>
          </div>
        </div>

        {submitStatus === "error" && (
          <div className='w-full flex justify-center text-[14px] mt-[20px] text-secondary bg-secondary/20 rounded-[10px] py-[10px] px-[30px]'>
            Please fill all mandatory fields
          </div>
        )}

        {/* modal */}
        <dialog id='my_modal_64' className='modal py-[20px] px-[10px]'>
          <form
            method='dialog'
            className='modal-box px-[20px] w-11/12 max-w-5xl relative'
            ref={modalContentRef}
          >
            <div
              onClick={closeModal}
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border border-secondary text-secondary'
            >
              ✕
            </div>

            <div className=''>
              <div className='w-full flex justify-center mb-[20px]'>
                <div className='text-secondary bg-secondary/10 flex justify-center items-center w-[60px] h-[60px] rounded-full'>
                  <IoMdInformationCircle className='text-[30px] ' />
                </div>
              </div>

              <h3 className='font-bold text-[24px] mb-[30px] text-primary text-center'>
                Storage Info Summary
              </h3>

              {/* row 1*/}
              <div className='flex flex-col mb-[20px] lg:mb-[30px] items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-start lg:px-[50px] border-b-[2px] pb-[30px] lg:space-x-[50px]'>
                {/* left */}
                <div className='flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[30px] space-y-[10px] md:space-y-0 md:justify-center md:items-start'>
                  {/* Telephone* */}
                  <div className='form-control w-full flex-[1]'>
                    <label className='label px-[0]'>
                      <span className='label-text font-semibold text-primary'>
                        Full Name
                      </span>
                    </label>

                    <p className=''>{fullName ? fullName : "********"}</p>
                  </div>
                </div>
                {/* middle */}
                <div className='flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center'>
                  {/* email */}
                  <div className='form-control w-full '>
                    <label className='label px-[0]'>
                      <span className='label-text font-semibold text-primary'>
                        Email Address
                      </span>
                    </label>
                    <p className=''>{email ? email : "********"}</p>
                  </div>
                </div>
                {/* right */}
                <div className='flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center'>
                  {/* email */}
                  <div className='form-control w-full '>
                    <label className='label px-[0]'>
                      <span className='label-text font-semibold text-primary'>
                        Phone Number
                      </span>
                    </label>
                    <p className=''>{phone ? phone : "********"}</p>
                  </div>
                </div>
              </div>

              {/* row 2*/}
              <div className='flex flex-col mb-[20px] lg:mb-[30px] items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-start lg:px-[50px] border-b-[2px] pb-[30px] lg:space-x-[50px]'>
                {/* left */}
                <div className='flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[30px] space-y-[10px] md:space-y-0 md:justify-center md:items-start'>
                  {/* Telephone* */}
                  <div className='form-control w-full flex-[1]'>
                    <label className='label px-[0]'>
                      <span className='label-text font-semibold text-primary'>
                        Home Address
                      </span>
                    </label>

                    <p className=''>{address ? address : "********"}</p>
                  </div>
                </div>
                {/* middle */}
                <div className='flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center'>
                  {/* email */}
                  <div className='form-control w-full '>
                    <label className='label px-[0]'>
                      <span className='label-text font-semibold text-primary'>
                        Container Size
                      </span>
                    </label>
                    <p className=''>
                      {containerSize ? containerSize : "********"}
                    </p>
                  </div>
                </div>
                {/* right */}
                <div className='flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center'>
                  {/* email */}
                  <div className='form-control w-full '>
                    <label className='label px-[0]'>
                      <span className='label-text font-semibold text-primary'>
                        Container Amount
                      </span>
                    </label>
                    <p className=''>
                      X {containerAmount ? containerAmount : "***"}
                    </p>
                  </div>
                </div>
              </div>

              {/* row 3*/}
              <div className='flex flex-col mb-[20px] lg:mb-[30px] items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-start lg:px-[50px] border-b-[2px] pb-[30px] lg:space-x-[50px]'>
                {/* left */}
                <div className='flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center'>
                  {/* email */}
                  <div className='form-control w-full '>
                    <label className='label px-[0]'>
                      <span className='label-text font-semibold text-primary'>
                        Storage Start Date
                      </span>
                    </label>
                    <p className=''>{date2 ? date2 : "********"}</p>
                  </div>
                </div>
                {/* middle */}
                <div className='flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center'>
                  {/* email */}
                  <div className='form-control w-full '>
                    <label className='label px-[0]'>
                      <span className='label-text font-semibold text-primary'>
                        Storage Duration
                      </span>
                    </label>
                    <p className=''>
                      {durationCount ? durationCount : "**"} week(s)
                    </p>
                  </div>
                </div>
                {/* right */}
                <div className='flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center '>
                  {/* email */}
                  <div className='form-control w-full '>
                    <label className='label px-[0]'>
                      <span className='label-text font-semibold text-primary'>
                        Storage Ref ID
                      </span>
                    </label>
                    <p className='font-semibold'>
                      {bookRef ? bookRef : "***********"}
                    </p>
                  </div>
                </div>
              </div>

              {/* row 4*/}
              <div className='flex flex-col mb-[20px] lg:mb-[30px] items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-start lg:px-[50px] border-b-[2px] pb-[30px] lg:space-x-[50px]'>
                {/* left */}
                <div className='flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center '>
                  {/* email */}
                  <div className='form-control w-full '>
                    <label className='label px-[0]'>
                      <span className='label-text font-semibold text-primary'>
                        Total Price
                      </span>
                    </label>
                    <p className='font-semibold text-[18px]'>
                      £{totalPrice ? totalPrice.toFixed(2) : "***"}
                    </p>
                  </div>
                </div>

                {/* right */}
                <div className='flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center '>
                  {/* email */}
                  <div className='form-control w-full '>
                    <label className='label px-[0]'>
                      <span className='label-text font-semibold text-primary'>
                        Initial 20% Deposit
                      </span>
                    </label>
                    <p className='font-semibold text-[18px]'>
                      £{totalPrice ? (totalPrice * 0.2).toFixed(2) : "***"}
                    </p>
                  </div>
                </div>

                {/* right */}
                <div className='flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center '>
                  {/* email */}
                  {/* <div className='form-control w-full '>
                    <label className='label px-[0]'>
                      <span className='label-text font-semibold text-primary'>
                        Total Price
                      </span>
                    </label>
                    <p className='font-semibold text-[18px]'>
                      £{totalPrice ? totalPrice.toFixed(2) : "***"}
                    </p>
                  </div> */}
                </div>
              </div>

              <p className=' mb-[20px] text-secondary  text-[14px] w-full md:px-[50px] lg:px-[80px] text-center'>
                <span className='font-semibold'> NB: </span> A 20% deposit of
                the total price is required to be paid; inorder to secure the
                storage. While the balance will be made at the storage point of
                contact.
              </p>

              {/* Agree to terms */}
              <div className='flex justify-center  mt-[30px] mb-[10px] md:mb-[20px]  w-full'>
                <div className='form-control '>
                  <label className='label cursor-pointer flex justify-center space-x-[20px] w-full'>
                    <input
                      type='checkbox'
                      checked={agreeTerms}
                      className={`${
                        activateError2 && !agreeTerms
                          ? "ring ring-secondary"
                          : ""
                      } checkbox checkbox-primary`}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                    />
                    <span className='leading-[20px] text-[14px] md:text-[16px]'>
                      I agree to the terms and conditions
                    </span>
                  </label>
                </div>
              </div>

              {submitStatus2 === "error" && (
                <div className='w-full flex justify-center text-[14px] mt-[20px] text-secondary bg-secondary/20 rounded-[10px] py-[10px] px-[30px]'>
                  Please agree to the terms
                </div>
              )}

              <div className='flex w-full justify-center my-[50px] space-x-[10px]'>
                <div
                  onClick={closeModal}
                  //   type='submit'
                  className='btn btn-secondary btn-outline md:btn-wide flex items-center space-x-[5px]'
                  disabled={submitStatus2 === "loading"}
                >
                  {<span className=''>Close</span>}
                  {/* {submitStatus2 === "loading" && (
                      <>
                        <span className='loading loading-spinner loading-md text-white'></span>
                      </>
                    )} */}
                </div>
                <div
                  onClick={paymentSubmit2}
                  //   type='submit'
                  className='btn btn-secondary md:btn-wide flex items-center space-x-[5px]'
                  disabled={submitStatus2 === "loading"}
                >
                  {submitStatus2 !== "loading" && (
                    <span className=''>Pay Now</span>
                  )}
                  {submitStatus2 === "loading" && (
                    <>
                      {/* <span className=''>Sending Progress</span> */}
                      <span className='loading loading-spinner loading-md text-white'></span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </form>
          <form method='dialog'>{/* <button>close</button> */}</form>
          {/* <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                          </form> */}
        </dialog>

        {/* submit button*/}
        <div className=' mt-6 w-full '>
          <div className='flex flex-col '>
            <div className='flex items-center space-x-[10px] w-full justify-end'>
              <button
                onClick={() => {
                  router.push({
                    pathname: "/storage",
                    //   query: { stage: "payment" },
                  });
                  setActivateError(false);
                  setSubmitStatus("initial");
                }}
                // disabled={submitLoading}
                className='btn btn-secondary btn-outline w-[200px] flex items-center space-x-[5px] h-[60px]'
              >
                {
                  <span className=''>
                    <IoIosArrowBack className='text-[20px]' />
                  </span>
                }
                {<span className=''>Previous</span>}
              </button>
              <button
                onClick={() => {
                  //   window.my_modal_64.showModal()
                  setOpenModal(true);
                  paymentSubmit();
                }}
                // disabled={submitLoading}
                className='btn btn-secondary w-[200px] flex items-center space-x-[5px] h-[60px]'
              >
                {<span className=''>Make Payment</span>}
                {
                  <span className=''>
                    <IoIosArrowForward className='text-[20px]' />
                  </span>
                }
              </button>
            </div>
            {/* {submitStatus === "error" && (
              <div className='text-[14px] mt-[15px] text-secondary bg-secondary/20 rounded-[10px] py-[10px] px-[30px]'>
                Please input a duration.
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
