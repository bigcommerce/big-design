import React, { forwardRef, useMemo, Ref } from 'react';

import { useUniqueId } from '../../hooks';
import { typedMemo, warning } from '../../utils';
import { FormControlDescription, FormControlDescriptionLinkProps } from '../Form';

import { HiddenRadio, RadioContainer, RadioLabelContainer, StyledRadio } from './styled';
import { RadioLabel } from './Label';

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
        <RadioLabel htmlFor={id} id={labelId} disabled={disabled} aria-hidden={disabled}>
          {label}
        </RadioLabel>
      );
    }

    if (React.isValidElement(label) && label.type === RadioLabel) {
      return React.cloneElement(label as React.ReactElement<React.LabelHTMLAttributes<HTMLLabelElement>>, {
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
        type="radio"
        checked={checked}
        id={id}
        disabled={disabled}
        {...props}
        aria-labelledby={labelId}
        ref={forwardedRef}
      />
      <StyledRadio checked={checked} disabled={disabled} htmlFor={id} aria-hidden={true} />
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
