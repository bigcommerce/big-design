import { defaultTheme } from '@bigcommerce/big-design';
import styled, { css } from 'styled-components';

import { CodeProps } from './';

export const StyledCode = styled.code<CodeProps>`
  color: ${({ theme }) => theme.colors.secondary70};

  ${({ highlight, theme, variant }) => {
    let styles = ``;

    if (highlight && !variant) {
      styles += `
        background-color: ${theme.colors.warning10};
        padding: ${theme.spacing.xxSmall};
      `;
    }

    if (variant && variant === 'primary') {
      styles += `
        color: ${highlight ? theme.colors.primary50 : theme.colors.primary60};
        ${highlight ? `background-color: ${theme.colors.secondary10}` : ``}
      `;
    }

    if (variant && variant === 'secondary') {
      styles += `
        color: ${theme.colors.danger60};
        ${highlight ? `background-color: ${theme.colors.warning10}` : ``}
      `;
    }

    return css`
      ${styles}
    `;
  }}
`;

StyledCode.defaultProps = { theme: defaultTheme };
