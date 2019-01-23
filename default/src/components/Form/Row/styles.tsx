import { rem } from 'polished';
import React from 'react';
import { css } from 'styled-components';

import { StyledInputWrapper } from '../../Input';

import { FormRowProps } from './Row';

export const FormRowStyles = css<FormRowProps>`
  margin-bottom: ${({ theme }) => theme.spacing.medium};

  ${({ theme }) => theme.breakpoints.medium} {
    display: grid;
    grid-gap: ${({ theme }) => theme.spacing.medium};

    ${props =>
      React.Children.count(props.children) === 2
        ? css`
            grid-template-columns: repeat(2, ${rem(200)});
          `
        : null}

    ${props =>
      React.Children.count(props.children) === 3
        ? css`
            grid-template-columns: repeat(3, ${rem(128)});
          `
        : null}

    ${StyledInputWrapper} {
      max-width: ${rem(416)};
    }
  }

  &:last-child {
    margin: 0;
  }
`;
