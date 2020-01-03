import { CheckCircleIcon, CloseIcon, ErrorIcon, WarningIcon } from '@bigcommerce/big-design-icons';
import React, { memo, FunctionComponent, HTMLAttributes } from 'react';

import { excludePaddingProps, MarginProps } from '../../mixins';
import { Flex } from '../Flex';
import { H4 } from '../Typography';

import { StyledAlert, StyledButton } from './styled';

export interface AlertProps extends HTMLAttributes<HTMLElement>, MarginProps {
  iconLeft?: React.ReactChild;
  header?: string;
  variant?: 'danger' | 'primary' | 'success' | 'warning';
  onCloseButtonClick?(): void;
}

export const DEFAULT_VARIANT = 'primary';

const RawAlert: FunctionComponent<AlertProps> = memo(props => {
  const filteredProps = excludePaddingProps(props);
  const { children, iconLeft, header, onCloseButtonClick, variant, ...restProps } = filteredProps;

  const renderIcon = () => {
    if (iconLeft) {
      return iconLeft;
    }

    switch (variant) {
      case 'success':
        return <CheckCircleIcon color={variant} size="large" />;
      case 'warning':
        return <WarningIcon color={variant} size="large" />;
      case 'danger':
      case 'primary':
        return <ErrorIcon color={variant} size="large" />;
    }
  };

  return (
    <StyledAlert
      {...restProps}
      backgroundColor="white"
      borderRadius="normal"
      flexDirection={{ mobile: 'row' }}
      padding={{ mobile: 'xSmall', tablet: 'small' }}
      shadow="raised"
      variant={variant}
    >
      <Flex.Item flexShrink={0} paddingRight="small">
        {renderIcon()}
      </Flex.Item>
      <Flex.Item flexGrow={1}>
        {header && <H4 marginBottom="none">{header}</H4>}
        {children}
      </Flex.Item>
      {onCloseButtonClick && (
        <Flex.Item flexShrink={0} paddingLeft="small">
          <StyledButton variant="subtle" onClick={onCloseButtonClick} iconOnly={<CloseIcon size="medium" />} />
        </Flex.Item>
      )}
    </StyledAlert>
  );
});

export const Alert: FunctionComponent<AlertProps> = ({ className, style, ...props }) => <RawAlert {...props} />;

Alert.displayName = 'Alert';
Alert.defaultProps = {
  variant: DEFAULT_VARIANT,
};
