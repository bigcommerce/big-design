import React, { memo } from 'react';

import { StyledTableBody } from './styled';

export interface BodyProps extends React.TableHTMLAttributes<HTMLTableSectionElement> {
  withFirstRowBorder?: boolean;
}

export const Body: React.FC<BodyProps> = memo(({ className, style, ...props }) => <StyledTableBody {...props} />);
