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
    () => items.map((item) => ({ ...item, isVisible: true, ref: createRef<HTMLDivElement>() })),
    [items],
  );

  const pills = useMemo(() => {
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

  const isMenuVisible = pills.some(({ isVisible }) => !isVisible);

  const dropdownItems = pills
    .filter((pill) => !pill.isVisible)
    .map((pill) => {
      return {
        content: pill.title,
        onItemClick: () => onPillClick(pill.id),
        hash: pill.title.toLowerCase(),
        icon: activePills.includes(pill.id) ? <CheckIcon /> : undefined,
      };
    });

  useEffect(updateAvailableWidth, [updateAvailableWidth]);

  useWindowResizeListener(updateAvailableWidth);

  if (pills.length === 0) {
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
      {pills.map((pill, index) => {
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
              isActive={activePills.includes(pill.id)}
              marginRight="xSmall"
              onClick={() => onPillClick(pill.id)}
              type="button"
              variant="subtle"
            >
              {pill.title}
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
