import React from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import Select from "./Select";
import Radio from "./Radio";
import Checkbox from "./Checkbox";

const FormikControl = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "radio": return <Radio {...rest} />;
    case "checkbox": return <Checkbox {...rest}/>
    case "date":
    default:
      return null;
  }
};

export default FormikControl;
