import React, { ComponentPropsWithoutRef, memo } from 'react';

import { MarginProps } from '../../helpers';

import { StyledUl } from './styled';
import { Tag, TagProps } from './Tag';

export interface FeatureSetProps extends ComponentPropsWithoutRef<'ul'>, MarginProps {
  tags: TagProps[];
}

export const FeatureSet: React.FC<FeatureSetProps> = memo(
  ({ tags, className, style, ...props }) => {
    return tags && tags.length > 0 ? (
      <StyledUl {...props}>
        {tags.map((tag, index) => (
          <Tag {...tag} key={index} />
        ))}
      </StyledUl>
    ) : null;
  },
);

FeatureSet.displayName = 'FeatureSet';
