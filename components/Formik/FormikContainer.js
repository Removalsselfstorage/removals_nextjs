import React from "react";
import * as Yup from "yup";
import { Form, Formik, useField, Field, ErrorMessage } from "formik";
import FormikControl from "./FormikControl";

const FormikContainer = () => {
  const dropdownOptions = [
    { key: "Select an option", value: "" },
    { key: "Option 1", value: "option 1" },
    { key: "Option 2", value: "option 2" },
    { key: "Option 3", value: "option 3" },
  ];
  const radioOptions = [
    { key: "Option 1", value: "roption 1" },
    { key: "Option 2", value: "roption 2" },
    { key: "Option 3", value: "roption 3" },
  ]
  const checkboxOptions = [
    { key: "Option 1", value: "chkoption 1" },
    { key: "Option 2", value: "chkoption 2" },
    { key: "Option 3", value: "chkoption 3" },
  ]
  const initialValues = {
    email: "",
    description: "",
    selectOption: "",
    radioOption: '',
    checkboxOption: []
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Email required"),
    description: Yup.string().required("Description required"),
    selectOption: Yup.string().required("Option required"),
    radioOption: Yup.string().required("Radio option required"),
    checkboxOption: Yup.array().required("Checkbox option required"),
  });
  const onSubmit = (values) => console.log("Form data", values);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <div className="mb-[10px]">
            <FormikControl
              control="input"
              type="email"
              label="Email"
              name="email"
              placeholder="Email address"
              className="input input-primary w-full h-[43px] mb-[5px] mt-[10px]"
            />
          </div>
          <div className="mb-[10px]">
            <FormikControl
              control="textarea"
              type="email"
              label="Description"
              name="description"
              placeholder="Decribe details"
              className="textarea w-full textarea-primary min-h-[150px] max-h-[200px] placeholder:text-[16px]  mb-[5px] mt-[10px]"
            />
          </div>
          <div className="mb-[10px]">
            <FormikControl
              control="select"
              label="Select a topic"
              name="selectOption"
              options={dropdownOptions}
              // placeholder="Option sel"
              className="select w-full select-primary mb-[5px] mt-[10px]"
            />
          </div>
          <div className="mb-[10px]">
            <FormikControl
              control="radio"
              label="Radio topic"
              name="radioOption"
              options={radioOptions}
              // placeholder="Option sel"
              className="radio radio-primary mb-[5px] mt-[10px]"
            />
          </div>
          <div className="mb-[10px]">
            <FormikControl
              control="checkbox"
              label="Checkbox topic"
              name="checkboxOption"
              options={checkboxOptions}
              // placeholder="Option sel"
              className="radio radio-primary mb-[5px] mt-[10px]"
            />
          </div>
          <button type="submit" className="btn btn-secondary">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikContainer;
