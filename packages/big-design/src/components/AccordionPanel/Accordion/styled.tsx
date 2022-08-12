import { theme as defaultTheme, remCalc } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { withTransition } from '../../../mixins/transitions';
import { Box } from '../../Box';
import { StyleableButton } from '../../Button/private';

interface StyledAccordionButtonProps {
  isExpanded: boolean;
}

interface StyledAccordionContentProps {
  iconLeft: React.ReactNode;
}

export const StyledAccordionButton = styled(StyleableButton)<StyledAccordionButtonProps>`
  border-top: ${({ theme }) => theme.border.box};
  border-radius: 0;
  padding: ${({ theme }) => theme.spacing.xLarge};
  text-align: left;
  width: 100%;
  span {
    width: 100%;
    color: ${({ theme }) => theme.colors.secondary70};
    grid-template-columns: ${({ iconLeft, theme }) =>
      iconLeft
        ? `${theme.spacing.xLarge} 1fr ${theme.spacing.medium}`
        : `1fr ${theme.spacing.medium}`};
  }

  ${({ isExpanded }) =>
    isExpanded &&
    css`
      border-bottom: ${({ theme }) => theme.border.box};
    `}

  &:focus {
    z-index: ${({ theme }) => theme.zIndex.fixed};
  }

  .collapse-icon {
    ${withTransition(['transform'])}

    ${({ isExpanded }) =>
      isExpanded &&
      css`
        transform: rotate(-180deg);
      `}
  }
`;

export const StyledAccordionContent = styled(Box)<StyledAccordionContentProps>`
  padding: ${({ theme }) => theme.spacing.xLarge}};
  padding-left: ${({ iconLeft, theme }) => (iconLeft ? remCalc(60) : `${theme.spacing.xLarge}`)};
`;

StyledAccordionButton.defaultProps = { theme: defaultTheme };
StyledAccordionContent.defaultProps = { theme: defaultTheme };
