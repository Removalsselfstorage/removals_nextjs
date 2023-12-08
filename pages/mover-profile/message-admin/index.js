import MoverLayout from "@/layouts/MoverLayout";
import NormalLayout from "@/layouts/NormalLayout";
import { getAllUserDetails } from "@/store/userSlice";
import Head from "next/head";
// import { useRouter } from "next/navigation";
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
import { AiOutlineLeft } from "react-icons/ai";
import React, { useEffect, useRef, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
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
import { BiSolidPhoneCall } from "react-icons/bi";
import dayjs from "dayjs";
import { PiChatDots } from "react-icons/pi";
import { TbBrandWechat } from "react-icons/tb";
import { IoIosSend } from "react-icons/io";
// import { parse, formatDistanceToNow } from "date-fns";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/fr";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { getAllMoverDetails } from "@/store/moverSlice";
import { fetchAllMoversDetails } from "@/lib/fetchData2";
import useMover from "@/hooks/useMover";
import { db } from "@/firebase";

const Inbox = () => {
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
    router,
  } = useMover();

  const uid = personalMoverDetails?.uid;
  const generatedName = personalMoverDetails?.generatedName;
  // const userDetails = useSelector(getAllUserDetails);

  // const userUId = userDetails

  const [showButton, setShowButton] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // const [userData, setUserData] = useState([]);

  const [filteredPD, setFilteredPD] = useState({});
  const [filteredCD, setFilteredCD] = useState({});

  const messagesContainerRef = useRef(null);

  // Scroll to the bottom of the messages container
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  const messageId = `${uid}`;

  const messageRef = collection(db, "messages2");

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
          user: generatedName,
          userType: "mover",
          room: "admin-mover",
          createdAt: serverTimestamp(),
        }
        // { merge: true }
      );

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

  console.log({ personalMoverDetails });

  return (
    <MoverLayout>
      <Head>
        <title>Mover Profile - Inbox</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>

      <div className='bg-white/90 py-[50px] w-full min-h-[100vh] overflow-x-none '>
        <section className='mb-[20px] w-full px-[10px] md:px-[30px] '>
          <div className='flex items-center space-x-[20px]'>
            <span>
              <TbBrandWechat className='text-[30px] text-primary' />
            </span>
            <p className='font-bold text-[25px] mb-[0px]'>Chat with Admin</p>
          </div>
        </section>

        <div
          style={{
            backgroundImage: "url(/bg-tarvel3.png)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className='relative md:pl-[20px] md:pr-[10px] pt-[0px] bg-gray-100 border mx-[10px] md:mx-[30px] rounded-[10px] shadow-lg pb-[30px]'
        >
          <div
            ref={messagesContainerRef}
            className='overflow-y-auto h-[100vh] pt-[20px] pb-[50px] xl:h-[80vh] overflow-x-none pr-[5px] md:pr-[20px]  scrollbar-track-primary/10 scrollbar-thumb-primary/90 scrollbar-thin overflow-hidden mx-[10px] '
          >
            {messages?.map((ms) => {
              const dateObject = new Date(ms.date);

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
                      {ms.user}
                      {/* {ms.userType === "mover" ? "Me" : ms.user} */}
                    </p>
                    <p className='text-[16px] mb-[10px]'>{ms.text}</p>
                    <p className='text-[13px] text-gray-600 w-full text-end'>
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
    </MoverLayout>
  );
};

export default Inbox;
