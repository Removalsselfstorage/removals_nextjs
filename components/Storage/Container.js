import React from "react";

const Container = ({
  title,
  price,
  rate,
  dimension,
  note,
  duration,
  handleDurationChange,
  quantity,
  handleDurationChange2,
  submitStatus,
}) => {
  return (
    <div className='flex flex-col lg:flex-row space-y-[20px] lg:space-y-0 py-[50px]'>
      {/* image */}
      <div className='flex-[2]'>
        <img src='/cont1.png' className='h-[400px] w-full object-contain' alt='' />
      </div>
      {/* body content */}
      <div className='flex flex-col flex-[1]'>
        <p className='font-bold text-[18px] mb-[7px] text-primary'>{title}</p>
        <p className='font-bold text-[24px] mb-[10px] text-primary'>
          £{(duration * price * quantity).toFixed(2)}
        </p>
        <p className='font-semibold mb-[20px]'>( £{rate} / Week )</p>

        <p className=' mb-[10px]'>
          <span className='font-semibold'>Dimension: </span>
          <span className=''>{dimension}</span>
        </p>
        <p className=' mb-[20px] italic text-[15px]'>
          <span className='font-semibold'> NB: </span>
          <span className=''>{note}</span>
        </p>

        {/* <p className='mb-[10px]'>● Queen size mattress</p>
      <p className='mb-[10px]'>● Bedroom furnishings</p>
      <p className='mb-[10px]'>● Living room furnishings</p>
      <p className='mb-[10px]'>● Multiple large boxes</p>
      <p className='mb-[20px]'>● No 24 hour access</p> */}

        <div className="flex flex-col space-y-[10px] md:flex-row md:items-center md:space-y-0 md:space-x-[20px]">
            <div className='flex flex-col w-full'>
              <label className='label'>
                <p className=' font-semibold'>
                  Container Quantity
                </p>
              </label>
              <input
                type='number'
                min='1'
                step='1'
                placeholder='Quantity of container'
                className={`input input-primary w-[256px] h-[43px]`}
                onChange={(e) => handleDurationChange2(e)}
                value={quantity}
              />
            </div>
            <div className='flex flex-col w-full'>
              <label className='label'>
                <p className=' font-semibold'>
                  Rent Duration <span className='text-[15px]'>(Week(s))</span>
                </p>
              </label>
              <input
                type='number'
                min='1'
                step='1'
                placeholder='Number of weeks'
                className={`input input-primary w-[256px] h-[43px]`}
                onChange={(e) => handleDurationChange(e)}
                value={duration}
              />
            </div>
        </div>

        {/* submit button */}
        <div className=' mt-6 w-full flex'>
          <div className='flex flex-col '>
            <button
              // onClick={removalFormSubmit}
              // disabled={submitLoading}
              className='btn btn-secondary btn-wide flex items-center space-x-[5px] h-[60px]'
            >
              {<span className=''>Rent Now</span>}
              {/* {submitLoading && (
        <span className='loading loading-spinner loading-md text-white'></span>
      )} */}
              {/* { (
        <span className=''>
          <FiEdit className='text-[20px]' />
        </span>
      )} */}
            </button>
            {submitStatus === "error" && (
              <div className='text-[14px] mt-[15px] text-secondary bg-secondary/20 rounded-[10px] py-[10px] px-[30px]'>
                Please input a duration.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
