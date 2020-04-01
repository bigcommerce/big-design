import { useSelect, UseSelectState } from 'downshift';
import React, { memo, useCallback, useMemo, useRef, Fragment } from 'react';
import { Manager, Popper, Reference } from 'react-popper';

import { useUniqueId } from '../../hooks';
import { Flex } from '../Flex';
import { FlexItem } from '../Flex/Item';
import { List } from '../List';
import { ListGroupHeader } from '../List/GroupHeader';
import { ListItem } from '../List/Item';
import { Tooltip } from '../Tooltip';

import { StyledLink } from './styled';
import { DropdownItem, DropdownItemGroup, DropdownLinkItem, DropdownProps } from './types';

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

    // We need to keep track of key since we need to use it between groups.
    const itemKey = useRef(0);

    const dropdownUniqueId = useUniqueId('dropdown');

    const handleOnSelectedItemChange = ({
      selectedItem,
    }: Partial<UseSelectState<DropdownItem | DropdownLinkItem | null>>) => {
      if (!selectedItem) {
        return;
      }

      if (selectedItem.type !== 'link' && typeof selectedItem.onItemClick === 'function') {
        selectedItem.onItemClick(selectedItem);
      }
    };

    const { getItemProps, getMenuProps, getToggleButtonProps, highlightedIndex, isOpen } = useSelect<
      DropdownItem | DropdownLinkItem | null
    >({
      circularNavigation: true,
      defaultHighlightedIndex: 0,
      id: dropdownUniqueId,
      itemToString: item => (item ? item.content : ''),
      items: onlyItems,
      menuId: id,
      onSelectedItemChange: handleOnSelectedItemChange,
      selectedItem: null,
      toggleButtonId: toggle.props.id,
    });

    const renderToggle = useMemo(() => {
      return (
        <Reference>
          {({ ref }) =>
            React.isValidElement(toggle) &&
            React.cloneElement<React.HTMLAttributes<any> & React.RefAttributes<any>>(toggle as any, {
              ...getToggleButtonProps({
                disabled,
                ref,
              }),
            })
          }
        </Reference>
      );
    }, [disabled, getToggleButtonProps, toggle]);

    const renderItem = useCallback(
      (item: DropdownItem) => {
        const { actionType, content, disabled: itemDisabled, hash, onItemClick, type, ...itemProps } = item;
        const key = itemKey.current;
        const isHighlighted = highlightedIndex === key;

        itemKey.current += 1;

        return (
          <ListItem
            {...itemProps}
            {...getItemProps({
              disabled: itemDisabled,
              index: key,
              item,
            })}
            actionType={actionType}
            isAction={true}
            isHighlighted={isHighlighted}
            key={`${content}-${key}`}
          >
            {getContent(item, isHighlighted)}
          </ListItem>
        );
      },
      [getItemProps, highlightedIndex],
    );

    const renderLinkItem = useCallback(
      (item: DropdownLinkItem) => {
        const { actionType, content, disabled: itemDisabled, url, target, type, ...itemProps } = item;
        const key = itemKey.current;
        const isHighlighted = highlightedIndex === key;

        itemKey.current += 1;

        return (
          <ListItem
            {...itemProps}
            {...getItemProps({
              disabled: itemDisabled,
              index: key,
              item,
            })}
            actionType={actionType}
            isAction={true}
            isHighlighted={isHighlighted}
            key={`${content}-${key}`}
          >
            {getContent(item, isHighlighted)}
          </ListItem>
        );
      },
      [getItemProps, highlightedIndex],
    );

    const renderItems = useCallback(
      (dropdownItems: Array<DropdownItem | DropdownLinkItem>) => {
        return (
          Array.isArray(dropdownItems) &&
          dropdownItems.map(item => (item.type === 'link' ? renderLinkItem(item) : renderItem(item)))
        );
      },
      [renderItem, renderLinkItem],
    );

    const renderGroup = useCallback(
      (group: DropdownItemGroup) => {
        return (
          <>
            <ListGroupHeader>{group.label}</ListGroupHeader>
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
        return (
          isOpen &&
          (items as DropdownItemGroup[]).map((group, index) => <Fragment key={index}>{renderGroup(group)}</Fragment>)
        );
      }

      if (Array.isArray(items) && items.every(isItem)) {
        return isOpen && renderItems(items as Array<DropdownItem | DropdownLinkItem>);
      }
    }, [isOpen, items, renderGroup, renderItems]);

    const renderList = useMemo(
      () => (
        <Popper eventsEnabled={isOpen} modifiers={{ offset: { offset: '0, 10' } }} placement={placement}>
          {({ placement: popperPlacement, ref, scheduleUpdate, style: popperStyle }) => {
            return (
              <List
                {...rest}
                {...getMenuProps({
                  onKeyDown: event => {
                    if (event.key === 'Enter') {
                      const element = event.currentTarget.children[highlightedIndex];
                      const link = element.querySelector('a');

                      // We want to click the link if it is selected
                      if (link) {
                        link.click();
                      }
                    }
                  },
                  ref,
                })}
                data-placement={popperPlacement}
                isOpen={isOpen}
                maxHeight={maxHeight}
                scheduleUpdate={scheduleUpdate}
                style={popperStyle}
              >
                {renderChildren}
              </List>
            );
          }}
        </Popper>
      ),
      [getMenuProps, highlightedIndex, isOpen, maxHeight, placement, renderChildren, rest],
    );

    return (
      <Manager>
        {renderToggle}
        {renderList}
      </Manager>
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
    React.isValidElement(item.icon) &&
    React.cloneElement(item.icon, {
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
      modifiers={{
        preventOverflow: { enabled: true, escapeWithReference: true },
        offset: { offset: '0, 20' },
      }}
      inline={false}
    >
      {tooltip}
    </Tooltip>
  );
};
