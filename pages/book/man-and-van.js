import QuoteType from '@/components/BookingPages/QuoteType';
import BasicDatePicker from '@/components/DatePicker/DatePicker';
import SelectSearch from '@/components/Inputs/SelectSearch';
import {
  citiesOptions,
  menOptions,
  mileageOptions,
  phoneCodesOptions,
  serviceOptions,
} from '@/dummyData/inputData';
import BookingLayout from '@/layouts/BookingLayout';
import { titleFont } from '@/utils/fonts';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import GoogleSearchInput from '@/components/Inputs/GoogleSearchInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllDetails,
  updateLocationDetails,
  updateMoveDetails,
  updatePersonalDetails,
} from '@/store/quoteSlice';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

const ManAndVan = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const details = useSelector(getAllDetails);

  const [floorCount, setFloorCount] = useState(
    details.serviceLocation.locationFrom.floor || 0
  );
  const [floorCount2, setFloorCount2] = useState(
    details.serviceLocation.locationTo.floor || 0
  );
  const [lift, setLift] = useState(
    details.serviceLocation.locationFrom.liftAvailable || false
  );
  const [lift2, setLift2] = useState(
    details.serviceLocation.locationTo.liftAvailable || false
  );
  const [durationCount, setDurationCount] = useState(
    details.moveDetails.duration || 0
  );
  const [address, setAddress] = useState({});
  const [addressDetails, setAddressDetails] = useState({});
  const [address2, setAddress2] = useState({});
  const [addressDetails2, setAddressDetails2] = useState({});
  const [propertyValue, setPropertyValue] = useState(
    details.serviceLocation.moveService || ''
  );
  const [phoneValue, setPhoneValue] = useState(
    details.personalDetails.countryCode || ''
  );
  const [menValue, setMenValue] = useState(
    details.moveDetails.numberOfMovers || ''
  );
  const [agreeTermsValue, setAgreeTermsValue] = useState(false);
  const [mileageValue, setMileageValue] = useState(
    details.moveDetails.mileage || ''
  );
  const [dateValue, setDateValue] = useState(
    dayjs(details.moveDetails.moveDate || '')
  );
  const [firstName, setFirstName] = useState(
    details.personalDetails.firstName || ''
  );
  const [lastName, setLastName] = useState(
    details.personalDetails.lastName || ''
  );
  const [email, setEmail] = useState(details.personalDetails.email || '');
  const [emailError, setEmailError] = useState(true);
  const [volume, setVolume] = useState(details.moveDetails.volume || '');
  const [phone, setPhone] = useState(details.personalDetails.telephone || '');
  const [submitError, setSubmitError] = useState(false);

  const [submitLoading, setSubmitLoading] = useState(false);

  const hourValue = durationCount <= 1 ? 'hour' : 'hours';

  const handleEmailChange = (e) => {
    // const inputValue = e.target.value;
    setEmail(e.target.value);

    // Regular expression to validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // setIsValid(emailPattern.test(inputValue));
    setEmailError(emailPattern.test(e.target.value));
  };

  const date = dayjs(dateValue).format('DD/MM/YYYY');

  const selectDefaultValue = () => {
    const option = serviceOptions.filter(
      (opt) => opt.value == details.serviceLocation.moveService
    );
    return option;
  };

  const defaultMenValue = () => {
    const option = menOptions.filter(
      (opt) => opt.value == details.moveDetails.numberOfMovers
    );
    return option;
  };
  const defaultMileageValue = () => {
    const option = mileageOptions.filter(
      (opt) => opt.value == details.moveDetails.mileage
    );
    return option;
  };

  const defaultPhoneValue = () => {
    const option = phoneCodesOptions.filter(
      (opt) =>
        opt.value == 'United Kingdom (+44)' ||
        details.personalDetails.countryCode
    );
    return option;
  };

  const FormSubmit = () => {
    setSubmitError(false);
    if (
      !floorCount ||
      !lift ||
      !lift2 ||
      !floorCount2 ||
      propertyValue == '' ||
      propertyValue == 'Select' ||
      !address ||
      !address2 ||
      !firstName ||
      !lastName ||
      //   !phoneValue ||
      !phone ||
      !menValue ||
      menValue == 'Select' ||
      !durationCount ||
      !volume ||
      !mileageValue ||
      mileageValue == 'Select' ||
      date == 'Invalid Date' ||
      !agreeTermsValue
    ) {
      setSubmitError(true);
    } else {
      router.push('/book/move-package');
    }
    dispatch(
      updateLocationDetails({
        moveService: propertyValue,
        locationFrom: {
          name: address,
          postCode: addressDetails.zip,
          city: addressDetails.city,
          country: addressDetails.country,
          floor: floorCount,
          liftAvailable: lift,
        },
        locationTo: {
          name: address2,
          postCode: addressDetails2.zip,
          city: addressDetails2.city,
          country: addressDetails2.country,
          floor: floorCount2,
          liftAvailable: lift2,
        },
      })
    );
    dispatch(
      updatePersonalDetails({
        firstName,
        lastName,
        email,
        countryCode: phoneValue,
        telephone: phone,
      })
    );
    dispatch(
      updateMoveDetails({
        propertyType: propertyValue,
        numberOfMovers: menValue,
        mileage: mileageValue,
        volume: volume,
        duration: durationCount,
        moveDate: dateValue,
        // movePackage: '',
      })
    );
  };

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
              <div className="flex justify-center text-secondary mb-[10px] md:mb-[20px] text-[14px] md:text-[16px]">
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
                      <GoogleSearchInput
                        styles="py-[10px] px-[10px]"
                        setAddress={setAddress}
                        addressDetails={addressDetails}
                        setAddressDetails={setAddressDetails}
                        placeholder="Search location..."
                        defaultValue={details.serviceLocation.locationFrom.name}
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
                          className="flex justify-center items-center btn btn-primary w-[50px] p-[5px] h-[50px] rounded-[5px]"
                        >
                          <AiOutlineMinus className="text-white font-bold text-[18px]" />
                        </div>
                        <div className="flex justify-center items-center h-[50px] rounded-[10px] w-[60px] border border-primary font-semibold">
                          {floorCount}
                        </div>
                        <div
                          onClick={() => setFloorCount((prev) => prev + 1)}
                          className="flex justify-center items-center btn btn-primary w-[50px] p-[5px] h-[50px] rounded-[5px]"
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
                            onChange={(e) => setLift(e.target.checked)}
                            checked={lift}
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
                      <GoogleSearchInput
                        styles="py-[10px] px-[10px]"
                        setAddress={setAddress2}
                        addressDetails={addressDetails2}
                        setAddressDetails={setAddressDetails2}
                        placeholder="Search location..."
                        defaultValue={details.serviceLocation.locationTo.name}
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
                          className="flex justify-center items-center btn btn-primary w-[50px] p-[5px] h-[50px] rounded-[5px]"
                        >
                          <AiOutlineMinus className="text-white font-bold text-[18px]" />
                        </div>
                        <div className="flex justify-center items-center h-[50px] rounded-[10px] w-[60px] border border-primary font-semibold">
                          {floorCount2}
                        </div>
                        <div
                          onClick={() => setFloorCount2((prev) => prev + 1)}
                          className="flex justify-center items-center btn btn-primary w-[50px] p-[5px] h-[50px] rounded-[5px]"
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
                            onChange={(e) => setLift2(e.target.checked)}
                            checked={lift2}
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
                    {/* first name */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold">
                          First Name*
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-primary w-full h-[43px]"
                        onChange={(e) => setFirstName(e.target.value)}
                        defaultValue={firstName}
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
                        className="input input-primary w-full h-[43px]"
                        onChange={(e) => setLastName(e.target.value)}
                        defaultValue={lastName}
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
                        type="email"
                        placeholder="Type here"
                        className="input input-primary w-full h-[43px]"
                        onChange={handleEmailChange}
                        //
                        defaultValue={email}
                      />
                      {!emailError && (
                        <p className="text-[14px] text-secondary mt-[5px]">
                          Please enter a valid email
                        </p>
                      )}
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
                      <SelectSearch
                        placeholder="Select"
                        options={phoneCodesOptions}
                        isSearchable={true}
                        name="service2"
                        // defaultValue={serviceOptions[2]}
                        defaultValue={defaultPhoneValue()}
                        setValue={setPhoneValue}
                      />
                    </div>
                    {/* Telephone* */}
                    <div className="form-control w-full flex-[1]">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Telephone*
                        </span>
                      </label>
                      <input
                        type="tel"
                        placeholder="Type here"
                        className="input input-primary w-full h-[43px]"
                        onChange={(e) => setPhone(e.target.value)}
                        defaultValue={phone}
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
                      <div className="w-full">
                        <SelectSearch
                          placeholder="Select"
                          options={serviceOptions}
                          isSearchable={false}
                          //   name="service2"
                          // defaultValue={serviceOptions[2]}
                          defaultValue={
                            selectDefaultValue() || serviceOptions[0]
                          }
                          setValue={setPropertyValue}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex-[1] w-full flex flex-col md:flex-row md:items-center md:space-x-[20px] space-y-[10px] md:space-y-0">
                    {/* movers */}
                    <div className="flex w-full flex-[1] flex-col items-center md:flex-row md:space-x-[30px] space-y-[10px] md:space-y-0 md:justify-center">
                      {/* Number of movers */}
                      <div className="form-control w-full ">
                        <label className="label">
                          <span className="label-text font-semibold">
                            Number of Movers*
                          </span>
                        </label>
                        <div className="w-full">
                          <SelectSearch
                            placeholder="Select"
                            options={menOptions}
                            isSearchable={false}
                            //   name="service3"
                            defaultValue={defaultMenValue()}
                            //   defaultValue={menOptions[0]}
                            setValue={setMenValue}
                          />
                        </div>
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
                        <div className="w-full">
                          <SelectSearch
                            placeholder="Select"
                            options={mileageOptions}
                            isSearchable={false}
                            //   name="service3"
                            // defaultValue={serviceOptions[2]}
                            defaultValue={defaultMileageValue()}
                            setValue={setMileageValue}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* row 6 */}
                <div className="flex flex-col  justify-center space-y-[10px] lg:space-y-0 lg:flex-row lg:items-center lg:space-x-[50px]">
                  {/* left */}
                  <div className="flex flex-[1]">
                    {/* duration */}
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
                          className="flex justify-center items-center btn btn-primary w-[45px] p-[5px] h-[45px] rounded-[5px]"
                        >
                          <AiOutlineMinus className="text-white font-bold text-[18px]" />
                        </div>
                        <div className="flex justify-center items-center h-[48px] rounded-[10px] w-full border border-primary font-semibold">
                          {durationCount} {hourValue}
                        </div>
                        <div
                          onClick={() => setDurationCount((prev) => prev + 1)}
                          className="flex justify-center items-center btn btn-primary w-[45px] p-[5px] h-[45px] rounded-[5px]"
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
                            Volume: CU/FT*
                          </span>
                        </label>
                        <input
                          type="number"
                          min="0"
                          placeholder="Type here"
                          className="input input-primary w-full h-[43px]"
                          onChange={(e) => setVolume(e.target.value)}
                          defaultValue={volume}
                        />
                      </div>
                    </div>
                    <div className="flex flex-[1]">
                      {/* move date*/}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold">
                            Move Date*
                          </span>
                        </label>
                        <button className="flex justify-center items-center bg-white border-[1.4px] rounded-[8px] border-primary cursor-pointer overflow-hidden py-[4px] focus:ring-[2px] active:ring-[2px] ring-primary">
                          <div className="opacity-[0.9] mt-[-10px] cursor-pointer">
                            <BasicDatePicker
                              setDateValue={setDateValue}
                              dateValue={dateValue}
                            />
                          </div>
                        </button>
                        {/* <p className="">{dateValue}</p> */}
                        {/* <DatePicker2 /> */}
                        {/* <div className="bg-white border rounded-[8px] border-primary">
                        <BasicDatePicker />
                      </div> */}
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
                      onChange={(e) => setAgreeTermsValue(e.target.checked)}
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
                <div className="flex flex-col items-center justify-center">
                  <button
                    onClick={FormSubmit}
                    className="btn btn-primary btn-wide flex items-center space-x-[5px] h-[60px]"
                  >
                    <span className="">Get Prices</span>
                    <span className="">
                      <FiEdit className="text-[20px]" />
                    </span>
                  </button>
                  {submitError && (
                    <p className="text-[16px] text-secondary mt-[15px]">
                      Please completely fill all mandatory fields
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </BookingLayout>
  );
};

export default ManAndVan;
