import React from 'react';
import { Reference, RefHandler } from 'react-popper';

import { withDownshift } from '../Downshift/Downshift';

export interface DropdownTriggerProps {
  children: React.ReactNode;
}

const Trigger = withDownshift('trigger', ({ downshift: { getToggleButtonProps }, children, ...rest }) => {
  const toggleWithProps = (ref: RefHandler) =>
    React.Children.map(children, dropdownToggle => {
      if (!React.isValidElement(dropdownToggle)) {
        return null;
      }

      return React.cloneElement(dropdownToggle as React.ReactElement<any>, { ...getToggleButtonProps(rest), ref });
    });

  return <Reference>{({ ref }) => toggleWithProps(ref)}</Reference>;
});

export const DropdownTrigger = ({ children, ...props }: DropdownTriggerProps) => (
  <Trigger {...props}>{children}</Trigger>
);
