import React, { forwardRef, useMemo, Ref } from 'react';

import { useUniqueId } from '../../hooks';
import { typedMemo, warning } from '../../utils';
import { FormControlDescription, FormControlError, FormControlLabel } from '../Form';

import { StyledTextarea, StyledTextareaWrapper } from './styled';

interface Props {
  description?: React.ReactChild;
  error?: React.ReactNode | React.ReactNode[];
  label?: React.ReactChild;
  labelId?: string;
  rows?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  resize?: boolean;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLTextAreaElement>;
}

export type TextareaProps = Props & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const StyleableTextarea: React.FC<TextareaProps & PrivateProps> = ({
  description,
  error,
  forwardedRef,
  label,
  labelId,
  rows = 3,
  resize = true,
  ...props
}) => {
  const id = props.id ? props.id : useUniqueId('textarea');
  const MAX_ROWS = 7;
  const numOfRows = rows && rows > MAX_ROWS ? MAX_ROWS : rows;

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
      <StyledTextareaWrapper>
        <StyledTextarea {...props} error={errors} id={id} rows={numOfRows} resize={resize} ref={forwardedRef} />
      </StyledTextareaWrapper>
    </div>
  );
};

export const Textarea = typedMemo(
  forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, style, ...props }, ref) => (
    <StyleableTextarea {...props} forwardedRef={ref} />
  )),
);
