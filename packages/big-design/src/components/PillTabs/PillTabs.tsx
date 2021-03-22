import { MoreHorizIcon } from '@bigcommerce/big-design-icons';
import React, { createRef, useCallback, useEffect, useMemo, useState } from 'react';

import { useWindowResizeListener } from '../../hooks';
import { Button } from '../Button';
import { Dropdown } from '../Dropdown';
import { Flex, FlexItem } from '../Flex';

import { StyledFlexItem, StyledPillTab } from './styled';

export interface PillTabItem {
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

    const newState = pillsState.map((stateObj) => {
      const pillWidth = stateObj.ref.current?.offsetWidth;

      if (!pillWidth) {
        return stateObj;
      }

      if (remainingWidth - pillWidth > 42) {
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
      <FlexItem alignSelf="flex-end">
        <Dropdown items={dropdownItems} toggle={<Button iconOnly={<MoreHorizIcon title="add" />} variant="subtle" />} />
      </FlexItem>
    );
  }, [pillsState]);

  const renderPills = useMemo(
    () =>
      items.map((item, index) => (
        <StyledFlexItem key={index} ref={pillsState[index].ref} isVisible={pillsState[index].isVisible}>
          <StyledPillTab onClick={() => item.onClick(item)} variant="subtle" isActive={item.isActive}>
            {item.text}
          </StyledPillTab>
        </StyledFlexItem>
      )),
    [items, pillsState],
  );

  return (
    <Flex flexDirection="row" flexWrap="nowrap" ref={parentRef}>
      {items.map((item, index) => (
        <StyledFlexItem key={index} ref={pillsState[index].ref} isVisible={pillsState[index].isVisible}>
          <StyledPillTab onClick={() => item.onClick(item)} variant="subtle" isActive={item.isActive}>
            {item.text}
          </StyledPillTab>
        </StyledFlexItem>
      ))}
      {renderPills}
      {isMenuVisible ? renderDropdown() : null}
    </Flex>
  );
};

PillTabs.displayName = 'Pill Tabs';
