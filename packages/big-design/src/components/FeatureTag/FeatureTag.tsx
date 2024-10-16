import { IconProps } from '@bigcommerce/big-design-icons';
import React, { ComponentPropsWithoutRef, forwardRef, ReactElement } from 'react';

import { StyledFeatureTag, StyledFeatureTagIcon, StyledFeatureTagLabel } from './styled';

export interface FeatureTagProps extends ComponentPropsWithoutRef<'a'> {
  icon?: ReactElement<IconProps>;
  isActive?: boolean;
  label: string;
}

export const FeatureTag = forwardRef<HTMLAnchorElement, FeatureTagProps>(
  ({ icon, isActive, ...props }) => {
    const label = props.label;

    return (
      <StyledFeatureTag {...props} className={isActive ? 'active' : ''}>
        {icon ? <StyledFeatureTagIcon>{icon}</StyledFeatureTagIcon> : null}
        <StyledFeatureTagLabel>{label}</StyledFeatureTagLabel>
      </StyledFeatureTag>
    );
  },
);

FeatureTag.displayName = 'FeatureTag';
