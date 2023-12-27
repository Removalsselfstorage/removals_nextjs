import NormalLayout from "@/layouts/NormalLayout";
import React, { useState } from "react";
import Head from "next/head";
import { MdPayments, MdFreeCancellation } from "react-icons/md";
import { BiTask, BiWorld } from "react-icons/bi";
import { titleFont } from "@/utils/fonts";
import { FaAngleDown } from "react-icons/fa";
import { city } from "@/dummyData/locations";

const Locations = () => {
  const [cities, setCities] = useState(city);
  const [selectedCity, setSelectedCity] = useState(null);
  const [activate, setActivate] = useState(false);

  const handleClick = (id) => {
    if (id === selectedCity) {
      setSelectedCity(null);
    } else {
      setSelectedCity(id);
    }
    console.log({ id, selectedCity });
    // if (activate === true && id === selectedCity) {
    //   setActivate(false);
    // } else if (activate === false && id != selectedCity) {
    //   setActivate(true);
    // }
  };

  const dropDownHeight = (array) => {
    if (array?.length <= 2) {
      return "h-[70px]";
    } else if (array?.length >= 3 && array?.length <= 4) {
      return "h-[100px]";
    } else if (array?.length >= 5 && array?.length <= 6) {
      return "h-[150px]";
    } else if (array?.length > 6) {
      return "h-[200px]";
    }
  };

  return (
    <>
      <Head>
        <title>Locations - Removals and Selfstorage</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>
      <NormalLayout>
        <div className='bg-base-200 mt-[50px]  md:mt-[0px] md:pt-[70px] lg:pt-[100px]'>
          <div className='md:max-w-7xl mx-auto'>
            <div
              style={{
                backgroundImage: "url(/england.jpg)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                // height: "300px",
              }}
              className='hero min-h-[40vh] md:min-h-[50vh] lg:min-h-[50vh] 2xl:min-h-[50vh] '
            >
              <div className='hero-overlay bg-black/70'></div>
              <div className='flex flex-col text-white items-center '>
                <h1
                  className={`${titleFont.variable} font-sans2 text-3xl lg:text-5xl font-bold mb-[0px]`}
                >
                  ENGLAND
                </h1>
              </div>
            </div>

            <div className=' mt-[30px] w-full mb-[50px] mx-[10px] flex flex-col justify-center'>
              <p className='font-bold md:text-[18px] text-center border-b border-secondary pb-[10px]'>
                OUR NETWORK IN ENGLAND
              </p>
              <p className='italic text-gray-500 mt-[10px] text-center'>
                Click on our locations below for more details.
              </p>
            </div>

            <div className='mt-[0px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-[10px] gap-y-[20px] mx-[10px] mb-[50px]'>
              {cities.map((ct, index) => {
                let isActive = ct.id == selectedCity;
                return (
                  <div key={index} className='flex flex-col space-y-[10px]'>
                    <div
                      className='flex items-center space-x-[10px] group cursor-pointer '
                      onClick={() => handleClick(ct?.id)}
                    >
                      <p className='group-hover:text-secondary  font-semibold text-[17px] whitespace-nowrap'>
                        {ct?.name}
                      </p>
                      <FaAngleDown
                        className={`${
                          isActive && "rotate-[180deg]"
                        } text-secondary `}
                      />
                    </div>

                    <div
                      className={` ${
                        isActive
                          ? `${dropDownHeight(
                              ct?.subs
                            )}  border-b-[1.7px] border-r-[1.7px] border-l-[1.7px] pb-[10px]`
                          : "h-[0px]"
                      }  overflow-auto scrollbar-thin scrollbar-track-gray-200/50 scrollbar-thumb-gray-500/20 scrollbar-default border-b pb-[10px]`}
                    >
                      {isActive &&
                        ct?.subs?.map((el, i) => {
                          return (
                            <div
                              key={i}
                              className='flex items-center space-x-[10px] group cursor-pointer pl-[10px] mb-[8px]  md:mb-[5px] hover:bg-secondary/5'
                            >
                              <p className='group-hover:text-secondary'>{el}</p>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </NormalLayout>
    </>
  );
};

export default Locations;
