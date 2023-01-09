import React from "react";

interface CloseButtonProps {
  side: string;
}

const CloseButton: React.FC<CloseButtonProps> = ({ side }) => (
  <svg
    width={side}
    height={side}
    viewBox="0 0 23 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.47099 1.9902L21.529 22.0482"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M21.529 1.9902L1.47103 22.0482"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default CloseButton;
