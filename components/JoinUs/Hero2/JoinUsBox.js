import React, { useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import FullRating from "../../Rating/FullRating";
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
import * as Yup from "yup";
import { Form, Formik, useField } from "formik";
import LoginInput from "@/components/LoginInput";
import useAuth from "@/hooks/useAuth";
import {
  getAllUserDetails,
  updateSignupError,
  updateSignupMessage,
  updateUserNames,
} from "@/store/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { getAllMoverDetails } from "@/store/moverSlice";

// const JoinUsBox = ({ providers, csrfToken, callbackUrl }) => {
const JoinUsBox = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const details = useSelector(getAllMoverDetails);

  const userDetails = useSelector(getAllUserDetails);

  const initialValues = {
    signup_email: "",
    signup_password: "",
    signup_passwordConfirm: "",
    signup_firstname: "",
    signup_lastname: "",
    success: "",
    error: "",
  }; // console.log(details);

  const { signIn, signUp } = useAuth();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const {
    signup_email,
    signup_password,
    signup_passwordConfirm,
    signup_firstname,
    signup_lastname,
    success,
    error,
  } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const signUpValidation = Yup.object().shape({
    signup_firstname: Yup.string().required("First name is required"),
    signup_lastname: Yup.string().required("Last name is required"),
    signup_email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email address is required"),
    signup_password: Yup.string()
      .required("Please enter a password")
      .min(8, "Password must be at least 8 characters")
      .max(32, `Password can't be more than 32 characters`),
    signup_passwordConfirm: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("signup_password")], `Password doesn't match`),
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

  const signUpHandler = async (values, actions) => {
    setSubmitLoading(true);

    dispatch(updateSignupMessage(null));
    dispatch(updateSignupError(null));

    // alert(JSON.stringify(values, null, 2));
    await signUp(
      values.signup_email,
      values.signup_password,
      values.signup_firstname,
      values.signup_lastname
    );
    setUser({
      ...user,
      signup_email: "",
      signup_password: "",
      signup_passwordConfirm: "",
      signup_firstname: "",
      signup_lastname: "",
    });

    setSubmitLoading(false);

    // toast(
    //   `
    //   ${userDetails.signupError && "Email does exist"}
    //   ${userDetails.signupMessage && "Signup was successful"}`,
    //   {
    //     duration: 8000,
    //     style: toastStyle,
    //   }
    // );
    // setSubmitLoading(false);
    // actions.setSubmitting(false);
  };

  useEffect(() => {
    dispatch(updateSignupMessage(null));
    dispatch(updateSignupError(null));
  }, []);

  // const buttonHandler = () => {
  //   setShowSpinner(true)

  //   setLogin(false)
  // }

  return (
    <div className="card shadow-2xl bg-base-100 justify-center text-black w-full md:w-[400px]">
      {/* <Toaster position="bottom-center" /> */}
      <div className="card-body ">
        <h3 className="text-2xl font-extrabold text-primary uppercase mt-[0px] mb-[20px] text-center">
          Join us for free!
        </h3>
        <div className="w-full">
          <Formik
            enableReinitialize
            initialValues={user}
            validationSchema={signUpValidation}
            onSubmit={(values, actions) => {
              signUpHandler(values, actions);
            }}
          >
            {(form) => (
              // <Form method="post" action="/api/auth/signin/email">
              <Form>
                {/* <input
                  type="hidden"
                  name="csrfToken"
                  defaultValue={csrfToken}
                /> */}
                {/* names */}
                <div className="flex space-x-[20px] mb-[10px]">
                  <div className="form-control w-full mb-[0px]">
                    <LoginInput
                      type="text"
                      name="signup_firstname"
                      // icon="email"
                      placeholder="First Name"
                      onChange={handleChange}
                      value={signup_firstname}
                    />
                  </div>

                  <div className="form-control w-full mb-[0px]">
                    <LoginInput
                      type="text"
                      name="signup_lastname"
                      // icon="email"
                      placeholder="Last Name"
                      onChange={handleChange}
                      value={signup_lastname}
                    />
                  </div>
                </div>
                {/* email */}
                <div className="mb-[10px]">
                  <LoginInput
                    type="email"
                    name="signup_email"
                    // icon="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                    value={signup_email}
                  />
                </div>
                {/* password */}
                <div className="w-full flex  justify-between mb-[10px] relative">
                  <div className="w-full">
                    <LoginInput
                      type={showPassword ? "text" : "password"}
                      name="signup_password"
                      placeholder="Password"
                      onChange={handleChange}
                      value={signup_password}
                    />
                  </div>
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="pl-[10px] cursor-pointer pt-[10px] absolute right-[10px]"
                  >
                    {showPassword ? (
                      <RiEyeCloseLine className="text-primary text-[20px]" />
                    ) : (
                      <RiEyeLine className="text-primary text-[20px]" />
                    )}
                  </span>
                </div>

                {/*confirm password */}
                <div className="w-full flex  justify-between mb-[10px] relative">
                  <div className="w-full">
                    <LoginInput
                      type={showPassword2 ? "text" : "password"}
                      name="signup_passwordConfirm"
                      placeholder="Confirm Password"
                      onChange={handleChange}
                      value={signup_passwordConfirm}
                    />
                  </div>
                  <span
                    onClick={() => setShowPassword2(!showPassword2)}
                    className="pl-[10px] cursor-pointer pt-[10px] absolute right-[10px]"
                  >
                    {showPassword2 ? (
                      <RiEyeCloseLine className="text-primary text-[20px]" />
                    ) : (
                      <RiEyeLine className="text-primary text-[20px]" />
                    )}
                  </span>
                </div>

                {/* register button */}
                <div className="form-control mt-6 mb-[10px]">
                  <button
                    // onClick={() => {}}
                    type="submit"
                    disabled={submitLoading}
                    className="btn btn-primary flex items-center space-x-[5px]"
                  >
                    {!submitLoading && <span className="">Register</span>}
                    {submitLoading && (
                      <span className="loading loading-spinner loading-md text-white"></span>
                    )}
                  </button>
                </div>

                {userDetails.signupError && !userDetails.signupMessage && (
                  <div className="text-[14px] text-center mt-[15px] text-secondary bg-secondary/20 rounded-[10px] py-[10px] px-[30px]">
                    Email already in use
                  </div>
                )}
                {userDetails.signupMessage && (
                  <>
                    <p className="text-center text-[14px] text-primary mt-[15px] bg-primary/20 rounded-[10px] py-[10px] px-[30px]">
                      {userDetails.signupMessage}
                    </p>
                  </>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default JoinUsBox;
