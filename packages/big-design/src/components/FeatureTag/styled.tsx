import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { ellipsis } from 'polished';
import styled from 'styled-components';

import { withMargins } from '../../helpers';

export const StyledFeatureTag = styled.span`
  align-items: center;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.secondary20};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  display: inline-flex;
  color: ${({ theme }) => theme.colors.secondary60};
  flex-wrap: nowrap;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  gap: ${({ theme }) => theme.spacing.xxSmall};
  justify-content: center;
  line-height: ${({ theme }) => theme.lineHeight.small};
  max-width: 100%;
  padding-block: ${({ theme }) => theme.helpers.remCalc(2)};
  padding-inline: ${({ theme }) => theme.spacing.xSmall};
  user-select: none;
  width: fit-content;

  && {
    ${withMargins()};
  }

  & > svg {
    height: ${({ theme }) => theme.spacing.medium};
    flex-shrink: 0;
    width: ${({ theme }) => theme.spacing.medium};
  }
`;
StyledFeatureTag.defaultProps = { theme: defaultTheme };
export const StyledFeatureTagLabel = styled.span`
  ${ellipsis()}
  width: 100%;
`;
