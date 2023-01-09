import React from "react";
import { useField } from "formik";
import FormField from "../FormField";

interface EditorTextareaProps {
  cols: number;
  rows: number;
  name: string;
  label: string;
  placeholder: string;
  className: string;
}

const EditorTextarea: React.FC<EditorTextareaProps> = ({ label, ...props }) => {
  const [field, { touched, error }] = useField(props);

  return (
    <FormField label={label} error={error} touched={touched}>
      <textarea {...field} {...props} />
    </FormField>
  );
};

export default EditorTextarea;
