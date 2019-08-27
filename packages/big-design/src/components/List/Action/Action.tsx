import React, { Ref } from 'react';

import { ContentWrapper, StyledListAction, Wrapper } from './styled';

export interface ListActionProps extends React.LiHTMLAttributes<HTMLLIElement> {
  actionType?: 'normal' | 'destructive';
  iconLeft?: React.ReactChild;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLLIElement>;
}

class StyleableListAction extends React.PureComponent<ListActionProps & PrivateProps> {
  static readonly defaultProps: Partial<ListActionProps> = {
    actionType: 'normal' as 'normal',
  };

  render() {
    const { children, forwardedRef, iconLeft, ...rest } = this.props;

    return (
      <StyledListAction ref={forwardedRef} {...rest}>
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

export const ListAction = React.forwardRef<HTMLLIElement, ListActionProps>((props, ref) => (
  <StyleableListAction {...props} forwardedRef={ref} />
));
