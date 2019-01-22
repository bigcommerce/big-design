import React from 'react';
import styled, { css } from 'styled-components';

import { defaultTheme, ThemeInterface } from '../../../theme';
import ErrorIcon from '../../Icons/ErrorIcon';

import { ErrorIconWrapperStyles, IconWrapperStyles, InputStyles, InputWrapperStyles } from './styles';

interface Props {
  error?: boolean;
  theme?: ThemeInterface;
  iconLeft?: React.ReactChild;
  iconRight?: React.ReactChild;
}

export interface StyledIconWrapperProps {
  position?: 'left' | 'right';
}

export type InputProps = Props & React.InputHTMLAttributes<HTMLInputElement>;

export class Input extends React.PureComponent<InputProps> {
  render() {
    return (
      <StyledInputWrapper>
        {this.renderIconLeft()}
        <StyledInput {...this.props} />
        {this.renderIconRight()}
        {this.renderError()}
      </StyledInputWrapper>
    );
  }

  private renderIconLeft() {
    if (!this.props.iconLeft) {
      return null;
    }

    return <StyledIconWrapper position="left">{this.props.iconLeft}</StyledIconWrapper>;
  }

  private renderIconRight() {
    if (!this.props.iconRight) {
      return null;
    }

    return <StyledIconWrapper position="right">{this.props.iconRight}</StyledIconWrapper>;
  }

  private renderError() {
    if (!this.props.error) {
      return null;
    }

    return (
      <StyledErrorIconWrapper>
        <ErrorIcon />
      </StyledErrorIconWrapper>
    );
  }
}

export const StyledInputWrapper = styled.span<InputProps>`
  ${({ theme }) => theme.FormFieldInputWrapper || InputWrapperStyles};
`;

const StyledInput = styled.input<InputProps>`
  ${({ theme }) => theme.FormFieldInput || InputStyles};
`;

const StyledIconWrapper = styled.span<StyledIconWrapperProps>`
  ${({ theme }) => theme.FormFieldIconWrapper || IconWrapperStyles};
`;

const StyledErrorIconWrapper = styled(StyledIconWrapper)`
  ${({ theme }) => theme.FormFieldErrorIconWrapper || ErrorIconWrapperStyles};
`;

StyledInput.defaultProps = { theme: defaultTheme };
StyledInputWrapper.defaultProps = { theme: defaultTheme };
StyledIconWrapper.defaultProps = { theme: defaultTheme, position: 'left' };
StyledErrorIconWrapper.defaultProps = { theme: defaultTheme, position: 'right' };
