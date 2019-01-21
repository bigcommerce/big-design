import styled from 'styled-components';

import { defaultTheme } from '../../theme';

import { H0Styles, H1Styles, H2Styles, H3Styles, H4Styles, SmallStyles, TextStyles } from './styles';

export const H0 = styled.h1`
  ${({ theme }) => theme.H0 || H0Styles}
`;

export const H1 = styled.h1`
  ${({ theme }) => theme.H1 || H1Styles}
`;

export const H2 = styled.h2`
  ${({ theme }) => theme.H2 || H2Styles}
`;

export const H3 = styled.h3`
  ${({ theme }) => theme.H3 || H3Styles}
`;

export const H4 = styled.h4`
  ${({ theme }) => theme.H4 || H4Styles}
`;

export const Text = styled.p`
  ${({ theme }) => theme.Text || TextStyles}
`;

export const Small = styled.p`
  ${({ theme }) => theme.Small || SmallStyles}
`;

H0.defaultProps = { theme: defaultTheme };
H1.defaultProps = { theme: defaultTheme };
H2.defaultProps = { theme: defaultTheme };
H3.defaultProps = { theme: defaultTheme };
H4.defaultProps = { theme: defaultTheme };
Text.defaultProps = { theme: defaultTheme };
Small.defaultProps = { theme: defaultTheme };
