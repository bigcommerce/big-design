import React, { LabelHTMLAttributes } from 'react';

import { StyledLabel } from './styled';

interface Localization {
  optional: string;
}

const defaultLocalization: Localization = {
  optional: 'optional',
};

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  renderOptional?: boolean;
  localization?: Localization;
}

export const FormControlLabel: React.FC<LabelProps> = ({
  className,
  localization = defaultLocalization,
  style,
  ...props
}) => <StyledLabel localization={localization} {...props} />;
