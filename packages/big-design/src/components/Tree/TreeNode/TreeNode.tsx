import { CheckIcon, ChevronRightIcon, FolderIcon } from '@bigcommerce/big-design-icons';
import React, { Dispatch, useCallback, useEffect, useMemo, useRef } from 'react';

import { typedMemo } from '../../../utils';
import { StyledCheckbox } from '../../Checkbox/private';
import { FlexItem } from '../../Flex';
import { StyledRadio } from '../../Radio/styled';
import { Text } from '../../Typography';
import { useIsExpanded, useIsSelected } from '../hooks';
import { Action } from '../reducer';
import { StyledUl } from '../styled';
import { TreeNodeProps, TreeProps, TreeState } from '../types';

import { StyledArrowWrapper, StyledFlex, StyledGap, StyledLi } from './styled';

interface PrivateTreeItemProps<T> {
  state: TreeState<T>;
  dispatch: Dispatch<Action<T>>;
  iconless?: boolean;
  selectable: TreeProps<T>['selectable'];
  onExpand?: TreeProps<T>['onExpand'];
  onCollapse?: TreeProps<T>['onCollapse'];
  onSelect?: TreeProps<T>['onSelect'];
}

const InternalTreeNode = <T extends unknown>({
  children,
  dispatch,
  icon,
  iconless,
  id,
  label,
  onCollapse,
  onExpand,
  onSelect,
  selectable,
  state,
  value,
}: TreeNodeProps<T> & PrivateTreeItemProps<T>): React.ReactElement<TreeNodeProps<T>> => {
  const nodeRef = useRef<HTMLLIElement | null>(null);
  const selectableRef = useRef<HTMLLabelElement | null>(null);
  const expanded = useIsExpanded(state, id);
  const selected = useIsSelected(state, value);

  // The event target could be any element, but only typing
  // to the follow for what we need.
  const handleNodeToggle = (e?: React.MouseEvent<HTMLDivElement | HTMLLabelElement>) => {
    // Prevents the collapse/expand when clicking on a radio or checkbox
    if (e?.target === selectableRef.current) {
      return;
    }

    if (children) {
      if (!expanded) {
        if (typeof onExpand === 'function') {
          onExpand({
            children,
            expanded,
            id,
            label,
            value,
          });
        }
      } else {
        if (typeof onCollapse === 'function') {
          onCollapse({
            children,
            expanded,
            id,
            label,
            value,
          });
        }
      }

      dispatch({ type: 'TOGGLE_NODE', id });
    }

    dispatch({ type: 'FOCUS', id });
  };

  const handleNodeSelected = useCallback(() => {
    if (selectable === undefined || value === undefined) {
      return;
    }

    let newSelectedValues: T[] = [];

    if (selectable === 'multi') {
      if (state.selectedValues.includes(value)) {
        newSelectedValues = state.selectedValues.filter((selectedValue) => selectedValue !== value);
      } else {
        newSelectedValues = [...state.selectedValues, value];
      }

      if (typeof onSelect === 'function') {
        onSelect(newSelectedValues);
      }
    }

    if (selectable === 'radio') {
      newSelectedValues = [value];

      if (typeof onSelect === 'function') {
        onSelect(newSelectedValues[0]);
      }
    }

    dispatch({ type: 'SELECTED_NODE', values: newSelectedValues });
  }, [dispatch, onSelect, selectable, state.selectedValues, value]);

  // Needs to handle the following keyboard events:
  // https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-22
  const handleKeyEvent = (e: React.KeyboardEvent<HTMLLIElement>) => {
    const key = e.key;

    if (e.altKey || e.currentTarget !== e.target) {
      return;
    }

    switch (key) {
      case ' ':
        handleNodeSelected();
        break;

      case 'Enter':
        if (nodeRef.current === e.currentTarget) {
          if (children) {
            handleNodeToggle();
          } else if (selectable) {
            handleNodeSelected();
          }
        }
        break;

      case 'ArrowDown':
        dispatch({ type: 'FOCUS_DOWN', id: state.focusedNode });
        break;

      case 'ArrowUp':
        dispatch({ type: 'FOCUS_UP', id: state.focusedNode });
        break;

      case 'ArrowRight':
        dispatch({ type: 'FOCUS_RIGHT', id: state.focusedNode });
        break;

      case 'ArrowLeft':
        dispatch({ type: 'FOCUS_LEFT', id: state.focusedNode });
        break;

      case 'Home':
        dispatch({ type: 'FOCUS_FIRST' });
        break;

      case 'End':
        dispatch({ type: 'FOCUS_LAST' });
        break;

      default:
        break;
    }
  };

  const additionalProps = useMemo(() => (selectable ? { 'aria-selected': selected } : {}), [selectable, selected]);

  const renderedArrow = useMemo(
    () =>
      children ? (
        <StyledArrowWrapper expanded={expanded}>
          <ChevronRightIcon color="secondary60" focusable={false} size="xLarge" />
        </StyledArrowWrapper>
      ) : (
        <StyledGap />
      ),
    [children, expanded],
  );

  const renderedChildren = useMemo(
    () =>
      children &&
      expanded && (
        <StyledUl role="group">
          {children?.map((child, index) => (
            <TreeNode
              {...child}
              dispatch={dispatch}
              iconless={iconless}
              key={index}
              onCollapse={onCollapse}
              onExpand={onExpand}
              onSelect={onSelect}
              selectable={selectable}
              state={state}
            />
          ))}
        </StyledUl>
      ),
    [children, dispatch, expanded, iconless, onCollapse, onExpand, onSelect, selectable, state],
  );

  const renderedIcon = useMemo(() => {
    if (iconless) {
      return null;
    }

    return icon ? (
      <FlexItem flexShrink={0}>{icon}</FlexItem>
    ) : (
      <FlexItem flexShrink={0}>
        <FolderIcon color="primary30" size="xLarge" />
      </FlexItem>
    );
  }, [icon, iconless]);

  const renderedSelectable = useMemo(() => {
    if (value === undefined && selectable !== undefined) {
      return null;
    }

    if (selectable === 'radio') {
      return (
        <FlexItem flexShrink={0} marginRight="xxSmall">
          <StyledRadio
            checked={selected}
            onClick={handleNodeSelected}
            aria-hidden
            ref={(ref) => (selectableRef.current = ref)}
          />
        </FlexItem>
      );
    }

    if (selectable === 'multi') {
      return (
        <FlexItem flexShrink={0} marginRight="xxSmall">
          <StyledCheckbox
            checked={selected}
            onClick={handleNodeSelected}
            aria-hidden={true}
            ref={(ref) => (selectableRef.current = ref)}
          >
            {selected ? <CheckIcon /> : null}
          </StyledCheckbox>
        </FlexItem>
      );
    }
  }, [handleNodeSelected, selected, selectable, value]);

  useEffect(() => {
    if (state.focusedNode === id) {
      nodeRef?.current?.focus();
    }
  }, [state.focusedNode, id]);

  return (
    <StyledLi
      role="treeitem"
      aria-expanded={expanded}
      tabIndex={state.focusedNode === id ? 0 : -1}
      onKeyDown={handleKeyEvent}
      ref={(ref) => {
        nodeRef.current = ref;
      }}
      {...additionalProps}
    >
      <StyledFlex alignItems="center" flexDirection="row" onClick={handleNodeToggle}>
        {renderedArrow}
        {renderedSelectable}
        {renderedIcon}
        <Text as="span" marginLeft="xxSmall" ellipsis>
          {label}
        </Text>
      </StyledFlex>
      {renderedChildren}
    </StyledLi>
  );
};

export const TreeNode = typedMemo(InternalTreeNode);
