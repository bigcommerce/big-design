import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled, { css, DefaultTheme, StyledComponent } from 'styled-components';

import { withTransition } from '../../mixins/transitions';
import { StyleableText } from '../Typography/private';

interface StyledRadioProps {
  checked?: boolean;
}

export const RadioContainer = styled.div`
  align-items: center;
  display: flex;
`;

export const HiddenRadio = styled.input`
  ${hideVisually()}
`;

export const StyledLabel = styled(StyleableText).attrs({
  as: 'label',
})<React.LabelHTMLAttributes<HTMLLabelElement>>`
  cursor: pointer;
  margin-left: ${({ theme }) => theme.spacing.xSmall};
` as StyledComponent<'label', DefaultTheme>;

export const StyledRadio = styled.label<StyledRadioProps>`
  ${withTransition(['border-color', 'box-shadow'])}

  border: ${({ theme }) => theme.border.box};
  border-color: ${props => (props.checked ? props.theme.colors.primary40 : props.theme.colors.secondary30)};
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  display: inline-block;
  height: ${({ theme }) => theme.spacing.large};
  position: relative;
  user-select: none;
  width: ${({ theme }) => theme.spacing.large};

  &:hover {
    border-color: ${props => (props.checked ? props.theme.colors.primary50 : props.theme.colors.secondary40)};
  }

  ${HiddenRadio}:focus + & {
    box-shadow: ${({ theme }) => `0 0 0 ${theme.spacing.xxSmall} ${theme.colors.primary20}`};
  }

  &:after {
    ${withTransition(['opacity'])}

    background-color: ${({ theme }) => theme.colors.primary40};
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

  ${props =>
    props.checked &&
    css`
      &:after {
        opacity: 1;
      }
    `}
`;

StyledRadio.defaultProps = { theme: defaultTheme };
StyledLabel.defaultProps = { theme: defaultTheme };
