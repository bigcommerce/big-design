import { BaselineHelpIcon } from '@bigcommerce/big-design-icons';
import React, {
  ComponentPropsWithoutRef,
  forwardRef,
  isValidElement,
  memo,
  Ref,
  useId,
} from 'react';

import { MarginProps } from '../../helpers';
import { excludePaddingProps } from '../../helpers/paddings/paddings';
import { warning } from '../../utils';
import { Badge, BadgeProps } from '../Badge/Badge';
import { Box } from '../Box';
import { Button, ButtonProps } from '../Button';
import { Flex } from '../Flex';
import { Tooltip } from '../Tooltip';
import { Text } from '../Typography';

import { StyledH2, StyledPanel } from './styled';

interface PrivateProps {
  forwardedRef: Ref<HTMLDivElement>;
}

export interface PanelAction extends Omit<ButtonProps, 'children'> {
  text?: string;
}

export interface PanelProps extends ComponentPropsWithoutRef<'div'>, MarginProps {
  children?: React.ReactNode;
  description?: React.ReactNode;
  header?: string;
  headerId?: string;
  action?: PanelAction;
  badge?: BadgeProps;
  tooltip?: string;
}

export const RawPanel: React.FC<PanelProps & PrivateProps> = memo(({ forwardedRef, ...props }) => {
  const filteredProps = excludePaddingProps(props);
  const { action, children, description, header, headerId, badge, tooltip, ...rest } =
    filteredProps;
  const tooltipId = useId();

  const renderHeader = () => {
    if (!header && !action) {
      return null;
    }

    if (typeof header !== 'string') {
      return null;
    }

    return (
      <Flex flexDirection="row">
        {Boolean(header) && (
          <StyledH2 id={headerId} marginBottom="none">
            {header}
            {badge && <Badge marginLeft="xSmall" {...badge} />}
            {renderTooltip()}
          </StyledH2>
        )}
        {action && <Button {...action}>{action.text}</Button>}
      </Flex>
    );
  };

  const renderTooltip = () => {
    if (typeof tooltip === 'string' && tooltip.length > 0) {
      return (
        <Tooltip
          id={tooltipId}
          placement="right"
          trigger={
            <Box as="span" marginLeft="xSmall" marginVertical="large">
              <BaselineHelpIcon
                aria-describedby={tooltipId}
                data-testid="tooltipIcon"
                size="large"
                style={{ verticalAlign: 'revert-layer' }}
                title="Hover or focus for additional context."
              />
            </Box>
          }
        >
          {tooltip}
        </Tooltip>
      );
    }

    return null;
  };

  const renderDescription = () => {
    if (!description) {
      return null;
    }

    if (typeof description === 'string') {
      return (
        <Text color="secondary60" marginBottom="none" marginTop={header ? 'xxSmall' : 'none'}>
          {description}
        </Text>
      );
    }

    if (isValidElement(description)) {
      return description;
    }

    warning('description must be either a string or a ReactNode.');
  };

  return (
    <StyledPanel
      marginBottom="medium"
      {...rest}
      backgroundColor="white"
      padding={{ mobile: 'medium', tablet: 'xLarge' }}
      ref={forwardedRef}
      shadow="raised"
    >
      {renderHeader()}
      {renderDescription()}
      {children !== undefined && <Box marginTop="medium">{children}</Box>}
    </StyledPanel>
  );
});

export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ className, style, ...props }, ref) => <RawPanel {...props} forwardedRef={ref} />,
);

Panel.displayName = 'Panel';
