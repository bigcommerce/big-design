import { AddCircleOutlineIcon, RemoveCircleOutlineIcon } from '@bigcommerce/big-design-icons';
import React, {
  cloneElement,
  forwardRef,
  InputHTMLAttributes,
  isValidElement,
  Ref,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useUniqueId } from '../../hooks';
import { typedMemo, warning } from '../../utils';
import { FormControlDescription, FormControlLabel } from '../Form';
import { useInputErrors } from '../Form/useInputErrors';

import { StyledCounterButton, StyledCounterInput, StyledCounterWrapper } from './styled';

export interface CounterProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactChild;
  labelId?: string;
  description?: React.ReactChild;
  error?: React.ReactNode | React.ReactNode[];
  value: number;
  step?: number;
  onCountChange(count: number): void;
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
    value,
    onCountChange,
    ...props
  }) => {
    const [focus, setFocus] = useState(false);
    const uniqueCounterId = useUniqueId('counter');
    const id = props.id ? props.id : uniqueCounterId;
    const { errors } = useInputErrors(id, error);

    useEffect(() => {
      if (!Number.isInteger(value)) {
        onCountChange(Math.round(value));
      }
    }, [onCountChange, value]);

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

    const handleIncrease = (event: React.KeyboardEvent | React.MouseEvent) => {
      event.preventDefault();

      if (value + step > max) {
        return;
      }

      // Checks that the provided value is a multiple of the step
      if (value % step === 0) {
        onCountChange(value + step);
      }
      // If not, returns nearest higher value that is a multiple of the step
      else {
        onCountChange(value + (step - (value % step)));
      }
    };

    const handleDecrease = (event: React.KeyboardEvent | React.MouseEvent) => {
      event.preventDefault();

      if (value - step < min) {
        return;
      }

      // Checks that the provided value is a multiple of the step
      if (value % step === 0) {
        onCountChange(value - step);
      }
      // If not, returns nearest lower value that is a multiple of the step
      else {
        onCountChange(value - (value % step));
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.currentTarget.value);

      if (Number.isNaN(newValue)) {
        return;
      }

      if (!Number.isInteger(newValue)) {
        onCountChange(Math.round(newValue));
      }

      if (newValue >= min && newValue <= max) {
        onCountChange(newValue);
      }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          handleIncrease(event);
          break;

        case 'ArrowDown':
          handleDecrease(event);
          break;

        case 'Enter':
          event.preventDefault();
          break;

        case 'Escape':
          onCountChange(0);
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
          <FormControlLabel htmlFor={id} id={labelId} renderOptional={!props.required}>
            {label}
          </FormControlLabel>
        );
      }

      if (isValidElement(label) && label.type === FormControlLabel) {
        return cloneElement(label, {
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

      if (isValidElement(description) && description.type === FormControlDescription) {
        return description;
      }

      warning('description must be either a string or a FormControlDescription component.');
    }, [description]);

    return (
      <div>
        {renderedLabel}
        {renderedDescription}
        <StyledCounterWrapper disabled={disabled} error={errors} focus={focus}>
          <StyledCounterButton
            disabled={disabled || value <= min}
            iconOnly={<RemoveCircleOutlineIcon title="Decrease count" />}
            onClick={handleDecrease}
          />
          <StyledCounterInput
            {...props}
            disabled={disabled}
            error={errors}
            id={id}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyPress}
            ref={forwardedRef}
            value={value}
          />
          <StyledCounterButton
            disabled={disabled || value >= max}
            iconOnly={<AddCircleOutlineIcon title="Increase count" />}
            onClick={handleIncrease}
          />
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
