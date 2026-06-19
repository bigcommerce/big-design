import { theme as defaultTheme, remCalc } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const InfoCardTitleContainer = styled.div`
  display: flex;
`;

export const InfoCardImgContainer = styled.img`
  height: ${remCalc(40)};
  width: ${remCalc(40)};
  margin-right: ${({ theme }) => theme.spacing.xSmall};
`;

InfoCardImgContainer.defaultProps = { theme: defaultTheme };
