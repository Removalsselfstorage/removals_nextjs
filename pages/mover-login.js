import React, { useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
// import FullRating from "../../Rating/FullRating";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllDetails,
  updateLocationDetails,
  updateMoveDetails,
} from "@/store/quoteSlice";
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
import { FaArrowRight } from "react-icons/fa";
import BookingLayout from "../layouts/BookingLayout";
import {
  getAllUserDetails,
  updateLoginError,
  updateUserNames,
} from "@/store/userSlice";
import useAuth from "@/hooks/useAuth";

// const Login = ({ providers, csrfToken, callbackUrl }) => {
const MoverLogin = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const details = useSelector(getAllDetails);
  const userDetails = useSelector(getAllUserDetails);

  const initialValues = {
    login_email: "",
    login_password: "",
    success: "",
    error: "",
  };

  // const [field, meta] = useField(props);
  const { signIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { login_email, login_password, success, error } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginValidation = Yup.object().shape({
    login_email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email address is required"),
    login_password: Yup.string().required("Please enter a password"),
    // .min(8, "Password must be at least 8 characters")
    // .max(32, `Password can't be more than 32 characters`),
  });

  const signInHandler = async (values, actions) => {
    setSubmitLoading(true);
    // alert(JSON.stringify(values, null, 2));
    dispatch(
      updateUserNames({
        firstName: values.signup_firstname,
        lastName: values.signup_lastname,
      })
    );
    await signIn(values.login_email, values.login_password);
    setSubmitLoading(false);
    // actions.setSubmitting(false);
  };

  useEffect(() => {
    dispatch(updateLoginError(null));
    // dispatch(updateSignupError(null));
  }, []);

  //phone number validation

  return (
    <BookingLayout>
      <Head>
        <title>Removals and Selfstorage - Login</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <main className="h-[100vh] flex justify-center items-center">
        <div className="card shadow-2xl bg-base-100 justify-center text-black w-full md:w-[400px] mx-[20px] px-[20px] pt-[10px] pb-[30px]">
          <div className="card-body ">
            <h3 className="text-2xl font-extrabold text-primary uppercase mt-[0px] mb-[20px] text-center">
              Mover Login
            </h3>
            <div className="w-full">
              <Formik
                enableReinitialize
                initialValues={user}
                validationSchema={loginValidation}
                onSubmit={(values, actions) => {
                  signInHandler(values, actions);
                }}
              >
                {(form) => (
                  <Form method="post" action="/api/auth/signin/email">
                    {/* <input
                      type="hidden"
                      name="csrfToken"
                      defaultValue={csrfToken}
                    /> */}
                    {/* email */}
                    <div className="mb-[10px]">
                      <LoginInput
                        type="text"
                        name="login_email"
                        // icon="email"
                        placeholder="Email Address"
                        onChange={handleChange}
                        value={user.login_email}
                      />
                    </div>
                    {/* password */}
                    {/* <div className="mb-[10px]">
                      <LoginInput
                        type="password"
                        name="login_password"
                        placeholder="Password"
                        onChange={handleChange}
                      />
                    </div> */}
                    <div className="w-full flex  justify-between mb-[10px]">
                      <div className="w-full">
                        <LoginInput
                          type={showPassword ? "text" : "password"}
                          name="login_password"
                          placeholder="Password"
                          onChange={handleChange}
                          value={user.login_password}
                        />
                      </div>
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="pl-[10px] cursor-pointer pt-[10px]"
                      >
                        {showPassword ? (
                          <RiEyeCloseLine className="text-primary text-[20px]" />
                        ) : (
                          <RiEyeLine className="text-primary text-[20px]" />
                        )}
                      </span>
                    </div>
                    {/* <div className={styles.button}>
                      <CircledIconBtn type="submit" text="Sign In" />
                      {error && <span className={styles.error}>{error}</span>}
                    </div> */}
                    <div className="form-control mt-6 mb-[10px]">
                      <button
                        // onClick={() => {}}
                        type="submit"
                        className="btn btn-primary flex items-center space-x-[5px]"
                      >
                        {!submitLoading && <span className="">Login</span>}
                        {submitLoading && (
                          <span className="loading loading-dots loading-md text-white"></span>
                        )}
                      </button>
                    </div>

                    {userDetails.loginError && (
                      <p className="text-center text-[15px] text-secondary">
                        Email / password is invalid
                      </p>
                    )}

                    <div className="mt-[20px] text-[14px] flex items-center justify-center mx-[0px]">
                      <p className="w-[50px]">Don't have an account yet?</p>
                      <Link
                        href="/join-us"
                        className="flex items-center space-x-[5px] cursor-pointer"
                      >
                        <span className="text-primary font-bold text-[15px] cursor-pointer">
                          Join Us
                        </span>
                        <FaArrowRight className="text-primary" />
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
    </BookingLayout>
  );
};

export default MoverLogin;

// export async function getServerSideProps(context) {
//   const { req, query } = context;

//   const session = await getSession({ req });
//   // const { callbackUrl } = query;

//   if (session) {
//     return {
//       redirect: {
//         destination: `${callbackUrl}`,
//         permanent: false,
//       },
//     };
//   }
//   const csrfToken = await getCsrfToken(context);

//   const providers = Object.values(await getProviders());
//   return {
//     props: {
//       providers,
//       csrfToken,
//       // callbackUrl,
//     },
//   };
// }
