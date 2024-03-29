import React from "react";
import { BiUser } from "react-icons/bi";
import { SiMinutemailer } from "react-icons/si";
// import styles from './styles.module.scss';
import { IoKeyOutline } from "react-icons/io5";
import { ErrorMessage, useField } from "formik";

const LoginInput = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      {/* {icon == "user" ? (
        <BiUser />
      ) : icon == "email" ? (
        <SiMinutemailer />
      ) : icon == "password" ? (
        <IoKeyOutline />
      ) : (
        ""
      )} */}
      <input
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
        className={`${
          meta.touched && meta.error ? "ring ring-secondary" : ""
        } input input-primary w-full h-[43px] mb-[20px] `}
      />
      {meta.touched && meta.error && (
        <div className="text-secondary text-[13px] mt-[-20px] text-end">
          <ErrorMessage name={field.name} />
        </div>
      )}
    </div>
  );
};

export default LoginInput;
