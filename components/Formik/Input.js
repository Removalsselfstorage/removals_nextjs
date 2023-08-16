import React from "react";
import { Form, Formik, useField, Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const Input = ({ label, name, required, ...rest }) => {
  return (
    <div>
      {/* <label htmlFor={name} className="font-bold ">{label}</label> */}
      <label className="label" htmlFor={name}>
        <span className="label-text font-semibold text-[16px]">
          {label}
          {required && <span className="text-secondary">*</span>}
        </span>
      </label>
      <Field id={name} name={name} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Input;
