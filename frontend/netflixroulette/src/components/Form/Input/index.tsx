import React from "react";
import { useField } from "formik";
import FormField from "../FormField";

interface InputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
}

const InputForm: React.FC<InputProps> = ({ label, ...props }) => {
  const [{ value, ...field }, { touched, error }] = useField(props);

  return (
    <FormField label={label} error={error} touched={touched}>
      <input value={value ?? ""} {...field} {...props} />
    </FormField>
  );
};

export default InputForm;
