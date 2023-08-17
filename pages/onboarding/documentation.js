import BookingLayout from "@/layouts/BookingLayout";
import { titleFont } from "@/utils/fonts";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
import {
  getAllMoverDetails,
  updateMoverPersonalDetails,
} from "@/store/moverSlice";
import { getAllUserDetails } from "@/store/userSlice";
import MoverLayout from "@/layouts/MoverLayout";
import MoverLayout2 from "@/layouts/MoverLayout2";
import { combineInitials } from "@/utils/logics";

const PersonalDetails = () => {
  // const { data: session } = useSession();

  const router = useRouter();
  const userDetails = useSelector(getAllUserDetails);

  const dispatch = useDispatch();
  const details = useSelector(getAllMoverDetails);

  //   states
  const [regCertificateUpload, setRegCertificateUpload] = useState(null);
  const [regCertificateUploadurl, setRegCertificateUploadurl] = useState(
    details.personalDetails.regCertificate || null
  );
  const [vehInsuranceUpload, setVehInsuranceUpload] = useState(null);
  const [vehInsuranceUploadurl, setVehInsuranceUploadurl] = useState(
    details.personalDetails.regCertificate || null
  );
  const [pubInsuranceUpload, setPubInsuranceUpload] = useState(null);
  const [pubInsuranceUploadurl, setPubInsuranceUploadurl] = useState(
    details.personalDetails.regCertificate || null
  );
  const [tranInsuranceUpload, setTranInsuranceUpload] = useState(null);
  const [tranInsuranceUploadurl, setTranInsuranceUploadurl] = useState(
    details.personalDetails.regCertificate || null
  );
  const [drivingLicenseUpload, setDrivingLicenseUpload] = useState(null);
  const [drivingLicenseUploadurl, setDrivingLicenseUploadurl] = useState(
    details.personalDetails.regCertificate || null
  );

  const [address, setAddress] = useState("");

  const [companyName, setCompanyName] = useState(
    details.personalDetails.companyName || ""
  );
  const [companyNumber, setCompanyNumber] = useState(
    details.personalDetails.companyNumber || ""
  );
  const [phoneError, setPhoneError] = useState(true);
  const [companyAddress, setCompanyAddress] = useState(
    details.personalDetails.companyAddress || ""
  );
  const [lastName, setLastName] = useState(
    details.personalDetails.lastName || ""
  );
  const [email, setEmail] = useState(details.personalDetails.email || "");
  const [emailError, setEmailError] = useState(true);
  const [phone, setPhone] = useState(details.personalDetails.telephone || "");
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

    setCompanyNumber(strippedNumber);
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

  const rchandleFileInputChange = (event) => {
    const file = event.target.files[0];
    setRegCertificateUpload(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setRegCertificateUploadurl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const vihandleFileInputChange = (event) => {
    const file = event.target.files[0];
    setVehInsuranceUpload(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setVehInsuranceUploadurl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const pihandleFileInputChange = (event) => {
    const file = event.target.files[0];
    setPubInsuranceUpload(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPubInsuranceUploadurl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const tihandleFileInputChange = (event) => {
    const file = event.target.files[0];
    setTranInsuranceUpload(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTranInsuranceUploadurl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const dlhandleFileInputChange = (event) => {
    const file = event.target.files[0];
    setDrivingLicenseUpload(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setDrivingLicenseUploadurl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const documentFormSubmit = () => {
    setActivateError(true);
    setSubmitError(false);

    if (
      !companyAddress ||
      !companyName ||
      !phoneError ||
      !companyNumber ||
      !regCertificateUploadurl ||
      !vehInsuranceUploadurl ||
      !pubInsuranceUploadurl ||
      !tranInsuranceUploadurl ||
      !drivingLicenseUploadurl
    ) {
      setSubmitError(true);
    } else {
      setSubmitLoading(true);

      dispatch(
        updateMoverPersonalDetails({
          firstName: details.personalDetails.firstName,
          lastName: details.personalDetails.lastName,
          email: details.personalDetails.email,
          phone: details.personalDetails.phone,
          address: details.personalDetails.address,
          personalBio: details.personalDetails.personalBio,
          profilePicture: details.personalDetails.profilePicture,
          companyName,
          companyNumber,
          companyAddress,
          regCertificate: regCertificateUploadurl,
          vehInsurance: vehInsuranceUploadurl,
          pubInsurance: pubInsuranceUploadurl,
          tranInsurance: tranInsuranceUploadurl,
          drivingLicense: drivingLicenseUploadurl,
        })
      );

      router.push("/mover-profile");
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
  // console.log(details);

  return (
    <MoverLayout2>
      <Head>
        <title>House Removals - Removal and Self Storage</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <main>
        {userDetails.userDetails ? (
          <div className="pb-[70px] lg:pb-[100px] pt-[70px] bg-white/80">
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
                    <li className="step step-primary px-[50px] font-bold text-[20px] leading-[25px] text-gray-300">
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
                <div className="flex flex-col w-full items-center  mb-[40px] mt-[20px]">
                  <p className="text-secondary">
                    Fields marked with * are mandatory
                  </p>
                </div>
                {/* <p className="font-bold text-[25px] mt-[20px]">
                Personal Details
              </p> */}

                {/* row 1 */}
                <div className="flex flex-col items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[50px] mb-[20px]">
                  {/* left */}
                  <div className="flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[30px] space-y-[10px] md:space-y-0 md:justify-center">
                    {/* first name */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Company Name
                          <span className="text-secondary">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Company name"
                        className={`${
                          activateError && !companyName
                            ? "ring ring-secondary"
                            : ""
                        } input input-primary w-full h-[43px]`}
                        onChange={(e) => setCompanyName(e.target.value)}
                        defaultValue={companyName}
                      />
                    </div>
                  </div>
                  {/* right */}
                  <div className="flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center">
                    {/* Telephone* */}
                    <div className="form-control w-full flex-[1]">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Company Telephone
                          <span className="text-secondary">*</span>
                        </span>
                      </label>
                      <input
                        type="tel"
                        placeholder="Company telephone"
                        className={`${
                          activateError && (!companyNumber || !phoneError)
                            ? "ring ring-secondary"
                            : ""
                        } input input-primary w-full h-[43px]`}
                        onChange={handlePhoneNumberChange}
                        defaultValue={companyNumber}
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
                <div className="form-control w-full mb-[30px]">
                  <label className="label ">
                    <span className="label-text font-semibold text-[16px]">
                      Company Address<span className="text-secondary">*</span>
                    </span>
                  </label>

                  <textarea
                    className={`${
                      activateError && !companyAddress
                        ? "ring ring-secondary"
                        : ""
                    } textarea w-full textarea-primary min-h-[80px] max-h-[100px] placeholder:text-[16px] text-[15px]`}
                    placeholder="Company address"
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    defaultValue={companyAddress}
                  ></textarea>
                </div>

                {/* mandatory text */}
                <div className="flex flex-col w-full items-center  mb-[40px] mt-[0px]">
                  <p className=" text-gray-400  text-[14px] mt-[10px]">
                    (Accepted file types: PNG, JPG; Maximum file size: 5MB)
                  </p>
                </div>

                {/* image upload 1*/}
                <section className="mb-[30px]">
                  <div className="flex flex-col space-y-[20px] lg:space-y-0 lg:flex-row lg:space-x-[70px]">
                    {/* upload 1 */}
                    <div className="flex  w-full lg:flex-[1]">
                      <div className="flex flex-col w-full">
                        {/* image preview */}
                        <div className="flex space-x-[20px] items-center mb-[20px] w-full justify-between">
                          <p className=" font-bold text-[16px] mb-[10px]">
                            Company registration certificate
                            <span className="text-secondary">*</span>
                          </p>
                          <div className="avatar ">
                            <div className="w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img
                                src={
                                  regCertificateUploadurl
                                    ? regCertificateUploadurl
                                    : "https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/thumbnails/image/file.jpg"
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* image input file */}
                        <input
                          type="file"
                          className={`${
                            activateError && !regCertificateUploadurl
                              ? "ring ring-secondary"
                              : ""
                          } file-input file-input-bordered file-input-primary w-full`}
                          accept="image/png, image/gif, image/jpeg"
                          onChange={rchandleFileInputChange}
                          value={regCertificateUpload}
                        />
                      </div>
                    </div>
                    {/* upload 2 */}
                    <div className="flex w-full  lg:flex-[1]">
                      <div className="flex flex-col w-full">
                        {/* image preview */}
                        <div className="flex space-x-[20px] items-center mb-[20px] w-full justify-between">
                          <p className=" font-bold text-[16px] mb-[10px]">
                            Vehicle insurance
                            <span className="text-secondary">*</span>
                          </p>
                          <div className="avatar ">
                            <div className="w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img
                                src={
                                  vehInsuranceUploadurl
                                    ? vehInsuranceUploadurl
                                    : "https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/thumbnails/image/file.jpg"
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* image input file */}
                        <input
                          type="file"
                          className={`${
                            activateError && !vehInsuranceUploadurl
                              ? "ring ring-secondary"
                              : ""
                          } file-input file-input-bordered file-input-primary w-full`}
                          accept="image/png, image/gif, image/jpeg"
                          onChange={vihandleFileInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* image upload 2*/}
                <section className="mb-[30px]">
                  <div className="flex flex-col space-y-[20px] lg:space-y-0 lg:flex-row lg:space-x-[70px]">
                    {/* upload 1 */}
                    <div className="flex  w-full lg:flex-[1]">
                      <div className="flex flex-col w-full">
                        {/* image preview */}
                        <div className="flex space-x-[20px] items-center mb-[20px] w-full justify-between">
                          <p className=" font-bold text-[16px] mb-[10px]">
                            Public Liability Insurance
                            <span className="text-secondary">*</span>
                          </p>
                          <div className="avatar ">
                            <div className="w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img
                                src={
                                  pubInsuranceUploadurl
                                    ? pubInsuranceUploadurl
                                    : "https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/thumbnails/image/file.jpg"
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* image input file */}
                        <input
                          type="file"
                          className={`${
                            activateError && !pubInsuranceUploadurl
                              ? "ring ring-secondary"
                              : ""
                          } file-input file-input-bordered file-input-primary w-full`}
                          accept="image/png, image/gif, image/jpeg"
                          onChange={pihandleFileInputChange}
                          // defaultValue={}
                        />
                      </div>
                    </div>
                    {/* upload 2 */}
                    <div className="flex w-full  lg:flex-[1]">
                      <div className="flex w-full flex-col">
                        {/* image preview */}
                        <div className="flex space-x-[20px] items-center mb-[20px] w-full justify-between">
                          <p className=" font-bold text-[16px] mb-[10px]">
                            Goods-in-transit Insurance
                            <span className="text-secondary">*</span>
                          </p>
                          <div className="avatar ">
                            <div className="w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img
                                src={
                                  tranInsuranceUploadurl
                                    ? tranInsuranceUploadurl
                                    : "https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/thumbnails/image/file.jpg"
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* image input file */}
                        <input
                          type="file"
                          className={`${
                            activateError && !tranInsuranceUploadurl
                              ? "ring ring-secondary"
                              : ""
                          } file-input file-input-bordered file-input-primary w-full`}
                          accept="image/png, image/gif, image/jpeg"
                          onChange={tihandleFileInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* image upload 3*/}
                <section className="mb-[30px]">
                  <div className="flex flex-col space-y-[20px] lg:space-y-0 lg:flex-row lg:space-x-[70px]">
                    {/* upload 1 */}
                    <div className="flex lg:flex-[1] w-full">
                      <div className="flex w-full flex-col">
                        {/* image preview */}
                        <div className="flex space-x-[20px] items-center mb-[20px] w-full justify-between">
                          <p className=" font-bold text-[16px] mb-[10px]">
                            Driving Licence
                            <span className="text-secondary">*</span>
                          </p>
                          <div className="avatar ">
                            <div className="w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img
                                src={
                                  drivingLicenseUploadurl
                                    ? drivingLicenseUploadurl
                                    : "https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/thumbnails/image/file.jpg"
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* image input file */}
                        <input
                          type="file"
                          className={`${
                            activateError && !drivingLicenseUploadurl
                              ? "ring ring-secondary"
                              : ""
                          } file-input file-input-bordered file-input-primary w-full`}
                          accept="image/png, image/gif, image/jpeg"
                          onChange={dlhandleFileInputChange}
                        />
                      </div>
                    </div>
                    <div className="flex lg:flex-[1]"></div>
                  </div>
                </section>

                {/* error message */}
                <div className="flex justify-center w-full">
                  {submitError && (
                    <p className="text-[16px] text-secondary mt-[15px]">
                      Please fill all mandatory fields
                    </p>
                  )}
                </div>

                {/* submit button */}
                <div className="w-full flex justify-end mt-[50px]">
                  <div className="flex items-start space-x-[20px]">
                    <div className="flex flex-col items-center justify-center">
                      <Link
                        href="/onboarding/personal-details"
                        // onClick={documentFormSubmit}
                        className="btn btn-secondary w-[150px] flex items-center space-x-[5px] h-[60px]"
                      >
                        <span className="">
                          <AiOutlineLeft className="text-[20px]" />
                        </span>
                        <span className="">Previous</span>
                      </Link>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <button
                        onClick={documentFormSubmit}
                        className="btn btn-secondary w-[150px] flex items-center space-x-[5px] h-[60px]"
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
