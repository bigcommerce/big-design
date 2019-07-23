import { defaultTheme } from '@bigcommerce/big-design';
import styled, { css } from 'styled-components';

import { CodeProps } from './';

export const StyledCode = styled.code<CodeProps>`
  color: ${({ theme }) => theme.colors.secondary70};

  ${({ highlight, primary, theme }) => {
    let styles = '';

    if (highlight && !primary) {
      styles += `
        background-color: ${theme.colors.warning10};
        padding: ${theme.spacing.xxSmall};
      `;
    }

    if (primary) {
      styles += `
        color: ${theme.colors.primary70};
      `;
    }

    return css`
      ${styles}
    `;
  }}
`;

StyledCode.defaultProps = { theme: defaultTheme };
