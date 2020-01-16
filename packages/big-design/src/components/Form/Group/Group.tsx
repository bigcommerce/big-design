import { ErrorIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { useUniqueId } from '../../../hooks';
import { warning } from '../../../utils';
import { Checkbox } from '../../Checkbox';
import { Radio } from '../../Radio';
import { FormControlError } from '../Error';

import { StyledError, StyledGroup, StyledInlineGroup } from './styled';

export interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
  errors?: React.ReactChild | React.ReactChild[];
}

export const FormGroup: React.FC<GroupProps> = props => {
  const { children, errors: groupErrors } = props;
  const childrenCount = React.Children.count(children);
  const inline = !React.Children.toArray(children).every(child => {
    return React.isValidElement(child) && (child.type === Checkbox || child.type === Radio);
  });

  const renderErrors = () => {
    // If Form.Group has errors prop, don't generate errors from children
    if (groupErrors) {
      return generateErrors(groupErrors, true);
    }

    return React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        const { error } = child.props;

        return error && generateErrors(error);
      }
    });
  };

  if (inline) {
    return (
      <StyledInlineGroup childrenCount={childrenCount}>
        {children}
        {renderErrors()}
      </StyledInlineGroup>
    );
  }

  return (
    <StyledGroup>
      {children}
      {renderErrors()}
    </StyledGroup>
  );
};

function generateErrors(errors: GroupProps['errors'], fromGroup = false): React.ReactNode {
  const errorKey = useUniqueId('formGroup_error');

  if (typeof errors === 'string') {
    return (
      <StyledError alignItems="center" key={errorKey}>
        <ErrorIcon color="danger" />
        <FormControlError>{errors}</FormControlError>
      </StyledError>
    );
  }

  if (React.isValidElement(errors) && errors.type === FormControlError) {
    return (
      <StyledError alignItems="center" key={errorKey}>
        <ErrorIcon color="danger" />
        {errors}
      </StyledError>
    );
  }

  if (Array.isArray(errors)) {
    return errors.map(error => error && generateErrors(error, fromGroup));
  }

  if (!errors) {
    return null;
  }

  if (fromGroup) {
    warning('errors must be either a string, FormControlError, or an array of strings or FormControlError components.');
  }
}
