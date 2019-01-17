import { size } from 'polished';
import { css } from 'styled-components';

import { IconWrapperProps } from './IconWrapper';

export const IconWrapperStyles = css<IconWrapperProps>`
  align-items: center;
  display: flex;
  justify-content: center;
  ${({ height, width }) => size(height, width)};
`;
