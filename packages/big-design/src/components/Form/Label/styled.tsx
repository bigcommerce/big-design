import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { withMargins } from '../../../helpers';
import { TransientMarginProps } from '../../../helpers/margins/margins';

import { type FormControlLabelProps } from './Label';

export const StyledLabel = styled.label<FormControlLabelProps & TransientMarginProps>`
  color: ${({ theme }) => theme.colors.secondary70};
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  line-height: ${({ theme }) => theme.lineHeight.medium};
  margin: 0 0 ${({ theme }) => theme.spacing.xSmall};

  ${withMargins()};

  cursor: pointer;
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.spacing.xxSmall};
`;

StyledLabel.defaultProps = { theme: defaultTheme };
