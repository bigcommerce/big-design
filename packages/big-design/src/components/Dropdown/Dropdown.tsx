import { useSelect, UseSelectProps, UseSelectState } from 'downshift';
import React, {
  cloneElement,
  isValidElement,
  memo,
  useCallback,
  useEffect,
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

    const [mounted, setMounted] = useState(false);
    const [portalContainer, setPortalContainer] = useState<Element | null>(null);
    const [zIndexValue, setZIndexValue] = useState<number | 'popover' | 'modal'>('popover');

    useEffect(() => setMounted(true), []);

    useEffect(() => {
      if (!mounted || !isOpen) {
        return;
      }

      const body = typeof document !== 'undefined' ? document.body : null;

      if (!body) {
        return;
      }

      const recompute = () => {
        if (!body) {
          return;
        }

        let container: Element | null = body;
        let z: number | 'popover' | 'modal' = 'popover';

        const openModal =
          document.querySelector('[role="dialog"][aria-modal="true"]') ||
          document.querySelector('[role="dialog"]') ||
          document.querySelector('[aria-modal="true"]') ||
          document.querySelector('[data-bd-modal-root]');

        if (openModal) {
          const modalZ = parseInt(getComputedStyle(openModal).zIndex || '0', 10) || 0;

          z = Math.max(0, modalZ - 1);
        } else {
          z = 'popover';
        }

        container = body;

        setPortalContainer(container);
        setZIndexValue(z);
      };

      recompute();

      const mutationObserver = new MutationObserver(recompute);

      mutationObserver.observe(body, { childList: true, subtree: true });

      return () => mutationObserver.disconnect();
    }, [mounted, isOpen, referenceElement]);

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
    const popperZIndexProp = typeof zIndexValue === 'string' ? zIndexValue : undefined;

    const popperContent = (
      <Box
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        zIndex={popperZIndexProp}
      >
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
      <StyledBox className={className} style={style}>
        {clonedToggle}
        {isOpen && mounted && portalContainer ? createPortal(popperContent, portalContainer) : null}
      </StyledBox>
    );
  },
);
