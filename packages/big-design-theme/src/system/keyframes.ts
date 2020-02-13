import { keyframes } from 'styled-components';

export const loading = keyframes`
  from {
    left: -10%;;
  }
  25% {
    width: 50%;
  }
  to {
    left: 100%;
  }
`;

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;
