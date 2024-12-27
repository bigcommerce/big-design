import React, { ComponentPropsWithoutRef, memo, ReactNode } from 'react';

import { MarginProps } from '../../helpers';

import { StyledFeatureTag, StyledFeatureTagLabel } from './styled';

export interface FeatureTagProps extends ComponentPropsWithoutRef<'span'>, MarginProps {
  icon?: ReactNode;
  label: string;
}

export const FeatureTag: React.FC<FeatureTagProps> = memo(({ icon, label, ...props }) => {
  return label ? (
    <StyledFeatureTag {...props}>
      {icon}
      <StyledFeatureTagLabel>{label}</StyledFeatureTagLabel>
    </StyledFeatureTag>
  ) : null;
});

FeatureTag.displayName = 'FeatureTag';
