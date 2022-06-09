import { useSelect, UseSelectState } from 'downshift';
import React, { cloneElement, isValidElement, memo, useCallback, useMemo, useRef } from 'react';
import { usePopper } from 'react-popper';

import { useUniqueId } from '../../hooks';
import { Box } from '../Box';
import { List } from '../List';

import { StyledBox } from './styled';
import { DropdownItem, DropdownItemGroup, DropdownLinkItem, DropdownProps } from './types';

export const Dropdown = memo(
  ({
    autoWidth = false,
    className,
    disabled = false,
    maxHeight,
    id,
    items,
    placement = 'bottom-start' as const,
    positionFixed = false,
    toggle,
    style,
    ...props
  }: DropdownProps) => {
    const dropdownUniqueId = useUniqueId('dropdown');

    const flattenItems = useCallback((items: DropdownProps['items']) => {
      const isGroups = (
        items: Array<DropdownItemGroup | DropdownItem | DropdownLinkItem>,
      ): items is DropdownItemGroup[] =>
        items.every((items) => 'items' in items && !('content' in items));

      return isGroups(items)
        ? items.map((group) => group.items).reduce((acum, curr) => acum.concat(curr), [])
        : items;
    }, []);

    // We only need the items to pass down to Downshift, not groups
    const flattenedItems = useMemo(() => flattenItems(items), [flattenItems, items]);

    const handleOnSelectedItemChange = useCallback(
      ({ selectedItem }: Partial<UseSelectState<DropdownItem | DropdownLinkItem | null>>) => {
        // Links don't trigger an onItemClick
        if (
          selectedItem &&
          selectedItem.type !== 'link' &&
          typeof selectedItem.onItemClick === 'function'
        ) {
          // Call onItemClick with selected item
          selectedItem.onItemClick(selectedItem);
        }
      },
      [],
    );

    const { getItemProps, getMenuProps, getToggleButtonProps, highlightedIndex, isOpen } =
      useSelect({
        circularNavigation: true,
        defaultHighlightedIndex: 0,
        id: dropdownUniqueId,
        itemToString: (item) => (item ? item.content : ''),
        items: flattenedItems,
        menuId: id,
        onSelectedItemChange: handleOnSelectedItemChange,
        selectedItem: null, // We never set a selected item
        toggleButtonId: toggle.props.id,
      });

    // Popper
    const referenceRef = useRef(null);
    const popperRef = useRef(null);

    const { attributes, styles, update } = usePopper(referenceRef.current, popperRef.current, {
      modifiers: [
        {
          name: 'eventListeners',
          options: {
            scroll: isOpen,
            resize: isOpen,
          },
        },
        {
          name: 'offset',
          options: {
            offset: [0, 4],
          },
        },
      ],
      placement,
      strategy: positionFixed ? 'fixed' : 'absolute',
    });

    const renderToggle = useMemo(() => {
      return (
        isValidElement(toggle) &&
        cloneElement(toggle, {
          ...getToggleButtonProps({
            'aria-expanded': isOpen, // Because of memoization, we need to manually set this option
            disabled,
            ref: referenceRef,
          }),
        })
      );
    }, [disabled, getToggleButtonProps, isOpen, toggle]);

    return (
      <StyledBox>
        {renderToggle}
        <Box ref={popperRef} style={styles.popper} {...attributes.poppper} zIndex="popover">
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
            update={update}
          />
        </Box>
      </StyledBox>
    );
  },
);
