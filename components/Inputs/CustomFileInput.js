import { getAllMoverDetails } from "@/store/moverSlice";
import React, { useRef } from "react";
import { useSelector } from "react-redux";

const CustomFileInput = ({
  activateError,
  previewUrl,
  setPreviewUrl,
  setImageUpload,
  imageUpload,
  setFileUploadError,
  fileUploadError,
  data,
  //   handleButtonClick,
  //   handleFileInputChange,
  //   fileInputRef,
}) => {
  const fileInputRef = useRef(null);
  const details = useSelector(getAllMoverDetails);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    // if (file && imageUpload.size <= 5242880) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     setPreviewUrl(reader.result);
    //   };
    //   reader.readAsDataURL(file);
    // } else {
    //     setFileUploadError("File size not accepted");
    // }
    if (file) {
      //   if (file.size <= 1024 * 1024) {
      if (file.size <= 1024 * 1024 * 2) {
        // 1MB as an example size limit
        setImageUpload(file);
        console.log(file);
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
        setFileUploadError("");
      } else {
        setImageUpload(null);
        setFileUploadError("Image size exceeds the limit (3MB)");
      }
    }

    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     setPreviewUrl(reader.result);
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  // console.log(imageUpload?.name);

  return (
    <div className="w-full">
      <div
        className={`${
          activateError && (!previewUrl || fileUploadError)
            ? "flex ring ring-secondary rounded-[10px] w-full"
            : "flex rounded-[10px] w-full"
        } "flex items-center  border border-primary w-full"`}
      >
        <button
          onClick={handleButtonClick}
          className="btn btn-primary border border-primary rounded-tl-[8px] rounded-bl-[8px] rounded-tr-[0px] rounded-br-[0px] h-[43px]"
        >
          {/* Choose File */}
          {previewUrl && !fileUploadError ? "Update File" : "Choose File"}
        </button>
        <p className="truncate ... px-[10px] text-[14px] w-[255px]">
          {previewUrl && !fileUploadError
            ? // ? imageUpload?.name || details.firebaseMoverDetails.profilePictureName
              imageUpload?.name ||
              data?.personalDetails.profilePicture.name ||
              data?.companyDetails.companyProfilePix.name ||
              data?.companyDocs.regCertificate.name ||
              data?.companyDocs.vehInsurance.name ||
              data?.companyDocs.pubInsurance.name ||
              data?.companyDocs.tranInsurance.name ||
              data?.companyDocs.drivingLicense.name
            : "No file selected"}
        </p>
      </div>
      <input
        type="file"
        className={` file-input file-input-bordered file-input-primary  hidden`}
        // accept="image/png, image/gif, image/jpeg"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileInputChange}
        ref={fileInputRef}
      />
    </div>
  );
};

export default CustomFileInput;
