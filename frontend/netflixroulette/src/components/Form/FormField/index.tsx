import React, { ReactNode } from "react";
import styles from "./FormField.module.scss";

interface FormFieldProps {
  label: string;
  children: ReactNode;
  touched?: boolean;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  touched,
  error,
}) => (
  <div className={styles.field}>
    <label className={styles.field__label}>{label}</label>
    {children}
    {touched && error && <span className={styles.field__warn}>{error}</span>}
  </div>
);

export default FormField;
