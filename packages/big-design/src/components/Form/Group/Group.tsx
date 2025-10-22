import { ErrorIcon } from '@bigcommerce/big-design-icons';
import React, {
  Children,
  ComponentPropsWithoutRef,
  createContext,
  Fragment,
  isValidElement,
  useMemo,
  useState,
} from 'react';

import { warning } from '../../../utils';
import { Checkbox } from '../../Checkbox';
import { Radio } from '../../Radio';
import { FormControlError } from '../Error';
import { useFormContext } from '../useFormContext';

import { StyledError, StyledGroup, StyledInlineGroup } from './styled';

export interface FormGroupProps extends ComponentPropsWithoutRef<'div'> {
  readonly children?: React.ReactNode;
  readonly errors?: React.ReactNode | React.ReactNode[];
}

type Errors = Record<string, React.ReactNode | React.ReactNode[]>;

interface Context {
  errors?: Errors;
  setErrors?: React.Dispatch<React.SetStateAction<Errors>>;
}

export const FormGroupContext = createContext<Context>({});

export const FormGroup: React.FC<FormGroupProps> = (props) => {
  const { fullWidth } = useFormContext();
  const [inputErrors, setInputErrors] = useState<Errors>({});

  const { children, errors: groupErrors } = props;
  const childrenCount = Children.count(children);
  const inline = !Children.toArray(children).every((child) => {
    return isValidElement(child) && (child.type === Checkbox || child.type === Radio);
  });

  const contextValue = useMemo(
    () => ({
      errors: inputErrors,
      setErrors: setInputErrors,
    }),
    [inputErrors],
  );

  const renderErrors = () => {
    // If Form.Group has errors prop, don't generate errors from children
    if (groupErrors) {
      return generateErrors(groupErrors, true);
    }

    return inputErrors && generateErrors(Object.values(inputErrors));
  };

  return (
    <FormGroupContext.Provider value={contextValue}>
      {inline ? (
        <StyledInlineGroup childrenCount={childrenCount} fullWidth={fullWidth}>
          {children}
          {renderErrors()}
        </StyledInlineGroup>
      ) : (
        <StyledGroup>
          {children}
          {renderErrors()}
        </StyledGroup>
      )}
    </FormGroupContext.Provider>
  );
};

const generateErrors = (
  errors: FormGroupProps['errors'],
  fromGroup = false,
  key?: number,
): React.ReactNode => {
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
    warning(
      'errors must be either a string, FormControlError, or an array of strings or FormControlError components.',
    );
  }
};
