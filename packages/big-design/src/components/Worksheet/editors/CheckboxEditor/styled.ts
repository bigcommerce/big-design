import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { styled } from 'styled-components';

export const CheckboxWrapper = styled.div`
  & > div {
    justify-content: center;
  }
`;

CheckboxWrapper.defaultProps = { theme: defaultTheme };
