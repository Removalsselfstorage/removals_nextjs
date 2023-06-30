import { titleFont } from '@/utils/fonts';
import React from 'react';

const WhyChooseUs = () => {
  return (
    <div className="mb-[50px]">
      <div className="md:max-w-7xl mx-auto">
        {/* Title */}
        <div className="w-full flex justify-center py-[50px]">
          {/* <h3 className="text-4xl font-extrabold">Our Services</h3> */}
          <h3
            className={`${titleFont.variable} font-sans2 text-4xl font-extrabold flex-col items-center justify-center`}
          >
            <p className="">Why Choose Us</p>{' '}
            <div className="w-full bg-primary/20 h-[20px] mt-[-12px] "></div>
          </h3>
        </div>

        {/* row 1 */}
        <div className="flex items-center flex-col space-y-[30px] md:flex-row md:space-y-[0px] mb-[50px]">
          {/* image */}
          <div className="flex-[0.5] flex  justify-center">
            <img
              src="/movers1.jpg"
              alt="Album"
              className="rounded-tl-[100px] rounded-br-[100px]"
            />
          </div>
          {/* text */}
          <div className="flex-[1] flex flex-col max-w-[600px] space-y-[30px] px-[20px]">
            <h2 className="text-3xl font-bold ">
              A better moving experience starts here
            </h2>
            <p className="text-[16px] lg:text-[18px]">
              Let Removal & Selfstorage remove the stress, time and cost from
              finding reliable home removals services. We'll make your move as
              easy as possible with a dedicated move co-ordinator who will take
              care of the whole process. We’ve got you covered with
              easier-than-ever booking, flexible service options, friendly and
              experienced movers, competitive pricing, and the industry’s best
              customer support. Get a free estimate today and book with $0 down.
            </p>
          </div>
        </div>

        {/* row 2 */}
        <div className="flex items-center flex-col space-y-[30px] md:flex-row-reverse md:space-y-[0px]">
          {/* image */}
          <div className="flex-[0.5] flex  justify-center">
            <img
              src="/movers2.jpg"
              alt="Album"
              className="rounded-tl-[100px] rounded-br-[100px]"
            />
          </div>
          {/* text */}
          <div className="flex-[1] flex flex-col max-w-[600px] space-y-[30px] px-[20px]">
            <h2 className="text-3xl font-bold ">
              Simple, Upfront Pricing & Customer Support
            </h2>
            <p className="text-[16px] lg:text-[18px]">
              Each long-distance and local mover on Removal & Selfstorage is
              displayed in one sortable list with one price, making it the web's
              easiest place to compare all your local moving company options.
              We're here watching the phones, and we're ready for your local or
              long-distance moving questions. Our in-house team of moving
              experts are ready 7 days a week to spring into action and make
              your moving day as carefree as possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
