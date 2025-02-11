import { State } from '@popperjs/core';
import { UseComboboxPropGetters, UseSelectPropGetters } from 'downshift';
import React, {
  ComponentPropsWithoutRef,
  forwardRef,
  Fragment,
  memo,
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import { useIsomorphicLayoutEffect, useWindowSize } from '../../hooks';
import { typedMemo } from '../../utils';
import { Box } from '../Box';
import { DropdownItem, DropdownItemGroup, DropdownLinkItem, DropdownProps } from '../Dropdown';
import { MultiSelectLocalization } from '../MultiSelect/types';
import { SelectAction, SelectOption, SelectOptionGroup, SelectProps } from '../Select';

import { ListGroupHeader } from './GroupHeader';
import { ListGroupSeparator } from './GroupSeparator';
import { ListItem } from './Item';
import { StyledList, StyledListOverflowWrapper } from './styled';

export interface ListProps<T> extends ComponentPropsWithoutRef<'ul'> {
  action?: SelectAction;
  autoWidth: boolean;
  filteredItems?: Array<SelectOption<T> | SelectAction>;
  highlightedIndex: number;
  isOpen: boolean;
  items: DropdownProps['items'] | SelectProps<T>['options'];
  isDropdown?: boolean;
  maxHeight?: number;
  selectedItem?: SelectOption<T> | null;
  selectedItems?: Array<SelectOption<T>> | null;
  selectAll?: boolean;
  addItem?(item: SelectOption<T>): void;
  updateItems?(items: Array<SelectOption<T>>): void;
  getItemProps:
    | UseSelectPropGetters<any>['getItemProps']
    | UseComboboxPropGetters<any>['getItemProps'];
  getMenuProps:
    | UseSelectPropGetters<any>['getMenuProps']
    | UseComboboxPropGetters<any>['getMenuProps'];
  update: (() => Promise<Partial<State>>) | null;
  localization?: { selectAll: MultiSelectLocalization['selectAll'] };
  removeItem?(item: SelectOption<T>): void;
  onScrollToBottom?(): void;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLUListElement>;
}

const StyleableList = typedMemo(
  <T,>({
    action,
    addItem,
    updateItems,
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
    selectAll,
    update,
    localization = { selectAll: 'Select All' },
    removeItem,
    onScrollToBottom,
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
    }, [isOpen, height, width, selectedItems?.length]);

    const handleSelectAll = useCallback(
      (listItems: Array<SelectOption<T>>) => {
        if (updateItems) {
          const enabledItems = listItems.filter((item) => !item.disabled);

          updateItems(enabledItems);
        }
      },
      [updateItems],
    );

    const handleUnselectAll = useCallback(() => {
      if (updateItems) {
        updateItems([]);
      }
    }, [updateItems]);

    const renderSelectAll = useCallback(
      (listItems: Array<SelectOption<T>>) => {
        const selectedItemsLength = selectedItems?.length ?? 0;
        const availableItemsLength = listItems.filter((item) => !item.disabled).length;
        const isAllSelected = availableItemsLength === selectedItemsLength;
        const isSomeSelected =
          selectedItemsLength > 0 && selectedItemsLength < availableItemsLength;

        const key = itemKey.current;

        itemKey.current += 1;

        return (
          <Box>
            <ListItem
              addItem={() => handleSelectAll(listItems)}
              autoWidth={autoWidth}
              getItemProps={getItemProps}
              index={key}
              isAction={true}
              isChecked={isAllSelected}
              isHighlighted={highlightedIndex === key}
              isIndeterminate={isSomeSelected && !isAllSelected}
              item={{ content: localization?.selectAll, value: 'select-all' }}
              key="select-all"
              removeItem={handleUnselectAll}
            />
            <Box borderTop="box" marginHorizontal="medium" marginTop="xSmall" paddingTop="xSmall" />
          </Box>
        );
      },
      [
        getItemProps,
        highlightedIndex,
        autoWidth,
        selectedItems,
        handleSelectAll,
        handleUnselectAll,
        localization?.selectAll,
      ],
    );

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
      (listItems: Array<DropdownItem | DropdownLinkItem | SelectOption<T>>) => {
        return (
          Array.isArray(listItems) &&
          listItems.map((item) => {
            // Skip rendering the option if it not found in the filtered list
            if (
              filteredItems &&
              isOption(item) &&
              !filteredItems.find(
                (filteredItem) => isOption(filteredItem) && filteredItem.value === item.value,
              )
            ) {
              return null;
            }

            const key = itemKey.current;

            itemKey.current += 1;

            const isChecked =
              isOption(item) &&
              selectedItems &&
              Boolean(selectedItems.find((selected) => selected.value === item.value));

            const hasActionType = (
              item: DropdownItem | DropdownLinkItem | SelectOption<T>,
            ): item is DropdownItem | DropdownLinkItem => 'actionType' in item;

            return (
              <ListItem
                actionType={hasActionType(item) ? item.actionType : 'normal'}
                addItem={addItem}
                autoWidth={autoWidth}
                getItemProps={getItemProps}
                index={key}
                isAction={isDropdown}
                isChecked={isChecked || false}
                isHighlighted={!item.disabled && highlightedIndex === key}
                isSelected={!isDropdown && isOption(item) && selectedItem?.value === item.value}
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
      (group: DropdownItemGroup | SelectOptionGroup<T>) => {
        return (
          <>
            {group.separated && <ListGroupSeparator />}
            {Boolean(group.label) && <ListGroupHeader>{group.label}</ListGroupHeader>}
            {isItemGroup(group) && renderItems(group.items)}
            {isOptionGroup(group) && renderItems(group.options)}
          </>
        );
      },
      [renderItems],
    );

    const iORef = useRef<HTMLDivElement>(null);

    const renderChildren = useMemo(() => {
      // Reset the key every time we rerender children
      itemKey.current = 0;

      const groupFragment = (items: Array<DropdownItemGroup | SelectOptionGroup<T>>) =>
        items.map((group, index) => <Fragment key={index}>{renderGroup(group)}</Fragment>);

      if (Array.isArray(items) && isGroups(items)) {
        const flattenOptions = isGroupsWithOptions(items)
          ? items.reduce<Array<SelectOption<T>>>((acc, { options }) => [...acc, ...options], [])
          : null;

        return (
          <>
            {selectAll && flattenOptions && renderSelectAll(flattenOptions)}
            {groupFragment(items)}
            {action && renderAction(action)}
          </>
        );
      }

      if (Array.isArray(items) && isItems(items)) {
        return (
          <>
            {selectAll && isOptions(items) && renderSelectAll(items)}
            {renderItems(items)}
            {action && renderAction(action)}
            <div aria-hidden={true} ref={iORef} />
          </>
        );
      }
    }, [action, items, renderAction, renderGroup, renderItems, renderSelectAll, selectAll]);

    // Initialize intersection observer state for element
    const owRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const iO = iORef.current;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (onScrollToBottom) {
                onScrollToBottom();
              }
            }
          });
        },
        {
          root: owRef.current,
          rootMargin: '15px',
          threshold: 0,
        },
      );

      if (iO) {
        observer.observe(iO);
      }

      return () => {
        if (iO) {
          observer.unobserve(iO);
        }
      };
    }, [renderChildren, onScrollToBottom]);

    return (
      <StyledListOverflowWrapper ref={owRef}>
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
      </StyledListOverflowWrapper>
    );
  },
);

