import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { Flex } from '../../Flex';

export const StyledActions = styled(Flex)``;

export const StyledActionItem = styled(Flex.Item)``;

StyledActions.defaultProps = { theme: defaultTheme };
StyledActionItem.defaultProps = { theme: defaultTheme };
