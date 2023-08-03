import React from "react";
import { BiUser } from "react-icons/bi";
import { SiMinutemailer } from "react-icons/si";
// import styles from './styles.module.scss';
import { IoKeyOutline } from "react-icons/io5";
import { ErrorMessage, useField } from "formik";

const LoginInput = ({ placeholder, password, ...props }) => {
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
        } input input-primary w-full h-[43px] mb-[20px] ${
          password ? "pr-[35px]" : ""
        }`}
      />
      {meta.touched && meta.error && (
        <div className="text-secondary text-[14px] mt-[-10px]">
          <ErrorMessage name={field.name} />
        </div>
      )}
    </div>
  );
};

export default LoginInput;
