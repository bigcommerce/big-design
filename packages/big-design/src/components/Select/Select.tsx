import React, { RefObject } from 'react';
import { Manager, Reference } from 'react-popper';
import scrollIntoView from 'scroll-into-view-if-needed';

import { uniqueId } from '../../utils';
import { Box } from '../Box';
import { Flex } from '../Flex/Flex';
import { FlexItem } from '../Flex/Item';
import { Label } from '../Form/Label';
import { Input } from '../Input';
import { ListCheckboxItem } from '../List/Item/CheckboxItem';
import { ListItem } from '../List/Item/Item';
import { List } from '../List/List';

import { StyledDropdownIcon, StyledStatusMessage } from './styled';
import { Action, Option, SelectProps } from './types';

interface SelectState {
  filterChildren: boolean;
  highlightedItem: HTMLLIElement | null;
  inputText: string;
  isOpen: boolean;
  selectedElement: HTMLLIElement | null;
  selectedOptionContent: string;
}

interface Item<T> {
  item: Action | Option<T>;
  ref: RefObject<HTMLLIElement>;
}

export class Select<T extends any> extends React.PureComponent<SelectProps<T>, SelectState> {
  readonly state: SelectState = {
    filterChildren: false,
    highlightedItem: null,
    inputText: '',
    isOpen: false,
    selectedElement: null,
    selectedOptionContent: '',
  };

  private inputRef: RefObject<HTMLInputElement> = React.createRef();
  private listRef: HTMLUListElement | null = null;

  private readonly uniqueInputId = uniqueId('input_');
  private readonly uniqueLabelId = uniqueId('label_');
  private readonly uniqueSelectId = uniqueId('select_');

  private listItems: Array<Item<T>> = [];

  componentDidMount() {
    this.updatedSelectedItem();
  }

  componentDidUpdate(prevProps: SelectProps<T>) {
    const { options, value } = this.props;

    // Reset input if value was reset to empty string
    // or match input text to select value
    if ((prevProps.value && !value) || prevProps.value !== value || prevProps.options !== options) {
      this.updatedSelectedItem();
    }
  }

