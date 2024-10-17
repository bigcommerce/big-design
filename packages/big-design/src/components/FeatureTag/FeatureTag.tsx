import { IconProps } from '@bigcommerce/big-design-icons';
import React, { AnchorHTMLAttributes, FunctionComponent, ReactElement } from 'react';

import { StyledFeatureTag, StyledFeatureTagIcon, StyledFeatureTagLabel } from './styled';

export interface FeatureTagProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: ReactElement<IconProps>;
  isActive?: boolean;
  label: string;
}

export const FeatureTag: FunctionComponent<FeatureTagProps> = ({
  label,
  icon,
  isActive,
  href,
  target,
}) => {
  return label ? (
    <StyledFeatureTag
      className={isActive ? 'active' : ''}
      href={href}
      target={target}
      title={label}
    >
      {icon ? <StyledFeatureTagIcon>{icon}</StyledFeatureTagIcon> : null}
      <StyledFeatureTagLabel>{label}</StyledFeatureTagLabel>
    </StyledFeatureTag>
  ) : null;
};

FeatureTag.displayName = 'FeatureTag';
