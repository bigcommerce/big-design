import React, { ReactNode } from 'react';

interface ListPopperValidationProps {
  children: ReactNode;
  scheduleUpdate(): void;
}

export class ListPopperValidation extends React.PureComponent<ListPopperValidationProps> {
  componentDidUpdate() {
    this.props.scheduleUpdate();
  }

  render() {
    return this.props.children;
  }
}
