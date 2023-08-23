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

import { redirect, useRouter } from "next/navigation";
import {
  getAllMoverDetails,
  updateCompanyDetails,
  updateCompanyDocs,
  updateFirebaseCompanyPix,
  updateFirebaseDrivingLicense,
  updateFirebaseMoverDetails,
  updateFirebaseMoverDoc,
  updateFirebaseMoverDocumentation,
  updateFirebasePubInsurance,
  updateFirebaseRegCertificate,
  updateFirebaseTranInsurance,
  updateFirebaseVehInsurance,
  updateMoverPersonalDetails,
} from "@/store/moverSlice";
import { getAllUserDetails } from "@/store/userSlice";
import MoverLayout from "@/layouts/MoverLayout";
import MoverLayout2 from "@/layouts/MoverLayout2";
import { combineInitials } from "@/utils/logics";
import CustomFileInput from "@/components/Inputs/CustomFileInput";
import {
  fetchMoverDetails3,
  fetchMoverDetails4,
  fetchMoversCompanyPix,
  fetchMoversDetails,
  fetchMoversDrivingLicense,
  fetchMoversPubInsurance,
  fetchMoversRegCertificate,
  fetchMoversTranInsurance,
  fetchMoversVehInsurance,
} from "@/lib/fetchData2";
import { UploadMoverDocumentation } from "@/lib/uploadMoverDocumentation";

