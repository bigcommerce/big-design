import {
  useCombobox,
  UseComboboxState,
  UseComboboxStateChange,
  UseComboboxStateChangeOptions,
} from 'downshift';
import React, {
  cloneElement,
  ComponentPropsWithoutRef,
  createRef,
  isValidElement,
  RefObject,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { usePopper } from 'react-popper';

import { typedMemo, warning } from '../../utils';
import { Box } from '../Box';
import { FormControlLabel } from '../Form';
import { Input } from '../Input';
import { List } from '../List';
import { SelectAction, SelectOption, SelectOptionGroup } from '../Select';
import { DropdownButton, StyledDropdownIcon, StyledInputContainer } from '../Select/styled';

import { MultiSelectLocalization, MultiSelectProps } from './types';

export const defaultLocalization: MultiSelectLocalization = {
  selectAll: 'Select All',
};

export const MultiSelect = typedMemo(
  <T,>({
    action,
    autoComplete = 'off',
    autoWidth = false,
    className,
    disabled,
    filterable = true,
    selectAll = false,
    id,
    inputRef,
    label,
    labelId,
    localization = defaultLocalization,
    maxHeight,
    onClose,
    onOpen,
    onOptionsChange,
    options,
    placeholder,
    placement = 'bottom-start' as const,
    positionFixed = false,
    required,
    style,
    value,
    ...props
  }: MultiSelectProps<T>): ReturnType<React.FC<MultiSelectProps<T>>> => {
    const defaultRef: RefObject<HTMLInputElement> = createRef();
    const multiSelectUniqueId = useId();

    const [inputValue, setInputValue] = useState('');

    // aria-labelledby takes presedence over aria-label so we need to strip it out if there is no label
    // Downshift v7 automatically adds aria-labelledby to props even if there is no label defined
    // This is a workaround to remove the aria-labelledby if there is no label defined
    const ariaLabelledBy = useMemo(() => {
      if (props['aria-label'] && !label) {
        return { 'aria-labelledby': undefined };
      }

      return {};
    }, [label, props]);

    const flattenOptions = useCallback((options: MultiSelectProps<T>['options']) => {
      const isGroups = (
        options: Array<SelectOptionGroup<T> | SelectOption<T>>,
      ): options is Array<SelectOptionGroup<T>> =>
        options.every((option) => 'options' in option && !('value' in option));

      return isGroups(options)
        ? options.map((group) => group.options).reduce((acum, curr) => acum.concat(curr), [])
        : options;
    }, []);

    // We need to pass Downshift only options without groups for accessibility tracking
    const flattenedOptions = useMemo(
      () => (action ? [...flattenOptions(options), action] : flattenOptions(options)),
      [action, flattenOptions, options],
    );

    // Find the selected options
    const selectedOptions = useMemo(() => {
      return (
        flattenedOptions.filter(
          (option): option is SelectOption<T> =>
            'value' in option && !!value && value.find((val) => val === option.value) !== undefined,
        ) || []
      );
    }, [flattenedOptions, value]);

    // Initialize with flattened options
    const [filteredOptions, setFilteredOptions] = useState(flattenedOptions);

    // Need to set items if options prop changes
    useEffect(() => setFilteredOptions(flattenedOptions), [flattenedOptions]);

    useEffect(() => {
      setInputValue('');
    }, [selectedOptions]);

    const getFirstMatchingOptionIndex = (
      filteredOptions: Array<SelectOption<T> | SelectAction>,
    ) => {
      return filteredOptions.findIndex((option) => !option.disabled);
    };

    const handleSetInputValue = ({
      inputValue,
      isOpen,
    }: Partial<UseComboboxState<SelectOption<T> | SelectAction | null>>) => {
      if (filterable && isOpen === true) {
        const newFilteredOptions = filterOptions(inputValue);
        const firstMatchingOptionIndex = getFirstMatchingOptionIndex(newFilteredOptions);

        setFilteredOptions(newFilteredOptions);

        // Auto highlight first matching option
        setHighlightedIndex(firstMatchingOptionIndex);
      }

      setInputValue(inputValue || '');
    };

    const filterOptions = (inputVal = '') => {
      return flattenedOptions.filter(
        (option) =>
          option === action ||
          option.content.toLowerCase().startsWith(inputVal.trim().toLowerCase()),
      );
    };

    const handleOnIsOpenChange = ({
      isOpen,
    }: Partial<UseComboboxState<SelectOption<T> | SelectAction | null>>) => {
      if (filterable && !isOpen) {
        // Reset the items if filtered
        setFilteredOptions(flattenedOptions);
      }

      if (isOpen && typeof onOpen === 'function') {
        onOpen();
      }

      if (!isOpen && typeof onClose === 'function') {
        onClose();
      }
    };

    const handleOnSelectedItemChange = (
      changes: Partial<UseComboboxStateChange<SelectOption<T> | SelectAction | null>>,
    ) => {
      if (action && changes.selectedItem === action) {
        action.onActionClick(inputValue);

        return;
      }

      // Item clicks are handled by event handles, but we need to manually
      // process changes triggered by keyboard input using highlighted index
      if (
        changes.type === useCombobox.stateChangeTypes.InputKeyDownEnter &&
        changes.selectedItem &&
        'value' in changes.selectedItem
      ) {
        const isChecked = Boolean(
          selectedOptions.find(
            (i) =>
              changes.selectedItem &&
              'value' in changes.selectedItem &&
              i.value === changes.selectedItem.value,
          ),
        );

        isChecked ? removeItem(changes.selectedItem) : addSelectedItem(changes.selectedItem);
      }
    };

    const handleStateReducer = (
      state: UseComboboxState<SelectOption<T> | SelectAction | null>,
      actionAndChanges: UseComboboxStateChangeOptions<SelectOption<T> | SelectAction | null>,
    ) => {
      switch (actionAndChanges.type) {
        case useCombobox.stateChangeTypes.InputBlur:
          return { ...actionAndChanges.changes, inputValue: '' };

        // ARIA 1.2 requires the listbox to open on input click
        case useCombobox.stateChangeTypes.InputClick:
          return {
            ...actionAndChanges.changes,
            highlightedIndex: getFirstMatchingOptionIndex(filteredOptions),
            isOpen: true,
          };

        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick: {
          if (!actionAndChanges.changes.selectedItem) {
            return actionAndChanges.changes;
          }

          const isSelectAction = (item: SelectAction | SelectOption<T>): item is SelectAction =>
            item === action;

          // Prevent action from changing the input value
          if (isSelectAction(actionAndChanges.changes.selectedItem)) {
            return { ...actionAndChanges.changes, inputValue: state.inputValue };
          }

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

        const newOptions = selectedOptions.filter((i) => i.value !== item.value) || [];

        onOptionsChange(
          newOptions.map((option) => option.value),
          newOptions,
        );

        setFilteredOptions(flattenedOptions);
      },
      [flattenedOptions, onOptionsChange, selectedOptions],
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

        setFilteredOptions(flattenedOptions);
      },
      [flattenedOptions, onOptionsChange, selectedOptions],
    );

    const {
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      getToggleButtonProps,
      highlightedIndex,
      isOpen,
      openMenu,
      setHighlightedIndex,
    } = useCombobox({
      id: multiSelectUniqueId,
      initialHighlightedIndex: 0,
      inputId: id,
      inputValue,
      itemToString: (option) => (option ? option.content : ''),
      items: [
        ...(selectAll
          ? // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            ([{ content: localization?.selectAll, value: 'select-all' }] as Array<SelectOption<T>>)
          : []),
        ...filteredOptions,
      ],
      labelId,
      onInputValueChange: handleSetInputValue,
      onIsOpenChange: handleOnIsOpenChange,
      onSelectedItemChange: handleOnSelectedItemChange,
      selectedItem: null,
      stateReducer: handleStateReducer,
    });

    // Popper
    const referenceRef = useRef(null);
    const popperRef = useRef(null);

    const { styles, attributes, update } = usePopper(referenceRef.current, popperRef.current, {
      modifiers: [
        {
          name: 'eventListeners',
          options: {
            scroll: isOpen,
            resize: isOpen,
          },
        },
        {
          name: 'offset',
          options: {
            offset: [0, 4],
          },
        },
      ],
      strategy: positionFixed ? 'fixed' : 'absolute',
      placement,
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
          <FormControlLabel {...getLabelProps()} renderRequired={required}>
            {label}
          </FormControlLabel>
        );
      }

      if (
        isValidElement<ComponentPropsWithoutRef<'label'>>(label) &&
        label.type === FormControlLabel
      ) {
        return cloneElement(label, getLabelProps());
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
            {...getInputProps({
              ...props,
              ...ariaLabelledBy,
              autoComplete,
              disabled,
              onClick: () => {
                !isOpen && openMenu();
              },
              onFocus: (event) => {
                if (typeof props.onFocus === 'function') {
                  props.onFocus(event);
                }
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

                    if (!isOpen) {
                      openMenu();
                      // https://github.com/downshift-js/downshift/issues/734
                      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-unsafe-member-access
                      (event.nativeEvent as any).preventDownshiftDefault = true;
                    }

                    break;

                  case 'Escape':
                    // Reset select
                    if (!isOpen) {
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
              onDelete: disabled ? undefined : () => removeItem(option),
            }))}
            iconRight={renderToggle}
            readOnly={!filterable}
            required={required && selectedOptions.length === 0}
          />
        </StyledInputContainer>
      );
    }, [
      autoComplete,
      ariaLabelledBy,
      disabled,
      filterable,
      getInputProps,
      getInputRef,
      inputValue,
      isOpen,
      onOptionsChange,
      openMenu,
      placeholder,
      props,
      removeItem,
      renderToggle,
      required,
      selectedOptions,
    ]);

    const handleUpdateItems = (items: Array<SelectOption<T>>) =>
      onOptionsChange(
        items.map((option) => option.value),
        items,
      );

    return (
      <div>
        {renderLabel}
        {renderInput}
        <Box ref={popperRef} style={styles.popper} {...attributes.poppper} zIndex="popover">
          <List
            {...ariaLabelledBy}
            action={action}
            addItem={addSelectedItem}
            autoWidth={autoWidth}
            filteredItems={filteredOptions}
            getItemProps={getItemProps}
            getMenuProps={getMenuProps}
            highlightedIndex={highlightedIndex}
            isOpen={isOpen}
            items={options}
            localization={{ selectAll: localization.selectAll }}
            maxHeight={maxHeight}
            removeItem={removeItem}
            selectAll={selectAll}
            selectedItems={selectedOptions}
            update={update}
            updateItems={selectAll ? handleUpdateItems : undefined}
          />
        </Box>
      </div>
    );
  },
);
