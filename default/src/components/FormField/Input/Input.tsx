import React from 'react';
import styled, { css } from 'styled-components';

import { defaultTheme, ThemeInterface } from '../../../theme';
import ErrorIcon from '../../Icons/ErrorIcon';

import { InputStyles } from './styles';

interface Props {
  error?: boolean;
  theme?: ThemeInterface;
  iconLeft?: React.ReactChild;
  iconRight?: React.ReactChild;
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

const StyledInput = styled.input<InputProps>`
  ${({ theme }) => theme.FormFieldInput || InputStyles};
`;

const StyledInputWrapper = styled.span<InputProps>`
  align-items: center;
  display: flex;
  position: relative;
`;

interface StyledIconWrapperProps {
  position?: 'left' | 'right';
}

const StyledIconWrapper = styled.span<StyledIconWrapperProps>`
  position: absolute;
  color: ${({ theme }) => theme.colors.secondary60};

  ${props =>
    props.position === 'left'
      ? css`
          left: ${({ theme }) => theme.spacing.small};
        `
      : css`
          right: ${({ theme }) => theme.spacing.small};
        `};
`;

const StyledErrorIconWrapper = styled(StyledIconWrapper)`
  color: ${({ theme }) => theme.colors.danger40};
`;

StyledInput.defaultProps = { theme: defaultTheme };
StyledInputWrapper.defaultProps = { theme: defaultTheme };
StyledIconWrapper.defaultProps = { theme: defaultTheme, position: 'left' };
StyledErrorIconWrapper.defaultProps = { theme: defaultTheme, position: 'right' };
