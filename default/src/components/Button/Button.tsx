import React from 'react';
import styled from 'styled-components';

import { defaultTheme, ThemeInterface } from '../../theme';
import { Spinner } from '../Spinner';

import { ButtonContentWrapperStyles, ButtonStyles } from './styles';

interface Props {
  actionType: 'normal' | 'destructive';
  iconOnly?: React.ReactChild;
  iconLeft?: React.ReactChild;
  iconRight?: React.ReactChild;
  isLoading: boolean;
  spinner: React.ReactChild;
  theme?: ThemeInterface;
  variant: 'primary' | 'secondary' | 'subtle';
}

export type ButtonProps = Props & React.ButtonHTMLAttributes<HTMLButtonElement>;

export class Button extends React.PureComponent<ButtonProps> {
  static defaultProps: Partial<ButtonProps> = {
    actionType: 'normal',
    isLoading: false,
    spinner: <Spinner overlay={false} />,
    variant: 'primary',
  };

  render() {
    const isLoading = this.props.isLoading;

    return (
      <StyledButton role="button" tabIndex={0} {...this.props} onClick={this.handleClick}>
        {isLoading ? this.props.spinner : null}
        <ContentWrapper isLoading={isLoading} theme={this.props.theme}>
          {this.props.iconLeft}
          {this.props.iconOnly}
          {!this.props.iconOnly && this.props.children}
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

export const StyledButton = styled('button')<ButtonProps>`
  ${({ theme }) => theme.Button || ButtonStyles};
`;

const ContentWrapper = styled.span.attrs<{}, { isLoading?: boolean }>({})`
  ${({ theme }) => theme.ButtonContentWrapperStyles || ButtonContentWrapperStyles};
`;

StyledButton.defaultProps = { theme: defaultTheme };
ContentWrapper.defaultProps = { theme: defaultTheme };
