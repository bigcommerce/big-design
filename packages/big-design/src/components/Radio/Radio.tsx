import React, { cloneElement, forwardRef, isValidElement, Ref, useMemo } from 'react';

import { useUniqueId } from '../../hooks';
import { typedMemo, warning } from '../../utils';
import { FormControlDescription, FormControlDescriptionLinkProps } from '../Form';

import { RadioLabel } from './Label';
import { HiddenRadio, RadioContainer, RadioLabelContainer, StyledRadio } from './styled';

interface Props {
  label: React.ReactChild;
  description?: RadioDescription | string;
}

interface RadioDescription {
  text: string;
  link?: FormControlDescriptionLinkProps;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLInputElement>;
}

export type RadioProps = Props & React.InputHTMLAttributes<HTMLInputElement>;

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
  const uniqueRadioId = useUniqueId('radio');
  const id = props.id ? props.id : uniqueRadioId;
  const labelId = useUniqueId('radio_label');

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

    if (isValidElement(label) && label.type === RadioLabel) {
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
    <RadioContainer className={className} style={style}>
      <HiddenRadio
        checked={checked}
        disabled={disabled}
        id={id}
        type="radio"
        {...props}
        aria-labelledby={labelId}
        ref={forwardedRef}
      />
      <StyledRadio aria-hidden={true} checked={checked} disabled={disabled} htmlFor={id} />
      <RadioLabelContainer>
        {renderedLabel}
        {renderedDescription}
      </RadioLabelContainer>
    </RadioContainer>
  );
};

export const Radio = typedMemo(
  forwardRef<HTMLInputElement, RadioProps>(({ className, style, ...props }, ref) => (
    <RawRadio {...props} forwardedRef={ref} />
  )),
);
