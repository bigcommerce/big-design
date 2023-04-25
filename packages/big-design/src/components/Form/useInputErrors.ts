'use client';

import React, { isValidElement, useContext, useEffect, useMemo } from 'react';

import { warning } from '../../utils';

import { FormControlError } from './Error';
import { FormGroupContext } from './Group';

type InputError = React.ReactNode;

const isValidError = (err: InputError) => {
  if (!err) {
    return false;
  }

  if (typeof err === 'string') {
    return true;
  }

  if (isValidElement(err) && err.type === FormControlError) {
    return true;
  }

  warning('error must be either a string or a FormControlError component.');

  return false;
};

export const useInputErrors = (inputId: string, inputErrors: InputError | InputError[]) => {
  const { setErrors } = useContext(FormGroupContext);

  const errors = useMemo(() => {
    if (Array.isArray(inputErrors)) {
      const filteredErrors = inputErrors.filter((errorItem) => isValidError(errorItem));

      return filteredErrors.length > 0 ? filteredErrors : null;
    }

    return isValidError(inputErrors) ? inputErrors : null;
  }, [inputErrors]);

  useEffect(() => {
    setErrors?.((val) => {
      return {
        ...val,
        [inputId]: errors,
      };
    });

    return () => {
      setErrors?.((val) => {
        return {
          ...val,
          [inputId]: null,
        };
      });
    };
  }, [errors, inputId, setErrors]);

  return { errors };
};
