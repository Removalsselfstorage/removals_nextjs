import React from "react";

const QuoteDetails = ({
  uincludes,
  uexcludes,
  udate,
  uemail,
  ubookref,
  uname,
  uphone,
  uaddress1,
  uaddressFloor1,
  uaddress2,
  uaddressFloor2,
  uproperty,
  umovers,
  umileage,
  uvolume,
  uduration,
  umoveDate,
  upackage,
  utime,
  uincludes1,
  uincludes2,
  uincludes3,
  uincludes4,
  uincludes5,
  uexcludes1,
  uexcludes2,
  uexcludes3,
  uexcludes4,
  uexcludes5,
  ucharge,
  uvat,
  utotal,
  ulink,
  //   checkPropertyType,
}) => {
  const checkPropertyType = () => {
    switch (uproperty) {
      case "Man and van":
        return true;
        break;
      case "Office removals":
        return true;
        break;
      case "Studio flat":
        return true;
        break;
      case "Furniture & Appliances":
        return true;
        break;
      case "1 Bed property":
        return false;
        break;
      case "2 Bed property":
        return false;
        break;
      case "3 Bed property":
        return false;
        break;
      case "4 Bed property":
        return false;
        break;

      default:
        break;
    }
  };

  return (
    <div className="flex flex-col  px-[15px] py-[15px]  bg-white rounded-[0px] mx-[10px] md:mx-[50px]">
      <div className="w-full px-[30px] py-[30px] flex flex-col space-y-[20px] md:space-y-0 md:flex-row justify-between items-center bg-primary border-[2px] border-primary">
        <div className="flex flex-col">
          {/* <img src={url} alt="" className="h-[80px]" /> */}
          {/* <img src={previewUrl} alt="" className="h-[80px]" /> */}
          <img src={"/rss_logo3.png"} alt="" className="h-[70px]" />
          {/* <p className="font-extrabold text-[30px] mt-[50px] pl-[0px]">
        Move Quote
      </p> */}
        </div>
        <div className="flex   text-white items-center divide-x-2">
          <div className="flex flex-col space-y-[5px] pr-[20px]">
            <p className="text-[14px] text-semibold">Book Ref.:</p>
            <p className="text-[14px] text-semibold">Valid For:</p>
            <p className="text-[14px] text-semibold">Estimated Vol.:</p>
            <p className="text-[14px] text-semibold">Date:</p>
          </div>

          <div className="flex flex-col space-y-[5px] pl-[20px]">
            <p className="text-[14px] ">{ubookref}</p>
            <p className="text-[14px]">10 days</p>
            <p className="text-[14px]">{uvolume}</p>
            <p className="text-[14px]">{udate}</p>
          </div>
        </div>
      </div>

      {/* user details */}
      <div className="text-[14px] mt-[10px] w-full hidden md:inline-block">
        <table className="table table-md table-pin-rows table-pin-cols w-full">
          <tbody>
            <tr className="w-full">
              <td className="border-[1.5px] border-black bg-gray-500/10 font-bold ">
                Name
              </td>
              <td className="border-[1.5px] border-black ">{uname}</td>
              <td className="border-[1.5px] border-black bg-gray-500/10 font-bold ">
                Email
              </td>
              <td className="border-[1.5px] border-black ">{uemail}</td>
              <td className="border-[1.5px] border-black bg-gray-500/10 font-bold ">
                Phone (+44)
              </td>
              <td className="border-[1.5px] border-black ">{uphone}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        className="text-[14px] mt-[0px] w-full 
md:hidden"
      >
        <table className="table table-md table-pin-rows table-pin-cols w-full">
          <tbody>
            <tr className="">
              <td className="border-[1.5px] border-black bg-gray-500/10 font-bold ">
                Name
              </td>
              <td className="border-[1.5px] border-black ">{uname}</td>
            </tr>
            <tr className="">
              <td className="border-[1.5px] border-black bg-gray-500/10 font-bold">
                Email
              </td>
              <td className="border-[1.5px] border-black ">{uemail}</td>
            </tr>
            <tr className="">
              <td className="border-[1.5px] border-black bg-gray-500/10 font-bold">
                Phone (+44)
              </td>
              <td className="border-[1.5px] border-black">{uphone}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* move details title*/}
      <div className="bg-primary py-[10px] px-[20px]  border-[1.5px] border-primary mt-[10px]">
        <p className="text-white font-bold text-[18px] uppercase">
          Quote Details:
        </p>
      </div>

      {/* move details */}
      <div className="text-[14px] hidden md:inline-block">
        <table className="table table-md table-pin-rows table-pin-cols">
          <tbody>
            <tr className="">
              <td className="border-[1.5px] border-black bg-gray-500/10 w-[15%] font-bold">
                Collected From
              </td>
              <td className="border-[1.5px] border-black   w-[35%]">
                {uaddress1}
              </td>
              <td className="border-[1.5px] border-black bg-gray-500/10 w-[15%] font-bold">
                Delivered To
              </td>
              <td className="border-[1.5px] border-black   w-[35%]">
                {uaddress2}
              </td>
            </tr>
            <tr className="">
              <td className="border-[1.5px]  border-black bg-gray-500/10 w-[15%] font-bold"></td>
              <td className="border-[1.5px] border-black   w-[35%]">
                {uaddressFloor1}
              </td>
              <td className="border-[1.5px]  border-black bg-gray-500/10 w-[15%] font-bold"></td>
              <td className="border-[1.5px] border-black   w-[35%]">
                {uaddressFloor2}
              </td>
            </tr>
            <tr className="">
              <td className="border-[1.5px] border-black bg-gray-500/10 w-[15%] font-bold">
                Property Type
              </td>
              <td className="border-[1.5px] border-black   w-[35%]">
                {uproperty}
              </td>
              <td className="border-[1.5px] border-black bg-gray-500/10 w-[15%] font-bold">
                Number of Movers
              </td>
              <td className="border-[1.5px] border-black   w-[35%]">
                {umovers}
              </td>
            </tr>

            <tr className="">
              <td className="border-[1.5px] border-black bg-gray-500/10 w-[15%] font-bold">
                Mileage
              </td>
              <td className="border-[1.5px] border-black  w-[35%]">
                {umileage}
              </td>
              <td className="border-[1.5px] border-black bg-gray-500/10 w-[15%] font-bold">
                Move Duration
              </td>
              <td className="border-[1.5px] border-black  w-[35%]">
                {uduration}
              </td>
            </tr>

            <tr className="">
              <td className="border-[1.5px] border-black bg-gray-500/10 w-[15%] font-bold">
                Move Package
              </td>
              <td className="border-[1.5px] border-black  w-[35%]">
                {upackage} Package
              </td>
              <td className="border-[1.5px] border-black bg-gray-500/10 w-[15%] font-bold">
                Move Date
              </td>
              <td className="border-[1.5px] border-black  w-[35%]">
                {umoveDate} --- {utime}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-[14px] md:hidden">
        <table className="table table-md table-pin-rows table-pin-cols">
          <tbody>
            <tr className="">
              <td className="border-[1.5px] border-black bg-gray-500/10 w-[15%] font-bold">
                Collected From
              </td>
              <td className="border-[1.5px] border-black   w-[35%]">
                {uaddress1}
              </td>
            </tr>
            <tr className="">
              <td className="border-[1.5px]  border-black bg-gray-500/10 w-[15%] font-bold"></td>
              <td className="border-[1.5px] border-black   w-[35%]">
                {uaddressFloor1}
              </td>
            </tr>
            <tr className="">
              <td className="border-[1.5px] border-black bg-gray-500/10 w-[15%] font-bold">
                Delivered To
              </td>
              <td className="border-[1.5px] border-black   w-[35%]">
                {uaddress2}
              </td>
            </tr>
            <tr className="">
              <td className="border-[1.5px]  border-black bg-gray-500/10 w-[15%] font-bold"></td>
              <td className="border-[1.5px] border-black   w-[35%]">
                {uaddressFloor2}
              </td>
            </tr>
            <tr className="">
              <td className="border-[1.5px] border-black bg-gray-500/10 w-[15%] font-bold">
                Property Type
              </td>
              <td className="border-[1.5px] border-black   w-[35%]">
                {uproperty}
              </td>
            </tr>
            <tr className="">
              <td className="border-[1.5px] border-black bg-gray-500/10 w-[15%] font-bold">
                Number of Movers
              </td>
              <td className="border-[1.5px] border-black   w-[35%]">
                {umovers}
              </td>
            </tr>

            <tr className="">
              <td className="border-[1.5px] border-black bg-gray-500/10 w-[15%] font-bold">
                Mileage
              </td>
              <td className="border-[1.5px] border-black  w-[35%]">
                {umileage}
              </td>
            </tr>
            <tr className="">
              <td className="border-[1.5px] border-black bg-gray-500/10 w-[15%] font-bold">
                Move Duration
              </td>
              <td className="border-[1.5px] border-black  w-[35%]">
                {uduration}
              </td>
            </tr>

            <tr className="">
              <td className="border-[1.5px] border-black bg-gray-500/10 w-[15%] font-bold">
                Move Package
              </td>
              <td className="border-[1.5px] border-black  w-[35%]">
                {upackage} Package
              </td>
              
            </tr>
            <tr className="">
             
              <td className="border-[1.5px] border-black bg-gray-500/10 w-[15%] font-bold">
                Move Date
              </td>
              <td className="border-[1.5px] border-black  w-[35%]">
                {umoveDate} --- {utime}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* quote includes */}
      {/* <div className="bg-primary py-[10px] px-[20px] border-[1.5px] border-primary mt-[10px]">
        <p className="text-white font-bold text-[18px] uppercase">
          Quote Includes:
        </p>
      </div> */}

      <div className="text-[18px] mt-[10px]">
        <table className="table table-md table-pin-rows table-pin-cols">
          <tbody>
            {uincludes?.map((ui, i) => {
              return (
                <tr key={i}>
                  <td
                    className={`${
                      i > 0
                        ? "text-gray-500/10 border-[1.5px] border-black bg-gray-500/10 w-[15%] font-bold"
                        : "text-black border-[1.5px] border-black bg-gray-500/10 w-[15%] font-bold"
                    }`}
                  >
                    Quote Includes
                  </td>
                  <td className="border-[1.5px] border-black w-[85%]">
                    {ui.name}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* quote excludes */}
      {/* <div className="bg-primary py-[10px] px-[20px] border-[1.5px] border-primary ">
        <p className="text-white font-bold text-[18px] uppercase">
          Quote Excludes:
        </p>
      </div> */}

      <div className="text-[18px] mt-[10px]">
        <table className="table table-md table-pin-rows table-pin-cols">
          <tbody>
            {uexcludes?.map((ui, i) => {
              return (
                <tr key={i}>
                  <td
                    className={`${
                      i > 0
                        ? "text-gray-500/10 border-[1.5px] border-black bg-gray-500/10 w-[15%] font-bold"
                        : "text-black border-[1.5px] border-black bg-gray-500/10 w-[15%] font-bold"
                    }`}
                  >
                    Quote Excludes
                  </td>
                  <td className="border-[1.5px] border-black w-[85%]">
                    {ui.name}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* quote price title*/}
      <div className="bg-primary py-[10px] px-[20px] mt-[10px] border-[1.5px] border-primary">
        <p className="text-white font-bold text-[18px] uppercase">
          Quote Price:
        </p>
      </div>

      {/* quote price */}
      <div className="text-[18px] hidden md:inline-block">
        <table className="table table-md table-pin-rows table-pin-cols">
          <tbody>
            <tr className="">
              <td className="border-[1.5px] border-black bg-gray-500/10  font-bold">
                Charge
              </td>
              <td className="border-[1.5px] border-black text-[18px] font-bold ">
                {ucharge}
              </td>
              <td className="border-[1.5px] border-black bg-gray-500/10  font-bold">
                VAT
              </td>
              <td className="border-[1.5px] border-black text-[18px] font-bold  ">
                {uvat}
              </td>
              <td className="border-[1.5px] border-black bg-gray-500/10 font-bold ">
                Total
              </td>
              <td className="border-[1.5px] border-black  text-[18px] font-bold ">
                {utotal}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-[18px] md:hidden">
        <table className="table table-md table-pin-rows table-pin-cols">
          <tbody>
            <tr className="">
              <td className="border-[1.5px] border-black bg-gray-500/10  font-bold">
                Charge
              </td>
              <td className="border-[1.5px] border-black text-[18px] font-bold ">
                {ucharge}
              </td>
            </tr>
            <tr className="">
              <td className="border-[1.5px] border-black bg-gray-500/10  font-bold">
                VAT
              </td>
              <td className="border-[1.5px] border-black text-[18px] font-bold  ">
                {uvat}
              </td>
            </tr>
            <tr className="">
              <td className="border-[1.5px] border-black bg-gray-500/10 font-bold">
                Total
              </td>
              <td className="border-[1.5px] border-black  text-[18px] font-bold ">
                {utotal}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-full">
        <p className="text-[16px] w-full text-center mt-[20px]">
          <span className="font-bold">NB:</span> 20% deposit is required to
          secure your move
        </p>
      </div>

      <div className="flex flex-col md:flex-row mt-[10px] ">
        <div className="flex-[1] flex flex-col mt-[0px] ">
          <p className="font-bold text-[16px] w-full mt-[20px] text-center md:text-start">
            REMOVAL & SELF STORAGE
          </p>

          <p className="font-semibold text-[14px] w-full mt-[10px] text-center md:text-start">
            Amwell St, Islington LONDON EC1R 1UR United Kingdom
          </p>
          <p className=" text-[13px] w-full mt-[10px] text-center md:text-start">
            <span className="font-bold">KENT:</span> Medway: 01634-940721 |
            Tunbridge Wells: 01892 234350
          </p>
          <p className="text-[13px] w-full mt-[5px] text-center md:text-start">
            Sevenoaks: 01732 240501 | Gravesend: 01474 632503
          </p>
          <p className=" text-[13px] w-full mt-[7px] text-center md:text-start">
            <span className="font-bold">ESSEX: </span>sildon: 01268 937401 |
            Chelmsford: 01425 206510
          </p>
        </div>

        <div className="flex-[0.5] flex justify-center space-x-[20px] md:justify-end w-full mt-[20px]">
          <img src="/guarantee.png" alt="" className="h-[110px] w-fit" />
          <img src="/cancel.png" alt="" className="h-[100px] w-fit" />
          {/* <p className="font-extrabold text-[30px] mt-[50px] pl-[0px]">
        Move Quote
      </p> */}
        </div>
      </div>
    </div>
  );
};

export default QuoteDetails;
