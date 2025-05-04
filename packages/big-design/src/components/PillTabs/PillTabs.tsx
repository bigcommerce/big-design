import { MoreHorizIcon } from '@bigcommerce/big-design-icons';
import React, { createRef, useMemo } from 'react';

import { Button } from '../Button';
import { Dropdown } from '../Dropdown';
import { Flex } from '../Flex';

import { StyledFlexItem, StyledPillTab } from './styled';
import { useAvailableWidth } from './useAvailableWidth';
import { toDropdownItem } from './toDropDownItem';

export interface PillTabItem {
  id: string;
  title: string;
}

interface Pill {
  title: string;
  isVisible: boolean;
  ref: React.RefObject<HTMLDivElement>;
  onClick: () => void;
  isActive: boolean;
}

export interface PillTabsProps {
  items: PillTabItem[];
  activePills: string[];
  onPillClick: (itemId: string) => void;
}

export const PillTabs: React.FC<PillTabsProps> = ({ activePills, items, onPillClick }) => {
  const refs = { parent: createRef<HTMLDivElement>(), dropdown: createRef<HTMLDivElement>() };
  const availableWidth = useAvailableWidth(refs);

  const pillsWithoutVisibility = useMemo(
    () =>
      items.map(({ title, id }) => ({
        title,
        onClick: () => onPillClick(id),
        isActive: activePills.includes(id),
        ref: createRef<HTMLDivElement>(),
      })),
    [items, activePills, onPillClick],
  );

  const { pills } = pillsWithoutVisibility.reduce<{ pills: Pill[]; widthBudget: number }>(
    (acc, item) => {
      const pillWidth = item.ref.current?.offsetWidth || 0;
      const widthBudget = acc.widthBudget - pillWidth;
      const pill = { ...item, isVisible: widthBudget >= 0 };

      return { pills: [...acc.pills, pill], widthBudget };
    },
    { pills: [], widthBudget: availableWidth },
  );

  const dropdownItems = pills.filter(({ isVisible }) => !isVisible).map(toDropdownItem);

  if (pills.length === 0) {
    return null;
  }

  return (
    <Flex
      data-testid="pilltabs-wrapper"
      flexDirection="row"
      flexWrap="nowrap"
      ref={refs.parent}
      role="list"
    >
      {pills.map(({ isVisible, ref, title, isActive, onClick }, index) => (
        <StyledFlexItem
          data-testid={`pilltabs-pill-${index}`}
          isVisible={isVisible}
          key={index}
          ref={ref}
          role="listitem"
        >
          <StyledPillTab
            disabled={!isVisible}
            isActive={isActive}
            marginRight="xSmall"
            onClick={onClick}
            type="button"
            variant="subtle"
          >
            {title}
          </StyledPillTab>
        </StyledFlexItem>
      ))}
      <StyledFlexItem
        data-testid="pilltabs-dropdown-toggle"
        isVisible={pills.some(({ isVisible }) => !isVisible)}
        ref={refs.dropdown}
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
