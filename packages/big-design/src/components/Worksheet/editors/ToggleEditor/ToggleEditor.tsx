import { ChevronRightIcon, ExpandMoreIcon } from '@bigcommerce/big-design-icons';
import React, { memo, useContext, useEffect } from 'react';

import { useExpandable, useWorksheetStore } from '../../hooks';
import { WorksheetLocalizationContext } from '../../Worksheet';

import { StyledExpandButton } from './styled';

interface ToggleEditorProps {
  toggle: boolean;
  rowId: string | number;
}

const InternalToggleEditor = ({ rowId, toggle }: ToggleEditorProps) => {
  const { onToggle, isExpandable, hasExpanded } = useExpandable(rowId);
  const { store, useStore } = useWorksheetStore();
  const localization = useContext(WorksheetLocalizationContext);

  const setEditingCell = useStore(store, (state) => state.setEditingCell);

  useEffect(() => {
    if (toggle && isExpandable) {
      onToggle(hasExpanded);
    }

    setEditingCell({ cell: null });
  }, [hasExpanded, isExpandable, onToggle, setEditingCell, toggle]);

  if (!isExpandable) {
    return null;
  }

  if (hasExpanded) {
    return (
      <StyledExpandButton
        iconOnly={<ExpandMoreIcon color="secondary60" />}
        onClick={() => {
          onToggle(true);
        }}
        title={localization.toggleRowExpanded}
        variant="subtle"
      />
    );
  }

  return (
    <StyledExpandButton
      iconOnly={<ChevronRightIcon color="secondary60" />}
      onClick={() => {
        onToggle(false);
      }}
      title={localization.toggleRowExpanded}
      variant="subtle"
    />
  );
};

export const ToggleEditor = memo(InternalToggleEditor);
