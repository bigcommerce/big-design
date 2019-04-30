import React from 'react';

interface PopperElementProps {
  isOpen: boolean;
  scheduledUpdate(): void;
}

export class PopperElement extends React.Component<PopperElementProps> {
  componentDidUpdate(prevProps: PopperElementProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.props.scheduledUpdate();
    }
  }

  render() {
    return this.props.children;
  }
}
