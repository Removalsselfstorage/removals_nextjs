import React from 'react';
import { FiEdit } from 'react-icons/fi';
import FullRating from '../../Rating/FullRating';
import EditHalfStars from '@/components/Rating/EditHalfStars';
import InputSearch from '@/components/InputSearch';
import chroma from 'chroma-js';

import Select, { StylesConfig } from 'react-select';

const colourOptions = [
  { value: 'ocean', label: 'Complete house removal', color: '#015701' },
  { value: 'blue', label: 'Man and Van' },
  { value: 'purple', label: 'Studio flat' },
  { value: 'red', label: '1 bedroom apartment' },
  { value: 'orange', label: '2 bedroom apartment' },
  { value: 'yellow', label: '3 bed house' },
  { value: 'green', label: '4 bed house' },
  { value: 'forest', label: 'Storage' },
  //   { value: 'slate', label: 'Slate', color: '#253858' },
  //   { value: 'silver', label: 'Silver', color: '#666666' },
];

const citiesOptions = [
  { value: 'london', label: 'London' },
  { value: 'birmingham', label: 'Birmingham' },
  { value: 'manchester', label: 'Manchester' },
  { value: 'liverpool', label: 'Liverpool' },
  { value: 'bristol', label: 'Bristol' },
  { value: 'leeds', label: 'Leeds' },
  { value: 'newcastle', label: 'Newcastle' },
  { value: 'sheffield', label: 'Sheffield' },
  { value: 'nottingham', label: 'Nottingham' },
  { value: 'southampton', label: 'Southampton' },
  { value: 'norwich', label: 'Norwich' },
  { value: 'cardiff', label: 'Cardiff' },
  { value: 'cambridge', label: 'Cambridge' },
  { value: 'oxford', label: 'Oxford' },
  { value: 'brighton', label: 'Brighton' },
  { value: 'plymouth', label: 'Plymouth' },
  { value: 'portsmouth', label: 'Portsmouth' },
  { value: 'leicester', label: 'Leicester' },
  { value: 'coventry', label: 'Coventry' },
  { value: 'york', label: 'York' },
  { value: 'hull', label: 'Hull' },
  { value: 'bradford', label: 'Bradford' },
  { value: 'stoke-on-trent', label: 'Stoke-on-Trent' },
  { value: 'wolverhampton', label: 'Wolverhampton' },
  { value: 'derby', label: 'Derby' },
  { value: 'swansea', label: 'Swansea' },
  { value: 'southend-on-sea', label: 'Southend-on-Sea' },
  { value: 'sunderland', label: 'Sunderland' },
  { value: 'nottingham', label: 'Nottingham' },
  { value: 'luton', label: 'Luton' },
  { value: 'preston', label: 'Preston' },
  { value: 'blackpool', label: 'Blackpool' },
  { value: 'reading', label: 'Reading' },
  { value: 'northampton', label: 'Northampton' },
  { value: 'middlesbrough', label: 'Middlesbrough' },
  { value: 'peterborough', label: 'Peterborough' },
  { value: 'bournemouth', label: 'Bournemouth' },
  { value: 'stockport', label: 'Stockport' },
  { value: 'ipswich', label: 'Ipswich' },
  { value: 'sunderland', label: 'Sunderland' },
  { value: 'oxford', label: 'Oxford' },
  { value: 'bristol', label: 'Bristol' },
  { value: 'swindon', label: 'Swindon' },
  { value: 'huddersfield', label: 'Huddersfield' },
  { value: 'glasgow', label: 'Glasgow' },
  { value: 'edinburgh', label: 'Edinburgh' },
  { value: 'dundee', label: 'Dundee' },
];

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};

const HeroInputBox = () => {
  return (
    <div className="card shadow-2xl bg-base-100  text-black">
      <div className="card-body">
        <div className="flex flex-col items-center justify-center mb-[0px]">
          <h3 className="text-xl font-bold text-gray-800 uppercase mb-[0px]">
            TRUST<span className="text-gray-500">PILOT</span>
          </h3>
          <FullRating value={4} color="text-secondary" />
          <p className="text-gray-400 mt-[0px] text-[14px]">
            TrustScore 4.9 | 4,155 Reviews
          </p>
        </div>
        <h3 className="text-2xl font-bold text-primary uppercase my-[10px] ">
          What are you moving?
        </h3>
        <div className="w-full">
          {/* <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">
                Pick the best fantasy franchise
              </span>
            </label>
            <select className="select slect-md select-bordered">
              <option disabled selected>
                Select
              </option>
              <option>Star Wars</option>
              <option>Harry Potter</option>
              <option>Lord of the Rings</option>
              <option>Planet of the Apes</option>
              <option>Star Trek</option>
            </select>
          </div> */}
          <div className="mb-[20px]">
            <label className="label">
              <span className="">What are you moving?</span>
            </label>
            <Select
              className="basic-single"
              classNamePrefix="select"
            //   defaultValue={colourOptions[0]}
              //   isDisabled={isDisabled}
              //   isLoading={isLoading}
              //   isClearable={true}
              //   isRtl={isRtl}
              isSearchable={true}
              name="color"
              options={colourOptions}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="">Where are you moving to?</span>
            </label>
            <Select
              className="basic-single"
              classNamePrefix="select"
            //   defaultValue={citiesOptions[0]}
              //   isDisabled={isDisabled}
              //   isLoading={isLoading}
              //   isClearable={true}
              //   isRtl={isRtl}
              isSearchable={true}
              name="color"
              options={citiesOptions}
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
