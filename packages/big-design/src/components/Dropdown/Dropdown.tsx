import { Placement } from 'popper.js';
import React, { AllHTMLAttributes, RefObject } from 'react';
import { Manager, Reference, RefHandler } from 'react-popper';
import scrollIntoView from 'scroll-into-view-if-needed';

import { uniqueId } from '../../utils';
import { List } from '../List';
import { ListItem } from '../List/Item';

interface DropdownState {
  highlightedItem: HTMLLIElement | null;
  isOpen: boolean;
}

interface Props {
  maxHeight?: number;
  placement?: Placement;
  trigger: React.ReactElement;
  onItemClick?(value: AllHTMLAttributes<HTMLElement>['value']): void;
}

export type DropdownProps = Props & React.HTMLAttributes<HTMLUListElement>;

export class Dropdown extends React.PureComponent<DropdownProps, DropdownState> {
  static Item = ListItem;

  readonly state: DropdownState = {
    highlightedItem: null,
    isOpen: false,
  };

  private listRef: HTMLUListElement | null = null;
  private triggerRef: HTMLElement | null = null;

  private readonly uniqueDropdownId = uniqueId('dropdown_');
  private readonly uniqueTriggerId = uniqueId('trigger_');

  private listItemsRefs: Array<RefObject<HTMLLIElement>> = [];

  render() {
    const { children, maxHeight, onItemClick, placement, trigger, ...rest } = this.props;
    const { highlightedItem, isOpen } = this.state;

    this.listItemsRefs = [];

    const aria = highlightedItem ? { 'aria-activedescendant': highlightedItem.id } : {};

    return (
      <Manager>
        <Reference innerRef={node => (this.triggerRef = node)}>{({ ref }) => this.renderTrigger(ref)}</Reference>
        <List
          aria-labelledby={this.getTriggerId()}
          handleListRef={this.handleListRef}
          id={this.getDropdownId()}
          isOpen={isOpen}
          maxHeight={maxHeight}
          onKeyDown={this.handleOnDropdownKeyDown}
          placement={placement}
          role="menu"
          {...aria}
          {...rest}
        >
          {this.renderChildren()}
        </List>
      </Manager>
    );
  }

  private renderChildren() {
    const { children } = this.props;
    const { highlightedItem } = this.state;

    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) {
        return;
      }

      const ref = React.createRef<HTMLLIElement>();

      switch (child.type) {
        case ListItem:
          const id = this.getItemId(child, index);
          this.listItemsRefs.push(ref);

          return React.cloneElement(child, {
            'data-highlighted': highlightedItem && id === highlightedItem.id,
            id,
            onClick: this.handleOnItemClick,
            onFocus: this.handleOnItemFocus,
            onMouseOver: this.handleOnItemMouseOver,
            ref,
            role: 'menuitem',
          }) as React.LiHTMLAttributes<HTMLLIElement>;
        default:
          return;
      }
    });
  }

  private renderTrigger(ref: RefHandler) {
    const { trigger } = this.props;

    const aria = this.state.isOpen ? { 'aria-expanded': true, 'aria-owns': this.getDropdownId() } : {};

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

  private getItemId(item: React.ReactElement<React.LiHTMLAttributes<HTMLLIElement>>, index: number) {
    const { id } = item.props;

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

  private handleOnItemClick = () => {
    const { onItemClick } = this.props;
    const { highlightedItem } = this.state;

    if (!highlightedItem || highlightedItem.hasAttribute('disabled')) {
      return;
    }

    if (highlightedItem && onItemClick) {
      const value = highlightedItem.getAttribute('data-value');

      if (value) {
        onItemClick(value);
      }
    }

    this.toggleList();
  };

  private handleOnItemFocus = (event: React.FocusEvent<HTMLLIElement>) => {
    return this.updateHighlightedItem(event.currentTarget);
  };

  private handleOnItemMouseOver = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
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
          this.handleOnItemClick();
        } else {
          this.toggleList();
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
        this.closeList();
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
