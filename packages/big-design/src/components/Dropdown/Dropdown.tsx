import { autoUpdate, offset, shift, useFloating } from '@floating-ui/react';
import { useSelect, type UseSelectProps, type UseSelectState } from 'downshift';
import React, {
  cloneElement,
  isValidElement,
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
} from 'react';
import { createPortal } from 'react-dom';

import { getFloatingPlacement } from '../../utils';
import { Box } from '../Box';
import { List } from '../List';

import { StyledBox } from './styled';
import type { DropdownItem, DropdownItemGroup, DropdownLinkItem, DropdownProps } from './types';

export const isDropdownItemGroupArray = (
  items: Array<DropdownItemGroup | DropdownItem | DropdownLinkItem>,
): items is DropdownItemGroup[] =>
  items.every((items) => 'items' in items && !('content' in items));

export const Dropdown = memo(
  ({
    autoWidth = false,
    className,
    disabled = false,
    maxHeight,
    maxWidth,
    id,
    items,
    placement = 'bottom-start' as const,
    positionFixed = false,
    selectedItem,
    toggle,
    style,
    ...props
  }: DropdownProps) => {
    const dropdownUniqueId = useId();

    const flattenItems = useCallback((items: DropdownProps['items']) => {
      return isDropdownItemGroupArray(items)
        ? items.map((group) => group.items).reduce((acum, curr) => acum.concat(curr), [])
        : items;
    }, []);

    const flattenedItems = useMemo(() => flattenItems(items), [flattenItems, items]);

    const defaultHighlightedIndex = flattenedItems.findIndex((item) => {
      if (!selectedItem) {
        return false;
      }

      if ('hash' in item && 'hash' in selectedItem) {
        return item.hash === selectedItem.hash;
      }

      return false;
    });

    const handleOnSelectedItemChange = useCallback(
      ({ selectedItem }: Partial<UseSelectState<DropdownItem | DropdownLinkItem | null>>) => {
        if (
          selectedItem &&
          !selectedItem.disabled &&
          selectedItem.type !== 'link' &&
          typeof selectedItem.onItemClick === 'function'
        ) {
          selectedItem.onItemClick(selectedItem);
        }
      },
      [],
    );

    const stateReducer: UseSelectProps<DropdownItem | DropdownLinkItem>['stateReducer'] = (
      state,
      actionAndChanges,
    ) => {
      const { changes, type } = actionAndChanges;

      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonKeyDownArrowDown:
          if (state.highlightedIndex === flattenedItems.length - 1) {
            return { ...changes, highlightedIndex: 0 };
          }

          return changes;

        case useSelect.stateChangeTypes.ToggleButtonKeyDownArrowUp:
          if (state.highlightedIndex === 0) {
            return { ...changes, highlightedIndex: flattenedItems.length - 1 };
          }

          return changes;

        case useSelect.stateChangeTypes.ToggleButtonBlur:
          return { ...changes, selectedItem: null };

        default:
          return changes;
      }
    };

    const { getItemProps, getMenuProps, getToggleButtonProps, highlightedIndex, isOpen } =
      useSelect({
        defaultHighlightedIndex: defaultHighlightedIndex > -1 ? defaultHighlightedIndex : 0,
        id: dropdownUniqueId,
        itemToString: (item) => (item ? item.content : ''),
        items: flattenedItems,
        menuId: id,
        onSelectedItemChange: handleOnSelectedItemChange,
        selectedItem: null, // We never set a selected item
        stateReducer,
        toggleButtonId: toggle.props.id,
      });

    const { middleware: placementMiddleware, placement: floatingPlacement } =
      getFloatingPlacement(placement);

    const { floatingStyles, refs, update } = useFloating({
      middleware: [offset(4), placementMiddleware, shift()],
      placement: floatingPlacement,
      strategy: positionFixed ? 'fixed' : 'absolute',
    });

    // Only track scroll/resize while open, matching popper's previous eventListeners config
    useEffect(() => {
      if (isOpen && refs.reference.current && refs.floating.current) {
        return autoUpdate(refs.reference.current, refs.floating.current, update);
      }
    }, [isOpen, refs.reference, refs.floating, update]);

    const clonedToggle =
      isValidElement(toggle) &&
      cloneElement(toggle, {
        ...getToggleButtonProps({
          'aria-haspopup': 'menu',
          // Downshift sets this to a label id that doesn't exist
          'aria-labelledby': undefined,
          disabled,
          ref: refs.setReference,
          role: 'button',
        }),
      });

    return (
      <StyledBox>
        {clonedToggle}
        {isOpen ? (
          createPortal(
            <Box ref={refs.setFloating} style={floatingStyles} zIndex="popover">
              <List
                {...props}
                autoWidth={autoWidth}
                getItemProps={getItemProps}
                getMenuProps={getMenuProps}
                highlightedIndex={highlightedIndex}
                isDropdown={true}
                isOpen={isOpen}
                items={items}
                maxHeight={maxHeight}
                maxWidth={maxWidth}
                role="menu"
                update={update}
              />
            </Box>,
            document.body,
          )
        ) : (
          // We need to render the menu hidden to ensure it has a reference for positioning
          <Box display="none" ref={refs.setFloating} style={floatingStyles} zIndex="popover">
            <List
              {...props}
              autoWidth={autoWidth}
              getItemProps={getItemProps}
              getMenuProps={getMenuProps}
              highlightedIndex={highlightedIndex}
              isDropdown={true}
              isOpen={isOpen}
              items={items}
              maxHeight={maxHeight}
              maxWidth={maxWidth}
              role="menu"
              update={update}
            />
          </Box>
        )}
      </StyledBox>
    );
  },
);
