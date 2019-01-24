import React from 'react';

import { StyledRow } from './styled';

export class Row extends React.PureComponent<{}> {
  render() {
    const childrenCount = React.Children.count(this.props.children);

    return <StyledRow childrenCount={childrenCount} {...this.props} />;
  }
}
