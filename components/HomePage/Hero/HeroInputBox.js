import React from 'react';
import { FiEdit } from 'react-icons/fi';
import FullRating from '../../Rating/FullRating';
import EditHalfStars from '@/components/Rating/EditHalfStars';

const HeroInputBox = () => {
  return (
    <div className="card shadow-2xl bg-base-100 overflow-hidden text-black">
      <div className="card-body">
        <div className="flex flex-col items-center justify-center mb-[20px] bg-gray-200/50 mx-[-50px] mt-[-35px] py-[20px]">
          <h3 className="text-xl font-bold text-gray-800 uppercase mb-[5px]">
            TRUST<span className="text-gray-500">PILOT</span>
          </h3>
          <FullRating value={4} color='text-secondary' />
          <p className="text-gray-400 mt-[8px]">
            TrustScore 4.9 | 4,155 Reviews
          </p>
        </div>
        <h3 className="text-2xl font-bold text-primary uppercase mb-[10px]">
          What are you moving?
        </h3>
        <div className="w-full">
            <div className="form-control">
              <label className="label">
                <span className="">What are you moving?</span>
              </label>
              <input
                type="text"
                placeholder="Select"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="">Where are you moving to?</span>
              </label>
              <input
                type="text"
                placeholder="Select"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary flex items-center space-x-[5px]">
                <span className="">Get a Quote</span>
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
