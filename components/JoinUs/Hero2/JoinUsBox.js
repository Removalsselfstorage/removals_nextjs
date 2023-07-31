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

// const JoinUsBox = ({ providers, csrfToken, callbackUrl }) => {
const JoinUsBox = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const details = useSelector(getAllDetails);

  const userDetails = useSelector(getAllUserDetails);

  const initialValues = {
    signup_email: "",
    signup_password: "",
    signup_firstname: "",
    signup_lastname: "",
    success: "",
    error: "",
  }; // console.log(details);

  const { signIn, signUp } = useAuth();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const {
    signup_email,
    signup_password,
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
  });

  const signUpHandler = async (values, actions) => {
    setSubmitLoading(true);

    dispatch(
      updateUserNames({
        firstName: values.signup_firstname,
        lastName: values.signup_lastname,
      })
    );
    // alert(JSON.stringify(values, null, 2));
    await signUp(values.signup_email, values.signup_password);
    setSubmitLoading(false);
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
              <Form method="post" action="/api/auth/signin/email">
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
                      value={user.signup_firstname}
                    />
                  </div>

                  <div className="form-control w-full mb-[0px]">
                    <LoginInput
                      type="text"
                      name="signup_lastname"
                      // icon="email"
                      placeholder="Last Name"
                      onChange={handleChange}
                      value={user.signup_lastname}
                    />
                  </div>
                </div>
                {/* email */}
                <div className="mb-[10px]">
                  <LoginInput
                    type="text"
                    name="signup_email"
                    // icon="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                    value={user.signup_email}
                  />
                </div>
                {/* password */}
                <div className="w-full flex  justify-between mb-[10px]">
                  <div className="w-full">
                    <LoginInput
                      type={showPassword ? "text" : "password"}
                      name="signup_password"
                      placeholder="Password"
                      onChange={handleChange}
                      value={user.signup_password}
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
                    {!submitLoading && <span className="">Register</span>}
                    {submitLoading && (
                      <span className="loading loading-dots loading-md text-white"></span>
                    )}
                  </button>
                </div>
                {userDetails.signupError  && !userDetails.signupMessage && (
                  <p className="text-center text-[15px] text-secondary">
                    Email already in use
                  </p>
                )}
                {userDetails.signupMessage && (
                  <p className="text-center text-[15px] text-primary">
                    {userDetails.signupMessage}
                  </p>
                )}

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
  );
};

export default JoinUsBox;
