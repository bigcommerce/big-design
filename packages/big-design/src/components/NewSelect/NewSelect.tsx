import { CheckIcon } from '@bigcommerce/big-design-icons';
import { useCombobox } from 'downshift';
import React, { cloneElement, Fragment, isValidElement, memo, useCallback, useMemo, useRef, useState } from 'react';

import { typedMemo, warning } from '../../utils';
import { Flex, FlexItem } from '../Flex';
import { FormControlLabel } from '../Form';
import { Input } from '../Input';
import { ListGroupHeader } from '../List/GroupHeader';
import { StyledListItem } from '../List/Item/styled';
import { StyledList } from '../List/styled';
import { SelectOption, SelectOptionGroup } from '../Select';
import { DropdownButton, StyledDropdownIcon, StyledInputContainer } from '../Select/styled';
import { SelectAction } from '../Select/types';
import { Small } from '../Typography';

interface NewSelectProps {
  filterable: boolean;
  options: any;
  label: React.ReactChild;
  required: boolean;
  disabled?: boolean;
  placeholder: string;
  maxHeight: number;
}

const Menu = memo(
  ({ autoWidth, items, getMenuProps, getItemProps, highlightedIndex, maxHeight, selectedItem }: any) => {
    const itemKey = useRef(0);

    const renderOptions = useCallback(
      (items: Array<any>) =>
        items.map((item) => {
          //   if (
          //     !selectOptions.find(
          //       (option: SelectOption<T> | SelectAction) => 'value' in option && option.value === item.value,
          //     )
          //   ) {
          //     return null;
          //   }
          const key = itemKey.current;

          itemKey.current += 1;

          console.log(item, key, selectedItem, selectedItem?.value === item.value);

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
        }),
      [getItemProps, autoWidth, highlightedIndex, selectedItem],
    );

    const renderGroup = useCallback(
      (group: any) => {
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

      if (Array.isArray(items) && items.every(isGroup)) {
        return (
          <>
            {(items as Array<any>).map((group, index) => (
              <Fragment key={index}>{renderGroup(group)}</Fragment>
            ))}
            {/* {action && renderAction(action)} */}
          </>
        );
      }

      if (
        Array.isArray(items) &&
        items.every((item: any) => {
          return 'value' in item && !('options' in item);
        })
      ) {
        return (
          <>
            {renderOptions(items as Array<any>)}
            {/* {action && renderAction(action)} */}
          </>
        );
      }
    }, [renderGroup, renderOptions, items]);

    return <StyledList {...getMenuProps({ maxHeight })}>{renderChildren}</StyledList>;
  },
);

const Item = memo(({ getItemProps, isHighlighted, item, index, isSelected, selectedItem, ...props }: any) => {
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
    filterable,
    options,
    label,
    required,
    disabled,
    placeholder,
    maxHeight = 250,
    ...rest
  }: NewSelectProps) => {
    const [inputValue, setInputValue] = useState<string | undefined>('');

    const items = useMemo(() => flattenOptions(options), [options]);

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
      items,
      inputValue,
      onInputValueChange: ({ inputValue: newValue }) => setInputValue(newValue),
      onSelectedItemChange: ({ selectedItem }) =>
        alert(selectedItem ? `You selected ${selectedItem.content}` : 'Selection Cleared'),
      itemToString: (item: any) => (item ? item.content : ''),
    });

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
            {...rest}
            {...getInputProps({
              disabled,
              placeholder,
            })}
            iconRight={renderToggle}
            readOnly={!filterable}
            required={required}
          />
        </StyledInputContainer>
      );
    }, [disabled, filterable, getInputProps, placeholder, renderToggle, required, rest]);

    return (
      <>
        {renderLabel}
        <div {...getComboboxProps()}>{renderInput}</div>
        <Menu
          getItemProps={getItemProps}
          getMenuProps={getMenuProps}
          highlightedIndex={highlightedIndex}
          items={options}
          maxHeight={maxHeight}
          selectedItem={selectedItem}
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
