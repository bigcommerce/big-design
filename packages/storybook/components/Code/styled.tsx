import { defaultTheme } from '@bigcommerce/big-design';
import styled from 'styled-components';

import { CodeProps } from './Code';

export const StyledCode = styled.code<CodeProps>`
  color: ${({ theme }) => theme.colors.secondary70};

  ${({ highlight, theme, variant }) => {
    let styles = ``;

    if (highlight) {
      styles += `
        background-color: ${theme.colors.warning10};
        padding: ${theme.spacing.xxSmall};
      `;
    }

    if (variant && variant === 'primary') {
      styles += `
        color: ${highlight ? theme.colors.primary50 : theme.colors.primary60};
        background-color: ${highlight ? theme.colors.warning10 : null};
      `;
    }

    if (variant && variant === 'secondary') {
      styles += `
        color: ${theme.colors.danger60};
        background-color: ${highlight ? theme.colors.warning10 : null};
      `;
    }

    return styles;
  }}
`;

StyledCode.defaultProps = { theme: defaultTheme };
