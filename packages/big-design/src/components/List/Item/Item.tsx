import { CheckIcon } from '@bigcommerce/big-design-icons';
import { UseSelectPropGetters } from 'downshift';
import React, { forwardRef, LiHTMLAttributes, memo, Ref } from 'react';

import { typedMemo } from '../../../utils';
import { Checkbox } from '../../Checkbox';
import { DropdownItem, DropdownLinkItem } from '../../Dropdown';
import { SelectAction, SelectOption } from '../../Select';

import { Content } from './Content';
import { StyledListItem } from './styled';

export interface ListItemProps<T> extends LiHTMLAttributes<HTMLLIElement> {
  actionType?: 'normal' | 'destructive';
  autoWidth?: boolean;
  disabled?: boolean;
  index: number;
  isAction?: boolean;
  isChecked?: boolean;
  isHighlighted: boolean;
  isSelected?: boolean;
  item: DropdownItem | DropdownLinkItem | SelectOption<T> | SelectAction;
  getItemProps: UseSelectPropGetters<any>['getItemProps'];
  addItem?(item: SelectOption<T>): void;
  removeItem?(item: SelectOption<T>): void;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLLIElement>;
}

const StyleableListItem = typedMemo(
  <T,>({
    actionType = 'normal' as const,
    autoWidth = false,
    forwardedRef,
    index,
    isAction = false,
    isChecked = false,
    isHighlighted,
    isSelected = false,
    item,
    getItemProps,
    addItem,
    removeItem,
    ...props
  }: ListItemProps<T> & PrivateProps): ReturnType<React.FC<ListItemProps<T> & PrivateProps>> =>
    removeItem && addItem ? (
      <StyledListItem
        {...getItemProps({
          ...props,
          disabled: item.disabled,
          index,
          item,
          onClick: () => {
            if (item.disabled) {
              return;
            }

            const hasValue = (
              item: DropdownItem | DropdownLinkItem | SelectOption<T> | SelectAction,
            ): item is SelectOption<T> => 'value' in item;

            if (hasValue(item)) {
              isChecked ? removeItem(item) : addItem(item);
            }
          },
          ref: forwardedRef,
        })}
        actionType={actionType}
        autoWidth={autoWidth}
        isAction={isAction}
        isHighlighted={isHighlighted}
      >
        <Checkbox
          checked={isChecked}
          description={item.description}
          disabled={item.disabled}
          label={item.content}
          onChange={() => null}
          onClick={(event) => event.preventDefault()}
          tabIndex={-1}
        />
      </StyledListItem>
    ) : (
      <StyledListItem
        {...getItemProps({
          ...props,
          disabled: item.disabled,
          index,
          item,
          ref: forwardedRef,
        })}
        actionType={actionType}
        autoWidth={autoWidth}
        isAction={isAction}
        isHighlighted={isHighlighted}
        isSelected={isSelected}
      >
        <Content isHighlighted={isHighlighted} item={item} />
        {isSelected && <CheckIcon color="primary" size="large" />}
      </StyledListItem>
    ),
);

export const ListItem = memo(
  forwardRef<HTMLLIElement, ListItemProps<unknown>>((props, ref) => (
    <StyleableListItem {...props} forwardedRef={ref} />
  )),
);
