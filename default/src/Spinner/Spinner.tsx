import styled, { keyframes } from 'styled-components';

import { SvgLoadingIcon } from '../Icons/LoadingIcon';

const rotate = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`;

export const Spinner = styled(SvgLoadingIcon)`
  animation: ${rotate} 1s linear infinite;
  position: absolute;
`;
