import { hideVisually } from 'polished';
import styled, { css } from 'styled-components';

import { defaultTheme } from '../../theme';
import { Text } from '../Text';

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

export const StyledLabel = styled(Text).attrs({
  as: 'label',
})<React.LabelHTMLAttributes<HTMLLabelElement>>`
  margin-left: ${({ theme }) => theme.spacing.medium};
`;

export const StyledRadio = styled.label<StyledRadioProps>`
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

StyledRadio.defaultProps = { theme: defaultTheme };
StyledLabel.defaultProps = { theme: defaultTheme };
