import React, { memo } from 'react';

import { StyledTableHead } from './styled';

export type HeadProps = React.TableHTMLAttributes<HTMLTableSectionElement>;

export const Head: React.FC<HeadProps> = memo(({ className, style, ...props }) => <StyledTableHead {...props} />);
