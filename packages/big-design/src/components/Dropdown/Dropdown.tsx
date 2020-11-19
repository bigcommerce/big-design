import { useSelect, UseSelectState } from 'downshift';
import React, { cloneElement, Fragment, isValidElement, memo, useCallback, useMemo, useRef } from 'react';
import { usePopper } from 'react-popper';

import { useUniqueId } from '../../hooks';
import { Flex } from '../Flex';
import { FlexItem } from '../Flex/Item';
import { ListGroupHeader } from '../List/GroupHeader';
import { ListGroupSeparator } from '../List/GroupSeparator';
import { StyledListItem } from '../List/Item/styled';
import { StyledList, StyledMenuContainer } from '../List/styled';
import { Tooltip } from '../Tooltip';

import { StyledBox, StyledLink } from './styled';
import { DropdownItem, DropdownItemGroup, DropdownLinkItem, DropdownProps } from './types';

const Menu = memo(({ items, getMenuProps, getItemProps, highlightedIndex, maxHeight, isOpen, ...rest }: any) => {
  const itemKey = useRef(0);

  const renderItem = useCallback(
    (item: DropdownItem) => {
      const key = itemKey.current;
      itemKey.current += 1;

      return (
        <Item
          getItemProps={getItemProps}
          key={item.content}
          item={item}
          index={key}
          isHighlighted={highlightedIndex === key}
        />
      );
    },
    [getItemProps, highlightedIndex],
  );

  const renderLinkItem = useCallback(
    (item: DropdownLinkItem) => {
      const key = itemKey.current;
      itemKey.current += 1;

      return (
        <Item
          getItemProps={getItemProps}
          key={item.content}
          item={item}
          index={key}
          isHighlighted={highlightedIndex === key}
        />
      );
    },
    [getItemProps, highlightedIndex],
  );

  const renderItems = useCallback(
    (dropdownItems: Array<DropdownItem | DropdownLinkItem>) => {
      return (
        Array.isArray(dropdownItems) &&
        dropdownItems.map((item) => (item.type === 'link' ? renderLinkItem(item) : renderItem(item)))
      );
    },
    [renderItem, renderLinkItem],
  );

  const renderGroup = useCallback(
    (group: DropdownItemGroup) => {
      return (
        <>
          {group.separated && <ListGroupSeparator />}
          {group.label && <ListGroupHeader>{group.label}</ListGroupHeader>}
          {renderItems(group.items)}
        </>
      );
    },
    [renderItems],
  );

  const renderChildren = useMemo(() => {
    // Reset the key every time we rerender children
    itemKey.current = 0;

    if (Array.isArray(items) && items.every(isGroup)) {
      return (items as DropdownItemGroup[]).map((group, index) => (
        <Fragment key={index}>{renderGroup(group)}</Fragment>
      ));
    }

    if (Array.isArray(items) && items.every(isItem)) {
      return renderItems(items as Array<DropdownItem | DropdownLinkItem>);
    }
  }, [items, renderGroup, renderItems]);

  return (
    <StyledList
      {...getMenuProps({
        maxHeight,
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
        ...rest,
      })}
    >
      {isOpen && renderChildren}
    </StyledList>
  );
});

const Item = memo(({ getItemProps, isHighlighted, item, index }: any) => {
  return (
    <StyledListItem
      {...getItemProps({
        actionType: item.actionType || 'normal',
        index,
        item,
        isAction: true,
        isHighlighted,
      })}
    >
      {getContent(item, isHighlighted)}
    </StyledListItem>
  );
});

export const Dropdown = memo(
  ({
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

    const { styles, attributes } = usePopper(referenceRef.current, popperRef.current, {
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
        if (!selectedItem) {
          return;
        }

        if (selectedItem.type !== 'link' && typeof selectedItem.onItemClick === 'function') {
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
          <Menu
            {...rest}
            getItemProps={getItemProps}
            getMenuProps={getMenuProps}
            highlightedIndex={highlightedIndex}
            items={items}
            maxHeight={maxHeight}
            isOpen={isOpen}
          />
        </StyledMenuContainer>
      </StyledBox>
    );
  },
);

const flattenItems = (
  items: Array<DropdownItem | DropdownLinkItem> | DropdownItemGroup[],
): Array<DropdownItem | DropdownLinkItem> => {
  return items.every(isGroup)
    ? (items as DropdownItemGroup[])
        .map((group: DropdownItemGroup) => group.items)
        .reduce((acum, curr) => acum.concat(curr), [])
    : (items as DropdownItem[]);
};

const isGroup = (item: DropdownItem | DropdownLinkItem | DropdownItemGroup) => {
  return 'items' in item && !('content' in item);
};

const isItem = (item: DropdownItem | DropdownLinkItem | DropdownItemGroup) => {
  return 'content' in item && !('items' in item);
};

const renderIcon = (item: DropdownItem | DropdownLinkItem, isHighlighted: boolean) => {
  return (
    isValidElement(item.icon) &&
    cloneElement(item.icon, {
      color: iconColor(item, isHighlighted),
      size: 'large',
    })
  );
};

const getContent = (item: DropdownItem | DropdownLinkItem, isHighlighted: boolean) => {
  const { disabled: itemDisabled, icon, tooltip } = item;

  const baseContent = (
    <Flex alignItems="center" flexDirection="row">
      {icon && <FlexItem paddingRight="xSmall">{renderIcon(item, isHighlighted)}</FlexItem>}
      {item.content}
    </Flex>
  );

  const content = item.type === 'link' && !itemDisabled ? wrapInLink(item, baseContent) : baseContent;

  return itemDisabled && tooltip ? wrapInTooltip(tooltip, content) : content;
};

const iconColor = (item: DropdownItem | DropdownLinkItem, isHighlighted: boolean) => {
  if (item.disabled) {
    return 'secondary40';
  }

  if (!isHighlighted) {
    return 'secondary60';
  }

  return item.actionType === 'destructive' ? 'danger50' : 'primary';
};

const wrapInLink = (item: DropdownLinkItem, content: React.ReactChild) => {
  return (
    <StyledLink href={item.url} tabIndex={-1} target={item.target}>
      {content}
    </StyledLink>
  );
};

const wrapInTooltip = (tooltip: DropdownItem['tooltip'], tooltipTrigger: React.ReactChild) => {
  return (
    <Tooltip
      placement="left"
      trigger={tooltipTrigger}
      modifiers={[{ name: 'preventOverflow' }, { name: 'offset', options: { offset: [0, 20] } }]}
      inline={false}
    >
      {tooltip}
    </Tooltip>
  );
};
