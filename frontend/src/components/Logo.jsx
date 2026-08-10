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
      <defs>
        {/* 3D Leather Gradient */}
        <linearGradient id="bagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5d5b5" />
          <stop offset="50%" stopColor="#d4a574" />
          <stop offset="100%" stopColor="#a67c52" />
        </linearGradient>
        
        {/* Metallic Hardware Gradient (Gold) */}
        <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffe066" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#997a00" />
        </linearGradient>

        {/* Handle Gradient */}
        <linearGradient id="handleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c29b75" />
          <stop offset="100%" stopColor="#8b6f47" />
        </linearGradient>

        {/* Drop Shadow for Depth */}
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Subtle Background Accent */}
      <circle cx="50" cy="50" r="48" fill="#ffffff" opacity="0.1" />

      <g filter="url(#shadow)">
        {/* Bag Body */}
        <path
          d="M 28 35 Q 22 40 22 55 Q 22 70 32 80 Q 40 85 50 85 Q 60 85 68 80 Q 78 70 78 55 Q 78 40 72 35 Z"
          fill="url(#bagGradient)"
          stroke="#6b4c2a"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Bag Stitching Detail */}
        <path
          d="M 25 45 Q 25 60 32 72 Q 40 78 50 78 Q 60 78 68 72 Q 75 60 75 45"
          fill="none"
          stroke="#6b4c2a"
          strokeWidth="0.8"
          strokeDasharray="2 2"
          opacity="0.5"
        />

        {/* Bag Handles */}
        <path
          d="M 32 38 Q 32 18 50 12 Q 68 18 68 38"
          fill="none"
          stroke="url(#handleGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Handle Stitching */}
        <path
          d="M 32 38 Q 32 18 50 12 Q 68 18 68 38"
          fill="none"
          stroke="#4a3520"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeDasharray="2 2"
        />

        {/* Zipper Tape */}
        <path
          d="M 46 35 L 46 72 L 54 72 L 54 35 Z"
          fill="#8b6f47"
          opacity="0.4"
        />
        
        {/* Zipper Teeth */}
        <path
          d="M 48 36 L 48 70 M 52 36 L 52 70"
          stroke="#6b4c2a"
          strokeWidth="1"
          strokeDasharray="1 2"
          opacity="0.8"
        />

        {/* Zipper Pull (Gold) */}
        <rect x="46" y="67" width="8" height="14" rx="2" fill="url(#metalGradient)" stroke="#8b6500" strokeWidth="0.5" />
        <circle cx="50" cy="72" r="2" fill="#fff" opacity="0.5" />
        <circle cx="50" cy="76" r="1" fill="#6b4c2a" />

        {/* Top Clasp */}
        <rect x="44" y="32" width="12" height="6" rx="2" fill="url(#metalGradient)" stroke="#8b6500" strokeWidth="0.5" />
        <circle cx="50" cy="35" r="1" fill="#fff" opacity="0.8" />

        {/* Shine/Volume Effects */}
        <ellipse cx="35" cy="45" rx="6" ry="15" fill="white" opacity="0.2" transform="rotate(-20 35 45)" />
        <ellipse cx="65" cy="65" rx="5" ry="10" fill="black" opacity="0.1" transform="rotate(-20 65 65)" />
      </g>
    </svg>
  );
};

export default Logo;