import React from 'react'
import { Form, Formik, useField, Field, ErrorMessage } from "formik";
import TextError from "./TextError"

const Checkbox = ({ label, name, options, ...rest }) => {
  return (
    <div>
      <label htmlFor={name} className="font-bold ">
        {label}
      </label>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option, index) => {
            return (
              <React.Fragment key={index}>
                <input
                  {...field}
                  type="checkbox"
                  value={option.value}
                  id={option.value}
                  name={name}
                  checked={field.value.includes(option.value)}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export default Checkbox
