import React, { cloneElement, forwardRef, isValidElement, Ref, useMemo, useState } from 'react';

import { useUniqueId } from '../../hooks';
import { typedMemo, warning } from '../../utils';
import { Chip, ChipProps } from '../Chip';
import { FormControlDescription, FormControlError, FormControlLabel } from '../Form';

import { StyledIconWrapper, StyledInput, StyledInputContent, StyledInputWrapper } from './styled';
interface Props {
  chips?: ChipProps[];
  description?: React.ReactChild;
  error?: React.ReactNode | React.ReactNode[];
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  label?: React.ReactChild;
  labelId?: string;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLInputElement>;
}

export type InputProps = Props & React.InputHTMLAttributes<HTMLInputElement>;

const StyleableInput: React.FC<InputProps & PrivateProps> = ({
  chips,
  description,
  disabled,
  error,
  forwardedRef,
  label,
  labelId,
  ...props
}) => {
  const [focus, setFocus] = useState(false);
  const uniqueInputId = useUniqueId('input');
  const id = props.id ? props.id : uniqueInputId;

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

    if (isValidElement(label) && label.type === FormControlLabel) {
      return cloneElement(label as React.ReactElement<React.LabelHTMLAttributes<HTMLLabelElement>>, {
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

  const renderedIconLeft = useMemo(() => {
    if (!props.iconLeft) {
      return null;
    }

    return (
      <StyledIconWrapper paddingLeft="xSmall" paddingRight="xxSmall">
        {props.iconLeft}
      </StyledIconWrapper>
    );
  }, [props.iconLeft]);

  const renderedIconRight = useMemo(() => {
    if (!props.iconRight) {
      return null;
    }

    return (
      <StyledIconWrapper paddingLeft="xxSmall" paddingRight="xSmall">
        {props.iconRight}
      </StyledIconWrapper>
    );
  }, [props.iconRight]);

  const renderedChips = useMemo(() => {
    if (!chips) {
      return null;
    }

    return chips.map((chip) => <Chip {...chip} key={chip.label} marginBottom="none" />);
  }, [chips]);

  const errors = useMemo(() => {
    const validateError = (err: Props['error']) => {
      if (!err) {
        return null;
      }

      if (typeof err === 'string') {
        return err;
      }

      if (isValidElement(err) && err.type === FormControlError) {
        return err;
      }

      warning('error must be either a string or a FormControlError component.');
    };

    if (Array.isArray(error)) {
      error.forEach(validateError);

      return error.length > 0 ? error : null;
    }

    return validateError(error);
  }, [error]);

  return (
    <div>
      {renderedLabel}
      {renderedDescription}
      <StyledInputWrapper disabled={disabled} error={errors} focus={focus}>
        {renderedIconLeft}
        <StyledInputContent chips={chips}>
          {renderedChips}
          <StyledInput
            {...props}
            disabled={disabled}
            chips={chips}
            error={errors}
            id={id}
            onBlur={handleBlur}
            onFocus={handleFocus}
            ref={forwardedRef}
          />
        </StyledInputContent>

        {renderedIconRight}
      </StyledInputWrapper>
    </div>
  );
};

export const Input = typedMemo(
  forwardRef<HTMLInputElement, InputProps>(({ className, style, ...props }, ref) => (
    <StyleableInput {...props} forwardedRef={ref} />
  )),
);
