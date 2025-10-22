import { MoreHorizIcon } from '@bigcommerce/big-design-icons';
import React, { createRef, useMemo } from 'react';

import { Button } from '../Button';
import { Dropdown, DropdownProps } from '../Dropdown';
import { Flex } from '../Flex';

import { StyledFlexItem, StyledPillTab } from './styled';
import { toDropdownItem } from './toDropDownItem';
import { toDropdownItemGroups } from './toDropdownItemGroups';
import { useAvailableWidth } from './useAvailableWidth';

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
  readonly items: PillTabItem[];
  readonly activePills: string[];
  readonly onPillClick: (itemId: string) => void;
  readonly dropdownItems?: DropdownProps['items'];
}

export const PillTabs: React.FC<PillTabsProps> = ({
  activePills,
  items,
  onPillClick,
  dropdownItems: customDropdownItems = [],
}) => {
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

  const dropdownItemGroups = toDropdownItemGroups({
    overflow: pills.filter(({ isVisible }) => !isVisible).map(toDropdownItem),
    custom: customDropdownItems,
  });

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
        isVisible={dropdownItemGroups.length > 0}
        ref={refs.dropdown}
        role="listitem"
      >
        <Dropdown
          items={dropdownItemGroups}
          toggle={
            <Button iconOnly={<MoreHorizIcon title="add" />} type="button" variant="subtle" />
          }
        />
      </StyledFlexItem>
    </Flex>
  );
};

PillTabs.displayName = 'Pill Tabs';
