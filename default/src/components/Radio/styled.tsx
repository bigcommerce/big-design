import { hideVisually } from 'polished';
import styled, { css } from 'styled-components';

import { defaultTheme } from '../../theme';
import { TextStyles } from '../Text/styles';

import { StyledLabelProps, StyledRadioProps } from './Radio';

export const HiddenRadio = styled.input`
  ${hideVisually()}
`;

export const StyledContainer = styled.div`
  align-items: center;
  display: flex;
`;

export const StyledRadio = styled.div<StyledRadioProps>`
  background: ${props => (props.checked ? props.theme.colors.primary40 : props.theme.colors.white)};
  border: ${({ theme }) => theme.border.box};
  border-color: ${props => (props.checked ? props.theme.colors.primary40 : props.theme.colors.secondary30)};
  border-radius: ${({ theme }) => theme.spacing.large};
  box-shadow: inset 0px 0px 0px 3px ${({ theme }) => theme.colors.white};
  height: ${({ theme }) => theme.spacing.large};
  transition: all 150ms;
  width: ${({ theme }) => theme.spacing.large};
`;

export const StyledLabel = styled.label<StyledLabelProps>`
  ${TextStyles};
  margin-left: ${({ theme }) => theme.spacing.small};
`;

StyledRadio.defaultProps = { theme: defaultTheme };
StyledLabel.defaultProps = { theme: defaultTheme };
