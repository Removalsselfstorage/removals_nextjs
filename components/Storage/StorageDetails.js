import React from "react";
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

const StorageDetails = ({
  activateError,
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
}) => {
  const router = useRouter();
  const { query } = router;

  return (
    <div className=''>
      {/* body */}
      <div className='px-[20px]  lg:px-[50px] mb-[50px] py-[30px] bg-white rounded-bl-[20px] rounded-br-[20px] mx-[10px] md:mx-[100px]'>
        {/* row 1 */}
        <div className='flex flex-col mb-[20px] items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[50px]'>
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
                  activateError && !firstName ? "ring ring-secondary" : ""
                } input input-primary w-full h-[43px]`}
                onChange={(e) => setFirstName(e.target.value)}
                defaultValue={firstName}
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

        {/* row 3*/}
        <div className='flex flex-col mb-[20px] items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-start  lg:space-x-[50px]'>
          {/* left */}
          <div className='flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center'>
            {/* email */}
            <div className='form-control w-full '>
              <label className='label'>
                <span className='label-text font-semibold'>
                  Address<span className='text-secondary'>*</span>
                </span>
              </label>
              <GoogleSearchInput
                styles='py-[10px] px-[10px]'
                setAddress={setAddress}
                addressDetails={addressDetails}
                setAddressDetails={setAddressDetails}
                placeholder='Search location...'
                // defaultValue={serviceLocation?.locationFrom.name}
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
                  defaultCountry='NG'
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

        {/* row 5 */}
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

        {/* row 6 */}
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
                    Move Date<span className='text-secondary'>*</span>
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
          </div>
        </div>

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
                // onClick={() => {
                //   router.push({
                //     pathname: "/storage",
                //     query: { stage: "payment" },
                //   });
                // }}
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

export default StorageDetails;
