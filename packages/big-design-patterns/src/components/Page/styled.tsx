import { Flex } from '@bigcommerce/big-design';
import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css, CSSProperties } from 'styled-components';

import { StyledActionBar } from '../ActionBar/styled';

export interface Background {
  src: string;
  backgroundSize?: CSSProperties['backgroundSize'];
  backgroundPosition?: CSSProperties['backgroundPosition'];
  backgroundRepeat?: CSSProperties['backgroundRepeat'];
}

export const StyledPageBackground = styled.div.attrs({ theme: defaultTheme })<{
  background?: Background;
  actionBar?: React.ReactNode;
}>`
  background-color: ${({ theme }) => theme.colors.secondary10};
  min-height: 100dvh;

  ${({ background }) => {
    if (background) {
      const {
        src,
        backgroundPosition = 'top right',
        backgroundSize = 'contain',
        backgroundRepeat = 'no-repeat',
      } = background;

      return css`
        background-image: url(${src});
        background-size: ${backgroundSize};
        background-position: ${backgroundPosition};
        background-repeat: ${backgroundRepeat};
      `;
    }
  }}

  &:has(${StyledActionBar}) {
    padding-block-end: ${({ theme }) => theme.helpers.remCalc(48)}};
  }

`;

export const StyledPage = styled(Flex).attrs({ theme: defaultTheme })`
  margin: 0 auto;

  ${({ theme }) => theme.breakpoints.desktop} {
    max-width: ${({ theme }) => theme.helpers.remCalc(1120)};
  }

  ${({ theme }) => theme.breakpoints.wide} {
    max-width: ${({ theme }) => theme.helpers.remCalc(1400)};
  }
`;
