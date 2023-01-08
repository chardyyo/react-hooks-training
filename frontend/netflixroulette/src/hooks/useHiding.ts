import React from "react";
import { OnClose } from "./types";
import useBlur from "./useBlur";

export default (onClose: OnClose) => {
  const ref = React.useRef<HTMLDivElement>(null);

  return useBlur(ref, onClose, true);
};
