import React from "react";
import { noop } from "../utils/constants";
import { OnClose, ReactDevRef } from "./types";

export default (ref: ReactDevRef, onClose: OnClose, isShown: boolean) => {
  React.useEffect(() => {
    const { current } = ref;

    if (!current || !isShown) {
      return noop;
    }

    const handleBlur = (event: FocusEvent) => {
      const { target } = event;
      const currentTarget = event?.currentTarget as Element;
      const relatedTarget = event?.relatedTarget as Element | null;

      const clickedOutside = document.activeElement === target;

      if (
        !ref?.current ||
        clickedOutside ||
        currentTarget?.contains(relatedTarget)
      ) {
        return;
      }

      onClose(event);
    };

    // clean up
    return () => current.removeEventListener("blur", handleBlur);
  }, [ref, onClose, isShown]);

  return ref;
};
