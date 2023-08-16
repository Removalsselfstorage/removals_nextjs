import React from "react";

import { ErrorMessage, useField } from "formik";

const FileInput = ({ classes, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <input
        type={field.type}
        name={field.name}
        // placeholder={placeholder}
        {...field}
        {...props}
        accept="image/png, image/gif, image/jpeg"
        className={`${
          meta.touched && meta.error ? "ring ring-secondary" : ""
        } file-input file-input-bordered file-input-secondary w-full max-w-xs mb-[10px]`}
      />
      {meta.touched && meta.error && (
        <div className="text-secondary text-[14px] mt-[-10px]">
          <ErrorMessage name={field.name} />
        </div>
      )}
    </div>
  );
};

export default FileInput;
