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

const HeroInputBox = () => {
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
  // console.log(details);

  return (
    <div className="card shadow-2xl bg-base-100  text-black w-full md:w-[400px]">
      <div className="card-body ">
        <div className="flex flex-col items-center justify-center mb-[0px] bg-gray-200 rounded-tl-[18px] rounded-tr-[18px] mx-[-32px] mt-[-32px] pt-[20px] pb-[20px] md:px-[50px]">
          <h3 className="text-xl font-bold text-gray-800 uppercase mb-[-10px]">
            TRUST<span className="text-gray-500">PILOT</span>
          </h3>
          <div className="my-[12px]">
            <StarRating rating={4.9} size="text-[20px]" />
          </div>
          <p className="text-gray-400 text-[14px] mt-[-5px] text-center">
            TrustScore 4.9 | 4,155 Reviews
          </p>
        </div>
        <h3 className="text-2xl font-bold text-primary uppercase mt-[10px] text-center mb-[10px]">
          Get a Free Quote
        </h3>
        <div className="w-full">
          {/* what are you moving */}
          {/* <label className="label">
              <span className="font-semibold">What are you moving?</span>
            </label> */}
          <div className="w-full mb-[20px]">
            <SelectSearch
              placeholder="What are you moving?"
              options={serviceOptions}
              isSearchable={false}
              name="service"
              // defaultValue={serviceOptions[2]}
              defaultValue={selectDefaultValue() || serviceOptions(0)}
              setValue={setSelectValue}
            />
          </div>
          <div className="form-control mb-[20px]">
            {/* <label className="label">
              <span className="font-semibold">Where are you moving from?</span>
            </label> */}
            {/* <SelectSearch
              placeholder="Location"
              options={citiesOptions}
              isSearchable={true}
              name="location1"
            /> */}
            {/* <input ref={searchInput} type="text" placeholder="Search location...." className='border-primary border rounded-[10px] py-[10px] px-[10px] outline-none focus:border-[2px] active:border-[2px]'/> */}

            <GoogleSearchInput
              styles="py-[10px] px-[10px]"
              setAddress={setAddress}
              addressDetails={addressDetails}
              setAddressDetails={setAddressDetails}
              placeholder="Where are you moving from?"
              defaultValue={details.serviceLocation.locationFrom.name || null}
            />
            {/* <input
              ref={searchInput}
              type="text"
              placeholder="Search location..."
              className="border-primary border rounded-[10px] py-[10px] px-[10px] outline-none focus:border-[2px] active:border-[2px]"
            /> */}
          </div>
          <div className="form-control">
            {/* <label className="label">
              <span className="font-semibold">Where are you moving to?</span>
            </label> */}
            {/* <SelectSearch
              placeholder="Location"
              options={citiesOptions}
              isSearchable={true}
              name="location2"
            /> */}
            {/* <input
              ref={searchInput}
              type="text"
              placeholder="Search location..."
              className="border-primary border rounded-[10px] py-[10px] px-[10px] outline-none focus:border-[2px] active:border-[2px]"
            /> */}
            <GoogleSearchInput
              styles="py-[10px] px-[10px]"
              setAddress={setAddress2}
              addressDetails={addressDetails2}
              setAddressDetails={setAddressDetails2}
              placeholder="Where are you moving to?"
              defaultValue={details.serviceLocation.locationTo.name || null}
            />
          </div>
          <div className="form-control mt-6">
            <button
              onClick={heroFormSubmit}
              className="btn btn-primary flex items-center space-x-[5px]"
            >
              {!submitLoading && <span className="">Get Quote</span>}
              {submitLoading && (
                <span className="loading loading-dots loading-md text-white"></span>
              )}
              {!submitLoading && (
                <span className="">
                  <FiEdit className="text-[20px]" />
                </span>
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

export default HeroInputBox;
