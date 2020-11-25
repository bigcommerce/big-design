import { State } from '@popperjs/core';
import { UseSelectPropGetters } from 'downshift';
import React, { forwardRef, Fragment, HTMLAttributes, memo, Ref, useCallback, useMemo, useRef } from 'react';

import { useIsomorphicLayoutEffect, useWindowSize } from '../../hooks';
import { Box } from '../Box';

import { ListGroupHeader } from './GroupHeader';
import { ListGroupSeparator } from './GroupSeparator';
import { ListItem } from './Item';
import { StyledList } from './styled';

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  action?: any;
  autoWidth: boolean;
  filteredItems?: any;
  highlightedIndex: number;
  isOpen: boolean;
  items: any;
  isDropdown?: boolean;
  maxHeight?: number;
  selectedItem?: any;
  selectedItems?: any;
  addItem?(): void;
  getItemProps: UseSelectPropGetters<any>['getItemProps'];
  getMenuProps: UseSelectPropGetters<any>['getMenuProps'];
  update: (() => Promise<Partial<State>>) | null;
  removeItem?(): void;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLUListElement>;
}

const StyleableList: React.FC<ListProps & PrivateProps> = ({
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
}) => {
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
    (action: any) => {
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
    (listItems) => {
      return (
        Array.isArray(listItems) &&
        listItems.map((item) => {
          // Skip rendering the option if it not found in the filtered list
          if (
            filteredItems &&
            !filteredItems.find((filteredItem: any) => 'value' in filteredItem && filteredItem.value === item.value)
          ) {
            return null;
          }

          const key = itemKey.current;
          itemKey.current += 1;

          const isChecked =
            'value' in item &&
            selectedItems &&
            Boolean(selectedItems.find((selected: any) => selected.value === item.value));

          return (
            <ListItem
              addItem={addItem}
              autoWidth={autoWidth}
              actionType={item.actionType}
              getItemProps={getItemProps}
              index={key}
              isAction={isDropdown}
              isChecked={isChecked}
              isHighlighted={highlightedIndex === key}
              isSelected={!isDropdown && selectedItem?.value === item.value}
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
    (group: any) => {
      return (
        <>
          {group.separated && <ListGroupSeparator />}
          {group.label && <ListGroupHeader>{group.label}</ListGroupHeader>}
          {renderItems(group.items || group.options)}
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
            <Fragment key={index}>{renderGroup(group)}</Fragment>
          ))}
          {action && renderAction(action)}
        </>
      );
    }

    if (Array.isArray(items) && items.every(isItem)) {
      return (
        <>
          {renderItems(items)}
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
            if (link) {
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
};

export const List = memo(
  forwardRef<HTMLUListElement, ListProps>((props, ref) => <StyleableList {...props} forwardedRef={ref} />),
);

const isGroup = (item: any) => {
  return ('items' in item && !('content' in item)) || ('options' in item && !('value' in item));
};

const isItem = (item: any) => {
  return ('content' in item && !('items' in item)) || ('value' in item && !('options' in item));
};

export const flattenItems = (items: any): Array<any> => {
  return items.every(isGroup)
    ? items.map((group: any) => group.items || group.options).reduce((acum, curr) => acum.concat(curr), [])
    : items;
};
