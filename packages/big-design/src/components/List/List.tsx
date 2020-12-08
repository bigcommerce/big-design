import { State } from '@popperjs/core';
import { UseSelectPropGetters } from 'downshift';
import React, { forwardRef, Fragment, HTMLAttributes, memo, Ref, useCallback, useMemo, useRef } from 'react';

import { useIsomorphicLayoutEffect, useWindowSize } from '../../hooks';
import { typedMemo } from '../../utils';
import { Box } from '../Box';
import { DropdownItem, DropdownItemGroup, DropdownLinkItem } from '../Dropdown';
import { SelectAction, SelectOption, SelectOptionGroup } from '../Select';

import { ListGroupHeader } from './GroupHeader';
import { ListGroupSeparator } from './GroupSeparator';
import { ListItem } from './Item';
import { StyledList } from './styled';

export interface ListProps<T> extends HTMLAttributes<HTMLUListElement> {
  action?: SelectAction;
  autoWidth: boolean;
  filteredItems?: Array<SelectOption<T> | SelectAction>;
  highlightedIndex: number;
  isOpen: boolean;
  items: Array<DropdownItemGroup | DropdownItem | DropdownLinkItem | SelectOptionGroup<T> | SelectOption<any>>;
  isDropdown?: boolean;
  maxHeight?: number;
  selectedItem?: SelectOption<T> | SelectAction | null;
  selectedItems?: Array<SelectOption<T>> | null;
  addItem?(item: SelectOption<T>): void;
  getItemProps: UseSelectPropGetters<any>['getItemProps'];
  getMenuProps: UseSelectPropGetters<any>['getMenuProps'];
  update: (() => Promise<Partial<State>>) | null;
  removeItem?(item: SelectOption<T>): void;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLUListElement>;
}

type Items = DropdownItem | DropdownLinkItem | SelectOption<any> | SelectAction;

const StyleableList = typedMemo(
  <T extends unknown>({
    action,
    addItem,
    autoWidth,
    filteredItems,
    forwardedRef,
    getItemProps,
    getMenuProps,
    highlightedIndex,
    isDropdown = false,
    isOpen,
    items,
    maxHeight = 250,
    selectedItem,
    selectedItems,
    update,
    removeItem,
    ...props
  }: ListProps<T> & PrivateProps): ReturnType<React.FC<ListProps<T> & PrivateProps>> => {
    const itemKey = useRef(0);
    const { height, width } = useWindowSize();

    // Recalculate Popper for correct positioning
    useIsomorphicLayoutEffect(() => {
      async function scheduleUpdate() {
        // Only update when menu is open
        if (update && isOpen) {
          await update();
        }
      }

      scheduleUpdate();
    }, [isOpen, height, width]);

    const renderAction = useCallback(
      (action: SelectAction) => {
        const key = itemKey.current;

        return (
          <Box borderTop="box" marginTop="xSmall" paddingTop="xSmall">
            <ListItem
              actionType={action.actionType}
              autoWidth={autoWidth}
              getItemProps={getItemProps}
              index={key}
              isAction={true}
              isHighlighted={highlightedIndex === key}
              isSelected={false}
              item={action}
              key="action"
            />
          </Box>
        );
      },
      [getItemProps, autoWidth, highlightedIndex],
    );

    const renderItems = useCallback(
      (listItems: Array<DropdownItem | DropdownLinkItem | SelectOption<any>>) => {
        return (
          Array.isArray(listItems) &&
          listItems.map((item) => {
            // Skip rendering the option if it not found in the filtered list
            if (
              filteredItems &&
              'value' in item &&
              !filteredItems.find((filteredItem) => 'value' in filteredItem && filteredItem.value === item.value)
            ) {
              return null;
            }

            const key = itemKey.current;
            itemKey.current += 1;

            const isChecked =
              'value' in item &&
              selectedItems &&
              Boolean(selectedItems.find((selected) => selected.value === item.value));

            return (
              <ListItem
                addItem={addItem}
                autoWidth={autoWidth}
                actionType={(item as DropdownItem).actionType}
                getItemProps={getItemProps}
                index={key}
                isAction={isDropdown}
                isChecked={isChecked || false}
                isHighlighted={highlightedIndex === key}
                isSelected={
                  !isDropdown && (selectedItem as SelectOption<any>)?.value === (item as SelectOption<T>).value
                }
                item={item}
                key={`${key}-${item.content}`}
                removeItem={removeItem}
              />
            );
          })
        );
      },
      [
        addItem,
        autoWidth,
        filteredItems,
        getItemProps,
        highlightedIndex,
        isDropdown,
        removeItem,
        selectedItem,
        selectedItems,
      ],
    );

    const renderGroup = useCallback(
      (group: DropdownItemGroup | SelectOptionGroup<any>) => {
        return (
          <>
            {group.separated && <ListGroupSeparator />}
            {group.label && <ListGroupHeader>{group.label}</ListGroupHeader>}
            {renderItems((group as DropdownItemGroup).items || (group as SelectOptionGroup<T>).options)}
          </>
        );
      },
      [renderItems],
    );

    const renderChildren = useMemo(() => {
      // Reset the key every time we rerender children
      itemKey.current = 0;

      if (Array.isArray(items) && items.every(isGroup)) {
        return (
          <>
            {items.map((group, index) => (
              <Fragment key={index}>{renderGroup(group as DropdownItemGroup | SelectOptionGroup<any>)}</Fragment>
            ))}
            {action && renderAction(action)}
          </>
        );
      }

      if (Array.isArray(items) && items.every(isItem)) {
        return (
          <>
            {renderItems(items as Array<DropdownItem | DropdownLinkItem | SelectOption<any>>)}
            {action && renderAction(action)}
          </>
        );
      }
    }, [action, items, renderAction, renderGroup, renderItems]);

    return (
      <StyledList
        {...getMenuProps({
          ...props,
          onKeyDown: (event) => {
            if (event.key === 'Enter') {
              const element = event.currentTarget.children[highlightedIndex];
              const link = element.querySelector('a');

              // We want to click the link if it is selected
              if (link && !link.getAttribute('disabled')) {
                link.click();
              }
            }
          },
          ref: forwardedRef,
        })}
        maxHeight={maxHeight}
      >
        {isOpen && renderChildren}
      </StyledList>
    );
  },
);

export const List = memo(
  forwardRef<HTMLUListElement, ListProps<unknown>>((props, ref) => <StyleableList {...props} forwardedRef={ref} />),
);

const isGroup = (item: DropdownItemGroup | SelectOptionGroup<any> | Items) => {
  return ('items' in item && !('content' in item)) || ('options' in item && !('value' in item));
};

const isItem = (item: DropdownItemGroup | SelectOptionGroup<any> | Items) => {
  return ('content' in item && !('items' in item)) || ('value' in item && !('options' in item));
};

export function flattenItems<T>(
  items: Array<
    DropdownItemGroup | DropdownItem | DropdownLinkItem | SelectOptionGroup<unknown> | SelectOption<unknown>
  >,
): Array<T> {
  return items.every(isGroup)
    ? items.map((group: any) => group.items || group.options).reduce((acum, curr) => acum.concat(curr), [])
    : items;
}
