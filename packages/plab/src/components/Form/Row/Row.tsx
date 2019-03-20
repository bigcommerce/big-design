import React from 'react';

import { StyledRow } from './styled';

type Props = React.HTMLAttributes<HTMLDivElement>;

export class Row extends React.PureComponent<Props> {
  render() {
    const { className, ...props } = this.props;
    const childrenCount = React.Children.count(props.children);

    return <StyledRow childrenCount={childrenCount} {...props} />;
  }
}
