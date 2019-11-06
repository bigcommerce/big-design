import React, { RefObject } from 'react';
import { Manager, Reference, RefHandler } from 'react-popper';
import scrollIntoView from 'scroll-into-view-if-needed';

import { uniqueId } from '../../utils';
import { Flex } from '../Flex';
import { FlexItem } from '../Flex/Item';
import { Link } from '../Link';
import { List } from '../List';
import { ListItem } from '../List/Item';
import { Tooltip, TooltipProps } from '../Tooltip';

import { DropdownItem, DropdownLinkItem, DropdownProps } from './types';

interface DropdownState {
  highlightedItem: HTMLLIElement | null;
  isOpen: boolean;
}

export class Dropdown<T extends any> extends React.PureComponent<DropdownProps<T>, DropdownState> {
  readonly state: DropdownState = {
    highlightedItem: null,
    isOpen: false,
  };

  private listRef: HTMLUListElement | null = null;
  private triggerRef: HTMLElement | null = null;

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
        <Reference innerRef={node => (this.triggerRef = node)}>{({ ref }) => this.renderTrigger(ref)}</Reference>
        <List
          {...rest}
          aria-labelledby={this.getTriggerId()}
          handleListRef={this.handleListRef}
          id={this.getDropdownId()}
          isOpen={isOpen}
          maxHeight={maxHeight}
          onKeyDown={this.handleOnDropdownKeyDown}
          placement={placement}
          role="listbox"
          {...aria}
        >
          {this.renderOptions()}
        </List>
      </Manager>
    );
  }

  private renderOptions() {
    const { options } = this.props;
    const { highlightedItem } = this.state;

    return (
      Array.isArray(options) &&
      options.map((option, index) => {
        if (!option.content) {
          return null;
        }

        const id = this.getItemId(option, index);
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

  private getContent(option: DropdownItem<T> | DropdownLinkItem<T>, isHighlighted: boolean) {
    const { content, disabled, icon } = option;
    const child = (
      <Flex alignItems="center" flexDirection="row">
        {icon && <FlexItem paddingRight="xSmall">{this.renderIcon(option, isHighlighted)}</FlexItem>}
        {content}
      </Flex>
    );

    return this.getTooltip(
      option,
      option.type === 'link' && !disabled ? (
        <Link href={option.url} target={option.target}>
          {child}
        </Link>
      ) : (
        child
      ),
    );
  }

  private getTooltip(option: DropdownItem<T> | DropdownLinkItem<T>, trigger: React.ReactChild) {
    const { disabled, tooltip } = option;

    return disabled && tooltip ? (
      <Tooltip placement="right" trigger={trigger} modifiers={this.tooltipModifiers} inline={false}>
        {tooltip}
      </Tooltip>
    ) : (
      trigger
    );
  }

  private renderTrigger(ref: RefHandler) {
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

  private renderIcon(item: DropdownItem<T> | DropdownLinkItem<T>, isHighlighted: boolean) {
    return (
      React.isValidElement(item.icon) &&
      React.cloneElement(item.icon, {
        color: this.iconColor(item, isHighlighted),
        size: 'large',
      })
    );
  }

  private iconColor(item: DropdownItem<T> | DropdownLinkItem<T>, isHighlighted: boolean) {
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
    const firstItem = this.listItemsRefs[0].current;

    this.setState({ highlightedItem: firstItem, isOpen: true }, () => {
      document.addEventListener('mousedown', this.handleOnClickOutside, false);

      return this.listRef && this.listRef.focus({ preventScroll: true });
    });
  }

  private closeList() {
    this.setState({ isOpen: false }, () => {
      document.removeEventListener('mousedown', this.handleOnClickOutside, false);

      return this.triggerRef && this.triggerRef.focus({ preventScroll: true });
    });
  }

  private getDropdownId() {
    const { id } = this.props;

    return id || this.uniqueDropdownId;
  }

  private getItemId(item: DropdownItem<T> | DropdownLinkItem<T>, index: number) {
    const { id } = item;

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

  private handleListRef = (ref: HTMLElement | null) => {
    if (ref) {
      this.listRef = ref as HTMLUListElement;
    }
  };

  private handleOnClickOutside = (event: MouseEvent) => {
    if (!this.listRef || !this.triggerRef) {
      return;
    }

    if (this.listRef.contains(event.target as Node) || this.triggerRef.contains(event.target as Node)) {
      return;
    }

    this.toggleList();
  };

  private handleOnItemClick = (item: DropdownItem<T> | DropdownLinkItem<T>) => {
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
