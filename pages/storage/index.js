import NormalLayout from "@/layouts/NormalLayout";
import React, { useState } from "react";
import Head from "next/head";
import { titleFont } from "@/utils/fonts";
import Container from "@/components/Storage/Container";

const Storage = () => {
  const [activeCont, setActiveCont] = useState("cont1");
  const [submitStatus, setSubmitStatus] = useState("initial");
  const [duration, setDuration] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(1);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [activateError, setActivateError] = useState(false);

  const handleDurationChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = parseInt(inputValue, 10);

    if (!isNaN(numericValue) && numericValue >= 1) {
      setDuration(numericValue);
    } else {
      setDuration(1);
    }
  };
  const handleDurationChange2 = (e) => {
    const inputValue = e.target.value;
    const numericValue = parseInt(inputValue, 10);

    if (!isNaN(numericValue) && numericValue >= 1) {
      setQuantity(numericValue);
    } else {
      setQuantity(1);
    }
  };

  return (
    <>
      <Head>
        <title>Storage - Removals and Selfstorage</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>

      <NormalLayout>
        <div className='bg-base-200 mt-[50px]  md:mt-[0px] md:pt-[70px] lg:pt-[100px]'>
          <div className='md:max-w-7xl mx-auto'>
            {/* Title */}
            <div className='w-full flex justify-center py-[50px]'>
              {/* <h3 className="text-4xl font-extrabold">Our Services</h3> */}
              <h3
                className={`${titleFont.variable} font-sans2 text-3xl lg:text-4xl font-extrabold flex-col items-center justify-center`}
              >
                <p className=''>Container Selector</p>{" "}
                <div className='w-full bg-primary/20 h-[20px] mt-[-12px] '></div>
              </h3>
            </div>
            {/* selector */}
            <div className='flex flex-wrap items-center px-[0px]  mx-[10px] md:mx-[100px]'>
              {/* selector 1 */}
              <div
                onClick={() => {
                  setActiveCont("cont1");
                  setDuration(1);
                  setQuantity(1);
                }}
                className={`${
                  activeCont === "cont1"
                    ? "bg-white border-t border-r border-l text-primary"
                    : "border-t border-b border-r border-l text-black"
                } flex flex-col items-center justify-center cursor-pointer hover:text-primary bg-primary/5  border-primary/30  space-y-[5px] px-[20px] py-[20px] flex-[1]`}
              >
                <p className='font-bold'>35 Square Feet</p>
                <p className={` font-semibold`}>Container</p>
              </div>
              {/* selector 2 */}
              <div
                onClick={() => {
                  setActiveCont("cont2");
                  setDuration(1);
                  setQuantity(1);
                }}
                className={`${
                  activeCont === "cont2"
                    ? "bg-white border-t border-r border-l text-primary"
                    : "border-t border-b border-r border-l text-black"
                } flex flex-col items-center justify-center cursor-pointer hover:text-primary bg-primary/5  border-primary/30  space-y-[5px] px-[20px] py-[20px] flex-[1]`}
              >
                <p className='font-bold'>70 Square Feet</p>
                <p className={` font-semibold`}>Container</p>
              </div>
              {/* selector 3 */}
              <div
                onClick={() => {
                  setActiveCont("cont3");
                  setDuration(1);
                  setQuantity(1);
                }}
                className={`${
                  activeCont === "cont3"
                    ? "bg-white border-t border-r border-l text-primary "
                    : "border-t border-b border-r border-l text-black"
                } flex flex-col items-center justify-center cursor-pointer hover:text-primary bg-primary/5  border-primary/30  space-y-[5px] px-[20px] py-[20px] flex-[1]`}
              >
                <p className='font-bold'>105 Square Feet</p>
                <p className={` font-semibold`}>Container</p>
              </div>
              {/* selector 4 */}
              <div
                onClick={() => {
                  setActiveCont("cont4");
                  setDuration(1);
                  setQuantity(1);
                }}
                className={`${
                  activeCont === "cont4"
                    ? "bg-white border-t border-r border-l text-primary "
                    : "border-t border-b border-r border-l text-black"
                } flex flex-col items-center justify-center cursor-pointer hover:text-primary bg-primary/5  border-primary/30  space-y-[5px] px-[20px] py-[20px] flex-[1]`}
              >
                <p className='font-bold'>140 Square Feet</p>
                <p className={` font-semibold`}>Container</p>
              </div>
              {/* selector 5 */}
              <div
                onClick={() => {
                  setActiveCont("cont5");
                  setDuration(1);
                  setQuantity(1);
                }}
                className={`${
                  activeCont === "cont5"
                    ? "bg-white border-t border-r border-l text-primary "
                    : "border-t border-b border-r border-l text-black"
                } flex flex-col items-center justify-center cursor-pointer hover:text-primary bg-primary/5  border-primary/30  space-y-[5px] px-[20px] py-[20px] flex-[1]`}
              >
                <p className='font-bold'>160 Square Feet</p>
                <p className={` font-semibold`}>Container</p>
              </div>
            </div>
            {/* body */}
            <div className='px-[20px] lg:px-[100px] mb-[50px] py-[30px] bg-white rounded-bl-[20px] rounded-br-[20px] mx-[10px] md:mx-[100px]'>
              {/* container 1 */}
              {activeCont === "cont1" && (
                <Container
                  title='35 Square feet Container'
                  price={17.49}
                  rate='17.49'
                  duration={duration}
                  quantity={quantity}
                  dimension='250 Cubic Feet , H7’6″ x W5′ x D7′ , 7
                  Cubic Metres , 3.25 Square Metres'
                  note='This Container will accommodate the content of a 1 Bed Flat /
                  50 Boxes or Transit Van.'
                  handleDurationChange={handleDurationChange}
                  handleDurationChange2={handleDurationChange2}
                  submitStatus={submitStatus}
                />
              )}
              {/* container 2 */}
              {activeCont === "cont2" && (
                <Container
                  title='70 Square feet Container'
                  price={24.75}
                  rate='24.75'
                  duration={duration}
                  quantity={quantity}
                  dimension='250 Cubic Feet x 2, H7’6″ x W5′ x D7′ x 2, 7 Cubic Metres x 2, 3.25 Square Metres x 2'
                  note='This Container will accommodate the content of a 2 Bed Flat / 120 Boxes or LWB Transit Van.'
                  handleDurationChange={handleDurationChange}
                  handleDurationChange2={handleDurationChange2}
                  submitStatus={submitStatus}
                />
              )}
              {/* container 3 */}
              {activeCont === "cont3" && (
                <Container
                  title='105 Square feet Container'
                  price={46.49}
                  rate='46.49'
                  duration={duration}
                  quantity={quantity}
                  dimension='750 Cubic Feet x 3, H7’6″ x W5′ x D7′ x 3, 7 Cubic Metres x 3, 3.25 Square Metres x 3'
                  note='This Container will accommodate the content of a Two Bed house / 120 Boxes or a little over Luton Van.'
                  handleDurationChange={handleDurationChange}
                  handleDurationChange2={handleDurationChange2}
                  submitStatus={submitStatus}
                />
              )}
              {/* container 4 */}
              {activeCont === "cont4" && (
                <Container
                  title='140 Square feet Container'
                  price={60.25}
                  rate='60.25'
                  duration={duration}
                  quantity={quantity}
                  dimension='1000 Cubic Feet x 4, H7’6″ x W5′ x D7′ x 4, 7 Cubic Metres x 4, 3.25 Square Metres x 4'
                  note='This Container will accommodate the content of a 2 to 3 Bed house / 180 Boxes or a little over Luton Van.'
                  handleDurationChange={handleDurationChange}
                  handleDurationChange2={handleDurationChange2}
                  submitStatus={submitStatus}
                />
              )}
              {/* container 5 */}
              {activeCont === "cont5" && (
                <Container
                  title='160 Square feet / 20 feet Container'
                  price={72.75}
                  rate='72.75'
                  duration={duration}
                  quantity={quantity}
                  dimension='1100 Cubic Feet, H78′ x W8′ x D20′, H2.59m x W2.44m x D6.06m, 32.85 Cubic Metres, 13.93 Square Metres'
                  note='1 x 20ft Container is equalled 3 Bed House - 300 Boxes - 7.5 Tonne Truck
                  .'
                  handleDurationChange={handleDurationChange}
                  handleDurationChange2={handleDurationChange2}
                  submitStatus={submitStatus}
                />
              )}
            </div>
          </div>
        </div>
      </NormalLayout>
    </>
  );
};

export default Storage;
