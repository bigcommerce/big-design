import React, { ComponentPropsWithoutRef } from 'react';

import { Text } from '../../Typography/';

import { StyledLabel } from './styled';

export interface FormControlLabelProps extends ComponentPropsWithoutRef<'label'> {
  required?: boolean;
}

export const FormControlLabel: React.FC<FormControlLabelProps> = ({
  className,
  style,
  required,
  ...props
}) => (
  <StyledLabel {...props}>
    {props.children}
    {required && (
      <Text aria-hidden="true" as="span" color="danger">
        {' '}
        *
      </Text>
    )}
  </StyledLabel>
);
