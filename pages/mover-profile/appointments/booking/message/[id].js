import useBookings from "@/hooks/useBookings";
import AdminLayout from "@/layouts/AdminLayout";
import { fetchAllBookings, fetchfilteredBooks } from "@/lib/fetchData2";
// import { getfilteredBooks } from "@/store/bookingSlice";
import {
  checkBookStatus,
  convertMoveDateFormat,
  convertTimeTo24HourFormat,
  formatDate,
  formatMovePrice2,
  getCurrentDateFormatted,
  getFormattedTodayDate,
  removeSpaces,
  trimAddress,
  trimDateFormat,
} from "@/utils/logics";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { useSelector } from "react-redux";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  query,
  onSnapshot,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";
import MoverLayout from "@/layouts/MoverLayout";
import { BiSolidPhoneCall } from "react-icons/bi";
import dayjs from "dayjs";
import { PiChatDots } from "react-icons/pi";
import { TbBrandWechat } from "react-icons/tb";
import { IoIosSend } from "react-icons/io";
import { parse, formatDistanceToNow } from "date-fns";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/fr";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { messageNotificationEmail } from "@/lib/sendCustomEmail";

const MessageDetails = ({ progressData }) => {
  //   const [progressData, setBooking] = useState({});
  const router = useRouter();
  const [showButton, setShowButton] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const isGivenDateGreaterThanCurrent = checkBookStatus(
    progressData?.moveDate,
    progressData?.moverTime
  );

  let targetDate = new Date(progressData?.moveDate);

  if (progressData?.moverTime) {
    const [startTime, endTime] = progressData?.moverTime?.split(" - ") || [];
    const ct = convertTimeTo24HourFormat(startTime);
    targetDate.setHours(ct);
  }

  const notificationParams = {
    receiverName: `${progressData?.firstName} ${progressData?.lastName}`,
    senderName: progressData?.moverName,
    message: newMessage,
    subject: `Message notification from ${progressData?.moverName}`,
    messageLink: `https://rss-admin.vercel.app/reservations/message/${progressData?.bookingId}`,
    messageId: progressData?.bookingId,
    // page: "checkout page",
  };

  const sendMessageNotificationEmail = async () => {
    try {
      await messageNotificationEmail(progressData?.email, notificationParams);
    } catch (error) {
      console.log(error);
    }
  };

  // const currentDate = new Date().getTime();

  const givenDate = targetDate.getTime();

  function calculateCountdownDay() {
    const currentDate = new Date().getTime();
    const timeRemaining = givenDate - currentDate;

    const months = Math.floor(timeRemaining / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
    );
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // console.log({ months, days, hours, minutes });

    if (months === 0 && days === 0) {
      return true;
    } else {
      return false;
    }
  }

  const trimAd1 = trimAddress(progressData?.address1);
  const trimAd2 = trimAddress(progressData?.address2);

  const messagesContainerRef = useRef(null);

  // Scroll to the bottom of the messages container
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  const messageId = `${progressData?.bookingId}-${removeSpaces(
    progressData?.moverName
  )}`;

  const messageRef = collection(db, "messages");

  //   console.log({messageId})

  const handleMessage = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    try {
      setNewMessage("");
      scrollToBottom();
      await addDoc(
        messageRef,

        {
          text: newMessage,
          date: getCurrentDateFormatted(),
          messageId,
          user: progressData?.moverName,
          userType: "mover",
          room: "mover-user",
          createdAt: serverTimestamp(),
        }
        // { merge: true }
      );

      sendMessageNotificationEmail();

      console.log("Message update was successful @ message id");
    } catch (error) {
      console.log(error);
      // return false;
      console.log("Message update was unsuccessful @ message id");
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // const queryMessages = query(messageRef);
    const queryMessages = query(
      messageRef,
      where("messageId", "==", messageId),
      orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messg = [];
      snapshot.forEach((doc) => {
        messg.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messg);
    });

    return () => unsubscribe();
  }, []);

  //   console.log({ cd: calculateCountdownDay(), progressData, trimAd1, trimAd2 });
  console.log({ messageId, messages });

  return (
    <MoverLayout>
      {/* <div>{Booking.firstName}</div>; */}
      {progressData && (
        <div className='bg-white/90 py-[50px] w-full min-h-[100vh] overflow-x-none px-[0px] md:px-[30px]'>
          <section className='mb-[30px]  px-[30px] '>
            <div className='flex flex-col space-y-[20px] md:space-y-0 md:flex-row md:items-center md:justify-between'>
              <div className='flex items-center space-x-[20px]'>
                <span>
                  <TbBrandWechat className='text-[30px] text-primary' />
                </span>
                <p className='font-bold text-[25px] mb-[0px]'>
                  Chat with {progressData?.firstName} {progressData?.lastName} (
                  {progressData?.quoteRef}){" "}
                </p>
              </div>
              <div
                onClick={() => router.back()}
                className='text-primary cursor-pointer link flex items-center space-x-[10px]'
              >
                <span className=''>
                  <AiOutlineLeft className='text-[20px]' />
                </span>
                <p className=''>Go Back</p>
              </div>
            </div>
          </section>

          <div
            style={{
              backgroundImage: "url(/bg-tarvel3.png)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className='relative px-[0px] md:pl-[20px] md:pr-[10px] pt-[0px] bg-gray-100 border  rounded-[10px] shadow-lg pb-[70px]'
          >
            <div
              ref={messagesContainerRef}
              className='overflow-y-auto h-[100vh] pt-[20px] xl:h-[90vh] overflow-x-none pr-[5px] md:pr-[20px]  scrollbar-track-primary/10 scrollbar-thumb-primary/90 scrollbar-thin overflow-hidden mx-[10px] '
            >
              {messages?.map((ms) => {
                // const dateObject = parse(
                //   ms.date,
                //   "EEE, d MMM yyyy HH:mm:ss 'GMT'",
                //   new Date(),
                //   { timeZone: "GMT" }
                // );
                // Calculate the time difference
                const dateObject = new Date(ms.date);

                // Calculate the time difference
                const timeAgo = formatDistanceToNow(dateObject, {
                  addSuffix: true,
                });
                // const formatter = buildFormatter(frenchStrings);
                return (
                  <div
                    className={`${
                      ms.userType === "mover" ? "items-end" : "items-start"
                    } w-full flex flex-col `}
                    key={ms.id}
                  >
                    <div
                      className={`${
                        ms.userType === "mover"
                          ? "bg-[#c3ddc5]/90 rounded-tr-[0px] rounded-tl-[20px] "
                          : "bg-white/90 rounded-tr-[20px] rounded-tl-[0px] "
                      } shadow-lg px-[20px] min-w-[300px] py-[20px] w-fit my-[5px] rounded-bl-[20px] rounded-br-[20px]`}
                    >
                      <p className='font-bold mb-[10px]'>
                        {ms.userType === "mover" ? "Me" : ms.user}
                      </p>
                      <p className='text-[18px] mb-[10px]'>{ms.text}</p>
                      <p className='text-[14px] text-gray-600 w-full text-end'>
                        {/* {timeAgo} */}
                        <TimeAgo
                          date={dateObject}
                          // formatter={formatter}
                        />
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <form
              onSubmit={handleMessage}
              className='absolute bottom-0 left-0 z-[100] right-0 bg-gray-500/30 py-[10px] px-[20px] flex items-center justify-between'
            >
              <input
                type='text'
                placeholder='Type a message'
                //   className={`text-[14px] input input-primary h-[35px] w-[200px] md:w-[300px]`}
                className={`text-[14px] input input-primary h-[40px] w-full`}
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              />
              <button
                type='submit'
                // onClick={handleMessage}
                className='bg-primary hover:bg-primary/80 rounded-full cursor-pointer ml-[10px] md:ml-[20px] w-[40px] h-[40px] flex items-center justify-center'
              >
                <span>
                  <IoIosSend className='text-[25px] text-white' />
                </span>
              </button>
            </form>
          </div>
        </div>
      )}
      {!progressData && (
        <div className='flex justify-center items-center w-full h-screen'>
          <span className='loading loading-spinner loading-lg text-primary'></span>
        </div>
      )}
    </MoverLayout>
  );
};

export default MessageDetails;

export async function getServerSideProps(context) {
  const bookingsData = await fetchAllBookings();

  const { id } = context.params; // Access the UID from the URL

  const bookingRef = doc(db, "bookingData", id);
  const docSnap = await getDoc(bookingRef);
  const progressData = docSnap.data();

  return {
    props: {
      // userData,
      progressUrl: id,
      progressData: progressData || [],
    },
  };
}
