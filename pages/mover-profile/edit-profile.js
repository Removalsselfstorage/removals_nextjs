import MoverLayout from "@/layouts/MoverLayout";
import NormalLayout from "@/layouts/NormalLayout";
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
import { useSelector } from "react-redux";

const EditProfile = () => {
  const router = useRouter();
  const userDetails = useSelector(getAllUserDetails);

  const [imageUpload, setImageUpload] = useState(null);
  const [address, setAddress] = useState("");
  const [personalBio, setPersonalBio] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(true);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(true);
  const [submitError, setSubmitError] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [activateError, setActivateError] = useState(false);
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);

  //   Email validation
  const handleEmailChange = (e) => {
    // const inputValue = e.target.value;
    setEmail(e.target.value);

    // Regular expression to validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // setIsValid(emailPattern.test(inputValue));
    setEmailError(emailPattern.test(e.target.value));
  };

  const bioMaxLength = 200;

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

  const handleBioChange = (event) => {
    const newText = event.target.value;

    if (newText.length <= bioMaxLength) {
      setPersonalBio(newText);
    }
  };

  const handleKeyDown = (event) => {
    if (personalBio.length >= bioMaxLength && event.key !== "Backspace") {
      event.preventDefault(); // Prevent typing more characters
    }
  };

  const FormSubmit = () => {
    setActivateError(true);
    setSubmitError(false);
    if (
      !address ||
      !firstName ||
      !lastName ||
      !email ||
      !emailError ||
      !phoneError ||
      !personalBio ||
      !phone
    ) {
      setSubmitError(true);
    } else {
      // setSubmitLoading(true);
      setSubmitError(false);
      setShowUpdateMessage(true);
      alert("Updated profile");
    }
  };

  useEffect(() => {
    if (!userDetails.userDetails) {
      router.push("/");
    }
  }, []);
  return (
    <MoverLayout>
      <Head>
        <title>Mover Profile - Edit Profile</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      {/* <div className="py-[50px] bg-white/90 px-[30px]">
        <p>Edit Profile</p>
      </div> */}
      {userDetails.userDetails ? (
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

          <div className="  flex flex-col-reverse  xl:space-y-0 xl:flex-row xl:space-x-[20px] mx-[10px] md:mx-[30px]">
            {/* left */}
            <div className="lg:flex-[1.5] w-full bg-white/70 border px-[20px] py-[30px] rounded-[10px] shadow-lg">
              <section className="mb-[30px]">
                <div className="flex flex-col">
                  <div className="flex items-center space-x-[30px]">
                    {/* <div className="bg-gray-200 h-[120px] w-[120px] rounded-[10px] flex justify-center items-center text-[30px] font-bold">
                      OG
                    </div> */}
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

                    <div className="flex flex-col">
                      <p className=" text-gray-400  text-[14px]">
                        Accepted file types: PNG, JPG
                      </p>
                      <p className=" text-gray-400 text-[14px] mb-[10px] ">
                        Maximum file size: 5MB
                      </p>
                      {/* <div className="btn btn-outline btn-secondary mt-[10px]">
                        Upload Picture
                      </div> */}
                      <input
                        type="file"
                        className="file-input file-input-bordered file-input-secondary w-full max-w-xs "
                        accept="image/png, image/gif, image/jpeg"
                        onChange={(e) => {
                          setImageUpload(e.target.files[0]);
                        }}
                      />
                      {/* <FilePicker
                      className="w-full max-w-xs"
                      placeholder="Upload Profile Image"
                      /> */}
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-[30px]">
                <div className="rounded-[10px] bg-primary/5 flex flex-col py-[30px] px-[20px] text-[15px]">
                  <div className="flex space-x-[10px] mb-[10px]">
                    {/* <IoMdNotificationsOutline className="text-primary text-[30px] " /> */}
                    <p className="">
                      Upload{" "}
                      <span className="font-bold">images of yourself</span>. Do
                      not include images with phone numbers or websites.
                    </p>
                  </div>
                  <p className="">
                    We encourage you to upload a profile picture{" "}
                    <span className="font-bold">related to your work!</span>
                  </p>
                  <p className="">
                    <span className="font-bold">Example: </span> If you are a
                    removal company upload an image wih your van.
                  </p>
                </div>
              </section>

              <section>
                {/* row 1 */}
                <div className="flex flex-col items-center mb-[20px] justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[30px]">
                  {/* left */}
                  <div className="flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[20px] space-y-[10px] md:space-y-0 md:justify-center">
                    {/* first name */}
                    <div className="form-control w-full">
                      <label className="label ">
                        <span className="label-text font-semibold text-[16px]">
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
                        <span className="label-text font-semibold text-[16px]">
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
                {/* row 2 */}
                <div className="flex flex-col items-center mb-[20px] justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-start lg:space-x-[30px]">
                  {/* left */}
                  <div className="flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[20px] space-y-[10px] md:space-y-0 md:justify-center">
                    {/* Mobile* */}
                    <div className="form-control w-full flex-[1]">
                      <label className="label">
                        <span className="label-text font-semibold text-[16px]">
                          Mobile<span className="text-secondary">*</span>
                        </span>
                      </label>
                      <input
                        type="tel"
                        placeholder="Mobile number"
                        className={`${
                          activateError && (!phone || !phoneError)
                            ? "ring ring-secondary"
                            : ""
                        } input input-primary w-full h-[43px]`}
                        onChange={handlePhoneNumberChange}
                        defaultValue={phone}
                      />
                      <p
                        className="text-[14px] mt-[10px] link text-primary"
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
                  {/* right */}
                  <div className="flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center">
                    {/* email */}
                    <div className="form-control w-full ">
                      <label className="label">
                        <span className="label-text font-semibold text-[16px]">
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
                </div>
                {/* Address */}
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
                    {personalBio.length} / {bioMaxLength} Characters
                  </p>
                </div>

                {/* Update button */}
                <div className=" mt-[50px] w-full flex justify-between items-end">
                  <div className="flex flex-col items-center justify-center">
                    <button
                      onClick={FormSubmit}
                      className="btn btn-secondary btn-wide flex items-center space-x-[5px] "
                    >
                      {!submitLoading && (
                        <span className="">Update Profile</span>
                      )}
                      {submitLoading && (
                        <span className="loading loading-dots loading-md text-white"></span>
                      )}
                      {/* {!submitLoading && (
                        <span className="">
                          <FiEdit className="text-[20px]" />
                        </span>
                      )} */}
                    </button>
                    {submitError && (
                      <p className="text-[16px] text-secondary mt-[15px] w-full text-start">
                        Please fill all mandatory fields
                      </p>
                    )}
                    {!submitError && showUpdateMessage && (
                      <p className="text-[15px] text-primary mt-[20px] w-full text-start">
                        Profile updated successfully
                      </p>
                    )}
                  </div>
                  <Link
                    href="/mover-profile/terms-and-policies"
                    className="link text-secondary"
                  >
                    Terms & Conditions
                  </Link>
                </div>
              </section>
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
                    Your photos are a customer's first impression of your trade
                    on the search results page. A profile with pictures and
                    video introductions is 2x more likely to get hired for the
                    job.
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
                        Make your description detailed and informative. Share
                        your work history, experience, education and more.
                      </p>
                    </div>
                    <div className="flex flex-col mt-[20px]">
                      <p className="font-bold text-[18px] ">
                        Upload high-quality photos & videos
                      </p>
                      <p className="text-[15px] mt-[7px]">
                        Your photos are a customer's first impression of your
                        trade on the search results page. A profile with
                        pictures and video introductions is 2x more likely to
                        get hired for the job.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[100vh] ">
          <span className="h-full loading loading-bars text-primary w-[40px] lg:w-[60px] rounded-[10px]"></span>
        </div>
      )}
    </MoverLayout>
  );
};

export default EditProfile;
