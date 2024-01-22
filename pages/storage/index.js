import NormalLayout from "@/layouts/NormalLayout";
import React, { useEffect, useMemo, useState } from "react";
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
import {
  generateSecureId,
  generateStorageRef,
  getCurrentDateFormatted,
} from "@/utils/logics";
import Success from "@/components/Storage/Success";
import Error from "@/components/Storage/Error";
import { storageCheckout } from "@/lib/moveCheckout";
import { db } from "@/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import useLocalStorage from "use-local-storage";

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
  const [durationCount, setDurationCount] = useState(8);
  const [discount, setDiscount] = useState(0);
  const [formattedDate, setFormattedDate] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [bookId] = useState(() => generateSecureId());
  const [bookRef] = useState(() => generateStorageRef());

  const router = useRouter();

  const { query } = router;

  //Date
  const date = dayjs(dateValue).format("YYYY/MM/DD");

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

  const computeProductId = () => {
    switch (containerSize) {
      case "25 Square Feet Storage":
        // return "prod_POJqc7exePO3ov";
        return "prod_PPEXkAPzo4aon9";
        break;

      case "50 Square Feet Storage":
        // return "prod_POJwId6MTNOcsg";
        return "prod_PPEYubd1DZePlz";
        break;

      case "75 Square Feet Storage":
        // return "prod_POJx0rcCppy8mC";
        return "prod_PPEZ8oZ4FXoS19";
        break;

      case "100 Square Feet Storage":
        // return "prod_POJyqZzB3llWri";
        return "prod_PPEcR9uRhSY8AZ";
        break;

      case "150 Square Feet Storage":
        // return "prod_POJzK1JPh9PS4g";
        return "prod_PPEcD4MfsxmEpZ";
        break;

      case "200 Square Feet Storage":
        // return "prod_POK0eIvVFqoC28";
        return "prod_PPEd8yLodqwtdG";
        break;

      case "250 Square Feet Storage":
        // return "prod_POK0n8o1WtvakQ";
        return "prod_PPEdaSfhfv0N0C";
        break;

      case "300 Square Feet Storage":
        // return "prod_POK1U1kJnRSG1t";
        return "prod_PPEdR263qeMF3t";
        break;

      default:
        break;
    }
  };

  function calculateStoragePrice() {
    const initialRate = discount;
    const standardRate = price;
    const discountedWeeks = 8;

    if (durationCount <= discountedWeeks) {
      return durationCount * initialRate;
    } else {
      const discountedPrice = discountedWeeks * initialRate;
      const remainingWeeks = durationCount - discountedWeeks;
      const standardPrice = remainingWeeks * standardRate;
      return (discountedPrice + standardPrice) * Number(containerAmount);
    }
  }

  function calInitialDeposit() {
    const initialRate = discount;
    const standardRate = price;
    const discountedWeeks = 8;

    if (durationCount <= discountedWeeks) {
      return durationCount * initialRate;
    } else {
      const discountedPrice = discountedWeeks * initialRate;
    
      return discountedPrice * Number(containerAmount);
    }
  }

  const totalPrice = calculateStoragePrice();
  const initialPrice = calInitialDeposit();

  // const totalPrice = price * durationCount * Number(containerAmount);

  const stripeProductId = computeProductId();
  const stripeAmount = parseInt((initialPrice).toFixed(2) * 100);

  console.log({
    stripeProductId,
    stripeAmount,
    price,
    // price: paymentDetails?.paidPrice,
  });

  const storageRef = doc(db, "storageData", bookId);

  const [storageId, setStorageId] = useLocalStorage("name", "");

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

  const paymentSubmit2 = async () => {
    setActivateError(true);
    // setSubmitStatus("loading");
    if (!agreeTerms) {
      // setSubmitError(true);
      setSubmitStatus2("error");
      // toast.error(`Please fill all fields`);
    } else {
      // toast.remove();
      // setSubmitError(false);
      setActivateError2(false);
      setSubmitStatus2("loading");

      setStorageId(bookId);

      try {
        await setDoc(
          storageRef,

          {
            date: getCurrentDateFormatted(),
            fullName,
            email,
            phone,
            address,
            city: addressDetails?.city,
            state: addressDetails?.state,
            country: addressDetails?.country,
            zip: addressDetails?.zip,
            storageReasonOption,
            containerAmount,
            containerSize,
            containerPrice: price,
            totalPrice,
            discount,
            paidPrice: (initialPrice).toFixed(2),
            durationCount,
            date,
            date2,
            bookId,
            bookRef,
            agreeTerms,
          },
          { merge: true }
        );

        // window.my_modal_13.showModal();
        // return true;
        console.log("storage update was successful @ checkout");
      } catch (error) {
        console.log(error);
        // return false;
        console.log("storage update was unsuccessful @ checkout");
      }

      await storageCheckout(stripeProductId, stripeAmount);

      // setSubmitStatus2("success");

      // router.push({
      //   pathname: "/storage",
      //   query: { status: `success`, host: `${bookId}` },
      // });

      // setStage("payment");
      // window.my_modal_64.showModal();

      // router.push({
      //   pathname: "/signup",
      //   query: { plan: `${query?.plan}`, stage: "payment" },
      // });

      // setStage("you");
    }
  };

  // const bookId = generateSecureId();
  // useMemo(() => first, [second])

  // const bookRef = generateStorageRef();

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
    bookId,
    bookRef,
    agreeTerms,
    discount,
    totalPrice,
    // date: getCurrentDateFormatted(),
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
            {!query?.status && (
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
            )}

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
              {!query?.stage && !query?.status && (
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
                  discount={discount}
                  setDiscount={setDiscount}
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
                  bookId={bookId}
                  bookRef={bookRef}
                  discount={discount}
                  setDiscount={setDiscount}
                  totalPrice={totalPrice}
                  initialPrice={initialPrice}
                  // setAddressDetails={setAddressDetails}
                />
              )}

              {query?.status?.includes("success") && <Success />}
              {query?.status?.includes("error") && <Error />}
            </div>
          </div>
        </div>
      </NormalLayout>
    </>
  );
};

export default Storage;
