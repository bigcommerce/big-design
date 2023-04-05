import { MoreHorizIcon } from '@bigcommerce/big-design-icons';
import React, {
  createRef,
  HTMLAttributes,
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

export interface ButtonGroupAction
  extends Omit<ButtonProps, 'children' | 'iconOnly' | 'iconRight' | 'iconLeft'> {
  text: string;
  icon?: React.ReactElement;
}

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement>, MarginProps {
  actions: ButtonGroupAction[];
}

interface ActionsState {
  isVisible: boolean;
  action: ButtonGroupAction;
  ref: React.RefObject<HTMLDivElement>;
}

const excludeIconProps = ({
  iconOnly,
  iconRight,
  iconLeft,
  ...actionProps
}: ButtonProps & Pick<ButtonGroupAction, 'text'>): ButtonGroupAction => actionProps;

export const ButtonGroup: React.FC<ButtonGroupProps> = memo(({ actions, ...wrapperProps }) => {
  const parentRef = createRef<HTMLDivElement>();
  const dropdownRef = createRef<HTMLDivElement>();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [actionsState, setActionsState] = useState<ActionsState[]>([]);

  useEffect(() => {
    setActionsState(
      actions.map((action) => ({
        isVisible: true,
        action: excludeIconProps(action),
        ref: createRef<HTMLDivElement>(),
      })),
    );
  }, [actions]);

  const hideOverflowedActions = useCallback(() => {
    const parentWidth = parentRef.current?.offsetWidth ?? 0;
    const dropdownWidth = dropdownRef.current?.offsetWidth ?? 0;

    let remainingWidth = parentWidth;

    const nextState = actionsState.map((stateObj) => {
      const actionWidth = stateObj.ref.current?.offsetWidth;

      if (!actionWidth) {
        return stateObj;
      }

      if (stateObj.action.actionType === 'destructive') {
        return { ...stateObj, isVisible: false };
      }

      if (remainingWidth - actionWidth > dropdownWidth) {
        remainingWidth -= actionWidth;

        return { ...stateObj, isVisible: true };
      }

      return { ...stateObj, isVisible: false };
    });

    const visibleActions = actionsState.filter(({ isVisible }) => isVisible);
    const nextVisibleActions = nextState.filter(({ isVisible }) => isVisible);

    if (visibleActions.length !== nextVisibleActions.length) {
      setActionsState(nextState);
    }
  }, [actionsState, dropdownRef, parentRef]);

  const renderedDropdown = useMemo(
    () => (
      <StyledFlexItem
        data-testid="buttongroup-dropdown"
        isVisible={isMenuVisible}
        ref={dropdownRef}
        role="listitem"
      >
        <Dropdown
          items={actionsState
            .filter(({ isVisible }) => !isVisible)
            .map(({ action, ref }) => ({
              actionType: action.actionType,
              content: action.text,
              disabled: action.disabled,
              onItemClick: () => {
                if (ref.current) {
                  ref.current.getElementsByTagName('button')[0].click();
                }
              },
              hash: action.text.toLowerCase(),
              icon: action.icon,
            }))}
          placement="bottom-end"
          toggle={
            <StyledButton
              borderRadius={actionsState.every(({ isVisible }) => !isVisible)}
              iconOnly={<MoreHorizIcon title="more" />}
              type="button"
              variant="secondary"
            />
          }
        />
      </StyledFlexItem>
    ),
    [actionsState, dropdownRef, isMenuVisible],
  );

  const renderedActions = useMemo(
    () =>
      [...actionsState]
        .reverse()
        .sort(({ isVisible }) => (isVisible ? -1 : 1))
        .map(({ action, isVisible, ref }, key) => {
          const { text, icon, ...buttonProps } = action;

          return (
            <StyledFlexItem
              data-testid="buttongroup-item"
              isVisible={isVisible}
              key={key}
              ref={ref}
              role="listitem"
            >
              <StyledButton {...buttonProps} variant="secondary">
                {text}
              </StyledButton>
            </StyledFlexItem>
          );
        }),
    [actionsState],
  );

  useEffect(() => {
    const nextIsMenuVisible = actionsState.some(({ isVisible }) => !isVisible);

    if (nextIsMenuVisible !== isMenuVisible) {
      setIsMenuVisible(nextIsMenuVisible);
    }
  }, [actionsState, isMenuVisible]);

  useEffect(() => {
    hideOverflowedActions();
  }, [actions, parentRef, hideOverflowedActions]);

  useWindowResizeListener(() => {
    hideOverflowedActions();
  });

  return actions.length > 0 ? (
    <Flex
      {...wrapperProps}
      data-testid="buttongroup-wrapper"
      flexDirection="row"
      flexWrap="nowrap"
      ref={parentRef}
      role="list"
    >
      {renderedActions}
      {renderedDropdown}
    </Flex>
  ) : null;
});
