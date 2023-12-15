// import GenerateRandomName from "@/components/generateRandomName";
import { GenerateRandomName } from "@/components/generateRandomName";
import { adjectives, nouns } from "@/dummyData/dummyData";
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import MoverLayout from "@/layouts/MoverLayout";
import NormalLayout from "@/layouts/NormalLayout";
import {
  fetchAllBookings,
  fetchGeneratedNames,
  fetchMoverDetails3,
} from "@/lib/fetchData2";
import { getAllUserDetails } from "@/store/userSlice";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiLogOut, BiSolidPhoneCall } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { LuCalendarX2 } from "react-icons/lu";
import { FaAngleRight } from "react-icons/fa6";
import useMover from "@/hooks/useMover";
import {
  checkBookStatus,
  convertMoveDateFormat,
  trimDateFormat,
  trimDateFormats,
} from "@/utils/logics";
import Link from "next/link";
import CurrentTable from "@/components/Appointments/CurrentTable";
import CompletedTable from "@/components/Appointments/CompletedTable";
import AllTable from "@/components/Appointments/AllTable";
import useBookings from "@/hooks/useBookings";
import useMoversData from "@/hooks/useMoversData";

const Appointments = ({ allBookings }) => {
  const {
    // allBookings,
    // bookingsLoading,
    // refetchBookings,

    completedBookings,
    completedBookingsLoading,
    refetchCompletedBookings,

    completedBook,
    allBook,
  } = useBookings();

  const { personalMoverDetails, companyDetails } = useMover();

  const {
    allMoversData,
    allMoversDataLoading,
    refetchAllMoversData,
    singleMoversData,
    singleMoversDataLoading,
    refetchSingleMoversData,
    portFolioPix,
    uid,
    router,
  } = useMoversData();

  const [showTab, setShowTab] = useState("");
  const [moverBooks, setMoverBooks] = useState([]);
  const [currentMoverBooks, setCurrentMoverBooks] = useState([]);
  const [currentAcceptedMoverBooks, setCurrentAcceptedMoverBooks] = useState(
    []
  );
  const [currentPendingMoverBooks, setCurrentPendingMoverBooks] = useState([]);
  const [completedMoverBooks, setCompletedMoverBooks] = useState([]);

  useEffect(() => {
    setShowTab("1");
    const mb = completedBookings?.filter(
      (ab) => ab?.moverName === companyDetails?.generatedName
    );

    const completedMb = mb?.filter((bc) => bc.moveCarriedOut === true);

    const cMb = mb?.filter((bc) => bc.moveCarriedOut !== true);

    const currentMb = cMb?.filter((ad) => {
      const isGivenDateGreaterThanCurrent = checkBookStatus(
        ad?.moveDate,
        ad?.moverTime
      );
      return isGivenDateGreaterThanCurrent === true;
    });

    const currentAcceptedMb = currentMb?.filter(
      (bc) => bc.acceptance === "accepted"
    );

    const currentPendingMb = currentMb?.filter(
      (bc) => bc.acceptance === "pending"
    );

    setMoverBooks(mb);
    setCurrentMoverBooks(currentMb);
    setCompletedMoverBooks(completedMb);
  }, [completedBookings]);

  // console.log({ personalMoverDetails, moverBooks, allBookings, currentMoverBooks });
  // console.log({ personalMoverDetails });

  return (
    <MoverLayout>
      <Head>
        <title>Mover Profile - Appointments</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>

      {!completedBookingsLoading && (
        <div className='py-[50px] bg-white/90 min-h-[100%]'>
          <section className='mb-[40px] w-full px-[10px] md:px-[30px] '>
            <div className='flex flex-col'>
              <p className='font-bold text-[25px] mb-[20px]'>Appointments</p>
            </div>
            <div className='rounded-[10px] w-full bg-secondary/5 flex flex-col space-y-[20px] md:space-y-0 md:flex-row md:justify-between  md:items-center py-[30px] px-[20px] text-[15px]'>
              <div className='flex space-x-[20px] items-center'>
                <LuCalendarX2 className='text-secondary text-[40px] md:text-[60px]' />
                <div className='flex flex-col md:text-[18px]'>
                  <p className=''>Can't make it to your appointment?</p>
                  <p className='mt-[0px] w-full font-bold'>
                    Don't reject, reschedule!
                  </p>
                </div>
              </div>
              <div
                className='btn btn-outline btn-wide btn-secondary'
                onClick={() => window.my_modal_39.showModal()}
              >
                <span>Learn about penalties</span>
                <FaAngleRight />
              </div>
            </div>
            {/* * modal */}
            <dialog id='my_modal_39' className='modal py-[20px] px-[10px]'>
              <form method='dialog' className='modal-box '>
                <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border border-secondary text-secondary'>
                  ✕
                </button>

                <div className='w-full flex justify-center mb-[20px]'>
                  <div className='text-secondary bg-secondary/10 flex justify-center items-center w-[60px] h-[60px] rounded-full'>
                    <LuCalendarX2 className='text-[30px] text-secondary' />
                  </div>
                </div>
                <div className='w-full flex-col items-center'>
                  <h3 className='font-bold text-[22px] text-secondary px-[20px] text-center'>
                    Keep these things in mind, when cancelling appointments
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
                    that is convenient for both of you, please assure the
                    customer that MyConstructor is more likely to find them
                    another professional and then REJECT the appointment through
                    the app or this platform.
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
                    (this is registered through our systems), you will be able
                    to
                    <span className='font-bold'>
                      cancel it free of charge
                    </span>{" "}
                    with no penalties. But if you reject an appointment{" "}
                    <span className='font-bold'>
                      after these 4 hours and within 16 working hours
                    </span>{" "}
                    notice from the appointment, or simply do not attend, then{" "}
                    <span className='font-bold'>
                      30% of the value of the job
                    </span>{" "}
                    will be applied as PENALTY.
                  </p>
                </>

                <>
                  <p className='mb-[5px] text-[18px] font-bold'>
                    No attendance:
                  </p>
                  <p className='mb-[20px] text-[15px]'>
                    If you do not attend an allocated appointment,{" "}
                    <span className='font-bold'>all of your appointments</span>{" "}
                    for the same day and the next day will be{" "}
                    <span className='font-bold'>
                      removed from your account.
                    </span>{" "}
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

          <div className='mb-[30px] w-full px-[10px] md:px-[30px] '>
            <div className='flex items-center'>
              <button
                onClick={() => setShowTab("1")}
                className={`${
                  showTab === "1" &&
                  "bg-primary/10 rounded-tl-[5px] border-primary text-primary"
                } font-bold pb-[5px] pt-[10px] px-[20px] border-b-[3px] hover:bg-primary/10 duration-300 cursor-pointer`}
              >
                Current
              </button>
              <button
                onClick={() => setShowTab("2")}
                className={`${
                  showTab === "2" &&
                  "bg-primary/10  border-primary text-primary"
                } font-bold pb-[5px] pt-[10px] px-[20px] border-b-[3px] hover:bg-primary/10 duration-300 cursor-pointer`}
              >
                Completed
              </button>
              {/* <button
              onClick={() => setShowTab("3")}
              className={`${
                showTab === "3" &&
                "bg-primary/10 rounded-tr-[5px] border-primary text-primary"
              } font-bold pb-[5px] pt-[10px] px-[20px] border-b-[3px] hover:bg-primary/10 duration-300 cursor-pointer`}
            >
              All
            </button> */}
            </div>

            <div className='border rounded-tr-[30px] rounded-br-[30px] rounded-bl-[30px] overflow-x-auto w-[450px] sm:w-full overflow-hidden'>
              {showTab === "1" && (
                <CurrentTable moverBooks={currentMoverBooks} />
              )}
              {showTab === "2" && (
                <CompletedTable moverBooks={completedMoverBooks} />
              )}
              {/* {showTab === "3" && <AllTable moverBooks={moverBooks} />} */}
            </div>
          </div>
        </div>
      )}
      {completedBookingsLoading && (
        <div className='flex justify-center items-center w-full h-screen'>
          <span className='loading loading-spinner loading-lg text-primary'></span>
        </div>
      )}
    </MoverLayout>
  );
};

export default Appointments;

// export async function getServerSideProps(context) {
//   // const bookingRef = doc(db, "bookingData", id);
//   // const docSnap = await getDoc(bookingRef);

//   // const progressData = docSnap.data();

//   const bookingsData = await fetchAllBookings();

//   const filterCompleted = bookingsData?.bookings?.filter(
//     (bd) => bd.completedBook === true
//   );

//   const allBookings = [...filterCompleted]?.sort((a, b) => {
//     return new Date(b.date) - new Date(a.date);
//   });

//   // const moverBooks = allBookings?.filter((ab) => ab.name === "");

//   if (typeof bookingsData === "undefined") {
//     return {
//       props: {
//         // progressData: null,
//         allBookings: null,
//       },
//     };
//   } else {
//     return {
//       props: {
//         // progressData: progressData,
//         allBookings,
//       },
//     };
//   }
// }
