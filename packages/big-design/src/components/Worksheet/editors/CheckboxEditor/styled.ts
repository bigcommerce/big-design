import { withDefaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const CheckboxWrapper = styled.div.attrs(withDefaultTheme)`
  & > div {
    justify-content: center;
  }
`;
