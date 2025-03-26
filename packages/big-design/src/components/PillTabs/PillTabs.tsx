import { CheckIcon, MoreHorizIcon } from '@bigcommerce/big-design-icons';
import React, { createRef, useCallback, useEffect, useMemo, useState } from 'react';

import { useWindowResizeListener } from '../../hooks';
import { Button } from '../Button';
import { Dropdown, DropdownProps } from '../Dropdown';
import { isGroups as isDropdownGroups } from '../Dropdown/Dropdown';
import { Flex } from '../Flex';

import { StyledFlexItem, StyledPillTab } from './styled';
import { groupWrapperExtraWidth, NonPillTabGroup, PillTabGroup } from './PittTabGroup';
import { flattenItems } from './flattenItems';

export interface PillTabItem {
  id: string;
  title: string;
}

export interface PillTabGroup {
  label?: string;
  items: PillTabItem[];
}

type ItemsOrGroups = PillTabItem[] | PillTabGroup[];

const isGroups = (items: ItemsOrGroups): items is PillTabGroup[] =>
  items.length > 0 && 'items' in items[0];

export interface PillTabsProps {
  items: ItemsOrGroups;
  activePills: string[];
  onPillClick: (itemId: string) => void;
  dropdownItems?: DropdownProps['items'];
}

