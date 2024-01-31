import React, {
  cloneElement,
  forwardRef,
  isValidElement,
  LabelHTMLAttributes,
  Ref,
  useId,
  useMemo,
} from 'react';

import { typedMemo, warning, withTransients } from '../../utils';
import { FormControlDescription, FormControlLabel } from '../Form';
import { useInputErrors } from '../Form/useInputErrors';
import { InputLocalization } from '../Input/Input';

import { StyledTextarea, StyledTextareaWrapper } from './styled';

export interface Props {
  readonly description?: React.ReactChild;
  readonly error?: React.ReactNode | React.ReactNode[];
  readonly label?: React.ReactChild;
  readonly labelId?: string;
  readonly localization?: InputLocalization;
  readonly rows?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  readonly resize?: boolean;
}

interface PrivateProps {
  readonly forwardedRef: Ref<HTMLTextAreaElement>;
}

export type TextareaProps = Props & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const StyleableTextarea: React.FC<TextareaProps & PrivateProps> = ({
  description,
  error,
  forwardedRef,
  label,
  labelId,
  localization,
  rows = 3,
  resize = true,
  ...props
}) => {
  const uniqueTextareaId = useId();
  const id = props.id ? props.id : uniqueTextareaId;
  const { errors } = useInputErrors(id, error);
  const MAX_ROWS = 7;
  const numOfRows = rows && rows > MAX_ROWS ? MAX_ROWS : rows;

  const renderedLabel = useMemo(() => {
    if (!label) {
      return null;
    }

    if (typeof label === 'string') {
      return (
        <FormControlLabel
          htmlFor={id}
          id={labelId}
          localization={localization}
          renderOptional={!props.required}
        >
          {label}
        </FormControlLabel>
      );
    }

    if (
      isValidElement<LabelHTMLAttributes<HTMLLabelElement>>(label) &&
      label.type === FormControlLabel
    ) {
      return cloneElement(label, {
        id: labelId,
        htmlFor: id,
      });
    }

    warning('label must be either a string or a FormControlLabel component.');
  }, [id, label, labelId, localization, props.required]);

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
      <StyledTextareaWrapper>
        <StyledTextarea
          {...withTransients(props)}
          $error={errors}
          $resize={resize}
          id={id}
          ref={forwardedRef}
          rows={numOfRows}
        />
      </StyledTextareaWrapper>
    </div>
  );
};

export const Textarea = typedMemo(
  forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, style, ...props }, ref) => (
    <StyleableTextarea {...props} forwardedRef={ref} />
  )),
);
