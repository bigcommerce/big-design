import React, { memo } from 'react';

import { StyledTableBody } from './styled';

export interface BodyProps extends React.TableHTMLAttributes<HTMLTableSectionElement> {}

export const Body: React.FC<BodyProps> = memo(({ className, style, ...props }) => <StyledTableBody {...props} />);
