import { MoreHorizIcon } from '@bigcommerce/big-design-icons';
import React, { Fragment, useCallback, useMemo, useRef, useState } from 'react';

import { useIsomorphicLayoutEffect } from '../../hooks';
import { Button } from '../Button';
import { Dropdown, DropdownItem, DropdownProps } from '../Dropdown';
import { Flex } from '../Flex';

import { StyledFlexItem, StyledGroupSeparator, StyledPillTab } from './styled';
import { toDropdownItem } from './toDropDownItem';
import { toDropdownItemGroups } from './toDropdownItemGroups';
import { useAvailableWidth } from './useAvailableWidth';

// Constants for width calculations
// NOTE:
// - PILL_MARGIN_RIGHT is intentionally tied to the design-system's xSmall horizontal spacing token.
//   At the time of writing, theme.spacing.xSmall resolves to 8px, which is what we hard-code here.
// - SEPARATOR_WIDTH is the total horizontal space taken by the group separator:
//   1px border + left margin (8px) + right margin (8px) = 17px.
//
// These values are hard-coded to avoid pulling theme values at module load time and to keep the
// width calculations referentially transparent. If the theme's xSmall spacing or the separator's
// border/margin specs change, these constants MUST be updated to match the new design tokens to
// prevent layout regressions in PillTabs.
const PILL_MARGIN_RIGHT = 8;
const SEPARATOR_WIDTH = 17;

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
  id: string;
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

// Type guard to determine if the provided items are PillTabItemGroup[]
export const isPillTabItemGroupArray = (
  items: PillTabItem[] | PillTabItemGroup[],
): items is PillTabItemGroup[] =>
  items.length > 0 && items.every((item) => 'items' in item && !('title' in item));

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

    // Use functional update to avoid including pillWidths in dependencies
    setPillWidths((prevWidths) => {
      const widthsChanged =
        widths.length !== prevWidths.length || widths.some((w, i) => w !== prevWidths[i]);

      return widthsChanged ? widths : prevWidths;
    });
  }, [pillsData.length, availableWidth]);

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
        id: item.id,
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
  const overflowGroups = pills
    .filter(({ isVisible }) => !isVisible)
    .reduce<Array<{ label?: string; separated?: boolean; items: DropdownItem[] }>>((acc, pill) => {
      const existing = acc.find((group) => group.label === pill.groupLabel);

      if (existing) {
        existing.items.push(toDropdownItem(pill));
      } else {
        acc.push({
          label: pill.groupLabel,
          separated: pill.groupSeparated,
          items: [toDropdownItem(pill)],
        });
      }

      return acc;
    }, []);

  const dropdownItemGroups = toDropdownItemGroups({
    overflow: overflowGroups,
    custom: customDropdownItems,
  });

  if (pills.length === 0) {
    return null;
  }

  return (
    <Flex flexDirection="row" flexWrap="nowrap" ref={refs.parent} role="list">
      {pills.map(({ id, isVisible, title, isActive, onClick, groupIndex }, index) => {
        const previousPill = pills[index - 1];
        const isFirstInGroup = previousPill && previousPill.groupIndex !== groupIndex;
        const showSeparator = hasMultipleGroups && isFirstInGroup;
        // Separator is visible only if both the current pill and the previous pill are visible
        const separatorVisible = isVisible && previousPill?.isVisible;

        return (
          <Fragment key={id}>
            {showSeparator && (
              <StyledGroupSeparator isVisible={separatorVisible} role="separator" />
            )}
            <StyledFlexItem isVisible={isVisible} ref={setPillRef(index)} role="listitem">
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
      <StyledFlexItem isVisible={dropdownItemGroups.length > 0} ref={refs.dropdown} role="listitem">
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
