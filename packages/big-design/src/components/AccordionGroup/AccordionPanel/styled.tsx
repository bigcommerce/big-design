import { theme as defaultTheme, remCalc } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { withTransition } from '../../../mixins/transitions';
import { Box } from '../../Box';
import { StyleableButton } from '../../Button/private';

import { AccordionPanelProps } from './index';

export const StyledAccordionButton = styled(StyleableButton)<AccordionPanelProps>`
  background: white;
  border-bottom: ${({ theme }) => theme.border.box};
  border-radius: 0;
  padding: ${({ theme }) => theme.spacing.xLarge};
  text-align: left;
  width: 100%;
  & > span {
    width: 100%;
  }

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

export const StyledAccordionContent = styled(Box)<AccordionPanelProps>`
  border-bottom: ${({ theme }) => theme.border.box};
  padding: ${({ theme }) => theme.spacing.xLarge}};
  padding-left: ${({ iconLeft, theme }) => (iconLeft ? remCalc(60) : `${theme.spacing.xLarge}`)};
`;

export const StyledAccordion = styled(Box)<AccordionPanelProps>`
  &:last-child ${StyledAccordionButton} {
    border-bottom: ${({ isExpanded, theme }) =>
      isExpanded ? `${theme.border.box}` : `${theme.border.none}`};
    border-bottom-left-radius: ${({ isExpanded, theme }) =>
      isExpanded ? `${theme.borderRadius.none}` : `${theme.borderRadius.normal}`};
    border-bottom-right-radius: ${({ isExpanded, theme }) =>
      isExpanded ? `${theme.borderRadius.none}` : `${theme.borderRadius.normal}`};
  }
`;

StyledAccordionButton.defaultProps = { theme: defaultTheme };
StyledAccordion.defaultProps = { theme: defaultTheme };
StyledAccordionContent.defaultProps = { theme: defaultTheme };
