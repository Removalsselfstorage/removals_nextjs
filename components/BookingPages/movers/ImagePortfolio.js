import React, { useEffect, useState } from "react";

const ImagePortfolio = ({ sideDetails }) => {
  const [portImage, setPortImage] = useState("");
  const [portImage1, setPortImage1] = useState("");
  const [portImage2, setPortImage2] = useState("");
  const [portImage3, setPortImage3] = useState("");
  const [portImage4, setPortImage4] = useState("");
  const [portImage5, setPortImage5] = useState("");
  const [portImage6, setPortImage6] = useState("");

  useEffect(() => {
    setPortImage1(sideDetails?.details?.portfolioPixUploadUrl1);
    setPortImage2(sideDetails?.details?.portfolioPixUploadUrl2);
    setPortImage3(sideDetails?.details?.portfolioPixUploadUrl3);
    setPortImage4(sideDetails?.details?.portfolioPixUploadUrl4);
    setPortImage5(sideDetails?.details?.portfolioPixUploadUrl5);
    setPortImage6(sideDetails?.details?.portfolioPixUploadUrl6);
  }, [portImage]);

  return (
    <div className=''>
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-[10px]'>
        {sideDetails?.details?.portfolioPixUploadUrl1 && (
          <div
            className='flex-[1] cursor-zoom-in hover:ring-[3px] ring-primary duration-200 rounded-[20px] hover:scale-[1.03]'
            onClick={() => {
              setPortImage(sideDetails?.details?.portfolioPixUploadUrl1);
              window.my_modal_319.showModal();
            }}
          >
            <img
              src={
                sideDetails?.details?.portfolioPixUploadUrl1
                  ? sideDetails?.details?.portfolioPixUploadUrl1
                  : "/van-placeholder.svg"
              }
              className='w-full h-[150px] rounded-[20px] object-contain  border-[2px]'
              alt=''
            />
          </div>
        )}

        {sideDetails?.details?.portfolioPixUploadUrl2 && (
          <div
            className='flex-[1] cursor-zoom-in hover:ring-[3px] ring-primary duration-200 rounded-[20px] hover:scale-[1.03]'
            onClick={() => {
              setPortImage(sideDetails?.details?.portfolioPixUploadUrl2);
              window.my_modal_319.showModal();
            }}
          >
            <img
              src={
                sideDetails?.details?.portfolioPixUploadUrl2
                  ? sideDetails?.details?.portfolioPixUploadUrl2
                  : "/van-placeholder.svg"
              }
              className='w-full h-[150px] rounded-[20px] object-contain border-[2px]'
              alt=''
            />
          </div>
        )}

        {sideDetails?.details?.portfolioPixUploadUrl3 && (
          <div
            className='flex-[1] cursor-zoom-in hover:ring-[3px] ring-primary duration-200 rounded-[20px] hover:scale-[1.03]'
            onClick={() => {
              setPortImage(sideDetails?.details?.portfolioPixUploadUrl3);
              window.my_modal_319.showModal();
            }}
          >
            <img
              src={
                sideDetails?.details?.portfolioPixUploadUrl3
                  ? sideDetails?.details?.portfolioPixUploadUrl3
                  : "/van-placeholder.svg"
              }
              className='w-full h-[150px] rounded-[20px] object-contain border-[2px]'
              alt=''
            />
          </div>
        )}

        {sideDetails?.details?.portfolioPixUploadUrl4 && (
          <div
            className='flex-[1] cursor-zoom-in hover:ring-[3px] ring-primary duration-200 rounded-[20px] hover:scale-[1.03]'
            onClick={() => {
              setPortImage(sideDetails?.details?.portfolioPixUploadUrl4);
              window.my_modal_319.showModal();
            }}
          >
            <img
              src={
                sideDetails?.details?.portfolioPixUploadUrl4
                  ? sideDetails?.details?.portfolioPixUploadUrl4
                  : "/van-placeholder.svg"
              }
              className='w-full h-[150px] rounded-[20px] object-contain border-[2px]'
              alt=''
            />
          </div>
        )}

        {sideDetails?.details?.portfolioPixUploadUrl5 && (
          <div
            className='flex-[1] cursor-zoom-in hover:ring-[3px] ring-primary duration-200 rounded-[20px] hover:scale-[1.03]'
            onClick={() => {
              setPortImage(sideDetails?.details?.portfolioPixUploadUrl5);
              window.my_modal_319.showModal();
            }}
          >
            <img
              src={
                sideDetails?.details?.portfolioPixUploadUrl5
                  ? sideDetails?.details?.portfolioPixUploadUrl5
                  : "/van-placeholder.svg"
              }
              className='w-full h-[150px] rounded-[20px] object-contain border-[2px]'
              alt=''
            />
          </div>
        )}

        {sideDetails?.details?.portfolioPixUploadUrl6 && (
          <div
            className='flex-[1] cursor-zoom-in hover:ring-[3px] ring-primary duration-200 rounded-[20px] hover:scale-[1.03]'
            onClick={() => {
              setPortImage(sideDetails?.details?.portfolioPixUploadUrl6);
              window.my_modal_319.showModal();
            }}
          >
            <img
              src={
                sideDetails?.details?.portfolioPixUploadUrl6
                  ? sideDetails?.details?.portfolioPixUploadUrl6
                  : "/van-placeholder.svg"
              }
              className='w-full h-[150px] rounded-[20px] object-contain border-[2px]'
              alt=''
            />
          </div>
        )}
      </div>
      <dialog id='my_modal_319' className='modal py-[0px] px-[0px]'>
        <form method='dialog' className='modal-box w-11/12 max-w-5xl '>
          {/* <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border border-secondary text-secondary'>
                      ✕
                    </button> */}
          <div className='w-full flex justify-center space-x-[10px] items-center'>
            <div className='flex-[1] flex justify-center items-center'>
              <img
                src={portImage}
                // style={{
                //   // width: "200px",
                //   height: "75vh",
                //   objectFit: "cover",
                //   borderRadius: "20px",
                // }}
                className='h-[75vh] object-contain rounded-[20px] border-[2px]'
                alt=''
              />
            </div>
            <div className='flex flex-col space-y-[10px] items-end'>
              {sideDetails?.details?.portfolioPixUploadUrl1 && (
                <div
                  className={`${
                    portImage1 === portImage ? "ring-[3px]" : ""
                  } cursor-pointer hover:ring-[3px] ring-primary duration-200 rounded-[10px] hover:scale-[1.03]`}
                  onClick={() => {
                    setPortImage(sideDetails?.details?.portfolioPixUploadUrl1);
                  }}
                >
                  <img
                    src={portImage1 ? portImage1 : "/van-placeholder.svg"}
                    className='h-[60px] w-[60px] lg:h-[70px] lg:w-[70px] rounded-[10px] object-cover border-[2px]'
                    alt=''
                  />
                </div>
              )}
              {sideDetails?.details?.portfolioPixUploadUrl2 && (
                <div
                  className={`${
                    portImage2 === portImage ? "ring-[3px]" : ""
                  } cursor-pointer hover:ring-[3px] ring-primary duration-200 rounded-[10px] hover:scale-[1.0]`}
                  onClick={() => {
                    setPortImage(sideDetails?.details?.portfolioPixUploadUrl2);
                  }}
                >
                  <img
                    src={portImage2 ? portImage2 : "/van-placeholder.svg"}
                    className='h-[60px] w-[60px] lg:h-[70px] lg:w-[70px] rounded-[10px] object-cover border-[2px]'
                    alt=''
                  />
                </div>
              )}
              {sideDetails?.details?.portfolioPixUploadUrl3 && (
                <div
                  className={`${
                    portImage3 === portImage ? "ring-[3px]" : ""
                  } cursor-pointer hover:ring-[3px] ring-primary duration-200 rounded-[10px] hover:scale-[1.03]`}
                  onClick={() => {
                    setPortImage(sideDetails?.details?.portfolioPixUploadUrl3);
                  }}
                >
                  <img
                    src={portImage3 ? portImage3 : "/van-placeholder.svg"}
                    className='h-[60px] w-[60px] lg:h-[70px] lg:w-[70px] rounded-[10px] object-cover border-[2px]'
                    alt=''
                  />
                </div>
              )}

              {sideDetails?.details?.portfolioPixUploadUrl4 && (
                <div
                  className={`${
                    portImage4 === portImage ? "ring-[3px]" : ""
                  } cursor-pointer hover:ring-[3px] ring-primary duration-200 rounded-[10px] hover:scale-[1.03]`}
                  onClick={() => {
                    setPortImage(sideDetails?.details?.portfolioPixUploadUrl4);
                  }}
                >
                  <img
                    src={portImage4 ? portImage4 : "/van-placeholder.svg"}
                    className='h-[60px] w-[60px] lg:h-[70px] lg:w-[70px] rounded-[10px] object-cover border-[2px]'
                    alt=''
                  />
                </div>
              )}

              {sideDetails?.details?.portfolioPixUploadUrl5 && (
                <div
                  className={`${
                    portImage5 === portImage ? "ring-[3px]" : ""
                  } cursor-pointer hover:ring-[3px] ring-primary duration-200 rounded-[10px] hover:scale-[1.03]`}
                  onClick={() => {
                    setPortImage(sideDetails?.details?.portfolioPixUploadUrl5);
                  }}
                >
                  <img
                    src={portImage5 ? portImage5 : "/van-placeholder.svg"}
                    className='h-[60px] w-[60px] lg:h-[70px] lg:w-[70px] rounded-[10px] object-cover border-[2px]'
                    alt=''
                  />
                </div>
              )}

              {sideDetails?.details?.portfolioPixUploadUrl6 && (
                <div
                  className={`${
                    portImage6 === portImage ? "ring-[3px]" : ""
                  } cursor-pointer hover:ring-[3px] ring-primary duration-200 rounded-[10px] hover:scale-[1.03]`}
                  onClick={() => {
                    setPortImage(sideDetails?.details?.portfolioPixUploadUrl6);
                  }}
                >
                  <img
                    src={portImage6 ? portImage6 : "/van-placeholder.svg"}
                    className='h-[60px] w-[60px] lg:h-[70px] lg:w-[70px] rounded-[10px] object-cover border-[2px]'
                    alt=''
                  />
                </div>
              )}
            </div>
          </div>
        </form>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ImagePortfolio;
