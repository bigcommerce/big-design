import React from 'react';

import { StyledOrderedList, StyledUnorderedList } from './styled';
import { ListItem } from './Item';

export interface ListProps {
  ordered?: boolean;
  bulleted?: boolean;
}

export class List extends React.PureComponent<ListProps> {
  static defaultProps = {
    ordered: false,
    bulleted: true,
  };
  static Item = ListItem;

  render() {
    const { ordered } = this.props;
    const ElementType = ordered ? StyledOrderedList : StyledUnorderedList;

    return <ElementType {...this.props}>{this.renderChildren()}</ElementType>;
  }

  private renderChildren() {
    const { children } = this.props;

    return React.Children.map(children, child => {
      return React.isValidElement(child) && (child.type === List.Item || child.type === List) ? child : null;
    });
  }
}
