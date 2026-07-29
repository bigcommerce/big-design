import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import isPropValid from '@emotion/is-prop-valid';
import styled from 'styled-components';

export const InfoCardImgContainer = styled.img.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    typeof prop === 'string' ? isPropValid(prop) : defaultValidatorFn(prop),
})`
  margin-inline-end: ${({ theme }) => theme.spacing.xSmall};
  object-fit: contain;
  flex-shrink: 0;
`;

InfoCardImgContainer.defaultProps = { theme: defaultTheme };