export const List = memo(
  // Using unknown because memo looses the generic type
  forwardRef<HTMLUListElement, ListProps<unknown>>((props, ref) => (
    <StyleableList {...props} forwardedRef={ref} />
  )),
);

type Items =
  | DropdownItem
  | DropdownLinkItem
  | SelectOption<unknown>
  | SelectAction
  | DropdownItemGroup
  | SelectOptionGroup<unknown>;

// Merging types into union
// Issue: https://github.com/microsoft/TypeScript/issues/33591

const isGroups = (
  items: Items[],
): items is DropdownItemGroup[] | Array<SelectOptionGroup<unknown>> =>
  items.every((item) => isItemGroup(item) || isOptionGroup(item));

const isGroupsWithOptions = (items: Items[]): items is Array<SelectOptionGroup<unknown>> =>
  items.every((item) => isOptionGroup(item));

const isItems = (
  items: Items[],
): items is Array<DropdownItem | DropdownLinkItem> | Array<SelectOption<unknown>> =>
  items.every((item) => isItem(item) || isOption(item));
const isOptions = (items: Items[]): items is Array<SelectOption<unknown>> =>
  items.every((item) => isOption(item));

const isOption = (item: Items): item is SelectOption<unknown> => 'value' in item;

const isItem = (item: Items): item is DropdownItem | DropdownLinkItem =>
  'content' in item && !('items' in item);

const isItemGroup = (item: Items): item is DropdownItemGroup =>
  'items' in item && !('content' in item);

const isOptionGroup = (item: Items): item is SelectOptionGroup<unknown> =>
  'options' in item && !('value' in item);
