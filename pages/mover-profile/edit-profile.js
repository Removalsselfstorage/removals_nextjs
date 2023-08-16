import MoverLayout from "@/layouts/MoverLayout";
import NormalLayout from "@/layouts/NormalLayout";
import { uploadMoverDetails } from "@/lib/uploadMoverDetails";
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
import * as Yup from "yup";
import { Form, Formik, useField, Field, ErrorMessage } from "formik";
import NormalInput from "@/components/Inputs/NormalInput";
import FileInput from "@/components/Inputs/FileInput";
import TextAreaInput from "@/components/Inputs/TextAreaInput";
import FormikControl from "@/components/Formik/FormikControl";
import TextError from "@/components/Formik/TextError";
import MyTextInput from "@/components/InputsType/MyTextInput";
import MyTextArea from "@/components/InputsType/MyTextArea";

const EditProfile = () => {
  const router = useRouter();
  const userDetails = useSelector(getAllUserDetails);

  const initialValues = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    personalBio: "",
    // imageUpload: null,
    success: "",
    error: "",
  };

  const [moverDetails, setMoverDetails] = useState(initialValues);
  // const [imageUpload, setImageUpload] = useState(null);
  // const [address, setAddress] = useState("");
  const [personalBioCount, setPersonalBioCount] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(true);
  // const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(true);
  const [submitError, setSubmitError] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [activateError, setActivateError] = useState(false);
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);

  console.log(personalBioCount);

  const {
    firstName,
    lastName,
    phone,
    email,
    address,
    personalBio,
    // imageUpload,
    success,
    error,
  } = moverDetails;

  // console.log({ address, personalBio, firstName });

  //   Email validation
  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailPattern.test(e.target.value));
  };

  const bioMaxLength = 20;

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

  const handleBioChange = (e) => {
    // const newText = event.target.value;
    // setPersonalBioCount(e.target.value);
    // if (value.length <= bioMaxLength) {
    //   setPersonalBioCount(e.target.value);
    // }
    const { name, value } = e.target;
    setMoverDetails({ ...moverDetails, [name]: value });
  };

  const handleKeyDown = (event) => {
    if (personalBio.length >= bioMaxLength && event.key !== "Backspace") {
      event.preventDefault(); // Prevent typing more characters
    }
  };

  // const MAX_FILE_SIZE = 102400; //100KB
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes;

  // const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };
  const validFileExtensions = { image: ["jpg", "gif", "png", "jpeg", "webp"] };

  function isValidFileType(fileName, fileType) {
    return (
      fileName &&
      validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMoverDetails({ ...moverDetails, [name]: value });
  };

  const updateValidation = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email address is required"),
    address: Yup.string().required("Address is required"),
    // phone: Yup.string().matches(/(\+91\ )[6-9]{1}[0-9 ]{4}[0-9 ]{4}[0-9]{3}/, {
    phone: Yup.string()
      .matches(/^(?:\d{10}|\d{11})$/, {
        message: "Invalid phone number",
        excludeEmptyString: false,
      })
      .required("Phone number is required"),
    personalBio: Yup.string().required("Personal is required"),
    // imageUpload: Yup.mixed()
    //   .required("Image is required")
    //   .test("is-valid-type", "Not a valid image type", (value) =>
    //     isValidFileType(value && value.name.toLowerCase(), "imageUpload")
    //   )
    //   .test(
    //     "is-valid-size",
    //     "Max allowed size is 5MB",
    //     (value) => value && value.size <= MAX_FILE_SIZE
    //   ),
  });

  const formSubmit = async (values, { setSubmitting }) => {
    // setSubmitLoading(true);
    // setActivateError(true);
    // setSubmitError(false);

    // const result = await uploadMoverDetails({
    //   imageUpload,
    //   address,
    //   personalBio,
    //   firstName,
    //   lastName,
    //   email,
    //   phone,
    // });

    // if (result) {
    //   setSubmitLoading(false);
    //   setShowUpdateMessage(true);
    // } else {
    //   alert("Failed to update profile");
    // }

    // setMoverDetails({
    //   ...moverDetails,
    //   firstName: "",
    //   lastName: "",
    //   phone: "",
    //   email: "",
    //   address: "",
    //   personalBio: "",
    //   imageUpload: null,
    // });
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);

    // window.location.reload();
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
              <Formik
                // enableReinitialize
                initialValues={moverDetails}
                validationSchema={updateValidation}
                onSubmit={formSubmit}
                validateOnchange={false}
                // validateOnBlur={false}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  isValid,
                }) => (
                  <Form>
                    {/* <section className="mb-[30px]">
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-[30px]">
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
                            <FileInput
                              type="file"
                              name="imageUpload"
                              // className="file-input file-input-bordered file-input-secondary w-full max-w-xs "
                              // accept="image/png, image/gif, image/jpeg"
                              onChange={(e) => {
                                // const { name, value, files } = e.target;
                                setMoverDetails({
                                  ...moverDetails,
                                  imageUpload: e.target.files[0],
                                });
                                // setImageUpload(e.target.files[0]);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </section> */}

                    <section className="mb-[30px]">
                      <div className="rounded-[10px] bg-primary/5 flex flex-col py-[30px] px-[20px] text-[15px]">
                        <div className="flex space-x-[10px] mb-[10px]">
                          {/* <IoMdNotificationsOutline className="text-primary text-[30px] " /> */}
                          <p className="">
                            Upload{" "}
                            <span className="font-bold">
                              images of yourself
                            </span>
                            . Do not include images with phone numbers or
                            websites.
                          </p>
                        </div>
                        <p className="">
                          We encourage you to upload a profile picture{" "}
                          <span className="font-bold">
                            related to your work!
                          </span>
                        </p>
                        <p className="">
                          <span className="font-bold">Example: </span> If you
                          are a removal company upload an image wih your van.
                        </p>
                      </div>
                    </section>

                    <section>
                      {/* row 1 */}
                      <div className="flex flex-col items-center mb-[20px] justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-start lg:space-x-[30px]">
                        {/* left */}
                        <div className="flex w-full flex-[1] flex-col  md:flex-row md:space-x-[20px] space-y-[10px] md:space-y-0 md:justify-center">
                          {/* first name */}
                          <div className="form-control w-full">
                            {/* <FormikControl
                              control="input"
                              type="text"
                              label="First Name"
                              name="firstName"
                              placeholder="First name"
                              // defaultValue={firstName}
                              required
                              className="input input-primary w-full h-[43px] mb-[5px] mt-[0px]"
                            /> */}
                            <MyTextInput
                              type="text"
                              label="First Name"
                              name="firstName"
                              placeholder="First name"
                              required
                            />
                          </div>
                        </div>
                        {/* right */}
                        <div className="flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center">
                          {/* last name */}
                          <div className="form-control w-full ">
                            <MyTextInput
                              type="text"
                              label="Last Name"
                              name="lastName"
                              placeholder="Last name"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* row 2 */}
                      <div className="flex flex-col items-center mb-[20px] justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-start lg:space-x-[30px]">
                        {/* left */}
                        <div className="flex w-full flex-[1] flex-col md:flex-row md:space-x-[20px] space-y-[10px] md:space-y-0 md:justify-center">
                          {/* Mobile* */}
                          <div className="form-control w-full flex-[1]">
                            {/* <FormikControl
                              control="input"
                              type="tel"
                              label="Mobile"
                              name="phone"
                              placeholder="Mobile number"
                              required
                              className="input input-primary w-full h-[43px] mb-[5px] mt-[0px]"
                            /> */}
                            <MyTextInput
                              type="tel"
                              label="Mobile"
                              name="phone"
                              placeholder="Mobile number"
                              required
                            />
                            <p
                              className="text-[14px] mt-[0px] link text-primary"
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
                                  If you wish to change your mobile number,
                                  please contact us and we will correct it for
                                  you.
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
                            {/* <FormikControl
                              control="input"
                              type="email"
                              label="Email"
                              name="email"
                              placeholder="Email address"
                              required
                              className="input input-primary w-full h-[43px] mb-[5px] mt-[0px]"
                            /> */}
                            <MyTextInput
                              type="email"
                              label="Email"
                              name="email"
                              placeholder="Email address"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="form-control w-full mb-[20px]">
                        {/* <FormikControl
                          control="textarea"
                          // type="email"
                          label="Address"
                          name="address"
                          placeholder="Home address"
                          required
                          className="textarea w-full textarea-primary min-h-[80px] max-h-[100px] placeholder:text-[16px] text-[15px] mb-[5px] mt-[0px]"
                        /> */}
                        <MyTextArea
                          label="Address"
                          name="address"
                          placeholder="Home address"
                          classes="min-h-[80px] max-h-[100px]"
                          // onChange={handleChange}
                          // defaultValue={address}
                          required
                        />
                      </div>

                      {/* Personal Bio */}
                      <div className="form-control w-full">
                        {/* <FormikControl
                          control="textarea"
                          // type="email"
                          label=" Personal Bio"
                          name="personalBio"
                          placeholder="Tell us about yourself and your work experience"
                          required
                          label2="(Do not include your phone number or website.)"
                          // onKeyDown={handleKeyDown}
                          // onChange={handleBioChange}
                          // value={personalBio}
                          className="textarea w-full textarea-primary min-h-[150px] max-h-[200px] placeholder:text-[16px] text-[15px] mb-[5px] mt-[0px]"
                        /> */}
                        <MyTextArea
                          label=" Personal Bio"
                          name="personalBio"
                          placeholder="Tell us about yourself and your work experience"
                          label2="(Do not include your phone number or website)"
                          classes="min-h-[150px] max-h-[200px]"
                          //   onKeyDown={handleKeyDown}
                          // onChange={handleBioChange}
                          // defaultValue={personalBio}
                          required
                        />
                        {/* <p className="text-gray-500 mb-[10px] text-[15px] mt-[0px]">
                          {personalBioCount.length} / {bioMaxLength} Characters
                        </p> */}
                      </div>
                    </section>

                    <div className=" mt-[50px] w-full flex justify-between items-end">
                      <div className="flex flex-col items-center justify-center">
                        <button
                          type="submit"
                          // disabled={!isValid || !dirty}
                          disabled={!isValid}
                          //  disabled={isSubmitting}
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
                        {error && (
                          <p className="text-[16px] text-secondary mt-[15px] w-full text-start">
                            {error}
                          </p>
                        )}
                        {success && (
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
                  </Form>
                )}
              </Formik>
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
