import React, {
  cloneElement,
  type ComponentPropsWithoutRef,
  forwardRef,
  isValidElement,
  type Ref,
  useId,
  useMemo,
  useState,
} from 'react';

import { typedMemo, warning } from '../../utils';
import { Chip, type ChipProps } from '../Chip';
import { FormControlDescription, FormControlLabel } from '../Form';
import { useInputErrors } from '../Form/useInputErrors';

import { StyledIconWrapper, StyledInput, StyledInputContent, StyledInputWrapper } from './styled';

export interface Props {
  chips?: ChipProps[];
  description?: React.ReactNode;
  error?: React.ReactNode | React.ReactNode[];
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  label?: React.ReactNode;
  labelId?: string;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLInputElement>;
}

export type InputProps = Props & ComponentPropsWithoutRef<'input'>;

const StyleableInput: React.FC<InputProps & PrivateProps> = (props) => {
  const {
    chips,
    description,
    disabled,
    error,
    forwardedRef,
    iconLeft,
    iconRight,
    label,
    labelId,
    ...domProps
  } = props;

  const [focus, setFocus] = useState(false);
  const uniqueInputId = useId();
  const id = domProps.id ? domProps.id : uniqueInputId;
  const { errors } = useInputErrors(id, error);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const { onFocus } = domProps;

    setFocus(true);

    if (onFocus) {
      onFocus(event);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { onBlur } = domProps;

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
        <FormControlLabel htmlFor={id} id={labelId} required={domProps.required}>
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
  }, [id, label, labelId, domProps.required]);

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
    if (!iconLeft) {
      return null;
    }

    return (
      <StyledIconWrapper $paddingLeft="xSmall" $paddingRight="xxSmall">
        {iconLeft}
      </StyledIconWrapper>
    );
  }, [iconLeft]);

  const renderedIconRight = useMemo(() => {
    if (!iconRight) {
      return null;
    }

    return (
      <StyledIconWrapper $paddingLeft="xxSmall" $paddingRight="xSmall">
        {iconRight}
      </StyledIconWrapper>
    );
  }, [iconRight]);

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
        <StyledInputContent $chips={chips}>
          {renderedChips}
          <StyledInput
            {...domProps}
            $chips={chips}
            $iconLeft={iconLeft}
            $iconRight={iconRight}
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
