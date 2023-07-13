import QuoteType from '@/components/BookingPages/QuoteType';
import BasicDatePicker from '@/components/DatePicker';
import SelectSearch from '@/components/Inputs/SelectSearch';
import { citiesOptions } from '@/dummyData/inputData';
import BookingLayout from '@/layouts/BookingLayout';
import { titleFont } from '@/utils/fonts';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const ManAndVan = () => {
  const [floorCount, setFloorCount] = useState(0);
  const [floorCount2, setFloorCount2] = useState(0);
  const [durationCount, setDurationCount] = useState(0);

  const hourValue = durationCount <= 1 ? 'hour' : 'hours';

  return (
    <BookingLayout>
      <Head>
        <title>Man & Van - Removal and Self Storage</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <main>
        <div className="mb-[70px] lg:mb-[100px] pt-[70px]">
          <div className="md:max-w-7xl mx-auto">
            {/* links */}
            {/* <div className="flex items-center space-x-[5px] px-[30px] text-[13px] leading-[16px] md:text-[16px]">
              <Link href="/">
                <p className="text-primary link link-hover font-semibold">
                  Home
                </p>
              </Link>
              <MdKeyboardArrowRight size={20} className="text-primary" />
              <Link href="/book">
                <p className="text-primary link link-hover font-semibold">
                  Choose Quote Type
                </p>
              </Link>
              <MdKeyboardArrowRight size={20} className="text-primary" />
              <p className="text-primary font-semibold">Man and Van</p>
            </div> */}

            {/* Title */}
            <div className="w-full flex justify-center py-[30px] md:py-[40px]">
              {/* <h3 className="text-4xl font-extrabold">Our Services</h3> */}
              <h3
                className={`${titleFont.variable} font-sans2 text-3xl lg:text-4xl font-extrabold flex-col items-center justify-center`}
              >
                <p className="">Your Move Details</p>{' '}
                <div className="w-full bg-primary/20 h-[20px] mt-[-12px] "></div>
              </h3>
            </div>

            {/* form */}
            <div className="flex flex-col  px-[20px] lg:px-[100px] py-[30px] bg-white rounded-[20px] mx-[10px] md:mx-[100px]">
              {/* mandatory text */}
              <div className="flex justify-center text-red-600 mb-[10px] md:mb-[20px] text-[14px] md:text-[16px]">
                <p className="">Fields marked with * are mandatory</p>
              </div>
              <div className="flex flex-col space-y-[20px]">
                {/* row 1 */}
                <div className="flex flex-col items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[50px]">
                  {/* left */}
                  <div className="flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center">
                    {/* location from */}
                    <div className="form-control w-full ">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Location FROM*
                        </span>
                      </label>
                      <SelectSearch
                        placeholder="Location"
                        options={citiesOptions}
                        isSearchable={true}
                        name="location1"
                        // defaultValue={citiesOptions[0]}
                        large
                        blue
                      />
                    </div>
                  </div>

                  {/* right */}
                  <div className="flex flex-col space-y-[5px] md:flex-row flex-[1] md:space-x-[20px] w-full">
                    {/* floor */}
                    <div className="flex flex-col w-full flex-[1] ">
                      <label className="label">
                        <span className="label-text font-semibold">Floor*</span>
                      </label>
                      <div className="flex items-center space-x-[5px]">
                        <div
                          onClick={() =>
                            floorCount && setFloorCount((prev) => prev - 1)
                          }
                          className="flex justify-center items-center btn btn-primary w-[55px] p-[5px] h-[55px] rounded-[5px]"
                        >
                          <AiOutlineMinus className="text-white font-bold text-[18px]" />
                        </div>
                        <div className="flex justify-center items-center h-[55px] rounded-[10px] w-[60px] border border-primary font-semibold">
                          {floorCount}
                        </div>
                        <div
                          onClick={() => setFloorCount((prev) => prev + 1)}
                          className="flex justify-center items-center btn btn-primary w-[55px] p-[5px] h-[55px] rounded-[5px]"
                        >
                          <AiOutlinePlus className="text-white font-bold text-[18px]" />
                        </div>
                      </div>
                    </div>
                    {/* lift */}
                    {floorCount > 0 && (
                      <div className="flex flex-col w-full flex-[2] ">
                        <label className="label">
                          <span className="label-text font-semibold">
                            Lift Available*
                          </span>
                        </label>
                        <label className="flex items-center cursor-pointer space-x-[10px]">
                          <input
                            type="checkbox"
                            //   checked="checked"
                            className="checkbox checkbox-primary"
                          />
                          <span className="leading-[20px] text-[14px] text-gray-400 md:text-[16px]">
                            Check if available
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                {/* row 2 */}
                <div className="flex flex-col items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[50px]">
                  {/* left */}
                  <div className="flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center">
                    {/* location from */}
                    <div className="form-control w-full ">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Location TO*
                        </span>
                      </label>
                      <SelectSearch
                        placeholder="Location"
                        options={citiesOptions}
                        isSearchable={true}
                        name="location1"
                        // defaultValue={citiesOptions[1]}
                        large
                        blue
                      />
                    </div>
                  </div>

                  {/* right */}
                  <div className="flex flex-col space-y-[5px] md:flex-row flex-[1] md:space-x-[20px] w-full">
                    {/* floor */}
                    <div className="flex flex-col w-full flex-[1] ">
                      <label className="label">
                        <span className="label-text font-semibold">Floor*</span>
                      </label>
                      <div className="flex items-center space-x-[5px]">
                        <div
                          onClick={() =>
                            floorCount2 && setFloorCount2((prev) => prev - 1)
                          }
                          className="flex justify-center items-center btn btn-primary w-[55px] p-[5px] h-[55px] rounded-[5px]"
                        >
                          <AiOutlineMinus className="text-white font-bold text-[18px]" />
                        </div>
                        <div className="flex justify-center items-center h-[55px] rounded-[10px] w-[60px] border border-primary font-semibold">
                          {floorCount2}
                        </div>
                        <div
                          onClick={() => setFloorCount2((prev) => prev + 1)}
                          className="flex justify-center items-center btn btn-primary w-[55px] p-[5px] h-[55px] rounded-[5px]"
                        >
                          <AiOutlinePlus className="text-white font-bold text-[18px]" />
                        </div>
                      </div>
                    </div>
                    {/* lift */}
                    {floorCount2 > 0 && (
                      <div className="flex flex-col w-full flex-[2] ">
                        <label className="label">
                          <span className="label-text font-semibold">
                            Lift Available*
                          </span>
                        </label>
                        <label className="flex items-center cursor-pointer space-x-[10px]">
                          <input
                            type="checkbox"
                            //   checked="checked"
                            className="checkbox checkbox-primary"
                          />
                          <span className="leading-[20px] text-[14px] text-gray-400 md:text-[16px]">
                            Check if available
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                {/* row 3 */}
                <div className="flex flex-col items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[50px]">
                  {/* left */}
                  <div className="flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[30px] space-y-[10px] md:space-y-0 md:justify-center">
                    {/* title */}
                    {/* <div className="flex flex-col w-full flex-[1]">
                      <label className="label">
                        <span className="label-text font-semibold">Title*</span>
                      </label>
                      <select className="select select-primary w-full max-w-xs font-normal">
                        <option disabled selected>
                          - Select -
                        </option>
                        <option>Mr</option>
                        <option>Mrs</option>
                        <option>Ms</option>
                        <option>Miss</option>
                        <option>Dr</option>
                        <option>Lady</option>
                        <option>Lord</option>
                        <option>Sir</option>
                      </select>
                    </div> */}
                    {/* first name */}
                    <div className="form-control w-full flex-[3]">
                      <label className="label">
                        <span className="label-text font-semibold">
                          First Name*
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-primary w-full"
                      />
                    </div>
                  </div>
                  {/* right */}
                  <div className="flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center">
                    {/* last name */}
                    <div className="form-control w-full ">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Last Name*
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-primary w-full"
                      />
                    </div>
                  </div>
                </div>
                {/* row 4*/}
                <div className="flex flex-col items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[50px]">
                  {/* left */}
                  <div className="flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center">
                    {/* email */}
                    <div className="form-control w-full ">
                      <label className="label">
                        <span className="label-text font-semibold">Email*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-primary w-full"
                      />
                    </div>
                  </div>

                  {/* right */}
                  <div className="flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[30px] space-y-[10px] md:space-y-0 md:justify-center">
                    {/* country code */}
                    <div className="flex flex-col w-full flex-[1]">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Country Code*
                        </span>
                      </label>
                      <select className="select select-primary w-full max-w-xs my-[0px] font-normal">
                        {/* <option disabled selected>
                          - Select -
                        </option> */}
                        <option selected>United Kingdom (+44)</option>
                        <option>USA (+1)</option>
                        <option>France (+33)</option>
                        <option>Russia (+7)</option>
                        <option>Switzerland (+41)</option>
                        <option>Romania (+40)</option>
                        <option>Sweden (+46)</option>
                        <option>South Africa (+27)</option>
                      </select>
                    </div>
                    {/* Telephone* */}
                    <div className="form-control w-full flex-[1]">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Telephone*
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-primary w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* row 5 */}
                <div className="flex flex-col items-center justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[50px]">
                  {/* left */}
                  <div className="flex flex-[1] w-full flex-col md:flex-row md:space-x-[10px] space-y-[10px] md:space-y-0 md:justify-center">
                    {/* property type */}
                    <div className="flex flex-col w-full">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Property Type*
                        </span>
                      </label>
                      <select className=" select select-primary w-full font-normal">
                        <option disabled selected>
                          - Select -
                        </option>
                        <option>Studio flat</option>
                        <option>1 bed property</option>
                        <option>2 bed property</option>
                        <option>3 bed property</option>
                        <option>4 bed property</option>
                        <option>Storage</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex-[1] w-full flex flex-col md:flex-row md:items-center md:space-x-[20px] space-y-[10px] md:space-y-0">
                    {/* movers */}
                    <div className="flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[30px] space-y-[10px] md:space-y-0 md:justify-center">
                      {/* Move Date */}
                      <div className="form-control w-full ">
                        <label className="label">
                          <span className="label-text font-semibold">
                            Number of Movers*
                          </span>
                        </label>
                        <select className="select select-primary w-full font-normal">
                          <option disabled selected>
                            - Select -
                          </option>
                          <option>1 Man</option>
                          <option>2 Men</option>
                          <option>3 Men</option>
                        </select>
                      </div>
                    </div>
                    {/* mileage */}
                    <div className="flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[30px] space-y-[10px] md:space-y-0 md:justify-center">
                      {/* mileage */}
                      <div className="form-control w-full ">
                        <label className="label">
                          <span className="label-text font-semibold">
                            Mileage*
                          </span>
                        </label>
                        <select className="select select-primary w-full font-normal">
                          <option disabled selected>
                            - Select -
                          </option>
                          <option>0 - 25</option>
                          <option>26 - 75</option>
                          <option>76 - 150</option>
                          <option>151 - 200</option>
                          <option>201 - 250</option>
                          <option>251 - 300</option>
                          <option>301 - 350</option>
                          <option>351 - 400</option>
                          <option>401 - 450</option>
                          <option>451 - 500</option>
                          <option>501 - 550</option>
                          <option>551 - 600</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {/* row 6 */}
                <div className="flex flex-col  justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[50px]">
                  {/* left */}
                  <div className="flex flex-[1]">
                    {/* property type */}
                    <div className="flex flex-col w-full">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Duration*
                        </span>
                      </label>
                      <div className="flex items-center space-x-[5px]">
                        <div
                          onClick={() =>
                            durationCount &&
                            setDurationCount((prev) => prev - 1)
                          }
                          className="flex justify-center items-center btn btn-primary w-[55px] p-[5px] h-[55px] rounded-[5px]"
                        >
                          <AiOutlineMinus className="text-white font-bold text-[18px]" />
                        </div>
                        <div className="flex justify-center items-center h-[55px] rounded-[10px] w-full border border-primary font-semibold">
                          {durationCount} {hourValue}
                        </div>
                        <div
                          onClick={() => setDurationCount((prev) => prev + 1)}
                          className="flex justify-center items-center btn btn-primary w-[55px] p-[5px] h-[55px] rounded-[5px]"
                        >
                          <AiOutlinePlus className="text-white font-bold text-[18px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* right */}
                  <div className="flex flex-[1] space-x-[20px]">
                    <div className="flex flex-[1]">
                      {/* volume */}
                      <div className="flex flex-col w-full">
                        <label className="label">
                          <span className="label-text font-semibold">
                            Volume: CU/FT
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="input input-primary w-full h-[55px]"
                        />
                      </div>
                    </div>
                    <div className="flex flex-[1]">
                      {/* date*/}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold">
                            Move Date*
                          </span>
                        </label>
                        <div className="bg-white border rounded-[8px] border-primary">
                          <BasicDatePicker />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* agree to terms */}
              <div className="flex justify-center  mt-[30px] mb-[10px] md:mb-[20px] w-full">
                <div className="form-control ">
                  <label className="label cursor-pointer flex justify-center space-x-[20px] w-full">
                    <input
                      type="checkbox"
                      //   checked="checked"
                      className="checkbox checkbox-primary"
                    />
                    <span className="leading-[20px] text-[14px] md:text-[16px]">
                      I agree to the terms and conditions outlined in the
                      privacy policy
                    </span>
                  </label>
                </div>
              </div>
              {/* submit button */}
              <div className=" mt-6 w-full flex justify-center">
                <Link href="/book/move-package">
                  <button className="btn btn-primary btn-wide flex items-center space-x-[5px] h-[60px]">
                    <span className="">Get Prices</span>
                    <span className="">
                      <FiEdit className="text-[20px]" />
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </BookingLayout>
  );
};

export default ManAndVan;
