import {
  InfoIcon,
  // BugReportIcon,
  // DoNotDisturbOnTotalSilenceIcon,
  // EventBusyIcon,
  // RocketLaunchIcon,
  // ScienceIcon,
} from '@bigcommerce/big-design-icons';
import React from 'react';

import { Tooltip } from '../Tooltip';

import { StyledLozenge } from './styled';

interface SharedLozengeProps {
  label: string;
  variant?: 'alpha' | 'beta' | 'deprecated' | 'legacy' | 'new';
}
export interface LozengeWithTooltipProps extends SharedLozengeProps {
  tooltipContent?: string;
}

export interface LozengeWithPopoverProps extends SharedLozengeProps {
  onClick: () => void;
  isOpen: boolean;
}

export type LozengeProps = LozengeWithTooltipProps | LozengeWithPopoverProps;

function isPopoverProps(props: LozengeProps): props is LozengeWithPopoverProps {
  return (
    typeof (props as LozengeWithPopoverProps).onClick === 'function' &&
    typeof (props as LozengeWithPopoverProps).isOpen === 'boolean'
  );
}

function isTooltipProps(props: LozengeProps): props is LozengeWithTooltipProps {
  return (
    'tooltipContent' in props && typeof props.tooltipContent === 'string' && !!props.tooltipContent
  );
}

// const iconMapping = {
//   alpha: <BugReportIcon aria-hidden="true" size="large" />,
//   beta: <ScienceIcon aria-hidden="true" size="large" />,
//   deprecated: <DoNotDisturbOnTotalSilenceIcon aria-hidden="true" size="large" />,
//   legacy: <EventBusyIcon aria-hidden="true" size="large" />,
//   new: <RocketLaunchIcon aria-hidden="true" size="large" />,
// };

export const Lozenge = React.forwardRef<HTMLDivElement, LozengeProps>((props, ref) => {
  const { label, variant } = props;

  if (isPopoverProps(props)) {
    return (
      <StyledLozenge
        ref={ref}
        variant={variant}
        role="button"
        tabIndex={0}
        onClick={props.onClick}
        aria-expanded={props.isOpen}
      >
        {/* {variant && iconMapping[variant]} */}
        {label}
      </StyledLozenge>
    );
  }

  if (isTooltipProps(props)) {
    return (
      <Tooltip
        placement="auto"
        trigger={
          <StyledLozenge ref={ref} variant={variant} hasTooltip>
            {label}
            <InfoIcon aria-hidden="true" size="large" />
          </StyledLozenge>
        }
      >
        {props.tooltipContent}
      </Tooltip>
    );
  }

  return (
    <StyledLozenge ref={ref} variant={variant}>
      {label}
    </StyledLozenge>
  );
});

Lozenge.displayName = 'Lozenge';
