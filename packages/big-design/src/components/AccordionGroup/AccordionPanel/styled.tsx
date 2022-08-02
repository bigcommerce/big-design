import { theme as defaultTheme, remCalc } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { Box } from '../../Box';
import { StyleableButton } from '../../Button/private';
import { GridItem } from '../../Grid/Item';

import { AccordionPanelProps } from './index';

export const StyledAccordionButton = styled(StyleableButton)`
  background: white;
  border-bottom: ${({ theme }) => theme.border.box};
  border-radius: 0;
  padding: ${({ theme }) => theme.spacing.xLarge};
  text-align: left;
  width: 100%;
  & > span {
    width: 100%;
  }
`;

export const StyledGridItem = styled(GridItem)`
  &:last-child {
    grid-column: 5;
    text-align: right;
  }
`;

export const StyledBox = styled(Box)<AccordionPanelProps>`
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
StyledBox.defaultProps = { theme: defaultTheme };
StyledGridItem.defaultProps = { theme: defaultTheme };
