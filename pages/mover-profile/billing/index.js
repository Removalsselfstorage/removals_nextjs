import useMover from "@/hooks/useMover";
import MoverLayout from "@/layouts/MoverLayout";
import NormalLayout from "@/layouts/NormalLayout";
import { fetchAllBookings, fetchMoverDetails3 } from "@/lib/fetchData2";
import { getAllUserDetails } from "@/store/userSlice";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import CompletedTable from "@/components/Appointments/CompletedTable";
import { LuCalendarX2 } from "react-icons/lu";
import { FaAngleRight } from "react-icons/fa";
import { HiBanknotes } from "react-icons/hi2";

const Billing = ({ allBookings }) => {
  // const router = useRouter();
  const {
    justRegistered,
    personalMoverDetails,
    companyDetails,
    companyDocs,
    allMoverData,
    updateJustR,
    resetJustR,
    updatePersonalMover,
    resetPersonalMover,
    updateCompanyDe,
    resetCompanyDe,
    updateCompanyDo,
    resetCompanyDo,
    updateAllMoverD,
    resetAllMoverD,
    // router,
  } = useMover();

  const uid = personalMoverDetails?.uid;

  const [moverData, setMoverData] = useState({});
  const [showTab, setShowTab] = useState("");
  const [reload, setReload] = useState(false);
  const [completedMoverBooks, setCompletedMoverBooks] = useState([]);
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [sortCode, setSortCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [submitError, setSubmitError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [activateError, setActivateError] = useState(false);

  const bankDetailsSubmit = async () => {
    const moversRef = doc(db, "moversData", uid);
    setActivateError(true);
    setSubmitError(false);

    if (!bankName || !accountName || !sortCode || !accountNumber) {
      setSubmitError(true);
    } else {
      setSubmitLoading(true);

      try {
        await setDoc(
          moversRef,

          {
            bankName,
            accountName,
            sortCode,
            accountNumber,
          },
          { merge: true }
        );
        setSubmitSuccess(true);
        setSubmitLoading(false);

        setReload(true);

        console.log(
          "mover bank details acceptance update was successful @ bank details"
        );
      } catch (error) {
        console.log(error);
        setSubmitLoading(false);
        console.log(
          "mover bank details acceptance update was unsuccessful @ bank details"
        );
      }

      // const imageName = imageUpload?.name;

      // window.location.reload();
    }
  };

  useEffect(() => {
    setShowTab("1");
    const mb = allBookings?.filter(
      (ab) => ab?.moverName === companyDetails?.generatedName
    );

    const completedMb = mb?.filter((bc) => bc.moveCarriedOut === true);

    const cMb = mb?.filter((bc) => bc.moveCarriedOut !== true);

    // setMoverBooks(mb);
    // setCurrentMoverBooks(currentMb);
    setCompletedMoverBooks(completedMb);
  }, []);

  useEffect(() => {
    const getMD = async () => {
      const moverRef = doc(db, "moversData", uid);
      const docSnap = await getDoc(moverRef);
      const moverDat = docSnap.data()?.notifications;
      const moverData2 = docSnap.data();

      setBankName(moverData2?.bankName)
      setAccountName(moverData2?.accountName)
      setSortCode(moverData2?.sortCode)
      setAccountNumber(moverData2?.accountNumber)
      

      console.log({ moverData2 });

      // const sortMoverData = [...moverDat]?.sort((a, b) => {
      //   return new Date(b.date) - new Date(a.date);
      // });

      // setReadData(readD);
      // setUnreadData(unreadD);
      // setNotificationData(sortMoverData);
      setMoverData(moverData2);
    };

    getMD();
  }, [reload]);
  // console.log({ router: router.pathname });
  return (
    <MoverLayout>
      <Head>
        <title>Mover Profile - Billing</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>

      <div className='bg-white/90 py-[50px] h-full'>
        <section className='mb-[40px] w-full px-[10px] md:px-[30px] '>
          <div className='flex flex-col'>
            <p className='font-bold text-[25px] mb-[20px]'>Billing</p>
          </div>
          <div className='rounded-[10px] w-full bg-secondary/5 flex flex-col space-y-[20px] md:space-y-0 md:flex-row md:justify-between  md:items-center py-[30px] px-[20px] text-[15px]'>
            <div className='flex space-x-[20px] items-center'>
              <HiBanknotes className='text-secondary text-[40px] md:text-[60px]' />
              <div className='flex flex-col md:text-[18px]'>
                <p className=''>Keep track of the payments</p>
                <p className='mt-[0px] w-full font-bold'>
                  For your completed moves!
                </p>
              </div>
            </div>
            <div
              className='btn btn-outline btn-wide btn-secondary'
              onClick={() => window.my_modal_389.showModal()}
            >
              <span>Learn about payment</span>
              <FaAngleRight />
            </div>
          </div>
          {/* * modal */}
          <dialog id='my_modal_389' className='modal py-[20px] px-[10px]'>
            <form method='dialog' className='modal-box '>
              <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border border-secondary text-secondary'>
                ✕
              </button>

              <div className='w-full flex justify-center mb-[20px]'>
                <div className='text-secondary bg-secondary/10 flex justify-center items-center w-[60px] h-[60px] rounded-full'>
                  <HiBanknotes className='text-[30px] text-secondary' />
                </div>
              </div>
              <div className='w-full flex-col items-center'>
                <h3 className='font-bold text-[22px] text-secondary px-[20px] text-center'>
                  General information about our payment procedures
                </h3>
              </div>

              <p className='mt-[20px] mb-[20px] text-[15px]'>
                As you are solely responsible for keeping your calendar
                up-to-date at all times, we expect you to attend all
                appointments on your profile.
              </p>

              <>
                <p className='mb-[5px] text-[18px] font-bold'>
                  If you are unable to attend an appointment:
                </p>
                <p className='mb-[20px] text-[15px]'>
                  Please call the customer at the earliest opportunity to
                  <span className='font-bold'>
                    {" "}
                    reschedule for another time and update the date and time
                  </span>{" "}
                  on the appointment in the app. If you can't find a new time
                  that is convenient for both of you, please assure the customer
                  that MyConstructor is more likely to find them another
                  professional and then REJECT the appointment through the app
                  or this platform.
                </p>
              </>

              <>
                <p className='mb-[5px] text-[18px] font-bold'>
                  If you reject an appointment:
                </p>
                <p className='mb-[20px] text-[15px]'>
                  Should you reject an appointment within{" "}
                  <span className='font-bold'>
                    4 hours after you have viewed it
                  </span>{" "}
                  (this is registered through our systems), you will be able to
                  <span className='font-bold'>
                    cancel it free of charge
                  </span>{" "}
                  with no penalties. But if you reject an appointment{" "}
                  <span className='font-bold'>
                    after these 4 hours and within 16 working hours
                  </span>{" "}
                  notice from the appointment, or simply do not attend, then{" "}
                  <span className='font-bold'>30% of the value of the job</span>{" "}
                  will be applied as PENALTY.
                </p>
              </>

              <>
                <p className='mb-[5px] text-[18px] font-bold'>No attendance:</p>
                <p className='mb-[20px] text-[15px]'>
                  If you do not attend an allocated appointment,{" "}
                  <span className='font-bold'>all of your appointments</span>{" "}
                  for the same day and the next day will be{" "}
                  <span className='font-bold'>removed from your account.</span>{" "}
                  Your account with MyConstructor will temporarily{" "}
                  <span className='font-bold'>
                    be suspended and potentially deactivated.
                  </span>{" "}
                  To reactivate it you must call your account manager.
                </p>
              </>
              {/* <div className='btn btn-secondary'>
                <BiSolidPhoneCall size={20} className='' />
                <a href='tel:(800)-995-5003' className=''>
                  (800) 995-5003{" "}
                </a>
              </div> */}
            </form>
            <form method='dialog' className='modal-backdrop'>
              <button>close</button>
            </form>
          </dialog>
        </section>

        <div className='px-[10px] md:px-[30px]'>
          <div className='flex items-center w-full '>
            <button
              onClick={() => setShowTab("1")}
              className={`${
                showTab === "1" &&
                "bg-primary/10 rounded-tl-[5px] border-primary text-primary"
              } font-bold pb-[5px] pt-[10px] px-[20px] border-b-[3px] hover:bg-primary/10 duration-300 cursor-pointer`}
            >
              Completed Jobs
            </button>
            <button
              onClick={() => setShowTab("2")}
              className={`${
                showTab === "2" && "bg-primary/10  border-primary text-primary"
              } font-bold pb-[5px] pt-[10px] px-[20px] border-b-[3px] hover:bg-primary/10 duration-300 cursor-pointer`}
            >
              Bank Details
            </button>
          </div>
          <div className='border rounded-tr-[30px] min-h-full rounded-br-[30px] rounded-bl-[30px] overflow-x-auto w-[450px] sm:w-full overflow-hidden'>
            {/* {showTab === "1" && <CurrentTable moverBooks={currentMoverBooks} />} */}
            {showTab === "1" && (
              <CompletedTable moverBooks={completedMoverBooks} />
            )}

            {showTab === "2" && (
              <div className='lg:flex-[1.5] w-full bg-white/70 border px-[20px] py-[30px] rounded-[10px] shadow-lg'>
                <div className='flex flex-col space-y-[20px]'>
                  {/* row 1 */}
                  <div className='flex flex-col items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[50px]'>
                    {/* left */}
                    <div className='flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[30px] space-y-[10px] md:space-y-0 md:justify-center'>
                      {/* first name */}
                      <div className='form-control w-full'>
                        <label className='label'>
                          <span className='label-text font-semibold'>
                            Bank name
                            <span className='text-secondary'>*</span>{" "}
                            {/* <span className='text-gray-500 font-normal'>
                              (including all middle names)
                            </span> */}
                          </span>
                        </label>
                        <input
                          type='text'
                          placeholder='e.g. Standard Chartered Bank'
                          className={`${
                            activateError && !bankName
                              ? "ring ring-secondary"
                              : ""
                          } input input-primary w-full h-[43px]`}
                          onChange={(e) => setBankName(e.target.value)}
                          defaultValue={bankName}
                        />
                      </div>
                    </div>
                    {/* right */}
                    <div className='flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center'>
                      {/* last name */}
                      <div className='form-control w-full '>
                        <label className='label'>
                          <span className='label-text font-semibold'>
                            Account Holder Name
                            <span className='text-secondary'>*</span>
                          </span>
                        </label>
                        <input
                          type='text'
                          placeholder='e.g. John Francis'
                          className={`${
                            activateError && !accountName
                              ? "ring ring-secondary"
                              : ""
                          } input input-primary w-full h-[43px]`}
                          onChange={(e) => setAccountName(e.target.value)}
                          defaultValue={accountName}
                        />
                      </div>
                    </div>
                  </div>

                  {/* row 2 */}
                  <div className='flex flex-col items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[50px]'>
                    {/* left */}
                    <div className='flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[30px] space-y-[10px] md:space-y-0 md:justify-center'>
                      {/* first name */}
                      <div className='form-control w-full'>
                        <label className='label'>
                          <span className='label-text font-semibold'>
                            Sort Code<span className='text-secondary'>*</span>
                          </span>
                        </label>
                        <input
                          type='text'
                          placeholder='e.g. 012345'
                          className={`${
                            activateError && !sortCode
                              ? "ring ring-secondary"
                              : ""
                          } input input-primary w-full h-[43px]`}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            // const numericValue = Number(inputValue);

                            if (!isNaN(inputValue)) {
                              // If it's a valid number, update the state
                              setSortCode(inputValue);
                            } else if (inputValue === "") {
                              // If the input is empty, allow it and update the state
                              setSortCode("");
                            }
                            // Ignore non-numeric input
                          }}
                          value={sortCode === "" ? "" : sortCode}
                        />
                        {/* <p className="text-[14px] mt-[5px] text-gray-500">
                          Enter 6 digits without dashes or spaces
                        </p> */}
                      </div>
                    </div>
                    {/* right */}
                    <div className='flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center'>
                      {/* last name */}
                      <div className='form-control w-full '>
                        <label className='label'>
                          <span className='label-text font-semibold'>
                            Account Number
                            <span className='text-secondary'>*</span>
                          </span>
                        </label>

                        <input
                          type='text'
                          placeholder='e.g. 01234567'
                          className={`${
                            activateError && !accountNumber
                              ? "ring ring-secondary"
                              : ""
                          } input input-primary w-full h-[43px]`}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            // const numericValue = Number(inputValue);

                            if (!isNaN(inputValue)) {
                              // If it's a valid number, update the state
                              setAccountNumber(inputValue);
                            } else if (inputValue === "") {
                              // If the input is empty, allow it and update the state
                              setAccountNumber("");
                            }
                            // Ignore non-numeric input
                          }}
                          value={accountNumber === "" ? "" : accountNumber}
                        />
                        {/* <p className="text-[14px] mt-[5px] text-gray-500">
                          If you have an account number, please enter it
                        </p> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* error message */}
                <div className='flex justify-center w-full mt-[20px]'>
                  {submitError && !submitSuccess && !submitLoading && (
                    <p className='text-[16px] text-secondary mt-[15px]'>
                      Please fill all mandatory fields
                    </p>
                  )}
                  {submitSuccess && !submitError && !submitLoading && (
                    <p className='text-[16px] text-primary mt-[15px]'>
                      Bank Details successfully updated
                    </p>
                  )}
                  {submitLoading && !submitError && !submitSuccess && (
                    <p className='text-[16px] text-primary mt-[15px]'>
                      Submitting ...
                    </p>
                  )}
                </div>

                {/* submit button */}
                <div className=' mt-[50px] mb-[50px] w-full flex justify-center'>
                  <button
                    onClick={bankDetailsSubmit}
                    className='btn btn-secondary btn-wide flex items-center space-x-[5px] h-[60px]'
                    disabled={submitLoading}
                  >
                    {!submitLoading && (
                      <span className=''>Update Bank Details</span>
                    )}
                    {submitLoading && (
                      <span className='loading loading-spinner loading-md text-white'></span>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* {showTab === "3" && <AllTable moverBooks={moverBooks} />} */}
          </div>
        </div>
      </div>
    </MoverLayout>
  );
};

export default Billing;

export async function getServerSideProps(context) {
  // const bookingRef = doc(db, "bookingData", id);
  // const docSnap = await getDoc(bookingRef);

  // const progressData = docSnap.data();

  const bookingsData = await fetchAllBookings();

  const filterCompleted = bookingsData?.bookings?.filter(
    (bd) => bd.completedBook === true
  );

  const allBookings = [...filterCompleted]?.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  // const moverBooks = allBookings?.filter((ab) => ab.name === "");

  if (typeof bookingsData === "undefined") {
    return {
      props: {
        // progressData: null,
        allBookings: null,
      },
    };
  } else {
    return {
      props: {
        // progressData: progressData,
        allBookings,
      },
    };
  }
}
