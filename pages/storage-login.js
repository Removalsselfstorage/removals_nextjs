import React, { useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";



import Link from "next/link";
import { useRouter } from "next/navigation";
import StarRating from "@/components/Rating/EditHalfStars2";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import NormalLayout from "@/layouts/NormalLayout";
import Head from "next/head";
import { getCsrfToken, getProviders, getSession } from "next-auth/react";
import * as Yup from "yup";
import { Form, Formik, useField } from "formik";
import LoginInput from "@/components/LoginInput";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import { fetchAllBookings, fetchAllStorage } from "@/lib/fetchData2";
import useQuote from "@/hooks/useQuote";
import useLocalStorage from "use-local-storage";

// const Login = ({ providers, csrfToken, callbackUrl }) => {
const StorageLogin = ({ data }) => { 

  const [storageId, setStorageId] = useLocalStorage("name", "");

  const { updateReserveIdFxn, reserveId, reserveDetails, router } = useQuote();

  // const router = useRouter();

  // const dispatch = useDispatch();

  // const details = useSelector(getAllDetails);

  const initialValues = {
    email: "",
    login_ref: "",
    success: "",
    error: "",
  };

  // const [field, meta] = useField(props);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const { email, login_ref, success, error } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginValidation = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Book Email is required"),
    login_ref: Yup.string().required("Book Ref ID is required"),
    // .min(25, "Booking ID must be 25 characters")
    // .max(25, `Booking ID must be 25 characters`),
  });

  const signInHandler = (values, actions) => {
    setSubmitLoading(true);

    setErrorMessage("");

    const findBookingId = data.find((bk) => {
      return bk.bookRef === values.login_ref && bk.email === values.email;

      // console.log({ bq: bk.quoteRef, vr: values.login_ref });
    });

    // const findBookingEmail = data.find((bk) => {
    //   bk.email === values.email;
    //   console.log({ bq: bk.quoteRef, vr: values.login_ref });
    // });

    // console.log({
    //   data,
    //   ve: values.email,
    //   vr: values.login_ref,
    //   findBookingId,
    //   // findBookingEmail,
    // });

    if (findBookingId) {
      // console.log({ findBookingId });
      setStorageId(findBookingId.bookId)
      router.replace(`storage/reservations/${findBookingId.bookId}`);
      setUser({
        ...user,
        login_ref: "",
        email: "",
      });
      // setSubmitLoading(false);
      // updateReserveIdFxn(findBookingId.bookingId);
    } else if (!findBookingId) {
      setErrorMessage("Book Email / Ref ID is invalid");
      setSubmitLoading(false);
      setUser({
        ...user,
        login_ref: "",
        email: "",
      });
    }
  };

  //phone number validation
  // console.log({ data, reserveDetails, reserveId });

  return (
    <NormalLayout>
      <Head>
        <title>Removals and Selfstorage - Login</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>

      <main
        className='h-[100vh] flex justify-center items-center pt-[100px]'
        style={{
          backgroundImage: "url(/bg-tarvel3.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className='card shadow-2xl bg-base-100 justify-center text-black w-full md:w-[400px] mx-[20px] px-[20px] pt-[10px] pb-[30px]'>
          <div className='card-body '>
            <h3 className='text-2xl font-extrabold text-primary mt-[0px] mb-[20px] text-center'>
              Storage Dashboard
            </h3>
            {/* <p className="text-[20px] font-bold w-full text-center mb-[0px]">
              Reservation dashboard.
            </p> */}

            <div className='w-full'>
              <Formik
                enableReinitialize
                initialValues={user}
                validationSchema={loginValidation}
                onSubmit={(values, actions) => {
                  signInHandler(values, actions);
                }}
              >
                {(form) => (
                  <Form>
                    <div className='mt-[0px]'>
                      <LoginInput
                        type='email'
                        name='email'
                        // icon="email"
                        placeholder='Enter your Book Email'
                        onChange={handleChange}
                        value={user.email}
                        disabled={submitLoading}
                      />
                    </div>

                    <div className='mt-[5px]'>
                      <LoginInput
                        type='text'
                        name='login_ref'
                        // icon="email"
                        placeholder='Enter your Storage Ref ID'
                        onChange={handleChange}
                        value={user.login_ref}
                        disabled={submitLoading}
                      />
                    </div>

                    <p className='w-full text-center text-primary mb-[5px] text-[14px]'>
                      (The Ref ID can be found in the confirmation email
                      received after booking)
                    </p>
                    {/* <div className={styles.button}>
                      <CircledIconBtn type="submit" text="Sign In" />
                      {error && <span className={styles.error}>{error}</span>}
                    </div> */}
                    <div className='form-control mt-6'>
                      <button
                        // onClick={() => {}}
                        type='submit'
                        disabled={submitLoading}
                        className='btn btn-secondary flex items-center space-x-[5px]'
                      >
                        {!submitLoading && (
                          <span className=''>Login</span>
                        )}
                        {submitLoading && (
                          <span className='loading loading-spinner loading-md text-white'></span>
                        )}
                      </button>
                    </div>
                    {errorMessage && (
                      <div className='text-[14px] text-center mt-[15px] text-secondary bg-secondary/20 rounded-[10px] py-[10px] px-[30px]'>
                        {errorMessage}
                      </div>
                    )}

                    <div className='mt-[20px] text-[14px] flex items-center justify-center mx-[0px]'>
                      <p className='w-[50px]'>Don't have a Booking ID?</p>
                      <Link
                        href='/book'
                        className='flex items-center space-x-[5px] cursor-pointer'
                      >
                        <span className='text-secondary font-bold text-[15px] cursor-pointer'>
                          Book Now
                        </span>
                        <FaArrowRight className='text-secondary' />
                      </Link>
                    </div>
                    {/* <div className={styles.account}>
                      <Link href="/auth/forgot" className={styles.forgot}>
                        Forgot password?
                      </Link>{" "}
                      |
                      <Link href="/signup" className={styles.forgot}>
                        {" "}
                        Sign Up
                      </Link>
                    </div> */}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </main>
    </NormalLayout>
  );
};

export default StorageLogin;

export async function getServerSideProps(context) {
  // const { id } = context.params; // Access the UID from the URL
  const bookingsData = await fetchAllStorage();

  const completedBookings = bookingsData?.bookings?.filter(
    (bk) => bk.completedBook === true
  );

  // const sortedData = [...completedBookings].sort((a, b) => {
  //   return new Date(b.date) - new Date(a.date);
  // });

  return {
    props: {
      // userData,
      data: completedBookings || [],
    },
  };
}
