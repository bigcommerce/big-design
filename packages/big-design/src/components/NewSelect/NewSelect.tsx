import { CheckIcon, useUniqueId } from '@bigcommerce/big-design-icons';
import { useCombobox, UseComboboxState } from 'downshift';
import React, {
  cloneElement,
  createRef,
  Fragment,
  isValidElement,
  memo,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { typedMemo, warning } from '../../utils';
import { Box } from '../Box';
import { Flex, FlexItem } from '../Flex';
import { FormControlLabel } from '../Form';
import { Input } from '../Input';
import { ListGroupHeader } from '../List/GroupHeader';
import { StyledListItem } from '../List/Item/styled';
import { StyledList } from '../List/styled';
import { SelectOption, SelectOptionGroup, SelectProps } from '../Select';
import { DropdownButton, StyledDropdownIcon, StyledInputContainer } from '../Select/styled';
import { SelectAction } from '../Select/types';
import { Small } from '../Typography';

const Menu = typedMemo(
  <T extends any>({
    action,
    autoWidth,
    options,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    maxHeight,
    selectedItem,
    selectOptions,
  }: any) => {
    const itemKey = useRef(0);

    const renderAction = useCallback(
      (action: SelectAction) => {
        const key = itemKey.current;

        return (
          <Box borderTop="box" marginTop="xSmall" paddingTop="xSmall">
            <Item
              autoWidth={autoWidth}
              key="action"
              getItemProps={getItemProps}
              item={action}
              index={key}
              isHighlighted={highlightedIndex === key}
              isAction={true}
            />
          </Box>
        );
      },
      [getItemProps, autoWidth, highlightedIndex],
    );

    const renderOptions = useCallback(
      (items: Array<SelectOption<T>>) => {
        console.log(items);

        return items.map((item) => {
          // Skip rendering the option if it not found in the filtered list
          if (
            !selectOptions.find(
              (option: SelectOption<T> | SelectAction) => 'value' in option && option.value === item.value,
            )
          ) {
            return null;
          }
          const key = itemKey.current;
          itemKey.current += 1;

          return (
            <Item
              autoWidth={autoWidth}
              key={item.value}
              getItemProps={getItemProps}
              item={item}
              index={key}
              isHighlighted={highlightedIndex === key}
              isSelected={selectedItem?.value === item.value}
            />
          );
        });
      },
      [getItemProps, autoWidth, highlightedIndex, selectedItem, selectOptions],
    );

    const renderGroup = useCallback(
      (group: SelectOptionGroup<T>) => {
        return (
          <>
            <ListGroupHeader>{group.label}</ListGroupHeader>
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
          <>
            {(options as Array<SelectOptionGroup<T>>).map((group, index) => (
              <Fragment key={index}>{renderGroup(group)}</Fragment>
            ))}
            {action && renderAction(action)}
          </>
        );
      }

      console.log('before', options);
      if (
        Array.isArray(options) &&
        options.every((item: SelectOption<T> | SelectOptionGroup<T>) => {
          return 'value' in item && !('options' in item);
        })
      ) {
        console.log('inside', options);

        return (
          <>
            {renderOptions(options as Array<SelectOption<T>>)}
            {action && renderAction(action)}
          </>
        );
      }
    }, [action, renderAction, renderGroup, renderOptions, options]);

    return <StyledList {...getMenuProps({ maxHeight })}>{renderChildren}</StyledList>;
  },
);

const Item = memo(({ getItemProps, isHighlighted, item, index, isSelected, selectedItem, ...props }: any) => {
  console.log(item);

  return (
    <StyledListItem
      {...getItemProps({
        index,
        item,
        isHighlighted,
        isSelected,
        ...props,
      })}
    >
      {getContent(item, isHighlighted)}
      {isSelected && <CheckIcon color="primary" size="large" />}
    </StyledListItem>
  );
});

