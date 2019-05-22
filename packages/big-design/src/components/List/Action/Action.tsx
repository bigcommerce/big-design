import React from 'react';

import { ContentWrapper, StyledListAction, Wrapper } from './styled';

export interface ListActionProps extends React.LiHTMLAttributes<HTMLLIElement> {
  actionType?: 'normal' | 'destructive';
  iconLeft?: React.ReactChild;
}

export class ListAction extends React.PureComponent<ListActionProps> {
  static readonly defaultProps: Partial<ListActionProps> = {
    actionType: 'normal' as 'normal',
  };

  render() {
    const { children, iconLeft, ...rest } = this.props;

    return (
      <StyledListAction {...rest}>
        <Wrapper>
          <ContentWrapper>
            {iconLeft}
            {children}
          </ContentWrapper>
        </Wrapper>
      </StyledListAction>
    );
  }
}
