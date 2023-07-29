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

const JoinUsBox = ({ providers, csrfToken, callbackUrl }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const details = useSelector(getAllDetails);

  const initialValues = {
    signup_email: "",
    signup_password: "",
    signup_firstname: "",
    signup_lastname: "",
    success: "",
    error: "",
  }; // console.log(details);

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

  const signUpHandler = (values, actions) => {
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  };

  return (
    <div className="card shadow-2xl bg-base-100 justify-center text-black w-full md:w-[400px]">
      <div className="card-body ">
        <h3 className="text-2xl font-extrabold text-primary uppercase mt-[0px] mb-[20px] text-center">
          Join us for free!
        </h3>
        <div className="w-full">
          {/* <div className="flex space-x-[20px]">
            <div className="form-control w-full mb-[20px]">
              <input
                type="text"
                placeholder="First Name"
                className={`${
                  activateError && !firstName ? "ring ring-secondary" : ""
                } input input-primary w-full h-[43px]`}
                onChange={(e) => setFirstName(e.target.value)}
                defaultValue={firstName}
              />
            </div>

            <div className="form-control w-full mb-[20px]">
              <input
                type="text"
                placeholder="Last Name"
                className={`${
                  activateError && !lastName ? "ring ring-secondary" : ""
                } input input-primary w-full h-[43px]`}
                onChange={(e) => setLastName(e.target.value)}
                defaultValue={lastName}
              />
            </div>
          </div> */}

          {/* <div className="form-control w-full mb-[20px]">
            <input
              type="email"
              placeholder="Email Address"
              className={`${
                activateError && (!email || !emailError)
                  ? "ring ring-secondary"
                  : ""
              } input input-primary w-full h-[43px]`}
              onChange={handleEmailChange}
              //
              defaultValue={email}
            />
            {!emailError && email && (
              <p className="text-[14px] text-secondary mt-[5px]">
                Please enter a valid email
              </p>
            )}
          </div> */}

          {/* <div className="form-control w-full flex-[1] mb-[20px]">
            <input
              type="tel"
              placeholder="Phone Number"
              className={`${
                activateError && (!phone || !phoneError)
                  ? "ring ring-secondary"
                  : ""
              } input input-primary w-full h-[43px]`}
              onChange={handlePhoneNumberChange}
              defaultValue={phone}
            />
            {!phoneError && phone && (
              <p className="text-[14px] text-secondary mt-[5px]">
                Please enter a valid number
              </p>
            )}
          </div> */}

          {/* <div className="w-full flex items-center justify-between">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`${
                activateError && !password ? "ring ring-secondary" : ""
              } input input-primary w-full`}
              onChange={(e) => setPassword(e.target.value)}
              defaultValue={password}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="pl-[10px] cursor-pointer"
            >
              {showPassword ? (
                <RiEyeCloseLine className="text-primary text-[20px]" />
              ) : (
                <RiEyeLine className="text-primary text-[20px]" />
              )}
            </span>
          </div> */}

          {/* <div className="form-control mt-6">
            <button
              onClick={() => {}}
              className="btn btn-primary flex items-center space-x-[5px]"
            >
              {!submitLoading && <span className="">Get Started</span>}
              {submitLoading && (
                <span className="loading loading-dots loading-md text-white"></span>
              )}
            </button>
          </div> */}
          {/* {error && (
            <p className="text-secondary w-full text-center mt-[10px]">
              Please input all fields
            </p>
          )} */}

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
                <input
                  type="hidden"
                  name="csrfToken"
                  defaultValue={csrfToken}
                />
                {/* names */}
                <div className="flex space-x-[20px] mb-[10px]">
                  <div className="form-control w-full mb-[0px]">
                    <LoginInput
                      type="text"
                      name="signup_firstname"
                      // icon="email"
                      placeholder="First Name"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-control w-full mb-[0px]">
                    <LoginInput
                      type="text"
                      name="signup_lastname"
                      // icon="email"
                      placeholder="Last Name"
                      onChange={handleChange}
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
                  />
                </div>

                <div className="w-full flex  justify-between mb-[10px]">
                  <div className="w-full">
                    <LoginInput
                      type={showPassword ? "text" : "password"}
                      name="signup_password"
                      placeholder="Password"
                      onChange={handleChange}
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
                <div className="form-control mt-6">
                  <button
                    onClick={() => {}}
                    type="submit"
                    className="btn btn-primary flex items-center space-x-[5px]"
                  >
                    {!submitLoading && <span className="">Get Started</span>}
                    {submitLoading && (
                      <span className="loading loading-dots loading-md text-white"></span>
                    )}
                  </button>
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
  );
};

export default JoinUsBox;
