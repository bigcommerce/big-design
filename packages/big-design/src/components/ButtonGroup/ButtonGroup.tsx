import React, { ButtonHTMLAttributes, Fragment, HTMLAttributes, memo, ReactNode, useMemo } from 'react';

import { MarginProps } from '../../mixins';
import { Dropdown, DropdownProps } from '../Dropdown';
import { Flex } from '../Flex';

import { StyledButton } from './styled';

export interface ButtonGroupItem extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string | ReactNode;
}

export interface ButtonGroupDropdownItem extends Omit<DropdownProps, 'toggle'> {
  toggle: ButtonGroupItem;
}

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement>, MarginProps {
  items: Array<ButtonGroupItem | ButtonGroupDropdownItem>;
}

const isDropdownItem = (item: ButtonGroupItem | ButtonGroupDropdownItem): item is ButtonGroupDropdownItem =>
  'items' in item && Array.isArray(item.items);

const getButtonProps = (item: ButtonGroupItem | ButtonGroupDropdownItem) => (isDropdownItem(item) ? item.toggle : item);

const ButtonItem: React.FC<ButtonGroupItem & { isFirst: boolean; isLast: boolean }> = memo(
  ({ content, isFirst, isLast, ...restProps }) => {
    if (typeof content === 'string') {
      return (
        <StyledButton {...restProps} variant="secondary" isFirst={isFirst} isLast={isLast}>
          {content}
        </StyledButton>
      );
    }

    return <StyledButton {...restProps} variant="secondary" isFirst={isFirst} isLast={isLast} iconOnly={content} />;
  },
);

export const ButtonGroup: React.FC<ButtonGroupProps> = memo(({ items, ...marginProps }) => {
  const renderedItems = useMemo(
    () =>
      items.map((item, index) => {
        const { content, ...buttonProps } = getButtonProps(item);
        const button = (
          <ButtonItem
            {...buttonProps}
            role="listitem"
            content={content}
            isFirst={index === 0}
            isLast={index + 1 === items.length}
          />
        );

        if (isDropdownItem(item)) {
          const { toggle, ...dropdownProps } = item;

          return <Dropdown {...dropdownProps} key={index} toggle={button} />;
        }

        return <Fragment key={index}>{button}</Fragment>;
      }),
    [items],
  );

  return (
    <Flex {...marginProps} flexDirection="row" flexWrap="nowrap" role="list">
      {renderedItems}
    </Flex>
  );
});