const PersonalDetails = () => {
  // const { data: session } = useSession();

  const router = useRouter();
  const userDetails = useSelector(getAllUserDetails);

  const dispatch = useDispatch();
  const details = useSelector(getAllMoverDetails);

  //   states
  const [companyBio, setCompanyBio] = useState(
    details.companyDetails.companyBio
  );
  const [companyName, setCompanyName] = useState(
    details.companyDetails.companyName
  );
  const [companyNumber, setCompanyNumber] = useState(
    details.companyDetails.companyNumber
  );
  const [companyAddress, setCompanyAddress] = useState(
    details.companyDetails.companyAddress
  );
  const [companyProfilePix, setCompanyProfilePix] = useState(
    details.companyDetails.companyProfilePix?.raw
  );
  const [companyProfilePixurl, setCompanyProfilePixurl] = useState(
    details.companyDetails.companyProfilePix?.url
  );
  const [regCertificateUpload, setRegCertificateUpload] = useState(
    details.companyDocs.regCertificate?.raw
  );
  const [regCertificateUploadurl, setRegCertificateUploadurl] = useState(
    details.companyDocs.regCertificate?.url
  );
  const [vehInsuranceUpload, setVehInsuranceUpload] = useState(
    details.companyDocs.vehInsurance?.raw
  );
  const [vehInsuranceUploadurl, setVehInsuranceUploadurl] = useState(
    details.companyDocs.vehInsurance?.url
  );
  const [pubInsuranceUpload, setPubInsuranceUpload] = useState(
    details.companyDocs.pubInsurance?.raw || null
  );
  const [pubInsuranceUploadurl, setPubInsuranceUploadurl] = useState(
    details.companyDocs.pubInsurance?.url
  );
  const [tranInsuranceUpload, setTranInsuranceUpload] = useState(
    details.companyDocs.tranInsurance?.raw
  );
  const [tranInsuranceUploadurl, setTranInsuranceUploadurl] = useState(
    details.companyDocs.tranInsurance?.url
  );
  const [drivingLicenseUpload, setDrivingLicenseUpload] = useState(
    details.companyDocs.drivingLicense?.raw
  );
  const [drivingLicenseUploadurl, setDrivingLicenseUploadurl] = useState(
    details.companyDocs.drivingLicense?.url
  );

  const [phoneError, setPhoneError] = useState(true);
  const [submitError, setSubmitError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [activateError, setActivateError] = useState(false);
  const [fileUploadErrorCP, setFileUploadErrorCP] = useState("");
  const [fileUploadErrorRC, setFileUploadErrorRC] = useState("");
  const [fileUploadErrorVI, setFileUploadErrorVI] = useState("");
  const [fileUploadErrorPI, setFileUploadErrorPI] = useState("");
  const [fileUploadErrorTI, setFileUploadErrorTI] = useState("");
  const [fileUploadErrorDL, setFileUploadErrorDL] = useState("");

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

  const bioMaxLength = 500;
  const handleBioChange = (e) => {
    const value = e.target.value;
    // setcompanyBio(e.target.value);
    if (value.length <= bioMaxLength) {
      setCompanyBio(e.target.value);
    }
    // const { name, value } = e.target;
    // setMoverDetails({ ...moverDetails, [name]: value });
  };

  const handleKeyDown = (event) => {
    if (companyBio?.length >= bioMaxLength && event.key !== "Backspace") {
      event.preventDefault(); // Prevent typing more characters
    }
  };

  const uid = userDetails.userDetails?.uid;

  // const readMoversData = async () => {
  //   const res1 = await fetchMoversDetails(uid);
  //   const res2 = await fetchMoversCompanyPix(uid);
  //   const res3 = await fetchMoversRegCertificate(uid);
  //   const res4 = await fetchMoversVehInsurance(uid);
  //   const res5 = await fetchMoversPubInsurance(uid);
  //   const res6 = await fetchMoversTranInsurance(uid);
  //   const res7 = await fetchMoversDrivingLicense(uid);
  //   dispatch(updateFirebaseMoverDoc(res1));
  //   dispatch(updateFirebaseCompanyPix(res2));
  //   dispatch(updateFirebaseRegCertificate(res3));
  //   dispatch(updateFirebaseVehInsurance(res4));
  //   dispatch(updateFirebasePubInsurance(res5));
  //   dispatch(updateFirebaseTranInsurance(res6));
  //   dispatch(updateFirebaseDrivingLicense(res7));
  // };

  const documentFormSubmit = async () => {
    setActivateError(true);
    setSubmitError(false);

    if (
      !companyAddress ||
      !companyName ||
      !phoneError ||
      !companyNumber ||
      !companyProfilePixurl ||
      !regCertificateUploadurl ||
      !vehInsuranceUploadurl ||
      !pubInsuranceUploadurl ||
      !tranInsuranceUploadurl ||
      fileUploadErrorCP ||
      fileUploadErrorRC ||
      fileUploadErrorVI ||
      fileUploadErrorPI ||
      fileUploadErrorTI ||
      fileUploadErrorDL ||
      !drivingLicenseUploadurl
    ) {
      setSubmitError(true);
    } else {
      setSubmitLoading(true);

      const moveObj = {
        companyName,
        companyNumber,
        generatedName: details.companyDetails.generatedName,
        companyAddress,
        companyBio,
        companyProfilePix: {
          raw: companyProfilePix,
          url: companyProfilePixurl,
          name: companyProfilePix?.name,
        },
        regCertificate: {
          raw: regCertificateUpload,
          url: regCertificateUploadurl,
          name: regCertificateUpload?.name,
        },
        vehInsurance: {
          raw: vehInsuranceUpload,
          url: vehInsuranceUploadurl,
          name: vehInsuranceUpload?.name,
        },
        pubInsurance: {
          raw: pubInsuranceUpload,
          url: pubInsuranceUploadurl,
          name: pubInsuranceUpload?.name,
        },
        pubInsurance: {
          raw: pubInsuranceUpload,
          url: pubInsuranceUploadurl,
          name: pubInsuranceUpload?.name,
        },
        tranInsurance: {
          raw: tranInsuranceUpload,
          url: tranInsuranceUploadurl,
          name: tranInsuranceUpload?.name,
        },
        drivingLicense: {
          raw: drivingLicenseUpload,
          url: drivingLicenseUploadurl,
          name: drivingLicenseUpload?.name,
        },
        email: details.personalDetails.email,
        reviewSubmit: true,
        uid,
      };

      const result = await UploadMoverDocumentation(moveObj);
      console.log(result);

      dispatch(
        updateCompanyDetails({
          companyName,
          generatedName: details.companyDetails.generatedName,
          companyNumber,
          companyAddress,
          companyBio,
          companyProfilePix: {
            raw: companyProfilePix,
            url: companyProfilePixurl,
            name: companyProfilePix.name,
          },
          reviewSubmit: false,
        })
      );

      dispatch(
        updateCompanyDocs({
          regCertificate: {
            raw: regCertificateUpload,
            url: regCertificateUploadurl,
            name: regCertificateUpload.name,
          },
          // vehInsurance: vehInsuranceUploadurl,
          vehInsurance: {
            raw: vehInsuranceUpload,
            url: vehInsuranceUploadurl,
            name: vehInsuranceUpload.name,
          },
          // pubInsurance: pubInsuranceUploadurl,
          pubInsurance: {
            raw: pubInsuranceUpload,
            url: pubInsuranceUploadurl,
            name: pubInsuranceUpload.name,
          },
          // tranInsurance: tranInsuranceUploadurl,
          tranInsurance: {
            raw: tranInsuranceUpload,
            url: tranInsuranceUploadurl,
            name: tranInsuranceUpload.name,
          },
          // drivingLicense: drivingLicenseUploadurl,
          drivingLicense: {
            raw: drivingLicenseUpload,
            url: drivingLicenseUploadurl,
            name: drivingLicenseUpload.name,
          },
        })
      );

      // dispatch(
      //   updateMoverPersonalDetails({
      //     firstName: details.personalDetails.firstName,
      //     lastName: details.personalDetails.lastName,
      //     email: details.personalDetails.email,
      //     phone: details.personalDetails.phone,
      //     address: details.personalDetails.address,
      //     profilePicture: details.personalDetails.profilePicture,
      //     companyName,
      //     companyNumber,
      //     companyAddress,
      //     companyBio,
      //     companyProfilePix: {
      //       raw: companyProfilePix,
      //       url: companyProfilePixurl,
      //       name: companyProfilePix?.name,
      //     },
      //     // regCertificate: regCertificateUploadurl,
      //     regCertificate: {
      //       raw: regCertificateUpload,
      //       url: regCertificateUploadurl,
      //       name: regCertificateUpload?.name,
      //     },
      //     // vehInsurance: vehInsuranceUploadurl,
      //     vehInsurance: {
      //       raw: vehInsuranceUpload,
      //       url: vehInsuranceUploadurl,
      //       name: vehInsuranceUpload?.name,
      //     },
      //     // pubInsurance: pubInsuranceUploadurl,
      //     pubInsurance: {
      //       raw: pubInsuranceUpload,
      //       url: pubInsuranceUploadurl,
      //       name: pubInsuranceUpload?.name,
      //     },
      //     // tranInsurance: tranInsuranceUploadurl,
      //     tranInsurance: {
      //       raw: tranInsuranceUpload,
      //       url: tranInsuranceUploadurl,
      //       name: tranInsuranceUpload?.name,
      //     },
      //     // drivingLicense: drivingLicenseUploadurl,
      //     drivingLicense: {
      //       raw: drivingLicenseUpload,
      //       url: drivingLicenseUploadurl,
      //       name: drivingLicenseUpload?.name,
      //     },
      //   })
      // );
      // readMoversData();

      setSubmitSuccess(true);

      setSubmitLoading(false);

      // router.push("/mover-profile");
      setTimeout(() => {
        // router.push("/onboarding/personal-details");
        router.push("/mover-profile/dashboard");
      }, 1500);
    }
  };

  // useEffect(() => {
  //   if (!userDetails.userDetails) {
  //     router.push("/");
  //   }
  // }, []);

  //   console.log(details.moveDetails.moveDate);
  //   console.log(dateValue);
  // console.log(details);

  return (
    <MoverLayout2>
      <Head>
        <title>House Removals - Removal and Self Storage</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <main>
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

              {/* Company Bio */}
              <div className="form-control w-full">
                <div className=" ">
                  <span className="label-text font-semibold text-[16px]">
                    Company Bio<span className="text-secondary">*</span>
                  </span>
                </div>
                <p className="text-gray-500 mb-[10px] text-[15px] mt-[5px]">
                  (Do not include your phone number or website.)
                </p>

                <textarea
                  className={`${
                    activateError && !companyBio ? "ring ring-secondary" : ""
                  } textarea w-full textarea-primary min-h-[150px] max-h-[200px] placeholder:text-[16px] text-[15px]`}
                  placeholder="Tell us about yourself and your work experience"
                  onChange={handleBioChange}
                  value={companyBio}
                  // disabled={companyBio.length >= bioMaxLength}
                  onKeyDown={handleKeyDown}
                ></textarea>
                <p className="text-gray-500 mb-[10px] text-[15px] mt-[5px]">
                  {companyBio?.length} / {bioMaxLength} Characters
                </p>
              </div>

              {/* mandatory text */}
              <div className="flex flex-col w-full items-center  mb-[40px] mt-[0px]">
                <p className=" text-gray-400  text-[14px] mt-[10px]">
                  (Accepted file types: PNG, JPG; Maximum file size: 3MB)
                </p>
              </div>

              {/* image upload 1*/}
              <section className="mb-[30px]">
                <div className="flex flex-col space-y-[20px] lg:space-y-0 lg:flex-row lg:space-x-[70px]">
                  {/* upload 1 */}
                  <div className="flex lg:flex-[1] w-full">
                    <div className="flex w-full flex-col">
                      {/* image preview */}
                      <div className="flex space-x-[20px] items-center mb-[20px] w-full justify-between">
                        <div className="flex flex-col">
                          <p className=" font-bold text-[16px] mb-[0px]">
                            Company Profile Image
                            <span className="text-secondary">*</span>
                          </p>
                          <p className=" text-gray-400  text-[14px] mt-[0px]">
                            Image of mover van without company name
                          </p>
                        </div>
                        {companyProfilePixurl && !fileUploadErrorCP ? (
                          <div className="avatar ">
                            <div className="w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img src={companyProfilePixurl} />
                            </div>
                          </div>
                        ) : (
                          <div className="avatar ">
                            <div className="w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img src="/file.jpg" />
                            </div>
                          </div>
                        )}
                      </div>
                      {/* image input file */}
                      {/* <input
                          type="file"
                          className={`${
                            activateError && !drivingLicenseUploadurl
                              ? "ring ring-secondary"
                              : ""
                          } file-input file-input-bordered file-input-primary w-full`}
                          accept="image/png, image/gif, image/jpeg"
                          onChange={dlhandleFileInputChange}
                        /> */}
                      <CustomFileInput
                        activateError={activateError}
                        previewUrl={companyProfilePixurl}
                        setPreviewUrl={setCompanyProfilePixurl}
                        setImageUpload={setCompanyProfilePix}
                        imageUpload={companyProfilePix}
                        fileUploadError={fileUploadErrorCP}
                        setFileUploadError={setFileUploadErrorCP}
                        data={details}
                      />

                      {fileUploadErrorCP && (
                        <p className=" text-secondary text-[14px] mt-[10px]">
                          {fileUploadErrorCP}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* upload 2 */}
                  <div className="flex lg:flex-[1] w-full">
                    <div className="flex w-full flex-col">
                      {/* image preview */}
                      <div className="flex space-x-[20px] items-center mb-[20px] w-full justify-between">
                        <p className=" font-bold text-[16px] mb-[10px]">
                          Driving Licence
                          <span className="text-secondary">*</span>
                        </p>
                        {drivingLicenseUploadurl && !fileUploadErrorDL ? (
                          <div className="avatar ">
                            <div className="w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img src={drivingLicenseUploadurl} />
                            </div>
                          </div>
                        ) : (
                          <div className="avatar ">
                            <div className="w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img src="/file.jpg" />
                            </div>
                          </div>
                        )}
                      </div>
                      {/* image input file */}
                      <CustomFileInput
                        activateError={activateError}
                        imageUpload={drivingLicenseUpload}
                        setImageUpload={setDrivingLicenseUpload}
                        previewUrl={drivingLicenseUploadurl}
                        setPreviewUrl={setDrivingLicenseUploadurl}
                        fileUploadError={fileUploadErrorDL}
                        setFileUploadError={setFileUploadErrorDL}
                        data={details}
                      />

                      {fileUploadErrorDL && (
                        <p className=" text-secondary text-[14px] mt-[10px]">
                          {fileUploadErrorDL}
                        </p>
                      )}
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
                          Company registration certificate
                          <span className="text-secondary">*</span>
                        </p>
                        {regCertificateUploadurl && !fileUploadErrorRC ? (
                          <div className="avatar ">
                            <div className="w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img src={regCertificateUploadurl} />
                            </div>
                          </div>
                        ) : (
                          <div className="avatar ">
                            <div className="w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img src="/file.jpg" />
                            </div>
                          </div>
                        )}
                      </div>
                      {/* image input file */}
                      <CustomFileInput
                        activateError={activateError}
                        imageUpload={regCertificateUpload}
                        setImageUpload={setRegCertificateUpload}
                        previewUrl={regCertificateUploadurl}
                        setPreviewUrl={setRegCertificateUploadurl}
                        fileUploadError={fileUploadErrorRC}
                        setFileUploadError={setFileUploadErrorRC}
                        data={details}
                      />
                      {fileUploadErrorRC && (
                        <p className=" text-secondary text-[14px] mt-[10px]">
                          {fileUploadErrorRC}
                        </p>
                      )}
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
                        {vehInsuranceUploadurl && !fileUploadErrorVI ? (
                          <div className="avatar ">
                            <div className="w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img src={vehInsuranceUploadurl} />
                            </div>
                          </div>
                        ) : (
                          <div className="avatar ">
                            <div className="w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img src="/file.jpg" />
                            </div>
                          </div>
                        )}
                      </div>
                      {/* image input file */}
                      <CustomFileInput
                        activateError={activateError}
                        imageUpload={vehInsuranceUpload}
                        setImageUpload={setVehInsuranceUpload}
                        previewUrl={vehInsuranceUploadurl}
                        setPreviewUrl={setVehInsuranceUploadurl}
                        fileUploadError={fileUploadErrorVI}
                        setFileUploadError={setFileUploadErrorVI}
                        data={details}
                      />
                      {fileUploadErrorVI && (
                        <p className=" text-secondary text-[14px] mt-[10px]">
                          {fileUploadErrorVI}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* image upload 3*/}
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
                        {pubInsuranceUploadurl && !fileUploadErrorPI ? (
                          <div className="avatar ">
                            <div className="w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img src={pubInsuranceUploadurl} />
                            </div>
                          </div>
                        ) : (
                          <div className="avatar ">
                            <div className="w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img src="/file.jpg" />
                            </div>
                          </div>
                        )}
                      </div>
                      {/* image input file */}
                      <CustomFileInput
                        activateError={activateError}
                        imageUpload={pubInsuranceUpload}
                        setImageUpload={setPubInsuranceUpload}
                        previewUrl={pubInsuranceUploadurl}
                        setPreviewUrl={setPubInsuranceUploadurl}
                        fileUploadError={fileUploadErrorPI}
                        setFileUploadError={setFileUploadErrorPI}
                        data={details}
                      />
                      {fileUploadErrorPI && (
                        <p className=" text-secondary text-[14px] mt-[10px]">
                          {fileUploadErrorPI}
                        </p>
                      )}
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
                        {tranInsuranceUploadurl && !fileUploadErrorTI ? (
                          <div className="avatar ">
                            <div className="w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img src={tranInsuranceUploadurl} />
                            </div>
                          </div>
                        ) : (
                          <div className="avatar ">
                            <div className="w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img src="/file.jpg" />
                            </div>
                          </div>
                        )}
                      </div>
                      {/* image input file */}
                      <CustomFileInput
                        activateError={activateError}
                        imageUpload={tranInsuranceUpload}
                        setImageUpload={setTranInsuranceUpload}
                        previewUrl={tranInsuranceUploadurl}
                        setPreviewUrl={setTranInsuranceUploadurl}
                        fileUploadError={fileUploadErrorTI}
                        setFileUploadError={setFileUploadErrorTI}
                        data={details}
                      />
                      {fileUploadErrorTI && (
                        <p className=" text-secondary text-[14px] mt-[10px]">
                          {fileUploadErrorTI}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* error message */}
              <div className="flex justify-center w-full">
                {submitError && !submitSuccess && !submitLoading && (
                  <p className="text-[16px] text-secondary mt-[15px]">
                    Please fill all mandatory fields
                  </p>
                )}
                {submitSuccess && !submitError && !submitLoading && (
                  <p className="text-[16px] text-primary mt-[15px]">
                    Documentations successfully submitted
                  </p>
                )}
                {submitLoading && !submitError && !submitSuccess && (
                  <p className="text-[16px] text-primary mt-[15px]">
                    Submitting ...
                  </p>
                )}
              </div>

              {/* submit button */}
              <div className="w-full flex justify-end mt-[50px]">
                <div className="flex items-start space-x-[20px]">
                  <div className="flex flex-col items-center justify-center">
                    <Link href="/onboarding/personal-details">
                      <button
                        className="btn btn-secondary w-[150px] flex items-center space-x-[5px] h-[60px]"
                        disabled={submitLoading}
                      >
                        <span className="">
                          <AiOutlineLeft className="text-[20px]" />
                        </span>
                        <span className="">Previous</span>
                      </button>
                    </Link>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <button
                      onClick={documentFormSubmit}
                      className="btn btn-secondary w-[150px] flex items-center space-x-[5px] h-[60px]"
                      disabled={submitLoading}
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
      </main>
    </MoverLayout2>
  );
};

export default PersonalDetails;

// CompleteHouse.requireAuth = true;

// export async function getServerSideProps() {
//   // const csrfToken = await getCsrfToken(context);
//   const res1 = await fetchMoversDetails(uid);
//   const res2 = await fetchMoversCompanyPix(uid);
//   const res3 = await fetchMoversRegCertificate(uid);
//   const res4 = await fetchMoversVehInsurance(uid);
//   const res5 = await fetchMoversPubInsurance(uid);
//   const res6 = await fetchMoversTranInsurance(uid);
//   const res7 = await fetchMoversDrivingLicense(uid);

//   return {
//     props: {
//       providers,
//       csrfToken,
//       // callbackUrl,
//     },
//   };
// }
