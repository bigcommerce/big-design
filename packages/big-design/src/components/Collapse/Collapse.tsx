import React, { useCallback, useEffect, useId, useState } from 'react';

import { CollapsePanel, CollapsePanelProps } from './CollapsePanel';
import { CollapseTrigger, CollapseTriggerProps } from './CollapseTrigger';
import { CollapseContext } from './useCollapseContext';

export interface CollapseProps {
  children?: React.ReactNode;
  isCollapseOpen?: boolean;
  defaultOpen?: boolean;
  onCollapseChange?(isOpen: boolean): void;
  disabled?: boolean;
  triggerProps?: Omit<CollapseTriggerProps, 'title'>;
  panelProps?: Omit<CollapsePanelProps, 'children'>;
}

type CollapseComponent = React.FC<CollapseProps> & {
  Trigger: typeof CollapseTrigger;
  Panel: typeof CollapsePanel;
};

export const Collapse: CollapseComponent = ({
  children,
  isCollapseOpen,
  defaultOpen = false,
  onCollapseChange,
  disabled,
}) => {
  const isControlled = isCollapseOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(disabled ? false : defaultOpen);
  const isOpen = isControlled ? isCollapseOpen : uncontrolledOpen;

  const triggerId = useId();
  const panelId = useId();

  useEffect(() => {
    if (disabled && isOpen) {
      if (!isControlled) {
        setUncontrolledOpen(false);
      }

      onCollapseChange?.(false);
    }
  }, [disabled, isOpen, isControlled, onCollapseChange]);

  const toggle = useCallback(() => {
    if (disabled) {
      return;
    }

    const next = !isOpen;

    if (!isControlled) {
      setUncontrolledOpen(next);
    }

    onCollapseChange?.(next);
  }, [disabled, isControlled, isOpen, onCollapseChange]);

  return (
    <CollapseContext.Provider value={{ isOpen, toggle, disabled, triggerId, panelId }}>
      {children}
    </CollapseContext.Provider>
  );
};

Collapse.Trigger = CollapseTrigger;
Collapse.Panel = CollapsePanel;
