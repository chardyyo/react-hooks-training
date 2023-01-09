import React from "react";
import useBlur from "./useBlur";

export default () => {
  const toggleRef = React.useRef<HTMLDivElement>(null);

  const [showElement, setShowElement] = React.useState<boolean>(false);
  const handleClose = React.useCallback(() => setShowElement(false), []);
  const onToggle = React.useCallback(
    () => setShowElement((prevState) => !prevState),
    []
  );

  useBlur(toggleRef, handleClose, showElement);

  return {
    toggleRef,
    showElement,
    onToggle,
  };
};
