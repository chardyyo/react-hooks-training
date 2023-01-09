import React, { SyntheticEvent, ReactNode } from "react";
import useHiding from "../../hooks/useHiding";
import CloseButton from "../Cross";
import styles from "./Dialog.module.scss";

interface DialogProps {
  onClose: (event: SyntheticEvent | Event) => void;
  children: ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ children, onClose }) => {
  const focusedElementRef = useHiding(onClose);

  return (
    <div className={styles.glass}>
      <div ref={focusedElementRef} className={styles.dialog}>
        <button
          type="button"
          className={styles.dialog__closeBtn}
          onClick={onClose}
        >
          <CloseButton side="16" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
