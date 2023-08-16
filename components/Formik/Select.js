import React from "react";
import { Form, Formik, useField, Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const Select = ({ label, name, options, ...rest }) => {
  return (
    <div>
      <label htmlFor={name} className="font-bold ">
        {label}
      </label>
      <Field as="select" id={name} name={name} {...rest}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Select;
