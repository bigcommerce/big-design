import { hideVisually } from 'polished';
import { css } from 'styled-components';

import { TextStyles } from '../Text/styles';

import { HiddenRadio, StyledRadioProps } from './Radio';

export const RadioContainerStyles = css`
  align-items: center;
  display: flex;
`;

// This is a function since we are using a Component Selector
// Which won't be defined initially
export const RadioStyles = () => css<StyledRadioProps>`
  border-radius: 50%;
  border: ${({ theme }) => theme.border.box};
  border-color: ${props => (props.checked ? props.theme.colors.primary40 : props.theme.colors.secondary30)};
  color: ${({ theme }) => theme.colors.white};
  display: inline-block;
  height: ${({ theme }) => theme.spacing.large};
  position: relative;
  transition: all 150ms;
  user-select: none;
  width: ${({ theme }) => theme.spacing.large};

  ${HiddenRadio}:focus + & {
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary20};
  }

  ${props =>
    props.checked &&
    css`
      &:after {
        background-color: ${({ theme }) => theme.colors.primary40};
        border-radius: 50%;
        content: '';
        height: ${({ theme }) => theme.spacing.small};
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: ${({ theme }) => theme.spacing.small};
      }
    `}
`;

export const HiddenRadioStyles = css`
  ${hideVisually()}
`;

export const LabelStyles = css`
  ${TextStyles};
  margin-left: ${({ theme }) => theme.spacing.medium};
`;
