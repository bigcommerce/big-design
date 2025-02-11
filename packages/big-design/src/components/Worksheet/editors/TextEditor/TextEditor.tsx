import React, { useCallback, useId, useMemo, useRef, useState } from 'react';

import { typedMemo } from '../../../../utils';
import { Flex } from '../../../Flex';
import { EditableCellOnKeyDown } from '../../hooks';
import { Cell, WorksheetItem, WorksheetTextColumn } from '../../types';

import { ActionButton, StyledInput } from './styled';

export interface TextEditorProps<Item> {
  cell: Cell<Item>;
  initialValue?: string;
  isEdited: boolean;
  onBlur(event?: React.FocusEvent<HTMLInputElement>, cell?: Cell<Item>): void;
  onKeyDown: EditableCellOnKeyDown;
  isMetaKey: boolean;
  isControlKey: boolean;
  action?: WorksheetTextColumn<WorksheetItem>['action'];
}

const InternalTextEditor = <T extends WorksheetItem>({
  cell,
  isEdited,
  initialValue,
  onBlur,
  onKeyDown,
  isMetaKey,
  isControlKey,
  action,
}: TextEditorProps<T>) => {
  const [value, setValue] = useState(initialValue || `${cell.value}`);
  const isBlurBlocked = useRef(false);
  const [isMetaKeyValue, setIsMetaKeyValue] = useState(isMetaKey);
  const [isControlValue, setIsControlKeyValue] = useState(isControlKey);

  const blurEventRef = useRef<React.FocusEvent<HTMLInputElement>>();
  // const actionButtonRef = useRef<HTMLButtonElement | null>(null);
  const actionButtonId = useId();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Avoiding the calling of `onBlur` when user press `Escape`
    // since we handle `onBlur` as saving of the cell data and it conflicts;
    if (event.key === 'Escape') {
      isBlurBlocked.current = true;
    } else if (isMetaKeyValue && event.key === 'v' && event.metaKey) {
      setValue('');
      isBlurBlocked.current = false;
      setIsMetaKeyValue(false);
    } else if (isControlValue && event.key === 'v' && event.ctrlKey) {
      setValue('');
      isBlurBlocked.current = false;
      setIsControlKeyValue(false);
    } else {
      isBlurBlocked.current = false;
    }

    // We always receive the value as a string type, cast to Number if column type is number
    onKeyDown(event, formatValue(value));
  };

  const formatValue = useCallback(
    (value: string) => (cell.type === 'number' && value !== '' ? Number(value) : value),
    [cell.type],
  );

  const transformedValue = useMemo(
    () => (action ? action.transform(formatValue(value)) : value),
    [action, formatValue, value],
  );

  const renderedActionButton = useMemo(
    () =>
      action && transformedValue !== value ? (
        <ActionButton
          aria-label="Cell action button"
          iconOnly={action?.icon}
          id={actionButtonId}
          onClick={() => {
            const blurEvent = blurEventRef.current;

            if (blurEvent) {
              onBlur(
                { ...blurEvent, target: { ...blurEvent.target, value: transformedValue } },
                cell,
              );
            }
          }}
          variant="subtle"
        />
      ) : null,
    [action, transformedValue, value, actionButtonId, onBlur, cell],
  );

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <StyledInput
        autoFocus
        isEdited={isEdited}
        onBlur={(event?: React.FocusEvent<HTMLInputElement>) => {
          const isActionButtonFocused = event?.relatedTarget?.id === actionButtonId;

          if (isActionButtonFocused) {
            blurEventRef.current = event;
          }

          if (!isBlurBlocked.current && !isActionButtonFocused) {
            onBlur(event, cell);
          }
        }}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
      />
      {renderedActionButton}
    </Flex>
  );
};

export const TextEditor = typedMemo(InternalTextEditor);