  render() {
    const { children, label, maxHeight, multi, onChange, placeholder, placement, value, ...rest } = this.props;

    const { isOpen } = this.state;

    const labelId = this.getLabelId();
    const selectId = this.getSelectId();

    this.listItems = [];

    const ariaLabelledBy = label ? { 'aria-labelledby': labelId } : {};
    const ariaMultiSelect = multi ? { 'aria-multiselectable': true } : {};
    const ariaOwns = isOpen ? { 'aria-owns': selectId } : {};

    return (
      <Manager>
        <div role="combobox" aria-expanded={isOpen} aria-haspopup="listbox" {...ariaOwns}>
          {this.renderLabel()}
          {this.renderInput()}
          <List
            {...rest}
            handleListRef={this.handleListRef}
            id={selectId}
            isOpen={isOpen}
            maxHeight={maxHeight}
            placement={placement}
            role="listbox"
            {...ariaLabelledBy}
            {...ariaMultiSelect}
          >
            {this.renderOptions()}
            {this.renderAction()}
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

    return typeof label === 'string' ? (
      <Label htmlFor={inputId} id={labelId} renderOptional={!required}>
        {label}
      </Label>
    ) : null;
  }

  private renderInput() {
    const { placeholder, error, required, disabled, onChange, options, value } = this.props;
    const { highlightedItem, inputText, isOpen } = this.state;
    const ariaActiveDescendant = highlightedItem ? { 'aria-activedescendant': highlightedItem.id } : {};
    const ariaControls = isOpen ? { 'aria-controls': this.getSelectId() } : {};

    const chips = this.renderChips();

    const onChipDelete = (chip: string) => () => {
      const filteredValues = Array.isArray(value)
        ? value.filter(val => {
            const foundOption = options.find(option => option.value === val);

            return foundOption && foundOption.content !== chip;
          })
        : [];

      onChange(filteredValues, this.getSelectedOptions(filteredValues));
      this.focusInput();
    };

    return (
      <Reference>
        {({ ref }) => (
          <span ref={ref}>
            <Input
              aria-autocomplete="list"
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
              {...ariaActiveDescendant}
              {...ariaControls}
            ></Input>
          </span>
        )}
      </Reference>
    );
  }

  private renderChips() {
    const { options, multi, value } = this.props;

    if (!multi || !value || !Array.isArray(value)) {
      return [];
    }

    const selectedOptions = value.map(val => options.find(option => option.value === val));

    return selectedOptions.map(option => (option ? option.content : ''));
  }

  private renderDropdownIcon() {
    return (
      <Flex>
        <StyledDropdownIcon
          aria-haspopup={true}
          aria-label="toggle menu" // Will need to translate this label in the future
          onClick={this.toggleList}
          role="button"
          style={{ outline: 'none' }}
          tabIndex={-1}
        />
      </Flex>
    );
  }

  private renderOptions() {
    const { options = [], multi, value: selectValue } = this.props;
    const { filterChildren, highlightedItem, inputText } = this.state;

    return options.map((option, index) => {
      if (!option.content || !option.value) {
        return null;
      }

      if (!filterChildren || option.content.toLowerCase().startsWith(inputText.toLocaleLowerCase())) {
        const id = this.getOptionId(option, index);
        const isHighlighted = Boolean(highlightedItem && id === highlightedItem.id);
        const ref = React.createRef<HTMLLIElement>();

        if (!option.disabled) {
          this.listItems.push({ item: option, ref });
        }

        const { content, icon, value, ...rest } = option;
        const ariaSelected = value === selectValue ? { 'aria-selected': true } : {};

        return multi ? (
          <ListCheckboxItem
            {...rest}
            aria-selected={this.isChecked(option)}
            checked={this.isChecked(option)}
            data-highlighted={isHighlighted}
            id={id}
            key={index}
            onClick={event => {
              event.stopPropagation();
              event.preventDefault();
              this.handleOnCheckboxOptionClick(option);
            }}
            onFocus={this.handleOnOptionHighlighted}
            onMouseOver={this.handleOnOptionHighlighted}
            ref={ref}
            role="option"
          >
            {content}
          </ListCheckboxItem>
        ) : (
          <ListItem
            {...rest}
            {...ariaSelected}
            actionType="normal"
            data-highlighted={isHighlighted}
            id={id}
            key={index}
            onClick={() => this.handleOnOptionClick(option)}
            onFocus={this.handleOnOptionHighlighted}
            onMouseOver={this.handleOnOptionHighlighted}
            ref={ref}
            role="option"
          >
            {content}
          </ListItem>
        );
      }
    });
  }

  private renderAction() {
    const { action } = this.props;
    const { highlightedItem } = this.state;

    if (!action || !action.content) {
      return null;
    }

    const id = this.getActionId(action);
    const isHighlighted = Boolean(highlightedItem && id === highlightedItem.id);
    const ref = React.createRef<HTMLLIElement>();

    if (!action.disabled) {
      this.listItems.push({ item: action, ref });
    }

    const { content, icon, ...rest } = action;

    return (
      <Box borderTop="box" marginTop="xSmall" paddingTop="xSmall">
        <ListItem
          {...rest}
          data-highlighted={isHighlighted}
          id={id}
          onClick={() => this.handleOnActionClick(action)}
          onFocus={this.handleOnOptionHighlighted}
          onMouseOver={this.handleOnOptionHighlighted}
          ref={ref}
          role="option"
        >
          <Flex alignItems="center" flexDirection="row">
            {icon && <FlexItem paddingRight="xSmall">{this.renderIcon(action, isHighlighted)}</FlexItem>}
            {content}
          </Flex>
        </ListItem>
      </Box>
    );
  }

  private renderIcon(action: Action, isHighlighted: boolean) {
    const getColor = () => {
      if (action.disabled) {
        return 'secondary40';
      }

      if (!isHighlighted) {
        return 'secondary60';
      }

      return action.actionType === 'destructive' ? 'danger50' : 'primary';
    };

    return (
      React.isValidElement(action.icon) &&
      React.cloneElement(action.icon, {
        color: getColor(),
        size: 'large',
      })
    );
  }

  private toggleList = () => {
    const { disabled } = this.props;

    if (disabled) {
      return;
    }

    return this.state.isOpen ? this.closeList() : this.openList();
  };

  private openList() {
    const { selectedElement } = this.state;

    this.setState({ isOpen: true }, () => {
      document.addEventListener('mousedown', this.handleOnClickOutside, false);

      if (selectedElement) {
        this.updateHighlightedItem(selectedElement, true, true);
      }

      this.focusInput();
    });
  }

  private closeList() {
    const { selectedOptionContent } = this.state;

    this.setState({ filterChildren: false, highlightedItem: null, inputText: selectedOptionContent }, () => {
      document.removeEventListener('mousedown', this.handleOnClickOutside, false);

      // Need to wait for the state to be updated before we close for VO
      this.setState({ isOpen: false });
    });
  }

  private focusInput() {
    if (this.inputRef && this.inputRef.current) {
      this.inputRef.current.focus({ preventScroll: true });
    }
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

  private getOptionId(option: Option<T>, index: number) {
    const { id } = option;

    return id || `${this.getSelectId()}-option-${index}`;
  }

  private getActionId(action: Action) {
    const { id } = action;

    return id || `${this.getSelectId()}-action`;
  }

  private getSelectedOptions(values: T[]) {
    const { options } = this.props;

    return options.filter(option => values.find(value => value === option.value));
  }

  private isChecked(option: Option<T>) {
    const { value } = this.props;

    return Array.isArray(value) && Boolean(value.find(val => val === option.value));
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
    const { multi, value } = this.props;

    if (!value || multi) {
      return this.setState({ inputText: '', selectedElement: null, selectedOptionContent: '' });
    }

    const selectedOption = this.listItems.find(item => 'value' in item.item && item.item.value === value);

    if (selectedOption) {
      this.setState({
        inputText: selectedOption.item.content,
        selectedElement: selectedOption.ref.current,
        selectedOptionContent: selectedOption.item.content,
      });
    }
  }

  private handleListRef = (node: HTMLElement | null) => {
    this.listRef = node as HTMLUListElement;
  };

  private handleOnActionClick = (action: Action) => {
    if (action.onClick) {
      action.onClick(this.state.inputText);
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

    this.toggleList();
  };

  private handleOnCheckboxOptionClick = (option: Option<T>) => {
    const { onChange, value } = this.props;
    const { highlightedItem } = this.state;
    let updatedValues = [];

    if (option.disabled || !highlightedItem || !Array.isArray(value)) {
      return;
    }

    const checkbox = highlightedItem.querySelector('input[type="checkbox"]') as HTMLInputElement;

    if (checkbox.checked) {
      updatedValues = value.filter(val => val !== option.value);
    } else {
      updatedValues = value.concat(option.value);
    }

    onChange(updatedValues, this.getSelectedOptions(updatedValues));
    this.focusInput();
  };

  private handleOnOptionClick = (option: Option<T>) => {
    const { onChange } = this.props;

    if (option.disabled) {
      return;
    }

    onChange(option.value, option);
    this.toggleList();
  };

  private handleOnOptionHighlighted = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent> | React.FocusEvent<HTMLLIElement>,
  ) => {
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
    if (!this.listItems.length || !this.listRef) {
      return;
    }

    const highlightedItemIndex = this.listItems.findIndex(item => item.ref.current === this.state.highlightedItem);
    const nextItem = this.listItems[highlightedItemIndex + 1]
      ? this.listItems[highlightedItemIndex + 1].ref.current
      : this.listItems[0].ref.current;
    const prevItem = this.listItems[highlightedItemIndex - 1]
      ? this.listItems[highlightedItemIndex - 1].ref.current
      : this.listItems[this.listItems.length - 1].ref.current;

    if (!this.listRef) {
      return;
    }

    switch (event.key) {
      case 'Enter': {
        if (this.state.isOpen) {
          if (this.state.highlightedItem) {
            this.state.highlightedItem.click();
          }
        } else {
          this.toggleList();
        }
        break;
      }
      case 'Backspace': {
        if (this.state.inputText === '' && this.props.multi) {
          if (Array.isArray(this.props.value)) {
            const updatedValues = this.props.value.slice(0, this.props.value.length - 1);

            this.props.onChange(updatedValues, this.getSelectedOptions(updatedValues));
          }
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
        this.updateHighlightedItem(this.listItems[0].ref.current, true);
        break;
      }
      case 'End': {
        event.preventDefault();
        this.updateHighlightedItem(this.listItems[this.listItems.length - 1].ref.current, true);
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

    scrollIntoView(element, {
      behavior: instantScroll ? 'instant' : 'smooth',
      block: 'nearest',
      inline: 'nearest',
      scrollMode: 'if-needed',
    });
  };
}
