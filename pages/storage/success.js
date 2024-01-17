import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import useProductCart from "@/hooks/useProductCart";
import BookingLayout from "@/layouts/BookingLayout";
import useQuote from "@/hooks/useQuote";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { getCurrentDateFormatted } from "@/utils/logics";
import { allNotificationEmail, bookedEmail } from "@/lib/sendCustomEmail";
import Lottie from "lottie-react";
import success from "@/lottieJsons/success.json";
import { initializeApp } from "firebase/app";
import useBookings from "@/hooks/useBookings";
import { fetchAllBookings, fetchAllMoversDetailsArray } from "@/lib/fetchData2";
import Success from "@/components/Storage/Success";
import useLocalStorage from "use-local-storage";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ReservationCheckoutSuccess = ({ allBookings, approvedMovers }) => {
  const {
    serviceLocation,
    personalDetails,
    moveDetails,
    moverSideDetails,
    moverDetails,
    paymentDetails,
    bookStage,
    updateLocationFrom,
    resetLocationFrom,
    updateLocationTo,
    resetLocationTo,
    updatePersonal,
    resetPersonal,
    updateMove,
    resetMove,
    updateMover,
    resetMover,
    updatePayment,
    resetPayment,
    updatePickP,
    updateMoverSide,
    resetMoverSide,
    updateBookS,
    resetBookS,
    updateReserveIdFxn,
    reserveId,
    setReserveDetailsFxn,
    reserveDetails,
    router,
  } = useQuote();

  const [storageId, setStorageId] = useLocalStorage("name", "");

  console.log({ storageId });

  // const { paidPart, paidFull, paidPrice } = paymentDetails;

  const {
    completedBook,
    completedBookLoading,
    refetchCompletedBook,
    // allBookings,
    allBookingsLoading,
    refetchAllBookings,
  } = useBookings();

  const [successDetails, setSuccessDetails] = useState({});
  // const [currentBook, setCurrentBook] = useState({});

  // const { paidPart, paidFull, paidPrice, paymentType } = paymentDetails;

  const [submitLoading, setSubmitLoading] = useState(false);
  // const [timer, setTimer] = useState(false);

  const {
    query: { sessionId },
  } = useRouter();

  const URL = sessionId ? `/api/stripe/sessions/${sessionId}` : null;
  const { data: checkoutSession, error } = useSWR(URL, fetcher);

  if (error) return <div>failed to load the session</div>;

  const customer = checkoutSession?.customer_details;
  const products = checkoutSession?.line_items?.data?.map((item) => ({
    ...item.price.product,
    price: item.price.unit_amount,
    quantity: item.quantity,
  }));

  const payment = checkoutSession?.payment_intent?.payment_method_types[0];
  const subtotal = (checkoutSession?.amount_subtotal / 100).toLocaleString(
    "en-GB",
    {
      style: "currency",
      currency: "GBP",
    }
  );
  const total = (checkoutSession?.amount_total / 100).toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
  });
  const discount = (
    checkoutSession?.total_details?.amount_discount / 100
  ).toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
  });
  const tax = (checkoutSession?.total_details?.amount_tax / 100).toLocaleString(
    "en-GB",
    {
      style: "currency",
      currency: "GBP",
    }
  );

  //   const subtotal = checkoutSession?.amount_subtotal;
  //   const total = checkoutSession?.amount_total;
  //   const discount = checkoutSession?.total_details?.amount_discount;
  //   const tax = checkoutSession?.total_details?.amount_tax;
  //   const orderNumber = checkoutSession?.payment_intent?.id

  const notificationEmail = [
    { email: "ifeanyi4umeh@gmail.com" },
    // { email: "removalsselfstorage@gmail.com" },
  ];

  // const reset = () => {
  //   // let check = false;
  //   resetLocationFrom();
  //   resetLocationTo();
  //   resetPersonal();
  //   resetMove();
  //   resetMover();
  //   resetPayment();
  //   resetMoverSide();
  //   resetBookS();
  //   console.log("successfully reset all", { moveDetails });
  // };

  const cb = allBookings?.find((ab) => ab.bookingId === moveDetails.bookingId);

  const params3 = {
    firstName: cb?.firstName,
    lastName: cb?.lastName,
    email: cb?.email,
    quoteRef: cb?.quoteRef,
    progressLink: `https://removalstorage.vercel.app/book/checkout/${cb?.bookingId}`,
    // progressLink2: `https://removalstorage.vercel.app/book/checkout/${moveDetails?.bookingId}`,
    progressLink2: `https://removalstorage.vercel.app/reservations`,
    address1: cb?.address1,
    address2: cb?.address2,
    initialPackagePrice: cb?.initialPackagePrice,
    pickPrice: cb?.pickPrice,
    propertyType: cb?.propertyType,
    numberOfMovers: cb?.numberOfMovers,
    mileage: cb?.mileage,
    volume: cb?.volume,
    duration: cb?.duration,
    moveDate: cb?.moveDate,
    movePackage: cb?.movePackage,
    moverName: cb?.moverName,
    moverPrice: cb?.moverPrice,
    paidPrice: cb?.paidPrice,
    paymentType: cb?.paidPart ? "20%" : cb?.paidFull ? "Full" : "",
    bookingId: cb?.bookingId,
  };

  const notificationParams = {
    message: `User with storage ID ${storageId} just successfully made an initial storage deposit of ${total}.`,
    subject: `Successful storage initial payment of (${total}) by user with storage ID ${storageId}`,
    bookLink: `https://rss-admin.vercel.app/secret-admin/users/booking/${storageId}`,
    bookingId: storageId,
    // page: "checkout page",
  };

  const sendBookedMail = async () => {
    try {
      await bookedEmail(cb?.email, params3);
    } catch (error) {
      console.log(error);
    }
  };

  // const findMoverUid = () => {
  //   const mv = approvedMovers?.find((ap) => ap.generatedName === cb?.moverName);
  //   return mv;
  // };

  // const

  const sendAllNotificationEmail = async () => {
    try {
      await allNotificationEmail(notificationEmail, notificationParams);
    } catch (error) {
      console.log(error);
    }
  };

  const sendStripe2 = async () => {
    try {
      await setDoc(
        doc(db, "storageData", storageId),

        {
          completedBook: true,
          storageStripePayment: {
            amount: Number(checkoutSession?.amount_total / 100),
            date: getCurrentDateFormatted(),
            description: "Move Initial Payment",
            stripeName: customer?.name && customer?.name,
            stripeEmail: customer?.email && customer?.email,
            stripeCountry:
              customer?.address.country && customer?.address.country,
            // stripeProducts: products,
            stripePaymentType: payment && payment,
            stripeSubtotal: subtotal && subtotal,
            stripeTotal: total && total,
          },
        },
        { merge: true }
      );

      // return true;
      console.log("storage update was successful @ storage success");
    } catch (error) {
      console.log(error);
      // return false;
      console.log("storage update was unsuccessful @ storage success");
    }
  };

  const handleDashboard = () => {
    // event.preventDefault();
    setSubmitLoading(true);
    // updateReserveIdFxn(cb?.bookingId);
    sendStripe2();

    sendAllNotificationEmail();
    // sendBookedMail();
    // reset();
    // updateReserveIdFxn(successDetails?.bookingId);
    router.push(`/storage/reservations/${storageId}`);
    // resetCartFxn();
  };

  useEffect(() => {
    const sendStripe = async () => {
      try {
        await setDoc(
          doc(db, "storageData", storageId),

          {
            completedBook: true,
            storageStripePayment: {
              amount: Number(checkoutSession?.amount_total / 100),
              date: getCurrentDateFormatted(),
              description: "Storage Initial Payment",
              stripePaymentType: payment && payment,
              stripeSubtotal: subtotal && subtotal,
              stripeTotal: total && total,
            },
          },
          { merge: true }
        );

        // return true;
        console.log("storage update was successful @ storage success");
      } catch (error) {
        console.log(error);
        // return false;
        console.log("storage update was unsuccessful @ storage success");
      }
    };

    // const updateMoverNotif = async () => {
    //   const moversRef = doc(db, "moversData", findMoverUid()?.uid);

    //   // if (cb?.moverName === newMover) return;

    //   try {
    //     await setDoc(
    //       moversRef,

    //       {
    //         // approvalStatus: `${approvedAccount ? "APPROVED" : "UNAPPROVED"}`,
    //         notifications: [
    //           ...findMoverUid()?.notifications,
    //           {
    //             subject: "Picked for a move",
    //             message: `Client ${cb.firstName} has picked you for a move with book Ref.: ${cb?.quoteRef}.`,
    //             date: getCurrentDateFormatted(),
    //             // createdAt: serverTimestamp(),
    //             sender: "Removal & Self Storage",
    //             status: "unread",
    //           },
    //         ],
    //         // lastNotificationId: "",
    //       },
    //       { merge: true }
    //     );

    //     console.log(
    //       "mover notification update was successful @ checkout successful"
    //     );
    //   } catch (error) {
    //     console.log(error);
    //     console.log(
    //       "mover notification update was unsuccessful @ checkout successful"
    //     );
    //   }
    // };

    sendStripe();

    // updateMoverNotif();
  }, []);

  console.log({ successDetails, allBookings, moveDetails });
  // console.log({ timer, moveDetails, paymentType, bookingId });

  return (
    <BookingLayout>
      <div className='bg-white py-[20px]'>
        <div className='max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
          <Success handleDashboard={handleDashboard} />
        </div>
      </div>
    </BookingLayout>
  );
};