export const NewSelect = typedMemo(
  <T extends any>({
    action,
    autoWidth = false,
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
    // placement = 'bottom-start' as 'bottom-start',
    // positionFixed = false,
    required,
    style,
    value,
    ...props
  }: SelectProps<T>): ReturnType<React.FC<SelectProps<T>>> => {
    const [inputValue, setInputValue] = useState<string | undefined>('');

    const defaultRef: RefObject<HTMLInputElement> = createRef();
    const selectUniqueId = useUniqueId('select');

    // We need to pass Downshift only options without groups for accessibility tracking
    const items = useMemo(() => (action ? [...flattenOptions(options), action] : flattenOptions(options)), [
      action,
      options,
    ]);

    const selectedOption = useMemo(() => {
      return items.find((item) => 'value' in item && item.value === value) as SelectOption<T> | undefined;
    }, [items, value]);

    const [selectOptions, setSelectOptions] = useState(items);

    // Need to set select options if options prop changes
    useEffect(() => setSelectOptions(items), [items]);

    const handleOnSelectedItemChange = (changes: Partial<UseComboboxState<SelectOption<T> | SelectAction | null>>) => {
      if (action && changes.selectedItem && changes.selectedItem.content === action.content) {
        // action.onActionClick(inputValue);
      } else if (changes.selectedItem && 'value' in changes.selectedItem && typeof onOptionChange === 'function') {
        onOptionChange(changes.selectedItem.value, changes.selectedItem);
      }
    };

    const handleOnInputValueChange = ({
      isOpen,
      inputValue,
    }: Partial<UseComboboxState<SelectOption<T> | SelectAction | null>>) => {
      console.log(isOpen, inputValue);
      if (filterable && isOpen) {
        setSelectOptions(filterOptions(inputValue));
        console.log('setInputValue', inputValue);
        setInputValue(inputValue || '');
      }
    };

    const filterOptions = (inputVal = '') => {
      return items.filter(
        (item) =>
          item.content === (action && action.content) ||
          item.content.toLowerCase().startsWith(inputVal.trim().toLowerCase()),
      );
    };

    const {
      getComboboxProps,
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      getToggleButtonProps,
      highlightedIndex,
      selectedItem,
    } = useCombobox({
      id: selectUniqueId,
      inputValue,
      itemToString: (item) => (item ? item.content : ''),
      items: selectOptions,
      onInputValueChange: handleOnInputValueChange,
      onSelectedItemChange: handleOnSelectedItemChange,
      selectedItem: selectedOption || null,
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
        <StyledInputContainer>
          <Input
            {...getInputProps({
              ...props,
              disabled,
              placeholder,
              ref: getInputRef(),
              readOnly: !filterable,
              required: required,
            })}
            iconLeft={selectedItem?.icon}
            iconRight={renderToggle}
          />
        </StyledInputContainer>
      );
    }, [disabled, filterable, getInputProps, placeholder, renderToggle, required, props, getInputRef, selectedItem]);

    return (
      <>
        {renderLabel}
        <div {...getComboboxProps()}>{renderInput}</div>
        <Menu
          action={action}
          autoWidth={autoWidth}
          getItemProps={getItemProps}
          getMenuProps={getMenuProps}
          highlightedIndex={highlightedIndex}
          options={options}
          maxHeight={maxHeight}
          selectedItem={selectedItem}
          selectOptions={selectOptions}
        />
      </>
    );
  },
);

const flattenOptions = <T extends any>(
  items: Array<SelectOption<T> | SelectOptionGroup<T>>,
): Array<SelectOption<T>> => {
  return items.every(isGroup)
    ? (items as Array<SelectOptionGroup<T>>)
        .map((group: SelectOptionGroup<T>) => group.options)
        .reduce((acc, curr) => acc.concat(curr), [])
    : (items as Array<SelectOption<T>>);
};

const isGroup = <T extends any>(item: SelectOption<T> | SelectOptionGroup<T>) => {
  return 'options' in item && !('value' in item);
};

const getContent = <T extends any>(item: SelectOption<T> | SelectAction, isHighlighted: boolean) => {
  const { content, disabled, description, icon } = item;

  return (
    <Flex alignItems="center" flexDirection="row">
      {icon && (
        <FlexItem
          alignSelf={description ? 'flex-start' : undefined}
          paddingRight="xSmall"
          paddingTop={description ? 'xSmall' : undefined}
        >
          {renderIcon(item, isHighlighted)}
        </FlexItem>
      )}
      {description ? (
        <FlexItem paddingVertical="xSmall">
          {content}
          <Small color={descriptionColor(disabled)}>{description}</Small>
        </FlexItem>
      ) : (
        content
      )}
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

const descriptionColor = (isDisabled: boolean | undefined) => (isDisabled ? 'secondary40' : 'secondary60');
