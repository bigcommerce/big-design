import React, { memo, TableHTMLAttributes } from 'react';

import { StyledTableBody } from './styled';

export interface BodyProps extends TableHTMLAttributes<HTMLTableSectionElement> {
  withFirstRowBorder?: boolean;
}

export const Body: React.FC<BodyProps> = memo(({ className, style, ...props }) => <StyledTableBody {...props} />);
