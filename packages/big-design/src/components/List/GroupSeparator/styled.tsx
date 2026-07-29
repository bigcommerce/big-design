import isPropValid from '@emotion/is-prop-valid';
import styled from 'styled-components';

export const StyledListItem = styled.li.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    typeof prop === 'string' ? isPropValid(prop) : defaultValidatorFn(prop),
})`
  line-height: 0;
`;
