import React, { useCallback, useId, useMemo, useRef, useState } from 'react';

import { typedMemo } from '../../../../utils';
import { Flex } from '../../../Flex';
import { EditableCellOnKeyDown } from '../../hooks';
import { Cell, WorksheetItem, WorksheetTextColumn } from '../../types';

import { ActionButton, StyledInput } from './styled';

export interface TextEditorProps<Item> {
  readonly cell: Cell<Item>;
  readonly initialValue?: string;
  readonly isEdited: boolean;
  onBlur(event?: React.FocusEvent<HTMLInputElement>, cell?: Cell<Item>): void;
  readonly onKeyDown: EditableCellOnKeyDown;
  readonly isMetaKey: boolean;
  readonly isControlKey: boolean;
  readonly action?: WorksheetTextColumn<WorksheetItem>['action'];
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
              // Create a new target object that properly implements the value property
              const newTarget = Object.create(Object.getPrototypeOf(blurEvent.target));

              Object.keys(blurEvent.target).forEach((key) => {
                try {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/consistent-type-assertions
                  newTarget[key] = blurEvent.target[key as keyof EventTarget];
                } catch {
                  // Some properties might not be copyable, skip them
                }
              });

              // Define value as a writable property
              Object.defineProperty(newTarget, 'value', {
                value: transformedValue,
                writable: true,
                enumerable: true,
                configurable: true,
              });

              onBlur(
                // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                {
                  ...blurEvent,
                  target: newTarget,
                } as React.FocusEvent<HTMLInputElement>,
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
