import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const InfoCardImgContainer = styled.img`
  margin-inline-end: ${({ theme }) => theme.spacing.xSmall};
`;

InfoCardImgContainer.defaultProps = { theme: defaultTheme };
