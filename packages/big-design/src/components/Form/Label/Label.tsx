import React, { ComponentPropsWithoutRef } from 'react';

import { Text } from '../../Typography/';

import { StyledLabel } from './styled';

export interface FormControlLabelProps extends ComponentPropsWithoutRef<'label'> {
  renderRequired?: boolean;
}

export const FormControlLabel: React.FC<FormControlLabelProps> = ({
  className,
  style,
  renderRequired,
  ...props
}) => (
  <StyledLabel {...props}>
    {props.children}
    {renderRequired && (
      <Text aria-hidden="true" as="span" color="danger" marginLeft="xxSmall">
        *
      </Text>
    )}
  </StyledLabel>
);