export const PillTabs: React.FC<PillTabsProps> = ({
  activePills,
  items: itemsOrGroups,
  onPillClick,
  dropdownItems: dropdownItemsOrGroups = [],
}) => {
  const groups = useMemo(
    () => (isGroups(itemsOrGroups) ? itemsOrGroups : [{ items: itemsOrGroups, label: undefined }]),
    [itemsOrGroups],
  );
  const allItems = useMemo(() => flattenItems(groups), [groups]);

  const dropdownGroups = isDropdownGroups(dropdownItemsOrGroups)
    ? dropdownItemsOrGroups
    : [{ items: dropdownItemsOrGroups }];

  const hasDropDownItems = useMemo(() => flattenItems(dropdownGroups).length > 0, [dropdownGroups]);

  const parentRef = createRef<HTMLDivElement>();
  const dropdownRef = createRef<HTMLDivElement>();
  const [isMenuVisible, setIsMenuVisible] = useState(hasDropDownItems);
  const [pillsState, setPillsState] = useState(
    groups.map(({ items, ...rest }) => ({
      ...rest,
      isVisible: true,
      items: items.map((item) => ({
        isVisible: true,
        item,
        ref: createRef<HTMLDivElement>(),
      })),
    })),
  );

  const hideOverflowedPills = useCallback(() => {
    const parentWidth = parentRef.current?.offsetWidth;
    const dropdownWidth = dropdownRef.current?.offsetWidth;

    if (!parentWidth || !dropdownWidth) {
      return;
    }

    let remainingWidth = parentWidth;

    const newState = pillsState
      .map(({ items, ...rest }, groupIndex) => {
        if (groupIndex !== 0) {
          // crude mechanism for taking into account the extra width that group wrappers add
          remainingWidth -= groupWrapperExtraWidth;
        }

        return {
          ...rest,
          items: items.map((stateObj) => {
            const pillWidth = stateObj.ref.current?.offsetWidth;

            if (!pillWidth) {
              return stateObj;
            }

            if (remainingWidth - pillWidth >= dropdownWidth) {
              remainingWidth -= pillWidth;

              return {
                ...stateObj,
                isVisible: true,
              };
            }

            return {
              ...stateObj,
              isVisible: false,
            };
          }),
        };
      })
      .map((group) => ({
        ...group,
        isVisible: group.items.some(({ isVisible }) => isVisible),
      }));

    const visiblePills = flattenItems(pillsState).filter((stateObj) => stateObj.isVisible);
    const newVisiblePills = flattenItems(newState).filter((stateObj) => stateObj.isVisible);

    if (visiblePills.length !== newVisiblePills.length) {
      setIsMenuVisible(hasDropDownItems || newVisiblePills.length !== allItems.length);
      setPillsState(newState);
    }
  }, [groups, parentRef, dropdownRef, pillsState]);

  const renderedDropdown = useMemo(() => {
    const pillTabDropdownItems = pillsState
      .map(({ items, ...rest }) => ({
        ...rest,
        items: items.filter(({ isVisible }) => !isVisible),
      }))
      .filter(({ items }) => items.length > 0)
      .map(({ items, isVisible }, groupIndex) => ({
        separated: groupIndex !== 0,
        isVisible,
        items: items.map((stateObj) => {
          const item = allItems.find(({ title }) => title === stateObj.item.title);
          const isActive = item ? activePills.includes(item.id) : false;

          return {
            content: stateObj.item.title,
            onItemClick: () => onPillClick(stateObj.item.id),
            hash: stateObj.item.title.toLowerCase(),
            icon: isActive ? <CheckIcon /> : undefined,
          };
        }),
      }));

    return (
      <StyledFlexItem
        data-testid="pilltabs-dropdown-toggle"
        isVisible={isMenuVisible}
        ref={dropdownRef}
        role="listitem"
      >
        <Dropdown
          items={[
            ...pillTabDropdownItems,
            ...dropdownGroups.map((group, index) => ({
              ...group,
              separated: (index === 0 && pillTabDropdownItems.length > 0) || group.separated,
            })),
          ]}
          toggle={
            <Button iconOnly={<MoreHorizIcon title="add" />} type="button" variant="subtle" />
          }
        />
      </StyledFlexItem>
    );
  }, [groups, pillsState, isMenuVisible, dropdownRef, activePills, onPillClick]);

  useEffect(() => {
    const itemIds = allItems.map((item) => item.id);
    const stateIds = flattenItems(pillsState).map((stateItem) => stateItem.item.id);

    // The item ids and their order must match exactly with the internal state, if not, the state needs to be synced up
    if (itemIds.join() !== stateIds.join()) {
      const newState = groups
        .map(({ items, ...rest }) => ({
          ...rest,
          items: items.map((item) => {
            const oldItem = pillsState
              .flatMap(({ items }) => items)
              .find((stateItem) => stateItem.item === item);

            if (oldItem) {
              return oldItem;
            }

            return {
              // hideOverflownPills will correct this field if it needs correction
              isVisible: true,
              item,
              ref: createRef<HTMLDivElement>(),
            };
          }),
        }))
        .map((group) => ({
          ...group,
          isVisible: group.items.some(({ isVisible }) => isVisible),
        }));

      setPillsState(newState);
    }
  }, [groups, pillsState]);

  const hasGroups = useMemo(() => groups.length > 1, [groups]);
  const GroupWrapper = useMemo(() => (hasGroups ? PillTabGroup : NonPillTabGroup), [hasGroups]);

  const renderedPills = useMemo(
    () =>
      groups.map((group, groupIndex) => (
        <GroupWrapper
          aria-label={group.label}
          data-testid={`pilltabs-group-${groupIndex}`}
          key={groupIndex}
          isVisible={pillsState[groupIndex].isVisible}
        >
          {group.items.map((item, itemIndex) => {
            const pill = pillsState[groupIndex].items[itemIndex];

            if (!pill) {
              return;
            }

            return (
              <StyledFlexItem
                data-testid={
                  hasGroups
                    ? `pilltabs-group-${groupIndex}-pill-${itemIndex}`
                    : `pilltabs-pill-${itemIndex}`
                }
                isVisible={pill.isVisible}
                key={itemIndex}
                ref={pill.ref}
                role="listitem"
              >
                <StyledPillTab
                  disabled={!pill.isVisible}
                  isActive={activePills.includes(item.id)}
                  marginRight="xSmall"
                  onClick={() => onPillClick(item.id)}
                  type="button"
                  variant="subtle"
                >
                  {item.title}
                </StyledPillTab>
              </StyledFlexItem>
            );
          })}
        </GroupWrapper>
      )),
    [groups, pillsState, activePills, onPillClick],
  );

  useEffect(() => {
    hideOverflowedPills();
  }, [groups, parentRef, pillsState, hideOverflowedPills]);

  useWindowResizeListener(() => {
    hideOverflowedPills();
  });

  return allItems.length > 0 ? (
    <Flex
      data-testid="pilltabs-wrapper"
      flexDirection="row"
      flexWrap="nowrap"
      ref={parentRef}
      role="list"
    >
      {renderedPills}
      {renderedDropdown}
    </Flex>
  ) : null;
};

PillTabs.displayName = 'Pill Tabs';
