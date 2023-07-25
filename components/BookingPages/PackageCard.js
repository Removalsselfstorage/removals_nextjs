import Link from "next/link";
import React from "react";
import {
  getAllDetails,
  updateLocationDetails,
  updateMoveDetails,
  updatePersonalDetails,
} from "@/store/quoteSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { convertToSentenceCase, generateRandomValues } from "@/utils/logics";
import { priceCalc, priceCalc2 } from "@/utils/moversLogic";

const PackageCard = ({
  image,
  title,
  subTitle,
  price,
  f1,
  f2,
  f3,
  f4,
  f5,
  f6,
  f7,
  f8,
  f9,
  f10,
  f11,
  f12,
  link,
  preferred,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const details = useSelector(getAllDetails);

  const randomRefValue = generateRandomValues();

  const mileageValueCalc = (mileage) => {
    switch (mileage) {
      case "0 - 25":
        return 0.99 * 25;
        break;
      case "26 - 75":
        return 0.99 * 75;
        break;
      case "76 - 150":
        return 0.99 * 150;
        break;
      case "151 - 200":
        return 0.99 * 200;
        break;
      case "201 - 250":
        return 0.99 * 250;
        break;
      case "251 - 300":
        return 0.99 * 300;
        break;
      case "301 - 350":
        return 0.99 * 350;
        break;
      case "351 - 400":
        return 0.99 * 400;
        break;
      case "401 - 450":
        return 0.99 * 450;
        break;
      case "451 - 500":
        return 0.99 * 500;
        break;
      case "501 - 550":
        return 0.99 * 550;
        break;
      case "551 - 600":
        return 0.99 * 600;
        break;

      default:
        break;
    }
  };

  const totalMileage = mileageValueCalc(details.moveDetails.mileage);
  const totalPrice = (totalMileage) => {
    switch (details.moveDetails.propertyType) {
      case "Office removals":
        return priceCalc(
          title,
          details.moveDetails.duration,
          details.moveDetails.numberOfMovers
        );
        break;
      case "Studio flat":
        return priceCalc(
          title,
          details.moveDetails.duration,
          details.moveDetails.numberOfMovers
        );
        break;
      case "Furniture & Appliances":
        return priceCalc(
          title,
          details.moveDetails.duration,
          details.moveDetails.numberOfMovers
        );
        break;

      default:
        return priceCalc2(
          title,
          totalMileage,
          details.moveDetails.numberOfMovers,
          details.moveDetails.propertyType
        );
        break;
    }
  };

  const onBookNow = () => {
    dispatch(
      updateMoveDetails({
        propertyType: details.moveDetails.propertyType,
        numberOfMovers: details.moveDetails.numberOfMovers,
        mileage: details.moveDetails.mileage,
        volume: details.moveDetails.volume,
        duration: details.moveDetails.duration,
        moveDate: details.moveDetails.moveDate,
        moveDateRaw: details.moveDetails.moveDateRaw,
        movePackage: convertToSentenceCase(title),
        quoteRef: randomRefValue,
        initialPackagePrice: totalPrice(totalMileage),
      })
    );
    router.push(`/book/${link}`);
  };

  // console.log(details)

  return (
    <div
      className={`card min-w-[300px] border-2 ${
        preferred ? "border-secondary" : "border-black/10"
      } justify-center items-center  bg-base-100 shadow-lg hover:shadow-2xl hover:scale-[1.02] duration-200`}
    >
      {/* title */}
      <div
        className={`${
          preferred ? "bg-secondary" : "bg-primary"
        }   w-[200px] mt-[-20px] rounded-[10px]`}
      >
        <h2 className="card-title justify-center text-white py-[20px]">
          {title}
        </h2>
      </div>

      <div className="card-body text-center ">
        <div className="flex flex-col items-center">
          <p
            className={`card-title ${
              preferred ? "text-secondary" : "text-primary"
            }  text-[30px] mb-[10px]`}
          >
            ₤
            {/* {priceCalc(
              title,
              details.moveDetails.duration,
              details.moveDetails.numberOfMovers
            )} */}
            {totalPrice(totalMileage)}
          </p>
          {/* <p className="">₤{price}</p> */}
          <div className="flex flex-col space-y-[5px] ">
            <p className="font-semibold">
              *{details.moveDetails.propertyType}*
            </p>
            <p className="font-semibold">
              {details.moveDetails.numberOfMovers} and Jumbo Van
            </p>
          </div>
          <ul className="text-gray-500 mt-[15px] md:mt-[20px] text-start text-[13px]">
            <li className="border-b  py-[5px]">* {f1}</li>
            <li className="border-b py-[5px]">* {f2}</li>
            <li className="border-b py-[5px]">* {f3}</li>
            <li className="border-b py-[5px]">* {f4}</li>
            <li className="border-b py-[5px]">* {f5}</li>
            <li className="border-b py-[5px]">* {f6}</li>
            {f7 && <li className="border-b py-[5px]">* {f7}</li>}
            {f8 && <li className="border-b py-[5px]">* {f8}</li>}
            {f9 && <li className="border-b py-[5px]">* {f9}</li>}
            {f10 && <li className="border-b py-[5px]">* {f10}</li>}
            {f11 && <li className="border-b py-[5px]">* {f11}</li>}
            {f12 && <li className="border-b py-[5px]">* {f12}</li>}
          </ul>
        </div>
      </div>
      <button
        onClick={onBookNow}
        className={`btn ${
          preferred ? "btn-secondary " : "btn-primary btn-outline"
        }  px-[30px] mb-[50px]`}
      >
        Book Now
      </button>
    </div>
  );
};

export default PackageCard;
