import Link from 'next/link';
import React from 'react';

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
  link,
  preferred,
}) => {
  return (
    <div
      className={`card min-w-[300px] border-2 ${
        preferred ? 'border-secondary' : 'border-black/10'
      } justify-center items-center  bg-base-100 shadow-lg hover:shadow-2xl hover:scale-[1.02] duration-200`}
    >
      <div
        className={`${
          preferred ? 'bg-secondary' : 'bg-primary'
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
              preferred ? 'text-secondary' : 'text-primary'
            }  text-[30px] mb-[10px]`}
          >
            ₤{price}
          </p>
          {/* <p className="">₤{price}</p> */}
          <div className="flex flex-col space-y-[5px] ">
            <p className="font-semibold">1 Bed Apartment</p>
            <p className="font-semibold">1 man and Jumbo Van</p>
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
          </ul>
        </div>
        
      </div>
      <Link href={`/book/${link}`}>
          <button
            className={`btn ${
              preferred ? 'btn-secondary ' : 'btn-primary btn-outline'
            }  px-[30px] mb-[50px]`}
          >
            Book Now
          </button>
      </Link>
    </div>
  );
};

export default PackageCard;
