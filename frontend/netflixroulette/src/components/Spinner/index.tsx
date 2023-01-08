import React from "react";

interface SpinnerProps {
  fullscreen?: boolean;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ fullscreen, className }) => {
  return (
    <React.Fragment>
      <>this is spinner</>
    </React.Fragment>
  );
};

export default Spinner;
