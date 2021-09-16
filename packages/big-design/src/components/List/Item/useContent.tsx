import React, { cloneElement, isValidElement, useCallback, useMemo } from 'react';

import { DropdownItem, DropdownLinkItem } from '../../Dropdown';
import { Flex, FlexItem } from '../../Flex';
import { SelectAction, SelectOption } from '../../Select';
import { Tooltip } from '../../Tooltip';
import { Small } from '../../Typography';

import { StyledLink } from './styled';

interface useContentProps {
  item: DropdownItem | DropdownLinkItem | SelectOption<any> | SelectAction;
  isHighlighted: boolean;
}

export const useContent = ({ item, isHighlighted }: useContentProps) => {
  const iconColor = useMemo(() => {
    if (item.disabled) {
      return 'secondary40';
    }

    if (!isHighlighted || !('onActionClick' in item)) {
      return 'secondary60';
    }

    return 'actionType' in item ? (item.actionType === 'destructive' ? 'danger50' : 'primary') : 'primary';
  }, [isHighlighted, item]);

  const renderIcon = useMemo(() => {
    return (
      isValidElement(item.icon) &&
      cloneElement(item.icon, {
        color: iconColor,
        size: 'large',
      })
    );
  }, [iconColor, item]);

  const descriptionColor = useCallback(
    (isDisabled: boolean | undefined) => (isDisabled ? 'secondary40' : 'secondary60'),
    [],
  );

  const wrapInLink = useCallback((linkItem: DropdownLinkItem, content: React.ReactChild) => {
    return (
      <StyledLink href={linkItem.url} tabIndex={-1} target={linkItem.target}>
        {content}
      </StyledLink>
    );
  }, []);

  const wrapInTooltip = useCallback((tooltip: string, tooltipTrigger: React.ReactChild) => {
    return (
      <Tooltip
        placement="left"
        trigger={tooltipTrigger}
        modifiers={[{ name: 'preventOverflow' }, { name: 'offset', options: { offset: [0, 20] } }]}
        inline={false}
      >
        {tooltip}
      </Tooltip>
    );
  }, []);

  const getContent = useMemo(() => {
    const { content, disabled, description, icon } = item;

    const baseContent = (
      <Flex alignItems="center" flexDirection="row">
        {icon && (
          <FlexItem
            alignSelf={description ? 'flex-start' : undefined}
            paddingRight="xSmall"
            paddingTop={description ? 'xSmall' : undefined}
          >
            {renderIcon}
          </FlexItem>
        )}
        {description ? (
          <FlexItem paddingVertical="xSmall">
            {content}
            <Small color={descriptionColor(disabled)}>{description}</Small>
          </FlexItem>
        ) : (
          content
        )}
      </Flex>
    );

    const finalContent =
      'type' in item && item.type === 'link' && !disabled ? wrapInLink(item, baseContent) : baseContent;

    return disabled && 'tooltip' in item && item.tooltip ? wrapInTooltip(item.tooltip, finalContent) : finalContent;
  }, [descriptionColor, item, renderIcon, wrapInLink, wrapInTooltip]);

  return getContent;
};
