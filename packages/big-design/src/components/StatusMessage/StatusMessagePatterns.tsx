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
    <StyledStatusMessagePatterns>
      {variant === 'error' ||
      variant === 'server-error' ||
      variant === 'warning' ||
      variant === 'unauthorized' ? (
        <svg fill="none" height="120" role="img" width="120" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#a)">
            <path d="M30.727 0 60 29.273 89.272 0" opacity=".5" stroke="url(#b)" />
            <path d="M120 30.727 90.727 60 120 89.273" opacity=".5" stroke="url(#c)" />
            <path d="M0 30.727 29.273 60 0 89.273" opacity=".5" stroke="url(#d)" />
            <path d="M89.272 120 60 90.727 30.727 120" opacity=".5" stroke="url(#e)" />
          </g>
          <defs>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="rotate(-87.474 61.379 -.174) scale(104.574 74.3313)"
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
              gradientTransform="rotate(2.409 -1361.019 1419.477) scale(118.789 84.4351)"
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
              gradientTransform="matrix(-117.91637 -11.90682 8.46332 -83.81448 58.463 58.464)"
              gradientUnits="userSpaceOnUse"
              id="d"
              r="1"
            >
              <stop stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="rotate(69.856 -14.194 71.776) scale(164.114 116.652)"
              gradientUnits="userSpaceOnUse"
              id="e"
              r="1"
            >
              <stop stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <clipPath id="a">
              <path d="M0 0h120v120H0z" fill="#fff" />
            </clipPath>
          </defs>
        </svg>
      ) : (
        <svg fill="none" height="129" role="img" width="122" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 90.868 61 1l60 89.868" opacity=".5" stroke="url(#a)" />
          <path d="M121 38.132 61 128 1 38.132" opacity=".5" stroke="url(#b)" />
          <defs>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="matrix(0 292.218 -240.194 0 61 -19.095)"
              gradientUnits="userSpaceOnUse"
              id="a"
              r="1"
            >
              <stop stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="matrix(0 -292.218 240.194 0 61 148.095)"
              gradientUnits="userSpaceOnUse"
              id="b"
              r="1"
            >
              <stop stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      )}
    </StyledStatusMessagePatterns>
  );
};
