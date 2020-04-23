import { ErrorIcon } from '@bigcommerce/big-design-icons';
import React, { Children, Fragment, HTMLAttributes, isValidElement } from 'react';

import { warning } from '../../../utils';
import { Checkbox } from '../../Checkbox';
import { Radio } from '../../Radio';
import { FormControlError } from '../Error';

import { StyledError, StyledGroup, StyledInlineGroup } from './styled';

export interface GroupProps extends HTMLAttributes<HTMLDivElement> {
  errors?: React.ReactChild | React.ReactChild[];
}

export const FormGroup: React.FC<GroupProps> = (props) => {
  const { children, errors: groupErrors } = props;
  const childrenCount = Children.count(children);
  const inline = !Children.toArray(children).every((child) => {
    return isValidElement(child) && (child.type === Checkbox || child.type === Radio);
  });

  const renderErrors = () => {
    // If Form.Group has errors prop, don't generate errors from children
    if (groupErrors) {
      return generateErrors(groupErrors, true);
    }

    return Children.map(children, (child) => {
      if (isValidElement(child)) {
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

const generateErrors = (errors: GroupProps['errors'], fromGroup = false, key?: number): React.ReactNode => {
  if (typeof errors === 'string') {
    return (
      <Fragment key={key}>
        <StyledError alignItems="center">
          <ErrorIcon color="danger" />
          <FormControlError>{errors}</FormControlError>
        </StyledError>
      </Fragment>
    );
  }

  if (isValidElement(errors) && errors.type === FormControlError) {
    return (
      <Fragment key={key}>
        <StyledError alignItems="center">
          <ErrorIcon color="danger" />
          {errors}
        </StyledError>
      </Fragment>
    );
  }

  if (Array.isArray(errors)) {
    return errors.map((error, index) => error && generateErrors(error, fromGroup, index));
  }

  if (!errors) {
    return null;
  }

  if (fromGroup) {
    warning('errors must be either a string, FormControlError, or an array of strings or FormControlError components.');
  }
};
