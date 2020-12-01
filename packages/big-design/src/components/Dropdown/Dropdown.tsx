import { useSelect, UseSelectState } from 'downshift';
import React, { cloneElement, isValidElement, memo, useCallback, useMemo, useRef } from 'react';
import { usePopper } from 'react-popper';

import { useUniqueId } from '../../hooks';
import { List } from '../List';
import { flattenItems } from '../List/List';
import { StyledMenuContainer } from '../List/styled';

import { StyledBox } from './styled';
import { DropdownItem, DropdownLinkItem, DropdownProps } from './types';

export const Dropdown = memo(
  ({
    autoWidth = false,
    className,
    disabled = false,
    maxHeight,
    id,
    items,
    placement = 'bottom-start' as 'bottom-start',
    toggle,
    style,
    ...rest
  }: DropdownProps) => {
    const dropdownUniqueId = useUniqueId('dropdown');

    // We only need the items to pass down to Downshift, not groups
    const flattenedItems = useMemo(() => flattenItems(items), [items]);

    // Popper
    const referenceRef = useRef(null);
    const popperRef = useRef(null);

    const { styles, attributes, update } = usePopper(referenceRef.current, popperRef.current, {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 4],
          },
        },
      ],
      placement,
    });

    const handleOnSelectedItemChange = useCallback(
      ({ selectedItem }: Partial<UseSelectState<DropdownItem | DropdownLinkItem | null>>) => {
        if (selectedItem && selectedItem.type !== 'link' && typeof selectedItem.onItemClick === 'function') {
          // Call onItemClick with selected item
          selectedItem.onItemClick(selectedItem);
        }
      },
      [],
    );

    const { getItemProps, getMenuProps, getToggleButtonProps, highlightedIndex, isOpen } = useSelect({
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

    const renderToggle = useMemo(() => {
      return (
        isValidElement(toggle) &&
        cloneElement<React.HTMLAttributes<any> & React.RefAttributes<any>>(toggle as any, {
          ...getToggleButtonProps({
            disabled,
            ref: referenceRef,
          }),
          // Because of memoization, we need to manually set this option
          'aria-expanded': isOpen,
        })
      );
    }, [disabled, getToggleButtonProps, isOpen, toggle]);

    return (
      <StyledBox>
        {renderToggle}
        <StyledMenuContainer ref={popperRef} style={styles.popper} {...attributes.poppper}>
          <List
            {...rest}
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
        </StyledMenuContainer>
      </StyledBox>
    );
  },
);