export default ReservationCheckoutSuccess;

export async function getServerSideProps(context) {
  // const { id } = context.params; // Access the UID from the URL
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  // const { data: prices } = await stripe.prices.list({
  //   active: true,
  //   limit: 10,
  //   expand: ["data.product"],
  // });
  // const userData = await fetchAllMoversDetailsArray();

  // const bookingRef = doc(db, "bookingData", id);
  // const docSnap = await getDoc(bookingRef);

  // const progressData = docSnap.data();

  const bookingsData = await fetchAllBookings();

  const allBookings = [...bookingsData?.bookings].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const completedBookings = bookingsData?.bookings?.filter(
    (bk) => bk.completedBook === true
  );

  const userData = await fetchAllMoversDetailsArray();

  // const completedBookings = bookingsData?.bookings?.filter(
  //   (bk) => bk.completedBook === true
  // );
  const movers = userData?.personalDetails;

  const approvedMovers = movers?.filter(
    (item) => item.approvalStatus === "APPROVED"
  );

  // let progressData;

  // if (!!pd) {
  //   progressData = pd?.bookings?.filter((bk) => bk.completedBook === true);
  // }

  // console.log({ pd });

  if (typeof bookingsData === "undefined") {
    return {
      props: {
        progressData: null,
        allBookings: null,
        approvedMovers: null,

        // userData,
        // id,

        // prices,
        // userData,
      },
    };
  } else {
    return {
      props: {
        progressData: completedBookings,
        allBookings,
        approvedMovers,

        // userData,
        // id,

        // prices,
        // userData,
      },
    };
  }
}
