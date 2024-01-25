import React, { ButtonHTMLAttributes, forwardRef, memo, Ref } from 'react';

import { MarginProps } from '../../mixins';
import { withTransients } from '../../utils';
import { ProgressCircle } from '../ProgressCircle';

import { ContentWrapper, LoadingSpinnerWrapper, StyledButton } from './styled';

interface PrivateProps {
  forwardedRef: Ref<HTMLButtonElement>;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, MarginProps {
  readonly actionType?: 'normal' | 'destructive';
  readonly children?: React.ReactNode;
  readonly iconLeft?: React.ReactNode;
  readonly iconOnly?: React.ReactNode;
  readonly iconRight?: React.ReactNode;
  readonly isLoading?: boolean;
  readonly mobileWidth?: 'auto' | '100%';
  readonly variant?: 'primary' | 'secondary' | 'subtle' | 'utility';
}

const LoadingSpinner = () => (
  <LoadingSpinnerWrapper alignItems="center">
    <ProgressCircle size="xxSmall" />
  </LoadingSpinnerWrapper>
);

const RawButton: React.FC<ButtonProps & PrivateProps> = memo(
  ({ forwardedRef, isLoading, disabled, ...props }) => {
    return (
      <StyledButton
        className="bd-button"
        {...withTransients(props)}
        disabled={isLoading || disabled}
        ref={forwardedRef}
      >
        {isLoading ? <LoadingSpinner /> : null}
        <ContentWrapper $isLoading={isLoading}>
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
