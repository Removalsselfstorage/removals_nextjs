import Link from 'next/link';
import React from 'react';

const ServicesCard = ({
  image,
  title,
  subTitle,
  price,
  f1,
  f2,
  f3,
  f4,
  link,
  linkText
}) => {
  return (
    <div className="card min-w-[300px] bg-base-100 shadow-lg hover:shadow-2xl hover:scale-[1.02] duration-200">
      <figure className="px-10 pt-10">
        <img src={image} alt="house" className="h-[100px]" />
      </figure>
      <div className="card-body items-center text-center mt-[-10px]">
        <h2 className="card-title">{title}</h2>
        <p className="">{subTitle}</p>
        <p className="card-title text-primary">From ₤{price}</p>
        <ul className="text-gray-500 ">
          <li className="">{f1}</li>
          <li className="">{f2}</li>
          <li className="">{f3}</li>
          <li className="">{f4}</li>
        </ul>
        <Link href={`${link}`}>
          <button className="btn btn-primary mt-[10px]">{linkText}</button>
        </Link>
      </div>
    </div>
  );
};

export default ServicesCard;
