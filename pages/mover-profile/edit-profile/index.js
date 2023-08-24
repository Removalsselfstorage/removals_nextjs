import MoverLayout from "@/layouts/MoverLayout";
import NormalLayout from "@/layouts/NormalLayout";
import { uploadMoverDetails } from "@/lib/uploadMoverPersonalDetails";
import { getAllUserDetails } from "@/store/userSlice";
import { FilePicker } from "evergreen-ui";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiLogOut, BiSolidPhoneCall } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import { GiTrophyCup } from "react-icons/gi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TiPin } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Form, Formik, useField, Field, ErrorMessage } from "formik";
import NormalInput from "@/components/Inputs/NormalInput";
import FileInput from "@/components/Inputs/FileInput";
import TextAreaInput from "@/components/Inputs/TextAreaInput";
import FormikControl from "@/components/Formik/FormikControl";
import TextError from "@/components/Formik/TextError";
import MyTextInput from "@/components/InputsType/MyTextInput";
import MyTextArea from "@/components/InputsType/MyTextArea";
import {
  getAllMoverDetails,
  updateFirebaseMoverDetails,
  updateMoverPersonalDetails,
} from "@/store/moverSlice";
import CustomFileInput from "@/components/Inputs/CustomFileInput";
import { fetchMoverDetails3 } from "@/lib/fetchData2";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { UploadMoverPersonalDetails2 } from "@/lib/uploadMoverPersonalDetails2";
import { combineInitials } from "@/utils/logics";

