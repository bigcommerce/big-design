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
import React, { forwardRef } from 'react';

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
    'onClick' in props &&
    typeof props.onClick === 'function' &&
    'isOpen' in props &&
    typeof props.isOpen === 'boolean'
  );
}

function isTooltipProps(props: LozengeProps): props is LozengeWithTooltipProps {
  return (
    'tooltipContent' in props && typeof props.tooltipContent === 'string' && !!props.tooltipContent
  );
}

const iconMap = {
  alpha: BugReportIcon,
  beta: ScienceIcon,
  deprecated: DoNotDisturbOnTotalSilenceIcon,
  'early-access': RocketIcon,
  legacy: EventBusyIcon,
  new: RocketLaunchIcon,
};

// Ref helper: narrows to a ref object whose `current` is T | null
function isRefObject<T>(r: React.ForwardedRef<T>): r is React.MutableRefObject<T | null> {
  return r !== null && typeof r === 'object' && 'current' in r;
}

// Ref callback that propagates the element (or null) to the forwarded ref
function setForwardedRef<T extends HTMLButtonElement | HTMLDivElement>(
  ref: React.ForwardedRef<T>,
  node: T | null,
) {
  if (typeof ref === 'function') {
    ref(node);
  } else if (isRefObject<HTMLButtonElement | HTMLDivElement>(ref)) {
    ref.current = node;
  }
}

export const Lozenge = forwardRef<HTMLDivElement | HTMLButtonElement, LozengeProps>(
  (props, ref) => {
    const { label, variant = 'new' } = props;

    const VariantIcon = iconMap[variant];

    if (isPopoverProps(props)) {
      return (
        <StyledLozengeButton
          aria-expanded={props.isOpen}
          aria-haspopup={true}
          onClick={props.onClick}
          ref={(node) => setForwardedRef(ref, node)}
          type="button"
          variant={variant}
        >
          <VariantIcon aria-hidden="true" size="large" />
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
            <StyledLozenge hasTooltip ref={(node) => setForwardedRef(ref, node)} variant={variant}>
              <VariantIcon aria-hidden="true" size="large" />
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
      <StyledLozenge ref={(node) => setForwardedRef(ref, node)} variant={variant}>
        <VariantIcon aria-hidden="true" size="large" />
        {label}
      </StyledLozenge>
    );
  },
);

Lozenge.displayName = 'Lozenge';
