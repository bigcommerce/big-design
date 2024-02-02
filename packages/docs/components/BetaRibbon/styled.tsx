import { styled } from 'styled-components';

const RIBBON_POSITION = 48;

export const StyledRibbon = styled.div`
  display: none;

  ${({ theme }) => theme.breakpoints.tablet} {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    display: block;
    font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
    line-height: ${({ theme }) => theme.lineHeight.xxLarge};
    position: fixed;
    right: ${({ theme }) => theme.helpers.remCalc(-RIBBON_POSITION)};
    text-align: center;
    text-transform: uppercase;
    top: ${({ theme }) => theme.helpers.remCalc(RIBBON_POSITION / 2)};
    transform: rotate(45deg);
    width: ${({ theme }) => theme.helpers.remCalc(192)};
    z-index: ${({ theme }) => theme.zIndex.fixed - 1};
  }
`;
