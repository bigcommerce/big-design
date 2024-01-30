import React, { forwardRef, memo, TableHTMLAttributes } from 'react';

import { withTransients } from '../../../utils';

import { StyledTableBody } from './styled';

export interface BodyProps extends TableHTMLAttributes<HTMLTableSectionElement> {
  readonly withFirstRowBorder?: boolean;
}

interface PrivateProps {
  readonly forwardedRef?: React.Ref<HTMLTableSectionElement>;
}

const RawBody: React.FC<BodyProps & PrivateProps> = (props) => (
  <StyledTableBody ref={props.forwardedRef} {...withTransients(props)} />
);

export const Body = memo(
  forwardRef<HTMLTableSectionElement, BodyProps>((props, ref) => (
    <RawBody {...props} forwardedRef={ref} />
  )),
);
