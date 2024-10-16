import { IconProps } from '@bigcommerce/big-design-icons';
import React, { FunctionComponent, HTMLAttributes, ReactElement } from 'react';

import { StyledFeatureTag, StyledFeatureTagIcon, StyledFeatureTagLabel } from './styled';

export interface FeatureTagProps extends HTMLAttributes<HTMLAnchorElement> {
  icon?: ReactElement<IconProps>;
  isActive?: boolean;
  label: string;
}

export const FeatureTag: FunctionComponent<FeatureTagProps> = ({ label, icon, isActive }) => {
  return label ? (
    <StyledFeatureTag className={isActive ? 'active' : ''} title={label}>
      {icon ? <StyledFeatureTagIcon>{icon}</StyledFeatureTagIcon> : null}
      <StyledFeatureTagLabel>{label}</StyledFeatureTagLabel>
    </StyledFeatureTag>
  ) : null;
};

FeatureTag.displayName = 'FeatureTag';
