import React from 'react';
import { FiEdit } from 'react-icons/fi';
import FullRating from '../../Rating/FullRating';
import EditHalfStars from '@/components/Rating/EditHalfStars';
import InputSearch from '@/components/InputSearch';
import chroma from 'chroma-js';


import SelectSearch from '@/components/SelectSearch';
import { citiesOptions, serviceOptions } from '@/dummyData/inputData';









const HeroInputBox = () => {
  return (
    <div className="card shadow-2xl bg-base-100  text-black w-full md:w-[400px]">
      <div className="card-body ">
        <div className="flex flex-col items-center justify-center mb-[0px] bg-gray-200 rounded-tl-[18px] rounded-tr-[18px] mx-[-32px] mt-[-32px] pt-[20px] pb-[20px] md:px-[50px]">
          <h3 className="text-xl font-bold text-gray-800 uppercase mb-[-10px]">
            TRUST<span className="text-gray-500">PILOT</span>
          </h3>
          <FullRating value={4} color="text-secondary" />
          <p className="text-gray-400 text-[14px] mt-[-5px] text-center">
            TrustScore 4.9 | 4,155 Reviews
          </p>
        </div>
        <h3 className="text-2xl font-bold text-primary uppercase mt-[10px] text-center">
          Get a Free Quote
        </h3>
        <div className="w-full">
          <div className="mb-[0px]">
            <label className="label">
              <span className="font-semibold">What are you moving?</span>
            </label>
            <div className="w-full">
              <SelectSearch placeholder='Removal category' options={serviceOptions} isSearchable={false} name='service' />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-semibold">Where are you moving from?</span>
            </label>
            <SelectSearch placeholder='City' options={citiesOptions} isSearchable={true} name='location1' />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-semibold">Where are you moving to?</span>
            </label>
            <SelectSearch placeholder='City' options={citiesOptions} isSearchable={true} name='location2' />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary flex items-center space-x-[5px]">
              <span className="">Get Quote</span>
              <span className="">
                <FiEdit className="text-[20px]" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroInputBox;
