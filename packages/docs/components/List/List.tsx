// eslint-disable-next-line import/no-duplicates -- React below is a genuine value import; the rest is type-only
import React from 'react';
// eslint-disable-next-line import/no-duplicates -- see above
import type { CSSProperties, ReactElement, ReactNode } from 'react';

import { ListItem } from './Item';
import { StyledOrderedList, StyledUnorderedList } from './styled';

export interface ListProps {
  as?: 'ul' | 'ol';
  children: ReactNode;
  columnCount?: number;
  columnGap?: number | string;
  reset?: boolean;
  style?: CSSProperties;
  className?: string;
}

export const List = ({
  columnCount = 1,
  columnGap = 'normal',
  as = 'ul',
  children,
  reset,
  ...props
}: ListProps): ReactElement<ListProps> => {
  const ElementType = as === 'ol' ? StyledOrderedList : StyledUnorderedList;

  return (
    <ElementType $columnCount={columnCount} $columnGap={columnGap} $reset={reset} {...props}>
      {children}
    </ElementType>
  );
};

List.Item = ListItem;
