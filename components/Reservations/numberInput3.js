import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

function NumberInput3({ count, addCount, minusCount, setText, text }) {
  //   const [floorCount, setFloorCount] = useState(0);

  return (
    <div className="flex items-center space-x-[20px] w-full border rounded-[5px] px-[5px] py-[5px] border-gray-700/50">
      <div className="w-full flex items-center">
        <input
          type="text"
          className="input outline-none input-bordered h-[30px] px-[10px] w-full"
          placeholder="Add new item"
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
        />
      </div>
      <div className="flex items-center space-x-[3px]">
        <div
          onClick={() => count > 0 && minusCount()}
          className="flex justify-center items-center  bg-gray-400 cursor-pointer hover:bg-gray-500 w-[30px] p-[5px] h-[30px] rounded-[5px]"
        >
          <AiOutlineMinus className="text-white font-bold text-[14px]" />
        </div>
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
        <div
          //   onClick={() => setFloorCount((prev) => prev + 1)}
          onClick={() => addCount()}
          className="flex justify-center items-center  bg-gray-400 cursor-pointer hover:bg-gray-500 w-[30px] p-[5px] h-[30px] rounded-[5px]"
        >
          <AiOutlinePlus className="text-white font-bold text-[14px]" />
        </div>
      </div>
    </div>
  );
}

export default NumberInput3;
