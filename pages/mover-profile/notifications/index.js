import MoverLayout from "@/layouts/MoverLayout";
import NormalLayout from "@/layouts/NormalLayout";
import { getAllUserDetails } from "@/store/userSlice";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import useMover from "@/hooks/useMover";
import TimeAgo from "react-timeago";
import { GiTrophyCup } from "react-icons/gi";
import { MdNotificationsActive } from "react-icons/md";
import { combineInitials, trimToFirstLetter } from "@/utils/logics";
import { IoIosAlert } from "react-icons/io";

const Inbox = () => {
  const router = useRouter();
  const userDetails = useSelector(getAllUserDetails);

  const [notificationData, setNotificationData] = useState([]);
  const [readData, setReadData] = useState([]);
  const [unreadData, setUnreadData] = useState([]);
  const [moverData, setMoverData] = useState({});
  const [showTab, setShowTab] = useState("");
  const [reload, setReload] = useState(false);
  const [modalData, setModalData] = useState({});

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

  const filterOutNotification = () => {
    moverData?.notifications?.filter((md) => md);
  };

  const updateMoverNotif = async (data) => {
    const moversRef = doc(db, "moversData", uid);

    if (data?.status === "read") return;

    const newMoveData = moverData?.notifications?.filter(
      (md) => md.date !== data.date
    );

    console.log({ newMoveData });

    try {
      await setDoc(
        moversRef,

        {
          // approvalStatus: `${approvedAccount ? "APPROVED" : "UNAPPROVED"}`,
          notifications: [
            ...newMoveData,
            {
              subject: data?.subject,
              date: data?.date,
              message: data?.message,
              // createdAt: serverTimestamp(),
              sender: data?.sender,
              status: "read",
            },
          ],
          // lastNotificationId: "",
        },
        { merge: true }
      );

      setReload(true);

      console.log("mover notification update was successful @ notification");
    } catch (error) {
      console.log(error);
      console.log("mover notification update was unsuccessful @ notification");
    }
  };

  useEffect(() => {
    setShowTab("1");
  }, []);

  useEffect(() => {
    const getMD = async () => {
      const bookingRef = doc(db, "moversData", uid);
      const docSnap = await getDoc(bookingRef);
      const moverDat = docSnap.data()?.notifications;
      const moverData2 = docSnap.data();

      const sortMoverData = [...moverDat]?.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });

      const readD = sortMoverData?.filter((sm) => sm.status === "read");
      const unreadD = sortMoverData?.filter((sm) => sm.status === "unread");

      setReadData(readD);
      setUnreadData(unreadD);
      setNotificationData(sortMoverData);
      setMoverData(moverData2);
    };

    getMD();
  }, [reload]);

  console.log({ moverData, notificationData, modalData });

  return (
    <MoverLayout reload={reload}>
      <Head>
        <title>Mover Profile - Inbox</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>

      <div className='py-[50px] bg-white/90 min-h-[100%] w-full'>
        <section className='mb-[20px] w-full px-[10px] md:px-[30px] '>
          <div className='flex flex-col'>
            <p className='font-bold text-[25px] mb-[0px]'>Notification</p>
            <p className=''>
              Keep track of all admin activities on your account.
            </p>
          </div>
        </section>

        <div className=' flex flex-col-reverse  xl:space-y-0 xl:flex-row xl:space-x-[20px] mx-[10px] md:mx-[30px]'>
          <div className='w-full bg-white/70 border px-[20px] py-[30px] rounded-[10px] shadow-lg'>
            <div className='flex items-center w-full'>
              <button
                onClick={() => setShowTab("1")}
                className={`${
                  showTab === "1" &&
                  "bg-primary/10 rounded-tl-[5px] border-primary text-primary"
                } font-bold pb-[5px] pt-[10px] px-[20px] border-b-[3px] hover:bg-primary/10 duration-300 cursor-pointer`}
              >
                Unread
              </button>
              <button
                onClick={() => setShowTab("2")}
                className={`${
                  showTab === "2" &&
                  "bg-primary/10  border-primary text-primary"
                } font-bold pb-[5px] pt-[10px] px-[20px] border-b-[3px] hover:bg-primary/10 duration-300 cursor-pointer`}
              >
                Read
              </button>
            </div>
            {showTab === "1" && unreadData?.length > 0 && (
              <div className='overflow-y-auto w-full pt-[20px] overflow-x-none h-[100vh] xl:h-[90vh] scrollbar-track-primary/10 scrollbar-thumb-primary/90 scrollbar-thin overflow-hidden  '>
                {unreadData?.map((ms) => {
                  const dateObject = new Date(ms.date);

                  return (
                    <div
                      className={`w-full flex flex-col cursor-pointer hover:scale-[1.02] duration-300`}
                      key={ms.date}
                    >
                      <div
                        onClick={() => {
                          setModalData(ms);
                          window.my_modal_49.showModal();
                          updateMoverNotif(ms);
                        }}
                        className='flex items-center md:space-x-[20px] w-full px-[20px] md:px-[40px]'
                      >
                        <div className='avatar placeholder hidden md:flex'>
                          <div className='bg-secondary rounded-full w-[80px] h-[80px]'>
                            <span className='text-5xl font-bold text-white'>
                              {trimToFirstLetter(ms.sender)}
                              {/* A */}
                            </span>
                          </div>
                        </div>
                        <div
                          className={`  bg-secondary/5 flex items-center justify-between rounded-[20px] py-[20px] min-w-[300px] w-full my-[10px] rounded-bl-[20px] rounded-br-[20px] shadow-lg  px-[20px] md:px-[30px]`}
                        >
                          <div className='w-full'>
                            <p className='font-bold mb-[10px]'>{ms.subject}</p>
                            <p className='text-[14px] mb-[5px] line-clamp-1'>
                              {ms.message}
                            </p>
                          </div>
                          <p className='text-[14px] text-gray-600  text-end whitespace-nowrap ml-[20px]'>
                            {/* {timeAgo} */}
                            <TimeAgo
                              date={dateObject}
                              className='text-[15px]'
                              // formatter={formatter}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {showTab === "1" && unreadData?.length === 0 && (
              <div className='flex flex-col justify-center items-center w-full h-screen'>
                {/* <span className='loading loading-spinner loading-xl text-primary'></span> */}
                <IoIosAlert className='text-[100px] text-secondary ' />
                <p className='text-secondary mt-[20px] text-[17px]'>
                  There's currently no unread notification
                </p>
              </div>
            )}
            {showTab === "2" && readData?.length > 0 && (
              <div className='overflow-y-auto w-full pt-[20px] overflow-x-none h-[100vh] xl:h-[90vh] scrollbar-track-primary/10 scrollbar-thumb-primary/90 scrollbar-thin overflow-hidden  '>
                {readData?.map((ms) => {
                  const dateObject = new Date(ms.date);

                  return (
                    <div
                      className={`w-full flex flex-col cursor-pointer hover:scale-[1.02] duration-300`}
                      key={ms.date}
                    >
                      <div
                        onClick={() => {
                          setModalData(ms);
                          window.my_modal_49.showModal();
                          updateMoverNotif(ms);
                        }}
                        className='flex items-center md:space-x-[20px] w-full px-[20px] md:px-[40px]'
                      >
                        <div className='avatar placeholder hidden md:flex'>
                          <div className='bg-primary rounded-full w-[80px] h-[80px]'>
                            <span className='text-5xl font-bold text-white'>
                              {trimToFirstLetter(ms.sender)}
                              {/* A */}
                            </span>
                          </div>
                        </div>
                        <div
                          className={`  bg-primary/5 flex items-center justify-between rounded-[20px] py-[20px] min-w-[300px] w-full my-[10px] rounded-bl-[20px] rounded-br-[20px] shadow-lg  px-[20px] md:px-[30px]`}
                        >
                          <div className='w-full'>
                            <p className='font-bold mb-[10px]'>{ms.subject}</p>
                            <p className='text-[14px] mb-[5px] line-clamp-1'>
                              {ms.message}
                            </p>
                          </div>
                          <p className='text-[14px] text-gray-600  text-end whitespace-nowrap ml-[20px]'>
                            {/* {timeAgo} */}
                            <TimeAgo
                              date={dateObject}
                              className='text-[15px]'
                              // formatter={formatter}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {showTab === "2" && readData?.length === 0 && (
              <div className='flex flex-col justify-center items-center w-full h-screen'>
                {/* <span className='loading loading-spinner loading-xl text-primary'></span> */}
                <IoIosAlert className='text-[100px] text-secondary ' />
                <p className='text-secondary mt-[20px] text-[17px]'>
                  There's currently no read notification
                </p>
              </div>
            )}
            {/* * modal */}
            <dialog id='my_modal_49' className='modal py-[20px] px-[10px]'>
              <form method='dialog' className='modal-box '>
                <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border border-primary text-primary'>
                  ✕
                </button>

                <div className='w-full flex justify-center mb-[20px]'>
                  <div className='text-primary bg-primary/10 flex justify-center items-center w-[60px] h-[60px] rounded-full'>
                    <MdNotificationsActive className='text-[30px] text-primary' />
                  </div>
                </div>
                <div className='w-full flex-col items-center'>
                  <h3 className='font-bold text-[22px] text-primary px-[20px] text-center'>
                    {modalData?.subject}
                  </h3>
                </div>

                <p className='mt-[10px] mb-[20px] text-[14px] text-gray-600 w-full text-center'>
                  {modalData?.date}
                </p>

                <>
                  <p className='mb-[20px] text-[14px] md:text-[16px]'>
                    {modalData?.message}
                  </p>
                  <p className='mb-[20px] text-[15px] font-bold'>
                    From: {modalData?.sender}
                  </p>
                </>
              </form>
              <form method='dialog' className='modal-backdrop'>
                <button>close</button>
              </form>
            </dialog>
          </div>
        </div>
      </div>
    </MoverLayout>
  );
};

export default Inbox;

// export async function getServerSideProps(context) {
//   // const bookingsData = await fetchAllBookings();

//   const { id } = context.params; // Access the UID from the URL

//   const bookingRef = doc(db, "bookingData", id);
//   const docSnap = await getDoc(bookingRef);
//   const progressData = docSnap.data();

//   return {
//     props: {
//       // userData,
//       progressUrl: id,
//       progressData: progressData || [],
//     },
//   };
// }