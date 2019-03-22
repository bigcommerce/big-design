import React, { Ref } from 'react';

import { MarginProps } from '../../mixins';
import { ThemeInterface } from '../../theme';
import { Spinner } from '../Spinner';

import { ContentWrapper, StyledButton } from './styled';

interface PrivateProps {
  forwardedRef: Ref<HTMLButtonElement>;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, MarginProps {
  actionType?: 'normal' | 'destructive';
  iconLeft?: React.ReactChild;
  iconOnly?: React.ReactChild;
  iconRight?: React.ReactChild;
  isLoading?: boolean;
  spinner?: React.ReactChild;
  theme?: ThemeInterface;
  variant?: 'primary' | 'secondary' | 'subtle';
}

class RawButton extends React.PureComponent<ButtonProps & PrivateProps> {
  render() {
    const { forwardedRef, ...props } = this.props;

    return (
      <StyledButton role="button" tabIndex={0} {...props} onClick={this.handleClick} ref={forwardedRef}>
        {props.isLoading ? props.spinner : null}
        <ContentWrapper isLoading={props.isLoading} theme={props.theme}>
          {props.iconLeft}
          {props.iconOnly}
          {!props.iconOnly && props.children}
          {props.iconRight}
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

export const StyleableButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <RawButton {...props} forwardedRef={ref} />
));

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, style, ...props }, ref) => (
  <RawButton {...props} forwardedRef={ref} />
));

const defaultProps = {
  actionType: 'normal' as 'normal',
  isLoading: false,
  spinner: <Spinner overlay={false} />,
  variant: 'primary' as 'primary',
};

Button.displayName = 'Button';
Button.defaultProps = { ...defaultProps };

StyleableButton.displayName = 'StyleableButton';
StyleableButton.defaultProps = { ...defaultProps };
