import { useCombobox, UseComboboxState, UseComboboxStateChangeOptions } from 'downshift';
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
    localization,
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
    const selectUniqueId = useId();

    // aria-labelledby takes presedence over aria-label so we need to strip it out if there is no label
    // Downshift v7 automatically adds aria-labelledby to props even if there is no label defined
    // This is a workaround to remove the aria-labelledby if there is no label defined
    const ariaLabelledBy = useMemo(() => {
      if (props['aria-label'] && !label) {
        return { 'aria-labelledby': undefined };
      }

      return {};
    }, [label, props]);

    const flattenOptions = useCallback((options: SelectProps<T>['options']) => {
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

    // Find the selected option
    const selectedOption = useMemo(() => {
      return flattenedOptions.find(
        (option): option is SelectOption<T> => 'value' in option && option.value === value,
      );
    }, [flattenedOptions, value]);

    const selectedOptionIndex = useMemo(() => {
      return flattenedOptions.findIndex(
        (option): option is SelectOption<T> => 'value' in option && option.value === value,
      );
    }, [flattenedOptions, value]);

    const [inputValue, setInputValue] = useState<string | undefined>(selectedOption?.content || '');

    // Initialize with flattened options
    const [filteredOptions, setFilteredOptions] = useState(flattenedOptions);

    // Need to set select options if options prop changes
    useEffect(() => setFilteredOptions(flattenedOptions), [flattenedOptions]);

    const getFirstMatchingOptionIndex = (
      filteredOptions: Array<SelectOption<T> | SelectAction>,
    ) => {
      return filteredOptions.findIndex((option) => !option.disabled);
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

    const handleOnInputValueChange = ({
      inputValue,
      isOpen,
    }: Partial<UseComboboxState<SelectOption<T> | SelectAction | null>>) => {
      // Filter only when List is open
      if (filterable && isOpen === true) {
        const newFilteredOptions = filterOptions(inputValue);
        const firstMatchingOptionIndex = getFirstMatchingOptionIndex(newFilteredOptions);

        setFilteredOptions(newFilteredOptions);

        // Auto highlight first matching option
        if (inputValue !== '') {
          setHighlightedIndex(firstMatchingOptionIndex);
        } else if (selectedItem) {
          const selectedItemIndex = flattenedOptions.indexOf(selectedItem);

          setHighlightedIndex(selectedItemIndex);
        }
      }

      setInputValue(inputValue || '');
    };

    const filterOptions = (inputVal = '') => {
      return flattenedOptions.filter(
        (option) =>
          option.content === (action && action.content) ||
          option.content.toLowerCase().startsWith(inputVal.trim().toLowerCase()),
      );
    };

    const handleOnIsOpenChange = ({
      isOpen,
    }: Partial<UseComboboxState<SelectOption<T> | SelectAction | null>>) => {
      if (filterable && !isOpen) {
        // Reset the options when the List is closed
        setFilteredOptions(flattenedOptions);
      }

      if (isOpen && typeof onOpen === 'function') {
        onOpen();
      }

      if (!isOpen && typeof onClose === 'function') {
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

        // ARIA 1.2 requires the listbox to open on input click
        case useCombobox.stateChangeTypes.InputClick:
          return {
            ...actionAndChanges.changes,
            highlightedIndex: selectedOptionIndex || getFirstMatchingOptionIndex(filteredOptions),
            isOpen: true,
          };

        default:
          return actionAndChanges.changes;
      }
    };

    const {
      closeMenu,
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
      isItemDisabled: (item) => item?.disabled ?? false,
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
          <FormControlLabel
            {...getLabelProps()}
            localization={localization}
            renderOptional={!required}
          >
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
    }, [getLabelProps, label, localization, required]);

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
                  case 'Enter':
                    event.preventDefault();

                    if (isOpen === false) {
                      openMenu();
                      // https://github.com/downshift-js/downshift/issues/734
                      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions,  @typescript-eslint/no-unsafe-member-access
                      (event.nativeEvent as any).preventDownshiftDefault = true;
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
                    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-unsafe-member-access
                    (event.nativeEvent as any).preventDownshiftDefault = true;
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
            localization={localization}
          />
        </StyledInputContainer>
      );
    }, [
      getInputProps,
      props,
      ariaLabelledBy,
      autoComplete,
      disabled,
      placeholder,
      getInputRef,
      filterable,
      required,
      selectedItem?.icon,
      renderToggle,
      localization,
      isOpen,
      openMenu,
      onOptionChange,
      closeMenu,
    ]);

    return (
      <div>
        {renderLabel}
        {renderInput}
        <Box ref={popperRef} style={styles.popper} {...attributes.poppper} zIndex="popover">
          <List
            {...ariaLabelledBy}
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
