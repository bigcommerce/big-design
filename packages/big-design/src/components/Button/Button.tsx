import React, { forwardRef, memo } from 'react';

import { MarginProps } from '../../mixins';
import {
  PolymorphicForwardRefExoticComponent,
  PolymorphicMemoExoticComponent,
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
} from '../../utils/polymorphic';
import { ProgressCircle } from '../ProgressCircle';

import { ContentWrapper, LoadingSpinnerWrapper, StyledButton } from './styled';

export interface InternalButtonProps {
  actionType?: 'normal' | 'destructive';
  children?: React.ReactNode;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconOnly?: React.ReactNode;
  iconRight?: React.ReactNode;
  isLoading?: boolean;
  mobileWidth?: 'auto' | '100%';
  variant?: 'primary' | 'secondary' | 'subtle';
}

interface PrivateProps {
  forwardedRef: React.ForwardedRef<Element>;
}

const ButtonDefaultElement = 'button';

type ButtonAllowedElements = 'button' | 'a';

export type ButtonProps<T extends React.ElementType = typeof ButtonDefaultElement> =
  PolymorphicPropsWithRef<InternalButtonProps & MarginProps, T, ButtonAllowedElements>;

const LoadingSpinner = () => (
  <LoadingSpinnerWrapper alignItems="center">
    <ProgressCircle size="xxSmall" />
  </LoadingSpinnerWrapper>
);

const RawButton = <T extends React.ElementType = typeof ButtonDefaultElement>({
  as,
  forwardedRef,
  isLoading,
  disabled,
  ...props
}: ButtonProps<T> & PrivateProps) => {
  return (
    <StyledButton
      as={as || 'button'}
      className="bd-button"
      {...props}
      disabled={isLoading || disabled}
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      ref={forwardedRef as any}
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
};

const MemoRawButton: PolymorphicMemoExoticComponent<
  ButtonProps<React.ElementType> & PrivateProps,
  typeof ButtonDefaultElement,
  ButtonAllowedElements
> = memo(RawButton);

export const StyleableButton: PolymorphicForwardRefExoticComponent<
  InternalButtonProps & MarginProps,
  typeof ButtonDefaultElement,
  ButtonAllowedElements
> = forwardRef(
  <T extends React.ElementType = typeof ButtonDefaultElement>(
    {
      as,
      ...props
    }: PolymorphicPropsWithoutRef<InternalButtonProps & MarginProps, T, ButtonAllowedElements>,
    ref: React.ForwardedRef<Element>,
  ) => {
    const renderAs: React.ElementType = as || ButtonDefaultElement;

    return <MemoRawButton {...props} as={renderAs} forwardedRef={ref} />;
  },
);

export const Button: PolymorphicForwardRefExoticComponent<
  InternalButtonProps & MarginProps,
  typeof ButtonDefaultElement,
  ButtonAllowedElements
> = forwardRef(
  <T extends React.ElementType = typeof ButtonDefaultElement>(
    {
      as,
      className,
      style,
      ...props
    }: PolymorphicPropsWithoutRef<InternalButtonProps & MarginProps, T, ButtonAllowedElements>,
    ref: React.ForwardedRef<Element>,
  ) => {
    const renderAs: React.ElementType = as || ButtonDefaultElement;

    return <MemoRawButton {...props} as={renderAs} forwardedRef={ref} />;
  },
);

const defaultProps = {
  as: 'button' as const,
  actionType: 'normal' as const,
  isLoading: false,
  mobileWidth: '100%' as const,
  variant: 'primary' as const,
};

Button.displayName = 'Button';
Button.defaultProps = { ...defaultProps };

StyleableButton.displayName = 'StyleableButton';
StyleableButton.defaultProps = { ...defaultProps };
