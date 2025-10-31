import React, {
  cloneElement,
  ComponentPropsWithoutRef,
  forwardRef,
  isValidElement,
  Ref,
  useId,
  useMemo,
} from 'react';

import { typedMemo, warning } from '../../utils';
import { FormControlDescription, FormControlDescriptionLinkProps } from '../Form';

import { RadioLabel } from './Label';
import {
  StyledHiddenRadio,
  StyledRadio,
  StyledRadioContainer,
  StyledRadioLabelContainer,
} from './styled';

interface Props {
  label: React.ReactNode;
  description?: RadioDescription | string;
}

interface RadioDescription {
  text: string;
  link?: FormControlDescriptionLinkProps;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLInputElement>;
}

export type RadioProps = Props & ComponentPropsWithoutRef<'input'>;

const RawRadio: React.FC<RadioProps & PrivateProps> = ({
  checked,
  className,
  description,
  disabled,
  label,
  forwardedRef,
  style,
  ...props
}) => {
  const uniqueRadioId = useId();
  const labelId = useId();
  const id = props.id ? props.id : uniqueRadioId;

  const renderedLabel = useMemo(() => {
    if (!label) {
      return null;
    }

    if (typeof label === 'string') {
      return (
        <RadioLabel aria-hidden={disabled} disabled={disabled} htmlFor={id} id={labelId}>
          {label}
        </RadioLabel>
      );
    }

    if (isValidElement<ComponentPropsWithoutRef<'label'>>(label) && label.type === RadioLabel) {
      return cloneElement(label, {
        htmlFor: id,
        id: labelId,
      });
    }

    warning('label must be either a string or a RadioLabel component.');
  }, [disabled, id, label, labelId]);

  const renderedDescription = useMemo(() => {
    if (!description) {
      return null;
    }

    const link = typeof description === 'object' ? description.link : undefined;
    const text = typeof description === 'object' ? description.text : description;

    return <FormControlDescription link={link}>{text}</FormControlDescription>;
  }, [description]);

  return (
    <StyledRadioContainer className={className} style={style}>
      <StyledHiddenRadio
        checked={checked}
        disabled={disabled}
        id={id}
        type="radio"
        {...props}
        aria-labelledby={labelId}
        ref={forwardedRef}
      />
      <StyledRadio aria-hidden={true} checked={checked} disabled={disabled} htmlFor={id} />
      <StyledRadioLabelContainer>
        {renderedLabel}
        {renderedDescription}
      </StyledRadioLabelContainer>
    </StyledRadioContainer>
  );
};

export const Radio = typedMemo(
  forwardRef<HTMLInputElement, RadioProps>(({ className, style, ...props }, ref) => (
    <RawRadio {...props} forwardedRef={ref} />
  )),
);
