import { LiveError } from 'react-live';
import styled from 'styled-components';

export const StyledLiveError = styled(LiveError)`
  background-color: ${({ theme }) => theme.colors.secondary70};
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  margin-bottom: ${({ theme }) => theme.spacing.xxLarge};
  margin-top: ${({ theme }) => theme.spacing.xxLarge};
  padding: ${({ theme }) => theme.spacing.small};
`;
