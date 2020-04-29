import { useCombobox, UseComboboxState, UseComboboxStateChangeOptions } from 'downshift';
import React, {
  cloneElement,
  createRef,
  isValidElement,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Manager, Popper, Reference } from 'react-popper';

import { useUniqueId } from '../../hooks';
import { typedMemo } from '../../utils';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { FlexItem } from '../Flex/Item';
import { FormControlLabel } from '../Form';
import { Input } from '../Input';
import { List } from '../List';
import { ListItem } from '../List/Item';
import { ListItemCheckbox } from '../List/Item/CheckboxItem';
import { SelectAction, SelectOption } from '../Select';
import { DropdownButton, StyledDropdownIcon, StyledInputContainer } from '../Select/styled';

import { MultiSelectProps } from './types';

export const MultiSelect = typedMemo(
  <T extends any>({
    action,
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
    positionFixed = false,
    required,
    style,
    value,
    ...rest
  }: MultiSelectProps<T>): ReturnType<React.FC<MultiSelectProps<T>>> => {
    // Merge options and action
    const initialOptions = useMemo(() => (action ? [...options, action] : options), [action, options]);

    const findSelectedOptions = useMemo(() => {
      return initialOptions.filter(
        (option) => value && value.find((val) => 'value' in option && val === option.value) !== undefined,
      ) as Array<SelectOption<T>>;
    }, [initialOptions, value]);

    const [items, setItems] = useState(initialOptions);
    const [inputValue, setInputValue] = useState('');
    const [selectedOptions, setSelectedOptions] = useState(findSelectedOptions);

    const defaultRef: RefObject<HTMLInputElement> = createRef();
    const multiSelectUniqueId = useUniqueId('multi-select');

    // Need to set items if options prop changes
    useEffect(() => setItems(initialOptions), [initialOptions]);

    useEffect(() => {
      setInputValue('');
    }, [selectedOptions]);

    useEffect(() => {
      setSelectedOptions(findSelectedOptions);
    }, [findSelectedOptions]);

    const handleSetInputValue = (changes: Partial<UseComboboxState<SelectOption<T> | SelectAction | null>>) => {
      if (filterable && changes.isOpen === true) {
        setItems(filterOptions(changes.inputValue));
      }

      setInputValue(changes.inputValue || '');
    };

    const filterOptions = (inputVal = '') => {
      return initialOptions.filter(
        (option) => option === action || option.content.toLowerCase().startsWith(inputVal.trim().toLowerCase()),
      );
    };

    const handleOnIsOpenChange = (changes: Partial<UseComboboxState<SelectOption<T> | SelectAction | null>>) => {
      if (filterable && changes.isOpen === false) {
        // Reset the items if filtered
        setItems(initialOptions);
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

        setItems(initialOptions);
      },
      [initialOptions, onOptionsChange, selectedOptions],
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

        setItems(initialOptions);
      },
      [initialOptions, onOptionsChange, selectedOptions],
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
    } = useCombobox<SelectOption<T> | SelectAction | null>({
      id: multiSelectUniqueId,
      inputId: id,
      inputValue,
      itemToString: (option) => (option ? option.content : ''),
      items,
      labelId,
      onInputValueChange: handleSetInputValue,
      onIsOpenChange: handleOnIsOpenChange,
      onSelectedItemChange: handleOnSelectedItemChange,
      selectedItem: null,
      stateReducer: handleStateReducer,
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
      return typeof label === 'string' ? (
        <FormControlLabel {...getLabelProps()} renderOptional={!required}>
          {label}
        </FormControlLabel>
      ) : null;
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
        <Reference>
          {({ ref }) => (
            <StyledInputContainer ref={ref}>
              <Input
                {...rest}
                {...getInputProps({
                  autoComplete: 'no',
                  disabled,
                  onFocus: openMenu,
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
                autoComplete="no"
                iconRight={renderToggle}
                readOnly={!filterable}
                required={required}
              />
            </StyledInputContainer>
          )}
        </Reference>
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

    const renderAction = useCallback(
      (actionItem: SelectAction) => {
        const index = options.length;
        const isHighlighted = highlightedIndex === index;

        const { content, disabled: itemDisabled, icon, onActionClick, ...itemProps } = actionItem;

        return (
          <Box borderTop="box" marginTop="xSmall" paddingTop="xSmall" key={`${content}-${index}`}>
            <ListItem
              {...itemProps}
              {...getItemProps({
                disabled: itemDisabled,
                item: actionItem,
                index,
              })}
              isAction={true}
              isHighlighted={isHighlighted}
            >
              {getContent(actionItem, isHighlighted)}
            </ListItem>
          </Box>
        );
      },
      [getItemProps, highlightedIndex, options.length],
    );

    const renderOptions = useMemo(() => {
      return items.map((item, index) => {
        if (action && item.content === action.content) {
          return renderAction(item as SelectAction);
        }

        const isHighlighted = highlightedIndex === index;
        const isChecked = 'value' in item && Boolean(selectedOptions.find((i) => i.value === item.value));

        const { content, disabled: itemDisabled, icon, ...itemProps } = item as SelectOption<T>;

        return (
          <ListItemCheckbox
            {...itemProps}
            {...getItemProps({
              disabled: itemDisabled,
              item,
              index,
            })}
            checked={isChecked}
            isHighlighted={isHighlighted}
            key={`${content}-${index}`}
            onClick={() => {
              if (itemDisabled) {
                return;
              }

              isChecked ? removeItem(item as SelectOption<T>) : addSelectedItem(item as SelectOption<T>);
            }}
          >
            {content}
          </ListItemCheckbox>
        );
      });
    }, [action, addSelectedItem, getItemProps, highlightedIndex, items, removeItem, renderAction, selectedOptions]);

    const renderList = useMemo(() => {
      return (
        <Popper
          modifiers={[{ name: 'offset', options: { offset: [0, 10] } }]}
          placement={placement}
          strategy={positionFixed ? 'fixed' : 'absolute'}
        >
          {({ placement: popperPlacement, ref, style: popperStyle, update }) => (
            <List
              {...getMenuProps({ ref })}
              data-placement={popperPlacement}
              maxHeight={maxHeight}
              style={popperStyle}
              update={update}
            >
              {renderOptions}
            </List>
          )}
        </Popper>
      );
    }, [getMenuProps, maxHeight, placement, positionFixed, renderOptions]);

    return (
      <div>
        <Manager>
          {renderLabel}
          <div {...getComboboxProps()}>{renderInput}</div>
          {isOpen && renderList}
        </Manager>
      </div>
    );
  },
);

const getContent = <T extends any>(item: SelectOption<T> | SelectAction, isHighlighted: boolean) => {
  const { icon } = item;

  return (
    <Flex alignItems="center" flexDirection="row">
      {icon && <FlexItem paddingRight="xSmall">{renderIcon(item, isHighlighted)}</FlexItem>}
      {item.content}
    </Flex>
  );
};

const renderIcon = <T extends any>(item: SelectOption<T> | SelectAction, isHighlighted: boolean) => {
  return (
    isValidElement(item.icon) &&
    cloneElement(item.icon, {
      color: iconColor(item, isHighlighted),
      size: 'large',
    })
  );
};

const iconColor = <T extends any>(item: SelectOption<T> | SelectAction, isHighlighted: boolean) => {
  if (item.disabled) {
    return 'secondary40';
  }

  if (!isHighlighted || !('onActionClick' in item)) {
    return 'secondary60';
  }

  return 'actionType' in item ? (item.actionType === 'destructive' ? 'danger50' : 'primary') : 'primary';
};
