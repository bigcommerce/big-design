import { Placement } from 'popper.js';
import React, { AllHTMLAttributes } from 'react';
import { Manager, Reference, RefHandler } from 'react-popper';
import scrollIntoView from 'scroll-into-view-if-needed';

import { uniqueId } from '../../utils';
import { ListAction } from '../List/Action/Action';
import { ListItem } from '../List/Item/Item';
import { List } from '../List/List';

interface DropdownState {
  highlightedIndex: number;
  isOpen: boolean;
}

interface Props {
  maxHeight?: number;
  placement?: Placement;
  trigger: React.ReactElement;
  onActionClick?(): void;
  onItemClick?(value: AllHTMLAttributes<HTMLElement>['value']): void;
}

type DropdownProps = Props & React.HTMLAttributes<HTMLUListElement>;

export class Dropdown extends React.PureComponent<DropdownProps, DropdownState> {
  static Action = ListAction;
  static Item = ListItem;

  static readonly defaultProps: Partial<Props> = {
    placement: 'bottom',
  };

  state = {
    highlightedIndex: -1,
    isOpen: false,
  };

  private listRef: HTMLUListElement | null = null;
  private triggerRef: HTMLElement | null = null;

  private readonly uniqueDropdownId = uniqueId('dropdown_');
  private readonly uniqueTriggerId = uniqueId('trigger_');

  render() {
    const { children, maxHeight, onActionClick, onItemClick, placement, trigger, ...rest } = this.props;

    const highlightedItem = this.getHighlightedItem();
    const aria = highlightedItem ? { 'aria-activedescendant': highlightedItem.id } : {};

    return (
      <Manager>
        <Reference innerRef={node => (this.triggerRef = node)}>{({ ref }) => this.renderTrigger(ref)}</Reference>
        <List
          aria-labelledby={this.getTriggerId()}
          handleListRef={this.handleListRef}
          id={this.getDropdownId()}
          isOpen={this.state.isOpen}
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

  private renderTrigger(ref: RefHandler) {
    const { trigger } = this.props;

    const aria = this.state.isOpen ? { 'aria-expanded': true, 'aria-owns': this.getDropdownId() } : {};

    return (
      React.isValidElement(trigger) &&
      React.cloneElement<React.HTMLAttributes<any> & React.RefAttributes<any>>(trigger, {
        'aria-haspopup': true,
        id: this.getTriggerId(),
        onClick: this.toggleList,
        ref,
        role: 'button',
        ...aria,
      })
    );
  }

  private renderChildren() {
    const { children } = this.props;

    return React.Children.map(
      children,
      (child, index) =>
        React.isValidElement(child) &&
        (child.type === ListItem || child.type === ListAction) &&
        React.cloneElement<React.LiHTMLAttributes<HTMLLIElement>>(child, {
          // @ts-ignore
          'data-highlighted': index === this.state.highlightedIndex,
          id: this.getItemId(child, index),
          onClick: child.type === ListItem ? this.handleOnItemClick : this.handleOnActionClick,
          onFocus: this.handleOnItemFocus,
          onMouseOver: this.handleOnItemMouseOver,
          role: 'menuitem',
        }),
    );
  }

  private toggleList = () => {
    this.state.isOpen ? this.closeList() : this.openList();
  };

  private openList() {
    this.setState({ isOpen: true }, () => {
      document.addEventListener('mousedown', this.handleOnClickOutside, false);

      // We need to wait until the menu is open to change the index
      this.setState({ highlightedIndex: 0 }, () => {
        return this.listRef && this.listRef.focus();
      });
    });
  }

  private closeList() {
    this.setState({ isOpen: false }, () => {
      document.removeEventListener('mousedown', this.handleOnClickOutside, false);

      return this.triggerRef && this.triggerRef.focus();
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

  private findIndexByItem(item: HTMLLIElement) {
    const children = this.listRef && Array.from(this.listRef.children);

    return children && children.indexOf(item);
  }

  private getHighlightedItem() {
    return this.listRef && (this.listRef.children.item(this.state.highlightedIndex) as HTMLLIElement);
  }

  private getNumberOfChildren() {
    return React.Children.count(this.props.children);
  }

  private updateHighlightedIndex(highlightedIndex: number, cb?: () => void) {
    this.setState(
      {
        highlightedIndex,
      },
      () => {
        return cb && cb();
      },
    );
  }

  private handleListRef = (ref: HTMLElement | null) => {
    if (ref) {
      this.listRef = ref as HTMLUListElement;
    }
  };

  private handleOnActionClick = () => {
    const { onActionClick } = this.props;

    if (onActionClick) {
      onActionClick();
    }

    this.toggleList();
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
    const highlightedItem = this.getHighlightedItem();

    if (highlightedItem && onItemClick) {
      const value = highlightedItem.getAttribute('value');

      if (value) {
        onItemClick(value);
      }
    }

    this.toggleList();
  };

  private handleOnItemFocus = (event: React.FocusEvent<HTMLLIElement>) => {
    const index = this.findIndexByItem(event.currentTarget);

    return index !== null && this.updateHighlightedIndex(index);
  };

  private handleOnItemMouseOver = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const index = this.findIndexByItem(event.currentTarget);

    return index !== null && this.updateHighlightedIndex(index);
  };

  /**
   * Accessiblilty Menu Keyboard Support
   * Learn more: https://www.w3.org/TR/wai-aria-practices/#menu
   */

  private handleOnDropdownKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    const numberOfChildren = this.getNumberOfChildren();

    switch (event.key) {
      case 'Enter':
      case ' ': {
        event.preventDefault();
        this.handleOnItemClick();
        break;
      }
      case 'Escape': {
        event.preventDefault();
        event.stopPropagation();
        this.toggleList();
        break;
      }
      case 'ArrowUp':
      case 'ArrowLeft': {
        event.preventDefault();
        this.updateIndexAndScroll(this.nextItemIndex(-1));
        break;
      }
      case 'ArrowDown':
      case 'ArrowRight': {
        event.preventDefault();
        this.updateIndexAndScroll(this.nextItemIndex(1));
        break;
      }
      case 'Home': {
        event.preventDefault();
        this.updateIndexAndScroll(0);
        break;
      }
      case 'End': {
        event.preventDefault();
        this.updateIndexAndScroll(numberOfChildren - 1);
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

  private nextItemIndex(direction: 1 | -1) {
    const nextIndex = this.state.highlightedIndex + direction;
    const numberOfChildren = this.getNumberOfChildren();

    if (nextIndex < 0) {
      return numberOfChildren - 1;
    } else if (nextIndex >= numberOfChildren) {
      return 0;
    } else {
      return nextIndex;
    }
  }

  private updateIndexAndScroll(index: number) {
    this.updateHighlightedIndex(index, this.scrollIntoView);
  }

  private scrollIntoView = () => {
    const element = this.getHighlightedItem();

    if (!element) {
      return;
    }

    return scrollIntoView(element, {
      behavior: 'smooth',
      scrollMode: 'if-needed',
    });
  };
}
