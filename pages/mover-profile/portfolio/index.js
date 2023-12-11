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
import { IoMdNotificationsOutline } from "react-icons/io";
import useMoversData from "@/hooks/useMoversData";
import { UploadMoverPortfolioPix } from "@/lib/uploadMoverPortfolioPix";

const Portfolio = () => {
  const { allMoversData, allMoversDataLoading, refetchAllMoversData } =
    useMoversData();

  const router = useRouter();
  const userDetails = useSelector(getAllUserDetails);

  const dispatch = useDispatch();
  const details = useSelector(getAllMoverDetails);

  //   const [companyBio, setCompanyBio] = useState(
  //     details.companyDetails.companyBio
  //   );
  //   const [companyName, setCompanyName] = useState(
  //     details.companyDetails.companyName
  //   );
  //   const [companyNumber, setCompanyNumber] = useState(
  //     details.companyDetails.companyNumber
  //   );
  //   const [companyAddress, setCompanyAddress] = useState(
  //     details.companyDetails.companyAddress
  //   );
  //   const [companyProfilePix, setCompanyProfilePix] = useState(null);
  //   const [companyProfilePixurl, setCompanyProfilePixurl] = useState("");
  //   const [companyProfilePixname, setCompanyProfilePixname] = useState("");

  const [portfolioPixUpload1, setPortfolioPixUpload1] = useState("");
  const [portfolioPixUploadUrl1, setPortfolioPixUploadUrl1] = useState("");
  const [portfolioPixUploadName1, setPortfolioPixUploadName1] = useState("");

  const [portfolioPixUpload2, setPortfolioPixUpload2] = useState("");
  const [portfolioPixUploadUrl2, setPortfolioPixUploadUrl2] = useState("");
  const [portfolioPixUploadName2, setPortfolioPixUploadName2] = useState("");

  const [portfolioPixUpload3, setPortfolioPixUpload3] = useState("");
  const [portfolioPixUploadUrl3, setPortfolioPixUploadUrl3] = useState("");
  const [portfolioPixUploadName3, setPortfolioPixUploadName3] = useState("");

  const [portfolioPixUpload4, setPortfolioPixUpload4] = useState("");
  const [portfolioPixUploadUrl4, setPortfolioPixUploadUrl4] = useState("");
  const [portfolioPixUploadName4, setPortfolioPixUploadName4] = useState("");

  const [portfolioPixUpload5, setPortfolioPixUpload5] = useState("");
  const [portfolioPixUploadUrl5, setPortfolioPixUploadUrl5] = useState("");
  const [portfolioPixUploadName5, setPortfolioPixUploadName5] = useState("");

  const [portfolioPixUpload6, setPortfolioPixUpload6] = useState("");
  const [portfolioPixUploadUrl6, setPortfolioPixUploadUrl6] = useState("");
  const [portfolioPixUploadName6, setPortfolioPixUploadName6] = useState("");

  const [phoneError, setPhoneError] = useState(true);
  const [submitError, setSubmitError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [activateError, setActivateError] = useState(false);
  const [reload, setReload] = useState(false);
  const [fileUploadError1, setFileUploadError1] = useState("");
  const [fileUploadError2, setFileUploadError2] = useState("");
  const [fileUploadError3, setFileUploadError3] = useState("");
  const [fileUploadError4, setFileUploadError4] = useState("");
  const [fileUploadError5, setFileUploadError5] = useState("");
  const [fileUploadError6, setFileUploadError6] = useState("");

  const uid = userDetails.userDetails?.uid;

  const documentFormSubmit = async () => {
    setActivateError(true);
    setSubmitError(false);

    if (
      (!portfolioPixUploadUrl1 &&
        !portfolioPixUploadUrl2 &&
        !portfolioPixUploadUrl3 &&
        !portfolioPixUploadUrl4 &&
        !portfolioPixUploadUrl5 &&
        !portfolioPixUploadUrl6) ||
      fileUploadError1 ||
      fileUploadError2 ||
      fileUploadError3 ||
      fileUploadError4 ||
      fileUploadError5 ||
      fileUploadError6
    ) {
      setSubmitError(true);
    } else {
      setSubmitLoading(true);

      const moveObj = {
        portfolioPixUpload1,
        portfolioPixUploadUrl1,
        portfolioPixUploadName1,
        portfolioPixUpload2,
        portfolioPixUploadUrl2,
        portfolioPixUploadName2,
        portfolioPixUpload3,
        portfolioPixUploadUrl3,
        portfolioPixUploadName3,
        portfolioPixUpload4,
        portfolioPixUploadUrl4,
        portfolioPixUploadName4,
        portfolioPixUpload5,
        portfolioPixUploadUrl5,
        portfolioPixUploadName5,
        portfolioPixUpload6,
        portfolioPixUploadUrl6,
        portfolioPixUploadName6,
        email: details.personalMoverDetails.email,
        reviewSubmit: true,
        uid,
      };

      const result = await UploadMoverPortfolioPix(moveObj);

      setReload((prev) => !prev);

      console.log(result);

      setSubmitSuccess(true);

      setSubmitLoading(false);

      // router.push("/mover-profile");
      // window.location.reload();
    }
  };

  useEffect(() => {
    if (!!allMoversData) {
      //   const allPD = allMoversData?.allPersonalDetails;
      //   const allCD = allMoversData?.allCompanyDetails;
      //   const allCDCP = allMoversData?.allCompanyPix;
      //   const allCDRC = allMoversData?.allCompanyDocs?.regCertificates;
      //   const allCDVI = allMoversData?.allCompanyDocs?.vehInsurances;
      //   const allCDPI = allMoversData?.allCompanyDocs?.pubInsurances;
      //   const allCDTI = allMoversData?.allCompanyDocs?.tranInsurances;
      //   const allCDDL = allMoversData?.allCompanyDocs?.drivingLicenses;
      const allPP1 = allMoversData?.allPortfolioPix?.portfolioPix1;
      const allPP2 = allMoversData?.allPortfolioPix?.portfolioPix2;
      const allPP3 = allMoversData?.allPortfolioPix?.portfolioPix3;
      const allPP4 = allMoversData?.allPortfolioPix?.portfolioPix4;
      const allPP5 = allMoversData?.allPortfolioPix?.portfolioPix5;
      const allPP6 = allMoversData?.allPortfolioPix?.portfolioPix6;

      const pd1 = function filterPersonalDetails() {
        return allPP1?.find((obj) => obj.uid === uid);
      };
      const pd2 = function filterPersonalDetails() {
        return allPP2?.find((obj) => obj.uid === uid);
      };
      const pd3 = function filterPersonalDetails() {
        return allPP3?.find((obj) => obj.uid === uid);
      };
      const pd4 = function filterPersonalDetails() {
        return allPP4?.find((obj) => obj.uid === uid);
      };
      const pd5 = function filterPersonalDetails() {
        return allPP5?.find((obj) => obj.uid === uid);
      };
      const pd6 = function filterPersonalDetails() {
        return allPP6?.find((obj) => obj.uid === uid);
      };

      setPortfolioPixUploadName1(pd1()?.portfolioPixUploadName1);
      setPortfolioPixUploadUrl1(pd1()?.portfolioPixUploadUrl1);

      console.log({ pd1: pd1() });
      setPortfolioPixUploadName2(pd2()?.portfolioPixUploadName2);
      setPortfolioPixUploadUrl2(pd2()?.portfolioPixUploadUrl2);
      // setFilteredCD(pd);

      setPortfolioPixUploadName3(pd3()?.portfolioPixUploadName3);
      setPortfolioPixUploadUrl3(pd3()?.portfolioPixUploadUrl3);

      setPortfolioPixUploadName4(pd4()?.portfolioPixUploadName4);
      setPortfolioPixUploadUrl4(pd4()?.portfolioPixUploadUrl4);

      setPortfolioPixUploadName5(pd5()?.portfolioPixUploadName5);
      setPortfolioPixUploadUrl5(pd5()?.portfolioPixUploadUrl5);

      setPortfolioPixUploadName6(pd6()?.portfolioPixUploadName6);
      setPortfolioPixUploadUrl6(pd6()?.portfolioPixUploadUrl6);

      //   setReload((prev) => !prev);
    }
  }, [allMoversData]);

  //   console.log({ allMoversData, reload });
  console.log({
    portfolioPixUpload1,
    portfolioPixUploadUrl1,
    portfolioPixUploadName1,
    portfolioPixUploadUrl2,
    portfolioPixUploadUrl6,
    portfolioPixUploadName6,
  });

  return (
    <MoverLayout>
      <Head>
        <title>Mover Profile - Portfolio</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>

      <main>
        <div className='bg-white/90 py-[50px] px-[30px]'>
          <section className='mb-[30px]  px-[0px] '>
            <div className='flex flex-col'>
              <p className='font-bold text-[25px] mb-[0px]'>Portfolio</p>
              <p className=''>
                Upload portfolio images to your profile and increase your hiring
                chances
              </p>
            </div>
          </section>

          {(submitSuccess || details.companyDetails.reviewSubmit) && (
            <section className='mb-[30px] px-[0px] '>
              <div className='flex items-center bg-primary/10 rounded-[10px] px-[20px] py-[15px] space-x-[20px]'>
                <IoMdNotificationsOutline className='text-primary text-[40px]' />
                <div className='flex flex-col'>
                  <p className='font-bold text-primary'>
                    Your Update has been submitted for review!
                  </p>
                </div>
              </div>
            </section>
          )}
          <div className='bg-white/70 border px-[20px] py-[30px] rounded-[10px] shadow-lg'>
            {/* mandatory text */}
            {/* <div className="flex flex-col w-full items-center  mb-[10px] mt-[20px]">
              <p className="text-secondary">
                Fields marked with * are mandatory
              </p>
            </div> */}

            {/* mandatory text */}
            <div className='flex flex-col w-full items-center  mb-[40px] mt-[0px]'>
              <p className=' text-secondary  text-[14px] mt-[10px]'>
                (Accepted file types: PNG, JPG; Maximum file size: 2MB)
              </p>
            </div>
            {/* image upload 1*/}
            <section className='mb-[30px]'>
              <div className='flex flex-col space-y-[20px] lg:space-y-0 lg:flex-row lg:space-x-[70px]'>
                {/* upload 1 */}
                <div className='flex lg:flex-[1] w-full'>
                  <div className='flex w-full flex-col'>
                    {/* image preview */}
                    <div className='flex space-x-[20px] items-center mb-[20px] w-full justify-between'>
                      <div className='flex flex-col'>
                        <p className=' font-bold text-[16px] mb-[0px]'>
                          Portfolio Image 1
                          {/* <span className="text-secondary">*</span> */}
                        </p>
                        <p className=' text-gray-400  text-[14px] mt-[0px]'>
                          Image of mover van without company name
                        </p>
                      </div>
                      {portfolioPixUploadUrl1 && !fileUploadError1 ? (
                        <div className='avatar '>
                          <div className='w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                            <img src={portfolioPixUploadUrl1} />
                          </div>
                        </div>
                      ) : (
                        <div className='avatar '>
                          <div className='w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                            <img src='/file.jpg' />
                          </div>
                        </div>
                      )}
                    </div>

                    <CustomFileInput
                      activateError={activateError}
                      previewUrl={portfolioPixUploadUrl1}
                      setPreviewUrl={setPortfolioPixUploadUrl1}
                      setImageUpload={setPortfolioPixUpload1}
                      imageUpload={portfolioPixUpload1}
                      imageName={portfolioPixUploadName1}
                      setImageName={setPortfolioPixUploadName1}
                      fileUploadError={fileUploadError1}
                      setFileUploadError={setFileUploadError1}
                      isLoading={!allMoversData}
                      // data={details.companyDetails.companyProfilePixName}
                    />
                    {fileUploadError1 && (
                      <p className=' text-secondary text-[14px] mt-[10px]'>
                        {fileUploadError1}
                      </p>
                    )}
                  </div>
                </div>
                {/* upload 2 */}
                <div className='flex lg:flex-[1] w-full'>
                  <div className='flex w-full flex-col'>
                    {/* image preview */}
                    <div className='flex space-x-[20px] items-center mb-[20px] w-full justify-between'>
                      <div className='flex flex-col'>
                        <p className=' font-bold text-[16px] mb-[0px]'>
                          Portfolio Image 2
                          {/* <span className="text-secondary">*</span> */}
                        </p>
                        <p className=' text-gray-400  text-[14px] mt-[0px]'>
                          Image of mover van without company name
                        </p>
                      </div>
                      {portfolioPixUploadUrl2 && !fileUploadError2 ? (
                        <div className='avatar '>
                          <div className='w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                            <img src={portfolioPixUploadUrl2} />
                          </div>
                        </div>
                      ) : (
                        <div className='avatar '>
                          <div className='w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                            <img src='/file.jpg' />
                          </div>
                        </div>
                      )}
                    </div>

                    <CustomFileInput
                      activateError={activateError}
                      previewUrl={portfolioPixUploadUrl2}
                      setPreviewUrl={setPortfolioPixUploadUrl2}
                      setImageUpload={setPortfolioPixUpload2}
                      imageUpload={portfolioPixUpload2}
                      imageName={portfolioPixUploadName2}
                      setImageName={setPortfolioPixUploadName2}
                      fileUploadError={fileUploadError2}
                      setFileUploadError={setFileUploadError2}
                      isLoading={!allMoversData}
                      // data={details.companyDetails.companyProfilePixName}
                    />
                    {fileUploadError2 && (
                      <p className=' text-secondary text-[14px] mt-[10px]'>
                        {fileUploadError2}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* image upload 2*/}
            <section className='mb-[30px]'>
              <div className='flex flex-col space-y-[20px] lg:space-y-0 lg:flex-row lg:space-x-[70px]'>
                {/* upload 3 */}
                <div className='flex lg:flex-[1] w-full'>
                  <div className='flex w-full flex-col'>
                    {/* image preview */}
                    <div className='flex space-x-[20px] items-center mb-[20px] w-full justify-between'>
                      <div className='flex flex-col'>
                        <p className=' font-bold text-[16px] mb-[0px]'>
                          Portfolio Image 3
                          {/* <span className="text-secondary">*</span> */}
                        </p>
                        <p className=' text-gray-400  text-[14px] mt-[0px]'>
                          Image of mover van without company name
                        </p>
                      </div>
                      {portfolioPixUploadUrl3 && !fileUploadError3 ? (
                        <div className='avatar '>
                          <div className='w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                            <img src={portfolioPixUploadUrl3} />
                          </div>
                        </div>
                      ) : (
                        <div className='avatar '>
                          <div className='w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                            <img src='/file.jpg' />
                          </div>
                        </div>
                      )}
                    </div>

                    <CustomFileInput
                      activateError={activateError}
                      previewUrl={portfolioPixUploadUrl3}
                      setPreviewUrl={setPortfolioPixUploadUrl3}
                      setImageUpload={setPortfolioPixUpload3}
                      imageUpload={portfolioPixUpload3}
                      imageName={portfolioPixUploadName3}
                      setImageName={setPortfolioPixUploadName3}
                      fileUploadError={fileUploadError3}
                      setFileUploadError={setFileUploadError3}
                      isLoading={!allMoversData}
                      // data={details.companyDetails.companyProfilePixName}
                    />
                    {fileUploadError3 && (
                      <p className=' text-secondary text-[14px] mt-[10px]'>
                        {fileUploadError3}
                      </p>
                    )}
                  </div>
                </div>
                {/* upload 4 */}
                <div className='flex lg:flex-[1] w-full'>
                  <div className='flex w-full flex-col'>
                    {/* image preview */}
                    <div className='flex space-x-[20px] items-center mb-[20px] w-full justify-between'>
                      <div className='flex flex-col'>
                        <p className=' font-bold text-[16px] mb-[0px]'>
                          Portfolio Image 4
                          {/* <span className="text-secondary">*</span> */}
                        </p>
                        <p className=' text-gray-400  text-[14px] mt-[0px]'>
                          Image of mover van without company name
                        </p>
                      </div>
                      {portfolioPixUploadUrl4 && !fileUploadError4 ? (
                        <div className='avatar '>
                          <div className='w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                            <img src={portfolioPixUploadUrl4} />
                          </div>
                        </div>
                      ) : (
                        <div className='avatar '>
                          <div className='w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                            <img src='/file.jpg' />
                          </div>
                        </div>
                      )}
                    </div>

                    <CustomFileInput
                      activateError={activateError}
                      previewUrl={portfolioPixUploadUrl4}
                      setPreviewUrl={setPortfolioPixUploadUrl4}
                      setImageUpload={setPortfolioPixUpload4}
                      imageUpload={portfolioPixUpload4}
                      imageName={portfolioPixUploadName4}
                      setImageName={setPortfolioPixUploadName4}
                      fileUploadError={fileUploadError4}
                      setFileUploadError={setFileUploadError4}
                      isLoading={!allMoversData}
                      // data={details.companyDetails.companyProfilePixName}
                    />
                    {fileUploadError4 && (
                      <p className=' text-secondary text-[14px] mt-[10px]'>
                        {fileUploadError4}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* image upload 3*/}
            <section className='mb-[30px]'>
              <div className='flex flex-col space-y-[20px] lg:space-y-0 lg:flex-row lg:space-x-[70px]'>
                {/* upload 3 */}
                <div className='flex lg:flex-[1] w-full'>
                  <div className='flex w-full flex-col'>
                    {/* image preview */}
                    <div className='flex space-x-[20px] items-center mb-[20px] w-full justify-between'>
                      <div className='flex flex-col'>
                        <p className=' font-bold text-[16px] mb-[0px]'>
                          Portfolio Image 5
                          {/* <span className="text-secondary">*</span> */}
                        </p>
                        <p className=' text-gray-400  text-[14px] mt-[0px]'>
                          Image of mover van without company name
                        </p>
                      </div>
                      {portfolioPixUploadUrl5 && !fileUploadError5 ? (
                        <div className='avatar '>
                          <div className='w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                            <img src={portfolioPixUploadUrl5} />
                          </div>
                        </div>
                      ) : (
                        <div className='avatar '>
                          <div className='w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                            <img src='/file.jpg' />
                          </div>
                        </div>
                      )}
                    </div>

                    <CustomFileInput
                      activateError={activateError}
                      previewUrl={portfolioPixUploadUrl5}
                      setPreviewUrl={setPortfolioPixUploadUrl5}
                      setImageUpload={setPortfolioPixUpload5}
                      imageUpload={portfolioPixUpload5}
                      imageName={portfolioPixUploadName5}
                      setImageName={setPortfolioPixUploadName5}
                      fileUploadError={fileUploadError5}
                      setFileUploadError={setFileUploadError5}
                      isLoading={!allMoversData}
                      // data={details.companyDetails.companyProfilePixName}
                    />
                    {fileUploadError5 && (
                      <p className=' text-secondary text-[14px] mt-[10px]'>
                        {fileUploadError5}
                      </p>
                    )}
                  </div>
                </div>
                {/* upload 4 */}
                <div className='flex lg:flex-[1] w-full'>
                  <div className='flex w-full flex-col'>
                    {/* image preview */}
                    <div className='flex space-x-[20px] items-center mb-[20px] w-full justify-between'>
                      <div className='flex flex-col'>
                        <p className=' font-bold text-[16px] mb-[0px]'>
                          Portfolio Image 6
                          {/* <span className="text-secondary">*</span> */}
                        </p>
                        <p className=' text-gray-400  text-[14px] mt-[0px]'>
                          Image of mover van without company name
                        </p>
                      </div>
                      {portfolioPixUploadUrl6 && !fileUploadError6 ? (
                        <div className='avatar '>
                          <div className='w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                            <img src={portfolioPixUploadUrl6} />
                          </div>
                        </div>
                      ) : (
                        <div className='avatar '>
                          <div className='w-[50px] h-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                            <img src='/file.jpg' />
                          </div>
                        </div>
                      )}
                    </div>

                    <CustomFileInput
                      activateError={activateError}
                      previewUrl={portfolioPixUploadUrl6}
                      setPreviewUrl={setPortfolioPixUploadUrl6}
                      setImageUpload={setPortfolioPixUpload6}
                      imageUpload={portfolioPixUpload6}
                      imageName={portfolioPixUploadName6}
                      setImageName={setPortfolioPixUploadName6}
                      fileUploadError={fileUploadError6}
                      setFileUploadError={setFileUploadError6}
                      isLoading={!allMoversData}
                      // data={details.companyDetails.companyProfilePixName}
                    />
                    {fileUploadError6 && (
                      <p className=' text-secondary text-[14px] mt-[10px]'>
                        {fileUploadError6}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* error message */}
            <div className='flex justify-center w-full'>
              {submitError && !submitSuccess && !submitLoading && (
                <p className='text-[16px] text-secondary mt-[15px]'>
                  Please review error in image upload
                </p>
              )}
              {submitSuccess && !submitError && !submitLoading && (
                <p className='text-[16px] text-primary mt-[15px]'>
                  Documentations successfully submitted.
                </p>
              )}
              {submitLoading && !submitError && !submitSuccess && (
                <p className='text-[16px] text-primary mt-[15px]'>
                  Submitting, it will take some seconds ...
                </p>
              )}
            </div>
            {/* submit button */}
            <div className='w-full flex justify-end mt-[50px]'>
              <div className='flex items-start space-x-[20px]'>
                <div className='flex flex-col items-center justify-center'>
                  <button
                    onClick={documentFormSubmit}
                    className='btn btn-secondary btn-wide  flex items-center space-x-[5px] h-[60px]'
                    disabled={submitLoading}
                  >
                    {!submitLoading && <span className=''>Submit</span>}
                    {submitLoading && (
                      <span className='loading loading-spinner loading-md text-white'></span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </MoverLayout>
  );
};

export default Portfolio;
