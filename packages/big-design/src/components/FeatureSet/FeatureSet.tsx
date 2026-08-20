import React, { type ComponentPropsWithoutRef, memo } from 'react';

import { type MarginProps } from '../../helpers';
import { toTransientMarginProps } from '../../helpers/margins/margins';

import { StyledUl } from './styled';
import { Tag, type TagProps } from './Tag';

export interface FeatureSetProps extends ComponentPropsWithoutRef<'ul'>, MarginProps {
  tags: TagProps[];
}

export const FeatureSet: React.FC<FeatureSetProps> = memo((props) => {
  const {
    tags,
    className,
    style,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginVertical,
    marginHorizontal,
    ...domProps
  } = props;

  return tags && tags.length > 0 ? (
    <StyledUl {...domProps} {...toTransientMarginProps(props)}>
      {tags.map((tag, index) => (
        <Tag {...tag} key={index} />
      ))}
    </StyledUl>
  ) : null;
});

FeatureSet.displayName = 'FeatureSet';
