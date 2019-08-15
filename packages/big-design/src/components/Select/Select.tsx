import { Placement } from 'popper.js';
import React, { AllHTMLAttributes } from 'react';
import { Manager, Reference } from 'react-popper';
import scrollIntoView from 'scroll-into-view-if-needed';

import { uniqueId } from '../../utils';
import { Flex } from '../Flex/Flex';
import { Input } from '../Input';
import { ListAction } from '../List/Action/Action';
import { ListItem } from '../List/Item/Item';
import { List } from '../List/List';

import { Form } from './../Form';
import { StyledDropdownIcon, StyledStatusMessage } from './styled';

interface SelectState {
  filterChildren: boolean;
  highlightedId: string | null;
  inputText: string;
  isOpen: boolean;
}

interface Props {
  disabled?: boolean;
  error?: React.ReactChild;
  label?: React.ReactChild;
  maxHeight?: number;
  placement?: Placement;
  required?: boolean;
  value?: AllHTMLAttributes<HTMLElement>['value'];
  onActionClick?(inputText: string): void;
  onItemChange(value: AllHTMLAttributes<HTMLElement>['value']): void;
}

export type SelectProps = Props & React.HTMLAttributes<HTMLUListElement>;

export class Select extends React.PureComponent<SelectProps, SelectState> {
  static readonly Action = ListAction;
  static readonly Option = ListItem;
  static readonly Error = Form.Error;

  state = {
    filterChildren: false,
    highlightedId: null,
    inputText: '',
    isOpen: false,
  };

  private inputRef: HTMLInputElement | null = null;
  private listRef: HTMLUListElement | null = null;

  private readonly uniqueInputId = uniqueId('input_');
  private readonly uniqueLabelId = uniqueId('label_');
  private readonly uniqueSelectId = uniqueId('select_');

  componentDidMount() {
    this.updateInputText();
  }

  componentDidUpdate(prevProps: Props) {
    const { value } = this.props;

    // Reset input if value was reset to empty string
    if (prevProps.value && !value) {
      this.updateInputText('');
    }

    // Match input text to select value
    if (prevProps.value !== value) {
      this.updateInputText();
    }
  }

  render() {
    const {
      children,
      label,
      maxHeight,
      onActionClick,
      onItemChange,
      placeholder,
      placement,
      value,
      ...rest
    } = this.props;

    const labelId = this.getLabelId();
    const selectId = this.getSelectId();

    const ariaOwns = this.state.isOpen ? { 'aria-owns': selectId } : {};
    const ariaLabelledBy = label ? { 'aria-labelledby': labelId } : {};

    return (
      <Manager>
        <div role="combobox" aria-expanded={this.state.isOpen} aria-haspopup="listbox" {...ariaOwns}>
          {this.renderLabel()}
          {this.renderInput()}
          <List
            handleListRef={this.handleListRef}
            id={selectId}
            isOpen={this.state.isOpen}
            maxHeight={maxHeight}
            placement={placement}
            role={'listbox'}
            {...ariaLabelledBy}
            {...rest}
          >
            {this.renderFilteredChildren()}
          </List>
        </div>
        <StyledStatusMessage
          id={`a11y-status-message-${selectId}`}
          role="status"
          aria-live="polite"
          aria-relevant="additions text"
        />
      </Manager>
    );
  }

  private renderDropdownIcon() {
    return (
      <Flex>
        <StyledDropdownIcon
          aria-haspopup={true}
          aria-label="toggle menu" // Will need to translate this label in the future
          onClick={this.toggleList}
          role="button"
          tabIndex={-1}
          style={{ outline: 'none' }}
        />
      </Flex>
    );
  }

  private renderLabel() {
    const { label } = this.props;

    const inputId = this.getInputId();
    const labelId = this.getLabelId();

    if (typeof label === 'string') {
      return (
        <Input.Label htmlFor={inputId} id={labelId}>
          {label}
        </Input.Label>
      );
    }

    if (React.isValidElement(label) && label.type === Input.Label) {
      return React.cloneElement<React.LabelHTMLAttributes<HTMLLabelElement>>(label, {
        htmlFor: inputId,
        id: labelId,
      });
    }

    return null;
  }

  private renderInput() {
    const { label, placeholder, error, required, disabled } = this.props;

    const highlightedItem = this.getItemById(this.state.highlightedId);
    const ariaActiveDescendant = highlightedItem ? { 'aria-activedescendant': highlightedItem.id } : {};
    const ariaControls = this.state.isOpen ? { 'aria-controls': this.getSelectId() } : {};
    const ariaLabelledBy = label ? { 'aria-labelledby': this.getLabelId() } : {};

    if (this.inputRef) {
      const hasError = Boolean(error);
      const errorMessage = typeof error === 'string' ? error : 'Invalid input';

      this.inputRef.setCustomValidity(hasError ? errorMessage : '');
    }

    return (
      <Reference innerRef={node => (this.inputRef = node as HTMLInputElement)}>
        {({ ref }) => (
          <Input
            error={error}
            iconRight={this.renderDropdownIcon()}
            aria-autocomplete="list"
            id={this.getInputId()}
            onChange={this.handleOnInputChange}
            onKeyDown={this.handleOnInputKeyDown}
            onFocus={this.handleOnInputFocus}
            placeholder={placeholder}
            ref={ref}
            required={required}
            disabled={disabled}
            value={this.state.inputText}
            {...ariaActiveDescendant}
            {...ariaControls}
            {...ariaLabelledBy}
          />
        )}
      </Reference>
    );
  }

