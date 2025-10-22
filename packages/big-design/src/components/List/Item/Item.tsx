import { CheckIcon } from '@bigcommerce/big-design-icons';
import { UseComboboxPropGetters, UseSelectPropGetters } from 'downshift';
import React, { ComponentPropsWithoutRef, forwardRef, memo, Ref } from 'react';

import { typedMemo } from '../../../utils';
import { Checkbox } from '../../Checkbox';
import { DropdownItem, DropdownLinkItem } from '../../Dropdown';
import { SelectAction, SelectOption } from '../../Select';

import { Content } from './Content';
import { StyledListItem } from './styled';

export interface ListItemProps<T> extends ComponentPropsWithoutRef<'li'> {
  readonly actionType?: 'normal' | 'destructive';
  readonly autoWidth?: boolean;
  readonly disabled?: boolean;
  readonly index: number;
  readonly isAction?: boolean;
  readonly isChecked?: boolean;
  readonly isHighlighted: boolean;
  readonly isIndeterminate?: boolean;
  readonly isSelected?: boolean;
  readonly item: DropdownItem | DropdownLinkItem | SelectOption<T> | SelectAction;
  readonly getItemProps:
    | UseSelectPropGetters<any>['getItemProps']
    | UseComboboxPropGetters<any>['getItemProps'];
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
    isIndeterminate = false,
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
          isIndeterminate={isIndeterminate}
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
          index,
          item,
          ref: forwardedRef,
        })}
        actionType={actionType}
        autoWidth={autoWidth}
        disabled={item.disabled}
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
