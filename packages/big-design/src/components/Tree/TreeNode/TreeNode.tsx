import { CheckIcon, ChevronRightIcon, FolderIcon } from '@bigcommerce/big-design-icons';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { typedMemo } from '../../../utils';
import { StyledCheckbox } from '../../Checkbox/private';
import { FlexItemProps } from '../../Flex';
import { StyledRadio } from '../../Radio/styled';
import { DelayedSpinner } from '../DelayedSpinner';
import { useSelectedChildrenCount } from '../hooks/useSelectedChildrenCount';
import { StyledUl } from '../styled';
import { TreeContext } from '../Tree';
import { TreeNodeProps } from '../types';

import {
  StyledArrowWrapper,
  StyledFlex,
  StyledFlexItem,
  StyledGap,
  StyledLi,
  StyledSelectableWrapper,
  StyledText,
} from './styled';

const flexItemProps: FlexItemProps = { flexShrink: 0, marginLeft: 'xxSmall' };

const InternalTreeNode = <T extends unknown>({
  children,
  icon,
  label,
  value,
  id,
}: TreeNodeProps<T>): React.ReactElement<TreeNodeProps<T>> => {
  const { disabledNodes, expandable, focusable, iconless, onKeyDown, onNodeClick, selectable } = useContext(
    TreeContext,
  );
  const nodeRef = useRef<HTMLLIElement | null>(null);
  const selectableRef = useRef<HTMLLabelElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isExpanded = expandable.expandedNodes.includes(id);
  const isSelected = selectable?.selectedNodes?.includes(id);
  const isDisabled = disabledNodes?.includes(id);
  const isSelectable = value !== undefined && selectable?.type !== undefined && !isDisabled;
  const selectedChildrenCount = useSelectedChildrenCount({ selectedNodes: selectable?.selectedNodes, children });

  useEffect(() => {
    if (
      focusable.focusedNode === id &&
      nodeRef.current !== document.activeElement &&
      document.activeElement !== document.body
    ) {
      nodeRef.current?.focus();
    }
  }, [focusable, id]);

  // Could be multiple elements in which are clicked.
  // Typing to generic Element type since all other elements extend from it.
  const handleNodeToggle = useCallback(
    async (e?: React.MouseEvent<Element>) => {
      // Prevents the collapse/expand when clicking on a radio or checkbox
      // Checks to see if every element inside the selectableRef gets clicked.
      if ((e?.target instanceof Node && selectableRef.current?.contains(e?.target)) || children === undefined) {
        return;
      }

      if (typeof focusable.onFocus === 'function') {
        focusable.onFocus(id);
      }

      if (typeof expandable.onToggle === 'function') {
        await expandable.onToggle(id, isExpanded);
      }

      if (isExpanded) {
        if (typeof expandable.onCollapse === 'function') {
          await expandable.onCollapse(id);
        }
      } else {
        if (typeof expandable.onExpand === 'function') {
          setIsLoading(true);

          await expandable.onExpand(id);

          setIsLoading(false);
        }
      }
    },
    [children, id, expandable, isExpanded, focusable],
  );

  const handleNodeSelected = useCallback(() => {
    if (!isSelectable) {
      return;
    }

    if (typeof focusable.onFocus === 'function') {
      focusable.onFocus(id);
    }

    if (typeof selectable?.onSelect === 'function') {
      selectable.onSelect(id, value);
    }
  }, [focusable, id, isSelectable, selectable, value]);

  const handleKeyEvent = useCallback(
    (e: React.KeyboardEvent<HTMLLIElement>) => {
      if (e.altKey || e.currentTarget !== e.target) {
        return;
      }

      onKeyDown(e, { id, isExpanded, isSelectable, hasChildren: !!children?.length, value });
    },
    [children, id, isExpanded, isSelectable, onKeyDown, value],
  );

  const handleNodeClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      // Prevents event bubbling
      e.stopPropagation();

      if (typeof onNodeClick === 'function') {
        onNodeClick(e, id);
      }
    },
    [id, onNodeClick],
  );

  const additionalProps = useMemo(() => (selectable?.type ? { 'aria-selected': isSelected } : {}), [
    selectable,
    isSelected,
  ]);

  const renderedArrow = useMemo(
    () =>
      children ? (
        <StyledArrowWrapper expanded={isExpanded} flexShrink={0}>
          <ChevronRightIcon color="secondary60" focusable={false} size="xLarge" />
        </StyledArrowWrapper>
      ) : (
        <StyledGap />
      ),
    [children, isExpanded],
  );

  const renderedChildren = useMemo(
    () =>
      children && (
        <StyledUl role="group" show={isExpanded}>
          {isLoading && children.length < 1 ? (
            <TreeNode id="-1" label="" icon={<DelayedSpinner />} />
          ) : (
            children?.map((child, index) => <TreeNode {...child} key={index} />)
          )}
        </StyledUl>
      ),
    [children, isExpanded, isLoading],
  );

  const renderedIcon = useMemo(() => {
    if (iconless) {
      return null;
    }

    return icon ? (
      <StyledFlexItem {...flexItemProps}>{icon}</StyledFlexItem>
    ) : (
      <StyledFlexItem {...flexItemProps}>
        <FolderIcon color={isDisabled ? 'primary20' : 'primary30'} size="xLarge" />
      </StyledFlexItem>
    );
  }, [isDisabled, icon, iconless]);

  const renderedSelectable = useMemo(() => {
    if (value === undefined || !selectable?.type) {
      return null;
    }

    if (selectable?.type === 'radio') {
      return (
        <StyledSelectableWrapper {...flexItemProps}>
          <StyledRadio
            aria-hidden
            checked={isSelected}
            disabled={isDisabled}
            onClick={handleNodeSelected}
            ref={selectableRef}
          />
        </StyledSelectableWrapper>
      );
    }

    if (selectable?.type === 'multi') {
      return (
        <StyledSelectableWrapper {...flexItemProps}>
          <StyledCheckbox
            aria-hidden
            checked={isSelected}
            disabled={isDisabled}
            onClick={handleNodeSelected}
            ref={selectableRef}
          >
            {isSelected ? <CheckIcon /> : null}
          </StyledCheckbox>
        </StyledSelectableWrapper>
      );
    }
  }, [isDisabled, handleNodeSelected, isSelected, selectable, value]);

  return useMemo(
    () => (
      <StyledLi
        aria-expanded={isExpanded}
        onClick={handleNodeClick}
        onKeyDown={handleKeyEvent}
        ref={nodeRef}
        role="treeitem"
        tabIndex={focusable.focusedNode === id ? 0 : -1}
        {...additionalProps}
      >
        <StyledFlex alignItems="center" flexDirection="row" onClick={handleNodeToggle} selected={isSelected}>
          {renderedArrow}
          {renderedSelectable}
          {renderedIcon}
          <StyledText as="span" ellipsis marginLeft="xxSmall" color={isDisabled ? 'secondary50' : 'secondary70'}>
            {label}
            {selectedChildrenCount ? (
              <StyledText as="span" color="primary">
                {' '}
                ({selectedChildrenCount})
              </StyledText>
            ) : null}
          </StyledText>
        </StyledFlex>
        {renderedChildren}
      </StyledLi>
    ),
    [
      additionalProps,
      handleKeyEvent,
      handleNodeClick,
      handleNodeToggle,
      id,
      isDisabled,
      isExpanded,
      isSelected,
      focusable,
      label,
      renderedArrow,
      renderedChildren,
      renderedSelectable,
      renderedIcon,
      selectedChildrenCount,
    ],
  );
};

export const TreeNode = typedMemo(InternalTreeNode);
