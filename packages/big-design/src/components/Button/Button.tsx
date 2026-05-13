import React, { ComponentPropsWithoutRef, forwardRef, memo, Ref } from 'react';

import { MarginProps } from '../../helpers';
import { ProgressCircle } from '../ProgressCircle';

import { ContentWrapper, LoadingSpinnerWrapper, StyledButton } from './styled';

interface PrivateProps {
  forwardedRef: Ref<HTMLButtonElement>;
}

export interface ButtonProps extends ComponentPropsWithoutRef<'button'>, MarginProps {
  actionType?: 'normal' | 'destructive';
  children?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconOnly?: React.ReactNode;
  iconRight?: React.ReactNode;
  isLoading?: boolean;
  mobileWidth?: 'auto' | '100%';
  variant?: 'primary' | 'secondary' | 'subtle' | 'utility';
}

const LoadingSpinner = () => (
  <LoadingSpinnerWrapper alignItems="center">
    <ProgressCircle size="xxSmall" />
  </LoadingSpinnerWrapper>
);

const RawButton: React.FC<ButtonProps & PrivateProps> = memo(
  ({
    actionType = 'normal',
    forwardedRef,
    isLoading = false,
    disabled,
    mobileWidth = '100%',
    variant = 'primary',
    ...props
  }) => {
    return (
      <StyledButton
        className="bd-button"
        {...props}
        actionType={actionType}
        disabled={isLoading || disabled}
        mobileWidth={mobileWidth}
        ref={forwardedRef}
        variant={variant}
      >
        {isLoading ? <LoadingSpinner /> : null}
        <ContentWrapper isLoading={isLoading}>
          {!props.iconOnly && props.iconLeft}
          {props.iconOnly}
          {!props.iconOnly && props.children}
          {!props.iconOnly && props.iconRight}
        </ContentWrapper>
      </StyledButton>
    );
  },
);

export const StyleableButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <RawButton {...props} forwardedRef={ref} />
));

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, style, ...props }, ref) => <RawButton {...props} forwardedRef={ref} />,
);

Button.displayName = 'Button';

StyleableButton.displayName = 'StyleableButton';
