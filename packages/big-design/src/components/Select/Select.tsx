import { Placement } from 'popper.js';
import React, { RefObject } from 'react';
import { Manager, Reference } from 'react-popper';
import scrollIntoView from 'scroll-into-view-if-needed';

import { uniqueId } from '../../utils';
import { Flex } from '../Flex/Flex';
import { Label } from '../Form/Label';
import { Input } from '../Input';
import { ListAction } from '../List/Action/Action';
import { ListCheckboxItem } from '../List/Item/CheckboxItem';
import { ListItem } from '../List/Item/Item';
import { List } from '../List/List';

import { Form } from './../Form';
import { StyledDropdownIcon, StyledStatusMessage } from './styled';

interface SelectState {
  filterChildren: boolean;
  highlightedItem: HTMLLIElement | null;
  inputText: string;
  isOpen: boolean;
  selectedItem: HTMLLIElement | null;
}

interface Props {
  disabled?: boolean;
  error?: React.ReactChild;
  label?: React.ReactChild;
  maxHeight?: number;
  multi?: boolean;
  placement?: Placement;
  positionFixed?: boolean;
  required?: boolean;
  value?: string | number | Array<string | number>;
  onActionClick?(inputText: string): void;
  onItemChange(value: string | number | Array<string | number>): void;
}

export type SelectProps = Props & React.HTMLAttributes<HTMLUListElement>;

export class Select extends React.PureComponent<SelectProps, SelectState> {
  static readonly Action = ListAction;
  static readonly Option = ListItem;
  static readonly Error = Form.Error;

  readonly state: SelectState = {
    filterChildren: false,
    highlightedItem: null,
    inputText: '',
    isOpen: false,
    selectedItem: null,
  };

  private inputRef: RefObject<HTMLInputElement> = React.createRef();
  private listRef: HTMLUListElement | null = null;

  private readonly uniqueInputId = uniqueId('input_');
  private readonly uniqueLabelId = uniqueId('label_');
  private readonly uniqueSelectId = uniqueId('select_');

  private listItemsRefs: Array<RefObject<HTMLLIElement>> = [];

  componentDidMount() {
    this.updatedSelectedItem();
  }

  componentDidUpdate(prevProps: SelectProps) {
    const { children, value } = this.props;

    // Reset input if value was reset to empty string
    if (prevProps.value && !value) {
      this.updatedSelectedItem();

      return;
    }

    // Match input text to select value
    if (prevProps.value !== value) {
      this.updatedSelectedItem();

      return;
    }

    if (prevProps.children !== children) {
      this.updatedSelectedItem();

      return;
    }
  }

