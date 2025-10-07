import { useSelect, UseSelectProps, UseSelectState } from 'downshift';
import React, {
  cloneElement,
  isValidElement,
  memo,
  useCallback,
  useId,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';

import { Box } from '../Box';
import { List } from '../List';

import { StyledBox } from './styled';
import { DropdownItem, DropdownItemGroup, DropdownLinkItem, DropdownProps } from './types';

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

    // downshift throws a ref error if getMenuProps is called with no args and the menu is closed
    if (!isOpen) {
      getMenuProps({}, { suppressRefError: true });
    }

    const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

    const { attributes, styles, update } = usePopper(referenceElement, popperElement, {
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

    const clonedToggle =
      isValidElement(toggle) &&
      cloneElement(toggle, {
        ...getToggleButtonProps({
          'aria-haspopup': 'menu',
          // Downshift sets this to a label id that doesn't exist
          'aria-labelledby': undefined,
          disabled,
          ref: setReferenceElement,
          role: 'button',
        }),
      });

    const popperContent = (
      <Box ref={setPopperElement} style={styles.popper} {...attributes.popper} zIndex="popover">
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
          role="menu"
          update={update}
        />
      </Box>
    );

    return (
      <StyledBox>
        {clonedToggle}
        {isOpen ? createPortal(popperContent, document.body) : null}
      </StyledBox>
    );
  },
);
