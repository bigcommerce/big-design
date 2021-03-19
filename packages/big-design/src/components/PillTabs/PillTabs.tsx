import { MoreHorizIcon } from '@bigcommerce/big-design-icons';
import React, { createRef, useCallback, useEffect, useState } from 'react';

import { useWindowResizeListener } from '../../hooks';
import { Button } from '../Button';
import { Dropdown } from '../Dropdown';
import { Flex } from '../Flex';

import { StyledFlexItem, StyledPillTab } from './styled';

interface PillTabItem {
  text: string;
  isActive: boolean;
  onClick(item: PillTabItem): void;
}

interface PillTabsProps {
  items: PillTabItem[];
}

export const PillTabs: React.FC<PillTabsProps> = ({ items }) => {
  const parentRef = createRef<HTMLDivElement>();
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

    if (!parentWidth) {
      return;
    }

    let remainingWidth = parentWidth;
    console.log('----- REMAINING: ', remainingWidth);

    const newState = pillsState.map((stateObj) => {
      const pillWidth = stateObj.ref.current?.offsetWidth;

      console.log('pillWidth', pillWidth);
      if (!pillWidth) {
        return stateObj;
      }

      if (remainingWidth - pillWidth > 48) {
        remainingWidth = remainingWidth - pillWidth;
        console.log('Remaining width: ', remainingWidth);

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
  }, [items, parentRef, pillsState]);

  useEffect(() => {
    hideOverflownPills();
  }, [items, parentRef, pillsState, hideOverflownPills]);

  useWindowResizeListener(() => {
    hideOverflownPills();
  });

  const renderDropdown = useCallback(() => {
    const dropdownItems = pillsState
      .filter((stateObj) => !stateObj.isVisible)
      .map((stateObj) => ({
        content: stateObj.item.text,
        onItemClick: () => stateObj.item.onClick(stateObj.item),
        hash: stateObj.item.text.toLowerCase(),
      }));

    return (
      <Dropdown items={dropdownItems} toggle={<Button iconOnly={<MoreHorizIcon title="add" />} variant="subtle" />} />
    );
  }, [pillsState]);

  return (
    <Flex flexDirection="row" flexWrap="nowrap" ref={parentRef}>
      {items.map((item, index) => (
        <StyledFlexItem key={index} ref={pillsState[index].ref} isVisible={pillsState[index].isVisible}>
          <StyledPillTab onClick={() => item.onClick(item)} variant="subtle" isActive={item.isActive}>
            {item.text}
          </StyledPillTab>
        </StyledFlexItem>
      ))}
      {isMenuVisible ? renderDropdown() : null}
    </Flex>
  );
};

PillTabs.displayName = 'Pill Tabs';