  render() {
    const {
      children,
      label,
      maxHeight,
      multi,
      onActionClick,
      onItemChange,
      placeholder,
      placement,
      value,
      ...rest
    } = this.props;

    const { isOpen } = this.state;

    const labelId = this.getLabelId();
    const selectId = this.getSelectId();

    this.listItemsRefs = [];

    const ariaLabelledBy = label ? { 'aria-labelledby': labelId } : {};
    const ariaMultiSelect = multi ? { 'aria-multiselectable': true } : {};
    const ariaOwns = isOpen ? { 'aria-owns': selectId } : {};

    const listItems = this.renderChildren();

    return (
      <Manager>
        <div role="combobox" aria-expanded={isOpen} aria-haspopup="listbox" {...ariaOwns}>
          {this.renderLabel()}
          {this.renderInput()}
          <List
            handleListRef={this.handleListRef}
            id={selectId}
            isOpen={isOpen}
            maxHeight={maxHeight}
            placement={placement}
            role="listbox"
            {...ariaLabelledBy}
            {...ariaMultiSelect}
            {...rest}
          >
            {listItems}
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

  private renderLabel() {
    const { label, required } = this.props;

    const inputId = this.getInputId();
    const labelId = this.getLabelId();

    if (typeof label === 'string') {
      return (
        <Label htmlFor={inputId} id={labelId} renderOptional={!required}>
          {label}
        </Label>
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
    const { placeholder, children, error, required, disabled, onItemChange, value } = this.props;
    const { highlightedItem, inputText, isOpen } = this.state;

    const ariaActiveDescendant = highlightedItem ? { 'aria-activedescendant': highlightedItem.id } : {};
    const ariaControls = isOpen ? { 'aria-controls': this.getSelectId() } : {};

    if (this.inputRef && this.inputRef.current) {
      const hasError = Boolean(error);
      const errorMessage = typeof error === 'string' ? error : 'Invalid input';

      this.inputRef.current.setCustomValidity(hasError ? errorMessage : '');
    }

    const chips = this.renderChips();

    const listItems = React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return;
      }

      return { value: child.props.value, text: child.props.children };
    });

    const onChipDelete = (chip: string) => () => {
      const filteredValues = Array.isArray(value)
        ? value.filter(val => {
            const listItem = listItems.find(item => item && String(item.value) === String(val));

            return listItem && listItem.text !== chip;
          })
        : '';

      onItemChange(filteredValues);

      return this.inputRef && this.inputRef.current && this.inputRef.current.focus();
    };

    return (
      <Reference>
        {({ ref }) => (
          <span ref={ref}>
            <Input
              autoComplete="off"
              chips={chips}
              disabled={disabled}
              error={error}
              iconRight={this.renderDropdownIcon()}
              id={this.getInputId()}
              onChange={this.handleOnInputChange}
              onChipDelete={chips && onChipDelete}
              onFocus={this.handleOnInputFocus}
              onKeyDown={this.handleOnInputKeyDown}
              placeholder={placeholder}
              ref={this.inputRef}
              required={required}
              type={'text'}
              value={inputText}
              aria-autocomplete="list"
              {...ariaActiveDescendant}
              {...ariaControls}
            ></Input>
          </span>
        )}
      </Reference>
    );
  }

  private renderChips() {
    const { children, multi, value } = this.props;

    if (!multi || !value) {
      return;
    }

    const listItems = React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return;
      }

      return { value: child.props.value, text: child.props.children };
    });

    if (Array.isArray(value)) {
      return value.map(val => {
        const selectedItem = listItems.find(item => item && String(item.value) === String(val));

        return selectedItem && selectedItem.text;
      });
    } else {
      const listItem = listItems.find(item => item && String(item.value) === String(value));

      return listItem && [listItem.text];
    }
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

  private renderChildren() {
    const { children, multi, value } = this.props;

    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) {
        return;
      }

      const ref = React.createRef<HTMLLIElement>();

      switch (child.type) {
        case ListItem:
          // For now, we only support ListItems that only have text as children
          if (typeof child.props.children !== 'string') {
            return;
          }

          if (
            !this.state.filterChildren ||
            child.props.children.toLowerCase().startsWith(this.state.inputText.toLocaleLowerCase())
          ) {
            const id = this.getItemId(child, index);

            if (!child.props.disabled) {
              this.listItemsRefs.push(ref);
            }

            const ariaSelected = child.props.value === value ? { 'aria-selected': true } : {};

            return multi
              ? (React.cloneElement(
                  { ...child, type: ListCheckboxItem },
                  {
                    'aria-selected': Array.isArray(value)
                      ? value.includes(String(child.props.value))
                      : value && String(value) === String(child.props.value),
                    checked: Array.isArray(value)
                      ? value.includes(String(child.props.value))
                      : value && String(value) === String(child.props.value),
                    'data-highlighted': this.state.highlightedItem && id === this.state.highlightedItem.id,
                    id,
                    onCheckboxChange: child.props.disabled ? null : this.handleOnCheckboxItemChange,
                    onMouseOver: this.handleOnItemMouseOver,
                    ref,
                    role: 'option',
                  },
                ) as React.LiHTMLAttributes<HTMLLIElement>)
              : (React.cloneElement(child, {
                  ...ariaSelected,
                  'data-highlighted': this.state.highlightedItem && id === this.state.highlightedItem.id,
                  id,
                  onClick: child.props.disabled ? null : this.handleOnItemClick,
                  onMouseOver: this.handleOnItemMouseOver,
                  ref,
                  role: 'option',
                }) as React.LiHTMLAttributes<HTMLLIElement>);
          }

          return;
        case ListAction:
          // For now, we only support ListActions that only have text as children
          if (typeof child.props.children !== 'string') {
            return;
          }

          const actionId = this.getActionId(child, index);
          this.listItemsRefs.push(ref);

          return React.cloneElement(child, {
            'data-highlighted': this.state.highlightedItem && actionId === this.state.highlightedItem.id,
            id: actionId,
            onClick: this.handleOnActionClick,
            onMouseOver: this.handleOnItemMouseOver,
            ref,
            role: 'option',
          }) as React.LiHTMLAttributes<HTMLLIElement>;
        default:
          return;
      }
    });
  }

  private toggleList = () => {
    const { disabled } = this.props;

    if (disabled) {
      return;
    }

    return this.state.isOpen ? this.closeList() : this.openList();
  };

  private openList() {
    const { selectedItem } = this.state;

    this.setState({ isOpen: true }, () => {
      document.addEventListener('mousedown', this.handleOnClickOutside, false);

      if (selectedItem) {
        this.updateHighlightedItem(selectedItem, true, true);
      }

      return this.inputRef && this.inputRef.current && this.inputRef.current.focus({ preventScroll: true });
    });
  }

  private closeList() {
    const { selectedItem } = this.state;

    const text = selectedItem && selectedItem.textContent;

    this.setState({ filterChildren: false, highlightedItem: null, inputText: text ? text : '' }, () => {
      document.removeEventListener('mousedown', this.handleOnClickOutside, false);

      // Need to wait for the state to be updated before we close for VO
      this.setState({ isOpen: false });
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

  private getItemId(item: React.ReactElement<React.LiHTMLAttributes<HTMLLIElement>>, index: number) {
    const { id } = item.props;

    return id || `${this.getSelectId()}-item-${index}`;
  }

  private getActionId(item: React.ReactElement<React.LiHTMLAttributes<HTMLLIElement>>, index: number) {
    const { id } = item.props;

    return id || `${this.getSelectId()}-action-${index}`;
  }

  private updateHighlightedItem(element: HTMLLIElement | null, scroll?: boolean, instantScroll?: boolean) {
    if (!element) {
      return;
    }

    this.setState({ highlightedItem: element }, () => {
      return scroll && this.scrollIntoView(instantScroll);
    });
  }

  private updatedSelectedItem() {
    const { value } = this.props;

    if (!value) {
      return this.setState({ inputText: '', selectedItem: null });
    }

    const selectedItemRef = this.listItemsRefs.find(
      ref => ref.current && ref.current.getAttribute('data-value') === String(value),
    );
    const selectedItemElement = selectedItemRef && selectedItemRef.current;

    return (
      selectedItemElement &&
      selectedItemElement.textContent &&
      this.setState({ inputText: selectedItemElement.textContent, selectedItem: selectedItemElement })
    );
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
      (this.inputRef &&
        this.inputRef.current &&
        this.inputRef.current.parentElement &&
        this.inputRef.current.parentElement.parentElement &&
        this.inputRef.current.parentElement.parentElement.contains(event.target as Node))
    ) {
      return;
    }

    if (this.state.isOpen) {
      this.toggleList();
    }
  };

  private handleOnCheckboxItemChange = () => {
    const { onItemChange, value } = this.props;
    const { highlightedItem } = this.state;

    if (!highlightedItem) {
      return;
    }

    const checkbox = highlightedItem.querySelector('input[type="checkbox"]') as HTMLInputElement;

    const selectedValue = checkbox.getAttribute('data-value');

    if (!selectedValue) {
      return;
    }

    if (checkbox.checked) {
      onItemChange(Array.isArray(value) ? value.concat(selectedValue) : [value as string, selectedValue]);
    } else {
      onItemChange(Array.isArray(value) ? value.filter(val => String(val) !== String(selectedValue)) : []);
    }

    if (this.inputRef && this.inputRef.current) {
      this.inputRef.current.focus({ preventScroll: true });
    }
  };

  private handleOnItemClick = () => {
    const { onItemChange } = this.props;
    const { highlightedItem } = this.state;

    if (!highlightedItem || highlightedItem.hasAttribute('disabled')) {
      return;
    }

    if (highlightedItem.textContent) {
      const value = highlightedItem.getAttribute('data-value');

      if (onItemChange && value) {
        onItemChange(value);
      }
    }

    if (this.state.isOpen) {
      this.toggleList();
    }
  };

  private handleOnItemMouseOver = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    return this.updateHighlightedItem(event.currentTarget);
  };

  private handleOnInputFocus = () => {
    if (!this.state.isOpen) {
      this.toggleList();
    }
  };

  private handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!this.state.isOpen) {
      this.toggleList();
    }

    this.setState({ filterChildren: true, inputText: event.target.value }, () => {
      this.scrollIntoView(true);

      /**
       * VO CODE
       * Need to think about way to translate this text in the future. There are no tools to translate atm.
       * Might become an optional prop that can change the text.
       */

      if (!this.listRef) {
        return;
      }

      const length = this.listRef.children.length;
      const status = document.getElementById(`a11y-status-message-${this.getSelectId()}`);

      if (!status) {
        return;
      }

      status.innerHTML = '';
      const node = document.createElement('div');
      let text;

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

    if (!this.listRef) {
      return;
    }

    switch (event.key) {
      case 'Enter': {
        if (this.state.isOpen) {
          event.preventDefault();
          this.clickHighlightedItem();
        } else {
          this.toggleList();
        }
        break;
      }
      case 'Backspace': {
        if (this.state.inputText === '' && this.props.multi) {
          return Array.isArray(this.props.value)
            ? this.props.onItemChange(this.props.value.slice(0, this.props.value.length - 1))
            : this.props.onItemChange([]);
        }
        break;
      }
      case ' ': {
        if (!this.state.isOpen) {
          event.preventDefault();
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

  private clickHighlightedItem() {
    const { highlightedItem } = this.state;

    if (!highlightedItem) {
      return;
    }

    const checkbox = highlightedItem && (highlightedItem.querySelector('input[type="checkbox"]') as HTMLInputElement);

    return checkbox ? checkbox.click() : highlightedItem.click();
  }
}
