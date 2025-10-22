import React, { CSSProperties, ReactElement, ReactNode } from 'react';

import { ListItem } from './Item';
import { StyledOrderedList, StyledUnorderedList } from './styled';

export interface ListProps {
  readonly as?: 'ul' | 'ol';
  readonly children: ReactNode;
  readonly columnCount?: number;
  readonly columnGap?: number | string;
  readonly reset?: boolean;
  readonly style?: CSSProperties;
  readonly className?: string;
}

export const List = ({
  columnCount = 1,
  columnGap = 'normal',
  as = 'ul',
  children,
  ...props
}: ListProps): ReactElement<ListProps> => {
  const ElementType = as === 'ol' ? StyledOrderedList : StyledUnorderedList;

  return (
    <ElementType columnCount={columnCount} columnGap={columnGap} {...props}>
      {children}
    </ElementType>
  );
};

List.Item = ListItem;
