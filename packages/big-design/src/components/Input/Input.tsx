import React, { forwardRef, useMemo, useState, Ref } from 'react';

import { useUniqueId } from '../../hooks';
import { typedMemo, warning } from '../../utils';
import { Chip } from '../Chip';
import { FormControlDescription, FormControlError, FormControlLabel } from '../Form';

import { StyledIconWrapper, StyledInput, StyledInputContent, StyledInputWrapper } from './styled';

interface Props {
  chips?: string[];
  description?: React.ReactChild;
  error?: React.ReactNode | React.ReactNode[];
  iconLeft?: React.ReactChild;
  iconRight?: React.ReactChild;
  label?: React.ReactChild;
  labelId?: string;
  onChipDelete?(chip: string): () => void;
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
  onChipDelete,
  ...props
}) => {
  const [focus, setFocus] = useState(false);
  const id = props.id ? props.id : useUniqueId('input');

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

    if (React.isValidElement(label) && label.type === FormControlLabel) {
      return React.cloneElement(label as React.ReactElement<React.LabelHTMLAttributes<HTMLLabelElement>>, {
        id: labelId,
        htmlFor: id,
      });
    }

    warning('label must be either a string or a FormControlLabel component.');
  }, [label, labelId, props.required]);

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

  const renderedIconLeft = useMemo(() => {
    if (!props.iconLeft) {
      return null;
    }

    return <StyledIconWrapper>{props.iconLeft}</StyledIconWrapper>;
  }, [props.iconLeft]);

  const renderedIconRight = useMemo(() => {
    if (!props.iconRight) {
      return null;
    }

    return <StyledIconWrapper>{props.iconRight}</StyledIconWrapper>;
  }, [props.iconRight]);

  const renderedChips = useMemo(() => {
    if (!chips) {
      return null;
    }

    return chips.map((chip, key) =>
      onChipDelete ? (
        <Chip key={key} label={chip} marginBottom="none" onDelete={onChipDelete(chip)} />
      ) : (
        <Chip key={key} label={chip} marginBottom="none" marginTop="none" />
      ),
    );
  }, [chips, onChipDelete]);

  const errors = useMemo(() => {
    const validateError = (err: Props['error']) => {
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
