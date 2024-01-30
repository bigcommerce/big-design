import { Breakpoints, breakpointsOrder, ThemeInterface } from '@bigcommerce/big-design-theme';
import { css, RuleSet } from 'styled-components';

import { WithTransients } from '../../../../utils';

import { TableColumnDisplayOverload, TableColumnDisplayProps } from './types';

export const withTableColumnDisplay = () => css<WithTransients<TableColumnDisplayProps>>`
  ${({ $display, theme }) => $display && getDisplayStyles($display, theme, 'display')};
`;

const getDisplayStyles: TableColumnDisplayOverload = (
  displayProp: any,
  theme: ThemeInterface,
  cssKey: any,
): RuleSet => {
  if (typeof displayProp === 'object') {
    return getResponsiveDisplay(displayProp, theme, cssKey);
  }

  if (typeof displayProp === 'string' || typeof displayProp === 'number') {
    return getSimpleDisplay(displayProp, cssKey);
  }

  return [];
};

const getSimpleDisplay = (displayProp: string | number, cssKey: string): RuleSet => css`
  ${cssKey}: ${displayProp}
`;

const getResponsiveDisplay: TableColumnDisplayOverload = (
  displayProp: any,
  theme: ThemeInterface,
  cssKey: string,
): RuleSet[] => {
  const breakpointKeys = Object.keys(displayProp).sort(
    (firstBreakpoint, secondBreakpoint) =>
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      breakpointsOrder.indexOf(firstBreakpoint as keyof Breakpoints) -
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      breakpointsOrder.indexOf(secondBreakpoint as keyof Breakpoints),
  );

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return (breakpointKeys as Array<keyof Breakpoints>).map(
    (breakpointKey) =>
      css`
        ${theme.breakpoints[breakpointKey]} {
          ${/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */ ''}
          ${getSimpleDisplay(displayProp[breakpointKey], cssKey)}
        }
      `,
  );
};
