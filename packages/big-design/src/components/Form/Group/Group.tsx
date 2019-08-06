import { ErrorIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

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
  const inline = React.Children.toArray(children).every(child => {
    return React.isValidElement(child) && (child.type === Checkbox || child.type === Radio);
  });

  let errorKey = 0;

  // TODO: Correctly type return
  const generateErrors: any = (errors: GroupProps['errors']) => {
    let errorList = null;

    if (typeof errors === 'string') {
      errorList = (
        <StyledError alignItems="center" key={errorKey++}>
          <ErrorIcon color="danger" title="" />
          <FormError>{errors}</FormError>
        </StyledError>
      );
    }

    if (React.isValidElement(errors) && errors.type === FormError) {
      errorList = (
        <StyledError alignItems="center" key={errorKey++}>
          <ErrorIcon color="danger" title="" />
          {errors}
        </StyledError>
      );
    }

    if (Array.isArray(errors)) {
      errorList = errors.map(error => error && generateErrors(error));
    }

    return errorList;
  };

  const renderErrors = () => {
    if (groupErrors) {
      return generateErrors(groupErrors);
    }

    return React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        const { error } = child.props;

        return generateErrors(error);
      }
    });
  };

  if (!inline) {
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
