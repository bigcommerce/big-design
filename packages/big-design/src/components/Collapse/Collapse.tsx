import { ExpandMoreIcon } from '@bigcommerce/big-design-icons';
import type { Colors } from '@bigcommerce/big-design-theme';
import React, { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';

import { MarginProps, PaddingProps } from '../../helpers';
import { Box } from '../Box';

import { StyledButton } from './styled';

export interface CollapsePanelProps extends PaddingProps, MarginProps {
  backgroundColor?: keyof Colors;
}

export interface CollapseProps extends MarginProps {
  children?: React.ReactNode;
  title: string | React.ReactNode;
  initiallyOpen?: boolean;
  onCollapseChange?(isOpen: boolean): void;
  portalTarget?: Element | null;
  panelProps?: CollapsePanelProps;
  disabled?: boolean;
}

export const Collapse: React.FC<CollapseProps> = ({
  children,
  title,
  onCollapseChange,
  initiallyOpen = false,
  portalTarget = null,
  marginVertical,
  panelProps,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(disabled ? false : initiallyOpen);
  const triggerId = useId();
  const panelId = useId();

  useEffect(() => {
    if (disabled && isOpen) {
      setIsOpen(false);

      if (typeof onCollapseChange === 'function') {
        onCollapseChange(false);
      }
    }
  }, [disabled, isOpen, onCollapseChange]);

  const handleTitleClick = () => {
    const nextIsOpen = !isOpen;

    setIsOpen(nextIsOpen);

    if (typeof onCollapseChange === 'function') {
      onCollapseChange(nextIsOpen);
    }
  };

  const collapsablePanel = (
    <Box
      {...panelProps}
      aria-labelledby={triggerId}
      display={isOpen ? 'block' : 'none'}
      hidden={!isOpen}
      id={panelId}
      role="region"
    >
      {children}
    </Box>
  );

  return (
    <>
      <StyledButton
        aria-controls={panelId}
        aria-expanded={isOpen}
        disabled={disabled}
        iconRight={<ExpandMoreIcon title={title} />}
        id={triggerId}
        isOpen={isOpen}
        marginVertical={marginVertical ?? 'small'}
        onClick={handleTitleClick}
        type="button"
        variant="subtle"
      >
        {title}
      </StyledButton>
      {portalTarget ? createPortal(collapsablePanel, portalTarget) : collapsablePanel}
    </>
  );
};