  private renderFilteredChildren() {
    const { children } = this.props;

    return React.Children.map(children as ListItem[], (child, index) => {
      if (
        React.isValidElement(child) &&
        (child.type === ListItem || child.type === ListAction) &&
        typeof child.props.children === 'string'
      ) {
        if (
          !this.state.filterChildren ||
          child.props.children.toLowerCase().startsWith(this.state.inputText.toLocaleLowerCase()) ||
          child.type === ListAction
        ) {
          const id = `${this.getSelectId()}-item-${index}`;

          return React.cloneElement<React.LiHTMLAttributes<HTMLLIElement>>(child, {
            'aria-selected': child.props.value === this.props.value,
            // @ts-ignore
            'data-highlighted': id === this.state.highlightedId,
            id,
            onClick: child.type === ListItem ? this.handleOnItemClick : this.handleOnActionClick,
            onMouseOver: this.handleOnItemMouseOver,
            role: 'option',
          });
        }

        return null;
      }
    });
  }

  private toggleList = () => {
    this.state.isOpen ? this.closeList() : this.openList();
  };

  private openList() {
    const { value } = this.props;

    this.setState({ isOpen: true }, () => {
      document.addEventListener('mousedown', this.handleOnClickOutside, false);

      const item = value && this.findItemByValue(value);

      if (item) {
        this.updateHighlightedId(item.id, true);
      }

      return this.inputRef && this.inputRef.focus({ preventScroll: true });
    });
  }

  private closeList() {
    this.setState({ filterChildren: false, highlightedId: null, isOpen: false }, () => {
      document.removeEventListener('mousedown', this.handleOnClickOutside, false);

      if (this.props.value) {
        const selectListItem = this.findChildrenByValue(this.props.value);
        const text =
          selectListItem && typeof selectListItem.props.children === 'string' && selectListItem.props.children;

        if (text) {
          this.setState({ inputText: text });
        }
      } else {
        this.setState({ inputText: '' });
      }
    });
  }

  private getInputId() {
    return this.uniqueInputId;
  }

  private getLabelId() {
    return this.uniqueLabelId;
  }

  private getSelectId() {
    const { id } = this.props;

    return id || this.uniqueSelectId;
  }

  private findIdByItem(item: HTMLLIElement) {
    const children = this.listRef && Array.from(this.listRef.children);

    return children && children[children.indexOf(item)].id;
  }

  private findItemByValue(value: AllHTMLAttributes<HTMLElement>['value']) {
    const children = this.listRef && Array.from(this.listRef.children);

    return (
      children &&
      children.find(child => {
        return child.getAttribute('value') === value;
      })
    );
  }

  private findChildrenByValue(value: AllHTMLAttributes<HTMLElement>['value']) {
    const children = React.Children.toArray(this.props.children) as ListItem[];

    return children.find(child => {
      return child.props.value === value;
    });
  }

  private getItemById(id: string | null) {
    if (!this.listRef || !id) {
      return null;
    }

    const children = Array.from(this.listRef.children) as HTMLLIElement[];

    return children.find(child => {
      return child.id === id;
    });
  }

  private updateInputText(text?: string) {
    const { value, children } = this.props;

    if (typeof text !== 'undefined') {
      return this.setState({ inputText: text });
    }

    if (!value) {
      return;
    }

    React.Children.forEach(children as ListItem[], child => {
      if (React.isValidElement(child) && child.type === ListItem) {
        if (child.props.value === this.props.value) {
          return (
            child.props.children &&
            typeof child.props.children === 'string' &&
            this.setState({ inputText: child.props.children })
          );
        }
      }
    });
  }

  private handleListRef = (node: HTMLElement | null) => {
    this.listRef = node as HTMLUListElement;
  };

  private handleOnActionClick = () => {
    const { onActionClick } = this.props;

    if (onActionClick) {
      onActionClick(this.state.inputText);
    }

    this.toggleList();
  };

  private handleOnClickOutside = (event: MouseEvent) => {
    if (!this.listRef) {
      return;
    }

    if (
      (this.listRef && this.listRef.contains(event.target as Node)) ||
      (this.inputRef && this.inputRef.parentElement && this.inputRef.parentElement.contains(event.target as Node))
    ) {
      return;
    }

    if (this.state.isOpen) {
      this.toggleList();
    }
  };

