import React, { Fragment, RefObject } from 'react';
import { Manager, Reference } from 'react-popper';
import scrollIntoView from 'scroll-into-view-if-needed';

import { uniqueId } from '../../utils';
import { Flex } from '../Flex';
import { FlexItem } from '../Flex/Item';
import { List } from '../List';
import { ListGroupHeader } from '../List/GroupHeader';
import { ListItem } from '../List/Item';
import { Tooltip, TooltipProps } from '../Tooltip';

import { StyledLink } from './styled';
import { DropdownLinkItem, DropdownOption, DropdownOptionGroup, DropdownProps } from './types';

interface DropdownState {
  highlightedItem: HTMLLIElement | null;
  isOpen: boolean;
}

export class Dropdown<T extends any> extends React.PureComponent<DropdownProps<T>, DropdownState> {
  readonly state: DropdownState = {
    highlightedItem: null,
    isOpen: false,
  };

  private listRef: RefObject<HTMLUListElement> = React.createRef();
  private triggerRef: RefObject<HTMLElement> = React.createRef();

  private readonly tooltipModifiers: TooltipProps['modifiers'] = {
    preventOverflow: { enabled: true, escapeWithReference: true },
    offset: { offset: '0, 20' },
  };
  private readonly uniqueDropdownId = uniqueId('dropdown_');
  private readonly uniqueTriggerId = uniqueId('trigger_');

  private listItemsRefs: Array<RefObject<HTMLLIElement>> = [];

  render() {
    const { children, maxHeight, options, placement, trigger, ...rest } = this.props;
    const { highlightedItem, isOpen } = this.state;

    this.listItemsRefs = [];

    const aria = highlightedItem ? { 'aria-activedescendant': highlightedItem.id } : {};

    return (
      <Manager>
        <Reference innerRef={this.triggerRef}>{({ ref }) => this.renderTrigger(ref)}</Reference>
        <List
          {...rest}
          aria-labelledby={this.getTriggerId()}
          handleListRef={this.listRef}
          id={this.getDropdownId()}
          isOpen={isOpen}
          maxHeight={maxHeight}
          onKeyDown={this.handleOnDropdownKeyDown}
          placement={placement}
          role="listbox"
          {...aria}
        >
          {this.renderItems()}
        </List>
      </Manager>
    );
  }

  private isGroup(item: DropdownOption<T> | DropdownOptionGroup<T>) {
    return 'options' in item && !('content' in item);
  }

  private isOption(item: DropdownOption<T> | DropdownOptionGroup<T>) {
    return 'content' in item && !('options' in item);
  }

  private renderItems() {
    const { options } = this.props;

    if (Array.isArray(options) && options.every(this.isGroup)) {
      return (options as Array<DropdownOptionGroup<T>>).map((group, groupIndex) => this.renderGroup(group, groupIndex));
    }

    if (Array.isArray(options) && options.every(this.isOption)) {
      return this.renderOptions(options as Array<DropdownOption<T>>);
    }

    return;
  }

  private renderOptions(options: Array<DropdownOption<T>>, groupIndex: number | null = null) {
    const { highlightedItem } = this.state;

    return (
      Array.isArray(options) &&
      options.map((option, index) => {
        if (!option.content) {
          return null;
        }

        const id = this.getItemId(option, index, groupIndex);
        const isHighlighted = Boolean(highlightedItem && id === highlightedItem.id);
        const ref = React.createRef<HTMLLIElement>();

        if (!option.disabled) {
          this.listItemsRefs.push(ref);
        }

        const { content, icon, onClick, type, value, ...rest } = option;

        return (
          <ListItem
            {...rest}
            data-highlighted={isHighlighted}
            id={id}
            key={index}
            onClick={() => this.handleOnItemClick(option)}
            onFocus={this.handleOnItemHighlighted}
            onMouseOver={this.handleOnItemHighlighted}
            ref={ref}
            role="option"
          >
            {this.getContent(option, isHighlighted)}
          </ListItem>
        );
      })
    );
  }

  private renderGroup(group: DropdownOptionGroup<T>, groupIndex: number) {
    return (
      <Fragment key={groupIndex}>
        <ListGroupHeader>{group.label}</ListGroupHeader>
        {this.renderOptions(group.options, groupIndex)}
      </Fragment>
    );
  }

  private wrapInLink(option: DropdownLinkItem<T>, content: React.ReactChild) {
    return (
      <StyledLink href={option.url} target={option.target}>
        {content}
      </StyledLink>
    );
  }

  private getContent(option: DropdownOption<T>, isHighlighted: boolean) {
    const { disabled, icon, tooltip } = option;

    const baseContent = (
      <Flex alignItems="center" flexDirection="row">
        {icon && <FlexItem paddingRight="xSmall">{this.renderIcon(option, isHighlighted)}</FlexItem>}
        {option.content}
      </Flex>
    );

    const content = option.type === 'link' && !disabled ? this.wrapInLink(option, baseContent) : baseContent;

    return disabled && tooltip ? this.wrapInTooltip(tooltip, content) : content;
  }

  private wrapInTooltip(tooltip: DropdownOption<T>['tooltip'], trigger: React.ReactChild) {
    return (
      <Tooltip placement="left" trigger={trigger} modifiers={this.tooltipModifiers} inline={false}>
        {tooltip}
      </Tooltip>
    );
  }

