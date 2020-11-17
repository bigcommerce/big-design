import { CheckIcon } from '@bigcommerce/big-design-icons';
import { useCombobox } from 'downshift';
import React, { cloneElement, isValidElement, memo, useCallback, useMemo, useRef, useState } from 'react';

import { typedMemo, warning } from '../../utils';
import { Flex, FlexItem } from '../Flex';
import { FormControlLabel } from '../Form';
import { Input } from '../Input';
import { StyledListItem } from '../List/Item/styled';
import { StyledList } from '../List/styled';
import { SelectOption } from '../Select';
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

          console.log(item, key);

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

    const renderChildren = useMemo(() => {
      itemKey.current = 0;

      return renderOptions(items);
    }, [renderOptions, items]);

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
      items: options,
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
