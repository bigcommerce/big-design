import { MoreHorizIcon } from '@bigcommerce/big-design-icons';
import React, {
  ComponentPropsWithoutRef,
  createRef,
  memo,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { MarginProps } from '../../helpers';
import { useWindowResizeListener } from '../../hooks';
import { ButtonProps } from '../Button';
import { Dropdown } from '../Dropdown';
import { Flex } from '../Flex';

import { StyledButton, StyledFlexItem } from './styled';

export interface ButtonGroupAction
  extends Omit<ButtonProps, 'children' | 'iconOnly' | 'iconRight' | 'iconLeft'> {
  text: string;
  icon?: React.ReactElement;
}

interface Localization {
  more: string;
}

const defaultLocalization: Localization = {
  more: 'more',
};

export interface ButtonGroupProps extends ComponentPropsWithoutRef<'div'>, MarginProps {
  actions: ButtonGroupAction[];
  localization?: Localization;
}

const excludeIconProps = ({
  iconOnly,
  iconRight,
  iconLeft,
  ...actionProps
}: ButtonProps & Pick<ButtonGroupAction, 'text'>): ButtonGroupAction => actionProps;

export const ButtonGroup: React.FC<ButtonGroupProps> = memo(
  ({ actions, localization = defaultLocalization, ...wrapperProps }) => {
    const sanitizedActions = useMemo(
      () => actions.map((action) => excludeIconProps(action)),
      [actions],
    );

    const parentRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLButtonElement>(null);
    const actionRefs = useRef<Array<React.RefObject<HTMLDivElement>>>(
      sanitizedActions.map(() => createRef<HTMLDivElement>()),
    );
    const [visible, setVisible] = useState<boolean[]>(() => sanitizedActions.map(() => true));

    const hideOverflowedActions = useCallback(() => {
      const parentWidth = parentRef.current?.offsetWidth ?? 0;
      const dropdownWidth = dropdownRef.current?.offsetWidth ?? 0;
      let remaining = parentWidth;

      const nextVisible = actionRefs.current.map((ref, i) => {
        const widthRef = ref.current?.offsetWidth ?? 0;

        if (sanitizedActions[i].actionType === 'destructive') {
          return false;
        }

        if (remaining - widthRef > dropdownWidth) {
          remaining -= widthRef;

          return true;
        }

        return false;
      });

      setVisible((prev) => {
        if (nextVisible.some((v, i) => v !== prev[i])) {
          return nextVisible;
        }

        return prev;
      });
    }, [sanitizedActions]);

    useLayoutEffect(() => {
      hideOverflowedActions();
    }, [sanitizedActions, hideOverflowedActions]);

    useWindowResizeListener(() => {
      hideOverflowedActions();
    });

    const isMenuVisible = visible.some((v) => !v);

    const renderedActions = useMemo(
      () =>
        sanitizedActions.map((action, i) => (
          <StyledFlexItem
            data-testid="buttongroup-item"
            isVisible={visible[i]}
            key={i}
            ref={actionRefs.current[i]}
            role="listitem"
          >
            <StyledButton {...action} variant="secondary">
              {action.text}
            </StyledButton>
          </StyledFlexItem>
        )),
      [sanitizedActions, visible],
    );

    const renderedDropdown = useMemo(
      () => (
        <StyledFlexItem
          data-testid="buttongroup-dropdown"
          isVisible={isMenuVisible}
          role="listitem"
        >
          <Dropdown
            items={sanitizedActions
              .map((action, i) => ({ action, ref: actionRefs.current[i] }))
              .filter((_, i) => !visible[i])
              .map(({ action, ref }) => ({
                actionType: action.actionType,
                content: action.text,
                disabled: action.disabled,
                icon: action.icon,
                onItemClick: () => {
                  if (ref.current) {
                    ref.current.getElementsByTagName('button')[0].click();
                  }
                },
                hash: action.text.toLowerCase(),
              }))}
            placement="bottom-end"
            toggle={
              <StyledButton
                borderRadius={visible.every((v) => !v)}
                data-testid="buttongroup-dropdown"
                iconOnly={<MoreHorizIcon title={localization.more} />}
                ref={dropdownRef}
                type="button"
                variant="secondary"
              />
            }
          />
        </StyledFlexItem>
      ),
      [sanitizedActions, isMenuVisible, visible, localization.more],
    );

    if (sanitizedActions.length === 0) {
      return null;
    }

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
  },
);
