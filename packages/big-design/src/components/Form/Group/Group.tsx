import { ErrorIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { uniqueId } from '../../../utils';
import { Checkbox } from '../../Checkbox';
import { Radio } from '../../Radio';
import { Error as FormError } from '../Error';

import { StyledError, StyledGroup, StyledInlineGroup } from './styled';

export interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
  errors?: string | React.ReactChild | Array<string | React.ReactChild>;
}

export const Group: React.FC<GroupProps> = props => {
  const { children, errors: groupErrors } = props;
  const childrenCount = React.Children.count(children);
  const inline = !React.Children.toArray(children).every(child => {
    return React.isValidElement(child) && (child.type === Checkbox || child.type === Radio);
  });

  const renderErrors = () => {
    // If Form.Group has errors prop, don't generate errors from children
    if (groupErrors) {
      return generateErrors(groupErrors);
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

function generateErrors(errors: GroupProps['errors']): React.ReactNode {
  const errorKey = uniqueId('formGroup_error_');

  if (typeof errors === 'string') {
    return (
      <StyledError alignItems="center" key={errorKey}>
        <ErrorIcon color="danger" />
        <FormError>{errors}</FormError>
      </StyledError>
    );
  }

  if (React.isValidElement(errors) && errors.type === FormError) {
    return (
      <StyledError alignItems="center" key={errorKey}>
        <ErrorIcon color="danger" />
        {errors}
      </StyledError>
    );
  }

  if (Array.isArray(errors)) {
    return errors.map(error => error && generateErrors(error));
  }

  return null;
}
