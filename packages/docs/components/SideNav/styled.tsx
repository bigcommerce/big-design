import { GridItem } from '@bigcommerce/big-design';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import styled from 'styled-components';

export const StyledGridItem = styled(GridItem)`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
`;

export const StyledScrollAreaRoot = styled(ScrollArea.Root)`
  overflow: hidden;
  height: 100%;
`;

export const StyledScrollAreaViewport = styled(ScrollArea.Viewport)`
  height: 100%;
  width: 100%;
`;

export const StyledScrollAreaScrollbar = styled(ScrollArea.Scrollbar)`
  display: flex;
  user-select: none;
  touch-action: none;
  padding: ${({ theme }) => theme.helpers.remCalc(1)};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  transition: background-color 160ms ease-out;
  width: ${({ theme }) => theme.helpers.remCalc(8)};
  flex-direction: column;
  background-color: ${({ theme }) => theme.helpers.createRGBA(theme.colors.secondary70, 0.1)};
`;

export const StyledScrollAreaThumb = styled(ScrollArea.Thumb)`
  background-color: ${({ theme }) => theme.helpers.createRGBA(theme.colors.secondary70, 0.2)};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
`;
