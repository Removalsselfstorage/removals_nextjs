import React, { useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";

import SelectSearch from "@/components/Inputs/SelectSearch";
import { citiesOptions, serviceOptions } from "@/dummyData/inputData";
import GoogleSearchInput from "@/components/Inputs/GoogleSearchInput";

import StarRating from "@/components/Rating/EditHalfStars2";
import useQuote from "@/hooks/useQuote";

const HeroInputBox = () => {
  const {
    serviceLocation,
    moveDetails,
    updateLocationFrom,
    updateLocationTo,
    updateMove,
    router,
  } = useQuote();

  const [address, setAddress] = useState("");
  const [addressDetails, setAddressDetails] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressDetails2, setAddressDetails2] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const [selectValue, setSelectValue] = useState(
    moveDetails?.propertyType || ""
  );
  const [error, setError] = useState(false);

  const heroFormSubmit = () => {
    setError(false);
    if (selectValue == "" || !address || !address2) {
      setError(true);
    } else {
      setSubmitLoading(true);
      updateLocationFrom({
        name: address,
        postCode: addressDetails
          ? addressDetails.zip
          : serviceLocation?.locationFrom?.postCode,
        city: addressDetails
          ? addressDetails.city
          : serviceLocation?.locationFrom?.city,
        country: addressDetails
          ? addressDetails.country
          : serviceLocation?.locationFrom?.country,
      });
      updateLocationTo({
        name: address2,
        postCode: addressDetails2
          ? addressDetails2.zip
          : serviceLocation?.locationTo?.postCode,
        city: addressDetails
          ? addressDetails.city
          : serviceLocation?.locationTo?.city,
        country: addressDetails
          ? addressDetails.country
          : serviceLocation?.locationTo?.country,
      });
      switch (selectValue) {
        case "Office removals":
          updateMove({
            propertyType: selectValue,
          });
          router.push("/book/man-and-van");
          break;
        case "Man and van":
          updateMove({
            propertyType: selectValue,
          });
          router.push("/book/man-and-van");
          break;
        case "Studio flat":
          updateMove({
            propertyType: selectValue,
          });
          router.push("/book/man-and-van");
          break;
        case "Furniture & Appliances":
          updateMove({
            propertyType: selectValue,
          });
          router.push("/book/man-and-van");
          break;
        case "Storage":
          router.push("/book/man-and-van");
          break;
        case "Home removals":
          router.push("/book/home-removals");
          break;
        case "1 Bed property":
          updateMove({
            propertyType: selectValue,
          });
          router.push("/book/home-removals");
          break;
        case "2 Bed property":
          updateMove({
            propertyType: selectValue,
          });
          router.push("/book/home-removals");
          break;
        case "3 Bed property":
          updateMove({
            propertyType: selectValue,
          });
          router.push("/book/home-removals");
          break;
        case "4 Bed property":
          updateMove({
            propertyType: selectValue,
          });
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
      (opt) => opt.value == moveDetails?.propertyType
    );
    return option;
  };

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
            <GoogleSearchInput
              styles="py-[10px] px-[10px]"
              setAddress={setAddress}
              addressDetails={addressDetails}
              setAddressDetails={setAddressDetails}
              placeholder="Where are you moving from?"
              defaultValue={serviceLocation?.locationFrom?.name}
            />
          </div>
          <div className="form-control">
            <GoogleSearchInput
              styles="py-[10px] px-[10px]"
              setAddress={setAddress2}
              addressDetails={addressDetails2}
              setAddressDetails={setAddressDetails2}
              placeholder="Where are you moving to?"
              defaultValue={serviceLocation?.locationTo?.name}
            />
          </div>
          <div className="form-control mt-6">
            <button
              onClick={heroFormSubmit}
              disabled={submitLoading}
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
