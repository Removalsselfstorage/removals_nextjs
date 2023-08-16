import React from "react";
import { Form, Formik, useField, Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const TextArea = ({ label, label2, name, required, ...rest }) => {
  return (
    <div>
      <label className="label" htmlFor={name}>
        <span className="label-text font-semibold text-[16px]">
          {label}
          {required && <span className="text-secondary">*</span>}
        </span>
      </label>
      {label2 && <p className="text-gray-500 mb-[10px] text-[15px] mt-[-5px]">
        {/* (Do not include your phone number or website.) */}
        {label2}
      </p>}
      <Field as="textarea" id={name} name={name}  {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default TextArea;
