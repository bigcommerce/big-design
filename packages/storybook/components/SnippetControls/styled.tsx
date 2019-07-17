import { defaultTheme, Flex } from '@bigcommerce/big-design';
import styled from 'styled-components';

export const StyledFlex = styled(Flex)`
  flex-direction: row;
`;

StyledFlex.defaultProps = { theme: defaultTheme };
