import React, { memo, Ref } from 'react';

import { ContentWrapper, StyledListAction, Wrapper } from './styled';

export interface ListActionProps extends React.LiHTMLAttributes<HTMLLIElement> {
  actionType?: 'normal' | 'destructive';
  iconLeft?: React.ReactChild;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLLIElement>;
}

const StyleableListAction: React.FC<ListActionProps & PrivateProps> = memo(
  ({ actionType = 'normal' as 'normal', children, forwardedRef, iconLeft, ...rest }) => (
    <StyledListAction actionType={actionType} ref={forwardedRef} {...rest}>
      <Wrapper>
        <ContentWrapper>
          {iconLeft}
          {children}
        </ContentWrapper>
      </Wrapper>
    </StyledListAction>
  ),
);

export const ListAction = React.forwardRef<HTMLLIElement, ListActionProps>((props, ref) => (
  <StyleableListAction {...props} forwardedRef={ref} />
));
