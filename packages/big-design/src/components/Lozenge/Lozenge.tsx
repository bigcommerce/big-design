import {
  ArrowDropDownIcon,
  BugReportIcon,
  DoNotDisturbOnTotalSilenceIcon,
  EventBusyIcon,
  InfoIcon,
  RocketIcon,
  RocketLaunchIcon,
  ScienceIcon,
} from '@bigcommerce/big-design-icons';
import React, { Ref }  from 'react';

import { Tooltip } from '../Tooltip';

import { StyledLozenge, StyledLozengeButton } from './styled';

interface SharedLozengeProps {
  label: string;
  variant?: 'alpha' | 'beta' | 'deprecated' | 'early-access' | 'legacy' | 'new';
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

const iconMapping = {
  alpha: <BugReportIcon aria-hidden="true" size="large" />,
  beta: <ScienceIcon aria-hidden="true" size="large" />,
  deprecated: <DoNotDisturbOnTotalSilenceIcon aria-hidden="true" size="large" />,
  'early-access': <RocketIcon aria-hidden="true" size="large" />,
  legacy: <EventBusyIcon aria-hidden="true" size="large" />,
  new: <RocketLaunchIcon aria-hidden="true" size="large" />,
};

export const Lozenge = React.forwardRef<HTMLDivElement, LozengeProps>((props, ref) => {
  const { label, variant = 'new' } = props;

  if (isPopoverProps(props)) {
    return (
      <StyledLozengeButton
        ref={ref as Ref<HTMLButtonElement>}
        variant={variant}
        onClick={props.onClick}
        aria-expanded={props.isOpen}
      >
        {iconMapping[variant]}
        {label}
        <ArrowDropDownIcon aria-hidden="true" size="large" />
      </StyledLozengeButton>
    );
  }

  if (isTooltipProps(props)) {
    return (
      <Tooltip
        placement="auto"
        trigger={
          <StyledLozenge ref={ref} variant={variant} hasTooltip>
            {iconMapping[variant]}
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
      {iconMapping[variant]}
      {label}
    </StyledLozenge>
  );
});

Lozenge.displayName = 'Lozenge';
