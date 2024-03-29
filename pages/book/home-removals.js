import BasicDatePicker from "@/components/DatePicker/DatePicker";
import SelectSearch from "@/components/Inputs/SelectSearch";
import {
  citiesOptions,
  menOptions,
  mileageOptions,
  phoneCodesOptions,
  serviceOptions,
  serviceOptions2,
} from "@/dummyData/inputData";
import BookingLayout from "@/layouts/BookingLayout";
import { titleFont } from "@/utils/fonts";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import GoogleSearchInput from "@/components/Inputs/GoogleSearchInput";
import { useDispatch, useSelector } from "react-redux";
import DatePicker2 from "@/components/DatePicker/DatePicker2";
import dayjs from "dayjs";
import { fetchWelcomedEmails } from "@/lib/fetchData2";
import { db } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  UploadBookingProgress,
  UploadBookingProgress1,
} from "@/lib/uploadBookingProgress";
import {
  generateRandomValues,
  generateSecureId,
  getCurrentDateFormatted,
} from "@/utils/logics";
import {
  addContact,
  sendCustomEmail,
  welcomeEmail,
} from "@/lib/sendCustomEmail";
import useQuote from "@/hooks/useQuote";

const CompleteHouse = ({ emails }) => {
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

  //   states
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
  const [address, setAddress] = useState(
    serviceLocation?.locationFrom?.name || ""
  );
  const [addressDetails, setAddressDetails] = useState(
    serviceLocation?.locationFrom || {}
  );
  const [address2, setAddress2] = useState(
    serviceLocation?.locationTo?.name || ""
  );
  const [addressDetails2, setAddressDetails2] = useState(
    serviceLocation?.locationTo || {}
  );
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

  const [zap1, setZap1] = useState(
    serviceLocation?.locationFrom?.postCode || ""
  );
  const [zap2, setZap2] = useState(serviceLocation?.locationTo?.postCode || "");

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
    const isValidPhoneNumber =
      // strippedNumber.length === 5 || strippedNumber.length === 11;
      strippedNumber.length > 5;

    setPhone(strippedNumber);
    setPhoneError(isValidPhoneNumber);
  };

  //Date
  const date = dayjs(dateValue).format("YYYY/MM/DD");
  const date2 = dayjs(dateValue).format("dddd, MMMM D, YYYY");

  const selectDefaultValue = () => {
    const option = serviceOptions2.filter(
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
        opt.value == (personalDetails?.countryCode || "United Kingdom (+44)")
    );
    return option;
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

  const removalFormSubmit = async () => {
    setActivateError(true);
    setSubmitError(false);

    if (
      !propertyValue ||
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
      !volume ||
      !mileageValue ||
      mileageValue == "Select" ||
      date == "Invalid Date" ||
      !agreeTermsValue
    ) {
      setSubmitError(true);
    } else {
      setSubmitLoading(true);

      sendWelcomeMail();

      await addContact(contactData);

      let bookingId = moveDetails?.bookingId;
      let quoteRef = moveDetails?.quoteRef;

      if (moveDetails.bookingId === "") {
        bookingId = generateSecureId();
        quoteRef = generateRandomValues();
      }

      updateBookS("book/home-removals");

      updateLocationFrom({
        name: address,
        postCode: zap1,
        city: addressDetails?.city,
        state: addressDetails?.state,
        country: addressDetails?.country,
        floor: floorCount,
        liftAvailable: lift,
      });
      updateLocationTo({
        name: address2,
        postCode: zap2,
        city: addressDetails2.city,
        state: addressDetails2.state,
        country: addressDetails2.country,
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
        moveDate: date,
        moveDateRaw: dateValue,
        quoteRef,
      });

     

      const bookingRef = doc(db, "bookingData", bookingId);

      // const currentDate = new Date();
      // const result = await UploadBookingProgress1(moveObj);

      try {
        await setDoc(
          bookingRef,

          {
            date: getCurrentDateFormatted(),
            address1: address,
            postCode1: zap1,
            city1: addressDetails?.city || "",
            state1: addressDetails?.state || "",
            country1: addressDetails?.country || "",
            floor1: floorCount,
            liftAvailable1: lift,
            address2: address2,
            postCode2: zap2,
            city2: addressDetails2?.city || "",
            state2: addressDetails2?.state || "",
            country2: addressDetails2?.country || "",
            floor2: floorCount2,
            liftAvailable2: lift2,
            firstName,
            lastName,
            email,
            countryCode: phoneValue || personalDetails?.countryCode,
            telephone: phone,
            propertyType: propertyValue,
            numberOfMovers: menValue,
            mileage: mileageValue,
            volume,
            duration: moveDetails?.duration || "",
            moveDate: date,
            // moveDateRaw,
            stage: "book/home-removals",
            activity: [
              {
                name: "Submitted move details in home removals page",
                date: getCurrentDateFormatted(),
              },
            ],
            bookingId,
            quoteRef,
            quoteType: "online",
            // createdAt: serverTimestamp(),
          },
          { merge: true }
        );

        console.log("user details update was successful @ home-removals");
      } catch (error) {
        console.log(error);
        // return false;
        console.log("user details update was unsuccessful @ home-removals");
      }

      // console.log({ bookingprogressupload: result ? "successful" : "failed" });

      router.push("/book/move-package");
    }
  };

  useEffect(() => {
    setZap1(serviceLocation?.locationFrom?.postCode);
    setZap2(serviceLocation?.locationTo?.postCode);
  }, [zap1, zap2]);

  useEffect(() => {
    setZap1(addressDetails.zip);
    setZap2(addressDetails2.zip);
  }, [addressDetails, addressDetails2]);

  // console.log({ addressDetails });
  console.log({ zap1, zap2, serviceLocation, addressDetails, addressDetails2 });

  return (
    <BookingLayout>
      <Head>
        <title>House Removals - Removal and Self Storage</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>

      <main>
        <div className='mb-[70px] lg:mb-[100px] pt-[70px]'>
          <div className='md:max-w-7xl mx-auto'>
            {/* stepper */}
            <div className='w-full flex justify-center mt-[20px] mb-[50px]'>
              <ul className='steps'>
                <li className='step step-primary px-[10px] md:px-[40px] font-bold text-[14px] md:text-[16px] leading-[20px]'>
                  Move Details
                </li>
                <li className='step  font-bold text-[14px] md:text-[16px] leading-[25px] text-gray-300'>
                  Move Package
                </li>
                <li className='step  font-bold text-[14px] md:text-[16px] leading-[25px] text-gray-300'>
                  Choose Mover
                </li>
                <li className='step  font-bold text-[14px] md:text-[16px] leading-[25px] text-gray-300'>
                  Checkout
                </li>
              </ul>
            </div>

            {/* <div className="">{session?.data?.user?.email}</div>
            <button onClick={() => signOut()}>Logout</button> */}

            {/* form */}
            <div className='flex flex-col  px-[20px] lg:px-[100px] py-[30px] bg-white rounded-[20px] mx-[10px] md:mx-[100px]'>
              {/* mandatory text */}
              <div className='flex justify-center text-secondary mb-[10px] md:mb-[20px] text-[14px] md:text-[16px]'>
                <p className=''>Fields marked with * are mandatory</p>
              </div>
              <div className='flex flex-col space-y-[20px]'>
                {/* row 1 */}
                <div className='flex flex-col items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[50px]'>
                  {/* left */}
                  <div className='flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center'>
                    {/* location from */}
                    <div className='form-control w-full '>
                      <label className='label'>
                        <span className='label-text font-semibold'>
                          Location FROM<span className='text-secondary'>*</span>
                        </span>
                      </label>
                      <GoogleSearchInput
                        styles='py-[10px] px-[10px]'
                        setAddress={setAddress}
                        addressDetails={addressDetails}
                        setAddressDetails={setAddressDetails}
                        placeholder='Search location...'
                        defaultValue={serviceLocation?.locationFrom.name}
                        errorCheck={activateError && !address}
                      />
                    </div>
                  </div>

                  {/* right */}
                  <div className='flex flex-col space-y-[5px] md:flex-row flex-[1] md:space-x-[20px] w-full'>
                    {/* floor */}
                    <div className='flex flex-col w-full flex-[1] '>
                      <label className='label'>
                        <span className='label-text font-semibold'>
                          Floor<span className='text-secondary'>*</span>
                        </span>
                      </label>
                      <div className='flex items-center space-x-[5px]'>
                        <div
                          onClick={() =>
                            floorCount >= 0 && setFloorCount((prev) => prev - 1)
                          }
                          className='flex justify-center items-center btn btn-primary w-[50px] p-[5px] h-[50px] rounded-[5px]'
                        >
                          <AiOutlineMinus className='text-white font-bold text-[18px]' />
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
                          className='flex justify-center items-center btn btn-primary w-[50px] p-[5px] h-[50px] rounded-[5px]'
                        >
                          <AiOutlinePlus className='text-white font-bold text-[18px]' />
                        </div>
                      </div>
                    </div>
                    {/* lift */}
                    {floorCount != 0 && (
                      <div className='flex flex-col w-full flex-[2] '>
                        <label className='label'>
                          <span className='label-text font-semibold'>
                            Lift Available
                          </span>
                        </label>
                        <label className='flex items-center cursor-pointer space-x-[10px]'>
                          <input
                            type='checkbox'
                            //   checked="checked"
                            className='checkbox checkbox-primary'
                            onChange={(e) => setLift(e.target.checked)}
                            checked={lift}
                          />
                          <span className='leading-[20px] text-[13px] text-gray-400 md:text-[14px]'>
                            Check if available
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* row 2 */}
                <div className='flex flex-col items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[50px]'>
                  {/* left */}
                  <div className='flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center'>
                    {/* location from */}
                    <div className='form-control w-full '>
                      <label className='label'>
                        <span className='label-text font-semibold'>
                          Location TO<span className='text-secondary'>*</span>
                        </span>
                      </label>
                      <GoogleSearchInput
                        styles='py-[10px] px-[10px]'
                        setAddress={setAddress2}
                        addressDetails={addressDetails2}
                        setAddressDetails={setAddressDetails2}
                        placeholder='Search location...'
                        defaultValue={serviceLocation?.locationTo?.name}
                        errorCheck={activateError && !address2}
                      />
                    </div>
                  </div>

                  {/* right */}
                  <div className='flex flex-col space-y-[5px] md:flex-row flex-[1] md:space-x-[20px] w-full'>
                    {/* floor */}
                    <div className='flex flex-col w-full flex-[1] '>
                      <label className='label'>
                        <span className='label-text font-semibold'>
                          Floor<span className='text-secondary'>*</span>
                        </span>
                      </label>
                      <div className='flex items-center space-x-[5px]'>
                        <div
                          onClick={() =>
                            floorCount2 >= 0 &&
                            setFloorCount2((prev) => prev - 1)
                          }
                          className='flex justify-center items-center btn btn-primary w-[50px] p-[5px] h-[50px] rounded-[5px]'
                        >
                          <AiOutlineMinus className='text-white font-bold text-[18px]' />
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
                          className='flex justify-center items-center btn btn-primary w-[50px] p-[5px] h-[50px] rounded-[5px]'
                        >
                          <AiOutlinePlus className='text-white font-bold text-[18px]' />
                        </div>
                      </div>
                    </div>
                    {/* lift */}
                    {floorCount2 != 0 && (
                      <div className='flex flex-col w-full flex-[2] '>
                        <label className='label'>
                          <span className='label-text font-semibold'>
                            Lift Available
                          </span>
                        </label>
                        <label className='flex items-center cursor-pointer space-x-[10px]'>
                          <input
                            type='checkbox'
                            //   checked="checked"
                            className='checkbox checkbox-primary'
                            onChange={(e) => setLift2(e.target.checked)}
                            checked={lift2}
                          />
                          <span className='leading-[20px] text-[13px] text-gray-400 md:text-[14px]'>
                            Check if available
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* row 3 */}
                <div className='flex flex-col items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[50px]'>
                  {/* left */}
                  <div className='flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[30px] space-y-[10px] md:space-y-0 md:justify-center'>
                    {/* first name */}
                    <div className='form-control w-full'>
                      <label className='label'>
                        <span className='label-text font-semibold'>
                          First Name<span className='text-secondary'>*</span>
                        </span>
                      </label>
                      <input
                        type='text'
                        placeholder='First name'
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
                  <div className='flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center'>
                    {/* last name */}
                    <div className='form-control w-full '>
                      <label className='label'>
                        <span className='label-text font-semibold'>
                          Last Name<span className='text-secondary'>*</span>
                        </span>
                      </label>
                      <input
                        type='text'
                        placeholder='Last name'
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
                <div className='flex flex-col items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-start  lg:space-x-[50px]'>
                  {/* left */}
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
                        placeholder='Email address'
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
                          Please enter a valid email
                        </p>
                      )}
                    </div>
                  </div>

                  {/* right */}
                  <div className='flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[30px] space-y-[10px] md:space-y-0 md:justify-center md:items-start'>
                    {/* country code */}
                    <div className='flex flex-col w-full flex-[1]'>
                      <label className='label'>
                        <span className='label-text font-semibold'>
                          Country Code<span className='text-secondary'>*</span>
                        </span>
                      </label>
                      <SelectSearch
                        placeholder='Select'
                        options={phoneCodesOptions}
                        isSearchable={true}
                        name='service2'
                        // defaultValue={serviceOptions[2]}
                        defaultValue={defaultPhoneValue()}
                        setValue={setPhoneValue}
                        // errorCheck={activateError && !phoneValue}
                      />
                    </div>
                    {/* Telephone* */}
                    <div className='form-control w-full flex-[1]'>
                      <label className='label'>
                        <span className='label-text font-semibold'>
                          Telephone<span className='text-secondary'>*</span>
                        </span>
                      </label>
                      <input
                        type='tel'
                        placeholder='Telephone'
                        className={`${
                          activateError && (!phone || !phoneError)
                            ? "ring ring-secondary"
                            : ""
                        } input input-primary w-full h-[43px]`}
                        onChange={handlePhoneNumberChange}
                        defaultValue={phone}
                      />
                      {!phoneError && (
                        <p className='text-[14px] text-secondary mt-[5px]'>
                          Please enter a valid number
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* row 5 */}
                <div className='flex flex-col items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[50px]'>
                  {/* left */}
                  <div className='flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center'>
                    {/* property type */}
                    <div className='flex flex-col w-full'>
                      <label className='label'>
                        <span className='label-text font-semibold'>
                          Property Type<span className='text-secondary'>*</span>
                        </span>
                      </label>
                      <div className='w-full'>
                        <SelectSearch
                          placeholder='Select'
                          options={serviceOptions2}
                          isSearchable={false}
                          //   name="service2"
                          // defaultValue={serviceOptions[2]}
                          defaultValue={
                            selectDefaultValue() || serviceOptions2[0]
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

                  {/* right */}
                  <div className='flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[30px] space-y-[10px] md:space-y-0 md:justify-center'>
                    {/* Number of movers */}
                    <div className='form-control w-full '>
                      <label className='label'>
                        <span className='label-text font-semibold'>
                          Number of Movers
                          <span className='text-secondary'>*</span>
                        </span>
                      </label>
                      <div className='w-full'>
                        <SelectSearch
                          placeholder='Select'
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
                </div>

                {/* row 6 */}
                <div className='flex flex-col  justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[50px]'>
                  {/* left */}
                  <div className='flex'>
                    {/* volume */}
                    <div className='flex flex-col w-full'>
                      <label className='label'>
                        <span className='label-text font-semibold'>
                          Volume: (CU/FT)<span className='text-secondary'>*</span>
                        </span>
                      </label>
                      <input
                        type='number'
                        min='10'
                        step='5'
                        placeholder='Volume'
                        className={`${
                          activateError && !volume ? "ring ring-secondary" : ""
                        } input input-primary w-full h-[43px]`}
                        onChange={(e) => setVolume(e.target.value)}
                        defaultValue={volume}
                      />
                    </div>
                  </div>
                  {/* middle */}
                  <div className='flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[30px] space-y-[10px] md:space-y-0 md:justify-center'>
                    {/* mileage */}
                    <div className='form-control w-full '>
                      <label className='label'>
                        <span className='label-text font-semibold'>
                          Mileage (miles)<span className='text-secondary'>*</span>
                        </span>
                      </label>
                      <div className='w-full'>
                        <SelectSearch
                          placeholder='Select'
                          options={mileageOptions}
                          isSearchable={false}
                          defaultValue={
                            defaultMileageValue() || mileageOptions[0]
                          }
                          setValue={setMileageValue}
                          errorCheck={
                            activateError &&
                            (mileageValue == "Select" || mileageValue == "")
                          }
                        />
                      </div>
                    </div>
                  </div>
                  {/* right */}
                  <div className='flex'>
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
                    </div>
                  </div>
                </div>
              </div>
              {/* agree to terms */}
              <div className='flex justify-center  mt-[30px] mb-[10px] md:mb-[20px] w-full'>
                <div className='form-control '>
                  <label className='label cursor-pointer flex justify-center space-x-[20px] w-full'>
                    <input
                      type='checkbox'
                      //   checked="checked"
                      className={`${
                        activateError && !agreeTermsValue
                          ? "ring ring-secondary"
                          : ""
                      } checkbox checkbox-primary`}
                      onChange={(e) => setAgreeTermsValue(e.target.checked)}
                    />
                    <span className='leading-[20px] text-[14px] md:text-[16px]'>
                      I agree to the terms and conditions outlined in the
                      privacy policy
                    </span>
                  </label>
                </div>
              </div>
              {/* submit button */}
              <div className=' mt-6 w-full flex justify-center'>
                <div className='flex flex-col items-center justify-center'>
                  <button
                    onClick={removalFormSubmit}
                    disabled={submitLoading}
                    className='btn btn-primary btn-wide flex items-center space-x-[5px] h-[60px]'
                  >
                    {!submitLoading && <span className=''>Get Prices</span>}
                    {submitLoading && (
                      <span className='loading loading-spinner loading-md text-white'></span>
                    )}
                    {!submitLoading && (
                      <span className=''>
                        <FiEdit className='text-[20px]' />
                      </span>
                    )}
                  </button>
                  {submitError && (
                    <div className='text-[14px] mt-[15px] text-secondary bg-secondary/20 rounded-[10px] py-[10px] px-[30px]'>
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

export default CompleteHouse;

// CompleteHouse.requireAuth = true;

export async function getServerSideProps() {
  const emails = await fetchWelcomedEmails();

  return {
    props: {
      emails,
    },
  };
}
