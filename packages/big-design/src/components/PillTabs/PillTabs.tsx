import { MoreHorizIcon } from '@bigcommerce/big-design-icons';
import React, { Fragment, useCallback, useMemo, useRef, useState } from 'react';

import { useIsomorphicLayoutEffect } from '../../hooks';
import { Button } from '../Button';
import { Dropdown, DropdownProps } from '../Dropdown';
import { Flex } from '../Flex';

import { StyledFlexItem, StyledGroupSeparator, StyledPillTab } from './styled';
import { toDropdownItem } from './toDropDownItem';
import { toDropdownItemGroups } from './toDropdownItemGroups';
import { useAvailableWidth } from './useAvailableWidth';

// Constants for width calculations
const PILL_MARGIN_RIGHT = 8; // xSmall spacing from theme
const SEPARATOR_WIDTH = 17; // border (1px) + margins (8px + 8px)

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
  // Stable refs for parent and dropdown
  const parentRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Stable refs for pill elements - stored in a ref to persist across renders
  const pillRefs = useRef<Array<HTMLDivElement | null>>([]);

  // State to store measured widths - triggers re-render when measurements change
  const [pillWidths, setPillWidths] = useState<number[]>([]);

  const refs = { parent: parentRef, dropdown: dropdownRef };
  const availableWidth = useAvailableWidth(refs);

  // Normalize items into groups format
  const groups = useMemo(() => (isPillTabItemGroupArray(items) ? items : [{ items }]), [items]);

  // Flatten items with group metadata
  const pillsData = useMemo(
    () =>
      groups.flatMap((group, groupIndex) =>
        group.items.map(({ title, id }) => ({
          title,
          id,
          groupIndex,
          groupLabel: group.label,
          groupSeparated: group.separated,
        })),
      ),
    [groups],
  );

  // Callback ref setter for each pill
  const setPillRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      pillRefs.current[index] = el;
    },
    [],
  );

  // Measure pill widths after DOM render
  useIsomorphicLayoutEffect(() => {
    const widths = pillRefs.current.slice(0, pillsData.length).map((ref) => ref?.offsetWidth || 0);

    // Only update state if widths actually changed to avoid infinite loops
    const widthsChanged =
      widths.length !== pillWidths.length || widths.some((w, i) => w !== pillWidths[i]);

    if (widthsChanged) {
      setPillWidths(widths);
    }
  }, [pillsData.length, availableWidth, pillWidths]);

  // Check if we have multiple groups (for separator rendering)
  const hasMultipleGroups = groups.length > 1;

  // Calculate visibility using stored widths
  const { pills } = pillsData.reduce<{ pills: Pill[]; widthBudget: number }>(
    (acc, item, index) => {
      const pillWidth = pillWidths[index] || 0;

      // Calculate space needed for this pill (including margin)
      let spaceNeeded = pillWidth + PILL_MARGIN_RIGHT;

      // Add separator width if this is first pill in a new group
      const previousPill = acc.pills[index - 1];
      const isFirstInGroup = previousPill && previousPill.groupIndex !== item.groupIndex;

      if (hasMultipleGroups && isFirstInGroup) {
        spaceNeeded += SEPARATOR_WIDTH;
      }

      const widthBudget = acc.widthBudget - spaceNeeded;
      const pill: Pill = {
        title: item.title,
        onClick: () => onPillClick(item.id),
        isActive: activePills.includes(item.id),
        groupIndex: item.groupIndex,
        groupLabel: item.groupLabel,
        groupSeparated: item.groupSeparated,
        isVisible: widthBudget >= 0,
      };

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

  return (
    <Flex
      data-testid="pilltabs-wrapper"
      flexDirection="row"
      flexWrap="nowrap"
      ref={refs.parent}
      role="list"
    >
      {pills.map(({ isVisible, title, isActive, onClick, groupIndex }, index) => {
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
              ref={setPillRef(index)}
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
