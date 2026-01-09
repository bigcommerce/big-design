import { MoreHorizIcon } from '@bigcommerce/big-design-icons';
import React, { createRef, Fragment, useMemo } from 'react';

import { Button } from '../Button';
import { Dropdown, DropdownProps } from '../Dropdown';
import { Flex } from '../Flex';

import { StyledFlexItem, StyledGroupSeparator, StyledPillTab } from './styled';
import { toDropdownItem } from './toDropDownItem';
import { toDropdownItemGroups } from './toDropdownItemGroups';
import { useAvailableWidth } from './useAvailableWidth';

export interface PillTabItem {
  id: string;
  title: string;
}

export interface PillTabItemGroup {
  label?: string;
  separated?: boolean;
  items: PillTabItem[];
}

interface Pill {
  title: string;
  isVisible: boolean;
  ref: React.RefObject<HTMLDivElement>;
  onClick: () => void;
  isActive: boolean;
  groupIndex: number;
  groupLabel?: string;
  groupSeparated?: boolean;
}

export interface PillTabsProps {
  items: PillTabItem[] | PillTabItemGroup[];
  activePills: string[];
  onPillClick: (itemId: string) => void;
  dropdownItems?: DropdownProps['items'];
}

export const isPillTabItemGroupArray = (
  items: PillTabItem[] | PillTabItemGroup[],
): items is PillTabItemGroup[] => items.every((item) => 'items' in item && !('title' in item));

export const PillTabs: React.FC<PillTabsProps> = ({
  activePills,
  items,
  onPillClick,
  dropdownItems: customDropdownItems = [],
}) => {
  const refs = { parent: createRef<HTMLDivElement>(), dropdown: createRef<HTMLDivElement>() };
  const availableWidth = useAvailableWidth(refs);

  // Normalize items into groups format
  const groups = useMemo(() => (isPillTabItemGroupArray(items) ? items : [{ items }]), [items]);

  // Flatten items with group metadata
  const pillsWithoutVisibility = useMemo(
    () =>
      groups.flatMap((group, groupIndex) =>
        group.items.map(({ title, id }) => ({
          title,
          onClick: () => onPillClick(id),
          isActive: activePills.includes(id),
          ref: createRef<HTMLDivElement>(),
          groupIndex,
          groupLabel: group.label,
          groupSeparated: group.separated,
        })),
      ),
    [groups, activePills, onPillClick],
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

  // Create dropdown groups from hidden pills, preserving group structure
  interface HiddenPillGroup {
    label?: string;
    separated?: boolean;
    pills: typeof pills;
  }

  const hiddenPillsByGroup = pills
    .filter(({ isVisible }) => !isVisible)
    .reduce<Map<number, HiddenPillGroup>>((acc, pill) => {
      const existing = acc.get(pill.groupIndex);

      if (existing) {
        existing.pills.push(pill);
      } else {
        acc.set(pill.groupIndex, {
          label: pill.groupLabel,
          separated: pill.groupSeparated,
          pills: [pill],
        });
      }

      return acc;
    }, new Map());

  const overflowGroups = Array.from(hiddenPillsByGroup.values()).map(
    ({ label, separated, pills: groupPills }) => ({
      label,
      separated,
      items: groupPills.map(toDropdownItem),
    }),
  );

  const dropdownItemGroups = toDropdownItemGroups({
    overflow: overflowGroups,
    custom: customDropdownItems,
  });

  if (pills.length === 0) {
    return null;
  }

  // Check if we have multiple groups (for separator rendering)
  const hasMultipleGroups = groups.length > 1;

  return (
    <Flex
      data-testid="pilltabs-wrapper"
      flexDirection="row"
      flexWrap="nowrap"
      ref={refs.parent}
      role="list"
    >
      {pills.map(({ isVisible, ref, title, isActive, onClick, groupIndex }, index) => {
        const previousPill = pills[index - 1];
        const isFirstInGroup = previousPill && previousPill.groupIndex !== groupIndex;
        const showSeparator = hasMultipleGroups && isFirstInGroup;
        // Separator is visible only if both the current pill and the previous pill are visible
        const separatorVisible = isVisible && previousPill?.isVisible;

        return (
          <Fragment key={index}>
            {showSeparator && (
              <StyledGroupSeparator
                data-testid={`pilltabs-separator-${index}`}
                isVisible={separatorVisible}
              />
            )}
            <StyledFlexItem
              data-testid={`pilltabs-pill-${index}`}
              isVisible={isVisible}
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
          </Fragment>
        );
      })}
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
