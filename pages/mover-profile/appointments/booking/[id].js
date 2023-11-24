import useBookings from "@/hooks/useBookings";
import AdminLayout from "@/layouts/AdminLayout";
import { fetchAllBookings, fetchfilteredBooks } from "@/lib/fetchData2";
// import { getfilteredBooks } from "@/store/bookingSlice";
import {
  convertMoveDateFormat,
  formatDate,
  trimDateFormat,
} from "@/utils/logics";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { useSelector } from "react-redux";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import MoverLayout from "@/layouts/MoverLayout";

const UserDetails = ({ progressData }) => {
  //   const [progressData, setBooking] = useState({});
  const router = useRouter();
  const [showButton, setShowButton] = useState("");

  //   const {
  //     completedBookings,
  //     completedBook,
  //     allBookings,
  //     bookingsLoading,
  //     refetchAllBookings,
  //     sortedBookings,
  //     allBook,
  //   } = useBookings();

  //   useEffect(() => {
  //     setBooking(allBook(id));
  //   }, [allBookings]);

  const updateAcceptance = async (value) => {
    try {
      await setDoc(
        doc(db, "bookingData", progressData?.bookingId),

        {
          acceptance: value,
        },
        { merge: true }
      );
   
      console.log("Move Acceptance update was successful @ reservation id");
    } catch (error) {
      console.log(error);
      // return false;
      console.log("Move Acceptance update was unsuccessful @ reservation id");
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    if (progressData?.acceptance === "pending") {
      setShowButton("");
    } else if (progressData?.acceptance === "accepted") {
      setShowButton("1");
    } else if (progressData?.acceptance === "rejected") {
      setShowButton("2");
    }
  }, []);

  console.log({ progressData });

  return (
    <MoverLayout>
      {/* <div>{Booking.firstName}</div>; */}
      {progressData && (
        <div className='bg-white/90 py-[50px] w-full min-h-[100vh]'>
          <section className='mb-[30px]  px-[30px] '>
            <div className='flex flex-col space-y-[20px] md:space-y-0 md:flex-row md:items-center md:justify-between'>
              <p className='font-bold text-[25px] mb-[0px]'>
                Booking{" "}
                <span className='text-primary'>#{progressData?.quoteRef}</span>{" "}
                by {progressData?.firstName} {progressData?.lastName}
              </p>
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

          <div className=' mx-[30px] bg-white/70 border px-[20px] py-[30px] rounded-[10px] shadow-lg '>
            {/* <div className="flex flex-col space-y-[20px]"></div> */}
            <div className='overflow-x-auto w-full overflow-hidden'>
              <table className='table table-md table-pin-rows table-pin-cols'>
                <thead>
                  <tr className='text-primary font-bold bg-primary/10 flex text-[18px]'>
                    <td className='flex-[0.5]'>Details</td>
                    <td className='flex-[1]'>Info</td>
                  </tr>
                </thead>

                <tbody>
                  {/* <tr className='flex '>
                    <td className='font-bold flex-[0.5]'>Book Date</td>
                    <td
                      className={`${
                        !progressData?.date && "text-secondary"
                      } flex-[1]`}
                    >
                      {progressData?.date
                        ? trimDateFormat(progressData?.date)
                        : "*Unavailable*"}
                    </td>
                  </tr> */}

                  <tr className='flex '>
                    <td className='font-bold flex-[0.5]'>Book Ref</td>
                    <td
                      className={`${
                        !progressData?.quoteRef && "text-secondary"
                      } flex-[1]`}
                    >
                      {progressData?.quoteRef
                        ? progressData?.quoteRef
                        : "*Unavailable*"}
                    </td>
                  </tr>

                  <tr className='flex '>
                    <td className='font-bold flex-[0.5]'>Acceptance Status</td>
                    <td
                      className={`${
                        !progressData?.acceptance && "text-secondary"
                      } flex-[1]`}
                    >
                      {progressData?.acceptance
                        ? progressData?.acceptance
                        : "*Unavailable*"}
                    </td>
                  </tr>

                  {/* <tr className='flex '>
                    <td className='font-bold flex-[0.5]'>completed Booking</td>
                    <td className={` flex-[1]`}>
                      {progressData?.completedBook ? "Yes" : "No"}
                    </td>
                  </tr> */}

                  {/* <tr className='flex '>
                    <td className='font-bold flex-[0.5]'>Book Id</td>
                    <td
                      className={`${
                        !progressData?.bookingId && "text-secondary"
                      } flex-[1]`}
                    >
                      {progressData?.bookingId
                        ? progressData?.bookingId
                        : "*Unavailable*"}
                    </td>
                  </tr> */}

                  <tr className='flex '>
                    <td className='font-bold flex-[0.5]'>First Name</td>
                    <td
                      className={`${
                        !progressData?.firstName && "text-secondary"
                      } flex-[1]`}
                    >
                      {progressData?.firstName
                        ? progressData?.firstName
                        : "*Unavailable*"}
                    </td>
                  </tr>

                  <tr className='flex '>
                    <td className='font-bold flex-[0.5]'>Last Name</td>
                    <td
                      className={`${
                        !progressData?.lastName && "text-secondary"
                      } flex-[1]`}
                    >
                      {progressData?.lastName
                        ? progressData?.lastName
                        : "*Unavailable*"}
                    </td>
                  </tr>

                  {/* <tr className='flex '>
                    <td className='font-bold flex-[0.5]'>Email</td>
                    <td
                      className={`${
                        !progressData?.email && "text-secondary"
                      } flex-[1]`}
                    >
                      {progressData?.email
                        ? progressData?.email
                        : "*Unavailable*"}
                    </td>
                  </tr> */}

                  {/* <tr className='flex '>
                    <td className='font-bold flex-[0.5]'>Telephone</td>
                    <td className={` flex-[1]`}>
                      <span className={``}>
                        {progressData?.countryCode
                          ? progressData?.countryCode
                          : "(+ 44)"}{" "}
                      </span>
                      <span
                        className={`${
                          !progressData?.telephone && "text-secondary"
                        }`}
                      >
                        {progressData?.telephone
                          ? progressData?.telephone
                          : "*Unavailable*"}
                      </span>
                    </td>
                  </tr> */}

                  {/* <tr className='flex'>
                    <td className='font-bold flex-[0.5]'>
                      {" "}
                      Booking Stage / Status
                    </td>
                    <td
                      className={`${
                        !progressData?.stage && "text-secondary"
                      } flex-[1]`}
                    >
                      {progressData?.stage
                        ? progressData?.stage
                        : "*Unavailable*"}
                    </td>
                  </tr> */}

                  <tr className='flex '>
                    <td className='font-bold flex-[0.5]'>Move Date</td>
                    <td
                      className={`${
                        !progressData?.moveDate && "text-secondary"
                      } flex-[1]`}
                    >
                      {progressData?.moveDate
                        ? convertMoveDateFormat(progressData?.moveDate)
                        : "*Unavailable*"}
                    </td>
                  </tr>

                  <tr className='flex '>
                    <td className='font-bold flex-[0.5]'>Move Time</td>
                    <td
                      className={`${
                        !progressData?.moverTime && "text-secondary"
                      } flex-[1]`}
                    >
                      {progressData?.moverTime
                        ? progressData?.moverTime
                        : "*Unavailable*"}
                    </td>
                  </tr>

                  <tr className='flex '>
                    <td className='font-bold flex-[0.5]'>Move Package</td>
                    <td
                      className={`${
                        !progressData?.movePackage && "text-secondary"
                      } flex-[1]`}
                    >
                      {progressData?.movePackage
                        ? progressData?.movePackage
                        : "*Unavailable*"}{" "}
                      Package
                    </td>
                  </tr>

                  <tr className='flex '>
                    <td className='font-bold flex-[0.5]'>Property Type</td>
                    <td
                      className={`${
                        !progressData?.propertyType && "text-secondary"
                      } flex-[1]`}
                    >
                      {progressData?.propertyType
                        ? progressData?.propertyType
                        : "*Unavailable*"}
                    </td>
                  </tr>

                  <tr className='flex '>
                    <td className='font-bold flex-[0.5]'>Move Package</td>
                    <td
                      className={`${
                        !progressData?.movePackage && "text-secondary"
                      } flex-[1]`}
                    >
                      {progressData?.movePackage
                        ? progressData?.movePackage
                        : "*Unavailable*"}{" "}
                      Package
                    </td>
                  </tr>

                  <tr className='flex '>
                    <td className='font-bold flex-[0.5]'>Mover selected</td>
                    <td
                      className={`${
                        !progressData?.moverName && "text-secondary"
                      } flex-[1]`}
                    >
                      {progressData?.moverName
                        ? progressData?.moverName
                        : "*Unavailable*"}
                    </td>
                  </tr>

                  {/* <tr className='flex '>
                    <td className='font-bold flex-[0.5]'>Move Price</td>
                    <td
                      className={`${
                        !progressData?.moverPrice && "text-secondary"
                      } flex-[1]`}
                    >
                      {progressData?.moverPrice && "₤"}
                      {progressData?.moverPrice
                        ? progressData?.moverPrice
                        : "*Unavailable*"}
                    </td>
                  </tr> */}

                  <tr className='flex '>
                    <td className='font-bold flex-[0.5]'>Number of Men</td>
                    <td
                      className={`${
                        !progressData?.numberOfMovers && "text-secondary"
                      } flex-[1]`}
                    >
                      {progressData?.numberOfMovers
                        ? progressData?.numberOfMovers
                        : "*Unavailable*"}
                    </td>
                  </tr>

                  <tr className='flex '>
                    <td className='font-bold flex-[0.5]'>
                      Move Duration (Hours)
                    </td>
                    <td
                      className={`${
                        !progressData?.duration && "text-secondary"
                      } flex-[1]`}
                    >
                      {progressData?.duration && progressData?.duration} {""}
                      {progressData?.duration && "Hours"}
                      {!progressData?.duration && "*Unavailable*"}
                    </td>
                  </tr>

                  <tr className='flex '>
                    <td className='font-bold flex-[0.5]'>Mileage</td>
                    <td
                      className={`${
                        !progressData?.mileage && "text-secondary"
                      } flex-[1]`}
                    >
                      {progressData?.mileage
                        ? progressData?.mileage
                        : "*Unavailable*"}
                      {""}
                      {progressData?.mileage && " miles"}
                    </td>
                  </tr>

                  <tr className='flex '>
                    <td className='font-bold flex-[0.5]'>Pickup Address</td>
                    <td
                      className={`${
                        !progressData?.address2 && "text-secondary"
                      } flex-[1]`}
                    >
                      {progressData?.address2
                        ? progressData?.address2
                        : "*Unavailable*"}
                    </td>
                  </tr>

                  <tr className='flex '>
                    <td className='font-bold flex-[0.5]'>Pickup House Floor</td>
                    <td className={` flex-[1]`}>
                      {progressData?.floor1 == 0 ? 0 : progressData?.floor1}{" "}
                      Floor
                    </td>
                  </tr>

                  <tr className='flex '>
                    <td className='font-bold flex-[0.5]'>Pickup House Lift</td>
                    <td className={` flex-[1]`}>
                      {progressData?.liftAvailable1 ? "Yes" : "No"}
                    </td>
                  </tr>

                  <tr className='flex '>
                    <td className='font-bold flex-[0.5]'>Drop-off Address</td>
                    <td
                      className={`${
                        !progressData?.address1 && "text-secondary"
                      } flex-[1]`}
                    >
                      {progressData?.address1
                        ? progressData?.address1
                        : "*Unavailable*"}
                    </td>
                  </tr>

                  <tr className='flex '>
                    <td className='font-bold flex-[0.5]'>
                      Drop-off House Floor
                    </td>
                    <td className={` flex-[1]`}>
                      {progressData?.floor2 == 0 ? 0 : progressData?.floor2}{" "}
                      Floor
                    </td>
                  </tr>

                  <tr className='flex '>
                    <td className='font-bold flex-[0.5]'>
                      Drop-off House Lift
                    </td>
                    <td className={` flex-[1]`}>
                      {progressData?.liftAvailable2 ? "Yes" : "No"}
                    </td>
                  </tr>
                </tbody>

                <tfoot>
                  <tr className='text-primary font-bold bg-primary/10 flex text-[18px]'>
                    <td className='flex-[0.5]'>Details</td>
                    <td className='flex-[1]'>Info</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className='flex items-center justify-center mt-[50px] mb-[50px]'>
              <div
                onClick={() => {
                  setShowButton("1");
                  updateAcceptance("accepted");
                }}
                className={`${
                  showButton === "1" && "bg-primary  border-primary text-white"
                }  font-bold  py-[10px] px-[30px] border-[3px] hover:border-primary rounded-tl-[10px] rounded-bl-[10px] hover:bg-primary duration-300 cursor-pointer text-gray-500 hover:text-white`}
              >
                {showButton === "1" ? "Accepted" : "Accept"}
              </div>
              <div
                onClick={() => {
                  updateAcceptance("rejected");
                  setShowButton("2");
                }}
                className={`${
                  showButton === "2" &&
                  "bg-secondary border-secondary text-white"
                } font-bold py-[10px] px-[30px] border-[3px] rounded-tr-[10px] rounded-br-[10px] hover:bg-secondary hover:border-secondary duration-300 cursor-pointer text-gray-500 hover:text-white`}
              >
                {/* Reject */}
                {showButton === "2" ? "Rejected" : "Reject"}
              </div>
            </div>
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

export default UserDetails;

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
