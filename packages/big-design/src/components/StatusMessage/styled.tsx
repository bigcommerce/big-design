import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { StatusMessageProps, StatusMessageVariantType } from './StatusMessage';

function svgToCssBackground(svgString: string): string {
  // Minify: remove newlines and excessive spaces
  const cleanedSvg = svgString
    .replace(/\n+/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();

  // Encode special characters
  const encodedSvg = encodeURIComponent(cleanedSvg).replace(/'/g, '%27').replace(/"/g, '%22');

  // Return CSS-compatible background image string
  return `url("data:image/svg+xml,${encodedSvg}")`;
}

const icons = {
  '404': `<svg fill="none" height="120" role="img" width="120" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M45 79V41h20.261L75 50.738V79H45ZM64.127 51.76V43.27H47.269v33.462h25.462V51.76h-8.604Z"
      fill="#fff"
    />
  </svg>`,
  error: `<svg fill="none" height="120" role="img" width="120" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M61.023 50.5h-2.269V62h2.269V50.5Zm-1.022 14.7c-.384 0-.707.126-.97.378-.261.252-.392.57-.392.953 0 .398.13.73.392.994.262.265.584.398.968.398.397 0 .723-.133.979-.398s.383-.596.383-.995c0-.382-.13-.7-.392-.952a1.342 1.342 0 0 0-.968-.378ZM59.984 41c2.631 0 5.096.499 7.394 1.496a19.347 19.347 0 0 1 6.038 4.085 19.333 19.333 0 0 1 4.088 6.04C78.5 54.92 79 57.386 79 60.02c0 2.623-.499 5.087-1.496 7.394-.997 2.307-2.36 4.316-4.086 6.026-1.726 1.71-3.739 3.064-6.039 4.063C65.08 78.5 62.613 79 59.98 79c-2.623 0-5.087-.499-7.394-1.496-2.307-.997-4.316-2.35-6.026-4.06-1.71-1.71-3.064-3.72-4.063-6.032C41.5 65.101 41 62.635 41 60.016c0-2.631.499-5.096 1.496-7.394s2.35-4.308 4.06-6.029c1.71-1.72 3.72-3.083 6.032-4.087C54.899 41.502 57.364 41 59.983 41Zm-.009 2.27c-4.64 0-8.584 1.629-11.833 4.887-3.248 3.26-4.873 7.215-4.873 11.868 0 4.64 1.622 8.584 4.864 11.833C51.375 75.106 55.331 76.73 60 76.73c4.636 0 8.584-1.622 11.843-4.864C75.1 68.625 76.73 64.669 76.73 60c0-4.636-1.63-8.584-4.888-11.843-3.26-3.258-7.215-4.887-11.868-4.887Z"
      fill="#fff"
    />
  </svg>`,
  info: `<svg fill="none" height="120" role="img" width="120" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M58.977 69.5h2.269V58h-2.269v11.5Zm1.022-14.7c.384 0 .707-.126.97-.378.261-.252.392-.57.392-.953 0-.398-.13-.73-.392-.995a1.307 1.307 0 0 0-.968-.397c-.397 0-.723.133-.979.398-.256.264-.383.596-.383.994 0 .383.13.7.392.953.262.252.584.378.968.378Zm.017 24.2c-2.631 0-5.096-.499-7.394-1.496a19.347 19.347 0 0 1-6.038-4.086 19.333 19.333 0 0 1-4.088-6.039C41.5 65.08 41 62.613 41 59.98c0-2.623.499-5.087 1.496-7.394.997-2.307 2.36-4.316 4.085-6.026 1.727-1.71 3.74-3.064 6.04-4.063C54.92 41.5 57.386 41 60.02 41c2.623 0 5.087.499 7.394 1.496 2.307.997 4.316 2.35 6.026 4.06 1.71 1.71 3.064 3.72 4.063 6.032C78.5 54.899 79 57.364 79 59.983c0 2.632-.499 5.097-1.496 7.395-.997 2.298-2.35 4.308-4.06 6.028-1.71 1.721-3.72 3.084-6.032 4.088C65.101 78.498 62.635 79 60.016 79Zm.009-2.27c4.64 0 8.584-1.629 11.833-4.888 3.248-3.258 4.873-7.214 4.873-11.867 0-4.64-1.622-8.584-4.864-11.833C68.625 44.895 64.669 43.27 60 43.27c-4.636 0-8.584 1.622-11.843 4.864C44.9 51.375 43.27 55.331 43.27 60c0 4.636 1.629 8.584 4.887 11.843 3.26 3.258 7.215 4.888 11.868 4.888Z"
      fill="#fff"
    />
  </svg>`,
  search: `<svg fill="none" height="120" role="img" width="120" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M75.53 77.192 62.555 64.215c-.995.88-2.155 1.56-3.48 2.036a12.076 12.076 0 0 1-4.116.714c-3.396 0-6.27-1.175-8.622-3.526-2.352-2.35-3.528-5.2-3.528-8.55 0-3.349 1.175-6.2 3.525-8.553 2.35-2.352 5.205-3.528 8.561-3.528 3.357 0 6.212 1.175 8.563 3.526 2.352 2.351 3.527 5.202 3.527 8.553 0 1.4-.24 2.765-.719 4.092a11.743 11.743 0 0 1-2.08 3.605l13.007 12.927-1.661 1.681ZM54.928 64.696c2.732 0 5.046-.952 6.943-2.856 1.897-1.904 2.845-4.222 2.845-6.954 0-2.732-.948-5.05-2.845-6.953-1.897-1.904-4.211-2.856-6.943-2.856-2.749 0-5.078.952-6.987 2.856-1.909 1.903-2.863 4.221-2.863 6.953s.954 5.05 2.863 6.954c1.91 1.904 4.238 2.856 6.987 2.856Z"
      fill="#fff"
    />
  </svg>`,
  'server-error': `<svg fill="none" height="120" role="img" width="120" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50.518 48.212c-.594 0-1.098.208-1.51.624-.413.416-.62.92-.62 1.515 0 .594.209 1.098.625 1.51.415.413.92.62 1.515.62.594 0 1.098-.208 1.51-.624.413-.416.62-.921.62-1.515 0-.595-.208-1.098-.624-1.511a2.071 2.071 0 0 0-1.516-.62Zm0 19.276c-.594 0-1.098.208-1.51.624-.413.416-.62.922-.62 1.516s.209 1.098.625 1.51c.415.413.92.62 1.515.62.594 0 1.098-.208 1.51-.624.413-.416.62-.921.62-1.516 0-.594-.208-1.097-.624-1.51a2.07 2.07 0 0 0-1.516-.62ZM43 58.092V42.631h34v15.461H43ZM45.27 44.9v10.923h29.46V44.9H45.27ZM43 77.37V61.876h34v15.492H43Zm2.27-13.224V75.1h29.46V64.146H45.27Z"
      fill="#fff"
    />
  </svg>`,
  success: `
  <svg fill="none" height="120" role="img" width="120" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50.338 71.125 39.792 60.598l1.631-1.63 8.915 8.895.693-.692 1.63 1.63-2.323 2.324Zm9.25 0L49.062 60.598l1.63-1.63 8.896 8.895 18.989-18.969 1.63 1.612-20.619 20.619Zm-.692-8.558-1.63-1.63 12.06-12.062 1.632 1.63-12.062 12.062Z"
      fill="#fff"
    />
  </svg>`,
  unauthorized: `<svg fill="none" height="120" role="img" width="120" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M57.815 65.511h4.37l-1.193-6.903a3.443 3.443 0 0 0 1.533-1.172c.394-.532.59-1.128.59-1.79 0-.864-.303-1.6-.91-2.206A3.003 3.003 0 0 0 60 52.53c-.864 0-1.6.304-2.206.91a3.004 3.004 0 0 0-.91 2.206c0 .662.197 1.258.591 1.79.394.532.904.923 1.533 1.172l-1.193 6.903ZM60 78.942c-4.346-1.192-7.933-3.779-10.76-7.76-2.827-3.98-4.24-8.389-4.24-13.224V46.672l15-5.615 15 5.615v11.285c0 4.835-1.414 9.244-4.24 13.225-2.827 3.98-6.414 6.567-10.76 7.76Zm0-2.37c3.73-1.215 6.785-3.552 9.163-7.01 2.379-3.46 3.568-7.328 3.568-11.604v-9.704L60 43.469l-12.73 4.785v9.704c0 4.276 1.188 8.144 3.566 11.603 2.379 3.46 5.433 5.796 9.164 7.012Z"
      fill="#fff"
    />
  </svg>`,
  warning: `<svg fill="none" height="120" role="img" width="120" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M58.865 62.077h2.27V51.019h-2.27v11.058ZM60 67.038c.342 0 .636-.123.882-.368.245-.246.368-.54.368-.882 0-.342-.123-.636-.368-.881a1.203 1.203 0 0 0-.882-.369c-.342 0-.636.123-.882.369-.245.245-.368.539-.368.881 0 .343.123.636.368.882.246.245.54.368.882.368Zm0 13.058L39.904 60 60 39.904 80.096 60 60 80.096Zm0-3.223L76.873 60 60 43.127 43.127 60 60 76.873Z"
      fill="#fff"
    />
  </svg>`,
};

const patterns = {
  diamond: `<svg xmlns="http://www.w3.org/2000/svg" width="122" height="129" fill="none">
  <path stroke="url(#a)" d="M1 90.868 61 1l60 89.868" opacity=".5" />
  <path stroke="url(#b)" d="M121 38.132 61 128 1 38.132" opacity=".5" />
  <defs>
    <radialGradient id="a" cx="0" cy="0" r="1" gradientTransform="matrix(0 292.218 -240.194 0 61 -19.095)" gradientUnits="userSpaceOnUse">
      <stop stop-color="#fff" />
      <stop offset="1" stop-color="#fff" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="b" cx="0" cy="0" r="1" gradientTransform="matrix(0 -292.218 240.194 0 61 148.095)" gradientUnits="userSpaceOnUse">
      <stop stop-color="#fff" />
      <stop offset="1" stop-color="#fff" stop-opacity="0" />
    </radialGradient>
  </defs>
</svg>`,
  cross: `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="none">
  <g clip-path="url(#a)">
    <path stroke="url(#b)" d="M30.727 0 60 29.273 89.272 0" opacity=".5" />
    <path stroke="url(#c)" d="M120 30.727 90.727 60 120 89.273" opacity=".5" />
    <path stroke="url(#d)" d="M0 30.727 29.273 60 0 89.273" opacity=".5" />
    <path stroke="url(#e)" d="M89.272 120 60 90.727 30.727 120" opacity=".5" />
  </g>
  <defs>
    <radialGradient id="b" cx="0" cy="0" r="1" gradientTransform="rotate(-87.474 61.379 -.174) scale(104.574 74.3313)" gradientUnits="userSpaceOnUse">
      <stop stop-color="#fff" />
      <stop offset="1" stop-color="#fff" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="c" cx="0" cy="0" r="1" gradientTransform="rotate(2.409 -1361.019 1419.477) scale(118.789 84.4351)" gradientUnits="userSpaceOnUse">
      <stop stop-color="#fff" />
      <stop offset="1" stop-color="#fff" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="d" cx="0" cy="0" r="1" gradientTransform="matrix(-117.91637 -11.90682 8.46332 -83.81448 58.463 58.464)" gradientUnits="userSpaceOnUse">
      <stop stop-color="#fff" />
      <stop offset="1" stop-color="#fff" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="e" cx="0" cy="0" r="1" gradientTransform="rotate(69.856 -14.194 71.776) scale(164.114 116.652)" gradientUnits="userSpaceOnUse">
      <stop stop-color="#fff" />
      <stop offset="1" stop-color="#fff" stop-opacity="0" />
    </radialGradient>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h120v120H0z" />
    </clipPath>
  </defs>
</svg>`,
};

const gradients = {
  info: `radial-gradient(circle at center top, #72d8db 0%, #d9f9fa 100%);`,
  warning: `radial-gradient(circle at center top, #efc879 0%, #fefbf2 100%);`,
  error: `radial-gradient(circle at center top, #ebb2ca 0%, #eee8fa 100%);`,
  success: `radial-gradient(circle at center top, #78e4a3 0%, #f3fdec 100%);`,
};

const combos = {
  '404': {
    icon: icons['404'],
    pattern: patterns.diamond,
    gradient: gradients.info,
  },
  error: {
    icon: icons.error,
    pattern: patterns.cross,
    gradient: gradients.error,
  },
  info: {
    icon: icons.info,
    pattern: patterns.diamond,
    gradient: gradients.info,
  },
  search: {
    icon: icons.search,
    pattern: patterns.diamond,
    gradient: gradients.info,
  },
  'server-error': {
    icon: icons['server-error'],
    pattern: patterns.cross,
    gradient: gradients.error,
  },
  success: {
    icon: icons.success,
    pattern: patterns.diamond,
    gradient: gradients.success,
  },
  unauthorized: {
    icon: icons.unauthorized,
    pattern: patterns.cross,
    gradient: gradients.warning,
  },
  warning: {
    icon: icons.warning,
    pattern: patterns.diamond,
    gradient: gradients.warning,
  },
};

const generateIllustration = (variant: StatusMessageVariantType) => {
  const { icon, pattern, gradient } = combos[variant];
  const iconDataUrl = svgToCssBackground(icon);
  const patternDataUrl = svgToCssBackground(pattern);

  return `${iconDataUrl}, ${patternDataUrl}, ${gradient}`;
};

export const StyledStatusMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

StyledStatusMessage.defaultProps = {
  theme: defaultTheme,
};

export const StyledStatusIllustration = styled.figure<Omit<StatusMessageProps, 'message'>>`
  width: ${({ theme }) => theme.helpers.remCalc(120)};
  height: ${({ theme }) => theme.helpers.remCalc(120)};
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  margin: 0;
  background-image: ${({ variant = 'info' }) => generateIllustration(variant)};
  content: '';

  ${({ theme, size }) =>
    size === 'page' &&
    css`
      transform: scale(1.5);
      transform-origin: bottom;
      margin-block-start: ${theme.helpers.remCalc(60)};
    `}
`;

StyledStatusIllustration.defaultProps = {
  theme: defaultTheme,
  variant: 'info',
  size: 'panel',
};
