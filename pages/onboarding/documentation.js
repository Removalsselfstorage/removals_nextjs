import QuoteType from "@/components/BookingPages/QuoteType";
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
import { MdKeyboardArrowRight } from "react-icons/md";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineRight,
  AiOutlineLeft,
} from "react-icons/ai";
import GoogleSearchInput from "@/components/Inputs/GoogleSearchInput";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDetails,
  updateLocationDetails,
  updateMoveDetails,
  updateMoverDetails,
  updatePersonalDetails,
} from "@/store/quoteSlice";
import DatePicker2 from "@/components/DatePicker/DatePicker2";
import dayjs from "dayjs";
import { redirect, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { getAllMoverDetails } from "@/store/moverSlice";
import { getAllUserDetails } from "@/store/userSlice";
import MoverLayout from "@/layouts/MoverLayout";
import MoverLayout2 from "@/layouts/MoverLayout2";

const PersonalDetails = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const userDetails = useSelector(getAllUserDetails);

  const dispatch = useDispatch();
  const details = useSelector(getAllMoverDetails);

  //   states
  const [imageUpload, setImageUpload] = useState(null);
  const [personalBio, setPersonalBio] = useState("");

  const [address, setAddress] = useState("");

  const [firstName, setFirstName] = useState(
    details.personalDetails.firstName || ""
  );
  const [lastName, setLastName] = useState(
    details.personalDetails.lastName || ""
  );
  const [email, setEmail] = useState(details.personalDetails.email || "");
  const [emailError, setEmailError] = useState(true);
  const [phone, setPhone] = useState(details.personalDetails.telephone || "");
  const [phoneError, setPhoneError] = useState(true);
  const [submitError, setSubmitError] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [activateError, setActivateError] = useState(false);

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
      strippedNumber.length === 10 || strippedNumber.length === 11;

    setPhone(strippedNumber);
    setPhoneError(isValidPhoneNumber);
  };

  const bioMaxLength = 20;
  const handleBioChange = (e) => {
    const value = e.target.value;
    // setPersonalBio(e.target.value);
    if (value.length <= bioMaxLength) {
      setPersonalBio(e.target.value);
    }
    // const { name, value } = e.target;
    // setMoverDetails({ ...moverDetails, [name]: value });
  };

  const handleKeyDown = (event) => {
    if (personalBio.length >= bioMaxLength && event.key !== "Backspace") {
      event.preventDefault(); // Prevent typing more characters
    }
  };

  const personalFormSubmit = () => {
    setActivateError(true);
    setSubmitError(false);

    if (
      !address ||
      !firstName ||
      !lastName ||
      !email ||
      !emailError ||
      !phoneError ||
      !phone
    ) {
      setSubmitError(true);
    } else {
      setSubmitLoading(true);

      dispatch(
        updatePersonalDetails({
          firstName,
          lastName,
          email,
          phone,
          address,
          personalBio,
          profilePicture: imageUpload,
        })
      );

      router.push("/onboarding/documentation");
    }
  };

  useEffect(() => {
    if (!userDetails.userDetails) {
      router.push("/");
    }
  }, []);

  //   console.log(details.moveDetails.moveDate);
  //   console.log(dateValue);
  // console.log(details);
  console.log(details);

  return (
    <MoverLayout2>
      <Head>
        <title>House Removals - Removal and Self Storage</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <main>
        {userDetails.userDetails ? (
          <div className="mb-[70px] lg:mb-[100px] pt-[70px] bg-white/80">
            <div className="md:max-w-7xl mx-auto">
              {/* Title */}
              <div className="w-full flex justify-center py-[30px] md:py-[40px]">
                <h3
                  className={`${titleFont.variable} font-sans2 text-3xl lg:text-4xl font-extrabold flex-col items-center justify-center`}
                >
                  <p className="">Mover Onboarding</p>{" "}
                  <div className="w-full bg-primary/20 h-[20px] mt-[-12px] "></div>
                </h3>
              </div>

              {/* form */}
              <div className="flex flex-col  px-[20px] lg:px-[100px] py-[30px] bg-white rounded-[20px] border mx-[10px] md:mx-[100px]">
                {/* stepper */}
                <div className="w-full flex justify-center mb-[20px]">
                  <ul className="steps">
                    <li className="step step-primary px-[50px] font-bold text-[20px] leading-[25px]">
                      Personal Details
                    </li>
                    <li className="step step-primary font-bold text-[20px] leading-[25px]">
                      Documentation
                    </li>
                    {/* <li className="step">Purchase</li>
                <li className="step">Receive Product</li> */}
                  </ul>
                </div>
                {/* mandatory text */}
                <div className="flex justify-center text-secondary mb-[10px] md:mb-[20px] text-[14px] md:text-[16px]">
                  <p className="">Fields marked with * are mandatory</p>
                </div>
                <div className="flex flex-col space-y-[20px]">
                  {/* <p className="font-bold text-[25px] mt-[20px]">
                Personal Details
              </p> */}

                  {/* image upload */}
                  {/* <section className="mb-[0px]">
                <div className="flex flex-col space-y-[20px] lg:space-y-0 lg:flex-row lg:space-x-[20px]">
                  <div className="flex flex-col lg:flex-[1]">
                    <div className="">
                      {imageUpload ? (
                        <div className="avatar ">
                          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={URL.createObjectURL(imageUpload)} />
                          </div>
                        </div>
                      ) : (
                        <div className="avatar placeholder">
                          <div className="bg-gray-200 rounded-full w-[120px]">
                            <span className="text-3xl font-bold">OG</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col mt-[10px]">
                      <p className=" font-bold text-[20px] mb-[10px]">
                        Upload Profile Picture
                      </p>
                      <input
                        type="file"
                        className="file-input file-input-bordered file-input-secondary w-full max-w-xs "
                        accept="image/png, image/gif, image/jpeg"
                        onChange={(e) => {
                          setImageUpload(e.target.files[0]);
                        }}
                      />
                      <p className=" text-gray-400  text-[14px] mt-[10px]">
                        Accepted file types: PNG, JPG; Maximum file size: 5MB
                      </p>
                      <p className=" text-gray-400 text-[14px] mb-[10px] "></p>
                    </div>
                  </div>

                  <div className="rounded-[10px] lg:flex-[1]  bg-primary/5 flex flex-col py-[30px] px-[20px] text-[15px]">
                    <div className="flex space-x-[10px] mb-[10px]">
                      <p className="">
                        Upload{" "}
                        <span className="font-bold">images of yourself</span>.
                        Do not include images with phone numbers or websites.
                      </p>
                    </div>
                    <p className="mb-[10px]">
                      We encourage you to upload a profile picture{" "}
                      <span className="font-bold">
                        {" "}
                        related to your work!{" "}
                      </span>
                      .
                    </p>
                    <p className="">
                      <span className="font-bold">Example: </span> If you are
                      a removal company upload an image wih your van.
                    </p>
                  </div>
                </div>
              </section> */}

                  {/* row 1 */}
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
                          placeholder="Type here"
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
                          placeholder="Type here"
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

                  {/* row 2*/}
                  <div className="flex flex-col items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-start  lg:space-x-[50px]">
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
                          placeholder="Type here"
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
                          <p className="text-[14px] text-secondary mt-[5px]">
                            Please enter a valid email
                          </p>
                        )}
                      </div>
                    </div>

                    {/* right */}
                    <div className="flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[30px] space-y-[10px] md:space-y-0 md:justify-center md:items-start">
                      {/* Telephone* */}
                      <div className="form-control w-full flex-[1]">
                        <label className="label">
                          <span className="label-text font-semibold">
                            Mobile<span className="text-secondary">*</span>
                          </span>
                        </label>
                        <input
                          type="tel"
                          placeholder="Type here"
                          className={`${
                            activateError && (!phone || !phoneError)
                              ? "ring ring-secondary"
                              : ""
                          } input input-primary w-full h-[43px]`}
                          onChange={handlePhoneNumberChange}
                          defaultValue={phone}
                        />
                        {!phoneError && (
                          <p className="text-[14px] text-secondary mt-[5px]">
                            Please enter a valid number
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* address */}
                  <div className="form-control w-full mb-[20px]">
                    <label className="label ">
                      <span className="label-text font-semibold text-[16px]">
                        Address<span className="text-secondary">*</span>
                      </span>
                    </label>

                    <textarea
                      className={`${
                        activateError && !address ? "ring ring-secondary" : ""
                      } textarea w-full textarea-primary min-h-[80px] max-h-[100px] placeholder:text-[16px] text-[15px]`}
                      placeholder="Home address"
                      onChange={(e) => setAddress(e.target.value)}
                      defaultValue={address}
                    ></textarea>
                  </div>

                  {/* Personal Bio */}
                  <div className="form-control w-full">
                    <div className=" ">
                      <span className="label-text font-semibold text-[16px]">
                        Personal Bio<span className="text-secondary">*</span>
                      </span>
                    </div>
                    <p className="text-gray-500 mb-[10px] text-[15px] mt-[5px]">
                      (Do not include your phone number or website.)
                    </p>

                    <textarea
                      className={`${
                        activateError && !personalBio
                          ? "ring ring-secondary"
                          : ""
                      } textarea w-full textarea-primary min-h-[150px] max-h-[200px] placeholder:text-[16px] text-[15px]`}
                      placeholder="Tell us about yourself and your work experience"
                      onChange={handleBioChange}
                      value={personalBio}
                      // disabled={personalBio.length >= bioMaxLength}
                      onKeyDown={handleKeyDown}
                    ></textarea>
                    <p className="text-gray-500 mb-[10px] text-[15px] mt-[5px]">
                      {personalBio.length} / {bioMaxLength} Characters
                    </p>
                  </div>
                </div>

                {/* error message */}
                <div className="flex justify-center w-full">
                  {submitError && (
                    <p className="text-[16px] text-secondary mt-[15px]">
                      Please fill all mandatory fields
                    </p>
                  )}
                </div>

                {/* submit button */}
                <div className=" mt-6 w-full flex justify-end">
                  <div className="flex items-start space-x-[20px]">
                    <div className="flex flex-col items-center justify-center">
                      <Link
                        href="/onboarding/personal-details"
                        // onClick={personalFormSubmit}
                        className="btn btn-primary w-[150px] flex items-center space-x-[5px] h-[60px]"
                      >
                        {!submitLoading && (
                          <span className="">
                            <AiOutlineLeft className="text-[20px]" />
                          </span>
                        )}
                        {!submitLoading && <span className="">Previous</span>}
                      </Link>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <button
                        onClick={personalFormSubmit}
                        className="btn btn-primary w-[150px] flex items-center space-x-[5px] h-[60px]"
                      >
                        {!submitLoading && <span className="">Submit</span>}
                        {submitLoading && (
                          <span className="loading loading-dots loading-md text-white"></span>
                        )}
                        {!submitLoading && (
                          <span className="">
                            <AiOutlineRight className="text-[20px]" />
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[100vh] ">
            <span className="h-full loading loading-bars text-primary w-[40px] lg:w-[60px]"></span>
          </div>
        )}
      </main>
    </MoverLayout2>
  );
};

export default PersonalDetails;

// CompleteHouse.requireAuth = true;
