import { withDefaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled, { css } from 'styled-components';

import { withTransition } from '../../helpers/transitions';

interface StyledRadioProps {
  checked?: boolean;
  disabled?: boolean;
}

export const StyledRadioLabelContainer = styled.div.attrs(withDefaultTheme)`
  margin-left: ${({ theme }) => theme.spacing.xSmall};
`;

export const StyledRadioContainer = styled.div.attrs(withDefaultTheme)`
  align-items: flex-start;
  display: flex;
`;

export const StyledHiddenRadio = styled.input.attrs(withDefaultTheme)`
  ${hideVisually()}
`;

export const StyledRadio = styled.label.attrs(withDefaultTheme)<StyledRadioProps>`
  ${withTransition(['border-color', 'box-shadow'])}

  background-color: ${({ disabled, theme }) =>
    disabled ? theme.colors.secondary10 : theme.colors.white};
  border: ${({ theme }) => theme.border.box};
  border-color: ${(props) =>
    props.checked ? props.theme.colors.primary40 : props.theme.colors.secondary30};
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  display: inline-block;
  flex-shrink: 0;
  height: ${({ theme }) => theme.spacing.large};
  position: relative;
  user-select: none;
  width: ${({ theme }) => theme.spacing.large};

  ${({ disabled, theme }) =>
    disabled &&
    css`
      cursor: not-allowed;
      border-color: ${theme.colors.secondary30};
    `};

  &:hover {
    border-color: ${({ checked, disabled, theme }) =>
      !disabled && (checked ? theme.colors.primary50 : theme.colors.secondary40)};
  }

  ${StyledHiddenRadio}:focus + & {
    box-shadow: ${({ theme }) => `0 0 0 ${theme.spacing.xxSmall} ${theme.colors.primary20}`};
  }

  &:after {
    ${withTransition(['opacity'])}

    background-color: ${({ disabled, theme }) =>
      disabled ? theme.colors.secondary40 : theme.colors.primary40};
    border-radius: 50%;
    content: '';
    height: ${({ theme }) => theme.spacing.small};
    left: 50%;
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: ${({ theme }) => theme.spacing.small};
  }

  ${(props) =>
    props.checked &&
    css`
      &:after {
        opacity: 1;
      }
    `}
`;
