import { useCombobox, UseComboboxState, UseComboboxStateChangeOptions } from 'downshift';
import React, {
  cloneElement,
  createRef,
  isValidElement,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { usePopper } from 'react-popper';

import { useUniqueId } from '../../hooks';
import { typedMemo, warning } from '../../utils';
import { FormControlLabel } from '../Form';
import { Input } from '../Input';
import { List } from '../List';
import { flattenItems } from '../List/List';
import { StyledMenuContainer } from '../List/styled';
import { SelectAction, SelectOption } from '../Select';
import { DropdownButton, StyledDropdownIcon, StyledInputContainer } from '../Select/styled';

import { MultiSelectProps } from './types';

export const MultiSelect = typedMemo(
  <T extends any>({
    action,
    autoWidth = false,
    className,
    disabled,
    filterable = true,
    id,
    inputRef,
    label,
    labelId,
    maxHeight = 250,
    onOptionsChange,
    options,
    placeholder,
    placement = 'bottom-start' as 'bottom-start',
    // positionFixed = false,
    required,
    style,
    value,
    ...rest
  }: MultiSelectProps<T>): ReturnType<React.FC<MultiSelectProps<T>>> => {
    // We need to pass Downshift only options without groups for accessibility tracking
    const items = useMemo(() => (action ? [...flattenItems(options), action] : flattenItems(options)), [
      action,
      options,
    ]);

    const findSelectedOptions = useMemo(() => {
      return items.filter(
        (option: any) => value && value.find((val) => 'value' in option && val === option.value) !== undefined,
      ) as Array<SelectOption<T>>;
    }, [items, value]);

    const [multiSelectOptions, setMultiSelectOptions] = useState(items);
    const [inputValue, setInputValue] = useState('');
    const [selectedOptions, setSelectedOptions] = useState(findSelectedOptions);

    const defaultRef: RefObject<HTMLInputElement> = createRef();
    const multiSelectUniqueId = useUniqueId('multi-select');

    const referenceRef = useRef(null);
    const popperRef = useRef(null);

    const { styles, attributes } = usePopper(referenceRef.current, popperRef.current, {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 4],
          },
        },
      ],
      placement,
    });

    // Need to set items if options prop changes
    useEffect(() => setMultiSelectOptions(items), [items]);

    useEffect(() => {
      setInputValue('');
    }, [selectedOptions]);

    useEffect(() => {
      setSelectedOptions(findSelectedOptions);
    }, [findSelectedOptions]);

    const handleSetInputValue = ({
      inputValue,
      isOpen,
    }: Partial<UseComboboxState<SelectOption<T> | SelectAction | null>>) => {
      if (filterable && isOpen === true) {
        setMultiSelectOptions(filterOptions(inputValue));
        setInputValue(inputValue || '');
      }
    };

    const filterOptions = (inputVal = '') => {
      return items.filter(
        (option: any) => option === action || option.content.toLowerCase().startsWith(inputVal.trim().toLowerCase()),
      );
    };

    const handleOnIsOpenChange = (changes: Partial<UseComboboxState<SelectOption<T> | SelectAction | null>>) => {
      if (filterable && changes.isOpen === false) {
        // Reset the items if filtered
        setMultiSelectOptions(items);
      }
    };

    const handleOnSelectedItemChange = (changes: Partial<UseComboboxState<SelectOption<T> | SelectAction | null>>) => {
      if (action && changes.selectedItem === action) {
        action.onActionClick(inputValue);
      }
    };

    const handleStateReducer = (
      state: UseComboboxState<SelectOption<T> | SelectAction | null>,
      actionAndChanges: UseComboboxStateChangeOptions<SelectOption<T> | SelectAction | null>,
    ) => {
      switch (actionAndChanges.type) {
        case useCombobox.stateChangeTypes.InputBlur:
          return { ...actionAndChanges.changes, inputValue: '' };
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick: {
          if (!actionAndChanges.changes.selectedItem) {
            return actionAndChanges.changes;
          }

          // Prevent action from changing the input value
          if (actionAndChanges.changes.selectedItem === action) {
            return { ...actionAndChanges.changes, inputValue: state.inputValue };
          }

          const isChecked = Boolean(
            selectedOptions.find(
              (i) =>
                actionAndChanges.changes.selectedItem &&
                'value' in actionAndChanges.changes.selectedItem &&
                i.value === actionAndChanges.changes.selectedItem.value,
            ),
          );

          isChecked
            ? removeItem(actionAndChanges.changes.selectedItem as SelectOption<T>)
            : addSelectedItem(actionAndChanges.changes.selectedItem as SelectOption<T>);

          return {
            ...actionAndChanges.changes,
            highlightedIndex: state.highlightedIndex,
            inputValue: '',
            isOpen: true,
          };
        }
        default:
          return actionAndChanges.changes;
      }
    };

    const removeItem = useCallback(
      (item: SelectOption<T>) => {
        if (!item) {
          return;
        }

        const newOptions = selectedOptions.filter((i) => i.value !== item.value);

        onOptionsChange(
          newOptions.map((option) => option.value),
          newOptions,
        );

        setMultiSelectOptions(items);
      },
      [items, onOptionsChange, selectedOptions],
    );

    const addSelectedItem = useCallback(
      (item: SelectOption<T>) => {
        if (!item) {
          return;
        }

        const newOptions = [...selectedOptions, item];

        onOptionsChange(
          newOptions.map((option) => option.value),
          newOptions,
        );

        setMultiSelectOptions(items);
      },
      [items, onOptionsChange, selectedOptions],
    );

    const {
      getComboboxProps,
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      getToggleButtonProps,
      highlightedIndex,
      isOpen,
      openMenu,
    } = useCombobox({
      id: multiSelectUniqueId,
      inputId: id,
      inputValue,
      itemToString: (option) => (option ? option.content : ''),
      items: multiSelectOptions,
      labelId,
      onInputValueChange: handleSetInputValue,
      onIsOpenChange: handleOnIsOpenChange,
      onSelectedItemChange: handleOnSelectedItemChange,
      selectedItem: null,
      stateReducer: handleStateReducer,
    });

    // Reset the value when Multiselect is closed
    useEffect(() => {
      if (!isOpen) {
        setInputValue('');
      }
    }, [isOpen]);

    const setCallbackRef = useCallback(
      (ref: HTMLInputElement) => {
        if (typeof inputRef === 'function') {
          inputRef(ref);
        }
      },
      [inputRef],
    );

    const getInputRef = useCallback(() => {
      if (inputRef && typeof inputRef === 'object') {
        return inputRef;
      } else if (typeof inputRef === 'function') {
        return setCallbackRef;
      }

      return defaultRef;
    }, [defaultRef, inputRef, setCallbackRef]);

    const renderLabel = useMemo(() => {
      if (!label) {
        return null;
      }

      if (typeof label === 'string') {
        return (
          <FormControlLabel {...getLabelProps()} renderOptional={!required}>
            {label}
          </FormControlLabel>
        );
      }

      if (isValidElement(label) && label.type === FormControlLabel) {
        return cloneElement(label as React.ReactElement<React.LabelHTMLAttributes<HTMLLabelElement>>, getLabelProps());
      }

      warning('label must be either a string or a FormControlLabel component.');
    }, [getLabelProps, label, required]);
    const renderToggle = useMemo(() => {
      return (
        <DropdownButton
          {...getToggleButtonProps({
            disabled,
            type: 'button',
          })}
          aria-label="toggle menu"
          variant="subtle"
        >
          <StyledDropdownIcon />
        </DropdownButton>
      );
    }, [disabled, getToggleButtonProps]);

    const renderInput = useMemo(() => {
      return (
        <StyledInputContainer ref={referenceRef}>
          <Input
            {...rest}
            {...getInputProps({
              autoComplete: 'off',
              disabled,
              onFocus: () => {
                !isOpen && openMenu();
              },
              onKeyDown: (event) => {
                switch (event.key) {
                  case 'Backspace':
                    if (!inputValue) {
                      removeItem(selectedOptions[selectedOptions.length - 1]);
                    }
                    break;
                  case 'Enter':
                    event.preventDefault();
                    if (isOpen === false) {
                      openMenu();
                      (event.nativeEvent as any).preventDownshiftDefault = true;
                    }
                    break;
                  case 'Escape':
                    // Reset select
                    if (isOpen === false) {
                      onOptionsChange([], []);
                    }
                    break;
                }
              },
              placeholder,
              ref: getInputRef(),
            })}
            chips={selectedOptions.map((option: SelectOption<T>) => ({
              label: option.content,
              onDelete: () => removeItem(option),
            }))}
            iconRight={renderToggle}
            readOnly={!filterable}
            required={required}
          />
        </StyledInputContainer>
      );
    }, [
      disabled,
      filterable,
      getInputProps,
      getInputRef,
      inputValue,
      isOpen,
      onOptionsChange,
      openMenu,
      placeholder,
      removeItem,
      renderToggle,
      required,
      rest,
      selectedOptions,
    ]);

    return (
      <>
        {renderLabel}
        <div {...getComboboxProps()}>{renderInput}</div>
        <StyledMenuContainer ref={popperRef} style={styles.popper} {...attributes.poppper}>
          <List
            action={action}
            addItem={addSelectedItem}
            autoWidth={autoWidth}
            filteredItems={multiSelectOptions}
            getItemProps={getItemProps}
            getMenuProps={getMenuProps}
            highlightedIndex={highlightedIndex}
            isOpen={isOpen}
            items={options}
            maxHeight={maxHeight}
            removeItem={removeItem}
            selectedItems={selectedOptions}
          />
        </StyledMenuContainer>
      </>
    );
  },
);
