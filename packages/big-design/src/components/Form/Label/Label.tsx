import React, { LabelHTMLAttributes } from 'react';

import { withTransients } from '../../../utils';

import { StyledLabel } from './styled';

export interface LabelLocalization {
  optional: string;
}

const defaultLocalization: LabelLocalization = {
  optional: 'optional',
};

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  readonly renderOptional?: boolean;
  readonly localization?: LabelLocalization;
}

export const FormControlLabel: React.FC<LabelProps> = ({
  className,
  localization = defaultLocalization,
  style,
  ...props
}) => <StyledLabel $localization={localization} {...withTransients(props)} />;
