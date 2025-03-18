import React from 'react';

import { StyledStatusMessagePatterns } from './styled';

export interface StatusMessagePatternProps {
  variant?:
    | '404'
    | 'info'
    | 'error'
    | 'search'
    | 'server-error'
    | 'success'
    | 'unauthorized'
    | 'warning';
}

export const StatusMessagePatterns: React.FC<StatusMessagePatternProps> = ({
  variant = 'info',
}) => {
  return (
    <StyledStatusMessagePatterns variant={variant}>
      <svg fill="none" height="120" width="240" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#a)">
          <path d="M0 85.868 60-4l60 89.868" opacity=".5" stroke="url(#b)" />
          <path d="M120 33.132 60 123 0 33.132" opacity=".5" stroke="url(#c)" />
          <g clipPath="url(#d)">
            <path d="M150.727 0 180 29.273 209.272 0" opacity=".5" stroke="url(#e)" />
            <path d="M240 30.727 210.727 60 240 89.273" opacity=".5" stroke="url(#f)" />
            <path d="M120 30.727 149.272 60 120 89.273" opacity=".5" stroke="url(#g)" />
            <path d="M209.272 120 180 90.727 150.727 120" opacity=".5" stroke="url(#h)" />
          </g>
        </g>
        <defs>
          <radialGradient
            cx="0"
            cy="0"
            gradientTransform="matrix(0 292.218 -240.194 0 60 -24.095)"
            gradientUnits="userSpaceOnUse"
            id="b"
            r="1"
          >
            <stop stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            cx="0"
            cy="0"
            gradientTransform="matrix(0 -292.218 240.194 0 60 143.095)"
            gradientUnits="userSpaceOnUse"
            id="c"
            r="1"
          >
            <stop stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            cx="0"
            cy="0"
            gradientTransform="rotate(-87.474 121.379 -62.88) scale(104.574 74.3313)"
            gradientUnits="userSpaceOnUse"
            id="e"
            r="1"
          >
            <stop stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            cx="0"
            cy="0"
            gradientTransform="rotate(2.409 -1301.019 4273.039) scale(118.789 84.4351)"
            gradientUnits="userSpaceOnUse"
            id="f"
            r="1"
          >
            <stop stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            cx="0"
            cy="0"
            gradientTransform="matrix(-117.91637 -11.90682 8.46332 -83.81448 178.463 58.464)"
            gradientUnits="userSpaceOnUse"
            id="g"
            r="1"
          >
            <stop stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            cx="0"
            cy="0"
            gradientTransform="rotate(69.856 45.806 157.694) scale(164.114 116.652)"
            gradientUnits="userSpaceOnUse"
            id="h"
            r="1"
          >
            <stop stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <clipPath id="a">
            <path d="M0 0h240v120H0z" fill="#fff" />
          </clipPath>
          <clipPath id="d">
            <path d="M120 0h120v120H120z" fill="#fff" />
          </clipPath>
        </defs>
      </svg>
    </StyledStatusMessagePatterns>
  );
};
