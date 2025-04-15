import { CheckIcon, MoreHorizIcon } from '@bigcommerce/big-design-icons';
import React, { createRef, useMemo } from 'react';

import { Button } from '../Button';
import { Dropdown } from '../Dropdown';
import { Flex } from '../Flex';

import { StyledFlexItem, StyledPillTab } from './styled';
import { useAvailableWidth } from './useAvailableWidth';

export interface PillTabItem {
  id: string;
  title: string;
}

interface Pill extends PillTabItem {
  isVisible: boolean;
  ref: React.RefObject<HTMLDivElement>;
}

export interface PillTabsProps {
  items: PillTabItem[];
  activePills: string[];
  onPillClick: (itemId: string) => void;
}

export const PillTabs: React.FC<PillTabsProps> = ({ activePills, items, onPillClick }) => {
  const refs = { parent: createRef<HTMLDivElement>(), dropdown: createRef<HTMLDivElement>() };
  const availableWidth = useAvailableWidth(refs);

  const itemsWithRefs = useMemo(
    () => items.map((item) => ({ ...item, isVisible: true, ref: createRef<HTMLDivElement>() })),
    [items],
  );

  const { pills } = itemsWithRefs.reduce<{ pills: Pill[]; widthBudget: number }>(
    (acc, pill) => {
      const pillWidth = pill.ref.current?.offsetWidth || 0;
      const widthBudget = acc.widthBudget - pillWidth;
      const updatedPill = { ...pill, isVisible: widthBudget >= 0 };

      return { pills: [...acc.pills, updatedPill], widthBudget };
    },
    { pills: [], widthBudget: availableWidth },
  );

  const dropdownItems = pills
    .filter(({ isVisible }) => !isVisible)
    .map(({ title, id }) => ({
      content: title,
      onItemClick: () => onPillClick(id),
      hash: title.toLowerCase(),
      icon: activePills.includes(id) ? <CheckIcon /> : undefined,
    }));

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
      {pills.map(({ id, isVisible, ref, title }, index) => (
        <StyledFlexItem
          data-testid={`pilltabs-pill-${index}`}
          isVisible={isVisible}
          key={index}
          ref={ref}
          role="listitem"
        >
          <StyledPillTab
            disabled={!isVisible}
            isActive={activePills.includes(id)}
            marginRight="xSmall"
            onClick={() => onPillClick(id)}
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
