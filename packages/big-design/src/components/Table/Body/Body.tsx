import React, { type ComponentPropsWithoutRef, forwardRef, memo } from 'react';

import { StyledTableBody } from './styled';

export interface BodyProps extends ComponentPropsWithoutRef<'tbody'> {
  withFirstRowBorder?: boolean;
}

interface PrivateProps {
  forwardedRef?: React.Ref<HTMLTableSectionElement>;
}

const RawBody: React.FC<BodyProps & PrivateProps> = ({
  forwardedRef,
  withFirstRowBorder,
  ...domProps
}) => <StyledTableBody $withFirstRowBorder={withFirstRowBorder} ref={forwardedRef} {...domProps} />;

export const Body = memo(
  forwardRef<HTMLTableSectionElement, BodyProps>((props, ref) => (
    <RawBody {...props} forwardedRef={ref} />
  )),
);
