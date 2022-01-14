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

    const newState = pillsState.map((stateObj) => {
      const pillWidth = stateObj.ref.current?.offsetWidth;

      if (!pillWidth) {
        return stateObj;
      }

      if (remainingWidth - pillWidth > dropdownWidth) {
        remainingWidth = remainingWidth - pillWidth;

        return {
          ...stateObj,
          isVisible: true,
        };
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

    return (
      <StyledFlexItem
        data-testid="pilltabs-dropdown-toggle"
        isVisible={isMenuVisible}
        ref={dropdownRef}
        role="listitem"
      >
        <Dropdown items={dropdownItems} toggle={<Button iconOnly={<MoreHorizIcon title="add" />} variant="subtle" />} />
      </StyledFlexItem>
    );
  }, [items, pillsState, isMenuVisible, dropdownRef, activePills, onPillClick]);

  useEffect(() => {
    if (items.length !== pillsState.length) {
      const newState = items.map((item) => {
        const oldItem = pillsState.filter((stateItem) => stateItem.item === item)[0];

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

        // pillsState might be temporarily out of sync. Ignore missing pills while it updates
        if (!pill) {
          return;
        }

        return (
          <StyledFlexItem
            data-testid={`pilltabs-pill-${index}`}
            key={index}
            ref={pill.ref}
            isVisible={pill.isVisible}
            role="listitem"
          >
            <StyledPillTab
              disabled={!pill.isVisible}
              variant="subtle"
              isActive={activePills.includes(item.id)}
              onClick={() => onPillClick(item.id)}
              marginRight="xSmall"
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
  }, [items, parentRef, pillsState, hideOverflowedPills]);

  useWindowResizeListener(() => {
    hideOverflowedPills();
  });

  return items.length > 0 ? (
    <Flex data-testid="pilltabs-wrapper" flexDirection="row" flexWrap="nowrap" ref={parentRef} role="list">
      {renderedPills}
      {renderedDropdown}
    </Flex>
  ) : null;
};

PillTabs.displayName = 'Pill Tabs';