const EditProfile = () => {
  const router = useRouter();
  const userDetails = useSelector(getAllUserDetails);

  const dispatch = useDispatch();
  const details = useSelector(getAllMoverDetails);

  const [imageUpload, setImageUpload] = useState(
    details.personalDetails.profilePicture?.raw || null
  );

  // const [previewUrl, setPreviewUrl] = useState(
  //   details.firebaseMoverDetails?.profileImagePreviewUrl ||
  //     details.personalDetails.profilePicture?.url
  // );
  const [previewUrl, setPreviewUrl] = useState(
    details.personalDetails.profilePicture.url
  );

  // const [personalBio, setPersonalBio] = useState(
  //   details.firebaseMoverDetails?.personalBio ||
  //     details.personalDetails.personalBio
  // );
  const [personalBio, setPersonalBio] = useState(
    details.personalDetails.personalBio
  );

  // const [address, setAddress] = useState(
  //   details.firebaseMoverDetails?.address || details.personalDetails?.address
  // );
  const [address, setAddress] = useState(details.personalDetails.address);

  // const [firstName, setFirstName] = useState(
  //   details.firebaseMoverDetails?.firstName ||
  //     details.personalDetails?.firstName
  // );
  const [firstName, setFirstName] = useState(details.personalDetails.firstName);
  // const [lastName, setLastName] = useState(
  //   details.firebaseMoverDetails?.lastName || details.personalDetails?.lastName
  // );
  const [lastName, setLastName] = useState(details.personalDetails.lastName);
  // const [email, setEmail] = useState(
  //   details.firebaseMoverDetails?.email || details.personalDetails?.email
  // );
  const [email, setEmail] = useState(details.personalDetails.email);
  const [emailError, setEmailError] = useState(true);
  // const [phone, setPhone] = useState(
  //   details.firebaseMoverDetails?.phone || details.personalDetails?.phone
  // );
  const [phone, setPhone] = useState(details.personalDetails.phone);
  const [phoneError, setPhoneError] = useState(true);
  const [submitError, setSubmitError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [activateError, setActivateError] = useState(false);
  const [fileUploadError, setFileUploadError] = useState("");

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

    const isValidPhoneNumber =
      strippedNumber.length === 10 || strippedNumber.length === 11;

    setPhone(strippedNumber);
    setPhoneError(isValidPhoneNumber);
  };

  const bioMaxLength = 200;
  const handleBioChange = (e) => {
    const value = e.target.value;
    if (value.length <= bioMaxLength) {
      setPersonalBio(e.target.value);
    }
  };

  const handleKeyDown = (event) => {
    if (personalBio.length >= bioMaxLength && event.key !== "Backspace") {
      event.preventDefault(); // Prevent typing more characters
    }
  };

  const uid = userDetails.userDetails?.uid;

  // const readMoversData = async () => {
  //   const res = await fetchMoverDetails3(uid);
  //   dispatch(updateFirebaseMoverDetails(res));
  // };

  // const imgUrl = URL.createObjectURL(imageUpload);

  const personalFormSubmit = async () => {
    setActivateError(true);
    setSubmitError(false);

    if (
      !address ||
      !firstName ||
      !lastName ||
      !email ||
      !emailError ||
      !phoneError ||
      !phone ||
      !personalBio ||
      fileUploadError ||
      !previewUrl
    ) {
      setSubmitError(true);
    } else {
      setSubmitLoading(true);

      const moveObj = {
        profilePicture: {
          raw: imageUpload,
          url: previewUrl,
          name: imageUpload.name,
        },
        address,
        personalBio,
        firstName,
        lastName,
        email,
        phone,
        registerDate: details.personalDetails.registerDate,
        reviewSubmit: true,
        acceptedTerms: details.personalDetails.acceptedTerms,
        justRegistered: details.justRegistered,
        uid,
      };

      // const profilePixName = imageUpload.name;
      // const uid = userDetails.userDetails.uid;
      const result = await UploadMoverPersonalDetails2(moveObj);
      console.log(result);

      setSubmitSuccess(true);

      setSubmitLoading(false);
      // window.location.reload();
    }
  };

  console.log(details);

  return (
    <MoverLayout>
      <Head>
        <title>Mover Profile - Edit Profile</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <div className="bg-white/90 py-[50px]">
        <section className="mb-[30px]  px-[30px] ">
          <div className="flex flex-col">
            <p className="font-bold text-[25px] mb-[0px]">Profile Settings</p>
            <p className="">
              Set up your Removal & Self Storage profile and increase your
              hiring chances
            </p>
          </div>
        </section>

        {(submitSuccess || details.personalDetails.reviewSubmit) && (
          <section className="mb-[30px] px-[30px] ">
            <div className="flex items-center bg-primary/10 rounded-[10px] px-[20px] py-[15px] space-x-[20px]">
              <IoMdNotificationsOutline className="text-primary text-[40px]" />
              <div className="flex flex-col">
                <p className="font-bold text-primary">
                  Your update has been submitted for review!
                </p>
              </div>
            </div>
          </section>
        )}

        <div className="  flex flex-col-reverse  xl:space-y-0 xl:flex-row xl:space-x-[20px] mx-[10px] md:mx-[30px]">
          {/* left */}
          <div className="lg:flex-[1.5] w-full bg-white/70 border px-[20px] py-[30px] rounded-[10px] shadow-lg">
            <div className="flex flex-col space-y-[20px]">
              {/* image upload */}
              <section className="mb-[0px]">
                <div className="flex flex-col space-y-[20px] md:space-y-0 md:flex-row md:space-x-[50px] lg:flex-col lg:space-y-[20px] lg:md:space-x-[0px]">
                  <div className="flex flex-col lg:flex-[1] w-full">
                    <div className="w-full">
                      {previewUrl && !fileUploadError ? (
                        <div className="avatar ">
                          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={previewUrl} />
                          </div>
                        </div>
                      ) : (
                        <div className="avatar placeholder">
                          <div className="bg-gray-200 rounded-full w-[120px]">
                            <span className="text-5xl font-bold">
                              {combineInitials(firstName, lastName)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col mt-[10px] w-full">
                      <p className=" font-bold  mb-[10px]">
                        Profile Picture{" "}
                        <span className="text-secondary">*</span>
                      </p>

                      <div className="w-full">
                        <CustomFileInput
                          activateError={activateError}
                          previewUrl={previewUrl}
                          setPreviewUrl={setPreviewUrl}
                          setImageUpload={setImageUpload}
                          imageUpload={imageUpload}
                          setFileUploadError={setFileUploadError}
                          fileUploadError={fileUploadError}
                          data={details}
                        />
                      </div>
                      {!fileUploadError && (
                        <p className=" text-gray-400  text-[14px] mt-[10px]">
                          Accepted file types: PNG, JPG, JPEG; File size: 3MB
                          max.
                        </p>
                      )}

                      {fileUploadError && (
                        <p className=" text-secondary text-[14px] mt-[10px]">
                          {fileUploadError}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="rounded-[10px] lg:flex-[1] w-full bg-primary/5 flex flex-col py-[30px] px-[20px] text-[15px]">
                    <div className="flex space-x-[10px] mb-[10px] w-full">
                      {/* <IoMdNotificationsOutline className="text-primary text-[30px] " /> */}
                      <p className="">
                        Upload{" "}
                        <span className="font-bold">images of yourself</span>.
                        Do not include images with phone numbers or websites.
                      </p>
                    </div>
                    <p className="mb-[10px] w-full">
                      We encourage you to upload a profile picture{" "}
                      <span className="font-bold"> related to your work! </span>
                      .
                    </p>
                    <p className="w-full">
                      <span className="font-bold">Example: </span> If you are a
                      removal company upload an image wih your van.
                    </p>
                  </div>
                </div>
              </section>

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
                      placeholder="First name"
                      className={`${
                        activateError && !firstName ? "ring ring-secondary" : ""
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
                        activateError && !lastName ? "ring ring-secondary" : ""
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
                      <span className="label-text font-semibold">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Email address"
                      className={`${
                        activateError && (!email || !emailError)
                          ? "ring ring-secondary"
                          : ""
                      } input input-primary w-full h-[43px] bg-gray-200`}
                      onChange={handleEmailChange}
                      //
                      defaultValue={email}
                      readOnly
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
                      <span className="label-text font-semibold">Mobile</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Telephone number"
                      className={`${
                        activateError && (!phone || !phoneError)
                          ? "ring ring-secondary"
                          : ""
                      } input input-primary w-full h-[43px] bg-gray-200`}
                      onChange={handlePhoneNumberChange}
                      defaultValue={phone}
                      readOnly
                    />
                    <p
                      className="text-[14px]  link text-primary mt-[10px]"
                      onClick={() => window.my_modal_3.showModal()}
                    >
                      Change mobile number
                    </p>
                    {/* modal */}
                    <dialog
                      id="my_modal_3"
                      className="modal py-[20px] px-[10px]"
                    >
                      <form method="dialog" className="modal-box ">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border border-primary text-primary">
                          ✕
                        </button>
                        <h3 className="font-bold text-lg text-primary">
                          Change your Mobile Number
                        </h3>
                        <p className="py-4">
                          If you wish to change your mobile number, please
                          contact us and we will correct it for you.
                        </p>
                        <div className="btn btn-secondary">
                          <BiSolidPhoneCall size={20} className="" />
                          <a href="tel:(800)-995-5003" className="">
                            (800) 995-5003{" "}
                          </a>
                        </div>
                      </form>
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>
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
                    activateError && !personalBio ? "ring ring-secondary" : ""
                  } textarea w-full textarea-primary min-h-[150px] max-h-[200px] placeholder:text-[16px] text-[15px]`}
                  placeholder="Tell us about yourself and your work experience"
                  onChange={handleBioChange}
                  value={personalBio}
                  // disabled={personalBio.length >= bioMaxLength}
                  onKeyDown={handleKeyDown}
                ></textarea>
                <p className="text-gray-500 mb-[10px] text-[15px] mt-[5px]">
                  {personalBio?.length} / {bioMaxLength} Characters
                </p>
              </div>
            </div>
            {/* error message */}
            <div className="flex justify-center w-full">
              {submitError && !submitSuccess && !submitLoading && (
                <p className="text-[16px] text-secondary mt-[15px]">
                  Please fill all mandatory fields
                </p>
              )}
              {submitSuccess && !submitError && !submitLoading && (
                <p className="text-[16px] text-primary mt-[15px]">
                  Profile successfully submitted
                </p>
              )}
              {submitLoading && !submitError && !submitSuccess && (
                <p className="text-[16px] text-primary mt-[15px]">
                  Submitting ...
                </p>
              )}
            </div>

            {/* submit button */}
            <div className=" mt-6 w-full flex justify-end">
              <div className="flex flex-col items-center justify-center">
                <button
                  onClick={personalFormSubmit}
                  className="btn btn-secondary w-[150px] flex items-center space-x-[5px] h-[60px]"
                  disabled={submitLoading}
                >
                  {!submitLoading && <span className="">Submit</span>}
                  {submitLoading && (
                    <span className="loading loading-dots loading-md text-white"></span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="lg:flex-[1] h-fit w-full bg-secondary/5 border rounded-[10px] shadow-lg pt-[30px] pb-[50px] px-[20px] mb-[30px] xl:mb-[0px]">
            <div className="flex">
              <p className="font-bold text-[22px] flex-grow ">
                Make your profile <br />
                competitive!
              </p>
              <div className="shrink-0">
                <GiTrophyCup className="text-primary text-[130px] mt-[-65px]" />
              </div>
            </div>

            <div className="hidden xl:block">
              <div className="flex flex-col mt-[20px]">
                <p className="font-bold text-[18px] ">
                  Go all in on the description
                </p>
                <p className="text-[15px] mt-[7px]">
                  Make your description detailed and informative. Share your
                  work history, experience, education and more.
                </p>
              </div>
              <div className="flex flex-col mt-[20px]">
                <p className="font-bold text-[18px] ">
                  Upload high-quality photos & videos
                </p>
                <p className="text-[15px] mt-[7px]">
                  Your photos are a customer's first impression of your trade on
                  the search results page. A profile with pictures and video
                  introductions is 2x more likely to get hired for the job.
                </p>
              </div>
            </div>

            {/* collapse content */}
            <div className="collapse bg-orange-500/10 collapse-arrow xl:hidden mt-[20px]">
              <input type="checkbox" />
              <div className="collapse-title font-semibold text-secondary">
                Learn more
              </div>
              <div className="collapse-content">
                <div className="">
                  <div className="flex flex-col mt-[20px]">
                    <p className="font-bold text-[18px] ">
                      Go all in on the description
                    </p>
                    <p className="text-[15px] mt-[7px]">
                      Make your description detailed and informative. Share your
                      work history, experience, education and more.
                    </p>
                  </div>
                  <div className="flex flex-col mt-[20px]">
                    <p className="font-bold text-[18px] ">
                      Upload high-quality photos & videos
                    </p>
                    <p className="text-[15px] mt-[7px]">
                      Your photos are a customer's first impression of your
                      trade on the search results page. A profile with pictures
                      and video introductions is 2x more likely to get hired for
                      the job.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MoverLayout>
  );
};

export default EditProfile;

// export async function getServerSideProps(context) {
//   const { uid } = context.params; // Access the UID from the URL
//   let userData = null;

//   // console.log({uid})

//   // const res = await fetchMoverDetails3("5L2jQzETlfTusrd5GE48eS08r3H2");
//   const res = await fetchMoverDetails3(uid);
//   if (res) {
//     userData = res;
//   } else {
//     console.log("No data");
//   }

//   return {
//     props: {
//       userData,
//       uid,
//     },
//   };
// }
