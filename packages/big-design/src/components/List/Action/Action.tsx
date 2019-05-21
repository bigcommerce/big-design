import React from 'react';

import { ContentWrapper, StyledListAction, Wrapper } from './styled';

export interface ListActionProps extends React.LiHTMLAttributes<HTMLLIElement> {
  actionType?: 'normal' | 'destructive';
  iconLeft?: React.ReactChild;
  iconRight?: React.ReactChild;
}

export class ListAction extends React.PureComponent<ListActionProps> {
  static readonly defaultProps: Partial<ListActionProps> = {
    actionType: 'normal' as 'normal',
  };

  render() {
    const { children, iconLeft, iconRight, ...rest } = this.props;

    return (
      <StyledListAction {...rest}>
        <Wrapper>
          <ContentWrapper>
            {iconLeft}
            {children}
            {iconRight}
          </ContentWrapper>
        </Wrapper>
      </StyledListAction>
    );
  }
}
