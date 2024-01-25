import React, {
  cloneElement,
  forwardRef,
  isValidElement,
  LabelHTMLAttributes,
  Ref,
  useId,
  useMemo,
  useState,
} from 'react';

import { typedMemo, warning, withTransients } from '../../utils';
import { Chip, ChipProps } from '../Chip';
import { FormControlDescription, FormControlLabel } from '../Form';
import { useInputErrors } from '../Form/useInputErrors';

import { StyledIconWrapper, StyledInput, StyledInputContent, StyledInputWrapper } from './styled';

export interface InputLocalization {
  optional: string;
}

export interface Props {
  readonly chips?: ChipProps[];
  readonly description?: React.ReactChild;
  readonly error?: React.ReactNode | React.ReactNode[];
  readonly iconLeft?: React.ReactNode;
  readonly iconRight?: React.ReactNode;
  readonly label?: React.ReactChild;
  readonly labelId?: string;
  readonly localization?: InputLocalization;
}

interface PrivateProps {
  readonly forwardedRef: Ref<HTMLInputElement>;
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
  localization,
  ...props
}) => {
  const [focus, setFocus] = useState(false);
  const uniqueInputId = useId();
  const id = props.id ? props.id : uniqueInputId;
  const { errors } = useInputErrors(id, error);

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

  const renderedIconLeft = useMemo(() => {
    if (!props.iconLeft) {
      return null;
    }

    return (
      <StyledIconWrapper $paddingLeft="xSmall" $paddingRight="xxSmall">
        {props.iconLeft}
      </StyledIconWrapper>
    );
  }, [props.iconLeft]);

  const renderedIconRight = useMemo(() => {
    if (!props.iconRight) {
      return null;
    }

    return (
      <StyledIconWrapper $paddingLeft="xxSmall" $paddingRight="xSmall">
        {props.iconRight}
      </StyledIconWrapper>
    );
  }, [props.iconRight]);

  const renderedChips = useMemo(() => {
    if (!chips) {
      return null;
    }

    return chips.map((chip, idx) => (
      <Chip {...chip} key={`${chip.label}-${idx}`} marginBottom="none" />
    ));
  }, [chips]);

  return (
    <div>
      {renderedLabel}
      {renderedDescription}
      <StyledInputWrapper $error={errors} $focus={focus} disabled={disabled}>
        {renderedIconLeft}
        <StyledInputContent chips={chips}>
          {renderedChips}
          <StyledInput
            {...withTransients(props)}
            disabled={disabled}
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
