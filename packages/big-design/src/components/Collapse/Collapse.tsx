import React, { useCallback, useEffect, useId, useRef, useState } from 'react';

import { CollapsePanel } from './CollapsePanel';
import { CollapseTrigger } from './CollapseTrigger';
import { CollapseContext } from './useCollapseContext';

export interface CollapseProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  initiallyOpen?: boolean;
  onCollapseChange?(isOpen: boolean): void;
  disabled?: boolean;
}

type CollapseComponent = React.FC<CollapseProps> & {
  Trigger: typeof CollapseTrigger;
  Panel: typeof CollapsePanel;
};

export const Collapse: CollapseComponent = ({
  children,
  isOpen,
  initiallyOpen = false,
  onCollapseChange,
  disabled,
}) => {
  const wasDisabled = useRef(disabled);

  const isControlled = isOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(disabled ? false : initiallyOpen);
  const isCollapseOpen = isControlled ? isOpen : uncontrolledOpen;

  const triggerId = useId();
  const panelId = useId();

  useEffect(() => {
    const justDisabled = disabled && !wasDisabled.current;

    wasDisabled.current = disabled;

    if (justDisabled && isCollapseOpen) {
      if (!isControlled) {
        setUncontrolledOpen(false);
      }

      onCollapseChange?.(false);
    }
  }, [disabled, isControlled, isCollapseOpen, onCollapseChange]);

  const toggle = useCallback(() => {
    if (disabled) {
      return;
    }

    const next = !isCollapseOpen;

    if (!isControlled) {
      setUncontrolledOpen(next);
    }

    onCollapseChange?.(next);
  }, [disabled, isControlled, isCollapseOpen, onCollapseChange]);

  return (
    <CollapseContext.Provider
      value={{ isOpen: isCollapseOpen, toggle, disabled, triggerId, panelId }}
    >
      {children}
    </CollapseContext.Provider>
  );
};

Collapse.Trigger = CollapseTrigger;
Collapse.Panel = CollapsePanel;
