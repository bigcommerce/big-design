import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';
import { withMargins } from '../../helpers';

export const StyledFeatureSet = styled.ul`
  display: inline-flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;

  && {
    ${withMargins()};
  }

  & > li {
    display: block;
    margin-right: ${({ theme }) => theme.spacing.small};
    margin-bottom: ${({ theme }) => theme.spacing.small};
    overflow: hidden;
  }
`;

StyledFeatureSet.defaultProps = { theme: defaultTheme };