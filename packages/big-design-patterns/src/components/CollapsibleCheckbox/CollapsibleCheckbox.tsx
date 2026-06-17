import {
  Checkbox,
  CheckboxProps,
  Collapse,
  CollapsePanelProps,
  CollapseProps,
  CollapseTriggerProps,
} from '@bigcommerce/big-design';
import React, { ChangeEventHandler, ReactNode } from 'react';

import { StyledCheckboxRow } from './styled';

export interface CollapsibleCheckboxProps extends CheckboxProps {
  /** Controls the checked state. The component is controlled — pair it with `onChange`. */
  checked: boolean;
  /** Change handler for the checkbox. Required because the component is controlled. */
  onChange: ChangeEventHandler<HTMLInputElement>;
  /** Title shown on the collapse trigger button. */
  triggerTitle: string;
  /** Content revealed inside the collapse panel. */
  children: ReactNode;
  /**
   * Props forwarded to the underlying `Collapse`. By default the panel is disabled while the
   * checkbox is unchecked; pass `disabled` here to override that behavior.
   */
  collapseProps?: Omit<CollapseProps, 'children'>;
  /** Props forwarded to the underlying `Collapse.Trigger`. */
  triggerProps?: Omit<CollapseTriggerProps, 'title'>;
  /** Props forwarded to the underlying `Collapse.Panel`. */
  panelProps?: Omit<CollapsePanelProps, 'children'>;
}

export const CollapsibleCheckbox = ({
  checked,
  triggerTitle,
  children,
  collapseProps,
  triggerProps,
  panelProps,
  ...checkboxProps
}: CollapsibleCheckboxProps) => (
  <Collapse disabled={!checked} {...collapseProps}>
    <StyledCheckboxRow alignItems="center" justifyContent="space-between">
      <Checkbox {...checkboxProps} checked={checked} />
      <Collapse.Trigger marginVertical="none" {...triggerProps} title={triggerTitle} />
    </StyledCheckboxRow>
    <Collapse.Panel backgroundColor="secondary20" padding="medium" {...panelProps}>
      {children}
    </Collapse.Panel>
  </Collapse>
);
