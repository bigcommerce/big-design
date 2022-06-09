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
import { Box } from '../Box';
import { FormControlLabel } from '../Form';
import { Input } from '../Input';
import { List } from '../List';
import { SelectOption, SelectOptionGroup, SelectProps } from '../Select';
import { DropdownButton, StyledDropdownIcon, StyledInputContainer } from '../Select/styled';
import { SelectAction } from '../Select/types';

export const Select = typedMemo(
  <T,>({
    action,
    autoComplete = 'off',
    autoWidth = false,
    className,
    disabled,
    filterable = true,
    id,
    inputRef,
    label,
    labelId,
    maxHeight,
    onClose,
    onOpen,
    onOptionChange,
    options,
    placeholder,
    placement = 'bottom-start' as const,
    positionFixed = false,
    required,
    style,
    value,
    ...props
  }: SelectProps<T>): ReturnType<React.FC<SelectProps<T>>> => {
    const defaultRef: RefObject<HTMLInputElement> = createRef();
    const selectUniqueId = useUniqueId('select');

    const [inputValue, setInputValue] = useState<string | undefined>('');

    const flattenOptions = useCallback((optionsToFlatten: SelectProps<T>['options']) => {
      const isGroups = (
        groupOptions: Array<SelectOptionGroup<T> | SelectOption<T>>,
      ): groupOptions is Array<SelectOptionGroup<T>> =>
        groupOptions.every((option) => 'options' in option && !('value' in option));

      return isGroups(optionsToFlatten)
        ? optionsToFlatten
            .map((group) => group.options)
            .reduce((acum, curr) => acum.concat(curr), [])
        : optionsToFlatten;
    }, []);

    // We need to pass Downshift only options without groups for accessibility tracking
    const flattenedOptions = useMemo(
      () => (action ? [...flattenOptions(options), action] : flattenOptions(options)),
      [action, flattenOptions, options],
    );

    // Find the selected option
    const selectedOption = useMemo(() => {
      return flattenedOptions.find(
        (option): option is SelectOption<T> => 'value' in option && option.value === value,
      );
    }, [flattenedOptions, value]);

    // Initialize with flattened options
    const [filteredOptions, setFilteredOptions] = useState(flattenedOptions);

    // Need to set select options if options prop changes
    useEffect(() => setFilteredOptions(flattenedOptions), [flattenedOptions]);

    const getFirstMatchingOptionIndex = (
      localFilteredOptions: Array<SelectOption<T> | SelectAction>,
    ) => {
      return localFilteredOptions.findIndex((option) => !option.disabled);
    };

    const handleOnSelectedItemChange = (
      changes: Partial<UseComboboxState<SelectOption<T> | SelectAction | null>>,
    ) => {
      if (action && changes.selectedItem && changes.selectedItem.content === action.content) {
        action.onActionClick(inputValue || null);
      } else if (
        changes.selectedItem &&
        'value' in changes.selectedItem &&
        typeof onOptionChange === 'function'
      ) {
        onOptionChange(changes.selectedItem.value, changes.selectedItem);
      }
    };

    const filterOptions = (inputVal = '') => {
      return flattenedOptions.filter(
        (option) =>
          option.content === (action && action.content) ||
          option.content.toLowerCase().startsWith(inputVal.trim().toLowerCase()),
      );
    };

    const handleOnIsOpenChange = ({
      isOpen: localIsOpen,
    }: Partial<UseComboboxState<SelectOption<T> | SelectAction | null>>) => {
      if (filterable && !localIsOpen) {
        // Reset the options when the List is closed
        setFilteredOptions(flattenedOptions);
      }

      if (localIsOpen && typeof onOpen === 'function') {
        onOpen();
      }

      if (!localIsOpen && typeof onClose === 'function') {
        onClose();
      }
    };

    const handleStateReducer = (
      _state: UseComboboxState<SelectOption<T> | SelectAction | null>,
      actionAndChanges: UseComboboxStateChangeOptions<SelectOption<T> | SelectAction | null>,
    ) => {
      switch (actionAndChanges.type) {
        case useCombobox.stateChangeTypes.InputBlur:
          return {
            ...actionAndChanges.changes,
            inputValue: selectedOption ? selectedOption.content : '',
          };

        default:
          return actionAndChanges.changes;
      }
    };

    const handleOnInputValueChange = ({
      inputValue: inputValueArgument,
      isOpen: localIsOpen,
    }: Partial<UseComboboxState<SelectOption<T> | SelectAction | null>>) => {
      // Filter only when List is open
      if (filterable && localIsOpen === true) {
        const newFilteredOptions = filterOptions(inputValueArgument);
        const firstMatchingOptionIndex = getFirstMatchingOptionIndex(newFilteredOptions);

        setFilteredOptions(newFilteredOptions);

        // Auto highlight first matching option
        if (inputValueArgument !== '') {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          setHighlightedIndex(firstMatchingOptionIndex);
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
        } else if (selectedItem) {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          const selectedItemIndex = flattenedOptions.indexOf(selectedItem);

          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          setHighlightedIndex(selectedItemIndex);
        }
      }

      setInputValue(inputValueArgument || '');
    };

    const {
      closeMenu,
      getComboboxProps,
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      getToggleButtonProps,
      highlightedIndex,
      isOpen,
      openMenu,
      selectedItem,
      setHighlightedIndex,
    } = useCombobox({
      id: selectUniqueId,
      inputId: id,
      inputValue,
      itemToString: (item) => (item ? item.content : ''),
      items: filteredOptions,
      labelId,
      onInputValueChange: handleOnInputValueChange,
      onIsOpenChange: handleOnIsOpenChange,
      onSelectedItemChange: handleOnSelectedItemChange,
      selectedItem: selectedOption || null,
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
              autoComplete,
              disabled,
              onClick: () => {
                if (isOpen) {
                  return;
                }

                openMenu();
              },
              onFocus: (event) => {
                if (typeof props.onFocus === 'function') {
                  props.onFocus(event);
                }
              },
              onKeyDown: (event) => {
                switch (event.key) {
                  case 'Enter':
                    event.preventDefault();

                    if (isOpen === false) {
                      openMenu();
                      // https://github.com/downshift-js/downshift/issues/734
                      // @ts-expect-error downshift ts issue
                      event.nativeEvent.preventDownshiftDefault = true;
                    }

                    break;

                  case 'Escape':
                    if (isOpen === false) {
                      // Reset the value to empty
                      onOptionChange();
                    } else {
                      closeMenu();
                    }

                    // https://github.com/downshift-js/downshift/issues/734
                    // @ts-expect-error downshift ts issue
                    event.nativeEvent.preventDownshiftDefault = true;
                    break;
                }
              },
              placeholder,
              ref: getInputRef(),
              readOnly: !filterable,
              required,
            })}
            iconLeft={selectedItem?.icon}
            iconRight={renderToggle}
          />
        </StyledInputContainer>
      );
    }, [
      autoComplete,
      closeMenu,
      disabled,
      filterable,
      getInputProps,
      getInputRef,
      isOpen,
      onOptionChange,
      openMenu,
      placeholder,
      props,
      renderToggle,
      required,
      selectedItem,
    ]);

    return (
      <div>
        {renderLabel}
        <div {...getComboboxProps()}>{renderInput}</div>
        <Box ref={popperRef} style={styles.popper} {...attributes.poppper} zIndex="popover">
          <List
            action={action}
            autoWidth={autoWidth}
            filteredItems={filteredOptions}
            getItemProps={getItemProps}
            getMenuProps={getMenuProps}
            highlightedIndex={highlightedIndex}
            isOpen={isOpen}
            items={options}
            maxHeight={maxHeight}
            selectedItem={selectedItem && 'value' in selectedItem ? selectedItem : null}
            update={update}
          />
        </Box>
      </div>
    );
  },
);
