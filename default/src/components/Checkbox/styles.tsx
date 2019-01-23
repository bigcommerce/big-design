import { hideVisually } from 'polished';
import { css } from 'styled-components';

import { TextStyles } from '../Text/styles';

import { HiddenCheckbox, StyledCheckboxProps } from './Checkbox';

export const CheckboxContainerStyles = css`
  align-items: center;
  display: flex;
`;

export const CheckboxStyles = css<StyledCheckboxProps>`
  background: ${props => (props.checked ? props.theme.colors.primary40 : props.theme.colors.white)};
  border-radius: ${({ theme }) => theme.border.radius};
  border: ${({ theme }) => theme.border.box};
  border-color: ${props => (props.checked ? props.theme.colors.primary40 : props.theme.colors.secondary30)};
  color: ${({ theme }) => theme.colors.white};
  display: inline-block;
  height: ${({ theme }) => theme.spacing.large};
  transition: all 150ms;
  width: ${({ theme }) => theme.spacing.large};

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary20};
  }

  svg {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`;

export const HiddenCheckboxStyles = css`
  ${hideVisually()}
`;

export const LabelStyles = css`
  ${TextStyles};
  margin-left: ${({ theme }) => theme.spacing.medium};
`;
