import { css } from 'styled-components';

import { H3Styles } from '../../Text/styles';

import { LegendProps } from './Fieldset';

export const FieldsetStyles = css`
  border: none;
  margin: 0 0 ${({ theme }) => theme.spacing.xLarge};
  padding: 0;

  &:last-child {
    margin: 0;
  }
`;

export const FieldsetLegendStyles = css<LegendProps>`
  ${H3Styles};

  ${props =>
    props.hasDescription &&
    css`
      margin: 0;
    `};
`;

export const FieldsetDescriptionStyles = css``;
