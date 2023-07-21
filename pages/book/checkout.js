import BookingLayout from '@/layouts/BookingLayout';
import { titleFont } from '@/utils/fonts';
import Head from 'next/head';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

import PriceDatePick from '@/components/BookingPages/movers/PriceDatePick';
import FeaturesScroll from '@/components/BookingPages/movers/FeaturesScroll';
import FullRating from '@/components/Rating/FullRating';
import MoverCard from '@/components/BookingPages/movers/MoverCard';
import { BiSolidPhoneCall } from 'react-icons/bi';
import MoveDetails from '@/components/BookingPages/movers/MoveDetails';
import SummaryDetails from '@/components/BookingPages/Checkout/SummaryDetails';
import CheckoutForm from '@/components/BookingPages/Checkout/CheckoutForm';
import { getAllDetails } from '@/store/quoteSlice';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

const Checkout = () => {
  const [showModal, setShowModal] = useState(false);
  const details = useSelector(getAllDetails);

  const [payType, setPayType] = useState('');
  const [depositPart, setDepositPart] = useState(false);
  const [depositFull, setDepositFull] = useState(false);
  const [payMethod, setPayMethod] = useState('');
  const [card, setCard] = useState(false);
  const [paypal, setPaypal] = useState(false);

  console.log(depositPart);
  console.log(depositFull);

  const partDepositOnchange = (e) => {
    setDepositPart(e.target.checked);
    setDepositFull(false);
  };
  const fullDepositOnchange = (e) => {
    setDepositFull(e.target.checked);
    setDepositPart(false);
  };
  const cardOnchange = (e) => {
    setCard(e.target.checked);
    setPaypal(false);
  };
  const paypalOnchange = (e) => {
    setPaypal(e.target.checked);
    setCard(false);
  };

  return (
    <BookingLayout>
      <Head>
        <title>Checkout - Removals and Selfstorage</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <main className="">
        <div className="mb-[70px] lg:mb-[100px] pt-[80px] md:pt-[100px] ">
          <div className="md:max-w-7xl mx-auto">
            {/* features links */}
            <FeaturesScroll />

            {/* Title */}
            <div className="w-full flex justify-center py-[30px] md:py-[40px]">
              {/* <h3 className="text-4xl font-extrabold">Our Services</h3> */}
              <h3
                className={`${titleFont.variable} font-sans2 text-2xl md:text-4xl font-extrabold flex-col items-center justify-center`}
              >
                <p className="">Check-out</p>{' '}
                <div className="w-full bg-primary/20 h-[20px] mt-[-12px] "></div>
              </h3>
            </div>

            {/* checkout section*/}
            <div className="flex flex-col space-y-[10px] lg:space-y-0 lg:flex-row lg:space-x-[10px] mx-[10px] md:mx-[20px]">
              {/* left section - pament form */}
              <div className="bg-white shadow-lg rounded-[30px] lg:flex-[2] py-[30px] px-[30px] md:px-[50px] w-full">
                {/*50% payment row */}
                <div className="mt-[0px]">
                  <h1 className="text-xl font-bold mb-[20px] px-[0px]">
                    Payment Type*
                  </h1>
                  <div className="flex space-x-[20px] items-center">
                    {/* left */}
                    <div className="mb-[0px]">
                      <label className="label cursor-pointer flex items-center space-x-[10px] md:space-x-[10px] w-full">
                        <input
                          type="radio"
                          name="radio-1"
                          className="radio radio-primary"
                          onChange={partDepositOnchange}
                        />
                        <p className="leading-[18px] text-[15px] md:text-[16px] font-semibold mb-[0px] ">
                          20% Deposit
                        </p>
                      </label>
                    </div>
                    {/* right */}
                    <div className="mb-[0px]">
                      <label className="label cursor-pointer flex items-center space-x-[10px] md:space-x-[10px] w-full">
                        <input
                          type="radio"
                          name="radio-1"
                          className="radio radio-primary"
                          onChange={fullDepositOnchange}
                        />
                        <p className="leading-[18px] text-[15px] md:text-[16px] font-semibold mb-[0px] ">
                          Full Deposit
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
                {/* full payment row */}
                <div className="mt-[30px] md:mt-[50px]">
                  <h1 className="text-xl font-bold mb-[20px] px-[0px]">
                    Payment Method*
                  </h1>
                  {/* row 1 */}
                  <div className="mb-[20px]">
                    <div className="flex mt-[10px] mb-[10px] md:mb-[20px] w-full">
                      <div className="form-control ">
                        <label className="label cursor-pointer flex items-start space-x-[10px] md:space-x-[10px] w-full">
                          <input
                            type="radio"
                            name="radio-2"
                            className="radio radio-primary"
                            onChange={cardOnchange}
                          />
                          <span className="flex flex-col w-full">
                            <p className="leading-[18px] text-[15px] md:text-[16px] font-semibold mb-[10px] ">
                              Credit/Debit Card
                            </p>
                            <img
                              src="/svg/cards.svg"
                              alt=""
                              className="h-[20px] md:h-[30px] w-fit"
                            />
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* row 2 */}
                  <div className="mb-[20px]">
                    <div className="flex mt-[10px] mb-[10px] md:mb-[20px] w-full">
                      <div className="form-control ">
                        <label className="label cursor-pointer flex items-start space-x-[10px] md:space-x-[10px] w-full">
                          <input
                            type="radio"
                            name="radio-2"
                            className="radio radio-primary"
                            onChange={paypalOnchange}
                          />
                          <span className="flex flex-col w-full">
                            <p className="leading-[18px] text-[15px] md:text-[16px] font-semibold mb-[10px]">
                              Paypal
                            </p>
                            <img
                              src="/svg/paypal.svg"
                              alt=""
                              className="h-[20px] md:h-[30px] w-fit"
                            />
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* comment row */}
                <div className="mt-[30px] md:mt-[50px]">
                  <h1 className="text-xl font-bold mb-[20px] px-[0px]">
                    Leave a comment
                  </h1>
                  {/* row 1 */}
                  <div className="w-full">
                    <textarea
                      className="textarea w-full textarea-primary min-h-[150px] max-h-[200px]"
                      placeholder="(eg. mention if you want to travel with the van). Please do not list items here."
                    ></textarea>
                  </div>
                </div>
                {/* acknowledge inventory check */}
                <div className="flex mt-[10px] mb-[10px] md:mb-[20px] w-full">
                  <div className="form-control ">
                    <label className="label cursor-pointer flex justify-center space-x-[20px] w-full">
                      <input
                        type="checkbox"
                        //   checked="checked"
                        className="checkbox checkbox-primary"
                      />
                      <span className="leading-[20px] text-[14px] md:text-[15px]">
                        You acknwoledge that your inventory is accurate and will
                        contact us to add further items{' '}
                        <b>(prices may change)</b>
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* right section - Move summary */}
              <div className="lg:flex-[1.3] w-full">
                <div className="bg-white shadow-lg rounded-[30px] pt-[30px] pb-[50px] px-[20px] md:px-[30px] w-full lg:sticky lg:top-[80px]">
                  <div className="">
                    <h1 className="text-2xl font-bold mb-[10px] md:mb-[20px]">
                      Move Summary
                    </h1>
                    <div className="grid md:grid-cols-3 lg:grid-cols-1 lg:h-[300px] gap-y-[10px] gap-x-[10px] overflow-auto scrollbar-thin scrollbar-track-gray-200/50 scrollbar-thumb-gray-500/20 scrollbar-default h-[200px] md:h-full mb-[10px] md:mb-[20px]">
                      {/* Quote  */}
                      <div className="flex flex-col space-y-[5px]">
                        <p className="text-primary font-semibold text-[18px]">
                          Quote Ref:
                        </p>
                        <p className="font-semibold text-[14px] ">
                          rs{details.moveDetails.quoteRef}
                        </p>
                      </div>

                      <div className="flex flex-col space-y-[5px]">
                        <p className="text-primary font-semibold text-[18px]">
                          Package:
                        </p>
                        <p className="font-semibold text-[14px] ">
                          {details.moveDetails.propertyType} - (
                          {details.moveDetails.movePackage})
                        </p>
                      </div>

                      <div className="flex flex-col space-y-[5px]">
                        <p className="text-primary font-semibold text-[18px]">
                          Pick-up Location:
                        </p>
                        <p className="font-semibold text-[14px] ">
                          {details.serviceLocation.locationFrom.name}{' '}
                          {details.serviceLocation.locationFrom.postCode &&
                            `(${details.serviceLocation.locationFrom.postCode})`}
                        </p>
                      </div>

                      <div className="flex flex-col space-y-[5px]">
                        <p className="text-primary font-semibold text-[18px]">
                          Drop-off Location:
                        </p>
                        <p className="font-semibold text-[14px] ">
                          {details.serviceLocation.locationTo.name}{' '}
                          {details.serviceLocation.locationTo.postCode &&
                            `(${details.serviceLocation.locationTo.postCode})`}
                        </p>
                      </div>

                      <div className="flex flex-col space-y-[5px]">
                        <p className="text-primary font-semibold text-[18px]">
                          Travel Distance:
                        </p>
                        <p className="font-semibold text-[14px] ">
                          {details.moveDetails.mileage} miles
                        </p>
                      </div>

                      <div className="flex flex-col space-y-[5px]">
                        <p className="text-primary font-semibold text-[18px]">
                          Volume:
                        </p>
                        <p className="font-semibold text-[14px] ">
                          {details.moveDetails.volume} CU/FT
                        </p>
                      </div>

                      {details.moveDetails.duration && (
                        <div className="flex flex-col space-y-[5px]">
                          <p className="text-primary font-semibold text-[18px]">
                            Duration:
                          </p>
                          <p className="font-semibold text-[14px] ">
                            {details.moveDetails.duration} hours
                          </p>
                        </div>
                      )}

                      <div className="flex flex-col space-y-[5px]">
                        <p className="text-primary font-semibold text-[18px]">
                          Move date:
                        </p>
                        <p className="font-semibold text-[14px] ">
                          {dayjs(details.moveDetails.moveDateRaw).format(
                            'dddd, MMMM D, YYYY'
                          )}
                        </p>
                      </div>

                      <div className="flex flex-col space-y-[5px]">
                        <p className="text-primary font-semibold text-[18px]">
                          Mover's Name:
                        </p>
                        <p className="font-semibold text-[14px] ">
                          {details.moverDetails.moverName}
                        </p>
                      </div>

                      <div className="flex flex-col space-y-[5px]">
                        <p className="text-primary font-semibold text-[18px]">
                          Pickup Time:
                        </p>
                        <p className="font-semibold text-[14px] ">
                          {details.moverDetails.moverTime}
                        </p>
                      </div>
                    </div>
                    {/* price section */}
                    <div className="flex justify-between mb-[10px] md:mb-[10px] border-t border-black/30 pt-[20px]">
                      <h2 className="text-[16px] font-semibold ">
                        Mover Price:
                      </h2>
                      <div className="flex flex-col items-end">
                        <h2 className="text-[16px] font-bold ">
                          ₤ {details.moverDetails.moverPrice}
                        </h2>
                        {/* <p className="text-[12px] text-gray-500">VAT included</p> */}
                      </div>
                    </div>
                    <div className="flex justify-between mb-[10px] md:mb-[10px] pt-[0px]">
                      <h2 className="text-[16px] font-semibold ">
                        Payment Type:
                      </h2>
                      <div className="flex flex-col items-end">
                        {card && (
                          <h2 className="text-[16px] font-bold ">Card</h2>
                        )}
                        {paypal && (
                          <h2 className="text-[16px] font-bold ">Paypal</h2>
                        )}
                        {!card && !paypal && (
                          <h2 className="text-[16px] font-bold ">--</h2>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between mb-[10px] md:mb-[10px] pt-[0px]">
                      <h2 className="text-[16px] font-semibold ">
                        Payment Method:
                      </h2>
                      <div className="flex flex-col items-end">
                        {depositPart && (
                          <h2 className="text-[16px] font-bold ">20%</h2>
                        )}
                        {depositFull && (
                          <h2 className="text-[16px] font-bold ">100%</h2>
                        )}
                        {!depositFull && !depositPart && (
                          <h2 className="text-[16px] font-bold ">--</h2>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between mb-[10px] md:mb-[20px] border-t border-black/30 pt-[20px]">
                      <h2 className="text-[16px] font-semibold text-primary">
                        Final Price:
                      </h2>
                      <div className="flex flex-col items-end">
                        {depositPart && (
                          <h2 className="text-[18px] font-bold ">
                            ₤ {details.moverDetails.moverPrice * 0.2}
                          </h2>
                        )}
                        {depositFull && (
                          <h2 className="text-[18px] font-bold ">
                            ₤ {details.moverDetails.moverPrice * 1}
                          </h2>
                        )}
                        {!depositFull && !depositPart && (
                          <h2 className="text-[18px] font-bold ">--</h2>
                        )}
                      </div>
                    </div>
                    {/* agree to terms */}
                    {/* <div className="flex mt-[10px] mb-[10px] md:mb-[20px] w-full">
          <div className="form-control ">
            <label className="label cursor-pointer flex items-start space-x-[10px] w-full">
              <input
                type="checkbox"
                //   checked="checked"
                className="checkbox checkbox-primary checkbox-sm"
              />
              <span className="leading-[18px] text-[12px] md:text-[14px]">
                You acknwoledge that your inventory is accurate and will contact
                us to add further items (prices may change)
              </span>
            </label>
          </div>
        </div> */}
                    {/* Payment button */}
                    <div className="btn btn-primary btn-block">Pay Now</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="w-[20vw] h-[100%] z-[2000] absolute top-0 right-0 bg-white">
            <p className="text-3xl font-bold">Side bar</p>
        </div> */}
      </main>
    </BookingLayout>
  );
};

export default Checkout;
