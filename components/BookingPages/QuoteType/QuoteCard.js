import Link from 'next/link';
import React from 'react';

const QuoteCard = ({ image, title, link }) => {
  return (
    <div className="card max-w-[500px] bg-base-100  overflow-hidden border-[1px] border-gray-400">
      <div className="bg-secondary h-[20px]"></div>
      <figure className="mt-[50px]">
        <img src={image} alt="house" className="h-[100px]" />
      </figure>
      <div className="card-body items-center text-center mt-[-10px]">
        <h2 className="card-title my-[10px]">{title}</h2>

        <Link href={`/book/${link}`}>
          <button className={`btn btn-outline btn-primary btn-wide  mt-[10px]`}>
            Select
          </button>
        </Link>
      </div>
    </div>
  );
};

export default QuoteCard;
