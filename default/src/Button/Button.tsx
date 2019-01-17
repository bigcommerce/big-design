import React from 'react';
import styled from 'styled-components';

import { defaultTheme, ThemeInterface } from '../themes/basic';
import { Spinner } from '../Spinner/Spinner';

import { ButtonStyles } from './styles';

interface Props {
  actionType: 'normal' | 'destructive';
  icon?: React.ReactChild;
  iconLeft?: React.ReactChild;
  iconRight?: React.ReactChild;
  isLoading: boolean;
  spinner: React.ReactChild;
  theme: ThemeInterface;
  variant: 'primary' | 'secondary' | 'subtle';
}

export type ButtonProps = Props & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const StyledButton = styled('button')<ButtonProps>`
  ${({ theme }) => theme.Button || ButtonStyles};
`;

export class Button extends React.PureComponent<ButtonProps> {
  static defaultProps: Partial<ButtonProps> = {
    actionType: 'normal',
    isLoading: false,
    spinner: <Spinner overlay={false} />,
    theme: defaultTheme,
    variant: 'primary',
  };

  render() {
    const isLoading = this.props.isLoading;

    return (
      <StyledButton role="button" tabIndex={0} {...this.props} onClick={this.handleClick}>
        {isLoading ? this.props.spinner : null}
        <ContentWrapper isLoading={isLoading} theme={this.props.theme}>
          {this.props.iconLeft}
          {this.props.icon}
          {!this.props.icon && this.props.children}
          {this.props.iconRight}
        </ContentWrapper>
      </StyledButton>
    );
  }

  private handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { disabled, isLoading } = this.props;

    if (this.props.onClick && !disabled && !isLoading) {
      this.props.onClick(event);
    }
  };
}

const ContentWrapper = styled.span.attrs<{}, { isLoading?: boolean }>({})`
  align-content: center;
  align-items: center;
  display: inline-grid;
  grid-auto-flow: column;
  grid-gap: ${({ theme }) => theme.spacing.xSmall};
  visibility: ${({ isLoading }) => (isLoading ? 'hidden' : 'visible')};
`;
