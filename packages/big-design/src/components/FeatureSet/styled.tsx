import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import isPropValid from '@emotion/is-prop-valid';
import styled from 'styled-components';

import { withMargins } from '../../helpers';

export const StyledUl = styled.ul
  .withConfig({
    shouldForwardProp: (prop, defaultValidatorFn) =>
      typeof prop === 'string' ? isPropValid(prop) : defaultValidatorFn(prop),
  })
  .attrs({ theme: defaultTheme })`
  ${({ theme }) => theme.helpers.listReset}

  ${withMargins()};

  display: inline-flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.small};
`;
