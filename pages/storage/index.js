import NormalLayout from "@/layouts/NormalLayout";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { titleFont } from "@/utils/fonts";
import Container from "@/components/Storage/Container";
import Link from "next/link";
import { useRouter } from "next/router";
import StorageSize from "@/components/Storage/StorageSize";
import Payment from "@/components/Storage/Payment";
import {
  countries2,
  phoneCodesOptionsRefactored,
  phoneCodesOptionsRefactored2,
} from "@/dummyData/dummyData";
import { containerOptions, storageReason } from "@/dummyData/inputData";
import dayjs from "dayjs";

const Storage = () => {
  const [activeCont, setActiveCont] = useState("cont1");
  const [stage, setStage] = useState("");
  const [submitStatus, setSubmitStatus] = useState("initial");
  const [submitStatus2, setSubmitStatus2] = useState("initial");
  const [duration, setDuration] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [activateError, setActivateError] = useState(false);
  const [activateError2, setActivateError2] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [fullName, setFullName] = useState("");
  const [lastName, setLastName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [schoolWebsite, setSchoolWebsite] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetails, setAddressDetails] = useState({});
  const [schoolCity, setSchoolCity] = useState("");
  const [schoolLogo, setSchoolLogo] = useState(null);
  const [schoolLogoUrl, setSchoolLogoUrl] = useState("");
  const [schoolLogoName, setSchoolLogoName] = useState("");
  const [phoneValue, setPhoneValue] = useState("Nigeria (+234)");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(true);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(true);
  const [emailError2, setEmailError2] = useState(true);
  const [storageReasonOption, setStorageReasonOption] = useState("");
  const [containerAmount, setContainerAmount] = useState("1");
  const [containerSize, setContainerSize] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [durationCount, setDurationCount] = useState(1);
  const [formattedDate, setFormattedDate] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const router = useRouter();

  const { query } = router;

  //Date
  const date = dayjs(dateValue).format(" YYYY/MM/DD ");

  const date2 = dayjs(dateValue).format("dddd, MMMM D, YYYY");

  const defaultStorageReason = () => {
    const option = storageReason.filter(
      (opt) => opt.value === storageReasonOption
    );
    return option;
  };

  const weekValue = durationCount <= 1 ? "week" : "weeks";

  const defaultContainerAmount = () => {
    const option = containerOptions.filter(
      (opt) => opt.value === containerAmount
    );
    return option;
  };

  const handleDurationChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = parseInt(inputValue, 10);

    if (!isNaN(numericValue) && numericValue >= 1) {
      setDuration(numericValue);
    } else {
      setDuration(1);
    }
  };
  const handleDurationChange2 = (e) => {
    const inputValue = e.target.value;
    const numericValue = parseInt(inputValue, 10);

    if (!isNaN(numericValue) && numericValue >= 1) {
      setQuantity(numericValue);
    } else {
      setQuantity(1);
    }
  };

  const handlePhoneNumberChange = (event) => {
    const inputValue = event?.target?.value;

    // Remove any non-digit characters from the input
    const strippedNumber = inputValue?.replace(/\D/g, "");

    // Check if the stripped number is either 10 or 11 digits long
    const isValidPhoneNumber =
      // strippedNumber.length === 5 || strippedNumber.length === 11;
      strippedNumber?.length > 5;

    setPhone(strippedNumber);
    setPhoneError(isValidPhoneNumber);
  };

  const defaultPhoneValue = () => {
    const option = countries2.filter((opt) => opt.value == "Nigeria (+234)");
    return option;
  };

  const handleEmailChange = (e) => {
    // const inputValue = e.target.value;
    setEmail(e.target.value);

    // Regular expression to validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // setIsValid(emailPattern.test(inputValue));
    setEmailError(emailPattern.test(e.target.value));
  };

  const paymentSubmit = () => {
    setActivateError(true);
    // setSubmitStatus("loading");
    if (
      !fullName ||
      !address ||
      !email ||
      !phone ||
      !storageReasonOption ||
      !containerAmount ||
      !dateValue ||
      // !paymentMode ||
      !emailError
    ) {
      // setSubmitError(true);
      setSubmitStatus("error");
      // toast.error(`Please fill all fields`);
    } else {
      // toast.remove();
      // setSubmitError(false);
      setActivateError(false);
      setSubmitStatus("success");
      // setStage("payment");
      window.my_modal_64.showModal();

      // router.push({
      //   pathname: "/signup",
      //   query: { plan: `${query?.plan}`, stage: "payment" },
      // });

      // setStage("you");
    }
  };

  const paymentSubmit2 = () => {
    setActivateError(true);
    // setSubmitStatus("loading");
    if (
      !agreeTerms 
    
    ) {
      // setSubmitError(true);
      setSubmitStatus2("error");
      // toast.error(`Please fill all fields`);
    } else {
      // toast.remove();
      // setSubmitError(false);
      setActivateError2(false);
      setSubmitStatus2("loading");
      setSubmitStatus2("success");
      // setStage("payment");
      // window.my_modal_64.showModal();

      // router.push({
      //   pathname: "/signup",
      //   query: { plan: `${query?.plan}`, stage: "payment" },
      // });

      // setStage("you");
    }
  };

  useEffect(() => {
    if (query?.stage === "payment" && !containerSize) {
      router.push({
        pathname: "/storage",
        // query: { plan: `initial`, stage: "about_school" },
      });
    }
  }, []);

  console.log({
    fullName,
    email,
    address,
    addressDetails,
    phone,
    storageReasonOption,
    containerAmount,
    containerSize,
    durationCount,
    dateValue,
    date,
    date2,
    price,
  });

  return (
    <>
      <Head>
        <title>Storage - Removals and Selfstorage</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>

      <NormalLayout>
        <div className='bg-base-200 mt-[50px]  md:mt-[0px] md:pt-[70px] lg:pt-[100px]'>
          <div className='md:max-w-7xl mx-auto'>
            {/* stepper */}
            <div className='w-full flex justify-center pt-[60px] pb-[0px] '>
              <ul className='steps'>
                <li
                  className={`step step-primary px-[10px] md:px-[40px] font-bold text-[14px] md:text-[16px] leading-[20px]`}
                >
                  Storage Details
                </li>
                <li
                  className={`step ${
                    query?.stage === "payment"
                      ? "step-primary"
                      : query?.stage === "payment"
                      ? "step-primary"
                      : "text-gray-300"
                  }  font-bold text-[14px] md:text-[16px] leading-[25px] `}
                >
                  Payment
                </li>
                {/* <li
                  className={`step ${
                    query?.stage === "payment"
                      ? "step-primary"
                      : "text-gray-300"
                  }  font-bold text-[14px] md:text-[16px] leading-[25px] `}
                >
                  Payment
                </li> */}
              </ul>
            </div>

            {/* Title */}
            {/* <div className='w-full flex justify-center mt-[50px] mb-[50px] pt-[0px] pb-[0px]'>
              <h3
                className={`${titleFont.variable} font-sans2 text-3xl lg:text-4xl font-extrabold flex-col items-center justify-center`}
              >
                <p className=''>Choose your space</p>{" "}
                <div className='w-full bg-primary/20 h-[20px] mt-[-12px] '></div>
              </h3>
            </div> */}

            <div className='mt-[50px] mb-[40px]'>
              {!query?.stage && (
                <StorageSize
                  setActiveCont={setActiveCont}
                  activeCont={activeCont}
                  setDuration={setDuration}
                  setQuantity={setQuantity}
                  duration={duration}
                  quantity={quantity}
                  handleDurationChange={handleDurationChange}
                  handleDurationChange2={handleDurationChange2}
                  submitStatus={submitStatus}
                  stage={stage}
                  setStage={setStage}
                  containerSize={containerSize}
                  setContainerSize={setContainerSize}
                  price2={price}
                  setPrice={setPrice}
                  // setStage={setStage}
                />
              )}

              {query?.stage === "payment" && (
                <Payment
                  activateError={activateError}
                  activateError2={activateError2}
                  fullName={fullName}
                  setFullName={setFullName}
                  firstName={firstName}
                  setFirstName={setFirstName}
                  setLastName={setLastName}
                  lastName={lastName}
                  email={email}
                  emailError={emailError}
                  handleEmailChange={handleEmailChange}
                  phoneCodesOptionsRefactored={phoneCodesOptionsRefactored}
                  phoneCodesOptionsRefactored2={phoneCodesOptionsRefactored2}
                  defaultPhoneValue={defaultPhoneValue}
                  phone={phone}
                  setPhone={setPhone}
                  phoneError={phoneError}
                  handlePhoneNumberChange={handlePhoneNumberChange}
                  setPhoneValue={setPhoneValue}
                  stage={stage}
                  setStage={setStage}
                  address={address}
                  setAddress={setAddress}
                  addressDetails={addressDetails}
                  setAddressDetails={setAddressDetails}
                  defaultStorageReason={defaultStorageReason}
                  storageReasonOption={storageReasonOption}
                  setStorageReasonOption={setStorageReasonOption}
                  defaultContainerAmount={defaultContainerAmount}
                  containerAmount={containerAmount}
                  setContainerAmount={setContainerAmount}
                  dateValue={dateValue}
                  setDateValue={setDateValue}
                  durationCount={durationCount}
                  setDurationCount={setDurationCount}
                  weekValue={weekValue}
                  paymentSubmit={paymentSubmit}
                  paymentSubmit2={paymentSubmit2}
                  date={date}
                  date2={date2}
                  setActivateError={setActivateError}
                  setActivateError2={setActivateError2}
                  submitStatus={submitStatus}
                  setSubmitStatus={setSubmitStatus}
                  submitStatus2={submitStatus2}
                  setSubmitStatus2={setSubmitStatus2}
                  containerSize={containerSize}
                  setContainerSize={setContainerSize}
                  price={price}
                  setPrice={setPrice}
                  agreeTerms={agreeTerms}
                  setAgreeTerms={setAgreeTerms}
                  // setAddressDetails={setAddressDetails}
                />
              )}
            </div>
          </div>
        </div>
      </NormalLayout>
    </>
  );
};

export default Storage;
