import { CheckIcon, MoreHorizIcon } from '@bigcommerce/big-design-icons';
import React, { createRef, useCallback, useEffect, useMemo, useState } from 'react';

import { useWindowResizeListener } from '../../hooks';
import { Button } from '../Button';
import { Dropdown } from '../Dropdown';
import { Flex } from '../Flex';

import { StyledFlexItem, StyledPillTab } from './styled';

export interface PillTabItem {
  text: string;
  isActive: boolean;
  onClick(item: PillTabItem): void;
}

export interface PillTabsProps {
  items: PillTabItem[];
}

// const DROPDOWN_MENU_WIDTH = 42;

export const PillTabs: React.FC<PillTabsProps> = ({ items }) => {
  const parentRef = createRef<HTMLDivElement>();
  const dropdownRef = createRef<HTMLDivElement>();
  const [pillsState, setPillsState] = useState(
    items.map((item) => ({
      isVisible: true,
      item,
      ref: createRef<HTMLDivElement>(),
    })),
  );
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const hideOverflownPills = useCallback(() => {
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

  useEffect(() => {
    hideOverflownPills();
  }, [items, parentRef, pillsState, hideOverflownPills]);

  useWindowResizeListener(() => {
    hideOverflownPills();
  });

  const renderDropdown = useCallback(() => {
    const dropdownItems = pillsState
      .filter((stateObj) => !stateObj.isVisible)
      .map((stateObj) => {
        const item = items.find((i) => i.text === stateObj.item.text);

        return {
          content: stateObj.item.text,
          onItemClick: () => stateObj.item.onClick(stateObj.item),
          hash: stateObj.item.text.toLowerCase(),
          icon: item?.isActive ? <CheckIcon /> : undefined,
        };
      });

    return (
      <StyledFlexItem data-testid="pilltabs-dropdown-toggle" isVisible={isMenuVisible} ref={dropdownRef}>
        <Dropdown items={dropdownItems} toggle={<Button iconOnly={<MoreHorizIcon title="add" />} variant="subtle" />} />
      </StyledFlexItem>
    );
  }, [items, pillsState, isMenuVisible, dropdownRef]);

  const renderedPills = useMemo(
    () =>
      items.map((item, index) => (
        <StyledFlexItem
          data-testid={`pilltabs-pill-${index}`}
          key={index}
          ref={pillsState[index].ref}
          isVisible={pillsState[index].isVisible}
        >
          <StyledPillTab
            disabled={!pillsState[index].isVisible}
            onClick={() => item.onClick(item)}
            variant="subtle"
            isActive={item.isActive}
          >
            {item.text}
          </StyledPillTab>
        </StyledFlexItem>
      )),
    [items, pillsState],
  );

  return (
    <Flex data-testid="pilltabs-wrapper" flexDirection="row" flexWrap="nowrap" ref={parentRef}>
      {renderedPills}
      {renderDropdown()}
    </Flex>
  );
};

PillTabs.displayName = 'Pill Tabs';
