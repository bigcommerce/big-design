import React from 'react';

import { StyledLabel } from './styled';

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label: React.SFC<LabelProps> = props => <StyledLabel {...props} />;
