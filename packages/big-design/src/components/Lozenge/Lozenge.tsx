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

const iconMapping = {
  alpha: <BugReportIcon aria-hidden="true" size="large" />,
  beta: <ScienceIcon aria-hidden="true" size="large" />,
  deprecated: <DoNotDisturbOnTotalSilenceIcon aria-hidden="true" size="large" />,
  'early-access': <RocketIcon aria-hidden="true" size="large" />,
  legacy: <EventBusyIcon aria-hidden="true" size="large" />,
  new: <RocketLaunchIcon aria-hidden="true" size="large" />,
};

// Ref helper: narrows to a ref object whose `current` is T | null
function isRefObject<T>(r: React.ForwardedRef<T>): r is React.MutableRefObject<T | null> {
  return r !== null && typeof r === 'object' && 'current' in r;
}

export const Lozenge = forwardRef<HTMLDivElement | HTMLButtonElement, LozengeProps>(
  (props, ref) => {
    const { label, variant = 'new' } = props;

    // Ref callbacks that propagate the element (or null) to the forwarded ref
    const setButtonRef: React.RefCallback<HTMLButtonElement> = (node) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (isRefObject<HTMLDivElement | HTMLButtonElement>(ref)) {
        ref.current = node;
      }
    };

    const setDivRef: React.RefCallback<HTMLDivElement> = (node) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (isRefObject<HTMLDivElement | HTMLButtonElement>(ref)) {
        ref.current = node;
      }
    };

    if (isPopoverProps(props)) {
      return (
        <StyledLozengeButton
          aria-expanded={props.isOpen}
          onClick={props.onClick}
          ref={setButtonRef}
          variant={variant}
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
            <StyledLozenge hasTooltip ref={setDivRef} variant={variant}>
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
      <StyledLozenge ref={setDivRef} variant={variant}>
        {iconMapping[variant]}
        {label}
      </StyledLozenge>
    );
  },
);

Lozenge.displayName = 'Lozenge';
