import React from "react";
import { Field, useField } from "formik";
import styles from "./EditorSelect.module.scss";
import FormField from "../FormField";
import useToggle from "../../../hooks/useToggle";
import { GENRES } from "../../../utils/constants";

interface EditorSelectProps {
  label: string;
  name: string;
  placeholder: string;
}

const EditorSelect: React.FC<EditorSelectProps> = ({
  label,
  placeholder,
  name,
}) => {
  const { toggleRef, showElement, onToggle } = useToggle();
  const { error, touched } = useField(name)[1];

  return (
    <FormField label={label} error={error} touched={touched}>
      <div ref={toggleRef} className={styles.dropDown}>
        <button
          className={
            showElement ? styles.dropDown__btn_open : styles.dropDown__btn
          }
          type="button"
          onClick={onToggle}
        >
          {placeholder}
        </button>
        {showElement && (
          <ul className={styles.dropDown__list}>
            {GENRES.map((genre) => (
              <li key={genre} className={styles.dropDown__option}>
                <Field
                  type="checkbox"
                  name={name}
                  value={genre}
                  className={styles.dropDown__checkbox}
                  id={genre}
                />
                <label className={styles.dropDown__label} htmlFor={genre}>
                  {genre}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </FormField>
  );
};

export default EditorSelect;
