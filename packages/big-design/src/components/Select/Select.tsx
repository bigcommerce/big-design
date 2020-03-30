import { CheckIcon } from '@bigcommerce/big-design-icons';
import { useCombobox, UseComboboxState, UseComboboxStateChangeOptions } from 'downshift';
import React, { createRef, useCallback, useEffect, useMemo, useRef, useState, Fragment, RefObject } from 'react';
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

import { DropdownButton, StyledDropdownIcon, StyledInputContainer, StyledListGroupHeader } from './styled';
import { SelectAction, SelectOption, SelectOptionGroup, SelectProps } from './types';

export const Select = typedMemo(
  <T extends any>({
    action,
    className,
    disabled,
    filterable = true,
    inputRef,
    id,
    label,
    labelId,
    maxHeight = 250,
    onOptionChange,
    options,
    placeholder,
    placement = 'bottom-start' as 'bottom-start',
    positionFixed = false,
    required,
    style,
    value,
    ...rest
  }: SelectProps<T>): ReturnType<React.FC<SelectProps<T>>> => {
    const isGroup = useCallback((item: SelectOption<T> | SelectOptionGroup<T>) => {
      return 'options' in item && !('value' in item);
    }, []);

    const flattenOptions = useCallback(
      (items: Array<SelectOption<T> | SelectOptionGroup<T>>): Array<SelectOption<T>> => {
        return items.every(isGroup)
          ? (items as Array<SelectOptionGroup<T>>)
              .map((group: SelectOptionGroup<T>) => group.options)
              .reduce((acc, curr) => acc.concat(curr), [])
          : (items as Array<SelectOption<T>>);
      },
      [isGroup],
    );

    // Merge options and action
    const flattenedOptions = useMemo(() => (action ? [...flattenOptions(options), action] : flattenOptions(options)), [
      action,
      flattenOptions,
      options,
    ]);

    const itemKey = useRef(0);

    const findSelectedOption = useMemo(() => {
      return flattenedOptions.find(option => 'value' in option && option.value === value) as
        | SelectOption<T>
        | undefined;
    }, [flattenedOptions, value]);

    const [selectOptions, setSelectOptions] = useState(flattenedOptions);
    const [inputValue, setInputValue] = useState(findSelectedOption ? findSelectedOption.content : '');
    const [selectedOption, setSelectedOption] = useState(findSelectedOption);
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    const defaultRef: RefObject<HTMLInputElement> = createRef();
    const selectUniqueId = useUniqueId('select');

    // Set the input's value to match the selected item
    useEffect(() => {
      setInputValue(selectedOption ? selectedOption.content : '');
    }, [selectedOption]);

    useEffect(() => {
      setSelectedOption(findSelectedOption);
    }, [findSelectedOption]);

    const findSelectedOptionIndex = useMemo(() => {
      return selectOptions.findIndex(item => 'value' in item && item.value === value);
    }, [selectOptions, value]);

    useEffect(() => {
      setHighlightedIndex(findSelectedOptionIndex);
    }, [findSelectedOptionIndex]);

    const handleSetInputValue = (changes: Partial<UseComboboxState<SelectOption<T> | SelectAction | null>>) => {
      if (filterable && changes.isOpen === true) {
        setSelectOptions(filterOptions(changes.inputValue));
      }

      setInputValue(changes.inputValue || '');
    };

    const filterOptions = (inputVal: string = '') => {
      return flattenedOptions.filter(
        option =>
          option.content === (action && action.content) ||
          option.content.toLowerCase().startsWith(inputVal.trim().toLowerCase()),
      );
    };

    const handleOnHighlightedIndexChange = (
      changes: Partial<UseComboboxState<SelectOption<T> | SelectAction | null>>,
    ) => {
      if (typeof changes.highlightedIndex !== 'undefined' && changes.highlightedIndex > -1) {
        setHighlightedIndex(changes.highlightedIndex);
      }
    };

    const handleOnIsOpenChange = (changes: Partial<UseComboboxState<SelectOption<T> | SelectAction | null>>) => {
      if (filterable && changes.isOpen === false) {
        // Reset the items if filtered
        setSelectOptions(flattenedOptions);
      }
    };

    const handleOnSelectedItemChange = (changes: Partial<UseComboboxState<SelectOption<T> | SelectAction | null>>) => {
      if (action && changes.selectedItem && changes.selectedItem.content === action.content) {
        action.onActionClick(inputValue);
      } else if (changes.selectedItem && 'value' in changes.selectedItem && typeof onOptionChange === 'function') {
        onOptionChange(changes.selectedItem.value, changes.selectedItem);
      }
    };

    const handleStateReducer = (
      state: UseComboboxState<SelectOption<T> | SelectAction | null>,
      actionAndChanges: UseComboboxStateChangeOptions<SelectOption<T> | SelectAction | null>,
    ) => {
      switch (actionAndChanges.type) {
        case useCombobox.stateChangeTypes.InputBlur:
          return { ...actionAndChanges.changes, inputValue: selectedOption ? selectedOption.content : '' };
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (
            (actionAndChanges.changes.selectedItem && actionAndChanges.changes.selectedItem.content) ===
            (action && action.content)
          ) {
            return { ...actionAndChanges.changes, inputValue: state.inputValue };
          }
        default:
          return actionAndChanges.changes;
      }
    };

    const {
      closeMenu,
      getComboboxProps,
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      getToggleButtonProps,
      isOpen,
      openMenu,
    } = useCombobox<SelectOption<T> | SelectAction | null>({
      highlightedIndex,
      id: selectUniqueId,
      inputId: id,
      inputValue,
      itemToString: option => (option ? option.content : ''),
      items: selectOptions,
      labelId,
      onHighlightedIndexChange: handleOnHighlightedIndexChange,
      onInputValueChange: handleSetInputValue,
      onIsOpenChange: handleOnIsOpenChange,
      onSelectedItemChange: handleOnSelectedItemChange,
      selectedItem: selectedOption || null,
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
                  onKeyDown: event => {
                    switch (event.key) {
                      case 'Enter':
                        event.preventDefault();
                        if (isOpen === false) {
                          openMenu();
                          (event.nativeEvent as any).preventDownshiftDefault = true;
                        }
                        break;
                      case 'Escape':
                        if (isOpen === false) {
                          // reset select
                          onOptionChange();
                          setHighlightedIndex(-1);
                        } else {
                          closeMenu();
                        }
                        (event.nativeEvent as any).preventDownshiftDefault = true;
                        break;
                    }
                  },
                  placeholder,
                  ref: getInputRef(),
                })}
                iconRight={renderToggle}
                readOnly={!filterable}
                required={required}
              />
            </StyledInputContainer>
          )}
        </Reference>
      );
    }, [
      closeMenu,
      disabled,
      filterable,
      getInputProps,
      getInputRef,
      isOpen,
      onOptionChange,
      openMenu,
      placeholder,
      renderToggle,
      required,
      rest,
    ]);

    const renderAction = useCallback(
      (actionItem: SelectAction) => {
        const index = selectOptions.length - 1;
        const isHighlighted = highlightedIndex === index;
        const { disabled: itemDisabled, content, icon, onActionClick, ...itemProps } = actionItem;

        return (
          <Box borderTop="box" marginTop="xSmall" paddingTop="xSmall" key={`${content}-${index}`}>
            <ListItem
              {...itemProps}
              {...getItemProps({
                disabled: itemDisabled,
                index,
                item: actionItem,
              })}
              isAction={true}
              isHighlighted={isHighlighted}
            >
              {getContent(actionItem, isHighlighted)}
            </ListItem>
          </Box>
        );
      },
      [getItemProps, highlightedIndex, selectOptions.length],
    );

    const renderOptions = useCallback(
      (items: Array<SelectOption<T>>) => {
        return (
          isOpen &&
          items.map(item => {
            if (
              !selectOptions.find(
                (option: SelectOption<T> | SelectAction) => 'value' in option && option.value === item.value,
              )
            ) {
              return null;
            }
            const key = itemKey.current;

            itemKey.current += 1;

            const isHighlighted = highlightedIndex === key;
            const isSelected = selectedOption ? 'value' in item && selectedOption.value === item.value : false;

            const { disabled: itemDisabled, content, icon, ...itemProps } = item;

            return (
              <ListItem
                {...itemProps}
                {...getItemProps({
                  disabled: itemDisabled,
                  index: key,
                  item,
                })}
                isHighlighted={isHighlighted}
                isSelected={isSelected}
                key={`${content}-${key}`}
              >
                {getContent(item, isHighlighted)}
                {isSelected && <CheckIcon color="primary" size="large" />}
              </ListItem>
            );
          })
        );
      },
      [getItemProps, highlightedIndex, isOpen, selectedOption, selectOptions],
    );

    const renderGroup = useCallback(
      (group: SelectOptionGroup<T>) => {
        return (
          <>
            <StyledListGroupHeader role="group">{group.label.toUpperCase()}</StyledListGroupHeader>
            {renderOptions(group.options)}
          </>
        );
      },
      [renderOptions],
    );

    const renderChildren = useMemo(() => {
      itemKey.current = 0;

      if (Array.isArray(options) && options.every(isGroup)) {
        return (
          isOpen && (
            <>
              {(options as Array<SelectOptionGroup<T>>).map((group, index) => (
                <Fragment key={index}>{renderGroup(group)}</Fragment>
              ))}
              {action && renderAction(action)}
            </>
          )
        );
      }

      if (
        Array.isArray(options) &&
        options.every((item: SelectOption<T> | SelectOptionGroup<T>) => {
          return 'value' in item && !('options' in item);
        })
      ) {
        return (
          isOpen && (
            <>
              {renderOptions(options as Array<SelectOption<T>>)}
              {action && renderAction(action)}
            </>
          )
        );
      }
    }, [action, isGroup, isOpen, options, renderAction, renderGroup, renderOptions]);

    const renderList = useMemo(() => {
      return (
        <Popper eventsEnabled={isOpen} modifiers={{ offset: { offset: '0, 10' } }} placement={placement}>
          {({ placement: popperPlacement, ref, scheduleUpdate, style: popperStyle }) => (
            <List
              {...getMenuProps({ ref })}
              data-placement={popperPlacement}
              isOpen={isOpen}
              maxHeight={maxHeight}
              positionFixed={positionFixed}
              scheduleUpdate={scheduleUpdate}
              style={popperStyle}
            >
              {renderChildren}
            </List>
          )}
        </Popper>
      );
    }, [getMenuProps, isOpen, maxHeight, placement, positionFixed, renderChildren]);

    return (
      <div>
        <Manager>
          {renderLabel}
          <div {...getComboboxProps()}>{renderInput}</div>
          {renderList}
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
    React.isValidElement(item.icon) &&
    React.cloneElement(item.icon, {
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
