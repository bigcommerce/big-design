import { MoreHorizIcon } from '@bigcommerce/big-design-icons';
import React, {
  createRef,
  HTMLAttributes,
  isValidElement,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useWindowResizeListener } from '../../hooks';
import { MarginProps } from '../../mixins';
import { ButtonProps } from '../Button';
import { Dropdown } from '../Dropdown';
import { Flex } from '../Flex';

import { StyledButton, StyledFlexItem } from './styled';

export interface ButtonGroupAction extends Omit<ButtonProps, 'children' | 'iconLeft' | 'iconRight'> {
  text: string;
}

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement>, MarginProps {
  actions: ButtonGroupAction[];
}

export const ButtonGroup: React.FC<ButtonGroupProps> = memo(({ actions, ...wrapperProps }) => {
  const parentRef = createRef<HTMLDivElement>();
  const dropdownRef = createRef<HTMLDivElement>();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [actionsState, setActionsState] = useState(
    actions.map((action) => ({
      isVisible: true,
      action,
      ref: createRef<HTMLDivElement>(),
    })),
  );

  const hideOverflowedElements = useCallback(() => {
    const parentWidth = parentRef.current?.offsetWidth;
    const dropdownWidth = dropdownRef.current?.offsetWidth;

    if (!parentWidth || !dropdownWidth) {
      return;
    }

    let remainingWidth = parentWidth;

    const nextState = actionsState.map((stateObj) => {
      const actionWidth = stateObj.ref.current?.offsetWidth;

      if (!actionWidth) {
        return stateObj;
      }

      if (remainingWidth - actionWidth > dropdownWidth) {
        remainingWidth = remainingWidth - actionWidth;

        return { ...stateObj, isVisible: true };
      }

      return { ...stateObj, isVisible: false };
    });

    const visibleActions = actionsState.filter(({ isVisible }) => isVisible);
    const nextVisibleActions = nextState.filter(({ isVisible }) => isVisible);

    if (visibleActions.length !== nextVisibleActions.length) {
      setIsMenuVisible(nextVisibleActions.length !== actions.length);
      setActionsState(nextState);
    }
  }, [actions, parentRef, dropdownRef, actionsState]);

  const renderedDropdown = useMemo(() => {
    const items = actionsState
      .filter(({ isVisible }) => !isVisible)
      .map((stateObj) => {
        const action = stateObj.ref.current?.querySelector('button');
        const icon = isValidElement(stateObj.action.iconOnly) ? stateObj.action.iconOnly : undefined;

        return {
          content: stateObj.action.text,
          onItemClick: () => {
            if (action) {
              action.click();
            }
          },
          hash: stateObj.action.text.toLowerCase(),
          icon,
        };
      });

    return (
      <StyledFlexItem
        data-testid="button-group-dropdown-toggle"
        isVisible={isMenuVisible}
        ref={dropdownRef}
        role="listitem"
      >
        <Dropdown
          items={items}
          toggle={
            <StyledButton
              data-testid="button-group-dropdown-toggle-button"
              iconOnly={<MoreHorizIcon title="add" />}
              variant="secondary"
              isLast
            />
          }
        />
      </StyledFlexItem>
    );
  }, [actionsState, isMenuVisible, dropdownRef]);

  const renderedActions = useMemo(
    () =>
      actionsState.map((stateObj, index) => (
        <StyledFlexItem
          data-testid={`button-group-action-${index}`}
          key={index}
          ref={stateObj.ref}
          isVisible={stateObj.isVisible}
          role="listitem"
        >
          <StyledButton
            {...stateObj.action}
            isFirst={index === 0}
            isLast={index === actionsState.length - 1}
            variant="secondary"
          >
            {stateObj.action.text}
          </StyledButton>
        </StyledFlexItem>
      )),
    [actionsState],
  );

  useEffect(() => {
    hideOverflowedElements();
  }, [actions, parentRef, actionsState, hideOverflowedElements]);

  useWindowResizeListener(() => {
    hideOverflowedElements();
  });

  return (
    <Flex
      {...wrapperProps}
      data-testid="button-group-wrapper"
      flexDirection="row"
      flexWrap="nowrap"
      ref={parentRef}
      role="list"
    >
      {renderedActions}
      {renderedDropdown}
    </Flex>
  );
});
