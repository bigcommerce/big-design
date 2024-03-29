import React, { ComponentPropsWithoutRef, memo } from 'react';

import { StyledTableHead } from './styled';

export type HeadProps = ComponentPropsWithoutRef<'thead'> & {
  hidden?: boolean;
};

export const Head: React.FC<HeadProps> = memo(({ className, style, hidden = false, ...props }) => (
  <StyledTableHead hidden={hidden} {...props} />
));
