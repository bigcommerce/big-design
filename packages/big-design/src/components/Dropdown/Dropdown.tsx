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
    maxHeight = 250,
    id,
    items,
    placement = 'bottom-start' as 'bottom-start',
    toggle,
    style,
    ...rest
  }: DropdownProps) => {
    // We only need the items to pass down to Downshift, not groups
    const onlyItems = useMemo(() => flattenItems(items), [items]);

    const dropdownUniqueId = useUniqueId('dropdown');

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
          selectedItem.onItemClick(selectedItem);
        }
      },
      [],
    );

    const { getItemProps, getMenuProps, getToggleButtonProps, highlightedIndex, isOpen } = useSelect<
      DropdownItem | DropdownLinkItem | null
    >({
      circularNavigation: true,
      defaultHighlightedIndex: 0,
      id: dropdownUniqueId,
      itemToString: (item) => (item ? item.content : ''),
      items: onlyItems,
      menuId: id,
      onSelectedItemChange: handleOnSelectedItemChange,
      selectedItem: null,
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
