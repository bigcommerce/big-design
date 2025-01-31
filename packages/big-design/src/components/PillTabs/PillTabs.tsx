import { CheckIcon, MoreHorizIcon } from '@bigcommerce/big-design-icons';
import React, { createRef, useCallback, useEffect, useMemo, useState } from 'react';

import { useWindowResizeListener } from '../../hooks';
import { Button } from '../Button';
import { Dropdown, DropdownItemGroup } from '../Dropdown';
import { Flex } from '../Flex';

import { StyledFlexItem, StyledPillTab } from './styled';

export interface PillTabItem {
  id: string;
  title: string;
  separator?: boolean;
}

export interface PillTabsProps {
  items: PillTabItem[];
  activePills: string[];
  onPillClick: (itemId: string) => void;
}

export const PillTabs: React.FC<PillTabsProps> = ({ activePills, items, onPillClick }) => {
  const parentRef = createRef<HTMLDivElement>();
  const dropdownRef = createRef<HTMLDivElement>();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [pillsState, setPillsState] = useState(
    items.map((item) => ({
      isVisible: true,
      item,
      ref: createRef<HTMLDivElement>(),
    })),
  );

  const hideOverflowedPills = useCallback(() => {
    const parentWidth = parentRef.current?.offsetWidth;
    const dropdownWidth = dropdownRef.current?.offsetWidth;

    if (!parentWidth || !dropdownWidth) {
      return;
    }

    let remainingWidth = parentWidth;
    let spaceAvailable = true;

    const newState = pillsState.map((stateObj) => {
      if (spaceAvailable) {
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

        spaceAvailable = false;
      }

      return {
        ...stateObj,
        isVisible: false,
      };
    });

    const visiblePills = pillsState.filter((stateObj) => stateObj.isVisible);
    const newVisiblePills = newState.filter((stateObj) => stateObj.isVisible);

    if (visiblePills.length !== newVisiblePills.length) {
      setIsMenuVisible(newVisiblePills.length !== items.length);
      setPillsState(newState);
    }
  }, [items, parentRef, dropdownRef, pillsState]);

  const renderedDropdown = useMemo(() => {
    const groupedItems: DropdownItemGroup[] = [{ items: [], separated: false }];
    const dropdownItems = pillsState.filter((stateObj) => !stateObj.isVisible);

    dropdownItems.forEach((stateObj) => {
      const theItem = stateObj.item;

      if (theItem.separator === true && groupedItems[groupedItems.length - 1].items.length > 0) {
        groupedItems.push({ items: [], separated: true });
      }

      const item = items.find(({ title }) => title === theItem.title);
      const isActive = item ? activePills.includes(item.id) : false;

      groupedItems[groupedItems.length - 1].items.push({
        content: theItem.title,
        onItemClick: () => onPillClick(theItem.id),
        hash: theItem.title.toLowerCase(),
        icon: isActive ? <CheckIcon /> : undefined,
      });
    });

    return (
      <StyledFlexItem
        data-testid="pilltabs-dropdown-toggle"
        isVisible={isMenuVisible}
        ref={dropdownRef}
        role="listitem"
        separator={false}
      >
        <Dropdown
          items={groupedItems}
          toggle={
            <Button
              iconOnly={<MoreHorizIcon title="add" />}
              mobileWidth="auto"
              type="button"
              variant="subtle"
            />
          }
        />
      </StyledFlexItem>
    );
  }, [items, pillsState, isMenuVisible, dropdownRef, activePills, onPillClick]);

  useEffect(() => {
    const itemIds = items.map((item) => item.id);
    const stateIds = pillsState.map((stateItem) => stateItem.item.id);

    // The item ids and their order must match exactly with the internal state, if not, the state needs to be synced up
    if (itemIds.join() !== stateIds.join()) {
      const newState = items.map((item) => {
        const oldItem = pillsState.find((stateItem) => stateItem.item === item);

        if (oldItem) {
          return oldItem;
        }

        return {
          // hideOverflownPills will correct this field if it needs correction
          isVisible: true,
          item,
          ref: createRef<HTMLDivElement>(),
        };
      });

      setPillsState(newState);
    }
  }, [items, pillsState]);

  const renderedPills = useMemo(
    () =>
      items.map((item, index) => {
        const pill = pillsState[index];

        if (!pill) {
          return;
        }

        return (
          <StyledFlexItem
            data-testid={`pilltabs-pill-${index}`}
            isVisible={pill.isVisible}
            key={index}
            ref={pill.ref}
            role="listitem"
            separator={!!pill.item.separator}
          >
            <StyledPillTab
              disabled={!pill.isVisible}
              isActive={activePills.includes(item.id)}
              marginRight="xSmall"
              onClick={() => onPillClick(item.id)}
              type="button"
              variant="subtle"
            >
              {item.title}
            </StyledPillTab>
          </StyledFlexItem>
        );
      }),
    [items, pillsState, activePills, onPillClick],
  );

  useEffect(() => {
    hideOverflowedPills();
  });

  useWindowResizeListener(() => {
    hideOverflowedPills();
  });

  return items.length > 0 ? (
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
