import { ChevronRightIcon, ExpandMoreIcon } from '@bigcommerce/big-design-icons';
import React, { memo, useEffect } from 'react';

import { Flex } from '../../../Flex';
import { useExpandable, useWorksheetStore } from '../../hooks';

import { StyledExpandButton } from './styled';

interface ToggleEditorProps {
  toggle: boolean;
  rowId: string | number;
}

const InternalToggleEditor = ({ rowId, toggle }: ToggleEditorProps) => {
  const { onToggle, isExpandable, hasExpanded } = useExpandable(rowId);
  const { store, useStore } = useWorksheetStore();

  const setEditingCell = useStore(store, (state) => state.setEditingCell);

  useEffect(() => {
    if (toggle && isExpandable) {
      onToggle(hasExpanded);
    }

    setEditingCell({ cell: null });
  }, [hasExpanded, isExpandable, onToggle, setEditingCell, toggle]);

  return isExpandable ? (
    <Flex justifyContent="center">
      {hasExpanded ? (
        <StyledExpandButton
          iconOnly={<ExpandMoreIcon />}
          onClick={() => {
            onToggle(true);
          }}
          title="toggle row expanded"
          variant="subtle"
        />
      ) : (
        <StyledExpandButton
          iconOnly={<ChevronRightIcon />}
          onClick={() => {
            onToggle(false);
          }}
          title="toggle row expanded"
          variant="subtle"
        />
      )}
    </Flex>
  ) : null;
};

export const ToggleEditor = memo(InternalToggleEditor);
