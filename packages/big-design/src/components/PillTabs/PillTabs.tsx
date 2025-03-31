import { CheckIcon, MoreHorizIcon } from '@bigcommerce/big-design-icons';
import React, { createRef, useCallback, useEffect, useMemo, useState } from 'react';

import { useWindowResizeListener } from '../../hooks';
import { Button } from '../Button';
import { Dropdown } from '../Dropdown';
import { Flex } from '../Flex';

import { StyledFlexItem, StyledPillTab } from './styled';

export interface PillTabItem {
  id: string;
  title: string;
}

export interface PillTabsProps {
  items: PillTabItem[];
  activePills: string[];
  onPillClick: (itemId: string) => void;
}

export const PillTabs: React.FC<PillTabsProps> = ({ activePills, items, onPillClick }) => {
  const parentRef = createRef<HTMLDivElement>();
  const dropdownRef = createRef<HTMLDivElement>();

  const [availableWidth, setAvailableWidth] = useState<number>(Infinity);
  const updateAvailableWidth = useCallback(() => {
    const parentWidth = parentRef.current?.offsetWidth;
    const dropdownWidth = dropdownRef.current?.offsetWidth;

    if (!parentWidth || !dropdownWidth) {
      return;
    }

    setAvailableWidth(parentWidth - dropdownWidth);
  }, [parentRef, dropdownRef]);

  const itemsWithRefs = useMemo(
    () => items.map((item) => ({ isVisible: true, item, ref: createRef<HTMLDivElement>() })),
    [items],
  );

  const pillsState = useMemo(() => {
    const [newState] = itemsWithRefs.reduce<[typeof itemsWithRefs, number]>(
      ([processedItems, widthBudget], currentItem) => {
        const currentItemWidth = currentItem.ref.current?.offsetWidth || 0;
        const updatedWidthBudget = widthBudget - currentItemWidth;

        return [
          [...processedItems, { ...currentItem, isVisible: updatedWidthBudget >= 0 }],
          updatedWidthBudget,
        ];
      },
      [[], availableWidth],
    );

    return newState;
  }, [itemsWithRefs, availableWidth]);

  const isMenuVisible = pillsState.some(({ isVisible }) => !isVisible);

  const dropdownItems = pillsState
    .filter((stateObj) => !stateObj.isVisible)
    .map((stateObj) => {
      const item = items.find(({ title }) => title === stateObj.item.title);
      const isActive = item ? activePills.includes(item.id) : false;

      return {
        content: stateObj.item.title,
        onItemClick: () => onPillClick(stateObj.item.id),
        hash: stateObj.item.title.toLowerCase(),
        icon: isActive ? <CheckIcon /> : undefined,
      };
    });

  useEffect(updateAvailableWidth, [updateAvailableWidth]);

  useWindowResizeListener(updateAvailableWidth);

  if (items.length === 0) {
    return null;
  }

  return (
    <Flex
      data-testid="pilltabs-wrapper"
      flexDirection="row"
      flexWrap="nowrap"
      ref={parentRef}
      role="list"
    >
      {items.map((item, index) => {
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
      })}
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
    </Flex>
  );
};

PillTabs.displayName = 'Pill Tabs';
