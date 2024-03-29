import React, { ComponentPropsWithoutRef, forwardRef, memo } from 'react';

import { StyledTableBody } from './styled';

export interface BodyProps extends ComponentPropsWithoutRef<'tbody'> {
  withFirstRowBorder?: boolean;
}

interface PrivateProps {
  forwardedRef?: React.Ref<HTMLTableSectionElement>;
}

const RawBody: React.FC<BodyProps & PrivateProps> = (props) => (
  <StyledTableBody ref={props.forwardedRef} {...props} />
);

export const Body = memo(
  forwardRef<HTMLTableSectionElement, BodyProps>((props, ref) => (
    <RawBody {...props} forwardedRef={ref} />
  )),
);
