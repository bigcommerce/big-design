import React, { forwardRef, HTMLAttributes, memo, Ref } from 'react';

import { MarginProps } from '../../mixins';
import { excludePaddingProps } from '../../mixins/paddings/paddings';
import { Button, ButtonProps } from '../Button';
import { Flex } from '../Flex';

import { StyledH2, StyledPanel } from './styled';

interface PrivateProps {
  forwardedRef: Ref<HTMLDivElement>;
}

export interface PanelAction extends Omit<ButtonProps, 'children'> {
  text?: string;
}

export interface PanelProps extends HTMLAttributes<HTMLElement>, MarginProps {
  children?: React.ReactNode;
  header?: string;
  headerId?: string;
  action?: PanelAction;
}

export const RawPanel: React.FC<PanelProps & PrivateProps> = memo(({ forwardedRef, ...props }) => {
  const filteredProps = excludePaddingProps(props);
  const { action, children, header, headerId, ...rest } = filteredProps;

  const renderHeader = () => {
    if (!header && !action) {
      return null;
    }

    if (typeof header !== 'string') {
      return null;
    }

    return (
      <Flex flexDirection="row">
        {header && <StyledH2 id={headerId}>{header}</StyledH2>}
        {action && <Button {...action}>{action.text}</Button>}
      </Flex>
    );
  };

  return (
    <StyledPanel
      {...rest}
      backgroundColor="white"
      shadow="raised"
      padding={{ mobile: 'medium', tablet: 'xLarge' }}
      borderRadius="none"
      ref={forwardedRef}
    >
      {renderHeader()}
      {children}
    </StyledPanel>
  );
});

export const Panel = forwardRef<HTMLDivElement, PanelProps>(({ className, style, ...props }, ref) => (
  <RawPanel {...props} forwardedRef={ref} />
));

Panel.displayName = 'Panel';
