import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import useProductCart from "@/hooks/useProductCart";
import BookingLayout from "@/layouts/BookingLayout";
import useQuote from "@/hooks/useQuote";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { getCurrentDateFormatted } from "@/utils/logics";
import { allNotificationEmail } from "@/lib/sendCustomEmail";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ReservationCheckoutSuccess = () => {
  const {
    allProducts,
    allCartProducts,

    // All Products
    increaseProductQtyFxn,
    decreaseProductQtyFxn,
    resetProductQtyFxn,

    // Cart Products
    addToCartFxn,
    increaseQuantityFxn,
    decreaseQuantityFxn,
    deleteProductFxn,
    resetCartFxn,
    calculateTotalPriceFxn,

    router,
  } = useProductCart();

  const [submitLoading, setSubmitLoading] = useState(false);

  const { reserveDetails } = useQuote();
  const bookingId = reserveDetails?.bookingId;

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

  const sendStripe = async () => {
    try {
      await setDoc(
        doc(db, "bookingData", bookingId),

        {
          date: getCurrentDateFormatted(),
          stage: "cart checkout successful",
          cartCheckedOut: "YES",
          cartPaymentStatus: "PAID",
          cartStripeDetails: {
            stripeCartName: customer?.name,
            stripeCartEmail: customer?.email,
            stripeCartCountry: customer?.address.country,
            stripeCartProducts: products,
            stripeCartPaymentType: payment,
            stripeCartSubtotal: subtotal,
            stripeCartTotal: total,
          },
        },
        { merge: true }
      );

      // return true;
      console.log("cart items update was successful @ Shopping Cart");
    } catch (error) {
      console.log(error);
      // return false;
      console.log("cart items update was unsuccessful @ Shopping Cart");
    }
  };

  const notificationEmail = [
    { email: "ifeanyi4umeh@gmail.com" },
    { email: "removalsselfstorage@gmail.com" },
  ];

  const notificationParams = {
    // firstName: reserveDetails?.firstName,
    // lastName: reserveDetails?.lastName,
    // itemNumber: products?.length,
    // totalPrice: total,
    message: `User ${reserveDetails?.firstName} ${reserveDetails?.lastName} with booking ID ${reserveDetails?.bookingId} just successfully paid for ${products?.length} packaging items(s) with a total price of ${total}.`,
    subject: `Successful packaging items payment by user ${reserveDetails?.firstName} ${reserveDetails?.lastName}`,
    bookLink: `https://rss-admin.vercel.app/secret-admin/users/booking/${reserveDetails?.bookingId}`,
    bookingId: reserveDetails?.bookingId,
    // page: "checkout page",
  };

  const sendAllNotificationEmail = async () => {
    try {
      await allNotificationEmail(notificationEmail, notificationParams);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    resetCartFxn();
    // if (customer) {
    //   sendStripe();
    // }
    // setTimeout(() => {
    // }, 3000);
  }, []);

  useEffect(() => {
    if (customer) {
      sendStripe();
      sendAllNotificationEmail();
    }
    // setTimeout(() => {
    // }, 3000);
  }, [customer]);

  const handleDashboard = (event) => {
    event.preventDefault();
    setSubmitLoading(true);
    router.push(`/reservations/${reserveDetails?.bookingId}`);
    // resetCartFxn();
  };

  console.log({ checkoutSession });

  return (
    <BookingLayout>
      <div className="bg-white py-[20px]">
        <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-xl">
            <h1 className="text-sm font-medium ">Payment successful</h1>
            <p className="mt-2 text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
              Thanks for ordering
            </p>
            <p className="mt-2 text-base text-gray-500">
              We appreciate your order, we’re currently processing it. So hang
              tight and we’ll send you confirmation very soon!
            </p>

            <dl className="mt-12 text-sm font-medium">
              <dt className="text-gray-900 font-bold">Booking Id:</dt>
              <dd className="text-primary mt-2 text-[16px]">
                {/* {checkoutSession?.payment_intent?.id} */}
                {bookingId}
              </dd>
            </dl>
          </div>

          <div className="mt-10 border-t border-gray-200">
            <h2 className="sr-only">Your order</h2>

            <h3 className="sr-only">Items</h3>
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
                      <a href={product.url}>{product.name}</a>
                    </h4>
                    <p className="mt-2 text-sm text-gray-600">
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-6 flex-1 flex items-end">
                    <dl className="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
                      <div className="flex">
                        <dt className="font-medium text-gray-900">Quantity</dt>
                        <dd className="ml-2 text-gray-700">
                          {product.quantity}
                        </dd>
                      </div>
                      <div className="pl-4 flex sm:pl-6">
                        <dt className="font-medium text-gray-900">Price</dt>
                        <dd className="ml-2 text-gray-700">
                          {(product.price / 100).toLocaleString("en-GB", {
                            style: "currency",
                            currency: "GBP",
                          })}
                        </dd>
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
                      <p>{payment.card.wallet}</p>
                      <p className="font-medium">
                        {payment.card.brand.toUpperCase()}
                      </p>
                      <div className="flex-auto">
                        <p className="text-gray-900">
                          Ending with {payment.card.last4}
                        </p>
                        <p>
                          Expires on {payment.card.exp_month} /{" "}
                          {payment.card.exp_year}
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
                      {customer?.address.country && <span className="block">
                        <span className="font-bold">Country:</span>{" "}
                        {customer?.address.country}
                      </span>}

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
            <button
              onClick={handleDashboard}
              disabled={submitLoading}
              className="btn btn-primary btn-wide"
            >
              {/* Return to Dashboard */}
              {!submitLoading && <span className="">Return to Dashboard</span>}
              {submitLoading && (
                <span className="loading loading-dots loading-md text-white"></span>
              )}
            </button>
          </div>
        </div>
      </div>
    </BookingLayout>
  );
};

export default ReservationCheckoutSuccess;
