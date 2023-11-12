import QuoteType from "@/components/BookingPages/QuoteType";
import BasicDatePicker from "@/components/DatePicker/DatePicker";
import SelectSearch from "@/components/Inputs/SelectSearch";
import {
  citiesOptions,
  menOptions,
  mileageOptions,
  phoneCodesOptions,
  serviceOptions,
  serviceOptions3,
} from "@/dummyData/inputData";
import BookingLayout from "@/layouts/BookingLayout";
import { titleFont } from "@/utils/fonts";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import GoogleSearchInput from "@/components/Inputs/GoogleSearchInput";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDetails,
  updateBookStage,
  updateLocationDetails,
  updateMoveDetails,
  updateMoverDetails,
  updatePersonalDetails,
} from "@/store/quoteSlice";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";
import { fetchWelcomedEmails } from "@/lib/fetchData2";
import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import {
  UploadBookingProgress,
  UploadBookingProgress1,
} from "@/lib/uploadBookingProgress";
import { generateRandomValues, generateSecureId } from "@/utils/logics";
import { addContact, welcomeEmail } from "@/lib/sendCustomEmail";
import useQuote from "@/hooks/useQuote";

const ManAndVan = ({ emails }) => {
  const {
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
  } = useQuote();

  const [floorCount, setFloorCount] = useState(
    serviceLocation?.locationFrom?.floor || 0
  );
  const [floorCount2, setFloorCount2] = useState(
    serviceLocation?.locationTo?.floor || 0
  );
  const [lift, setLift] = useState(
    serviceLocation?.locationFrom?.liftAvailable || false
  );
  const [lift2, setLift2] = useState(
    serviceLocation?.locationTo?.liftAvailable || false
  );
  const [durationCount, setDurationCount] = useState(
    moveDetails?.duration || 3
  );
  const [address, setAddress] = useState("");
  const [addressDetails, setAddressDetails] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressDetails2, setAddressDetails2] = useState("");
  const [propertyValue, setPropertyValue] = useState(
    moveDetails?.propertyType || ""
  );
  const [phoneValue, setPhoneValue] = useState(
    personalDetails?.countryCode || ""
  );
  const [menValue, setMenValue] = useState(moveDetails?.numberOfMovers || "");
  const [agreeTermsValue, setAgreeTermsValue] = useState(false);
  const [mileageValue, setMileageValue] = useState(moveDetails?.mileage || "");
  const [dateValue, setDateValue] = useState(
    dayjs(`'${moveDetails?.moveDate}'`)
  );
  const [firstName, setFirstName] = useState(personalDetails?.firstName || "");
  const [lastName, setLastName] = useState(personalDetails?.lastName || "");
  const [email, setEmail] = useState(personalDetails?.email || "");
  const [emailError, setEmailError] = useState(true);
  const [volume, setVolume] = useState(moveDetails?.volume || "");
  const [phone, setPhone] = useState(personalDetails?.telephone || "");
  const [phoneError, setPhoneError] = useState(true);
  const [submitError, setSubmitError] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [activateError, setActivateError] = useState(false);
  const [usedEmails, setUsedEmails] = useState([]);

  const hourValue = durationCount <= 1 ? "hour" : "hours";

  const durationCalculation = (duration) => {
    let price = 1;
    const newPrice = price * duration;
    return newPrice;
  };

  //   Email validation
  const handleEmailChange = (e) => {
    // const inputValue = e.target.value;
    setEmail(e.target.value);

    // Regular expression to validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // setIsValid(emailPattern.test(inputValue));
    setEmailError(emailPattern.test(e.target.value));
  };

  //phone number validation
  const handlePhoneNumberChange = (event) => {
    const inputValue = event.target.value;

    // Remove any non-digit characters from the input
    const strippedNumber = inputValue.replace(/\D/g, "");

    // Check if the stripped number is either 10 or 11 digits long
    // const isValidPhoneNumber =
    //   strippedNumber.length === 10 || strippedNumber.length === 11;
    const isValidPhoneNumber = strippedNumber.length > 5;

    setPhone(strippedNumber);
    setPhoneError(isValidPhoneNumber);
  };

  //Date
  const date = dayjs(dateValue).format("YYYY/MM/DD");
  const date2 = dayjs(dateValue).format("dddd, MMMM D, YYYY");

  const selectDefaultValue = () => {
    const option = serviceOptions3.filter(
      (opt) => opt.value == moveDetails?.propertyType
    );
    return option;
  };

  const defaultMenValue = () => {
    const option = menOptions.filter(
      (opt) => opt.value == moveDetails?.numberOfMovers
    );
    return option;
  };
  const defaultMileageValue = () => {
    const option = mileageOptions.filter(
      (opt) => opt.value == moveDetails?.mileage
    );
    return option;
  };

  const defaultPhoneValue = () => {
    const option = phoneCodesOptions.filter(
      (opt) =>
        opt.value == "United Kingdom (+44)" || personalDetails?.countryCode
    );
    return option;
  };

  const checkPropertyType = () => {
    switch (propertyValue) {
      case "Man and van":
        return true;
        break;
      case "Office removals":
        return true;
        break;
      case "Studio flat":
        return true;
        break;
      case "Furniture & Appliances":
        return true;
        break;
      case "1 Bed property":
        return false;
        break;
      case "2 Bed property":
        return false;
        break;
      case "3 Bed property":
        return false;
        break;
      case "4 Bed property":
        return false;
        break;

      default:
        break;
    }
  };

  const templateParams = {
    firstName,
    lastName,
    email,
  };

  const params = {
    firstName,
    lastName,
    email,
  };

  const sendWelcomeMail = async () => {
    if (!usedEmails.includes(email)) {
      await welcomeEmail(email, params);

      const emailRef = collection(db, "welcomedEmails");

      try {
        await addDoc(emailRef, {
          email,
        });
      } catch (error) {
        return false;
      }
    }
  };

  const contactData = {
    email,
    firstName,
    lastName,
    phone: phone.toString(),
    phoneValue,
  };

  useEffect(() => {
    const newEmails = [];
    emails.forEach((em) => {
      newEmails.push(em.email);
    });
    setUsedEmails(newEmails);
  }, []);

  const FormSubmit = async () => {
    setActivateError(true);
    setSubmitError(false);
    if (
      propertyValue == "" ||
      propertyValue == "Select" ||
      !address ||
      !address2 ||
      !firstName ||
      !lastName ||
      !email ||
      !emailError ||
      !phoneError ||
      !phone ||
      !menValue ||
      menValue == "Select" ||
      !durationCount ||
      !volume ||
      (!checkPropertyType() && !mileageValue) ||
      (!checkPropertyType() && mileageValue == "Select") ||
      date == "Invalid Date" ||
      !agreeTermsValue
    ) {
      setSubmitError(true);
      // toast.error(`Please fill all mandatory fields`, {
      //   duration: 2000,
      //   position: "top-center",
      // });
    } else {
      // toast.remove();
      setSubmitLoading(true);

      sendWelcomeMail();

      await addContact(contactData);

      let bookingId = moveDetails?.bookingId;
      let quoteRef = moveDetails?.quoteRef;

      if (moveDetails?.bookingId === "") {
        bookingId = generateSecureId();
        quoteRef = generateRandomValues();
      }

      updateBookS("book/man-van");

      updateLocationFrom({
        name: address,
        postCode: addressDetails
          ? addressDetails.zip
          : serviceLocation?.locationFrom?.postCode,
        city: addressDetails
          ? addressDetails.city
          : serviceLocation?.locationFrom?.city,
        country: addressDetails
          ? addressDetails.country
          : serviceLocation?.locationFrom?.country,
        floor: floorCount,
        liftAvailable: lift,
      });
      updateLocationTo({
        name: address2,
        postCode: addressDetails2
          ? addressDetails2.zip
          : serviceLocation?.locationTo?.postCode,
        city: addressDetails2
          ? addressDetails2.city
          : serviceLocation?.locationTo?.city,
        country: addressDetails2
          ? addressDetails2.country
          : serviceLocation?.locationTo?.country,
        floor: floorCount2,
        liftAvailable: lift2,
      }),
        updatePersonal({
          firstName,
          lastName,
          email,
          countryCode: phoneValue,
          telephone: phone,
        });
      updateMove({
        bookingId,
        quoteType: "online",
        propertyType: propertyValue,
        numberOfMovers: menValue,
        mileage: mileageValue,
        volume: volume,
        duration: durationCount,
        moveDate: date,
        moveDateRaw: dateValue,
        quoteRef,
        initialPackagePrice: durationCalculation(durationCount),
      });

      const moveObj = {
        serviceLocation: {
          locationFrom: {
            name: address,
            postCode: addressDetails.zip || "",
            city: addressDetails.city || "",
            country: addressDetails.country || "",
            floor: floorCount,
            liftAvailable: lift,
          },
          locationTo: {
            name: address2,
            postCode: addressDetails2.zip || "",
            city: addressDetails2.city || "",
            country: addressDetails2.country || "",
            floor: floorCount2,
            liftAvailable: lift2,
          },
        },
        personalDetails: {
          firstName,
          lastName,
          email,
          countryCode: phoneValue || personalDetails?.countryCode,
          telephone: phone,
        },
        moveDetails: {
          bookingId,
          propertyType: propertyValue,
          numberOfMovers: menValue,
          mileage: mileageValue,
          volume: volume,
          duration: durationCount,
          moveDate: date,
          // moveDateRaw: dateValue || "",
          movePackage: moveDetails?.movePackage,
          quoteRef,
          initialPackagePrice: moveDetails?.initialPackagePrice,
        },
        stage: "book/man-and-van",
        activity: "Submitted move details in man and van page",
      };
      const result = await UploadBookingProgress1(moveObj);

      console.log({ bookingprogressupload: result ? "successful" : "failed" });

      router.push("/book/move-package");
    }
  };

  return (
    <BookingLayout>
      <Head>
        <title>Man & Van - Removal and Self Storage</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <main>
        <div className="mb-[70px] lg:mb-[100px] pt-[70px]">
          <div className="md:max-w-7xl mx-auto">
            {/* Title */}
            {/* <div className="w-full flex justify-center py-[30px] md:py-[40px]">
              <h3
                className={`${titleFont.variable} font-sans2 text-3xl lg:text-4xl font-extrabold flex-col items-center justify-center`}
              >
                <p className="">Your Move Details</p>{" "}
                <div className="w-full bg-primary/20 h-[20px] mt-[-12px] "></div>
              </h3>
            </div> */}
            {/* stepper */}
            <div className="w-full flex justify-center mt-[20px] mb-[50px]">
              <ul className="steps">
                <li className="step step-primary px-[10px] md:px-[40px] font-bold text-[14px] md:text-[16px] leading-[20px]">
                  Move Details
                </li>
                <li className="step  font-bold text-[14px] md:text-[16px] leading-[25px] text-gray-300">
                  Move Package
                </li>
                <li className="step  font-bold text-[14px] md:text-[16px] leading-[25px] text-gray-300">
                  Choose Mover
                </li>
                <li className="step  font-bold text-[14px] md:text-[16px] leading-[25px] text-gray-300">
                  Checkout
                </li>
              </ul>
            </div>

            {/* form */}
            <div className="flex flex-col  px-[20px] lg:px-[100px] py-[30px] bg-white rounded-[20px] mx-[10px] md:mx-[100px]">
              {/* mandatory text */}
              <div className="flex justify-center text-secondary mb-[10px] md:mb-[20px] text-[14px] md:text-[16px]">
                <p className="">Fields marked with * are mandatory</p>
              </div>
              <div className="flex flex-col space-y-[20px]">
                {/* row 1 */}
                <div className="flex flex-col items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[50px]">
                  {/* left */}
                  <div className="flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center">
                    {/* location from */}
                    <div className="form-control w-full ">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Location FROM<span className="text-secondary">*</span>
                        </span>
                      </label>
                      <GoogleSearchInput
                        styles="py-[10px] px-[10px]"
                        setAddress={setAddress}
                        addressDetails={addressDetails}
                        setAddressDetails={setAddressDetails}
                        placeholder="Search location..."
                        defaultValue={serviceLocation?.locationFrom.name}
                        errorCheck={activateError && !address}
                      />
                    </div>
                  </div>

                  {/* right */}
                  <div className="flex flex-col space-y-[5px] md:flex-row flex-[1] md:space-x-[20px] w-full">
                    {/* floor */}
                    <div className="flex flex-col w-full flex-[1] ">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Floor<span className="text-secondary">*</span>
                        </span>
                      </label>
                      <div className="flex items-center space-x-[5px]">
                        <div
                          onClick={() =>
                            floorCount >= 0 && setFloorCount((prev) => prev - 1)
                          }
                          className="flex justify-center items-center btn btn-primary w-[50px] p-[5px] h-[50px] rounded-[5px]"
                        >
                          <AiOutlineMinus className="text-white font-bold text-[18px]" />
                        </div>
                        <div
                          className={`${
                            // activateError && !floorCount
                            //   ? 'flex justify-center items-center ring ring-secondary h-[50px] rounded-[10px] w-[60px]'
                            //   : 'flex justify-center items-center h-[50px] rounded-[10px] w-[60px] border border-primary font-semibold'
                            "flex justify-center items-center h-[50px] rounded-[10px] w-[60px] border border-primary font-semibold"
                          }`}
                        >
                          {floorCount}
                        </div>
                        <div
                          onClick={() => setFloorCount((prev) => prev + 1)}
                          className="flex justify-center items-center btn btn-primary w-[50px] p-[5px] h-[50px] rounded-[5px]"
                        >
                          <AiOutlinePlus className="text-white font-bold text-[18px]" />
                        </div>
                      </div>
                    </div>
                    {/* lift */}
                    {floorCount != 0 && (
                      <div className="flex flex-col w-full flex-[2] ">
                        <label className="label">
                          <span className="label-text font-semibold">
                            Lift Available
                          </span>
                        </label>
                        <label className="flex items-center cursor-pointer space-x-[10px]">
                          <input
                            type="checkbox"
                            //   checked="checked"
                            className="checkbox checkbox-primary"
                            onChange={(e) => setLift(e.target.checked)}
                            checked={lift}
                          />
                          <span className="leading-[20px] text-[13px] text-gray-400 md:text-[14px]">
                            Check if available
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* row 2 */}
                <div className="flex flex-col items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[50px]">
                  {/* left */}
                  <div className="flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center">
                    {/* location from */}
                    <div className="form-control w-full ">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Location TO<span className="text-secondary">*</span>
                        </span>
                      </label>
                      <GoogleSearchInput
                        styles="py-[10px] px-[10px]"
                        setAddress={setAddress2}
                        addressDetails={addressDetails2}
                        setAddressDetails={setAddressDetails2}
                        placeholder="Search location..."
                        defaultValue={serviceLocation?.locationTo?.name}
                        errorCheck={activateError && !address2}
                      />
                    </div>
                  </div>

                  {/* right */}
                  <div className="flex flex-col space-y-[5px] md:flex-row flex-[1] md:space-x-[20px] w-full">
                    {/* floor */}
                    <div className="flex flex-col w-full flex-[1] ">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Floor<span className="text-secondary">*</span>
                        </span>
                      </label>
                      <div className="flex items-center space-x-[5px]">
                        <div
                          onClick={() =>
                            floorCount2 >= 0 &&
                            setFloorCount2((prev) => prev - 1)
                          }
                          className="flex justify-center items-center btn btn-primary w-[50px] p-[5px] h-[50px] rounded-[5px]"
                        >
                          <AiOutlineMinus className="text-white font-bold text-[18px]" />
                        </div>
                        <div
                          className={`${
                            // activateError && !floorCount2
                            //   ? 'flex justify-center items-center ring ring-secondary h-[50px] rounded-[10px] w-[60px]'
                            //   : 'flex justify-center items-center h-[50px] rounded-[10px] w-[60px] border border-primary font-semibold'
                            "flex justify-center items-center h-[50px] rounded-[10px] w-[60px] border border-primary font-semibold"
                          }`}
                        >
                          {floorCount2}
                        </div>
                        <div
                          onClick={() => setFloorCount2((prev) => prev + 1)}
                          className="flex justify-center items-center btn btn-primary w-[50px] p-[5px] h-[50px] rounded-[5px]"
                        >
                          <AiOutlinePlus className="text-white font-bold text-[18px]" />
                        </div>
                      </div>
                    </div>
                    {/* lift */}
                    {floorCount2 != 0 && (
                      <div className="flex flex-col w-full flex-[2] ">
                        <label className="label">
                          <span className="label-text font-semibold">
                            Lift Available
                          </span>
                        </label>
                        <label className="flex items-center cursor-pointer space-x-[10px]">
                          <input
                            type="checkbox"
                            //   checked="checked"
                            className="checkbox checkbox-primary"
                            onChange={(e) => setLift2(e.target.checked)}
                            checked={lift2}
                          />
                          <span className="leading-[20px] text-[13px] text-gray-400 md:text-[14px]">
                            Check if available
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                {/* row 3 */}
                <div className="flex flex-col items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[50px]">
                  {/* left */}
                  <div className="flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[30px] space-y-[10px] md:space-y-0 md:justify-center">
                    {/* first name */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">
                          First Name<span className="text-secondary">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="First name"
                        className={`${
                          activateError && !firstName
                            ? "ring ring-secondary"
                            : ""
                        } input input-primary w-full h-[43px]`}
                        onChange={(e) => setFirstName(e.target.value)}
                        defaultValue={firstName}
                      />
                    </div>
                  </div>
                  {/* right */}
                  <div className="flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center">
                    {/* last name */}
                    <div className="form-control w-full ">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Last Name<span className="text-secondary">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Last name"
                        className={`${
                          activateError && !lastName
                            ? "ring ring-secondary"
                            : ""
                        } input input-primary w-full h-[43px]`}
                        onChange={(e) => setLastName(e.target.value)}
                        defaultValue={lastName}
                      />
                    </div>
                  </div>
                </div>

                {/* row 4*/}
                <div className="flex flex-col items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[50px]">
                  {/* left */}
                  <div className="flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center">
                    {/* email */}
                    <div className="form-control w-full ">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Email<span className="text-secondary">*</span>
                        </span>
                      </label>
                      <input
                        type="email"
                        placeholder="Email address"
                        className={`${
                          activateError && !email ? "ring ring-secondary" : ""
                        } input input-primary w-full h-[43px]`}
                        onChange={handleEmailChange}
                        //
                        defaultValue={email}
                      />
                      {!emailError && (
                        <p className="text-[14px] text-secondary mt-[5px]">
                          Please enter a valid email
                        </p>
                      )}
                    </div>
                  </div>

                  {/* right */}
                  <div className="flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[30px] space-y-[10px] md:space-y-0 md:justify-center">
                    {/* country code */}
                    <div className="flex flex-col w-full flex-[1]">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Country Code<span className="text-secondary">*</span>
                        </span>
                      </label>
                      <SelectSearch
                        placeholder="Select"
                        options={phoneCodesOptions}
                        isSearchable={true}
                        name="service2"
                        // defaultValue={serviceOptions[2]}
                        defaultValue={defaultPhoneValue()}
                        setValue={setPhoneValue}
                        // errorCheck={activateError && !phoneValue}
                      />
                    </div>
                    {/* Telephone* */}
                    <div className="form-control w-full flex-[1]">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Telephone<span className="text-secondary">*</span>
                        </span>
                      </label>
                      <input
                        type="tel"
                        placeholder="Telephone number"
                        className={`${
                          activateError && (!phone || !phoneError)
                            ? "ring ring-secondary"
                            : ""
                        } input input-primary w-full h-[43px]`}
                        onChange={handlePhoneNumberChange}
                        defaultValue={phone}
                      />
                    </div>
                  </div>
                </div>

                {/* row 5 */}
                <div className="flex flex-col items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[50px]">
                  {/* left */}
                  <div className="flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center">
                    {/* property type */}
                    <div className="flex flex-col w-full">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Property Type<span className="text-secondary">*</span>
                        </span>
                      </label>
                      <div className="w-full">
                        <SelectSearch
                          placeholder="Select"
                          options={serviceOptions3}
                          isSearchable={false}
                          //   name="service2"
                          // defaultValue={serviceOptions[2]}
                          defaultValue={
                            selectDefaultValue() || serviceOptions3[0]
                          }
                          setValue={setPropertyValue}
                          errorCheck={
                            activateError &&
                            (propertyValue == "Select" || propertyValue == "")
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex-[1] w-full flex flex-col md:flex-row md:items-center md:space-x-[20px] space-y-[10px] md:space-y-0">
                    {/* movers */}
                    <div className="flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[30px] space-y-[10px] md:space-y-0 md:justify-center">
                      {/* Number of movers */}
                      <div className="form-control w-full ">
                        <label className="label">
                          <span className="label-text font-semibold">
                            Number of Movers
                            <span className="text-secondary">*</span>
                          </span>
                        </label>
                        <div className="w-full">
                          <SelectSearch
                            placeholder="Select"
                            options={menOptions}
                            isSearchable={false}
                            //   name="service3"
                            defaultValue={defaultMenValue() || menOptions[0]}
                            //   defaultValue={menOptions[0]}
                            setValue={setMenValue}
                            errorCheck={
                              activateError &&
                              (menValue == "Select" || menValue == "")
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* mileage */}
                    <div className="flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[30px] space-y-[10px] md:space-y-0 md:justify-center">
                      {/* mileage */}
                      <div className="form-control w-full ">
                        <label className="label">
                          <span className="label-text font-semibold">
                            Mileage
                            {!checkPropertyType() && (
                              <span className="text-secondary">*</span>
                            )}
                          </span>
                        </label>
                        <div className="w-full">
                          <SelectSearch
                            placeholder="Select"
                            options={mileageOptions}
                            isSearchable={false}
                            //   name="service3"
                            // defaultValue={serviceOptions[2]}
                            defaultValue={
                              defaultMileageValue() || mileageOptions[0]
                            }
                            setValue={setMileageValue}
                            errorCheck={
                              activateError && !checkPropertyType() &&
                              (mileageValue == "Select" || mileageValue == "")
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* row 6 */}
                <div className="flex flex-col  justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-start lg:space-x-[50px]">
                  {/* left */}
                  <div className="flex flex-[1]">
                    {/* duration */}
                    <div className="flex flex-col w-full">
                      <div className="flex flex-col w-full">
                        <label className="label">
                          <span className="label-text font-semibold">
                            Duration<span className="text-secondary">*</span>
                          </span>
                        </label>
                        <div className="flex items-center space-x-[5px]">
                          <div
                            onClick={() =>
                              durationCount > 3 &&
                              setDurationCount((prev) => prev - 1)
                            }
                            className="flex justify-center items-center btn btn-primary w-[45px] p-[5px] h-[45px] rounded-[5px]"
                          >
                            <AiOutlineMinus className="text-white font-bold text-[18px]" />
                          </div>
                          <div
                            className={`${
                              activateError && !durationCount
                                ? "flex justify-center items-center h-[48px] rounded-[10px] w-full border border-primary font-semibold ring ring-secondary"
                                : "flex justify-center items-center h-[48px] rounded-[10px] w-full border border-primary font-semibold"
                            }`}
                          >
                            {durationCount} {hourValue}
                          </div>
                          <div
                            onClick={() => setDurationCount((prev) => prev + 1)}
                            className="flex justify-center items-center btn btn-primary w-[45px] p-[5px] h-[45px] rounded-[5px]"
                          >
                            <AiOutlinePlus className="text-white font-bold text-[18px]" />
                          </div>
                        </div>
                      </div>
                      <p className="mt-[5px] text-[15px]">
                        Minimum of 3 hours hire
                      </p>
                    </div>
                  </div>
                  {/* right */}
                  <div className="flex flex-[1] space-x-[20px]">
                    <div className="flex flex-[1]">
                      {/* volume */}
                      <div className="flex flex-col w-full">
                        <label className="label">
                          <span className="label-text font-semibold">
                            Volume: CU/FT
                            <span className="text-secondary">*</span>
                          </span>
                        </label>
                        <input
                          type="number"
                          min="10"
                          step="5"
                          placeholder="Volume"
                          className={`${
                            activateError && !volume
                              ? "ring ring-secondary"
                              : ""
                          } input input-primary w-full h-[43px]`}
                          onChange={(e) => setVolume(e.target.value)}
                          defaultValue={volume}
                        />
                      </div>
                    </div>
                    <div className="flex flex-[1]">
                      {/* move date*/}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold">
                            Move Date<span className="text-secondary">*</span>
                          </span>
                        </label>
                        <button
                          className={`${
                            activateError && date == "Invalid Date"
                              ? "ring ring-secondary"
                              : ""
                          } flex justify-center items-center bg-white border-[1.4px] rounded-[8px] border-primary cursor-pointer overflow-hidden py-[4px] focus:ring-[2px] active:ring-[2px] ring-primary`}
                        >
                          <div className="opacity-[0.9] mt-[-10px] cursor-pointer">
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
              </div>
              {/* agree to terms */}
              <div className="flex justify-center  mt-[30px] mb-[10px] md:mb-[20px] w-full">
                <div className="form-control ">
                  <label className="label cursor-pointer flex justify-center space-x-[20px] w-full">
                    <input
                      type="checkbox"
                      //   checked="checked"
                      className={`${
                        activateError && !agreeTermsValue
                          ? "ring ring-secondary"
                          : ""
                      } checkbox checkbox-primary`}
                      onChange={(e) => setAgreeTermsValue(e.target.checked)}
                    />
                    <span className="leading-[20px] text-[14px] md:text-[16px]">
                      I agree to the terms and conditions outlined in the
                      privacy policy
                    </span>
                  </label>
                </div>
              </div>
              {/* submit button */}
              <div className=" mt-6 w-full flex justify-center">
                <div className="flex flex-col items-center justify-center">
                  <button
                    onClick={FormSubmit}
                    disabled={submitLoading}
                    className="btn btn-primary btn-wide flex items-center space-x-[5px] h-[60px]"
                  >
                    {!submitLoading && <span className="">Get Prices</span>}
                    {submitLoading && (
                      <span className="loading loading-spinner loading-md text-white"></span>
                    )}
                    {!submitLoading && (
                      <span className="">
                        <FiEdit className="text-[20px]" />
                      </span>
                    )}
                  </button>
                  {submitError && (
                    <div className="text-[14px] mt-[15px] text-secondary bg-secondary/20 rounded-[10px] py-[10px] px-[30px]">
                      Please fill all mandatory fields
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </BookingLayout>
  );
};

export default ManAndVan;

export async function getServerSideProps() {
  const emails = await fetchWelcomedEmails();

  return {
    props: {
      emails,
    },
  };
}
