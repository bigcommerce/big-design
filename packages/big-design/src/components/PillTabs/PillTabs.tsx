import { CheckIcon, MoreHorizIcon } from '@bigcommerce/big-design-icons';
import React, { createRef, useCallback, useEffect, useMemo, useState } from 'react';

import { useWindowResizeListener } from '../../hooks';
import { Button } from '../Button';
import { Dropdown, DropdownItem } from '../Dropdown';
import { Flex } from '../Flex';

import { StyledFlexItem, StyledPillTab } from './styled';
import { PillTabGroup } from './PittTabGroup';

export interface PillTabItem extends Pick<DropdownItem, 'icon'> {
  id: string;
  title: string;
}

export interface PillTabGroup {
  label?: string;
  items: PillTabItem[];
}

type ItemsOrGroups = PillTabItem[] | PillTabGroup[];

const isGroups = (items: ItemsOrGroups): items is PillTabGroup[] =>
  items.length > 0 && 'items' in items[0];

export interface PillTabsProps {
  items: ItemsOrGroups;
  activePills: string[];
  onPillClick: (itemId: string) => void;
}

export const PillTabs: React.FC<PillTabsProps> = ({
  activePills,
  items: itemsOrGroups,
  onPillClick,
}) => {
  const groups = useMemo(
    () => (isGroups(itemsOrGroups) ? itemsOrGroups : [{ items: itemsOrGroups, label: undefined }]),
    [itemsOrGroups],
  );
  const atLeastOneItem = groups.flatMap(({ items }) => items).length >= 1;

  const parentRef = createRef<HTMLDivElement>();
  const dropdownRef = createRef<HTMLDivElement>();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [pillsState, setPillsState] = useState(
    groups.map(({ items, ...rest }) => ({
      ...rest,
      isVisible: true,
      items: items.map((item) => ({
        isVisible: true,
        item,
        ref: createRef<HTMLDivElement>(),
      })),
    })),
  );

  const hideOverflowedPills = useCallback(() => {
    const parentWidth = parentRef.current?.offsetWidth;
    const dropdownWidth = dropdownRef.current?.offsetWidth;

    if (!parentWidth || !dropdownWidth) {
      return;
    }

    let remainingWidth = parentWidth;

    const newState = pillsState
      .map(({ items, ...rest }, groupIndex) => {
        if (groupIndex !== 0) {
          remainingWidth -= 9; // crude hack for group padding and border
        }

        return {
          ...rest,
          items: items.map((stateObj) => {
            const pillWidth = stateObj.ref.current?.offsetWidth;

            if (!pillWidth) {
              return stateObj;
            }

            if (remainingWidth - pillWidth > dropdownWidth) {
              remainingWidth -= pillWidth;

              return {
                ...stateObj,
                isVisible: true,
              };
            }

            return {
              ...stateObj,
              isVisible: false,
            };
          }),
        };
      })
      .map((group) => ({
        ...group,
        isVisible: group.items.some(({ isVisible }) => isVisible),
      }));

    const visiblePills = pillsState
      .flatMap(({ items }) => items)
      .filter((stateObj) => stateObj.isVisible);
    const newVisiblePills = newState
      .flatMap(({ items }) => items)
      .filter((stateObj) => stateObj.isVisible);

    if (visiblePills.length !== newVisiblePills.length) {
      setIsMenuVisible(newVisiblePills.length !== groups.flatMap(({ items }) => items).length);
      setPillsState(newState);
    }
  }, [groups, parentRef, dropdownRef, pillsState]);

  const renderedDropdown = useMemo(() => {
    const dropdownItems = pillsState
      .map(({ items, ...rest }) => ({
        ...rest,
        items: items.filter(({ isVisible }) => !isVisible),
      }))
      .filter(({ items }) => items.length > 0)
      .map(({ items, isVisible }, groupIndex) => ({
        separated: groupIndex !== 0,
        isVisible,
        items: items.map((stateObj) => {
          const item = groups
            .flatMap(({ items }) => items)
            .find(({ title }) => title === stateObj.item.title);
          const isActive = item ? activePills.includes(item.id) : false;
          const activeIcon = isActive ? <CheckIcon /> : undefined;
          const icon = item?.icon || activeIcon;

          return {
            content: stateObj.item.title,
            onItemClick: () => onPillClick(stateObj.item.id),
            hash: stateObj.item.title.toLowerCase(),
            icon,
          };
        }),
      }));

    return (
      <StyledFlexItem
        data-testid="pilltabs-dropdown-toggle"
        isVisible={isMenuVisible}
        ref={dropdownRef}
        role="listitem"
      >
        <Dropdown
          items={dropdownItems}
          toggle={
            <Button iconOnly={<MoreHorizIcon title="add" />} type="button" variant="subtle" />
          }
        />
      </StyledFlexItem>
    );
  }, [groups, pillsState, isMenuVisible, dropdownRef, activePills, onPillClick]);

  useEffect(() => {
    const itemIds = groups.flatMap(({ items }) => items).map((item) => item.id);
    const stateIds = pillsState.flatMap(({ items }) => items).map((stateItem) => stateItem.item.id);

    // The item ids and their order must match exactly with the internal state, if not, the state needs to be synced up
    if (itemIds.join() !== stateIds.join()) {
      const newState = groups
        .map(({ items, ...rest }) => ({
          ...rest,
          items: items.map((item) => {
            const oldItem = pillsState
              .flatMap(({ items }) => items)
              .find((stateItem) => stateItem.item === item);

            if (oldItem) {
              return oldItem;
            }

            return {
              // hideOverflownPills will correct this field if it needs correction
              isVisible: true,
              item,
              ref: createRef<HTMLDivElement>(),
            };
          }),
        }))
        .map((group) => ({
          ...group,
          isVisible: group.items.some(({ isVisible }) => isVisible),
        }));

      setPillsState(newState);
    }
  }, [groups, pillsState]);

  const renderedPills = useMemo(
    () =>
      groups.map((group, groupIndex) => (
        <PillTabGroup
          aria-label={group.label}
          key={groupIndex}
          isVisible={pillsState[groupIndex].isVisible}
        >
          {group.items.map((item, itemIndex) => {
            const pill = pillsState[groupIndex].items[itemIndex];

            if (!pill) {
              return;
            }

            return (
              <StyledFlexItem
                data-testid={`pilltabs-pill-${itemIndex}`}
                isVisible={pill.isVisible}
                key={itemIndex}
                ref={pill.ref}
                role="listitem"
              >
                <StyledPillTab
                  disabled={!pill.isVisible}
                  isActive={activePills.includes(item.id)}
                  marginRight="xSmall"
                  onClick={() => onPillClick(item.id)}
                  type="button"
                  variant="subtle"
                  iconLeft={item.icon}
                >
                  {item.title}
                </StyledPillTab>
              </StyledFlexItem>
            );
          })}
        </PillTabGroup>
      )),
    [groups, pillsState, activePills, onPillClick],
  );

  useEffect(() => {
    hideOverflowedPills();
  }, [groups, parentRef, pillsState, hideOverflowedPills]);

  useWindowResizeListener(() => {
    hideOverflowedPills();
  });

  return atLeastOneItem ? (
    <Flex
      data-testid="pilltabs-wrapper"
      flexDirection="row"
      flexWrap="nowrap"
      ref={parentRef}
      role="list"
    >
      {renderedPills}
      {renderedDropdown}
    </Flex>
  ) : null;
};

PillTabs.displayName = 'Pill Tabs';
