import styled from 'styled-components';

import { StyleableButton } from '../Button/private';

export const StyledButton = styled(StyleableButton)`
  color: ${({ theme }) => theme.colors.secondary70};
`;

// in case we need to add separate styles to the icon buttons or to the dropdown trigger
export const StyledIconButton = styled(StyleableButton)`
  color: ${({ theme }) => theme.colors.secondary70};
`;
