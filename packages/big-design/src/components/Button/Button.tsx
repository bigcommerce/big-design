import React, { ButtonHTMLAttributes, forwardRef, LinkHTMLAttributes, memo, Ref } from 'react';

import { MarginProps } from '../../mixins';
import { ProgressCircle } from '../ProgressCircle';

import { ContentWrapper, LoadingSpinnerWrapper, StyledButton } from './styled';

interface PrivateProps {
  forwardedRef: Ref<HTMLButtonElement | HTMLLinkElement>;
}

export type ButtonProps<H = LinkHTMLAttributes<HTMLLinkElement>['href']> = MarginProps &
  (H extends LinkHTMLAttributes<HTMLLinkElement>['href']
    ? ButtonHTMLAttributes<HTMLButtonElement>
    : LinkHTMLAttributes<HTMLLinkElement>) & {
    actionType?: 'normal' | 'destructive';
    href?: H;
    iconLeft?: React.ReactNode;
    iconOnly?: React.ReactNode;
    iconRight?: React.ReactNode;
    isLoading?: boolean;
    mobileWidth?: 'auto' | '100%';
    variant?: 'primary' | 'secondary' | 'subtle';
  };

const RawButton: React.FC<ButtonProps & PrivateProps> = memo(({ forwardedRef, ...props }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLLinkElement>) => {
    const { disabled, isLoading, onClick } = props;

    if (onClick && !disabled && !isLoading) {
      // TODO: figure out how to fix this type error
      onClick(event);
    }
  };

  const renderLoadingSpinner = () => {
    return (
      <LoadingSpinnerWrapper alignItems="center">
        <ProgressCircle size="xxSmall" />
      </LoadingSpinnerWrapper>
    );
  };

  return (
    <StyledButton
      className="bd-button"
      {...props}
      as={props.href ? 'a' : 'button'}
      onClick={handleClick}
      // TODO: figure out how to fix this type error
      ref={forwardedRef}
    >
      {props.isLoading ? renderLoadingSpinner() : null}
      <ContentWrapper isLoading={props.isLoading}>
        {!props.iconOnly && props.iconLeft}
        {props.iconOnly}
        {!props.iconOnly && props.children}
        {!props.iconOnly && props.iconRight}
      </ContentWrapper>
    </StyledButton>
  );
});

export const StyleableButton = forwardRef<HTMLButtonElement | HTMLLinkElement, ButtonProps>((props, ref) => (
  <RawButton {...props} forwardedRef={ref} />
));

export const Button = forwardRef<HTMLButtonElement | HTMLLinkElement, ButtonProps>(
  ({ className, style, ...props }, ref) => <RawButton {...props} forwardedRef={ref} />,
);

const defaultProps = {
  actionType: 'normal' as const,
  isLoading: false,
  mobileWidth: '100%' as const,
  variant: 'primary' as const,
};

Button.displayName = 'Button';
Button.defaultProps = { ...defaultProps };

StyleableButton.displayName = 'StyleableButton';
StyleableButton.defaultProps = { ...defaultProps };
