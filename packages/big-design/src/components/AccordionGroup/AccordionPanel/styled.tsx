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
  & > span {
    width: 100%;
  }

  ${({ isExpanded }) =>
    isExpanded &&
    css`
      border-bottom: ${({ theme }) => theme.border.box};
    `}

  &:focus {
    z-index: ${({ theme }) => theme.zIndex.fixed};
  }

  svg:not(.collapse-icon) {
    grid-row: 1;
    grid-column: 1;
  }

  .collapse-icon {
    ${withTransition(['transform'])}

    position: absolute;
    right: ${({ theme }) => theme.spacing.medium};

    ${({ isExpanded }) =>
      isExpanded &&
      css`
        transform: rotate(-180deg);
      `}
  }

  p {
    grid-row: 1;
    grid-column: 1;
  }
`;

export const StyledAccordionContent = styled(Box)<StyledAccordionContentProps>`
  padding: ${({ theme }) => theme.spacing.xLarge}};
  padding-left: ${({ iconLeft, theme }) => (iconLeft ? remCalc(60) : `${theme.spacing.xLarge}`)};
`;

StyledAccordionButton.defaultProps = { theme: defaultTheme };
StyledAccordionContent.defaultProps = { theme: defaultTheme };
