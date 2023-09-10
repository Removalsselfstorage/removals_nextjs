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
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import BookingLayout from "../layouts/BookingLayout";
import {
  getAllUserDetails,
  updateLoginError,
  updatePasswordResetError,
  updatePasswordResetMessage,
  updateUserNames,
} from "@/store/userSlice";
import useAuth from "@/hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

// const Login = ({ providers, csrfToken, callbackUrl }) => {
const LoginReset = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const details = useSelector(getAllDetails);
  const userDetails = useSelector(getAllUserDetails);

  const initialValues = {
    reset_email: "",
    success: "",
    error: "",
  };

  // const [field, meta] = useField(props);
  const { signIn, signUp, forgotPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialValues);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { reset_email, success, error } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginValidation = Yup.object().shape({
    reset_email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email address is required"),
  });

  const toastStyle = {
    background: "white",
    color: "black",
    fontWeight: "bold",
    fontSize: "16px",
    padding: "15px",
    borderRadius: "9999px",
    maxWidth: "1000px",
  };

  const resetHandler = async (values, actions) => {
    setSubmitLoading(true);
    dispatch(updatePasswordResetError(null));
    dispatch(updatePasswordResetMessage(null));
    // alert(JSON.stringify(values, null, 2));

    await forgotPassword(values.reset_email);
    // toast(`A Reset link has been sent to your email`, {
    //   duration: 4000,
    //   style: toastStyle,
    // });
    setUser({ ...user, reset_email: "" });
    setSubmitLoading(false);
    // actions.setSubmitting(false);
  };

  useEffect(() => {
    dispatch(updatePasswordResetError(null));
    dispatch(updatePasswordResetMessage(null));
    // dispatch(updateSignupError(null));
  }, []);

  //phone number validation

  return (
    <BookingLayout>
      <Head>
        <title>Removals and Selfstorage - Reset Login</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <main
        className="h-[100vh] flex justify-center items-center"
        style={{
          backgroundImage: "url(/bg-tarvel3.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <Toaster position="bottom-center" /> */}
        <div className="card shadow-2xl bg-base-100 justify-center text-black w-full md:w-[400px] mx-[20px] px-[20px] pt-[10px] pb-[30px]">
          <div className="card-body ">
            <h3 className="text-2xl font-extrabold text-primary uppercase mt-[0px] mb-[0px] text-center">
              RESET PASSWORD
            </h3>
            <p className="text-center text-[14px] mb-[20px]">
              Enter your email address and we'll send you instructions to reset
              your password.
            </p>
            <div className="w-full">
              <Formik
                enableReinitialize
                initialValues={user}
                validationSchema={loginValidation}
                onSubmit={(values, actions) => {
                  resetHandler(values, actions);
                }}
              >
                {(form) => (
                  <Form method="post">
                    {/* <input
                      type="hidden"
                      name="csrfToken"
                      defaultValue={csrfToken}
                    /> */}
                    {/* email */}
                    <div className="mb-[10px]">
                      <LoginInput
                        type="email"
                        name="reset_email"
                        // icon="email"
                        placeholder="Email Address"
                        onChange={handleChange}
                        value={reset_email}
                      />
                    </div>

                    <div className="form-control mt-[20px] mb-[10px]">
                      <button
                        // onClick={() => {}}
                        type="submit"
                        className="btn btn-primary flex items-center space-x-[5px]"
                      >
                        {!submitLoading && <span className="">Continue</span>}
                        {submitLoading && (
                          <span className="loading loading-dots loading-md text-white"></span>
                        )}
                      </button>
                    </div>

                    {/* {userDetails.passwordResetError && (
                      <p className="text-center text-[15px] text-secondary">
                        Account with the email doesn't exist
                      </p>
                    )} */}
                    {userDetails.passwordResetError &&
                      !userDetails.passwordResetMessage && (
                        <p className="text-[14px] text-center mt-[15px] text-secondary bg-secondary/20 rounded-[10px] py-[10px] px-[30px]">
                          Account with the email doesn't exist
                        </p>
                      )}
                    {userDetails.passwordResetMessage && (
                      <p className="text-center text-[15px] text-primary  mt-[15px] bg-primary/20 rounded-[10px] py-[10px] px-[30px]">
                        {userDetails.passwordResetMessage}
                      </p>
                    )}

                    <div className="mt-[20px] text-[14px] flex items-center justify-center mx-[0px]">
                      <Link
                        href="/mover-login"
                        className="flex items-center space-x-[5px] cursor-pointer"
                      >
                        <FaArrowLeft className="text-primary mr-[10px]" />
                        <span className="text-primary font-bold text-[15px] cursor-pointer">
                          Return to login
                        </span>
                      </Link>
                    </div>
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

export default LoginReset;
