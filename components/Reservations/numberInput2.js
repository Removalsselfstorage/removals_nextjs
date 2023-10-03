import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

function NumberInput2({ title, count, addCount, minusCount }) {
  //   const [floorCount, setFloorCount] = useState(0);

  return (
    <div className="flex items-center justify-between w-full border rounded-[5px] px-[5px] py-[5px] border-gray-700/50">
      {title && (
        <label className="label">
          <span className="label-text font-semibold line-clamp-1">{title}</span>
        </label>
      )}
      <div className="flex items-center space-x-[3px]">
        {count > 0 && (
          <div
            onClick={() => minusCount({ itemName: title })}
            className="flex justify-center items-center  bg-gray-400 cursor-pointer hover:bg-gray-500 w-[30px] p-[5px] h-[30px] rounded-[5px]"
          >
            <AiOutlineMinus className="text-white font-bold text-[14px]" />
          </div>
        )}
        {count > 0 && (
          <div
            className={`${
              // activateError && !floorCount
              //   ? 'flex justify-center items-center ring ring-secondary h-[50px] rounded-[10px] w-[60px]'
              //   : 'flex justify-center items-center h-[50px] rounded-[10px] w-[60px] border border-primary font-semibold'
              "flex justify-center select-none items-center h-[35px] text-[14px] rounded-[10px] w-[35px] border border-gray-400 font-semibold"
            }`}
          >
            {count}
          </div>
        )}
        <div
          //   onClick={() => setFloorCount((prev) => prev + 1)}
          onClick={() => addCount({ itemName: title })}
          className="flex justify-center items-center  bg-gray-400 cursor-pointer hover:bg-gray-500 w-[30px] p-[5px] h-[30px] rounded-[5px]"
        >
          <AiOutlinePlus className="text-white font-bold text-[14px]" />
        </div>
      </div>
    </div>
  );
}

export default NumberInput2;
