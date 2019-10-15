import React, { memo } from 'react';

import { MarginProps } from '../../mixins';
import { Button, ButtonProps } from '../Button';
import { Flex } from '../Flex';
import { H2 } from '../Typography';

import { StyledPanel } from './styled';

export interface PanelAction extends Omit<ButtonProps, 'children'> {
  text?: string;
}

export interface PanelProps extends React.HTMLAttributes<HTMLElement>, MarginProps {
  header?: string;
  action?: PanelAction;
}

export const RawPanel: React.FC<PanelProps> = memo(props => {
  const {
    action,
    children,
    header,
    margin,
    marginBottom,
    marginHorizontal,
    marginLeft,
    marginRight,
    marginTop,
    marginVertical,
  } = props;

  const renderHeader = () => {
    if (!header && !action) {
      return null;
    }

    if (typeof header !== 'string') {
      return null;
    }

    return (
      <Flex justifyContent="space-between" flexDirection="row">
        {header && (
          <Flex.Item>
            <H2>{header}</H2>
          </Flex.Item>
        )}
        {action && (
          <Flex.Item>
            <Button {...action}>{action.text}</Button>
          </Flex.Item>
        )}
      </Flex>
    );
  };

  return (
    <StyledPanel
      backgroundColor="white"
      shadow="raised"
      padding={{ mobile: 'medium', tablet: 'xxLarge' }}
      borderRadius="none"
      margin={margin}
      marginBottom={marginBottom || 'medium'}
      marginHorizontal={marginHorizontal}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      marginVertical={marginVertical}
    >
      {renderHeader()}
      {children}
    </StyledPanel>
  );
});

export const Panel: React.FC<PanelProps> = ({ className, style, ...props }) => <RawPanel {...props} />;
