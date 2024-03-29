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
import { fetchAllBookings } from "@/lib/fetchData2";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ReservationCheckoutSuccess = ({ allBookings }) => {
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

  const reset = () => {
    // let check = false;
    resetLocationFrom();
    resetLocationTo();
    resetPersonal();
    resetMove();
    resetMover();
    resetPayment();
    resetMoverSide();
    resetBookS();
    console.log("successfully reset all", { moveDetails });
  };

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
    message: `User ${cb?.firstName} ${cb?.lastName} with booking ID ${cb?.bookingId} just successfully paid for ${cb?.propertyType} ${cb?.movePackage} Package with ${cb?.numberOfMovers} and Jumbo Van with a total price of ₤${cb?.paidPrice} out of ₤${cb?.moverPrice}.`,
    subject: `Successful move payment (${total}) by user ${cb?.firstName} ${cb?.lastName}`,
    bookLink: `https://rss-admin.vercel.app/secret-admin/users/booking/${cb?.bookingId}`,
    bookingId: cb?.bookingId,
    // page: "checkout page",
  };

  const sendBookedMail = async () => {
    try {
      await bookedEmail(cb?.email, params3);
    } catch (error) {
      console.log(error);
    }
  };

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
        doc(db, "bookingData", moveDetails?.bookingId),

        {
          date: getCurrentDateFormatted(),
          stage: "paid initial move price",
          activity: [
            ...cb?.activity,
            {
              name: `completed ${
                cb?.paidPart ? "20%" : cb?.paidFull ? "Full" : ""
              } payment of ${total} for move`,
              date: getCurrentDateFormatted(),
            },
          ],
          completedBook: true,
          movePaymentStatus: "PAID",
          // outPrice: 0,
          extraPrice: [
            {
              amount: 0,
              date: "",
              description: "",
            },
          ],
          // extraPricePaid: [],

          // moveStripeProducts: products,
          moveStripePayment: {
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
          outStripePayment: {
            amount: 0,
            date: "",
            description: "",
            stripeName: "",
            stripeEmail: "",
            stripeCountry: "",
            // stripeProducts: products,
            stripePaymentType: "",
            stripeSubtotal: "",
            stripeTotal: "",
          },
          extraStripePayment: [
            {
              amount: 0,
              date: "",
              description: "",
              stripeName: "",
              stripeEmail: "",
              stripeCountry: "",
              // stripeProducts: products,
              stripePaymentType: "",
              stripeSubtotal: "",
              stripeTotal: "",
            },
          ],
        },
        { merge: true }
      );

      // return true;
      console.log("move checkout update was successful @ Checkout success");
    } catch (error) {
      console.log(error);
      // return false;
      console.log("move checkout update was unsuccessful @ Checkout success");
    }
  };

  const handleDashboard = () => {
    // event.preventDefault();
    setSubmitLoading(true);
    updateReserveIdFxn(cb?.bookingId);
    sendStripe2();
    sendAllNotificationEmail();
    sendBookedMail();
    reset();
    updateReserveIdFxn(successDetails?.bookingId);
    router.push(`/`);
    // resetCartFxn();
  };

  useEffect(() => {
    const sendStripe = async () => {
      try {
        await setDoc(
          doc(db, "bookingData", moveDetails?.bookingId),

          {
            date: getCurrentDateFormatted(),
            stage: "paid initial move price",
            // activity: [
            //   ...cb?.activity,
            //   {
            //     name: `completed ${
            //       cb?.paidPart ? "20%" : cb?.paidFull ? "Full" : ""
            //     } payment of ${total} for move`,
            //     date: getCurrentDateFormatted(),
            //   },
            // ],
            completedBook: true,
            movePaymentStatus: "PAID",
            // outPrice: 0,
            extraPrice: [
              {
                amount: 0,
                date: "",
                description: "",
              },
            ],
            // extraPricePaid: [],

            // moveStripeProducts: products,

            outStripePayment: {
              amount: 0,
              date: "",
              description: "",
              stripeName: "",
              stripeEmail: "",
              stripeCountry: "",
              // stripeProducts: products,
              stripePaymentType: "",
              stripeSubtotal: "",
              stripeTotal: "",
            },
            extraStripePayment: [
              {
                amount: 0,
                date: "",
                description: "",
                stripeName: "",
                stripeEmail: "",
                stripeCountry: "",
                // stripeProducts: products,
                stripePaymentType: "",
                stripeSubtotal: "",
                stripeTotal: "",
              },
            ],
          },
          { merge: true }
        );

        // return true;
        console.log("move checkout update was successful @ Checkout success");
      } catch (error) {
        console.log(error);
        // return false;
        console.log("move checkout update was unsuccessful @ Checkout success");
      }
    };

    sendStripe();

    if (cb) {
      updateReserveIdFxn(cb?.bookingId);

      setSuccessDetails(cb);
    }
  }, []);

  console.log({ successDetails, allBookings, moveDetails });
  // console.log({ timer, moveDetails, paymentType, bookingId });

  return (
    <BookingLayout>
      <div className="bg-white py-[20px]">
        <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex justify-center w-full">
            <Lottie animationData={success} className="w-[200px]" />
          </div>
          <div className="max-w-xl">
            <h1 className="text-sm font-medium ">Payment successful</h1>
            <p className="mt-2 text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
              Thanks for Booking
            </p>
            <p className="mt-2 text-base text-gray-500">
              We appreciate your book, we’re currently processing it. So hang
              tight and we’ll send you confirmation very soon!
            </p>

            <dl className="mt-12 text-sm font-medium">
              <dt className="text-gray-900 font-bold">Book Ref:</dt>
              <dd className="text-primary mt-2 text-[16px]">
                {/* {checkoutSession?.payment_intent?.id} */}
                {moveDetails?.quoteRef || successDetails?.quoteRef}
              </dd>
            </dl>
          </div>

          <div className="mt-10 border-t border-gray-200">
            <h2 className="mt-[20px] font-bold">Your Move Package:</h2>

            {/* <h3 className="sr-only">Items</h3> */}
            {products?.map((product) => (
              <div
                key={product.id}
                className="py-10 border-b border-gray-200 flex space-x-6"
              >
                <img
                  src={product?.images[0]}
                  alt={product.description}
                  className="flex-none w-20 h-20 object-center object-cover bg-gray-100 rounded-lg sm:w-40 sm:h-40"
                />
                <div className="flex-auto flex flex-col">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      <p>{product.name}</p>
                    </h4>
                    <p className="mt-2 text-sm text-gray-600 ">
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-6 flex-1 flex items-end">
                    <dl className="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
                      {/* <div className="flex">
                        <dt className="font-medium text-gray-900">Quantity</dt>
                        <dd className="ml-2 text-gray-700">
                          {product.quantity}
                        </dd>
                      </div> */}
                      <div className="flex ">
                        <dt className="font-medium text-gray-900">Price</dt>
                        <dd className="ml-2 text-gray-700">Full Payment</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            ))}

            <div className="">
              <h3 className="sr-only">Your information</h3>

              <h4 className="sr-only">Payment</h4>
              <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 text-sm py-10">
                {payment?.card && (
                  <div>
                    <dt className="font-medium text-gray-900">
                      Payment Information
                    </dt>
                    <dd className="mt-2 text-gray-700">
                      <p>{payment?.card.wallet}</p>
                      <p className="font-medium">
                        {payment?.card.brand.toUpperCase()}
                      </p>
                      <div className="flex-auto">
                        <p className="text-gray-900">
                          Ending with {payment?.card.last4}
                        </p>
                        <p>
                          Expires on {payment.card.exp_month} /{" "}
                          {payment?.card.exp_year}
                        </p>
                      </div>
                    </dd>
                  </div>
                )}
                <div>
                  <dt className=" text-gray-900 font-bold">Billing Info</dt>
                  <dd className="mt-2 text-gray-700">
                    <address className="not-italic">
                      <span className="block">
                        <span className="font-bold">Name:</span>{" "}
                        {customer?.name}
                      </span>
                      <span className="block">
                        <span className="font-bold">Email:</span>{" "}
                        {customer?.email}
                      </span>
                      {customer?.address.country && (
                        <span className="block">
                          <span className="font-bold">Country:</span>{" "}
                          {customer?.address.country}
                        </span>
                      )}

                      {customer?.address.postal_code && (
                        <span className="block">
                          <span className="font-bold">Postal Code:</span>
                          {customer?.address.postal_code}
                        </span>
                      )}
                      <span className="block">
                        <span className="font-bold">Payment Type: </span>
                        {""}
                        {payment}
                      </span>
                    </address>
                  </dd>
                </div>
              </dl>

              <h3 className="sr-only">Summary</h3>

              <dl className="space-y-6 border-t border-gray-200 text-sm pt-10">
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">Subtotal</dt>
                  <dd className="text-gray-700">{subtotal}</dd>
                </div>
                {/* <div className="flex justify-between">
                  <dt className="flex font-medium text-gray-900">Discount</dt>
                  <dd className="text-gray-700">-{discount}</dd>
                </div> */}
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">Tax</dt>
                  <dd className="text-gray-700">{tax}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">Total</dt>
                  <dd className="text-gray-900">{total}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="w-full mt-10 flex justify-center items-center">
            <div
              onClick={handleDashboard}
              disabled={submitLoading}
              className="btn btn-primary btn-wide"
            >
              {/* Return to Dashboard */}
              {!submitLoading && <span className="">Go to Home Page</span>}
              {submitLoading && (
                <span className="loading loading-spinner loading-md text-white"></span>
              )}
            </div>
          </div>
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

        // userData,
        // id,

        // prices,
        // userData,
      },
    };
  }
}
