import React from "react";
import { BiUser } from "react-icons/bi";
import { SiMinutemailer } from "react-icons/si";
// import styles from './styles.module.scss';
import { IoKeyOutline } from "react-icons/io5";
import { ErrorMessage, useField } from "formik";

const MyTextInput = ({ label, required, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="label" htmlFor={props.id || props.name}>
        <span className="label-text font-semibold text-[16px]">
          {label}
          {required && <span className="text-secondary">*</span>}
        </span>
      </label>
      <input
        {...field}
        {...props}
        className={`${
          meta.touched && meta.error ? "ring ring-secondary" : ""
        } input input-primary w-full h-[43px] mb-[10px]`}
      />
      {meta.touched && meta.error && (
        <div className="text-secondary text-[14px] mt-[-10px] text-end">
          {meta.error}
        </div>
      )}
    </>
  );
};

export default MyTextInput;
