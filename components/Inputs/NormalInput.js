import React from "react";

import { ErrorMessage, useField } from "formik";

const NormalInput = ({ placeholder, classes, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <input
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
        className={`${
          meta.touched && meta.error ? "ring ring-secondary" : ""
        } ${classes} `}
      />
      {meta.touched && meta.error && (
        <div className="text-secondary text-[14px] mt-[-10px] text-right">
          <ErrorMessage name={field.name} />
        </div>
      )}
    </div>
  );
};

export default NormalInput;