  private handleOnItemClick = () => {
    const { onItemChange } = this.props;
    const highlightedItem = this.getItemById(this.state.highlightedId);

    if (highlightedItem && highlightedItem.textContent) {
      const value = highlightedItem.getAttribute('value');
      const listItem = this.findChildrenByValue(value || '');

      if (listItem && listItem.props.disabled) {
        return;
      }

      this.updateInputText(highlightedItem.textContent);

      if (onItemChange && value) {
        onItemChange(value);
      }
    }

    if (this.inputRef) {
      this.inputRef.focus({ preventScroll: true });
    }

    if (this.state.isOpen) {
      this.toggleList();
    }
  };

  private handleOnItemMouseOver = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const item = event.currentTarget;

    const id = this.findIdByItem(item);

    if (typeof id === 'string') {
      this.setState({ highlightedId: id });
    }
  };

  private handleOnInputFocus = () => {
    if (!this.props.value && !this.state.isOpen) {
      this.toggleList();
    }
  };

  private handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!this.state.isOpen) {
      this.toggleList();
    }

    this.setState({ filterChildren: true, inputText: event.target.value }, () => {
      if (!this.listRef) {
        return;
      }

      this.scrollIntoView(true);

      const length = this.listRef.children.length;
      const status = document.getElementById(`a11y-status-message-${this.getSelectId()}`);

      if (!status) {
        return;
      }

      status.innerHTML = '';
      const node = document.createElement('div');
      let text;

      /**
       * The following text is used for VO.
       * Need to think about way to translate this text in the future. There are no tools to translate atm.
       * Might become an optional prop that can change the text.
       */

      switch (length) {
        case 0: {
          text = document.createTextNode('0 results are available.');
          break;
        }
        case 1: {
          text = document.createTextNode(
            '1 result is available, use up and down arrow keys to navigate. Press Enter key to select.',
          );
          break;
        }
        default: {
          text = document.createTextNode(
            `${length} results are available, use up and down arrow keys to navigate. Press Enter key to select.`,
          );
        }
      }

      node.appendChild(text);
      status.appendChild(node);
    });
  };

  /**
   * Accessibility Listbox Keyboard Support
   * Learn more: https://www.w3.org/TR/wai-aria-practices/#Listbox
   */

  private handleOnInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!this.listRef) {
      return;
    }

    const firstChild = this.listRef.firstChild as HTMLElement;
    const lastChild = this.listRef.lastChild as HTMLElement;

    switch (event.key) {
      case 'Enter':
      case ' ': {
        event.preventDefault();
        this.handleOnItemClick();
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        this.updateHighlightedId(this.nextItemId(-1));

        break;
      }

      case 'ArrowDown': {
        event.preventDefault();
        this.updateHighlightedId(this.nextItemId(1));

        break;
      }
      case 'Home': {
        event.preventDefault();

        if (!firstChild) {
          return;
        }

        this.updateHighlightedId(firstChild.id);

        break;
      }
      case 'End': {
        event.preventDefault();

        if (!lastChild) {
          return;
        }

        this.updateHighlightedId(lastChild.id);

        break;
      }
      case 'Tab':
      case 'Esc':
      case 'Escape': {
        if (this.state.isOpen) {
          this.toggleList();
        }
        break;
      }
    }
  };

  private nextItemId(direction: 1 | -1) {
    if (!this.listRef || !this.listRef.firstChild || !this.listRef.lastChild) {
      return null;
    }

    const { highlightedId } = this.state;
    const element = this.getItemById(highlightedId);

    const firstChild = this.listRef.firstChild as HTMLElement;
    const lastChild = this.listRef.lastChild as HTMLElement;

    if (!element) {
      if (direction > 0) {
        return firstChild.id;
      } else {
        return lastChild.id;
      }
    }

    if (direction > 0) {
      if (element.nextSibling) {
        const nextSibling = element.nextSibling as HTMLElement;

        return nextSibling.id;
      } else {
        return firstChild.id;
      }
    } else if (direction < 0) {
      if (element.previousSibling) {
        const previousSibling = element.previousSibling as HTMLElement;

        return previousSibling.id;
      } else {
        return lastChild.id;
      }
    }

    return null;
  }

  private updateHighlightedId(id: string | null, instantScroll = false) {
    if (!id) {
      return;
    }

    this.setState(
      {
        highlightedId: id,
      },
      () => {
        this.scrollIntoView(instantScroll);
      },
    );
  }

  private scrollIntoView(instantScroll: boolean) {
    const element = this.getItemById(this.state.highlightedId);

    if (!element) {
      return;
    }

    return scrollIntoView(element, {
      behavior: instantScroll ? 'instant' : 'smooth',
      block: 'nearest',
      inline: 'nearest',
      scrollMode: 'if-needed',
    });
  }
}
