import { Border, BorderRadius, Colors, Shadow, ZIndex } from '@bigcommerce/big-design-theme';
import React, { ComponentPropsWithoutRef, forwardRef, memo } from 'react';

import { DisplayProps, MarginProps, PaddingProps } from '../../helpers';
import { toTransientDisplayProps } from '../../helpers/display/display';
import { toTransientMarginProps } from '../../helpers/margins/margins';
import { toTransientPaddingProps } from '../../helpers/paddings/paddings';

import { StyledBox } from './styled';

export interface BoxProps
  extends ComponentPropsWithoutRef<'div'>,
    DisplayProps,
    MarginProps,
    PaddingProps {
  as?: keyof React.JSX.IntrinsicElements | React.ComponentType<any>;
  backgroundColor?: keyof Colors;
  shadow?: keyof Shadow;
  border?: keyof Border;
  borderBottom?: keyof Border;
  borderLeft?: keyof Border;
  borderRight?: keyof Border;
  borderTop?: keyof Border;
  borderRadius?: keyof BorderRadius;
  clearfix?: boolean;
  zIndex?: keyof ZIndex;
}

interface PrivateProps {
  forwardedRef: React.Ref<HTMLDivElement>;
}

const RawBox: React.FC<BoxProps & PrivateProps> = (props) => {
  const {
    forwardedRef,
    display,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginVertical,
    marginHorizontal,
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingVertical,
    paddingHorizontal,
    backgroundColor,
    shadow,
    border,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    borderRadius,
    clearfix,
    zIndex,
    ...domProps
  } = props;

  return (
    <StyledBox
      ref={forwardedRef}
      {...domProps}
      {...toTransientDisplayProps(props)}
      {...toTransientMarginProps(props)}
      {...toTransientPaddingProps(props)}
      $backgroundColor={backgroundColor}
      $border={border}
      $borderBottom={borderBottom}
      $borderLeft={borderLeft}
      $borderRadius={borderRadius}
      $borderRight={borderRight}
      $borderTop={borderTop}
      $clearfix={clearfix}
      $shadow={shadow}
      $zIndex={zIndex}
    />
  );
};

export const Box = memo(
  forwardRef<HTMLDivElement, BoxProps>((props, ref) => <RawBox {...props} forwardedRef={ref} />),
);

Box.displayName = 'Box';
