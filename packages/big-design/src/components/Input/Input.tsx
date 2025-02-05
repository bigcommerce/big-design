import React, {
  cloneElement,
  ComponentPropsWithoutRef,
  forwardRef,
  isValidElement,
  Ref,
  useId,
  useMemo,
  useState,
} from 'react';

import { typedMemo, warning } from '../../utils';
import { Chip, ChipProps } from '../Chip';
import { FormControlDescription, FormControlLabel } from '../Form';
import { useInputErrors } from '../Form/useInputErrors';

import { StyledIconWrapper, StyledInput, StyledInputContent, StyledInputWrapper } from './styled';

export interface Props {
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

export type InputProps = Props & ComponentPropsWithoutRef<'input'>;

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
  const uniqueInputId = useId();
  const id = props.id ? props.id : uniqueInputId;
  const { errors } = useInputErrors(id, error);

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

  const renderedLabel = useMemo(() => {
    if (!label) {
      return null;
    }

    if (typeof label === 'string') {
      return (
        <FormControlLabel htmlFor={id} id={labelId} renderRequired={props.required}>
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

    return chips.map((chip, idx) => (
      <Chip {...chip} key={`${chip.label}-${idx}`} marginBottom="none" />
    ));
  }, [chips]);

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
            chips={chips}
            disabled={disabled}
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
