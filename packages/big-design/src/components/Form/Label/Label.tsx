import React, { ComponentPropsWithoutRef } from 'react';

import { StyledLabel } from './styled';

export interface LabelLocalization {
  optional: string;
}

const defaultLocalization: LabelLocalization = {
  optional: 'optional',
};

export interface FormControlLabelProps extends ComponentPropsWithoutRef<'label'> {
  renderOptional?: boolean;
  localization?: LabelLocalization;
}

export const FormControlLabel: React.FC<FormControlLabelProps> = ({
  className,
  localization = defaultLocalization,
  style,
  ...props
}) => <StyledLabel localization={localization} {...props} />;
