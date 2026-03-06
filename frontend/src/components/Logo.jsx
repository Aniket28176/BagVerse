import React from 'react';

const Logo = ({ size = 40, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="50" cy="50" r="48" fill="#1a1a1a" opacity="0.05" />

      {/* Main bag shape */}
      <g>
        {/* Bag body */}
        <path
          d="M 30 35 Q 25 40 25 50 Q 25 65 35 75 L 65 75 Q 75 65 75 50 Q 75 40 70 35"
          fill="#d4a574"
          stroke="#1a1a1a"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Bag handles */}
        <path
          d="M 35 35 Q 35 20 50 15 Q 65 20 65 35"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Bag zipper */}
        <line x1="50" y1="35" x2="50" y2="70" stroke="#1a1a1a" strokeWidth="1.5" />

        {/* Zipper detail */}
        <circle cx="50" cy="35" r="1.5" fill="#1a1a1a" />

        {/* Decorative line (brand accent) */}
        <line x1="35" y1="50" x2="65" y2="50" stroke="#8b6f47" strokeWidth="1.5" opacity="0.7" />
      </g>

      {/* Highlight/shine effect */}
      <ellipse cx="42" cy="45" rx="8" ry="12" fill="white" opacity="0.2" />
    </svg>
  );
};

export default Logo;
