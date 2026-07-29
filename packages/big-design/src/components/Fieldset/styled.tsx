import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import isPropValid from '@emotion/is-prop-valid';
import styled from 'styled-components';

export const StyledFieldset = styled.fieldset.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    typeof prop === 'string' ? isPropValid(prop) : defaultValidatorFn(prop),
})`
  border: none;
  margin: 0 0 ${({ theme }) => theme.spacing.xLarge};
  padding: 0;

  &:last-child {
    margin: 0;
  }
`;

StyledFieldset.defaultProps = { theme: defaultTheme };
