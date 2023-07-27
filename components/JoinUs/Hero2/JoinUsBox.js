import React, { useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import FullRating from "../../Rating/FullRating";
import { useDispatch, useSelector } from "react-redux";

import SelectSearch from "@/components/Inputs/SelectSearch";
import { citiesOptions, serviceOptions } from "@/dummyData/inputData";
import GoogleSearchInput from "@/components/Inputs/GoogleSearchInput";
import useGoogleSearch from "@/utils/useGoogleSearch";
import {
  getAllDetails,
  updateLocationDetails,
  updateMoveDetails,
} from "@/store/quoteSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StarRating from "@/components/Rating/EditHalfStars2";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

const JoinUsBox = () => {
  const router = useRouter();

  //   const { mapApiJs, geocodeJson, loadAsyncScript, extractAddress } =
  //     useGoogleSearch();
  const dispatch = useDispatch();

  const details = useSelector(getAllDetails);

  const [address, setAddress] = useState("");
  const [addressDetails, setAddressDetails] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressDetails2, setAddressDetails2] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [activateError, setActivateError] = useState(false);
  const [email, setEmail] = useState(details.personalDetails.email || "");
  const [emailError, setEmailError] = useState(true);
  const [phone, setPhone] = useState(details.personalDetails.telephone || "");
  const [phoneError, setPhoneError] = useState(true);
  const [firstName, setFirstName] = useState(
    details.personalDetails.firstName || ""
  );
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [lastName, setLastName] = useState(
    details.personalDetails.lastName || ""
  );

  const [selectValue, setSelectValue] = useState(
    details.moveDetails.propertyType || ""
  );
  const [error, setError] = useState(false);

  const durationCalculation = () => {
    let price = 0;
    switch (key) {
      case value:
        break;

      default:
        break;
    }
  };

  const handleEmailChange = (e) => {
    // const inputValue = e.target.value;
    setEmail(e.target.value);

    // Regular expression to validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // setIsValid(emailPattern.test(inputValue));
    setEmailError(emailPattern.test(e.target.value));
  };

  //phone number validation
  const handlePhoneNumberChange = (event) => {
    const inputValue = event.target.value;

    // Remove any non-digit characters from the input
    const strippedNumber = inputValue.replace(/\D/g, "");

    // Check if the stripped number is either 10 or 11 digits long
    const isValidPhoneNumber =
      strippedNumber.length === 10 || strippedNumber.length === 11;

    setPhone(strippedNumber);
    setPhoneError(isValidPhoneNumber);
  };

  const heroFormSubmit = () => {
    setError(false);
    if (selectValue == "" || !address || !address2) {
      setError(true);
    } else {
      setSubmitLoading(true);
      dispatch(
        updateLocationDetails({
          //   moveService: details.serviceLocation.moveService,
          locationFrom: {
            name: address,
            postCode: addressDetails
              ? addressDetails.zip
              : details.serviceLocation.locationFrom.postCode,
            city: addressDetails
              ? addressDetails.city
              : details.serviceLocation.locationTo.city,
            country: addressDetails
              ? addressDetails.country
              : details.serviceLocation.locationTo.country,
            floor: details.serviceLocation.locationFrom.floor,
            liftAvailable: details.serviceLocation.locationFrom.liftAvailable,
          },
          locationTo: {
            name: address2,
            postCode: addressDetails2.zip,
            city: addressDetails2.city,
            country: addressDetails2.country,
            floor: details.serviceLocation.locationTo.floor,
            liftAvailable: details.serviceLocation.locationTo.liftAvailable,
          },
        })
      );
      switch (selectValue) {
        case "Office removals":
          dispatch(
            updateMoveDetails({
              propertyType: selectValue,
              numberOfMovers: details.moveDetails.numberOfMovers,
              mileage: details.moveDetails.mileage,
              volume: details.moveDetails.volume,
              duration: details.moveDetails.duration,
              moveDate: details.moveDetails.moveDate,
              moveDateRaw: details.moveDetails.moveDateRaw,
              movePackage: details.moveDetails.movePackage,
              quoteRef: details.moveDetails.quoteRef,
              initialPackagePrice: details.moveDetails.initialPackagePrice,
            })
          );
          router.push("/book/man-and-van");
          break;
        case "Man and van":
          router.push("/book/man-and-van");
          break;
        case "Studio flat":
          dispatch(
            updateMoveDetails({
              propertyType: selectValue,
              numberOfMovers: details.moveDetails.numberOfMovers,
              mileage: details.moveDetails.mileage,
              volume: details.moveDetails.volume,
              duration: details.moveDetails.duration,
              moveDate: details.moveDetails.moveDate,
              moveDateRaw: details.moveDetails.moveDateRaw,
              movePackage: details.moveDetails.movePackage,
              quoteRef: details.moveDetails.quoteRef,
              initialPackagePrice: details.moveDetails.initialPackagePrice,
            })
          );
          router.push("/book/man-and-van");
          break;
        case "Furniture & Appliances":
          dispatch(
            updateMoveDetails({
              propertyType: selectValue,
              numberOfMovers: details.moveDetails.numberOfMovers,
              mileage: details.moveDetails.mileage,
              volume: details.moveDetails.volume,
              duration: details.moveDetails.duration,
              moveDate: details.moveDetails.moveDate,
              moveDateRaw: details.moveDetails.moveDateRaw,
              movePackage: details.moveDetails.movePackage,
              quoteRef: details.moveDetails.quoteRef,
              initialPackagePrice: details.moveDetails.initialPackagePrice,
            })
          );
          router.push("/book/man-and-van");
          break;
        case "Storage":
          router.push("/book/man-and-van");
          break;
        case "Home removals":
          router.push("/book/home-removals");
          break;
        case "1 bed property":
          dispatch(
            updateMoveDetails({
              propertyType: selectValue,
              numberOfMovers: details.moveDetails.numberOfMovers,
              mileage: details.moveDetails.mileage,
              volume: details.moveDetails.volume,
              duration: details.moveDetails.duration,
              moveDate: details.moveDetails.moveDate,
              moveDateRaw: details.moveDetails.moveDateRaw,
              movePackage: details.moveDetails.movePackage,
              quoteRef: details.moveDetails.quoteRef,
              initialPackagePrice: details.moveDetails.initialPackagePrice,
            })
          );
          router.push("/book/home-removals");
          break;
        case "2 bed property":
          dispatch(
            updateMoveDetails({
              propertyType: selectValue,
              numberOfMovers: details.moveDetails.numberOfMovers,
              mileage: details.moveDetails.mileage,
              volume: details.moveDetails.volume,
              duration: details.moveDetails.duration,
              moveDate: details.moveDetails.moveDate,
              moveDateRaw: details.moveDetails.moveDateRaw,
              movePackage: details.moveDetails.movePackage,
              quoteRef: details.moveDetails.quoteRef,
              initialPackagePrice: details.moveDetails.initialPackagePrice,
            })
          );
          router.push("/book/home-removals");
          break;
        case "3 bed property":
          dispatch(
            updateMoveDetails({
              propertyType: selectValue,
              numberOfMovers: details.moveDetails.numberOfMovers,
              mileage: details.moveDetails.mileage,
              volume: details.moveDetails.volume,
              duration: details.moveDetails.duration,
              moveDate: details.moveDetails.moveDate,
              moveDateRaw: details.moveDetails.moveDateRaw,
              movePackage: details.moveDetails.movePackage,
              quoteRef: details.moveDetails.quoteRef,
              initialPackagePrice: details.moveDetails.initialPackagePrice,
            })
          );
          router.push("/book/home-removals");
          break;
        case "4 bed property":
          dispatch(
            updateMoveDetails({
              propertyType: selectValue,
              numberOfMovers: details.moveDetails.numberOfMovers,
              mileage: details.moveDetails.mileage,
              volume: details.moveDetails.volume,
              duration: details.moveDetails.duration,
              moveDate: details.moveDetails.moveDate,
              moveDateRaw: details.moveDetails.moveDateRaw,
              movePackage: details.moveDetails.movePackage,
              quoteRef: details.moveDetails.quoteRef,
              initialPackagePrice: details.moveDetails.initialPackagePrice,
            })
          );
          router.push("/book/home-removals");
          break;

        default:
          router.push("/book");
          break;
      }
    }
  };

  const selectDefaultValue = () => {
    const option = serviceOptions.filter(
      (opt) => opt.value == details.moveDetails.propertyType
    );
    return option;
  };

  //   console.log(address);
  //   console.log(addressDetails)
  //   console.log(address2)
  //   console.log(addressDetails2)
  //   console.log(selectValue);
  //   console.log(addressDetails);
  //   console.log(addressDetails);
  console.log(details);

  return (
    <div className="card shadow-2xl bg-base-100 justify-center  text-black w-full md:w-[400px]">
      <div className="card-body w-full">
        <h3 className="text-2xl font-extrabold text-primary uppercase mt-[0px] mb-[20px] text-center">
          Join us for free!
        </h3>
        <div className="w-full">
          <div className="flex space-x-[20px]">
            {/* first name */}
            <div className="form-control w-full mb-[20px]">
              {/* <label className="label">
                <span className="label-text font-semibold">First Name*</span>
              </label> */}
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
            {/* Last name */}
            <div className="form-control w-full mb-[20px]">
              {/* <label className="label">
                <span className="label-text font-semibold">Last Name*</span>
              </label> */}
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
          </div>

          {/* email */}
          <div className="form-control w-full mb-[20px]">
            {/* <label className="label">
              <span className="label-text font-semibold">Email*</span>
            </label> */}
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
          </div>

          {/* Telephone* */}
          <div className="form-control w-full flex-[1] mb-[20px]">
            {/* <label className="label">
                        <span className="label-text font-semibold">
                          Telephone*
                        </span>
                      </label> */}
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
          </div>

          {/* password */}
          <div className="w-full flex items-center justify-between">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`${
                activateError && !password ? "ring ring-secondary" : ""
              } input input-primary flex-1`}
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
          </div>

          <div className="form-control mt-6">
            <button
              onClick={() => {}}
              className="btn btn-primary flex items-center space-x-[5px]"
            >
              {!submitLoading && <span className="">Get Started</span>}
              {submitLoading && (
                <span className="loading loading-dots loading-md text-white"></span>
              )}
            </button>
          </div>
          {error && (
            <p className="text-secondary w-full text-center mt-[10px]">
              Please input all fields
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinUsBox;