  private renderTrigger(ref: React.Ref<any>) {
    const { trigger } = this.props;

    const aria = this.state.isOpen ? { 'aria-expanded': true } : {};

    return (
      React.isValidElement(trigger) &&
      React.cloneElement<React.HTMLAttributes<any> & React.RefAttributes<any>>(trigger as any, {
        'aria-haspopup': true,
        id: this.getTriggerId(),
        onClick: this.toggleList,
        ref,
        role: 'button',
        ...aria,
      })
    );
  }

  private renderIcon(item: DropdownOption<T>, isHighlighted: boolean) {
    return (
      React.isValidElement(item.icon) &&
      React.cloneElement(item.icon, {
        color: this.iconColor(item, isHighlighted),
        size: 'large',
      })
    );
  }

  private iconColor(item: DropdownOption<T>, isHighlighted: boolean) {
    if (item.disabled) {
      return 'secondary40';
    }

    if (!isHighlighted) {
      return 'secondary60';
    }

    return item.actionType === 'destructive' ? 'danger50' : 'primary';
  }

  private toggleList = () => {
    this.state.isOpen ? this.closeList() : this.openList();
  };

  private openList() {
    const firstItem = this.listItemsRefs.length > 0 ? this.listItemsRefs[0].current : null;

    this.setState({ highlightedItem: firstItem, isOpen: true }, () => {
      document.addEventListener('mousedown', this.handleOnClickOutside, false);

      return this.listRef.current && this.listRef.current.focus({ preventScroll: true });
    });
  }

  private closeList() {
    this.setState({ isOpen: false }, () => {
      document.removeEventListener('mousedown', this.handleOnClickOutside, false);

      return this.triggerRef.current && this.triggerRef.current.focus({ preventScroll: true });
    });
  }

  private getDropdownId() {
    const { id } = this.props;

    return id || this.uniqueDropdownId;
  }

  private getItemId(item: DropdownOption<T>, index: number, groupIndex: number | null = null) {
    const { id } = item;

    if (groupIndex !== null) {
      return id || `${this.getDropdownId()}-group-${groupIndex}-item-${index}`;
    }

    return id || `${this.getDropdownId()}-item-${index}`;
  }

  private getTriggerId() {
    const { trigger } = this.props;
    const triggerId = trigger.props.id;

    return triggerId || this.uniqueTriggerId;
  }

  private updateHighlightedItem(element: HTMLLIElement | null, scroll?: boolean, instantScroll?: boolean) {
    if (!element) {
      return;
    }

    this.setState({ highlightedItem: element }, () => {
      return scroll && this.scrollIntoView(instantScroll);
    });
  }

  private handleOnClickOutside = (event: MouseEvent) => {
    if (!this.listRef || !this.triggerRef) {
      return;
    }

    if (
      (this.listRef.current && this.listRef.current.contains(event.target as Node)) ||
      (this.triggerRef.current && this.triggerRef.current.contains(event.target as Node))
    ) {
      return;
    }

    this.toggleList();
  };

  private handleOnItemClick = (item: DropdownOption<T>) => {
    if (item.disabled) {
      return;
    }

    if (typeof item.onClick === 'function') {
      item.onClick(item);
    }

    this.toggleList();
  };

  // Need to handle focus event for cases when VO manipulate the list via the keyboard hotkeys
  private handleOnItemHighlighted = (
    event: React.FocusEvent<HTMLLIElement> | React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    return this.updateHighlightedItem(event.currentTarget);
  };

  /**
   * Accessiblilty Menu Keyboard Support
   * Learn more: https://www.w3.org/TR/wai-aria-practices/#menu
   */

  private handleOnDropdownKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (!this.listItemsRefs.length || !this.listRef) {
      return;
    }

    const highlightedItemIndex = this.listItemsRefs.findIndex(ref => ref.current === this.state.highlightedItem);
    const nextItem = this.listItemsRefs[highlightedItemIndex + 1]
      ? this.listItemsRefs[highlightedItemIndex + 1].current
      : this.listItemsRefs[0].current;
    const prevItem = this.listItemsRefs[highlightedItemIndex - 1]
      ? this.listItemsRefs[highlightedItemIndex - 1].current
      : this.listItemsRefs[this.listItemsRefs.length - 1].current;

    switch (event.key) {
      case 'Enter':
      case ' ': {
        if (this.state.isOpen) {
          event.preventDefault();

          if (this.state.highlightedItem) {
            this.state.highlightedItem.click();
          }
        }
        break;
      }
      case 'ArrowUp':
      case 'ArrowLeft': {
        event.preventDefault();
        this.updateHighlightedItem(prevItem, true);
        break;
      }
      case 'ArrowDown':
      case 'ArrowRight': {
        event.preventDefault();
        this.updateHighlightedItem(nextItem, true);
        break;
      }
      case 'Home': {
        event.preventDefault();
        this.updateHighlightedItem(this.listItemsRefs[0].current, true);
        break;
      }
      case 'End': {
        event.preventDefault();
        this.updateHighlightedItem(this.listItemsRefs[this.listItemsRefs.length - 1].current, true);
        break;
      }
      case 'Tab':
      case 'Esc':
      case 'Escape': {
        this.toggleList();
        break;
      }
    }
  };

  private scrollIntoView = (instantScroll = false) => {
    const element = this.state.highlightedItem;

    if (!element) {
      return;
    }

    return scrollIntoView(element, {
      behavior: instantScroll ? 'instant' : 'smooth',
      block: 'nearest',
      inline: 'nearest',
      scrollMode: 'if-needed',
    });
  };
}
