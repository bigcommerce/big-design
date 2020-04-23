import React, { HTMLAttributes, memo } from 'react';

import { MarginProps } from '../../mixins';
import { excludePaddingProps } from '../../mixins/paddings/paddings';
import { Button, ButtonProps } from '../Button';
import { Flex } from '../Flex';

import { StyledH2, StyledPanel } from './styled';

export interface PanelAction extends Omit<ButtonProps, 'children'> {
  text?: string;
}

export interface PanelProps extends HTMLAttributes<HTMLElement>, MarginProps {
  header?: string;
  action?: PanelAction;
}

export const RawPanel: React.FC<PanelProps> = memo((props) => {
  const filteredProps = excludePaddingProps(props);
  const { action, children, header, ...rest } = filteredProps;

  const renderHeader = () => {
    if (!header && !action) {
      return null;
    }

    if (typeof header !== 'string') {
      return null;
    }

    return (
      <Flex flexDirection="row">
        {header && <StyledH2>{header}</StyledH2>}
        {action && <Button {...action}>{action.text}</Button>}
      </Flex>
    );
  };

  return (
    <StyledPanel
      {...rest}
      backgroundColor="white"
      shadow="raised"
      padding={{ mobile: 'medium', tablet: 'xxLarge' }}
      borderRadius="none"
    >
      {renderHeader()}
      {children}
    </StyledPanel>
  );
});

export const Panel: React.FC<PanelProps> = ({ className, style, ...props }) => <RawPanel {...props} />;

Panel.displayName = 'Panel';
