import React from "react";
import { BiUser } from "react-icons/bi";
import { SiMinutemailer } from "react-icons/si";
// import styles from './styles.module.scss';
import { IoKeyOutline } from "react-icons/io5";
import { ErrorMessage, useField } from "formik";

const MyTextArea = ({ label, label2, classes, required, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="label" htmlFor={props.id || props.name}>
        <span className="label-text font-semibold text-[16px]">
          {label}
          {required && <span className="text-secondary">*</span>}
        </span>
      </label>
      {label2 && (
        <p className="text-gray-500 mb-[10px] text-[15px] mt-[-5px]">
          {/* (Do not include your phone number or website.) */}
          {label2}
        </p>
      )}
      <textarea
        {...field}
        {...props}
        className={`${
          meta.touched && meta.error ? "ring ring-secondary" : ""
        } ${classes} textarea w-full textarea-primary  placeholder:text-[16px] text-[15px] mb-[10px]`}
      ></textarea>
      {meta.touched && meta.error && (
        <div className="text-secondary text-[14px] mt-[-10px] text-end">
          {meta.error}
        </div>
      )}
    </>
  );
};

export default MyTextArea;
