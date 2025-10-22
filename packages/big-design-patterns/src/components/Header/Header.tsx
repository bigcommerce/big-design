import {
  Badge,
  BadgeProps,
  Button,
  ButtonProps,
  Dropdown,
  DropdownProps,
  excludeMarginProps,
  Flex,
  FlexItem,
  H1,
  Lozenge,
  LozengeProps,
  Text,
} from '@bigcommerce/big-design';
import { ArrowBackIcon } from '@bigcommerce/big-design-icons';
import React, { ComponentPropsWithoutRef, isValidElement, memo, ReactNode } from 'react';

import { warning } from '../../utils';

import { StyledActionsWrapper, StyledBackLink } from './styled';

interface BackLinkProps extends ComponentPropsWithoutRef<'a'> {
  readonly text: string;
}

const BackLink = ({ text, className, style, ...props }: BackLinkProps) => {
  return (
    <StyledBackLink {...props}>
      <ArrowBackIcon />
      {text}
    </StyledBackLink>
  );
};

interface ActionButtonProps extends Omit<ButtonProps, 'children' | 'mobileWidth'> {
  text: string;
}

interface ActionDropdownProps extends Omit<DropdownProps, 'toggle'> {
  toggle: ActionButtonProps;
}

interface ActionProps {
  readonly actions: Array<ActionButtonProps | ActionDropdownProps>;
}

function validateActions(actions: Array<ActionButtonProps | ActionDropdownProps>) {
  if (actions.length > 3) {
    warning('Header should not have more than 3 actions.');
  }

  const primaryButtonActions = actions.filter((action) => {
    if ('toggle' in action) {
      return action.toggle.variant === 'primary';
    }

    return action.variant === 'primary';
  });

  if (primaryButtonActions.length > 1) {
    warning('Header should not have more than 1 primary action.');
  }
}

const Actions = ({ actions }: ActionProps) => {
  validateActions(actions);

  return (
    <>
      {actions.slice(0, 3).map((action, i) => {
        if ('toggle' in action) {
          const { toggle, ...dropdownProps } = action;
          const { text, ...buttonProps } = toggle;

          return (
            <Dropdown
              key={i}
              {...dropdownProps}
              toggle={
                <Button {...excludeMarginProps(buttonProps)} mobileWidth="100%">
                  {text}
                </Button>
              }
            />
          );
        }

        const { text, ...buttonProps } = action;

        return (
          <Button key={i} {...excludeMarginProps(buttonProps)} mobileWidth="100%">
            {text}
          </Button>
        );
      })}
    </>
  );
};

type Description = string | ReactNode;

interface DescriptionProps {
  readonly description: Description;
}

const Description = ({ description }: DescriptionProps) => {
  if (typeof description === 'string') {
    return <Text>{description}</Text>;
  }

  if (isValidElement(description) && description.type === Text) {
    return description;
  }

  return null;
};

export interface HeaderProps {
  readonly actions?: Array<ActionButtonProps | ActionDropdownProps>;
  readonly backLink?: BackLinkProps;
  readonly badge?: BadgeProps;
  readonly description?: Description;
  readonly icon?: ReactNode;
  readonly lozenge?: LozengeProps;
  readonly title: string;
}

export const Header = memo(
  ({ actions, backLink, badge, description, icon = null, lozenge, title }: HeaderProps) => {
    return (
      <Flex as="header" flexDirection="row" flexWrap="wrap">
        {backLink && (
          <FlexItem flexBasis="100%">
            <BackLink {...backLink} />
          </FlexItem>
        )}
        <Flex
          as={(props) => <FlexItem {...props} flexGrow={1} />}
          flexDirection={{ mobile: 'column', tablet: 'row' }}
        >
          <FlexItem
            flexGrow={1}
            marginBottom={{ mobile: 'xxLarge', tablet: 'none' }}
            marginRight={{ mobile: 'none', tablet: 'xxLarge' }}
          >
            <Flex alignItems="center" flexDirection="row" flexGap="1rem" marginBottom="xxSmall">
              {icon}
              <H1 marginBottom="none">{title}</H1>
              {lozenge && <Lozenge {...lozenge} />}
              {badge && <Badge {...excludeMarginProps(badge)} />}
            </Flex>
            <Description description={description} />
          </FlexItem>
          {actions ? (
            <StyledActionsWrapper
              flexDirection={{ mobile: 'column-reverse', tablet: 'row-reverse' }}
              flexGap={{ mobile: '.75rem', tablet: '0.625rem' }}
              marginBottom="xLarge"
            >
              <Actions actions={actions} />
            </StyledActionsWrapper>
          ) : null}
        </Flex>
      </Flex>
    );
  },
);
