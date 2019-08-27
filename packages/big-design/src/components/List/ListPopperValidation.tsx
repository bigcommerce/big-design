import React, { ReactNode } from 'react';

interface ListPopperValidationProps {
  children: ReactNode;
  isOpen: boolean;
  scheduleUpdate(): void;
}

export class ListPopperValidation extends React.PureComponent<ListPopperValidationProps> {
  componentDidUpdate(prevProps: ListPopperValidationProps) {
    if (
      this.props.isOpen !== prevProps.isOpen ||
      React.Children.count(this.props.children) !== React.Children.count(prevProps.children)
    ) {
      this.props.scheduleUpdate();
    }
  }

  render() {
    return this.props.children;
  }
}
