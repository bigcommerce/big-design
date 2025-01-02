import React, { ComponentPropsWithoutRef, memo } from 'react';

import { MarginProps } from '../../helpers';
import { FeatureTag, FeatureTagProps } from '../FeatureTag';

import { StyledFeatureSet } from './styled';

export interface FeatureSetProps extends ComponentPropsWithoutRef<'ul'>, MarginProps {
  features: FeatureTagProps[];
}

export const FeatureSet: React.FC<FeatureSetProps> = memo(({ features, ...props }) => {
  return features && features.length > 0 ? (
    <StyledFeatureSet {...props}>
      {features.map((feature, index) => (
        <li key={index}>
          <FeatureTag {...feature} />
        </li>
      ))}
    </StyledFeatureSet>
  ) : null;
});

FeatureSet.displayName = 'FeatureSet';
