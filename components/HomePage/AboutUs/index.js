import React from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';

const AboutUs = () => {
  return (
    <div className="mb-[50px] bg-primary/10 py-[50px]">
      <div className="md:max-w-7xl mx-auto">
        {/* row 1 */}
        <div className="flex items-center flex-col space-y-[30px] md:flex-row md:space-y-[0px] mb-[0px]">
          {/* video */}
          <div className="flex-[0.5] flex px-[20px] md:px-[0px] justify-center">
            <div className="rounded-lg overflow-hidden cursor-pointer relative group">
              {/* play button */}
              <div
                onClick={() => {
                  //   setShowModal(true);
                }}
                className="bg-black/60 hover:bg-black/90 w-[70px] h-[70px] absolute left-[43%] top-[40%] flex justify-center items-center rounded-full hover:scale-[1.2] duration-200"
              >
                <BsFillPlayFill
                  size={50}
                  color="white"
                  className="text-white"
                />
              </div>
              <div className="">
                <div className="hero-overlay"></div>
                <img
                  src="/hero_bg.jpg"
                  alt=""
                  className="w-[500px] h-[300px] md:max-w-[500px] object-cover"
                />
              </div>
            </div>
          </div>
          {/* text */}
          <div className="flex-[1] flex flex-col max-w-[600px] space-y-[30px] px-[20px]">
            <h2 className="text-3xl font-bold ">About Removal & Selfstorage</h2>
            <p className="text-[16px] lg:text-[17px]">
              By choosing Removal & Selfstorage, you’re guaranteeing a great
              moving day. All customers receive transparent pricing, flexible
              service options, background-checked movers, industry-best customer
              support, and an easy-to-access online dashboard.
            </p>
            <div className="">
              <button className="btn btn-block md:btn-wide btn-primary flex items-center space-x-[5px]">
                <span className="">Book A Move</span>
                {/* <span className="">
                  <FiEdit className="text-[20px]" />
                </span> */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
