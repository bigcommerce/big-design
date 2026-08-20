import React, { type ComponentPropsWithoutRef, forwardRef, memo, type Ref } from 'react';

import type { MarginProps } from '../../helpers';
import { toTransientMarginProps } from '../../helpers/margins/margins';
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

const RawButton: React.FC<ButtonProps & PrivateProps> = memo((props) => {
  const {
    forwardedRef,
    actionType = 'normal',
    isLoading = false,
    mobileWidth = '100%',
    variant = 'primary',
    disabled,
    iconLeft,
    iconOnly,
    iconRight,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginVertical,
    marginHorizontal,
    ...domProps
  } = props;

  return (
    <StyledButton
      className="bd-button"
      {...domProps}
      {...toTransientMarginProps(props)}
      $actionType={actionType}
      $iconLeft={iconLeft}
      $iconOnly={iconOnly}
      $iconRight={iconRight}
      $mobileWidth={mobileWidth}
      $variant={variant}
      disabled={isLoading || disabled}
      ref={forwardedRef}
    >
      {isLoading ? <LoadingSpinner /> : null}
      <ContentWrapper $isLoading={isLoading}>
        {!iconOnly && iconLeft}
        {iconOnly}
        {!iconOnly && props.children}
        {!iconOnly && iconRight}
      </ContentWrapper>
    </StyledButton>
  );
});

export const StyleableButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <RawButton {...props} forwardedRef={ref} />
));

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, style, ...props }, ref) => <RawButton {...props} forwardedRef={ref} />,
);

Button.displayName = 'Button';
StyleableButton.displayName = 'StyleableButton';
