import { AddCircleOutlineIcon, RemoveCircleOutlineIcon } from '@bigcommerce/big-design-icons';
import React, { forwardRef, useEffect, useMemo, useRef, useState, Ref } from 'react';

import { useUniqueId } from '../../hooks';
import { typedMemo, warning } from '../../utils';
import { FormControlDescription, FormControlError, FormControlLabel } from '../Form';

import { StyledCounterInput, StyledCounterWrapper } from './private';

export interface CounterProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactChild;
  labelId?: string;
  description?: React.ReactChild;
  error?: React.ReactNode | React.ReactNode[];
}

interface PrivateProps {
  forwardedRef: Ref<HTMLInputElement>;
}

export const StylableCounter: React.FC<CounterProps & PrivateProps> = typedMemo(
  ({
    min = 0,
    max = 100,
    step = 1,
    forwardedRef,
    label,
    labelId,
    description,
    error,
    disabled,
    value = 0,
    ...props
  }) => {
    const [focus, setFocus] = useState(false);
    const [count, setCount] = !isNaN(Number(value)) ? useState(Number(value)) : useState(0);
    const previousValue = useRef(Number(value));
    const uniqueCounterId = useUniqueId('counter');
    const id = props.id ? props.id : uniqueCounterId;

    const decreaseIconColor = () => {
      return count <= min ? 'secondary' : undefined;
    };

    const increaseIconColor = () => {
      return count >= max ? 'secondary' : undefined;
    };

    useEffect(() => {
      previousValue.current = count;
    });

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      const { onFocus } = props;

      setFocus(true);

      return onFocus && onFocus(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      const { onBlur } = props;

      setFocus(false);

      return onBlur && onBlur(event);
    };

    const handleIncrease = () => {
      if (count < max) {
        setCount(previousValue.current + 1);
      }

      return;
    };

    const handleDecrease = () => {
      if (count > min) {
        setCount(previousValue.current - 1);
      }

      return;
    };

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
      const newValue = Number(event.currentTarget.value);
      if (!isNaN(newValue) && newValue >= min && newValue <= max) {
        setCount(newValue);
      }

      return;
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          handleIncrease();
          break;
        case 'ArrowDown':
          handleDecrease();
          break;
        default:
          break;
      }
    };

    const renderedLabel = useMemo(() => {
      if (!label) {
        return null;
      }

      if (typeof label === 'string') {
        return (
          <FormControlLabel id={labelId} htmlFor={id} renderOptional={!props.required}>
            {label}
          </FormControlLabel>
        );
      }

      if (React.isValidElement(label) && label.type === FormControlLabel) {
        return React.cloneElement(label as React.ReactElement<React.LabelHTMLAttributes<HTMLLabelElement>>, {
          id: labelId,
          htmlFor: id,
        });
      }

      warning('label must be either a string or a FormControlLabel component.');
    }, [id, label, labelId, props.required]);

    const renderedDescription = useMemo(() => {
      if (!description) {
        return null;
      }

      if (typeof description === 'string') {
        return <FormControlDescription>{description}</FormControlDescription>;
      }

      if (React.isValidElement(description) && description.type === FormControlDescription) {
        return description;
      }

      warning('description must be either a string or a FormControlDescription component.');
    }, [description]);

    const errors = useMemo(() => {
      const validateError = (err: CounterProps['error']) => {
        if (!err) {
          return null;
        }

        if (typeof err === 'string') {
          return err;
        }

        if (React.isValidElement(err) && err.type === FormControlError) {
          return err;
        }

        warning('error must be either a string or a FormControlError component.');
      };

      if (Array.isArray(error)) {
        error.forEach(validateError);

        return error;
      }

      return validateError(error);
    }, [error]);

    return (
      <div>
        {renderedLabel}
        {renderedDescription}
        <StyledCounterWrapper disabled={disabled} error={errors} focus={focus}>
          <RemoveCircleOutlineIcon onClick={handleDecrease} color={decreaseIconColor()} />
          <StyledCounterInput
            {...props}
            ref={forwardedRef}
            onKeyDown={handleKeyPress}
            value={count}
            disabled={disabled}
            error={errors}
            id={id}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          <AddCircleOutlineIcon onClick={handleIncrease} color={increaseIconColor()} />
        </StyledCounterWrapper>
      </div>
    );
  },
);

export const Counter = typedMemo(
  forwardRef<HTMLInputElement, CounterProps>(({ className, style, ...props }, ref) => (
    <StylableCounter {...props} forwardedRef={ref} />
  )),
);
