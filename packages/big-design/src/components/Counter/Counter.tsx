import { AddCircleOutlineIcon, RemoveCircleOutlineIcon } from '@bigcommerce/big-design-icons';
import React, {
  cloneElement,
  ComponentPropsWithoutRef,
  forwardRef,
  isValidElement,
  Ref,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react';

import { typedMemo, warning } from '../../utils';
import { FormControlDescription, FormControlLabel } from '../Form';
import { useInputErrors } from '../Form/useInputErrors';

import { StyledCounterButton, StyledCounterInput, StyledCounterWrapper } from './styled';

interface Localization {
  decreaseCount: string;
  increaseCount: string;
  optional: string;
}

const defaultLocalization: Localization = {
  decreaseCount: 'Decrease count',
  increaseCount: 'Increase count',
  optional: 'optional',
};

export interface CounterProps extends ComponentPropsWithoutRef<'input'> {
  label?: React.ReactNode;
  labelId?: string;
  description?: React.ReactNode;
  error?: React.ReactNode | React.ReactNode[];
  localization?: Localization;
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
    localization = defaultLocalization,
    description,
    error,
    disabled,
    value,
    onCountChange,
    ...props
  }) => {
    const [focus, setFocus] = useState(false);
    const uniqueCounterId = useId();
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

      if (onFocus) {
        onFocus(event);
      }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      const { onBlur } = props;

      setFocus(false);

      if (onBlur) {
        onBlur(event);
      }
    };

    const handleIncrease = () => {
      if (value + step > Number(max)) {
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

    const handleDecrease = () => {
      if (value - step < Number(min)) {
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

      if (isNaN(newValue)) {
        return;
      }

      if (!Number.isInteger(newValue)) {
        onCountChange(Math.round(newValue));
      }

      if (newValue >= Number(min) && newValue <= Number(max)) {
        onCountChange(newValue);
      }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          handleIncrease();
          break;

        case 'ArrowDown':
          handleDecrease();
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
          <FormControlLabel
            htmlFor={id}
            id={labelId}
            localization={{ optional: localization.optional }}
            renderOptional={!props.required}
          >
            {label}
          </FormControlLabel>
        );
      }

      if (
        isValidElement<ComponentPropsWithoutRef<'label'>>(label) &&
        label.type === FormControlLabel
      ) {
        return cloneElement(label, {
          id: labelId,
          htmlFor: id,
        });
      }

      warning('label must be either a string or a FormControlLabel component.');
    }, [id, label, labelId, localization.optional, props.required]);

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
            disabled={disabled || value <= Number(min)}
            iconOnly={<RemoveCircleOutlineIcon title={localization.decreaseCount} />}
            onClick={handleDecrease}
            type="button"
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
            disabled={disabled || value >= Number(max)}
            iconOnly={<AddCircleOutlineIcon title={localization.increaseCount} />}
            onClick={handleIncrease}
            type="button"
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
